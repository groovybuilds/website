"use client";

// components/ContactForm.tsx

import { useMemo, useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm(props: { service?: string; prefill: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [details, setDetails] = useState(props.prefill);

  const canSubmit = useMemo(() => {
    return email.trim().includes("@") && details.trim().length >= 10;
  }, [email, details]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: props.service || "",
          project_details: details,
          location,
          phone,
          email,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error || \`Request failed (\${res.status})\`);
      }

      setStatus("success");
      setEmail("");
      setPhone("");
      setLocation("");
      setDetails(props.prefill);
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err?.message || "Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-white/80">Email *</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-white/20"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-white/80">Phone</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(615) 555-1234"
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-white/20"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm text-white/80">Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Nashville, TN"
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-white/20"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm text-white/80">
          Project Details *
        </label>
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className="h-44 w-full resize-none rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-white/20"
          required
        />
      </div>

      {status === "error" && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {errorMsg}
        </div>
      )}

      {status === "success" && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
          Sent. We’ll be in touch soon.
        </div>
      )}

      <button
        type="submit"
        disabled={!canSubmit || status === "sending"}
        className="w-full rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
