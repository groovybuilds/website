import nodemailer from "nodemailer";

export const runtime = "nodejs";

const CAREERS_TO = "info@groovybuilds.com";

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  role?: string;
  availability?: string;
  experience?: string;
  message?: string;
  resumeUrl?: string;
};

function safe(v: unknown) {
  return typeof v === "string" ? v.trim() : "";
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Payload;

    const name = safe(body.name);
    const email = safe(body.email);
    const phone = safe(body.phone);
    const role = safe(body.role);
    const availability = safe(body.availability);
    const experience = safe(body.experience);
    const message = safe(body.message);
    const resumeUrl = safe(body.resumeUrl);

    if (!name || !message || (!phone && !email)) {
      return new Response(
        JSON.stringify({
          ok: false,
          error:
            "Please include your name, a short message, and either phone or email.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const GMAIL_USER = process.env.GMAIL_USER || "";
    const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD || "";

    if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
      console.error("Careers email is not configured.");
      return new Response(
        JSON.stringify({
          ok: false,
          error:
            "Application could not be sent yet. Please email info@groovybuilds.com directly.",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_APP_PASSWORD,
      },
    });

    const ownerText = [
      `Name: ${name}`,
      phone ? `Phone: ${phone}` : "Phone: (not provided)",
      email ? `Email: ${email}` : "Email: (not provided)",
      role ? `Trade or role: ${role}` : "Trade or role: (not provided)",
      availability
        ? `Availability: ${availability}`
        : "Availability: (not provided)",
      experience ? `Experience: ${experience}` : "Experience: (not provided)",
      resumeUrl ? `Resume/portfolio/social: ${resumeUrl}` : "",
      "",
      "Message:",
      message,
      "",
      `Submitted: ${new Date().toLocaleString()}`,
    ]
      .filter(Boolean)
      .join("\n");

    await transporter.sendMail({
      from: `Groovy Builds <${GMAIL_USER}>`,
      to: CAREERS_TO,
      replyTo: email || undefined,
      subject: `Job Application - ${name} - Groovy Builds`,
      text: ownerText,
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: err instanceof Error ? err.message : "Unknown error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
