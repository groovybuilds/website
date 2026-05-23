import type { Metadata } from "next";
import BackgroundCrossfade from "@/components/BackgroundCrossfade";
import Navbar from "@/components/Navbar";

const processSteps = [
  {
    title: "Initial Inquiry",
    body: "Reach out, tell us about your project — what you’re planning, where the property is located, and what goals you have for the space. Inspiration photos, rough investment range, and timeline expectations are all helpful in determining project fit and scope.",
  },
  {
    title: "Project Consultation",
    body: "We’ll discuss the project in more detail, including layout ideas, level of finish, construction considerations, budget expectations, and overall feasibility. This helps determine the best path forward and whether we’re the right fit for the project.",
  },
  {
    title: "Site Visit + Scope Development",
    body: "If the project moves forward, we’ll visit the property to evaluate existing conditions, take measurements, discuss priorities, and begin developing a detailed scope of work tailored to the space and project goals.",
  },
  {
    title: "Pre-Construction + Estimating",
    body: "Once the scope is established, we assemble project pricing based on labor, materials, selections, logistics, timeline, and construction complexity. Projects involving design, layout development, or extensive planning may move into a dedicated pre-construction phase prior to final pricing.",
  },
  {
    title: "Construction + Project Management",
    body: "During construction, we maintain a clean and organized jobsite, communicate consistently, coordinate scheduling and materials, and address issues proactively to keep the project moving efficiently and professionally.",
  },
];

const costRanges = [
  {
    title: "Bathroom Remodels",
    body: "Most of our bathroom remodels fall between $25,000–$75,000+ depending on size, layout modifications, tile selections, plumbing fixtures, and overall complexity.",
  },
  {
    title: "Kitchen Remodels",
    body: "Most kitchen remodels typically range from $60,000–$150,000+ depending on cabinetry, appliances, structural changes, finishes, and customization.",
  },
  {
    title: "Additions + Larger Renovations",
    body: "Additions and large-scale remodels vary significantly based on size, structural requirements, and finish level. Most projects begin around $150,000+.",
  },
];

const faqs = [
  {
    question: "What areas does Groovy Builds service?",
    answer:
      "We’re based in East Nashville and work throughout Nashville and Middle Tennessee.",
  },
  {
    question: "What kind of projects do you take on?",
    answer:
      "We take on residential remodeling, design-build projects, bathrooms, kitchens, additions, custom tiled showers, tile work, and larger custom home projects when the fit is right. The Groovy Builds in-house team specializes in all forms of tile work.",
  },
  {
    question: "Do you offer planning, design, and 3D renders?",
    answer:
      "Yes! Groovy Builds is a full-service Design-Build company and would be happy to assist you throughout the planning, design, and construction process. We offer space planning, finish selection guidance, and photorealistic 3D renderings to help visualize your project before construction begins. Whether you already have a clear vision or need help developing one, we’re here to guide the process from concept to completion.",
  },
  {
    question: "How do estimates work?",
    answer:
      "A real estimate depends on scope. Size, finishes, site conditions, and material choices all affect the number. We try to be clear about what’s included, what’s not included, and where allowances or unknowns may exist.",
  },
  {
    question: "How do you handle changes once the project starts?",
    answer:
      "Changes happen. If something needs to change, we talk through the cost, timeline, and scope before moving forward so everyone is on the same page.",
  },
  {
    question: "Can we live in the house during construction?",
    answer:
      "Sometimes. It depends on the size of the project and what part of the home is being worked on. We’ll talk through dust, access, safety, utilities, and what day-to-day life will realistically look like.",
  },
  {
    question: "Are you licensed and insured?",
    answer:
      "Groovy Builds is a licensed, bonded, and insured general contractor in the state of Tennessee. License #85459.",
  },
  {
    question: "Do you handle permits and inspections?",
    answer:
      "When permits or inspections are required for the project, we coordinate that process and make sure the work is handled properly.",
  },
  {
    question: "Do you use subcontractors?",
    answer:
      "Yes, when the project calls for specialized trades. We coordinate the work and keep the project moving so everything stays organized.",
  },
  {
    question: "How do we get started?",
    answer:
      "Send us your project details through the contact form. The more information you include, the easier it is for us to understand the project and follow up with the right next step.",
  },
];

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Learn about the Groovy Builds process, project costs, estimates, design-build planning, 3D renderings, remodeling, custom tile work, permits, and starting a project in East Nashville.",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "FAQ | Groovy Builds",
    description:
      "Questions and answers about working with Groovy Builds, from first conversation to final walkthrough.",
    url: "/faq",
  },
};

