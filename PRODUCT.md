# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Customers of a real Houston, TX barbershop (Golden Spades Barbershop) looking to book a haircut, beard grooming, hot towel shave, or braids/twist appointment — both walk-ins and people who prefer booking online ahead of time. The shop currently has one barber, owner Lupe R., serving an existing loyal clientele (5.0 rating, 12 Google reviews).

## Product Purpose

A booking + payments website that lets customers see real-time chair availability, book directly with Lupe, and pay online (Stripe Checkout) or at the shop — replacing phone/walk-in-only booking with self-serve scheduling. Also gives the shop a professional web presence matching its Google Business listing.

## Positioning

A solo-barber boutique shop distinguished by its "Golden Spades" playing-card branding and an upscale-casino positioning (signature packages named "The Ace Experience," "Royal Flush," "The Full House") — deliberately different from typical barbershop sites, and specifically different from the client's sibling shop, Scissorhands Barbershop, which uses a dark red/black grunge barber-pole identity. Both sites share the same underlying booking architecture.

## Operating Context

Real shop at 17000 El Camino Real Ste 210A, Houston, TX 77058. Open Tue–Sat (closed Sun/Mon). Booking flow: pick service → pick barber → pick a live time slot → customer info → pay online or pay at shop → confirmation. The owner manages the day-to-day through an admin dashboard (mark appointments done/no-show/cancelled, block off time per barber).

## Capabilities and Constraints

Next.js 16 (App Router) + Supabase (Postgres + Auth, security-definer RPCs for booking/availability logic) + Stripe Checkout, deployed on Vercel with GitHub auto-deploy (`sahaashirali-bot/golden-spades-barbershop`, `master` branch). 25 services across cuts, grooming, waxing, hot towel shaves, facials, three signature packages, and an extensive braids/twists menu. Only one active barber today (Lupe R.); the barber-selection UI already supports adding more. Admin login currently uses a placeholder email pending the real owner email.

## Brand Commitments

Name: **Golden Spades Barbershop**. The visual identity is already established and client-approved: warm cream/ivory + deep emerald green + gold palette, serif italic display type (Playfair Display) paired with Jost for body text, rounded "playing card" panels with small suit-pip (♠ ♦ ♣ ♥) corner details. This is a deliberate departure from the sibling Scissorhands site and should be preserved, not reinvented, in ordinary refinement work — the client has since asked for the palette to run a little darker and for clearer selected/interactive states in the booking flow (both applied).

## Evidence on Hand

Real photos and two quoted Google reviews sourced from the shop's actual Google Business listing (photos currently hotlinked from Google's CDN, pending self-hosting). Real service menu and pricing as listed by the shop. No fabricated testimonials, pricing, or claims.

## Product Principles

1. Booking must always reflect truthful, live availability — never a phantom or stale slot.
2. The playing-card / gold-and-emerald motif carries the brand; departing from it needs explicit client sign-off, not a default assumption.
3. Keep booking-flow architecture in parity with the Scissorhands sibling site so both remain easy to maintain together.
4. Every interactive/selected state must be visually unambiguous — this was a real reported defect (a selection state that was nearly invisible), not a taste preference, and regressing it again is a functional bug.

## Accessibility & Inclusion

No formal standard has been required by the client. The one concrete, confirmed requirement: selected/active states in interactive flows (e.g. the booking wizard) must be clearly distinguishable at a glance, not rely on a subtle border alone.
