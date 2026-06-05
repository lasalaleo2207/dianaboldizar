import { google } from "googleapis";
import { buildGoogleCalendarEvent, type CalendarInviteInput } from "@/lib/calendar-invite";

export async function createGoogleCalendarEvent(input: CalendarInviteInput) {
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const subject = process.env.GOOGLE_CALENDAR_IMPERSONATE;

  if (!calendarId || !clientEmail || !privateKey) {
    return {
      skipped: true,
      reason: "Faltan credenciales de Google Calendar en servidor."
    };
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/calendar.events"],
    subject
  });

  const calendar = google.calendar({ version: "v3", auth });
  const response = await calendar.events.insert({
    calendarId,
    conferenceDataVersion: 1,
    sendUpdates: "all",
    requestBody: buildGoogleCalendarEvent(input)
  });

  return {
    skipped: false,
    eventId: response.data.id,
    htmlLink: response.data.htmlLink,
    hangoutLink: response.data.hangoutLink
  };
}
