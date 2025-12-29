// app/api/contact/route.ts
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type Payload = {
  service?: string;
  project_details?: string;
  location?: string;
  phone?: string;
  email?: string;
};

function safe(v: unknown) {
  return typeof v === "string" ? v.trim() : "";
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Payload;

    const service = safe(body.service);
    const project_details = safe(body.project_details);
    const location = safe(body.location);
    const phone = safe(body.phone);
    const email = safe(body.email);

    if (!project_details || !location || !phone || !email) {
      return new Response(
        JSON.stringify({ ok: false, error: "Missing required fields." }),
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
            "Server is missing email env vars. Check .env.local (GMAIL_USER, GMAIL_APP_PASSWORD, CONTACT_TO).",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_APP_PASSWORD,
      },
    });

    const niceService = service
      ? service
          .replace(/-/g, " ")
          .replace(/\b\w/g, (m) => m.toUpperCase())
      : "General Inquiry";

    const subject = `${niceService} Inquiry — Groovy Builds`;

    /* ============================
       EMAIL TO YOU (OWNER)
       ============================ */
    const ownerText = [
      `Service: ${niceService}`,
      ``,
      `Project Details:`,
      project_details,
      ``,
      `Location: ${location}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      ``,
      `Submitted: ${new Date().toLocaleString()}`,
    ].join("\n");

    await transporter.sendMail({
      from: `Groovy Builds Website <${GMAIL_USER}>`,
      to: CONTACT_TO,
      replyTo: email,
      subject,
      text: ownerText,
    });

    /* ============================
       ULTRA-LUXURY AUTO-REPLY
       ============================ */
    const customerText = [
      `Hello,`,
      ``,
      `Thank you for your interest in Groovy Builds.`,
      ``,
      `We’ve received your inquiry${
        service ? ` regarding ${niceService.toLowerCase()}` : ""
      } and it has been personally reviewed.`,
      ``,
      `A member of our team will be in touch within one to two business days.`,
      ``,
      `If you’d like to share photos, drawings, or supporting materials,`,
      `please email them directly to groovybuilds@gmail.com.`,
      ``,
      `We appreciate the opportunity to connect and look forward to discussing your project.`,
      ``,
      `— Groovy Builds`,
      `Nashville, TN`,
    ].join("\n");

    await transporter.sendMail({
      from: `Groovy Builds <${GMAIL_USER}>`,
      to: email,
      subject: "We’ve received your inquiry — Groovy Builds",
      text: customerText,
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: err?.message || "Unknown server error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
