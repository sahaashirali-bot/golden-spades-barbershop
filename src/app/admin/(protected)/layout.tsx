import Link from "next/link";
import { signOut } from "@/app/admin/actions";

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gold/20 pb-4">
        <nav className="flex gap-6">
          <Link
            href="/admin"
            className="font-display text-sm tracking-widest text-onyx/70 hover:text-gold-ink"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/bookings"
            className="font-display text-sm tracking-widest text-onyx/70 hover:text-gold-ink"
          >
            Bookings
          </Link>
          <Link
            href="/admin/blocked-times"
            className="font-display text-sm tracking-widest text-onyx/70 hover:text-gold-ink"
          >
            Time Off
          </Link>
        </nav>
        <form action={signOut}>
          <button className="text-xs uppercase tracking-wider text-sable hover:text-onyx">
            Sign out
          </button>
        </form>
      </div>
      <div className="mt-8">{children}</div>
    </div>
  );
}
