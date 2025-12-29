// components/StatementLine.tsx

export default function StatementLine() {
  return (
    <>
      {/* MOBILE: vertical on right */}
      <div className="fixed right-3 top-1/2 z-40 -translate-y-1/2 md:hidden">
        <div className="rounded-full border border-white/15 bg-white/5 px-3 py-2 backdrop-blur">
          <span
            className="text-[11px] font-semibold tracking-[0.28em] text-white/80"
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              whiteSpace: "nowrap",
            }}
          >
            THOUGHTFUL SPACES • DESIGNED WITH INTENTION • CRAFTED WITH CARE
          </span>
        </div>
      </div>

      {/* DESKTOP: bottom centered */}
      <div className="fixed bottom-6 left-1/2 z-40 hidden -translate-x-1/2 md:block">
        <div className="rounded-full border border-white/15 bg-white/5 px-6 py-3 backdrop-blur">
          <span className="text-xs font-semibold tracking-[0.30em] text-white/75">
            THOUGHTFUL SPACES • DESIGNED WITH INTENTION • CRAFTED WITH CARE
          </span>
        </div>
      </div>
    </>
  );
}
