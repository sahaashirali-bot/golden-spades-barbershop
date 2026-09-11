import type { Metadata } from "next";
import { getServices } from "@/lib/data";
import { ServiceRow } from "@/components/ServiceRow";
import { SHOP } from "@/lib/shop";

export const metadata: Metadata = {
  title: "Services & Pricing | Golden Spades Barbershop",
  description: "Full price list for Golden Spades Barbershop in Houston, TX.",
};

const CATEGORY_LABELS: Record<string, string> = {
  haircut: "Cuts",
  grooming: "Grooming",
  wax: "Waxing",
  shave: "Hot Towel Shaves",
  facial: "Facials",
  package: "Signature Packages",
  braids: "Braids & Twists",
};

export default async function ServicesPage() {
  const services = await getServices();
  const categories = Array.from(new Set(services.map((s) => s.category)));

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <p className="font-display italic text-lg text-gold">Price List</p>
      <h1 className="mt-3 font-display text-5xl text-onyx sm:text-6xl">
        The Menu
      </h1>
      <p className="mt-4 max-w-lg text-sable">
        Card payments carry a ${(SHOP.cardFeeCents / 100).toFixed(2)}{" "}
        processing fee, same as in the shop. Cash always welcome.
      </p>

      {categories.map((cat) => (
        <div key={cat} className="mt-12">
          <h2 className="font-display text-xl uppercase tracking-widest text-gold">
            {CATEGORY_LABELS[cat] ?? cat}
          </h2>
          <div className="mt-2">
            {services
              .filter((s) => s.category === cat)
              .map((s) => (
                <ServiceRow key={s.id} service={s} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
