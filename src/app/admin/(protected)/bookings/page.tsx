import { createClient } from "@/lib/supabase/server";
import { formatMoney, formatSlotDate, formatSlotTime } from "@/lib/format";
import { BookingActions } from "@/components/admin/BookingActions";
import type { Barber, BookingStatus, Service } from "@/lib/types";

export default async function AdminBookingsPage() {
  const supabase = await createClient();
  const { data: bookings } = await supabase
    .from("bookings")
    .select("*, barbers(name), services(name)")
    .order("start_at", { ascending: false })
    .limit(200);

  return (
    <div>
      <h1 className="font-display text-3xl text-onyx">All Bookings</h1>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[800px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-gold/20 text-left text-xs uppercase tracking-wider text-sable">
              <th className="py-3 pr-4">When</th>
              <th className="py-3 pr-4">Client</th>
              <th className="py-3 pr-4">Service</th>
              <th className="py-3 pr-4">Barber</th>
              <th className="py-3 pr-4">Total</th>
              <th className="py-3 pr-4">Status</th>
              <th className="py-3 pr-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gold/15">
            {bookings?.map((b) => {
              const barberName = (b as unknown as { barbers: Barber }).barbers
                ?.name;
              const serviceName = (b as unknown as { services: Service })
                .services?.name;
              return (
                <tr key={b.id}>
                  <td className="py-3 pr-4 text-onyx/70">
                    {formatSlotDate(b.start_at)}
                    <br />
                    <span className="text-xs text-sable">
                      {formatSlotTime(b.start_at)}
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    <p className="text-onyx">{b.customer_name}</p>
                    <p className="text-xs text-sable">{b.customer_phone}</p>
                  </td>
                  <td className="py-3 pr-4 text-onyx/70">{serviceName}</td>
                  <td className="py-3 pr-4 text-onyx/70">{barberName}</td>
                  <td className="py-3 pr-4 font-display text-onyx">
                    {formatMoney(b.total_amount_cents)}
                  </td>
                  <td className="py-3 pr-4">
                    <StatusPill status={b.status} />
                  </td>
                  <td className="py-3 pr-4">
                    <BookingActions bookingId={b.id} status={b.status} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {(!bookings || bookings.length === 0) && (
          <p className="py-8 text-sm text-sable">No bookings yet.</p>
        )}
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: BookingStatus }) {
  const styles: Record<BookingStatus, string> = {
    confirmed: "bg-felt/15 text-felt",
    pending_payment: "bg-gold/20 text-gold",
    completed: "bg-sable/20 text-onyx/70",
    cancelled: "bg-cream-dim text-sable line-through",
    no_show: "bg-cream-dim text-sable",
  };
  return (
    <span
      className={`whitespace-nowrap rounded-full px-2 py-1 text-xs uppercase tracking-wider ${styles[status]}`}
    >
      {status.replace("_", " ")}
    </span>
  );
}
