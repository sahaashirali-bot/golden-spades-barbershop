import Link from "next/link";
import Image from "next/image";
import { Scissors } from "lucide-react";
import type { Barber } from "@/lib/types";
import { StarRating } from "./StarRating";

export function BarberCard({ barber }: { barber: Barber }) {
  return (
    <Link
      href={`/barbers/${barber.slug}`}
      className="group card-frame relative block overflow-hidden bg-ivory p-6 transition hover:border-gold"
    >
      <span className="suit-pip">♣</span>
      <span className="suit-pip pip-br">♥</span>
      <div className="relative h-40 overflow-hidden rounded-lg bg-cream-dim">
        {barber.photo_url ? (
          <Image
            src={barber.photo_url}
            alt={barber.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-[50%_15%]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sable">
            <Scissors size={40} className="transition group-hover:text-gold-ink" />
          </div>
        )}
      </div>
      <h3 className="mt-5 font-display text-2xl text-onyx">{barber.name}</h3>
      <p className="text-sm uppercase tracking-wider text-gold-ink">
        {barber.title}
      </p>
      {barber.years_experience && (
        <p className="mt-2 text-sm text-sable">
          {barber.years_experience}+ years experience
        </p>
      )}
      {barber.rating ? (
        <div className="mt-3 flex items-center gap-2">
          <StarRating rating={barber.rating} />
          <span className="text-xs text-sable">({barber.review_count})</span>
        </div>
      ) : (
        <p className="mt-3 text-xs uppercase tracking-wider text-sable">
          New to the shop
        </p>
      )}
      <span className="mt-4 inline-block text-sm font-medium text-gold-ink group-hover:underline">
        Book with {barber.name.split(" ")[0]} →
      </span>
    </Link>
  );
}
