import { createClient } from "@/lib/supabase/server";
import { getBarbers } from "@/lib/data";
import { formatSlotDate, formatSlotTime } from "@/lib/format";
import { addBlockedTime, deleteBlockedTime } from "@/app/admin/actions";

export default async function BlockedTimesPage() {
  const supabase = await createClient();
  const barbers = await getBarbers();

  const { data: blocks } = await supabase
    .from("blocked_times")
    .select("*, barbers(name)")
    .gte("end_at", new Date().toISOString())
    .order("start_at");

  return (
    <div>
      <h1 className="font-display text-3xl text-onyx">Time Off &amp; Blocks</h1>
      <p className="mt-2 max-w-lg text-sm text-sable">
        Block off a barber&apos;s calendar for lunch, vacation, or anything
        else — those slots stop showing up in booking.
      </p>

      <form
        action={addBlockedTime}
        className="card-frame mt-6 grid gap-4 bg-ivory p-6 sm:grid-cols-2"
      >
        <label className="block">
          <span className="text-xs uppercase tracking-wider text-sable">
            Barber
          </span>
          <select
            name="barberId"
            required
            className="mt-1 w-full rounded-lg border border-gold/20 bg-cream px-3 py-2 text-onyx focus:border-gold focus:outline-none"
          >
            {barbers.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wider text-sable">
            Reason (optional)
          </span>
          <input
            name="reason"
            placeholder="Vacation, lunch, etc."
            className="mt-1 w-full rounded-lg border border-gold/20 bg-cream px-3 py-2 text-onyx placeholder:text-sable focus:border-gold focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wider text-sable">
            Start
          </span>
          <input
            type="datetime-local"
            name="startAt"
            required
            className="mt-1 w-full rounded-lg border border-gold/20 bg-cream px-3 py-2 text-onyx focus:border-gold focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wider text-sable">
            End
          </span>
          <input
            type="datetime-local"
            name="endAt"
            required
            className="mt-1 w-full rounded-lg border border-gold/20 bg-cream px-3 py-2 text-onyx focus:border-gold focus:outline-none"
          />
        </label>
        <button
          type="submit"
          className="bg-gilded sm:col-span-2 rounded-full px-6 py-3 font-display italic text-felt transition hover:opacity-90"
        >
          Add Block
        </button>
      </form>

      <div className="mt-8 card-frame divide-y divide-gold/15 bg-ivory">
        {!blocks || blocks.length === 0 ? (
          <p className="p-6 text-sm text-sable">No upcoming blocks.</p>
        ) : (
          blocks.map((blk) => (
            <div
              key={blk.id}
              className="flex items-center justify-between gap-4 p-4"
            >
              <div>
                <p className="text-onyx">
                  {(blk as unknown as { barbers: { name: string } }).barbers
                    ?.name}{" "}
                  <span className="text-sable">
                    — {blk.reason || "Time off"}
                  </span>
                </p>
                <p className="text-xs text-sable">
                  {formatSlotDate(blk.start_at)} · {formatSlotTime(blk.start_at)}
                  {" – "}
                  {formatSlotTime(blk.end_at)}
                </p>
              </div>
              <form action={deleteBlockedTime.bind(null, blk.id)}>
                <button className="text-xs uppercase tracking-wider text-red-700 hover:underline">
                  Remove
                </button>
              </form>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
