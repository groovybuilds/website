// app/page.tsx
"use client";

import BackgroundCrossfade from "@/components/BackgroundCrossfade";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useEffect, useState } from "react";

type ServiceItem = {
  key: string;
  title: string;
  detail: string;
};

const SERVICES: ServiceItem[] = [
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

export default function HomePage() {
  const [servicesOpen, setServicesOpen] = useState(false);

  // Lock scroll when mobile services menu is open
  useEffect(() => {
    if (!servicesOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [servicesOpen]);

  // Escape closes mobile menu
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setServicesOpen(false);
    }
    if (servicesOpen) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [servicesOpen]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <BackgroundCrossfade
        images={[
          "/portfolio/1.jpg",
          "/portfolio/2.jpg",
          "/portfolio/3.jpg",
          "/portfolio/4.jpg",
          "/portfolio/5.jpg",
          "/portfolio/6.jpg",
          "/portfolio/7.jpg",
          "/portfolio/8.jpg",
          "/portfolio/9.jpg",
        ]}
        intervalMs={6500}
      />

      <Navbar />

      {/* Spacer */}
      <section id="home" className="relative z-10">
        <div className="mx-auto max-w-6xl px-6 pt-40 pb-56" />
      </section>

      {/* =========================
          MOBILE ONLY — VERTICAL STATEMENT (RIGHT EDGE)
         ========================= */}
      <section
        aria-label="Brand statement"
        className="lg:hidden fixed top-0 right-0 z-30 h-full flex items-center pr-2"
      >
        <p
          className="text-[16px] font-medium text-white/35 tracking-wide"
          style={{
            fontFamily: "'Monoton', cursive",
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            letterSpacing: "0.08em",
          }}
        >
          thoughtful spaces. designed with intention. crafted with precision.
        </p>
      </section>

      {/* =========================
          MOBILE ONLY — Services button
         ========================= */}
      <section className="lg:hidden fixed inset-x-0 bottom-0 z-40">
        <div className="mx-auto max-w-6xl px-6 pb-6">
          <button
            type="button"
            onClick={() => setServicesOpen(true)}
            className="w-full rounded-full border border-white/12 bg-white/[0.07] backdrop-blur-xl px-5 py-4 text-sm font-semibold text-white shadow-[0_12px_35px_rgba(0,0,0,0.45)] transition hover:bg-white/[0.09]"
          >
            Services{" "}
            <span className="ml-2 text-white/70 font-normal">
              Tap to inquire →
            </span>
          </button>
        </div>
      </section>

      {/* =========================
          MOBILE ONLY — Services menu sheet
         ========================= */}
      {servicesOpen ? (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setServicesOpen(false)}
          />

          <div className="absolute inset-x-0 bottom-0">
            <div className="mx-auto max-w-6xl px-6 pb-6">
              <div className="rounded-3xl border border-white/10 bg-black/70 backdrop-blur-2xl shadow-[0_18px_60px_rgba(0,0,0,0.6)] overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                  <p className="text-sm font-semibold text-white">
                    Choose a service
                  </p>
                  <button
                    onClick={() => setServicesOpen(false)}
                    className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-semibold text-white/90"
                  >
                    Close
                  </button>
                </div>

                <div className="p-4 grid gap-3">
                  {SERVICES.map((item) => (
                    <Link
                      key={item.key}
                      href={`/contact?service=${encodeURIComponent(item.key)}`}
                      onClick={() => setServicesOpen(false)}
                      className="rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-xl px-4 py-4 shadow-[0_10px_28px_rgba(0,0,0,0.45)]"
                    >
                      <p className="text-sm font-semibold text-white">
                        {item.title}
                      </p>
                      <p className="mt-1 text-[12px] text-white/70">
                        {item.detail}
                      </p>
                      <p className="mt-2 text-[11px] text-white/55">
                        Tap to inquire →
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* =========================
          DESKTOP ONLY — Original bubbles (unchanged)
         ========================= */}
      <section className="hidden lg:block fixed inset-x-0 bottom-0 z-20">
        <div className="mx-auto max-w-6xl px-6 pb-6">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {SERVICES.map((item) => (
              <Link
                key={item.key}
                href={`/contact?service=${encodeURIComponent(item.key)}`}
                className="rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur-xl px-5 py-4 shadow-[0_12px_35px_rgba(0,0,0,0.45)]"
              >
                <p className="text-sm font-semibold text-white">
                  {item.title}
                </p>
                <p className="mt-1 text-[12px] text-white/70">
                  {item.detail}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================
          DESKTOP ONLY — Statement (unchanged)
         ========================= */}
      <section className="hidden lg:block fixed inset-x-0 bottom-[120px] z-30">
        <div className="mx-auto max-w-6xl px-6">
          <p
            className="text-center text-xl sm:text-2xl font-medium text-white/30"
            style={{
              fontFamily: "'Monoton', cursive",
              letterSpacing: "0.04em",
            }}
          >
            thoughtful spaces. designed with intention. crafted with precision.
          </p>
        </div>
      </section>
    </main>
  );
}