export default function FAQPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What do your projects typically cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: [
            "Every project is different, but having realistic expectations upfront helps everyone start in the right place. Final pricing depends on scope, layout changes, material selections, structural work, and overall level of finish.",
            ...costRanges.map((item) => `${item.title}: ${item.body}`),
          ].join(" "),
        },
      },
      ...faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    ],
  };

  return (
    <main className="relative min-h-dvh overflow-x-hidden bg-black text-white">
      <BackgroundCrossfade
        images={[
          "/portfolio/1.jpg",
          "/portfolio/2.jpg",
          "/portfolio/4.jpg",
          "/portfolio/7.jpg",
        ]}
        intervalMs={7500}
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/82 to-black" />
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(900px_420px_at_15%_20%,rgba(255,255,255,0.08),transparent_60%),radial-gradient(700px_360px_at_85%_20%,rgba(255,255,255,0.06),transparent_58%)]" />

      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="relative z-20 mx-auto w-full max-w-5xl px-5 pb-12 pt-56 sm:px-6 sm:pb-16 sm:pt-72 lg:pt-80">
        <div className="rounded-lg border border-white/10 bg-black/55 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-7">
          <p
            className="text-[11px] uppercase tracking-[0.28em] text-white/55"
            style={{ fontFamily: "'Monoton', cursive" }}
          >
            Groovy Builds
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            FAQ
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-white/72">
            Renovating or building is a big deal. Our goal is to make the
            process clear from the first conversation to the final walkthrough.
            Here’s how we typically work, what to expect, and the questions we
            hear most often.
          </p>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold tracking-tight text-white">
              Groovy Builds Process
            </h2>
            <div className="mt-5 grid gap-4">
              {processSteps.map((step, index) => (
                <div
                  key={step.title}
                  className="grid gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-4 sm:grid-cols-[4rem_1fr] sm:p-5"
                >
                  <div className="text-sm font-semibold uppercase tracking-[0.22em] text-white/45">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-white/64">
                      {step.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12 rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6">
            <h2 className="text-2xl font-semibold tracking-tight text-white">
              What do your projects typically cost?
            </h2>
            <p className="mt-4 text-sm leading-6 text-white/64">
              Every project is different, but having realistic expectations
              upfront helps everyone start in the right place. Final pricing
              depends on scope, layout changes, material selections, structural
              work, and overall level of finish.
            </p>

            <div className="mt-5 grid gap-4">
              {costRanges.map((item) => (
                <div
                  key={item.title}
                  className="rounded-lg border border-white/10 bg-black/25 p-4"
                >
                  <h3 className="text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/64">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-5 text-sm leading-6 text-white/64">
              We focus on thoughtful planning, quality craftsmanship, detailed
              project management, and long-term durability rather than competing
              on the lowest price. If you&apos;re looking for a highly
              organized, detail-oriented remodeling experience, we&apos;d be
              happy to discuss your project further.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold tracking-tight text-white">
              FAQ
            </h2>
            <div className="mt-5 divide-y divide-white/10">
              {faqs.map((faq) => (
                <details key={faq.question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold text-white">
                    <span>{faq.question}</span>
                    <span className="shrink-0 text-xl leading-none text-white/45 transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-3xl text-sm leading-6 text-white/64">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row">
            <a
              href="/contact"
              className="rounded-lg bg-white px-5 py-3 text-center text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Start a Project
            </a>
            <a
              href="/careers"
              className="rounded-lg border border-white/15 bg-white/[0.06] px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/[0.1]"
            >
              Apply to Work With Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
