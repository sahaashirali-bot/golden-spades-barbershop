import type { Metadata } from "next";
import { SHOP } from "@/lib/shop";

export const metadata: Metadata = {
  title: "Cookies Policy | Golden Spades Barbershop",
  description: "What cookies this site uses, and what it doesn't.",
};

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="font-display italic text-lg text-gold">Legal</p>
      <h1 className="mt-3 font-display text-4xl text-onyx sm:text-5xl">
        Cookies Policy
      </h1>
      <p className="mt-4 text-sm text-sable">Last updated: September 11, 2026</p>

      <div className="mt-10 space-y-8 text-onyx/90">
        <section>
          <p className="leading-relaxed text-sable">
            We keep this simple: this site doesn&apos;t use advertising
            cookies, analytics cookies, or any third-party tracking. There
            are no cookie-consent choices to make because there&apos;s
            nothing non-essential to consent to.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-onyx">
            The one cookie we do use
          </h2>
          <p className="mt-2 leading-relaxed text-sable">
            When our shop owner logs into the staff admin area to manage
            appointments, our login system (Supabase) sets a single session
            cookie so they stay signed in. It&apos;s strictly necessary for
            that login to work, isn&apos;t used to track visitors, and
            isn&apos;t set unless someone actually signs in at{" "}
            <span className="text-onyx">/admin/login</span>.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-onyx">
            Payment processing
          </h2>
          <p className="mt-2 leading-relaxed text-sable">
            If you pay online, you&apos;re taken to Stripe&apos;s own
            checkout page to complete payment. Stripe may set its own
            cookies there under its own privacy policy — that happens on
            Stripe&apos;s domain, not ours.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-onyx">
            If this ever changes
          </h2>
          <p className="mt-2 leading-relaxed text-sable">
            If we add analytics or advertising tools in the future,
            we&apos;ll update this page and add a consent option where
            required before any non-essential cookie is set.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-onyx">Questions</h2>
          <p className="mt-2 leading-relaxed text-sable">
            Reach us at{" "}
            <a
              href={`mailto:${SHOP.email}`}
              className="text-gold hover:underline"
            >
              {SHOP.email}
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
