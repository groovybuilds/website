// app/api/env-check/route.ts
export const runtime = "nodejs";

export async function GET() {
  const contactTo = "info@groovybuilds.com";

  return Response.json({
    hasGmailUser: !!process.env.GMAIL_USER,
    hasGmailAppPassword: !!process.env.GMAIL_APP_PASSWORD,
    hasContactTo: true,
    gmailUserLength: process.env.GMAIL_USER?.length ?? 0,
    contactToLength: contactTo.length,
  });
}
