import Link from "next/link";
import { SHOP } from "@/lib/shop";
import { LogoMark } from "./Logo";

export function SiteFooter() {
  return (
    <footer id="location" className="bg-felt text-onyx">
      <div className="gold-rule" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <LogoMark className="h-10 w-10" />
            <span className="font-display italic text-xl tracking-wide">
              Golden Spades
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-onyx/70">
            Fades, beard grooming, hot towel shaves, and freestyle braids in
            Houston. Book ahead or walk in — either way, you leave sharp.
          </p>
          <a
            href={SHOP.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm text-gold-bright hover:underline"
          >
            @goldenspadesbarbershop
          </a>
        </div>

        <div>
          <h3 className="font-display italic text-lg text-gold-bright">
            Visit
          </h3>
          <a
            href={SHOP.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block text-sm text-onyx/70 hover:text-onyx"
          >
            {SHOP.address}
          </a>
          <a
            href={SHOP.phoneHref}
            className="mt-2 block text-sm text-onyx/70 hover:text-onyx"
          >
            {SHOP.phone}
          </a>
          <a
            href={`mailto:${SHOP.email}`}
            className="mt-2 block text-sm text-onyx/70 hover:text-onyx"
          >
            {SHOP.email}
          </a>
        </div>

        <div>
          <h3 className="font-display italic text-lg text-gold-bright">
            Hours
          </h3>
          <ul className="mt-3 space-y-1 text-sm text-onyx/70">
            {SHOP.hours.map((h) => (
              <li key={h.day} className="flex justify-between gap-4">
                <span>{h.day}</span>
                <span className="text-onyx/70">{h.hours}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-onyx/10">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-onyx/70 sm:px-6">
          <p className="max-w-md">{SHOP.cancellationPolicy}</p>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-xs text-onyx/70">
            <span>
              © {new Date().getFullYear()} {SHOP.name}
            </span>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <Link href="/privacy" className="hover:text-onyx">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-onyx">
                Terms
              </Link>
              <Link href="/cookies" className="hover:text-onyx">
                Cookies
              </Link>
              <Link href="/admin/login" className="hover:text-onyx">
                Staff Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
