import { NextResponse } from "next/server";
import { Resend } from "resend";
import { buildIcsInvite, buildInviteEmailHtml, type CalendarInviteInput } from "@/lib/calendar-invite";
import { createGoogleCalendarEvent } from "@/lib/google-calendar";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const input = (await request.json()) as CalendarInviteInput;

  if (!input.title || !input.startAt || !input.endAt || input.attendees.length === 0) {
    return NextResponse.json({ error: "Datos incompletos para enviar la invitación." }, { status: 400 });
  }

  const googleEvent = await createGoogleCalendarEvent(input);
  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;

  if (!resendKey || !from) {
    return NextResponse.json({ googleEvent, email: { skipped: true, reason: "Resend no está configurado." } });
  }

  const ics = buildIcsInvite(input);
  const resend = new Resend(resendKey);
  const { data, error } = await resend.emails.send({
    from,
    to: input.attendees,
    subject: `Invitación: ${input.title}`,
    html: buildInviteEmailHtml(input, "htmlLink" in googleEvent ? googleEvent.htmlLink : null),
    attachments: [
      {
        filename: "sesion.ics",
        content: Buffer.from(ics).toString("base64")
      }
    ],
    headers: {
      "X-Entity-Ref-ID": `${input.title}-${input.startAt}`
    }
  });

  if (error) {
    return NextResponse.json({ googleEvent, email: { error: error.message } }, { status: 502 });
  }

  return NextResponse.json({ googleEvent, email: { id: data?.id } });
}
