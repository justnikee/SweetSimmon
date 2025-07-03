"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const slides = [
  "https://liveaevi.com/cdn/shop/files/Aevi-Website-Press-Stylist-White.png?v=1736523527",
  "https://liveaevi.com/cdn/shop/files/Aevi-Website-Press-VanityFair-White.png?v=1736523571",
  "https://liveaevi.com/cdn/shop/files/Aevi-Website-Press-RobbReport-White.png?v=1736523501",
  "https://liveaevi.com/cdn/shop/files/Aevi-Website-Press-Tirolerin-White.png?v=1736523597",
  "https://liveaevi.com/cdn/shop/files/Aevi-Website-Press-GentlemansJournal-White.png?v=1736523393",
  "https://liveaevi.com/cdn/shop/files/Aevi-Website-Press-GetTheGloss-White_b647140e-2ae5-414a-a5ec-14867756c7f9.png?v=1736523776",
  "https://liveaevi.com/cdn/shop/files/Aevi-Website-Press-Glamour-White.png?v=1736523475",
];

export default function MarqueeCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const startAutoScroll = () => {
      intervalRef.current = setInterval(() => {
        if (!container) return;
        container.scrollLeft += 1;
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }, 16);
    };

    const stopAutoScroll = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };

    startAutoScroll();

    container.addEventListener("mouseenter", stopAutoScroll);
    container.addEventListener("mouseleave", startAutoScroll);

    return () => {
      stopAutoScroll();
      container.removeEventListener("mouseenter", stopAutoScroll);
      container.removeEventListener("mouseleave", startAutoScroll);
    };
  }, []);

  const doubledSlides = [...slides, ...slides]; // For seamless loop

  return (
    <div
      ref={scrollRef}
      className="flex gap-28 overflow-x-scroll no-scrollbar space-x-6 py-8 bg-[#264EBB]"
      style={{ scrollBehavior: "smooth", whiteSpace: "nowrap" }}
    >
      {doubledSlides.map((src, i) => (
        <div key={i} className="relative w-[200px] aspect-[6.7] shrink-0">
          <Image
            src={src}
            alt={`Logo ${i}`}
            fill
            style={{ objectFit: "contain" }}
            sizes="200px"
          />
        </div>
      ))}
    </div>
  );
}
