// app/contact/page.tsx
"use client";

import Navbar from "@/components/Navbar";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

function buildPrefill(serviceKey: string | null) {
  const base =
    "Hi Groovy Builds — we’re interested in learning more about working together.\n\n";

  const map: Record<string, string> = {
    bathrooms:
      "We are interested in a bathroom remodel. Here are the details:\n- Current layout / conditions:\n- Scope (tile, shower, vanity, plumbing, etc.):\n- Desired style / inspiration:\n- Timeline:\n- Budget range (optional):\n",
    kitchens:
      "We are interested in a kitchen remodel. Here are the details:\n- Cabinets / countertops / backsplash needs:\n- Appliances / layout changes:\n- Desired style / inspiration:\n- Timeline:\n- Budget range (optional):\n",
    additions:
      "We are interested in an addition. Here are the details:\n- What space are we adding:\n- Approx. size (if known):\n- Any structural / layout notes:\n- Timeline:\n- Budget range (optional):\n",
    "ground-up":
      "We are interested in a ground-up construction project. Here are the details:\n- Location / lot status:\n- Estimated square footage:\n- Plan status (concept / drawings / permitted):\n- Timeline:\n- Budget range (optional):\n",
    renders:
      "We are interested in 3D photorealistic renders + design support. Here are the details:\n- What space(s) are we designing:\n- Current measurements / drawings (if available):\n- Inspiration / style direction:\n- Timeline:\n",
  };

  if (!serviceKey) return base;
  const key = serviceKey.toLowerCase();
  return base + (map[key] ?? "Here are the project details:\n");
}

export default function ContactPage() {
  const params = useSearchParams();
  const service = params.get("service");

  const initialMessage = useMemo(() => buildPrefill(service), [service]);

  const [details, setDetails] = useState(initialMessage);
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: service ?? "",
          project_details: details,
          location,
          phone,
          email,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data?.error || `Request failed (${res.status})`);
        return;
      }

      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err?.message || "Unknown error");
    }
  }

  return (
    <main className="relative min-h-screen bg-black text-white">
      <Navbar />

      <section className="relative z-10">
        <div className="mx-auto max-w-3xl px-6 pt-44 pb-32">
          <h1
            className="text-3xl font-semibold md:text-4xl drop-shadow-[0_0_14px_rgba(0,0,0,0.9)]"
            style={{ fontFamily: "'Monoton', cursive" }}
          >
            Tell us about your project
          </h1>

          <p className="mt-4 text-sm leading-relaxed text-white/80 drop-shadow-[0_0_12px_rgba(0,0,0,0.9)]">
            The more detail you provide, the better we can understand your goals,
            scope, and timeline. We’ll follow up shortly.
          </p>

          <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-[12px] text-white/70 backdrop-blur-xl">
            Please send any photos, videos, drawings, or files directly to{" "}
            <span className="font-semibold text-white">
              groovybuilds@gmail.com
            </span>{" "}
            after submitting this form.
          </div>

          {status === "success" ? (
            <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.06] px-6 py-6 backdrop-blur-xl">
              <p className="text-lg font-semibold text-white">
                Thank you — we received your inquiry.
              </p>
              <p className="mt-2 text-sm text-white/70">
                We’ll review it and follow up shortly.
              </p>
            </div>
          ) : (
            <form
              className="mt-10 grid grid-cols-1 gap-6"
              onSubmit={handleSubmit}
            >
              <div>
                <label className="block text-sm font-medium text-white/90">
                  Project Details
                </label>
                <textarea
                  rows={6}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="mt-2 w-full rounded-xl bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 backdrop-blur-xl outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-white/30"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90">
                  Project Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City, neighborhood, or address"
                  className="mt-2 w-full rounded-xl bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 backdrop-blur-xl outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-white/30"
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-white/90">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(615) 555-1234"
                    className="mt-2 w-full rounded-xl bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 backdrop-blur-xl outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-white/30"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="mt-2 w-full rounded-xl bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 backdrop-blur-xl outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-white/30"
                    required
                  />
                </div>
              </div>

              {status === "error" ? (
                <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-white/85">
                  <p className="font-semibold">Submission failed</p>
                  <p className="mt-1 text-white/70 break-words">{errorMsg}</p>
                </div>
              ) : null}

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black shadow-[0_0_22px_rgba(0,0,0,0.6)] transition hover:opacity-85 disabled:opacity-60"
                >
                  {status === "sending"
                    ? "Sending..."
                    : "Submit Project Inquiry"}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
