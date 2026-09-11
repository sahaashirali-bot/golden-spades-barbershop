import type { Metadata } from "next";
import { getBarbers } from "@/lib/data";
import { BarberCard } from "@/components/BarberCard";

export const metadata: Metadata = {
  title: "Our Barbers | Golden Spades Barbershop",
  description: "Meet the barbers at Golden Spades Barbershop in Houston, TX.",
};

export default async function BarbersPage() {
  const barbers = await getBarbers();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="font-display italic text-lg text-gold-ink">The Chair</p>
      <h1 className="mt-3 font-display text-5xl text-onyx sm:text-6xl">
        Meet Your Barber
      </h1>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {barbers.map((b) => (
          <BarberCard key={b.id} barber={b} />
        ))}
      </div>
    </div>
  );
}
