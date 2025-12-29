// components/ServicesBubblesDesktop.tsx

import Link from "next/link";

const services = [
  { key: "bathrooms", label: "Bathrooms" },
  { key: "tile", label: "Tile" },
  { key: "kitchens", label: "Kitchens" },
  { key: "3d", label: "3D Renders" },
];

export default function ServicesBubblesDesktop() {
  return (
    <div className="hidden md:block">
      <div className="mx-auto mt-10 grid max-w-4xl grid-cols-4 gap-4">
        {services.map((s) => (
          <Link
            key={s.key}
            href={`/contact?service=${encodeURIComponent(s.key)}`}
            className="group rounded-2xl border border-white/10 bg-white/5 px-5 py-5 text-center shadow-lg backdrop-blur transition hover:border-white/20 hover:bg-white/10"
          >
            <div className="text-sm font-semibold tracking-wide text-white/90">
              {s.label}
            </div>
            <div className="mt-2 text-[11px] uppercase tracking-[0.22em] text-white/55">
              Click to inquire
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
