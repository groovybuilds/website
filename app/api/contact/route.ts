import nodemailer from "nodemailer";

export const runtime = "nodejs";

type Payload = {
  service?: string;
  project_details?: string;
  details?: string;
  location?: string;
  phone?: string;
  email?: string;
  preferredContact?: string;
  name?: string;
};

function safe(v: unknown) {
  return typeof v === "string" ? v.trim() : "";
}

function titleCaseService(v: string) {
  const s = safe(v);
  if (!s) return "General Inquiry";
  return s.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Payload;

    const service = safe(body.service);
    // ✅ Accept either key so the frontend can stay exactly as-is
    const project_details = safe(body.project_details) || safe(body.details);
    const location = safe(body.location);
    const phone = safe(body.phone);
    const email = safe(body.email);
    const preferredContact = safe(body.preferredContact);

    if (!project_details || !location || (!phone && !email)) {
      return new Response(
        JSON.stringify({
          ok: false,
          error:
            "Missing required fields. Please include project details, location, and either phone or email.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const GMAIL_USER = process.env.GMAIL_USER || "";
    const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD || "";
    const CONTACT_TO = process.env.CONTACT_TO || "";

    if (!GMAIL_USER || !GMAIL_APP_PASSWORD || !CONTACT_TO) {
      return new Response(
        JSON.stringify({
          ok: false,
          error:
            "Email is not configured. Check env vars: GMAIL_USER, GMAIL_APP_PASSWORD, CONTACT_TO.",
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
        pass: GMAIL_APP_PASSWORD, // Gmail App Password (16 chars)
      },
    });

    const niceService = titleCaseService(service);

    const ownerText = [
      `Service: ${niceService}`,
      preferredContact ? `Preferred Contact: ${preferredContact}` : "",
      ``,
      `Project Details:`,
      project_details,
      ``,
      `Location: ${location}`,
      phone ? `Phone: ${phone}` : "Phone: (not provided)",
      email ? `Email: ${email}` : "Email: (not provided)",
      ``,
      `Submitted: ${new Date().toLocaleString()}`,
    ]
      .filter(Boolean)
      .join("\n");

    await transporter.sendMail({
      from: `Groovy Builds <${GMAIL_USER}>`,
      to: CONTACT_TO,
      replyTo: email || undefined,
      subject: `${niceService} Inquiry — Groovy Builds`,
      text: ownerText,
    });

    // Optional confirmation to the client (only if they provided email)
    if (email) {
      await transporter.sendMail({
        from: `Groovy Builds <${GMAIL_USER}>`,
        to: email,
        subject: "We’ve received your inquiry — Groovy Builds",
        text:
          "Hello,\n\nThank you for your interest in Groovy Builds.\n\nWe’ve received your inquiry and a member of our team will be in touch within 1–2 business days.\n\n— Groovy Builds\nNashville, TN\n",
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ ok: false, error: err?.message || "Unknown error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
