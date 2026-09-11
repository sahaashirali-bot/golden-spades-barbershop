import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock, Star } from "lucide-react";
import { getBarbers, getReviews, getServices } from "@/lib/data";
import { ServiceRow } from "@/components/ServiceRow";
import { BarberCard } from "@/components/BarberCard";
import { ReviewCard } from "@/components/ReviewCard";
import { GallerySection } from "@/components/GallerySection";
import { SHOP } from "@/lib/shop";
import { PHOTOS } from "@/lib/photos";

const RIBBON_ITEMS = [
  "WALK-INS WELCOME",
  "FREESTYLE BRAIDS",
  "HOT TOWEL SHAVES",
  "HOUSTON, TX",
  "5.0 RATED",
  "BOOK ONLINE 24/7",
];

export default async function HomePage() {
  const [barbers, services, reviews] = await Promise.all([
    getBarbers(),
    getServices(),
    getReviews(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-felt text-onyx">
        <div className="felt-vignette relative">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-[1.2fr_1fr] md:py-28">
            <div>
              <p className="eyebrow-rule font-mono text-xs uppercase tracking-[0.14em] text-sable">
                Houston, TX · Appointment or Walk-In
              </p>

              <h1 className="mt-5 font-display text-5xl leading-[1.05] text-onyx sm:text-6xl md:text-7xl">
                Sharp Cuts,
                <br />
                <span className="text-gilded font-semibold">Modern</span> Craft.
              </h1>

              <p className="mt-6 max-w-md text-base text-sable">
                Precision fades, hot towel shaves, and freestyle braids from
                Lupe — rated 5.0 by Houston. Pick a service, pick a time, and
                walk out looking like the house favorite.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/book"
                  className="bg-gilded rounded-full px-8 py-4 font-display italic text-lg tracking-wide text-felt transition hover:opacity-90"
                >
                  Book Your Cut
                </Link>
                <a
                  href={SHOP.phoneHref}
                  className="rounded-full border border-onyx/25 px-8 py-4 font-display italic text-lg tracking-wide text-onyx transition hover:border-onyx/60"
                >
                  Call the Shop
                </a>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="card-frame relative h-80 w-full overflow-hidden sm:h-96">
                <Image
                  src={PHOTOS.storefront}
                  alt="Golden Spades Barbershop, fresh work from the chair"
                  fill
                  priority
                  sizes="(min-width: 768px) 40vw, 90vw"
                  className="object-cover"
                />
                <span className="suit-pip">♠</span>
                <span className="suit-pip pip-br">♦</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ribbon ticker — decorative; the real info lives in the sections around it */}
      <div className="overflow-hidden bg-gold py-2.5" aria-hidden="true">
        <div className="ribbon-track">
          {[...RIBBON_ITEMS, ...RIBBON_ITEMS].map((item, i) => (
            <span
              key={i}
              className="mx-4 font-display italic text-sm tracking-wide text-felt"
            >
              {item} ♠
            </span>
          ))}
        </div>
      </div>

      {/* Trust bar */}
      <section className="border-b border-gold/15 bg-cream-dim">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-3 sm:px-6">
          <div className="flex items-center gap-4">
            <Star className="shrink-0 text-gold" size={28} />
            <div>
              <p className="font-display text-lg text-onyx">5.0 Rating</p>
              <p className="text-sm text-sable">12 Google reviews</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Clock className="shrink-0 text-gold" size={28} />
            <div>
              <p className="font-display text-lg text-onyx">6 Days</p>
              <p className="text-sm text-sable">Tue–Sat, closed Sun &amp; Mon</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <MapPin className="shrink-0 text-gold" size={28} />
            <div>
              <p className="font-display text-lg text-onyx">Houston</p>
              <p className="text-sm text-sable">El Camino Real, Arbor Square</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow-rule font-mono text-xs uppercase tracking-[0.14em] text-sable">
              Our Services
            </p>
            <h2 className="mt-3 font-display text-4xl text-onyx sm:text-5xl">
              The Menu
            </h2>
          </div>
          <Link
            href="/services"
            className="text-sm font-medium uppercase tracking-wider text-gold hover:underline"
          >
            Full price list →
          </Link>
        </div>
        <div className="mt-8">
          {services.slice(0, 5).map((s) => (
            <ServiceRow key={s.id} service={s} />
          ))}
        </div>
      </section>

      {/* Barbers */}
      <section className="border-t border-gold/15 bg-cream-dim">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <p className="eyebrow-rule font-mono text-xs uppercase tracking-[0.14em] text-sable">
            The Chair
          </p>
          <h2 className="mt-3 font-display text-4xl text-onyx sm:text-5xl">
            Meet Your Barber
          </h2>
          <p className="mt-3 max-w-lg text-sable">
            One chair, one standard: precision every time. Book directly with
            Lupe.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {barbers.map((b) => (
              <BarberCard key={b.id} barber={b} />
            ))}
          </div>
        </div>
      </section>

      <GallerySection />

      {/* Reviews */}
      <section id="reviews" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <p className="eyebrow-rule font-mono text-xs uppercase tracking-[0.14em] text-sable">
          Reviews
        </p>
        <h2 className="mt-3 font-display text-4xl text-onyx sm:text-5xl">
          What People Say
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.slice(0, 6).map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-felt text-onyx">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
          <p className="eyebrow-rule justify-center font-mono text-xs uppercase tracking-[0.14em] text-sable">
            Ready?
          </p>
          <h2 className="mt-3 font-display text-4xl text-onyx sm:text-5xl">
            Book Your Next <span className="text-gilded font-semibold">Cut</span>
          </h2>
          <p className="mt-3 text-sable">
            Pick your service, pick your time — takes less than a minute.
          </p>
          <Link
            href="/book"
            className="bg-gilded mt-8 inline-block rounded-full px-10 py-4 font-display italic text-lg tracking-wide text-felt transition hover:opacity-90"
          >
            Book Now
          </Link>
        </div>
      </section>
    </>
  );
}
