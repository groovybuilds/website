import type { Metadata } from "next";
import BackgroundCrossfade from "@/components/BackgroundCrossfade";
import CareersForm from "@/components/CareersForm";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Apply to work with Groovy Builds, an East Nashville design-build construction and remodeling company.",
  alternates: {
    canonical: "/careers",
  },
  openGraph: {
    title: "Careers at Groovy Builds",
    description:
      "Apply to work with Groovy Builds on residential construction, remodeling, and design-build projects in Nashville.",
    url: "/careers",
  },
};

export default function CareersPage() {
  return (
    <main className="relative min-h-dvh overflow-x-hidden bg-black text-white">
      <BackgroundCrossfade
        images={[
          "/portfolio/4.jpg",
          "/portfolio/5.jpg",
          "/portfolio/6.jpg",
          "/portfolio/8.jpg",
        ]}
        intervalMs={7500}
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/78 to-black" />
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(900px_420px_at_15%_20%,rgba(255,255,255,0.08),transparent_60%),radial-gradient(700px_360px_at_85%_20%,rgba(255,255,255,0.06),transparent_58%)]" />

      <Navbar />

      <section className="relative z-20 mx-auto grid w-full max-w-6xl gap-8 px-5 pb-12 pt-56 sm:px-6 sm:pb-16 sm:pt-72 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:pt-80">
        <div className="max-w-xl rounded-lg border border-white/10 bg-black/45 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.35)] backdrop-blur-md sm:p-6">
          <p
            className="text-[11px] uppercase tracking-[0.28em] text-white/55"
            style={{ fontFamily: "'Monoton', cursive" }}
          >
            Groovy Builds
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Careers
          </h1>
          <p className="mt-5 text-base leading-7 text-white/78">
            We build and remodel homes. We are looking for people who take pride
            in their work, show up ready, solve problems, and care about doing
            the job right.
          </p>
          <p className="mt-4 text-sm leading-6 text-white/64">
            Groovy Builds is growing in East Nashville and the surrounding area.
            The work ranges from remodels and additions to custom residential
            projects, but the standard stays the same: clean work, clear
            communication, respect for the home, and a job you can stand behind.
          </p>
          <p className="mt-4 text-sm leading-6 text-white/64">
            If you are a carpenter, tile setter, remodeler, helper, project lead,
            or solid subcontractor, send us your info and tell us what kind of
            work you do best.
          </p>
        </div>

        <div className="rounded-lg border border-white/10 bg-black/55 p-4 shadow-[0_20px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-6">
          <h2 className="text-xl font-semibold tracking-tight">
            Apply to Work With Us
          </h2>
          <p className="mt-2 text-sm leading-6 text-white/60">
            Tell us who you are, what you do, and how to reach you. Resume
            upload is optional but helpful.
          </p>
          <div className="mt-6">
            <CareersForm />
          </div>
        </div>
      </section>
    </main>
  );
}
