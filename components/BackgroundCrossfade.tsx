"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  images: string[];
  intervalMs?: number;
  fadeMs?: number;
};

export default function BackgroundCrossfade({
  images,
  intervalMs = 6500,
  fadeMs = 1200,
}: Props) {
  const safeImages = useMemo(() => images.filter(Boolean), [images]);

  const [index, setIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [fading, setFading] = useState(false);

  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (safeImages.length <= 1) return;

    const run = () => {
      const ni = (index + 1) % safeImages.length;
      setNextIndex(ni);
      setFading(true);

      timeoutRef.current = window.setTimeout(() => {
        setIndex(ni);
        setFading(false);
      }, fadeMs);
    };

    intervalRef.current = window.setInterval(run, intervalMs);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [index, intervalMs, fadeMs, safeImages.length]);

  const current = safeImages[index] ?? "";
  const next = safeImages[nextIndex] ?? current;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Solid base — prevents any flash */}
      <div className="absolute inset-0 bg-black" />

      {/* Current image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${current}')` }}
      />

      {/* Next image (only visible during fade) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${next}')`,
          opacity: fading ? 1 : 0,
          transition: `opacity ${fadeMs}ms ease-in-out`,
        }}
      />

      {/* Luxury darkening layers (lighter + cleaner) */}
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/45" />
      <div className="absolute inset-0 shadow-[inset_0_0_140px_rgba(0,0,0,0.55)]" />
    </div>
  );
}
