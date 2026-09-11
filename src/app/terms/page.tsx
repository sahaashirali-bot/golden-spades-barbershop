import type { Metadata } from "next";
import Link from "next/link";
import { SHOP } from "@/lib/shop";

export const metadata: Metadata = {
  title: "Terms & Conditions | Golden Spades Barbershop",
  description: "Terms of use and booking terms for Golden Spades Barbershop.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="font-display italic text-lg text-gold">Legal</p>
      <h1 className="mt-3 font-display text-4xl text-onyx sm:text-5xl">
        Terms &amp; Conditions
      </h1>
      <p className="mt-4 text-sm text-sable">Last updated: September 11, 2026</p>

      <div className="mt-10 space-y-8 text-onyx/90">
        <section>
          <p className="leading-relaxed text-sable">
            These terms cover your use of this website and any appointment
            you book through it with {SHOP.name} ({SHOP.address}). By
            booking with us, you agree to them.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-onyx">Bookings</h2>
          <p className="mt-2 leading-relaxed text-sable">
            Appointments booked through this site are held for you at the
            time you select, subject to availability. We&apos;ll do our
            best to confirm every booking, but a slot isn&apos;t guaranteed
            until you receive a confirmation.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-onyx">
            Cancellations &amp; refunds
          </h2>
          <p className="mt-2 leading-relaxed text-sable">
            {SHOP.cancellationPolicy}
          </p>
          <p className="mt-2 leading-relaxed text-sable">
            If we need to cancel or reschedule your appointment for any
            reason, you&apos;ll receive a full refund of any amount paid
            online. The card processing fee charged on online payments
            reflects Stripe&apos;s own processing cost and is
            non-refundable once a payment has been completed, except where
            we cancel your appointment.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-onyx">Pricing</h2>
          <p className="mt-2 leading-relaxed text-sable">
            Prices listed on this site reflect our current rates and may
            change. The price shown to you at the time you book is the
            price you&apos;ll pay for that appointment.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-onyx">
            Service expectations
          </h2>
          <p className="mt-2 leading-relaxed text-sable">
            We take pride in our work and aim for precision on every visit.
            Results vary with hair type, condition, and the style
            requested, and we can&apos;t guarantee a specific outcome —
            we&apos;ll always talk through what&apos;s realistic before we
            start. If something isn&apos;t right, tell us before you leave
            the chair so we can fix it.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-onyx">
            Website use
          </h2>
          <p className="mt-2 leading-relaxed text-sable">
            This site is provided for browsing our services and booking
            appointments. Please don&apos;t misuse it — attempting to
            disrupt the booking system, submit false information, or
            access areas of the site you&apos;re not authorized to use.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-onyx">Contact</h2>
          <p className="mt-2 leading-relaxed text-sable">
            Questions about these terms, or anything else, reach us at{" "}
            <a
              href={`mailto:${SHOP.email}`}
              className="text-gold hover:underline"
            >
              {SHOP.email}
            </a>{" "}
            or {SHOP.phone}. See also our{" "}
            <Link href="/privacy" className="text-gold hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
