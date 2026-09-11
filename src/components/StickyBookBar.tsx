import Link from "next/link";
import { SHOP } from "@/lib/shop";

export function StickyBookBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex justify-center gap-3 bg-gradient-to-t from-felt from-55% to-transparent px-4 py-3.5">
      <a
        href={SHOP.phoneHref}
        className="flex-1 max-w-[220px] rounded-full border border-gold/25 px-6 py-3 text-center font-mono text-xs font-semibold uppercase tracking-wider text-onyx transition hover:border-gold/60"
      >
        Call
      </a>
      <Link
        href="/book"
        className="bg-gilded flex-1 max-w-[220px] rounded-full px-6 py-3 text-center font-mono text-xs font-semibold uppercase tracking-wider text-felt transition hover:opacity-90"
      >
        Book Now
      </Link>
    </div>
  );
}
