import type { Metadata } from "next";
import BackgroundCrossfade from "@/components/BackgroundCrossfade";
import Navbar from "@/components/Navbar";

const processSteps = [
  {
    title: "Initial Inquiry",
    body: "Reach out and tell us about your project — what you’re planning, where the property is located, and what goals you have for the space. Inspiration photos, timeline expectations, and a general investment range are all helpful in determining project fit and overall scope.",
  },
  {
    title: "Site Consultation & Scope Development",
    body: "We visit the property to evaluate existing conditions, take measurements, discuss layout direction, review construction considerations, and better understand the goals for the space. From there, we begin developing a detailed scope of work tailored to the home and project priorities.",
  },
  {
    title: "Pre-Construction & Project Planning",
    body: "Once the scope is established, we develop project pricing based on labor, materials, selections, scheduling, logistics, and construction complexity. Projects involving extensive design development, layout revisions, or finish coordination may move into a dedicated pre-construction phase prior to final approval.",
  },
  {
    title: "Construction & Project Management",
    body: "During construction, we maintain a clean and organized jobsite, coordinate trades and materials, communicate consistently, and address issues proactively to keep the project moving efficiently and professionally from start to finish.",
  },
  {
    title: "Final Walkthrough & Warranty",
    body: "Before project closeout, we review the completed work together, address remaining punch-list items, and remain available afterward should anything require attention.",
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
    question: "How do payments work?",
    answer:
      "Payment schedules vary depending on project size and scope, but most projects are broken into phases with progress payments throughout construction. An initial deposit is typically required to secure scheduling, begin planning, and cover early material and administrative costs. Larger projects are commonly structured around milestones such as demolition, rough-ins, tile installation, cabinetry, or completion of major phases of work. Any allowances or selection upgrades are reconciled as final decisions are made during the project. We aim to keep the payment process straightforward and transparent, with clear communication regarding upcoming invoices, selections, and project costs throughout construction.",
  },
  {
    question: "How long do projects typically take?",
    answer:
      "Project timelines depend on scope, material lead times, existing conditions, permitting, and the overall level of finish involved. Most bathroom remodels are completed within approximately 4–8 weeks of active construction once materials and selections are finalized. Kitchens and larger interior remodels often require 6–12+ weeks depending on cabinetry, layout modifications, inspections, and overall project complexity. Additions and larger-scale renovations can vary significantly in timeline due to structural work, permitting, engineering, utility coordination, and design complexity. Because of this, we typically do not provide timeline estimates for additions until we have a clear understanding of the project scope and existing conditions. Before construction begins, we review the anticipated schedule, project phases, and sequencing so expectations are clear from the start.",
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
