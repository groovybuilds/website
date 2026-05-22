"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useMemo, useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

const MAX_RESUME_BYTES = 4 * 1024 * 1024;

export default function CareersForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [role, setRole] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [availability, setAvailability] = useState("");
  const [startDate, setStartDate] = useState("");
  const [authorizedToWork, setAuthorizedToWork] = useState("");
  const [transportation, setTransportation] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [workHistory, setWorkHistory] = useState("");
  const [certifications, setCertifications] = useState("");
  const [references, setReferences] = useState("");
  const [message, setMessage] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const canSubmit = useMemo(() => {
    return Boolean(
      name.trim() &&
        role.trim() &&
        message.trim() &&
        (email.trim() || phone.trim())
    );
  }, [name, email, phone, role, message]);

  function onResumeChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;

    if (!file) {
      setResumeFile(null);
      return;
    }

    if (file.size > MAX_RESUME_BYTES) {
      setResumeFile(null);
      setStatus("error");
      setErrorMsg("Resume file must be 4MB or smaller.");
      e.target.value = "";
      return;
    }

    setResumeFile(file);
    if (status === "error") {
      setStatus("idle");
      setErrorMsg("");
    }
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit || status === "sending") return;

    const form = e.currentTarget;

    setStatus("sending");
    setErrorMsg("");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("location", location);
      formData.append("role", role);
      formData.append("employmentType", employmentType);
      formData.append("availability", availability);
      formData.append("startDate", startDate);
      formData.append("authorizedToWork", authorizedToWork);
      formData.append("transportation", transportation);
      formData.append("yearsExperience", yearsExperience);
      formData.append("skills", skills);
      formData.append("workHistory", workHistory);
      formData.append("certifications", certifications);
      formData.append("references", references);
      formData.append("message", message);
      formData.append("resumeUrl", resumeUrl);

      if (resumeFile) {
        formData.append("resume", resumeFile);
      }

      const res = await fetch("/api/careers", {
        method: "POST",
        body: formData,
      });

      let data: { error?: string } | null = null;
      try {
        data = await res.json();
      } catch {
        // The API normally returns JSON. If it does not, show the generic error below.
      }

      if (!res.ok) {
        throw new Error(data?.error || `Request failed (${res.status})`);
      }

      setStatus("success");
      setName("");
      setEmail("");
      setPhone("");
      setLocation("");
      setRole("");
      setEmploymentType("");
      setAvailability("");
      setStartDate("");
      setAuthorizedToWork("");
      setTransportation("");
      setYearsExperience("");
      setSkills("");
      setWorkHistory("");
      setCertifications("");
      setReferences("");
      setMessage("");
      setResumeUrl("");
      setResumeFile(null);
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/55">
            Contact
          </h3>
        </div>

        <Field label="Name *" htmlFor="careers-name" className="sm:col-span-2">
          <input
            id="careers-name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            className={inputClass}
          />
        </Field>

        <Field label="Email" htmlFor="careers-email">
          <input
            id="careers-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={inputClass}
          />
        </Field>

        <Field label="Phone" htmlFor="careers-phone">
          <input
            id="careers-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(615) 555-1234"
            className={inputClass}
          />
        </Field>

        <p className="text-xs leading-relaxed text-white/50 sm:col-span-2">
          Please include at least one contact method: email or phone.
        </p>

        <Field label="City / area" htmlFor="careers-location" className="sm:col-span-2">
          <input
            id="careers-location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Nashville, TN"
            className={inputClass}
          />
        </Field>

        <div className="pt-2 sm:col-span-2">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/55">
            Work Details
          </h3>
        </div>

        <Field label="Position / trade *" htmlFor="careers-role" className="sm:col-span-2">
          <input
            id="careers-role"
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Carpentry, tile, helper, project lead..."
            required
            className={inputClass}
          />
        </Field>

        <Field label="Employment type" htmlFor="careers-employment-type">
          <select
            id="careers-employment-type"
            value={employmentType}
            onChange={(e) => setEmploymentType(e.target.value)}
            className={inputClass}
          >
            <option value="">Select one</option>
            <option value="Full-time employee">Full-time employee</option>
            <option value="Part-time employee">Part-time employee</option>
            <option value="Subcontractor">Subcontractor</option>
            <option value="Open to discussing">Open to discussing</option>
          </select>
        </Field>

        <Field label="Availability" htmlFor="careers-availability">
          <select
            id="careers-availability"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            className={inputClass}
          >
            <option value="">Select one</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Weekdays">Weekdays</option>
            <option value="Weekends">Weekends</option>
            <option value="Flexible">Flexible</option>
          </select>
        </Field>

        <Field label="Earliest start date" htmlFor="careers-start-date">
          <input
            id="careers-start-date"
            type="text"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            placeholder="Immediately, two weeks, date..."
            className={inputClass}
          />
        </Field>

        <Field label="Years of experience" htmlFor="careers-years">
          <input
            id="careers-years"
            type="text"
            value={yearsExperience}
            onChange={(e) => setYearsExperience(e.target.value)}
            placeholder="Example: 5 years"
            className={inputClass}
          />
        </Field>

        <Field label="Authorized to work in the U.S.?" htmlFor="careers-authorized">
          <select
            id="careers-authorized"
            value={authorizedToWork}
            onChange={(e) => setAuthorizedToWork(e.target.value)}
            className={inputClass}
          >
            <option value="">Select one</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            <option value="Prefer to discuss">Prefer to discuss</option>
          </select>
        </Field>

        <Field label="Reliable transportation?" htmlFor="careers-transportation">
          <select
            id="careers-transportation"
            value={transportation}
            onChange={(e) => setTransportation(e.target.value)}
            className={inputClass}
          >
            <option value="">Select one</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            <option value="Prefer to discuss">Prefer to discuss</option>
          </select>
        </Field>

        <div className="pt-2 sm:col-span-2">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/55">
            Experience
          </h3>
        </div>

        <Field label="Main skills / trades" htmlFor="careers-skills" className="sm:col-span-2">
          <textarea
            id="careers-skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="Framing, finish carpentry, tile, drywall, paint, punch work, estimating, running jobs..."
            className={`${inputClass} h-28 resize-none`}
          />
        </Field>

        <Field label="Recent work history" htmlFor="careers-history" className="sm:col-span-2">
          <textarea
            id="careers-history"
            value={workHistory}
            onChange={(e) => setWorkHistory(e.target.value)}
            placeholder="Companies, roles, dates, project types, or subcontractor experience."
            className={`${inputClass} h-32 resize-none`}
          />
        </Field>

        <Field
          label="Certifications / licenses / insurance"
          htmlFor="careers-certifications"
          className="sm:col-span-2"
        >
          <input
            id="careers-certifications"
            type="text"
            value={certifications}
            onChange={(e) => setCertifications(e.target.value)}
            placeholder="License, insurance, OSHA, specialty training, or none."
            className={inputClass}
          />
        </Field>

        <Field label="References" htmlFor="careers-references" className="sm:col-span-2">
          <textarea
            id="careers-references"
            value={references}
            onChange={(e) => setReferences(e.target.value)}
            placeholder="Names and contact info for work references, if available."
            className={`${inputClass} h-28 resize-none`}
          />
        </Field>

        <Field label="Tell us about yourself *" htmlFor="careers-message" className="sm:col-span-2">
          <textarea
            id="careers-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="What kind of work have you done, what are you looking for, and why would you be a good fit?"
            required
            className={`${inputClass} h-40 resize-none`}
          />
        </Field>

        <div className="pt-2 sm:col-span-2">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/55">
            Resume
          </h3>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="careers-resume-file"
            className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-white/20 bg-black/35 px-4 py-6 text-center transition hover:border-white/35 hover:bg-white/[0.04]"
          >
            <span className="text-sm font-semibold text-white">
              Upload Resume
            </span>
            <span className="mt-1 text-xs leading-5 text-white/50">
              PDF, DOC, or DOCX. 4MB max.
            </span>
            <span className="mt-3 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs text-white/75">
              {resumeFile ? resumeFile.name : "Choose file"}
            </span>
            <input
              id="careers-resume-file"
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={onResumeChange}
              className="sr-only"
            />
          </label>
        </div>

        <Field
          label="Resume, portfolio, or social link"
          htmlFor="careers-resume-link"
          className="sm:col-span-2"
        >
          <input
            id="careers-resume-link"
            type="text"
            inputMode="url"
            value={resumeUrl}
            onChange={(e) => setResumeUrl(e.target.value)}
            placeholder="https://..."
            className={inputClass}
          />
        </Field>
      </div>

      {status === "error" ? (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {errorMsg}
        </div>
      ) : null}

      {status === "success" ? (
        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
          Application sent. We will review it and reach out if there is a fit.
        </div>
      ) : null}

      <button
        type="submit"
        disabled={!canSubmit || status === "sending"}
        className="w-full rounded-lg bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "sending" ? "Sending..." : "Submit Application"}
      </button>
    </form>
  );
}

const inputClass =
  "w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/30 outline-none transition focus:border-white/25";

function Field({
  label,
  htmlFor,
  className = "",
  children,
}: {
  label: string;
  htmlFor: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-2 block text-sm text-white/80">
        {label}
      </label>
      {children}
    </div>
  );
}
