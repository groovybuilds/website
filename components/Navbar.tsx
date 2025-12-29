// components/Navbar.tsx
"use client";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-20">
      <div className="mx-auto max-w-6xl px-6 py-6">
        <div className="flex items-start justify-between">
          {/* Brand */}
          <a href="/" className="flex flex-col items-center text-center">
            <p className="text-[11px] tracking-[0.22em] uppercase text-white/90 drop-shadow-[0_0_10px_rgba(0,0,0,0.9)]">
              Luxury Remodeling + Construction
            </p>

            <img
              src="/brand/watermark.png"
              alt=""
              className="mt-2 h-auto w-[390px] opacity-90 drop-shadow-[0_0_12px_rgba(0,0,0,0.95)]"
            />
          </a>

          {/* Navigation — text only */}
          <nav
            className="flex items-center gap-6 text-sm text-white"
            style={{ fontFamily: "'Monoton', cursive" }}
          >
            {[
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
            ].map((item) => (
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
        </div>
      </div>
    </header>
  );
}
