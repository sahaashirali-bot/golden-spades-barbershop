# Golden Spades Barbershop

Booking + payments website for Golden Spades Barbershop (Houston, TX). Built with Next.js, Supabase (Postgres + Auth), and Stripe.

## Stack

- **Frontend**: Next.js 16 (App Router), Tailwind CSS v4
- **Database/Auth**: Supabase (Postgres, Row Level Security, security-definer RPCs for booking logic)
- **Payments**: Stripe Checkout
- **Hosting**: Vercel

## Local development

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and fill in:

- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` — from the Supabase project dashboard (Project Settings → API)
- `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET` / `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — from the Stripe dashboard (test mode to start)

## How booking + payment works

1. Availability is computed live in Postgres (`get_open_slots` function) from each barber's weekly schedule, minus existing bookings and blocked time.
2. Booking a slot calls `create_pending_booking`, which re-checks the slot is still free (handles double-booking races) and creates the booking row.
3. **Pay online**: a Stripe Checkout Session is created for the total (service price + $2 card fee); a webhook (`/api/stripe/webhook`) confirms the booking once payment succeeds.
4. **Pay at shop**: the booking is confirmed immediately, no online charge.

## Admin dashboard

`/admin` — view today's schedule, manage all bookings (mark done / no-show / cancel), and block off time per barber. Protected by Supabase Auth; only the account in the `admin_users` table can sign in and see data (enforced by RLS, not just page routing).

## Database

Schema and business logic live in Supabase migrations (barbers, services, bookings, availability functions). See the Supabase dashboard for the `golden-spades-barbershop` project to inspect or modify.
