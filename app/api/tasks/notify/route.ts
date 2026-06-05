import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type TaskNotifyInput = {
  title: string;
  description?: string | null;
  assignees: Array<{
    fullName: string;
    email: string;
  }>;
};

export async function POST(request: Request) {
  const input = (await request.json()) as TaskNotifyInput;

  if (!input.title || !input.assignees?.length) {
    return NextResponse.json({ error: "Datos incompletos para notificar la tarea." }, { status: 400 });
  }

  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;

  if (!resendKey || !from) {
    return NextResponse.json({ skipped: true, reason: "Resend no está configurado." });
  }

  const resend = new Resend(resendKey);
  const { data, error } = await resend.emails.send({
    from,
    to: input.assignees.map((assignee) => assignee.email),
    subject: `Nueva tarea asignada: ${input.title}`,
    html: buildTaskEmail(input),
    headers: {
      "X-Entity-Ref-ID": `task-${Date.now()}`
    }
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 502 });
  }

  return NextResponse.json({ id: data?.id });
}

function buildTaskEmail(input: TaskNotifyInput) {
  const assignees = input.assignees.map((assignee) => escapeHtml(assignee.fullName || assignee.email)).join(", ");

  return `
    <div style="font-family:Arial,sans-serif;color:#0a2142;line-height:1.5">
      <p style="margin:0 0 8px;color:#ff6b5e;letter-spacing:.08em;text-transform:uppercase;font-size:12px">Centro de Control</p>
      <h1 style="margin:0 0 16px;font-size:24px">Nueva tarea asignada</h1>
      <p><strong>Nombre:</strong> ${escapeHtml(input.title)}</p>
      ${input.description ? `<p><strong>Descripción:</strong><br>${escapeHtml(input.description)}</p>` : ""}
      <p><strong>Responsable:</strong> ${assignees}</p>
      <p style="color:#6b6f76">Puedes revisar esta tarea en la plataforma del Centro de Control.</p>
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
