import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type CreateUserInput = {
  fullName: string;
  email: string;
  password: string;
};

export async function POST(request: Request) {
  const input = (await request.json()) as CreateUserInput;
  const authHeader = request.headers.get("authorization");

  if (!input.fullName?.trim() || !input.email?.trim() || !input.password) {
    return NextResponse.json({ error: "Completa nombre, email y contraseña." }, { status: 400 });
  }

  if (input.password.length < 6) {
    return NextResponse.json({ error: "La contraseña debe tener al menos 6 caracteres." }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const resendKey = process.env.RESEND_API_KEY;
  const resendFrom = process.env.RESEND_FROM;
  const loginUrl = process.env.APP_LOGIN_URL ?? "https://Diana.venadigital.com.co";

  if (!supabaseUrl || !publishableKey) {
    return NextResponse.json({ error: "Supabase no está configurado." }, { status: 500 });
  }

  if (!serviceRoleKey) {
    return NextResponse.json(
      { error: "Falta SUPABASE_SERVICE_ROLE_KEY en .env.local para crear usuarios desde la plataforma." },
      { status: 501 }
    );
  }

  const userClient = createClient(supabaseUrl, publishableKey, {
    global: {
      headers: authHeader ? { Authorization: authHeader } : {}
    }
  });

  const {
    data: { user: currentUser },
    error: currentUserError
  } = await userClient.auth.getUser();

  if (currentUserError || !currentUser) {
    return NextResponse.json({ error: "No hay una sesión válida." }, { status: 401 });
  }

  const { data: currentProfile } = await userClient
    .from("profiles")
    .select("role, status")
    .eq("id", currentUser.id)
    .maybeSingle();

  if (currentProfile?.role !== "superadmin" || currentProfile?.status !== "active") {
    return NextResponse.json({ error: "Tu usuario no tiene permiso para crear usuarios." }, { status: 403 });
  }

  const adminClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  const { data, error } = await adminClient.auth.admin.createUser({
    email: input.email.trim().toLowerCase(),
    password: input.password,
    email_confirm: true,
    user_metadata: {
      full_name: input.fullName.trim()
    },
    app_metadata: {
      role: "superadmin"
    }
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  let emailStatus: { id?: string; error?: string; skipped?: boolean } = { skipped: true };

  if (resendKey && resendFrom) {
    const resend = new Resend(resendKey);
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: resendFrom,
      to: input.email.trim().toLowerCase(),
      subject: "Acceso al Centro de Control Diana Boldizar",
      html: buildWelcomeEmail({
        fullName: input.fullName.trim(),
        email: input.email.trim().toLowerCase(),
        password: input.password,
        loginUrl
      })
    });

    emailStatus = emailError ? { error: emailError.message } : { id: emailData?.id };
  }

  return NextResponse.json({
    id: data.user?.id,
    email: data.user?.email,
    emailStatus
  });
}

function buildWelcomeEmail({
  fullName,
  email,
  password,
  loginUrl
}: {
  fullName: string;
  email: string;
  password: string;
  loginUrl: string;
}) {
  return `
    <div style="font-family:Arial,sans-serif;color:#0a2142;line-height:1.5">
      <p style="margin:0 0 8px;color:#ff6b5e;letter-spacing:.08em;text-transform:uppercase;font-size:12px">Centro de Control</p>
      <h1 style="margin:0 0 16px;font-size:24px">Tu acceso está listo</h1>
      <p>Hola ${escapeHtml(fullName)},</p>
      <p>Ya tienes acceso al Centro de Control Diana Boldizar.</p>
      <div style="margin:18px 0;padding:16px;border:1px solid #d8d4c9;border-radius:12px;background:#f7f5ef">
        <p style="margin:0 0 8px"><strong>Usuario:</strong> ${escapeHtml(email)}</p>
        <p style="margin:0 0 8px"><strong>Contraseña:</strong> ${escapeHtml(password)}</p>
        <p style="margin:0"><strong>URL:</strong> <a href="${escapeHtml(loginUrl)}">${escapeHtml(loginUrl)}</a></p>
      </div>
      <p style="color:#6b6f76">Esta es una contraseña inicial. Guárdala en un lugar seguro.</p>
    </div>
  `;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
