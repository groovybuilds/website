export const runtime = "nodejs";

export async function GET() {
  return Response.json({
    hasGmailUser: !!process.env.GMAIL_USER,
    hasGmailAppPassword: !!process.env.GMAIL_APP_PASSWORD,
    hasContactTo: !!process.env.CONTACT_TO,
    gmailUserLength: process.env.GMAIL_USER?.length ?? 0,
    contactToLength: process.env.CONTACT_TO?.length ?? 0,
  });
}
