export type CalendarInviteInput = {
  title: string;
  objective?: string | null;
  prepRequired?: string | null;
  location?: string | null;
  meetingUrl?: string | null;
  attendees: string[];
  startAt: string;
  endAt: string;
  timeZone: string;
};

export function buildGoogleCalendarEvent(input: CalendarInviteInput) {
  const description = [
    input.objective,
    input.prepRequired ? `Preparación requerida:\n${input.prepRequired}` : null,
    input.meetingUrl ? `Enlace de reunión: ${input.meetingUrl}` : null
  ].filter(Boolean).join("\n\n");

  return {
    summary: input.title,
    description,
    location: input.location || input.meetingUrl || undefined,
    start: {
      dateTime: input.startAt,
      timeZone: input.timeZone
    },
    end: {
      dateTime: input.endAt,
      timeZone: input.timeZone
    },
    attendees: input.attendees.map((email) => ({ email })),
    conferenceData: input.meetingUrl
      ? undefined
      : {
          createRequest: {
            requestId: `meet-${Date.now()}-${Math.random().toString(16).slice(2)}`,
            conferenceSolutionKey: {
              type: "hangoutsMeet"
            }
          }
        }
  };
}

export function buildIcsInvite(input: CalendarInviteInput) {
  const uid = `${hashText(`${input.title}-${input.startAt}`)}@venadigital.com.co`;
  const description = escapeIcsText(
    [
      input.objective,
      input.prepRequired ? `Preparación requerida: ${input.prepRequired}` : null,
      input.meetingUrl ? `Enlace de reunión: ${input.meetingUrl}` : null
    ].filter(Boolean).join("\n\n")
  );
  const organizer = process.env.RESEND_FROM?.match(/<(.+)>/)?.[1] ?? "agenda@venadigital.com.co";

  return foldIcsLines([
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Vena Digital//Centro de Control//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${formatIcsDate(new Date().toISOString())}`,
    `DTSTART:${formatIcsDate(input.startAt)}`,
    `DTEND:${formatIcsDate(input.endAt)}`,
    `SUMMARY:${escapeIcsText(input.title)}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${escapeIcsText(input.location || input.meetingUrl || "")}`,
    `ORGANIZER;CN=Vena Digital:mailto:${organizer}`,
    ...input.attendees.map((email) => `ATTENDEE;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE:mailto:${email}`),
    "STATUS:CONFIRMED",
    "SEQUENCE:0",
    "END:VEVENT",
    "END:VCALENDAR"
  ]);
}

export function buildInviteEmailHtml(input: CalendarInviteInput, calendarLink?: string | null) {
  const date = new Date(input.startAt).toLocaleDateString("es-CO", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: input.timeZone
  });
  const start = new Date(input.startAt).toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit", timeZone: input.timeZone });
  const end = new Date(input.endAt).toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit", timeZone: input.timeZone });

  return `
    <div style="font-family:Arial,sans-serif;color:#0a2142;line-height:1.5">
      <h1 style="margin:0 0 12px;font-size:24px">${escapeHtml(input.title)}</h1>
      <p><strong>Fecha:</strong> ${escapeHtml(date)}</p>
      <p><strong>Hora:</strong> ${escapeHtml(start)} - ${escapeHtml(end)}</p>
      ${input.location ? `<p><strong>Lugar:</strong> ${escapeHtml(input.location)}</p>` : ""}
      ${input.meetingUrl ? `<p><strong>Enlace:</strong> <a href="${escapeHtml(input.meetingUrl)}">${escapeHtml(input.meetingUrl)}</a></p>` : ""}
      ${input.objective ? `<p><strong>Objetivo:</strong><br>${escapeHtml(input.objective)}</p>` : ""}
      ${input.prepRequired ? `<p><strong>Preparación requerida:</strong><br>${escapeHtml(input.prepRequired)}</p>` : ""}
      ${calendarLink ? `<p><a href="${escapeHtml(calendarLink)}">Ver evento en Google Calendar</a></p>` : ""}
      <p style="color:#6b6f76">La invitación de calendario está adjunta a este correo.</p>
    </div>
  `;
}

function formatIcsDate(value: string) {
  return new Date(value).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function escapeIcsText(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

function foldIcsLines(lines: string[]) {
  return `${lines.map((line) => foldLine(line)).join("\r\n")}\r\n`;
}

function foldLine(line: string) {
  if (line.length <= 74) return line;
  const parts = [];
  let current = line;
  while (current.length > 74) {
    parts.push(current.slice(0, 74));
    current = ` ${current.slice(74)}`;
  }
  parts.push(current);
  return parts.join("\r\n");
}

function hashText(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash).toString(16);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
