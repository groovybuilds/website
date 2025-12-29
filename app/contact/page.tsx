// app/contact/page.tsx

export const dynamic = "force-dynamic";
export const revalidate = 0;

import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";

type PageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

function getService(searchParams?: PageProps["searchParams"]) {
  const raw = searchParams?.service;
  if (Array.isArray(raw)) return raw[0] ?? "";
  return typeof raw === "string" ? raw : "";
}

function buildPrefill(serviceKey: string) {
  const base =
    "Hi Groovy Builds — we’re interested in learning more about working together.\n\n";

  const map: Record<string, string> = {
    bathrooms:
      "We are interested in a bathroom remodel. Here are the details:\n- Location:\n- Scope:\n- Measurements (if known):\n- Materials / finishes:\n- Style / inspiration:\n- Timeline:\n- Budget range (optional):\n",
    kitchens:
      "We are interested in a kitchen remodel. Here are the details:\n- Location:\n- Scope:\n- Cabinets / counters (if applicable):\n- Materials / finishes:\n- Style / inspiration:\n- Timeline:\n- Budget range (optional):\n",
    tile:
      "We are interested in a tile project. Here are the details:\n- Location:\n- Area(s) being tiled:\n- Approx sq ft:\n- Tile type / size (if known):\n- Pattern / layout:\n- Timeline:\n- Budget range (optional):\n",
    "3d":
      "We are interested in 3D photorealistic renders (to scale). Here are the details:\n- Location:\n- Space type (bath/kitchen/whole home/etc):\n- Measurements / plans available:\n- Desired deliverables:\n- Timeline:\n",
  };

  const key = (serviceKey || "").toLowerCase();
  return base + (map[key] ?? "Here are the project details:\n");
}

export default function ContactPage({ searchParams }: PageProps) {
  const service = getService(searchParams);
  const prefill = buildPrefill(service);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="mx-auto max-w-3xl px-6 py-14">
        <div className="mb-10">
          <h1 className="text-4xl font-semibold tracking-tight">Contact</h1>
          <p className="mt-3 text-white/70">
            Share your project details and timeline. We’ll follow up with next
            steps.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur">
          <ContactForm service={service} prefill={prefill} />
        </div>

        <p className="mt-8 text-sm text-white/50">
          Prefer email?{" "}
          <a
            className="underline hover:text-white"
            href="mailto:groovybuilds@gmail.com"
          >
            groovybuilds@gmail.com
          </a>
        </p>
      </div>
    </main>
  );
}
