import type { Metadata } from "next";
import Link from "next/link";
import { SHOP } from "@/lib/shop";

export const metadata: Metadata = {
  title: "Privacy Policy | Golden Spades Barbershop",
  description: "How Golden Spades Barbershop collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="font-display italic text-lg text-gold-ink">Legal</p>
      <h1 className="mt-3 font-display text-4xl text-onyx sm:text-5xl">
        Privacy Policy
      </h1>
      <p className="mt-4 text-sm text-sable">Last updated: September 11, 2026</p>

      <div className="mt-10 space-y-8 text-onyx/90">
        <section>
          <h2 className="font-display text-xl text-onyx">Who we are</h2>
          <p className="mt-2 leading-relaxed text-sable">
            {SHOP.name} is a barbershop located at {SHOP.address}. This
            policy explains what information we collect through this
            website, why we collect it, and how you can control it. You can
            reach us any time at{" "}
            <a
              href={`mailto:${SHOP.email}`}
              className="text-gold-ink hover:underline"
            >
              {SHOP.email}
            </a>{" "}
            or {SHOP.phone}.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-onyx">
            What we collect
          </h2>
          <p className="mt-2 leading-relaxed text-sable">
            When you book an appointment, we collect your name, email
            address, phone number, and any optional notes you leave for
            your barber. That&apos;s it — we don&apos;t ask for anything we
            don&apos;t need to schedule and confirm your visit.
          </p>
          <p className="mt-2 leading-relaxed text-sable">
            If you pay online, your card details are entered directly into
            Stripe&apos;s secure checkout page. We never see or store your
            full card number — Stripe processes the payment and shares back
            only a confirmation and the last few digits of your card for
            your receipt.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-onyx">
            How we use it
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 leading-relaxed text-sable">
            <li>To hold your appointment slot and confirm your booking</li>
            <li>To contact you about that appointment (reminders, changes, cancellations)</li>
            <li>To process payment through Stripe when you pay online</li>
            <li>To keep basic appointment records for the shop</li>
          </ul>
          <p className="mt-2 leading-relaxed text-sable">
            We do not sell your information, and we do not use it for
            advertising or share it with marketing companies.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-onyx">
            Where it&apos;s stored
          </h2>
          <p className="mt-2 leading-relaxed text-sable">
            Booking information is stored in a Supabase-hosted database.
            Payments are handled entirely by Stripe. Both are established
            providers with their own security and compliance programs; we
            don&apos;t run our own payment infrastructure or store card
            data ourselves.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-onyx">
            Cookies and tracking
          </h2>
          <p className="mt-2 leading-relaxed text-sable">
            This site does not use advertising or analytics cookies. See
            our{" "}
            <Link href="/cookies" className="text-gold-ink hover:underline">
              Cookies Policy
            </Link>{" "}
            for the full detail.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-onyx">Your choices</h2>
          <p className="mt-2 leading-relaxed text-sable">
            You can ask us to see, correct, or delete the information we
            hold about you at any time — just email{" "}
            <a
              href={`mailto:${SHOP.email}`}
              className="text-gold-ink hover:underline"
            >
              {SHOP.email}
            </a>
            . We&apos;ll take care of it directly; there&apos;s no
            automated process to navigate.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-onyx">Changes</h2>
          <p className="mt-2 leading-relaxed text-sable">
            If this policy changes in a meaningful way, we&apos;ll update
            the date at the top of this page.
          </p>
        </section>
      </div>
    </div>
  );
}
