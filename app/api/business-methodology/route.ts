import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const PROJECT_NAME = "Centro de Control Estratégico";
const QUESTION_KEY = "business_methodology_extraction";
const QUESTION_LABEL = "Extracción del método La Diana";

export async function GET(request: Request) {
  const context = await getAuthorizedContext(request);
  if (context instanceof NextResponse) return context;

  const { client, projectId } = context;
  const { data, error } = await client
    .from("diagnostic_answers")
    .select("answer, updated_at")
    .eq("project_id", projectId)
    .is("submodule_id", null)
    .eq("question_key", QUESTION_KEY)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    data: parseStoredData(data?.answer),
    updatedAt: data?.updated_at ?? null
  });
}

export async function PUT(request: Request) {
  const context = await getAuthorizedContext(request);
  if (context instanceof NextResponse) return context;

  const input = (await request.json()) as { data?: unknown };
  if (!input.data || typeof input.data !== "object" || Array.isArray(input.data)) {
    return NextResponse.json({ error: "Los datos del formulario no son válidos." }, { status: 400 });
  }

  const serialized = JSON.stringify(input.data);
  if (serialized.length > 1_000_000) {
    return NextResponse.json({ error: "El formulario supera el tamaño permitido." }, { status: 413 });
  }

  const { client, projectId, userId } = context;
  const { data: existing, error: findError } = await client
    .from("diagnostic_answers")
    .select("id")
    .eq("project_id", projectId)
    .is("submodule_id", null)
    .eq("question_key", QUESTION_KEY)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (findError) {
    return NextResponse.json({ error: findError.message }, { status: 500 });
  }

  const updatedAt = new Date().toISOString();
  const payload = {
    project_id: projectId,
    submodule_id: null,
    question_key: QUESTION_KEY,
    question_label: QUESTION_LABEL,
    answer: serialized,
    answer_type: "json",
    created_by: userId,
    updated_at: updatedAt
  };

  const query = existing?.id
    ? client.from("diagnostic_answers").update(payload).eq("id", existing.id)
    : client.from("diagnostic_answers").insert(payload);
  const { error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ saved: true, updatedAt });
}

async function getAuthorizedContext(request: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  const authorization = request.headers.get("authorization");

  if (!supabaseUrl || !publishableKey) {
    return NextResponse.json({ error: "Supabase no está configurado." }, { status: 500 });
  }

  if (!authorization?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "No hay una sesión válida." }, { status: 401 });
  }

  const accessToken = authorization.slice("Bearer ".length);
  const client = createClient(supabaseUrl, publishableKey, {
    global: { headers: { Authorization: authorization } },
    auth: { persistSession: false, autoRefreshToken: false }
  });
  const {
    data: { user },
    error: userError
  } = await client.auth.getUser(accessToken);

  if (userError || !user) {
    return NextResponse.json({ error: "La sesión expiró. Inicia sesión nuevamente." }, { status: 401 });
  }

  const { data: profile, error: profileError } = await client
    .from("profiles")
    .select("role, status")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError || profile?.role !== "superadmin" || profile.status !== "active") {
    return NextResponse.json({ error: "No tienes permiso para editar esta metodología." }, { status: 403 });
  }

  const { data: project, error: projectError } = await client
    .from("projects")
    .select("id")
    .eq("name", PROJECT_NAME)
    .maybeSingle();

  if (projectError || !project?.id) {
    return NextResponse.json({ error: "No se encontró el proyecto." }, { status: 404 });
  }

  return { client, projectId: project.id as string, userId: user.id };
}

function parseStoredData(answer: string | null | undefined) {
  if (!answer) return {};
  try {
    const value = JSON.parse(answer) as unknown;
    return value && typeof value === "object" && !Array.isArray(value) ? value : {};
  } catch {
    return {};
  }
}
