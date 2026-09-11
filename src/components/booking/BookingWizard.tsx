"use client";

import { useEffect, useMemo, useState } from "react";
import { Scissors, Users, Check } from "lucide-react";
import type { Barber, Service } from "@/lib/types";
import {
  addDaysISODate,
  formatDuration,
  formatMoney,
  formatSlotDateShort,
  formatSlotTime,
  todayISODate,
} from "@/lib/format";
import { SHOP } from "@/lib/shop";

type Slot = { start: string; barberId: string };

const STEPS = ["Service", "Barber", "Time", "Your Info", "Confirm"] as const;

export function BookingWizard({
  services,
  barbers,
  initialServiceId,
  initialBarberId,
}: {
  services: Service[];
  barbers: Barber[];
  initialServiceId?: string;
  initialBarberId?: string;
}) {
  const [step, setStep] = useState(0);

  const [serviceIds, setServiceIds] = useState<string[]>(
    initialServiceId ? [initialServiceId] : []
  );
  const [barberId, setBarberId] = useState<string | undefined>(
    initialBarberId
  );

  function toggleService(id: string) {
    setServiceIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  const dateOptions = useMemo(() => {
    const today = todayISODate();
    return Array.from({ length: 14 }, (_, i) => addDaysISODate(today, i));
  }, []);
  const [date, setDate] = useState(dateOptions[0]);

  const [slots, setSlots] = useState<Slot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"online" | "in_shop">(
    "online"
  );

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const selectedServices = services.filter((s) => serviceIds.includes(s.id));
  const totalDurationMinutes = selectedServices.reduce(
    (sum, s) => sum + s.duration_minutes,
    0
  );
  const barber = barberId ? barbers.find((b) => b.id === barberId) : undefined;

  useEffect(() => {
    if (serviceIds.length === 0 || !barberId || step !== 2) return;
    setSlotsLoading(true);
    setSelectedSlot(null);
    fetch(
      `/api/slots?durationMinutes=${totalDurationMinutes}&barberId=${barberId}&date=${date}`
    )
      .then((r) => r.json())
      .then((data) => setSlots(data.slots ?? []))
      .finally(() => setSlotsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceIds.join(","), barberId, date, step]);

  const servicesCents = selectedServices.reduce(
    (sum, s) => sum + s.price_cents,
    0
  );
  const totalCents =
    servicesCents + (paymentMethod === "online" ? SHOP.cardFeeCents : 0);

  async function handleSubmit() {
    if (selectedServices.length === 0 || !selectedSlot) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          barberId: selectedSlot.barberId,
          serviceIds,
          start: selectedSlot.start,
          customerName: name,
          customerEmail: email,
          customerPhone: phone,
          notes,
          noPreference: barberId === "any",
          paymentMethod,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error ?? "Something went wrong. Try again.");
        setSubmitting(false);
        return;
      }
      window.location.href = data.redirectUrl;
    } catch {
      setSubmitError("Network error. Please try again.");
      setSubmitting(false);
    }
  }

  const canContinue = [
    serviceIds.length > 0,
    !!barberId,
    !!selectedSlot,
    name.trim().length > 0 && email.includes("@") && phone.trim().length >= 7,
    true,
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      {/* Step indicator */}
      <div className="flex items-center">
        {STEPS.map((label, i) => (
          <div key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full border font-display text-sm ${
                  i < step
                    ? "border-gold bg-gold text-onyx"
                    : i === step
                      ? "border-gold text-gold-ink"
                      : "border-gold/20 text-sable"
                }`}
              >
                {i < step ? <Check size={16} /> : i + 1}
              </div>
              <span className="mt-1 hidden text-[0.65rem] uppercase tracking-wider text-sable sm:block">
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`mx-2 h-0.5 flex-1 ${i < step ? "bg-gold" : "bg-gold/15"}`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-10">
        {/* Step 0: Service */}
        {step === 0 && (
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-display text-3xl text-onyx">
                Pick Your Services
              </h2>
              <p className="text-sm text-sable">Select as many as you like</p>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {services.map((s) => (
                <button
                  key={s.id}
                  onClick={() => toggleService(s.id)}
                  aria-pressed={serviceIds.includes(s.id)}
                  className={`card-frame relative flex items-center justify-between gap-3 bg-ivory p-4 text-left transition ${
                    serviceIds.includes(s.id)
                      ? "border-2 border-gold bg-gold/15 shadow-[0_0_0_3px_rgba(184,134,60,0.18)]"
                      : "hover:border-gold/60"
                  }`}
                >
                  <div>
                    <p className="font-display text-onyx">{s.name}</p>
                    <p className="text-xs uppercase tracking-wider text-sable">
                      {formatDuration(s.duration_minutes)}
                    </p>
                  </div>
                  <span className="shrink-0 font-display text-xl text-gold-ink">
                    {formatMoney(s.price_cents)}
                  </span>
                  {serviceIds.includes(s.id) && (
                    <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-ivory bg-gold text-onyx">
                      <Check size={14} strokeWidth={3} />
                    </span>
                  )}
                </button>
              ))}
            </div>
            {selectedServices.length > 0 && (
              <div className="card-frame mt-6 flex flex-wrap items-center justify-between gap-3 bg-cream-dim p-4">
                <p className="text-sm text-onyx">
                  {selectedServices.length} service
                  {selectedServices.length > 1 ? "s" : ""} selected ·{" "}
                  {formatDuration(totalDurationMinutes)}
                </p>
                <p className="font-display text-xl text-gold-ink">
                  {formatMoney(servicesCents)}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Step 1: Barber */}
        {step === 1 && (
          <div>
            <h2 className="font-display text-3xl text-onyx">
              Pick Your Barber
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                onClick={() => setBarberId("any")}
                className={`card-frame flex items-center gap-4 bg-ivory p-4 text-left transition ${
                  barberId === "any"
                    ? "border-2 border-gold bg-gold/15 shadow-[0_0_0_3px_rgba(184,134,60,0.18)]"
                    : "hover:border-gold/60"
                }`}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/25 bg-cream">
                  <Users size={22} className="text-gold-ink" />
                </div>
                <div>
                  <p className="font-display text-onyx">No Preference</p>
                  <p className="text-xs text-sable">First barber available</p>
                </div>
                {barberId === "any" && (
                  <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-ivory bg-gold text-onyx">
                    <Check size={14} strokeWidth={3} />
                  </span>
                )}
              </button>
              {barbers.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setBarberId(b.id)}
                  className={`card-frame flex items-center gap-4 bg-ivory p-4 text-left transition ${
                    barberId === b.id
                      ? "border-2 border-gold bg-gold/15 shadow-[0_0_0_3px_rgba(184,134,60,0.18)]"
                      : "hover:border-gold/60"
                  }`}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/25 bg-cream">
                    <Scissors size={20} className="text-gold-ink" />
                  </div>
                  <div>
                    <p className="font-display text-onyx">{b.name}</p>
                    <p className="text-xs text-sable">{b.title}</p>
                  </div>
                  {barberId === b.id && (
                    <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-ivory bg-gold text-onyx">
                      <Check size={14} strokeWidth={3} />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Time */}
        {step === 2 && (
          <div>
            <h2 className="font-display text-3xl text-onyx">Pick a Time</h2>
            <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
              {dateOptions.map((d) => (
                <button
                  key={d}
                  onClick={() => setDate(d)}
                  className={`shrink-0 rounded-full border px-4 py-2 text-center transition ${
                    date === d
                      ? "border-gold bg-gold text-onyx"
                      : "border-gold/20 text-onyx/70 hover:border-gold/60"
                  }`}
                >
                  <span className="block font-display text-sm">
                    {formatSlotDateShort(`${d}T12:00:00`)}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-6">
              {slotsLoading ? (
                <p className="text-sm text-sable">Loading times…</p>
              ) : slots.length === 0 ? (
                <p className="text-sm text-sable">
                  No openings this day — try another date.
                </p>
              ) : (
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {slots.map((slot) => (
                    <button
                      key={slot.start}
                      onClick={() => setSelectedSlot(slot)}
                      className={`rounded-lg border px-3 py-2 font-display text-sm transition ${
                        selectedSlot?.start === slot.start
                          ? "border-gold bg-gold text-onyx"
                          : "border-gold/20 text-onyx/70 hover:border-gold/60"
                      }`}
                    >
                      {formatSlotTime(slot.start)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Info */}
        {step === 3 && (
          <div>
            <h2 className="font-display text-3xl text-onyx">Your Info</h2>
            <div className="mt-6 space-y-4">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className="w-full rounded-lg border border-gold/20 bg-ivory px-4 py-3 text-onyx placeholder:text-sable focus:border-gold focus:outline-none"
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                type="email"
                className="w-full rounded-lg border border-gold/20 bg-ivory px-4 py-3 text-onyx placeholder:text-sable focus:border-gold focus:outline-none"
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone number"
                type="tel"
                className="w-full rounded-lg border border-gold/20 bg-ivory px-4 py-3 text-onyx placeholder:text-sable focus:border-gold focus:outline-none"
              />
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Anything your barber should know? (optional)"
                rows={3}
                className="w-full rounded-lg border border-gold/20 bg-ivory px-4 py-3 text-onyx placeholder:text-sable focus:border-gold focus:outline-none"
              />

              <div className="pt-2">
                <p className="font-display italic text-lg text-gold-ink">
                  Payment
                </p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <button
                    onClick={() => setPaymentMethod("online")}
                    className={`card-frame bg-ivory p-4 text-left transition ${
                      paymentMethod === "online"
                        ? "border-2 border-gold bg-gold/15 shadow-[0_0_0_3px_rgba(184,134,60,0.18)]"
                        : "hover:border-gold/60"
                    }`}
                  >
                    <p className="font-display text-onyx">Pay Online Now</p>
                    <p className="mt-1 text-xs text-sable">
                      Card, secures your spot ·{" "}
                      {formatMoney(SHOP.cardFeeCents)} processing fee
                    </p>
                    {paymentMethod === "online" && (
                      <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-ivory bg-gold text-onyx">
                        <Check size={14} strokeWidth={3} />
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => setPaymentMethod("in_shop")}
                    className={`card-frame bg-ivory p-4 text-left transition ${
                      paymentMethod === "in_shop"
                        ? "border-2 border-gold bg-gold/15 shadow-[0_0_0_3px_rgba(184,134,60,0.18)]"
                        : "hover:border-gold/60"
                    }`}
                  >
                    <p className="font-display text-onyx">Pay At The Shop</p>
                    <p className="mt-1 text-xs text-sable">
                      Cash or card when you arrive
                    </p>
                    {paymentMethod === "in_shop" && (
                      <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-ivory bg-gold text-onyx">
                        <Check size={14} strokeWidth={3} />
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Confirm */}
        {step === 4 && selectedServices.length > 0 && selectedSlot && (
          <div>
            <h2 className="font-display text-3xl text-onyx">
              Confirm Your Booking
            </h2>
            <div className="card-frame mt-6 space-y-3 bg-ivory p-6">
              <Row
                label={selectedServices.length > 1 ? "Services" : "Service"}
                value={selectedServices.map((s) => s.name).join(", ")}
              />
              <Row
                label="Barber"
                value={
                  barberId === "any"
                    ? "No preference"
                    : (barber?.name ?? "")
                }
              />
              <Row
                label="When"
                value={`${formatSlotDateShort(selectedSlot.start)} at ${formatSlotTime(selectedSlot.start)}`}
              />
              <Row
                label="Payment"
                value={
                  paymentMethod === "online"
                    ? "Card (paid now)"
                    : "Cash/card at shop"
                }
              />
              <div className="border-t border-gold/15 pt-3">
                <Row label="Total" value={formatMoney(totalCents)} big />
              </div>
            </div>
            <p className="mt-4 text-xs text-sable">
              {SHOP.cancellationPolicy}
            </p>
            {submitError && (
              <p className="mt-4 text-sm text-red-700">{submitError}</p>
            )}
          </div>
        )}
      </div>

      {/* Nav buttons */}
      <div className="mt-10 flex items-center justify-between">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="px-6 py-3 text-sm uppercase tracking-wider text-sable disabled:opacity-0"
        >
          ← Back
        </button>
        {step < 4 ? (
          <button
            onClick={() => setStep((s) => s + 1)}
            disabled={!canContinue[step]}
            className="rounded-full bg-felt px-8 py-3 font-display italic text-cream transition hover:bg-felt-dark disabled:cursor-not-allowed disabled:opacity-30"
          >
            Continue →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="rounded-full bg-felt px-8 py-3 font-display italic text-cream transition hover:bg-felt-dark disabled:opacity-50"
          >
            {submitting
              ? "Processing…"
              : paymentMethod === "online"
                ? "Pay & Book"
                : "Confirm Booking"}
          </button>
        )}
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  big,
}: {
  label: string;
  value: string;
  big?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm uppercase tracking-wider text-sable">
        {label}
      </span>
      <span
        className={
          big ? "font-display text-2xl text-gold-ink" : "font-medium text-onyx"
        }
      >
        {value}
      </span>
    </div>
  );
}
