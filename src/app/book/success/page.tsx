import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { createAnonClient } from "@/lib/supabase/anon";
import { getStripe } from "@/lib/stripe";
import { formatMoney, formatSlotDate, formatSlotTime } from "@/lib/format";

type Confirmation = {
  id: string;
  confirmation_code: string;
  status: string;
  start_at: string;
  end_at: string;
  total_amount_cents: number;
  payment_method: "online" | "in_shop";
  service_names: string[];
  barber_name: string;
};

export default async function BookingSuccessPage({
  searchParams,
}: PageProps<"/book/success">) {
  const sp = await searchParams;
  const bookingId = typeof sp.booking === "string" ? sp.booking : undefined;
  const sessionId =
    typeof sp.session_id === "string" ? sp.session_id : undefined;

  const supabase = createAnonClient();

  // If we arrived from Stripe, make sure the booking is marked confirmed
  // even if the webhook hasn't landed yet (e.g. local dev without a
  // forwarded webhook endpoint).
  if (sessionId) {
    try {
      const stripe = getStripe();
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      if (session.payment_status === "paid") {
        const paymentIntentId =
          typeof session.payment_intent === "string"
            ? session.payment_intent
            : (session.payment_intent?.id ?? null);
        await supabase.rpc("confirm_booking_paid", {
          p_session_id: sessionId,
          p_payment_intent_id: paymentIntentId,
        });
      }
    } catch {
      // Non-fatal — the webhook will confirm it if this lookup fails.
    }
  }

  const { data } = await supabase.rpc("get_booking_confirmation", {
    p_booking_id: bookingId ?? null,
    p_session_id: sessionId ?? null,
  });
  const confirmation = (data?.[0] ?? null) as Confirmation | null;

  if (!confirmation) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center sm:px-6">
        <h1 className="font-display text-3xl text-onyx">
          We couldn&apos;t find that booking
        </h1>
        <p className="mt-3 text-sable">
          If you were just charged, hang tight — check your email for a
          receipt, or give us a call and we&apos;ll sort it out.
        </p>
        <Link
          href="/book"
          className="mt-8 inline-block rounded-full bg-felt px-8 py-3 font-display italic text-cream"
        >
          Back to Booking
        </Link>
      </div>
    );
  }

  const isPending = confirmation.status === "pending_payment";

  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center sm:px-6">
      <CheckCircle2
        size={56}
        className={isPending ? "mx-auto text-gold-ink" : "mx-auto text-felt"}
      />
      <h1 className="mt-6 font-display text-4xl text-onyx">
        {isPending ? "Payment Processing" : "You're Booked"}
      </h1>
      <p className="mt-3 text-sable">
        {isPending
          ? "We're confirming your payment — this page will update shortly. Your spot is held."
          : "See you soon. A confirmation has been noted for your visit."}
      </p>

      <div className="card-frame mt-8 space-y-3 bg-ivory p-6 text-left">
        <Row label="Confirmation #" value={confirmation.confirmation_code} />
        <Row
          label={confirmation.service_names.length > 1 ? "Services" : "Service"}
          value={confirmation.service_names.join(", ")}
        />
        <Row label="Barber" value={confirmation.barber_name} />
        <Row label="Date" value={formatSlotDate(confirmation.start_at)} />
        <Row label="Time" value={formatSlotTime(confirmation.start_at)} />
        <div className="border-t border-gold/15 pt-3">
          <Row label="Total" value={formatMoney(confirmation.total_amount_cents)} />
        </div>
      </div>

      <Link
        href="/"
        className="mt-8 inline-block rounded-full bg-felt px-8 py-3 font-display italic text-cream transition hover:bg-felt-dark"
      >
        Back to Home
      </Link>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="uppercase tracking-wider text-sable">{label}</span>
      <span className="font-medium text-onyx">{value}</span>
    </div>
  );
}
