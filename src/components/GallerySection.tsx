"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PHOTOS } from "@/lib/photos";

const GALLERY_PHOTOS = [
  { src: PHOTOS.gallery1, alt: "Fresh fade, finished look" },
  { src: PHOTOS.gallery2, alt: "Clean lineup and beard shape-up" },
  { src: PHOTOS.gallery3, alt: "Sharp skin fade, side view" },
  { src: PHOTOS.gallery4, alt: "Freestyle braid work" },
  { src: PHOTOS.gallery5, alt: "Golden Spades Barbershop, inside the shop" },
  { src: PHOTOS.storefront, alt: "Recent cut from the chair" },
];

export function GallerySection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function onScroll() {
      if (!track) return;
      const trackRect = track.getBoundingClientRect();
      const centerX = trackRect.left + trackRect.width / 2;
      let closest = 0;
      let closestDist = Infinity;
      Array.from(track.children).forEach((child, i) => {
        const rect = (child as HTMLElement).getBoundingClientRect();
        const dist = Math.abs(rect.left + rect.width / 2 - centerX);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });
      setActive(closest);
    }

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToIndex(i: number) {
    const track = trackRef.current;
    const child = track?.children[i] as HTMLElement | undefined;
    if (!track || !child) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    track.scrollTo({
      left: child.offsetLeft - track.offsetLeft,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }

  return (
    <section className="border-t border-gold/15 bg-cream-dim">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow-rule font-mono text-xs uppercase tracking-[0.14em] text-sable">
              Portfolio
            </p>
            <h2 className="mt-3 font-display text-4xl text-onyx sm:text-5xl">
              Recent Work
            </h2>
            <p className="mt-3 max-w-lg text-sable">
              A few cuts and braids straight from the chair. Swipe or use the
              arrows to browse.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollToIndex(Math.max(0, active - 1))}
              disabled={active === 0}
              aria-label="Previous photo"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/25 text-onyx transition hover:border-gold disabled:opacity-30"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() =>
                scrollToIndex(
                  Math.min(GALLERY_PHOTOS.length - 1, active + 1)
                )
              }
              disabled={active === GALLERY_PHOTOS.length - 1}
              aria-label="Next photo"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/25 text-onyx transition hover:border-gold disabled:opacity-30"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {GALLERY_PHOTOS.map((photo, i) => (
            <div
              key={photo.src}
              className="card-frame group relative aspect-[3/4] w-[72%] shrink-0 snap-center overflow-hidden sm:w-[42%] lg:w-[31%]"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 31vw, (min-width: 640px) 42vw, 72vw"
                className="object-cover transition duration-500 motion-safe:group-hover:scale-105"
                priority={i === 0}
              />
            </div>
          ))}
        </div>

        <div
          className="mt-6 flex items-center justify-center gap-2"
          role="tablist"
          aria-label="Gallery photos"
        >
          {GALLERY_PHOTOS.map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              role="tab"
              aria-selected={active === i}
              aria-label={`Go to photo ${i + 1} of ${GALLERY_PHOTOS.length}`}
              onClick={() => scrollToIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                active === i
                  ? "w-6 bg-gold"
                  : "w-1.5 bg-onyx/20 hover:bg-onyx/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
