// app/page.tsx
import BackgroundCrossfade from "@/components/BackgroundCrossfade";
import Navbar from "@/components/Navbar";

export default function HomePage() {
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

      {/* SERVICES — individual bubbles only */}
      <section
        id="services"
        className="fixed inset-x-0 bottom-0 z-20"
        aria-label="Services"
      >
        <div className="mx-auto max-w-6xl px-6 pb-6">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {[
              {
                title: "Bathrooms",
                detail:
                  "Elevated daily rituals • warm floors • sculpted spaces",
              },
              {
                title: "Kitchens",
                detail:
                  "Spaces that work hard • look effortless • age well",
              },
              {
                title: "Additions",
                detail:
                  "Room to grow • designed to belong",
              },
              {
                title: "Ground Up Construction",
                detail:
                  "Built once • built right",
              },
              {
                title: "3D Renders + Design",
                detail:
                  "See it clearly • decide confidently",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group relative rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur-xl px-5 py-4 shadow-[0_12px_35px_rgba(0,0,0,0.45)] transition hover:bg-white/[0.08]"
              >
                {/* subtle luxe sheen */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition group-hover:opacity-100">
                  <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10" />
                  <div className="absolute -top-10 left-1/2 h-16 w-40 -translate-x-1/2 rounded-full bg-white/10 blur-2xl" />
                </div>

                <p className="relative text-sm font-semibold text-white">
                  {item.title}
                </p>
                <p className="relative mt-1 text-[12px] text-white/70 leading-snug">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATEMENT — sits just above bubbles */}
      <section
        aria-label="Brand statement"
        className="fixed inset-x-0 bottom-[160px] z-30"
      >
        <div className="mx-auto max-w-6xl px-6">
          <p
            className="text-center text-xl sm:text-2xl font-medium text-white/30 drop-shadow-[0_0_12px_rgba(0,0,0,0.9)]"
            style={{
              fontFamily: "'Monoton', cursive",
              letterSpacing: "0.04em",
            }}
          >
            thoughtful spaces. designed with intention. crafted with care.
          </p>
        </div>
      </section>
    </main>
  );
}
