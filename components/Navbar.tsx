// components/Navbar.tsx
"use client";

import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Contact", href: "/contact" },
  { label: "Shop", href: "/shop" },
  {
    label: "Social",
    href: "https://instagram.com/groovybuilds",
    external: true,
  },
  {
    label: "Reviews",
    href: "https://g.page/r/CcNki1lgs9hwEAE/review",
    external: true,
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    // lock scroll when menu open
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed top-0 left-0 right-0 z-30">
      {/* subtle header fade for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-4 py-3 sm:px-6 sm:py-6">
        <div className="flex items-start justify-between gap-4">
          {/* Brand */}
          <a href="/" className="flex flex-col items-center text-center">
            <p className="text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-white/85 drop-shadow-[0_0_10px_rgba(0,0,0,0.9)]">
              Luxury Remodeling + Construction
            </p>

            <img
              src="/brand/watermark.png"
              alt=""
              className="mt-2 h-auto w-[220px] sm:w-[300px] md:w-[390px] opacity-90 drop-shadow-[0_0_12px_rgba(0,0,0,0.95)]"
            />
          </a>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-6 text-sm text-white"
            style={{ fontFamily: "'Monoton', cursive" }}
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                className="font-normal text-white drop-shadow-[0_0_12px_rgba(0,0,0,0.95)] transition hover:opacity-80"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden pt-2">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-xs text-white/90 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.45)] transition hover:bg-white/[0.08]"
              style={{ fontFamily: "'Monoton', cursive", letterSpacing: "0.08em" }}
              aria-label="Open menu"
            >
              MENU
            </button>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {open ? (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            className="absolute inset-0 bg-black/70"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            type="button"
          />

          <div className="absolute right-4 top-4 left-4 rounded-3xl border border-white/10 bg-black/70 backdrop-blur-2xl shadow-[0_18px_60px_rgba(0,0,0,0.65)] overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4">
              <p
                className="text-[11px] uppercase tracking-[0.22em] text-white/75"
                style={{ fontFamily: "'Monoton', cursive" }}
              >
                Groovy Builds
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-[11px] text-white/90 transition hover:bg-white/[0.08]"
                style={{ fontFamily: "'Monoton', cursive", letterSpacing: "0.08em" }}
                aria-label="Close menu"
              >
                CLOSE
              </button>
            </div>

            <div className="px-5 pb-5">
              <div className="grid grid-cols-1 gap-2">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noreferrer" : undefined}
                    onClick={() => setOpen(false)}
                    className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white/90 backdrop-blur-xl transition hover:bg-white/[0.08]"
                    style={{ fontFamily: "'Monoton', cursive" }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              <p className="mt-4 text-[11px] leading-relaxed text-white/55">
                Nashville • Luxury tile + remodels • Thoughtful details
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
