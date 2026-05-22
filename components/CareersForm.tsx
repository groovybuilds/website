"use client";

import { useMemo, useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

export default function CareersForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [availability, setAvailability] = useState("");
  const [experience, setExperience] = useState("");
  const [message, setMessage] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const canSubmit = useMemo(() => {
    return Boolean(name.trim() && message.trim() && (email.trim() || phone.trim()));
  }, [name, email, phone, message]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit || status === "sending") return;

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          role,
          availability,
          experience,
          message,
          resumeUrl,
        }),
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
      setRole("");
      setAvailability("");
      setExperience("");
      setMessage("");
      setResumeUrl("");
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
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="careers-name" className="mb-2 block text-sm text-white/80">
            Name *
          </label>
          <input
            id="careers-name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/30 outline-none transition focus:border-white/25"
          />
        </div>

        <div>
          <label htmlFor="careers-email" className="mb-2 block text-sm text-white/80">
            Email
          </label>
          <input
            id="careers-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/30 outline-none transition focus:border-white/25"
          />
        </div>

        <div>
          <label htmlFor="careers-phone" className="mb-2 block text-sm text-white/80">
            Phone
          </label>
          <input
            id="careers-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(615) 555-1234"
            className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/30 outline-none transition focus:border-white/25"
          />
        </div>

        <p className="text-xs leading-relaxed text-white/50 sm:col-span-2">
          Please include at least one contact method: email or phone.
        </p>

        <div>
          <label htmlFor="careers-role" className="mb-2 block text-sm text-white/80">
            Trade or role
          </label>
          <input
            id="careers-role"
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Carpentry, tile, helper, project lead..."
            className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/30 outline-none transition focus:border-white/25"
          />
        </div>

        <div>
          <label
            htmlFor="careers-availability"
            className="mb-2 block text-sm text-white/80"
          >
            Availability
          </label>
          <select
            id="careers-availability"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-white/25"
          >
            <option value="">Select one</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Subcontractor">Subcontractor</option>
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="careers-experience"
            className="mb-2 block text-sm text-white/80"
          >
            Experience
          </label>
          <input
            id="careers-experience"
            type="text"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            placeholder="Years in the field, strongest skills, licenses, tools..."
            className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/30 outline-none transition focus:border-white/25"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="careers-message" className="mb-2 block text-sm text-white/80">
            Tell us about yourself *
          </label>
          <textarea
            id="careers-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="What kind of work have you done, what are you looking for, and why would you be a good fit?"
            required
            className="h-40 w-full resize-none rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/30 outline-none transition focus:border-white/25"
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="careers-resume"
            className="mb-2 block text-sm text-white/80"
          >
            Resume, portfolio, or social link
          </label>
          <input
            id="careers-resume"
            type="text"
            inputMode="url"
            value={resumeUrl}
            onChange={(e) => setResumeUrl(e.target.value)}
            placeholder="https://..."
            className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/30 outline-none transition focus:border-white/25"
          />
        </div>
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
