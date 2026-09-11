"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogoMark, LogoWordmark } from "./Logo";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/barbers", label: "Barbers" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/#location", label: "Location" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <LogoMark className="h-11 w-11 shrink-0" />
          <LogoWordmark />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium uppercase tracking-wide text-onyx/70 transition hover:text-gold-bright"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/book"
            className="bg-gilded hidden rounded-full px-6 py-2.5 font-display italic text-sm tracking-wide text-felt transition hover:opacity-90 sm:block"
          >
            Book Now
          </Link>
          <button
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`h-0.5 w-6 bg-onyx transition ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`h-0.5 w-6 bg-onyx transition ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`h-0.5 w-6 bg-onyx transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-gold/20 bg-cream md:hidden">
          <nav className="flex flex-col px-4 py-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-3 text-sm font-medium uppercase tracking-wide text-onyx/70"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/book"
              className="bg-gilded mt-2 rounded-full px-5 py-3 text-center font-display italic tracking-wide text-felt"
            >
              Book Now
            </Link>
          </nav>
        </div>
      )}
      <div className="gold-rule" />
    </header>
  );
}
