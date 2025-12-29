// components/ReviewsBar.tsx
"use client";

import ReviewsCarousel from "./ReviewsCarousel";

export default function ReviewsBar() {
  return (
    <div className="flex justify-center">
      <div className="rounded-3xl border border-white/10 bg-black/20 px-6 py-4 backdrop-blur-xl">
        <ReviewsCarousel
          reviews={[
            {
              text:
                "Groovy Builds delivered flawless tile work with exceptional attention to detail.",
              location: "Nashville, TN",
            },
            {
              text:
                "High-end finishes, clear communication, and beautiful results.",
              location: "Green Hills",
            },
            {
              text:
                "Everything felt intentional and well executed from start to finish.",
              location: "12 South",
            },
          ]}
        />
      </div>
    </div>
  );
}
