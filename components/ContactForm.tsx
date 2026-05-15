"use client";

import React, { useEffect, useMemo, useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [details, setDetails] = useState("");

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setService(params.get("service") || "");
  }, []);

  const canSubmit = useMemo(() => {
    return Boolean(
      name.trim() &&
        location.trim() &&
        details.trim() &&
        (email.trim() || phone.trim())
    );
  }, [name, email, phone, location, details]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit || status === "sending") return;

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          service,
          email,
          phone,
          location,
          details,
        }),
      });

      let data: any = null;
      try {
        data = await res.json();
      } catch {
        // ignore
      }

      if (!res.ok) {
        throw new Error(data?.error || `Request failed (${res.status})`);
      }

      setStatus("success");
      setName("");
      setEmail("");
      setPhone("");
      setLocation("");
      setDetails("");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err?.message || "Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {/* Force form to be clickable even if something weird is layered nearby */}
      <div className="relative z-30 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="contact-name" className="mb-2 block text-sm text-white/80">
            Name *
          </label>
          <input
            id="contact-name"
            style={{ pointerEvents: "auto" }}
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-white/20"
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="mb-2 block text-sm text-white/80">
            Email
          </label>
          <input
            id="contact-email"
            style={{ pointerEvents: "auto" }}
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-white/20"
          />
        </div>

        <div>
          <label htmlFor="contact-phone" className="mb-2 block text-sm text-white/80">
            Phone
          </label>
          <input
            id="contact-phone"
            style={{ pointerEvents: "auto" }}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(615) 555-1234"
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-white/20"
          />
        </div>

        <p className="text-xs leading-relaxed text-white/50 sm:col-span-2">
          Please include at least one contact method: email or phone.
        </p>

        <div className="sm:col-span-2">
          <label htmlFor="contact-location" className="mb-2 block text-sm text-white/80">
            Location *
          </label>
          <input
            id="contact-location"
            style={{ pointerEvents: "auto" }}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Nashville, TN"
            required
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-white/20"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-details" className="mb-2 block text-sm text-white/80">
            Project details *
          </label>
          <textarea
            id="contact-details"
            style={{ pointerEvents: "auto" }}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="What are you looking to build or remodel? Any dimensions, photos, links, or timeline info helps."
            required
            className="h-44 w-full resize-none rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-white/20"
          />
        </div>
      </div>

      {status === "error" && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {errorMsg}
        </div>
      )}

      {status === "success" && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
          Message sent. We’ll reply within 1–2 business days.
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
