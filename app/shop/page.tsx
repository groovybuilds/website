// app/shop/page.tsx
import Navbar from "@/components/Navbar";

export default function ShopPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Static luxury background */}
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/75" />
      <div className="absolute inset-0 shadow-[inset_0_0_140px_rgba(0,0,0,0.65)]" />

      <Navbar />

      <section className="relative z-10">
        <div className="mx-auto max-w-6xl px-6 pt-44 pb-44">
          <div className="mx-auto max-w-3xl text-center">
            <p
              className="text-[11px] tracking-[0.28em] uppercase text-white/55 drop-shadow-[0_0_10px_rgba(0,0,0,0.9)]"
              style={{ fontFamily: "'Monoton', cursive" }}
            >
              Groovy Builds • Shop
            </p>

            <h1
              className="mt-6 text-4xl sm:text-5xl font-semibold text-white/90 drop-shadow-[0_0_18px_rgba(0,0,0,0.9)]"
              style={{ fontFamily: "'Monoton', cursive" }}
            >
              Coming Soon.
            </h1>

            <p className="mt-5 text-base sm:text-lg leading-relaxed text-white/50">
              Groovy merch and small-batch 3D printed tools.
            </p>

            <div className="mt-10">
              <a
                href="/"
                className="text-sm text-white/45 hover:text-white/70 transition"
              >
                ← Back home
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Subtle preview row */}
      <section
        className="fixed inset-x-0 bottom-0 z-20"
        aria-label="Shop preview"
      >
        <div className="mx-auto max-w-6xl px-6 pb-6">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              {
                title: "Groovy Merch",
                detail: "Quality pieces • made to order • clean graphics",
              },
              {
                title: "Small-Batch 3D Printed Tools",
                detail: "Purpose-built • jobsite-ready • limited runs",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur-xl px-6 py-5 shadow-[0_12px_35px_rgba(0,0,0,0.45)]"
              >
                <p className="text-sm font-semibold text-white/90">
                  {item.title}
                </p>
                <p className="mt-1 text-[12px] leading-snug text-white/60">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
