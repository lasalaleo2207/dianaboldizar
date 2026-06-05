import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    supabase: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY),
    resend: Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM),
    googleCalendar: Boolean(process.env.GOOGLE_CALENDAR_ID && process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY),
    googleCalendarId: process.env.GOOGLE_CALENDAR_ID ?? null,
    timeZone: process.env.GOOGLE_CALENDAR_TIME_ZONE ?? "America/Bogota",
    canCreateAuthUsers: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY)
  });
}
