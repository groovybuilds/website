// app/contact/page.tsx
import Navbar from "@/components/Navbar";

export default function ContactPage() {
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

          <form
            className="mt-10 grid grid-cols-1 gap-6"
            action="#"
            method="post"
          >
            <div>
              <label className="block text-sm font-medium text-white/90">
                Project Details
              </label>
              <textarea
                rows={4}
                placeholder="Tell us about the space, scope, goals, and any inspiration…"
                className="mt-2 w-full rounded-xl bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 backdrop-blur-xl outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-white/30"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/90">
                Project Location
              </label>
              <input
                type="text"
                placeholder="City, neighborhood, or address"
                className="mt-2 w-full rounded-xl bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 backdrop-blur-xl outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-white/30"
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-white/90">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="(615) 555-1234"
                  className="mt-2 w-full rounded-xl bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 backdrop-blur-xl outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-white/30"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@email.com"
                  className="mt-2 w-full rounded-xl bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 backdrop-blur-xl outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-white/30"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black shadow-[0_0_22px_rgba(0,0,0,0.6)] transition hover:opacity-85"
              >
                Submit Project Inquiry
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
