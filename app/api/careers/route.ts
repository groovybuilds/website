import nodemailer from "nodemailer";

export const runtime = "nodejs";

const CAREERS_TO = "info@groovybuilds.com";
const MAX_RESUME_BYTES = 4 * 1024 * 1024;

function safe(v: FormDataEntryValue | null) {
  return typeof v === "string" ? v.trim() : "";
}

function isResumeFile(v: FormDataEntryValue | null): v is File {
  return typeof File !== "undefined" && v instanceof File && v.size > 0;
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = safe(formData.get("name"));
    const email = safe(formData.get("email"));
    const phone = safe(formData.get("phone"));
    const location = safe(formData.get("location"));
    const role = safe(formData.get("role"));
    const employmentType = safe(formData.get("employmentType"));
    const availability = safe(formData.get("availability"));
    const startDate = safe(formData.get("startDate"));
    const authorizedToWork = safe(formData.get("authorizedToWork"));
    const transportation = safe(formData.get("transportation"));
    const yearsExperience = safe(formData.get("yearsExperience"));
    const skills = safe(formData.get("skills"));
    const workHistory = safe(formData.get("workHistory"));
    const certifications = safe(formData.get("certifications"));
    const references = safe(formData.get("references"));
    const message = safe(formData.get("message"));
    const resumeUrl = safe(formData.get("resumeUrl"));
    const resume = formData.get("resume");

    if (!name || !role || !message || (!phone && !email)) {
      return new Response(
        JSON.stringify({
          ok: false,
          error:
            "Please include your name, position/trade, a short message, and either phone or email.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (isResumeFile(resume) && resume.size > MAX_RESUME_BYTES) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: "Resume file must be 4MB or smaller.",
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
      "New careers application",
      "",
      `Name: ${name}`,
      phone ? `Phone: ${phone}` : "Phone: (not provided)",
      email ? `Email: ${email}` : "Email: (not provided)",
      location ? `City / area: ${location}` : "City / area: (not provided)",
      "",
      `Position / trade: ${role}`,
      employmentType
        ? `Employment type: ${employmentType}`
        : "Employment type: (not provided)",
      availability
        ? `Availability: ${availability}`
        : "Availability: (not provided)",
      startDate ? `Earliest start date: ${startDate}` : "",
      yearsExperience
        ? `Years of experience: ${yearsExperience}`
        : "Years of experience: (not provided)",
      authorizedToWork
        ? `Authorized to work in the U.S.: ${authorizedToWork}`
        : "",
      transportation ? `Reliable transportation: ${transportation}` : "",
      "",
      skills ? `Main skills / trades:\n${skills}` : "Main skills / trades: (not provided)",
      "",
      workHistory ? `Recent work history:\n${workHistory}` : "Recent work history: (not provided)",
      "",
      certifications
        ? `Certifications / licenses / insurance: ${certifications}`
        : "Certifications / licenses / insurance: (not provided)",
      "",
      references ? `References:\n${references}` : "References: (not provided)",
      "",
      "Message:",
      message,
      "",
      resumeUrl ? `Resume/portfolio/social link: ${resumeUrl}` : "",
      isResumeFile(resume) ? `Resume upload: ${resume.name}` : "Resume upload: (not provided)",
      "",
      `Submitted: ${new Date().toLocaleString()}`,
    ]
      .filter(Boolean)
      .join("\n");

    const attachments = isResumeFile(resume)
      ? [
          {
            filename: resume.name || "resume",
            content: Buffer.from(await resume.arrayBuffer()),
            contentType: resume.type || undefined,
          },
        ]
      : [];

    await transporter.sendMail({
      from: `Groovy Builds <${GMAIL_USER}>`,
      to: CAREERS_TO,
      replyTo: email || undefined,
      subject: `Job Application - ${name} - Groovy Builds`,
      text: ownerText,
      attachments,
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
