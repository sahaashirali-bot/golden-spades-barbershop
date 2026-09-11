import Image from "next/image";
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
  return (
    <section className="border-t border-gold/15 bg-cream-dim">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <p className="eyebrow-rule font-mono text-xs uppercase tracking-[0.14em] text-sable">
          Portfolio
        </p>
        <h2 className="mt-3 font-display text-4xl text-onyx sm:text-5xl">
          Recent Work
        </h2>
        <p className="mt-3 max-w-lg text-sable">
          A few cuts and braids straight from the chair.
        </p>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {GALLERY_PHOTOS.map((photo) => (
            <div
              key={photo.src}
              className="card-frame group relative aspect-[3/4] overflow-hidden"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 640px) 33vw, 50vw"
                className="object-cover transition duration-500 motion-safe:group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
