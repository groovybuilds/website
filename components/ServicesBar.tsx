// components/ServicesBar.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const SERVICES = [
  {
    key: "bathrooms",
    title: "Bathrooms",
    detail: "Elevated daily rituals • warm floors • sculpted spaces",
  },
  {
    key: "kitchens",
    title: "Kitchens",
    detail: "Spaces that work hard • look effortless • age well",
  },
  {
    key: "additions",
    title: "Additions",
    detail: "Room to grow • designed to belong",
  },
  {
    key: "ground-up",
    title: "Ground Up Construction",
    detail: "Built once • built right",
  },
  {
    key: "renders",
    title: "3D Renders + Design",
    detail: "See it clearly • decide confidently",
  },
];

function contactHref(serviceKey: string) {
  return `/contact?service=${encodeURIComponent(serviceKey)}`;
}

export default function ServicesBar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* DESKTOP: clickable bubbles row */}
      <section
        id="services"
        className="hidden lg:block fixed inset-x-0 bottom-0 z-20"
        aria-label="Services"
      >
        <div className="mx-auto max-w-6xl px-6 pb-6">
          <div className="grid grid-cols-5 gap-6">
            {SERVICES.map((item) => (
              <Link
                key={item.key}
                href={contactHref(item.key)}
                className="group relative rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur-xl px-5 py-4 shadow-[0_12px_35px_rgba(0,0,0,0.45)] transition hover:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-white/25"
                aria-label={`Contact us about ${item.title}`}
              >
                {/* subtle luxe sheen */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition group-hover:opacity-100">
                  <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10" />
                  <div className="absolute -top-10 left-1/2 h-16 w-40 -translate-x-1/2 rounded-full bg-white/10 blur-2xl" />
                </div>

                <p className="relative text-sm font-semibold text-white">
                  {item.title}
                </p>
                <p className="relative mt-1 text-[12px] leading-snug text-white/70">
                  {item.detail}
                </p>

                <p className="relative mt-3 text-[11px] text-white/55">
                  Tap to inquire →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* MOBILE/TABLET: compact Services pill */}
      <section
        className="lg:hidden fixed inset-x-0 bottom-0 z-20"
        aria-label="Services"
      >
        <div className="mx-auto max-w-6xl px-4 pb-4 sm:px-6 sm:pb-6">
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="rounded-full border border-white/15 bg-white/[0.06] px-5 py-2.5 text-xs text-white/90 backdrop-blur-xl shadow-[0_12px_35px_rgba(0,0,0,0.45)] transition hover:bg-white/[0.08]"
              style={{ fontFamily: "'Monoton', cursive", letterSpacing: "0.08em" }}
              aria-label="Open services"
            >
              SERVICES
            </button>
          </div>
        </div>
      </section>

      {/* MOBILE/TABLET: bottom sheet with clickable services */}
      {open ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            className="absolute inset-0 bg-black/70"
            aria-label="Close services"
            onClick={() => setOpen(false)}
            type="button"
          />

          <div className="absolute left-4 right-4 bottom-4 rounded-3xl border border-white/10 bg-black/70 backdrop-blur-2xl shadow-[0_18px_60px_rgba(0,0,0,0.65)] overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4">
              <p
                className="text-[11px] uppercase tracking-[0.22em] text-white/75"
                style={{ fontFamily: "'Monoton', cursive" }}
              >
                Services
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-[11px] text-white/90 transition hover:bg-white/[0.08]"
                style={{ fontFamily: "'Monoton', cursive", letterSpacing: "0.08em" }}
                aria-label="Close services"
              >
                CLOSE
              </button>
            </div>

            <div className="px-5 pb-5">
              <div className="grid grid-cols-1 gap-2">
                {SERVICES.map((item) => (
                  <Link
                    key={item.key}
                    href={contactHref(item.key)}
                    onClick={() => setOpen(false)}
                    className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 backdrop-blur-xl transition hover:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-white/25"
                    aria-label={`Contact us about ${item.title}`}
                  >
                    <p className="text-sm font-semibold text-white/90">
                      {item.title}
                    </p>
                    <p className="mt-1 text-[12px] leading-snug text-white/60">
                      {item.detail}
                    </p>
                    <p className="mt-2 text-[11px] text-white/55">Inquire →</p>
                  </Link>
                ))}
              </div>

              <p className="mt-4 text-[11px] leading-relaxed text-white/55">
                Choose a service to start your inquiry.
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
