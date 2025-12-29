// app/api/contact/route.ts

export const runtime = "nodejs";

import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      email,
      phone,
      location,
      project_details,
      service,
    } = body;

    if (
      !process.env.GMAIL_USER ||
      !process.env.GMAIL_APP_PASSWORD ||
      !process.env.CONTACT_TO
    ) {
      return Response.json(
        { error: "Server is missing email env vars" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Groovy Builds Website" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_TO,
      replyTo: email,
      subject: `New Website Inquiry${service ? ` – ${service}` : ""}`,
      text: `
Service: ${service || "N/A"}
Email: ${email}
Phone: ${phone || "N/A"}
Location: ${location || "N/A"}

Details:
${project_details}
      `,
    });

    return Response.json({ success: true });
  } catch (err) {
    return Response.json(
      { error: "Email send failed" },
      { status: 500 }
    );
  }
}
