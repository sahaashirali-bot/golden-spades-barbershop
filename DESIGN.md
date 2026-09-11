---
name: Golden Spades Barbershop
description: A casino-card-table barbershop identity — cream card stock, green felt, and gold foil.
colors:
  cream:
    value: "#eaddbc"
  cream-dim:
    value: "#dac795"
  ivory:
    value: "#fdf8ea"
  felt:
    value: "#0f3d2e"
  felt-dark:
    value: "#082720"
  onyx:
    value: "#1c1710"
  sable:
    value: "#59503e"
  gold:
    value: "#b8863c"
  gold-bright:
    value: "#e3bd6c"
typography:
  display:
    fontFamily: "Playfair Display, ui-serif, serif"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "normal"
  body:
    fontFamily: "Jost, ui-sans-serif, system-ui, sans-serif"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
rounded:
  sm: "0.5rem"
  md: "0.75rem"
  lg: "1.25rem"
  full: "9999px"
components:
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.onyx}"
    rounded: "{rounded.full}"
  button-primary-hover:
    backgroundColor: "{colors.gold-bright}"
  button-secondary:
    backgroundColor: "{colors.felt}"
    textColor: "{colors.cream}"
    rounded: "{rounded.full}"
  button-secondary-hover:
    backgroundColor: "{colors.felt-dark}"
  card:
    backgroundColor: "{colors.ivory}"
    rounded: "{rounded.lg}"
  card-selected:
    backgroundColor: "{colors.gold}"
    rounded: "{rounded.lg}"
---

# Design System: Golden Spades Barbershop

## Overview

**Creative North Star: "The Golden Table"**

Golden Spades reads as a card table dressed for an upscale night: cream card-stock paper, deep emerald felt, and warm gold foil, with a serif marquee typeface standing in for the pit boss's signage and a clean grotesque carrying everything you actually have to read. The system is deliberately warm and daytime-legible rather than nocturnal-neon-casino — it is a real neighborhood barbershop borrowing the *iconography* of cards and chips (suit pips, "Ace Experience," "Royal Flush" package names), not a Vegas pastiche. It is the confirmed opposite number to the client's other shop, Scissorhands Barbershop, whose system is dark red/black grunge with a spinning barber-pole motif and a bold condensed display face — nothing in that system (the barber-pole stripe, the grain texture, the diagonal-cut card corners, Anton as display face) may bleed into this one.

Flat by construction: no drop shadows anywhere. Depth comes from a thin gold-foil frame around every panel and from a small suit-pip (♠ ♦ ♣ ♥) mark tucked in a card-frame's corner, echoing the index pip on a real playing card. Selection and emphasis are never conveyed by a border alone — a defect the client explicitly reported and that this system now treats as an invariant, not a preference: a selected state gets a visibly thicker gold border, a solid gold-tinted fill, and a small gold checkmark badge.

**Key Characteristics:**
- Warm, deepened cream/tan base (not stark white) with deep emerald "felt" bands for header/footer/hero contrast
- Serif-italic display type (Playfair Display) for headings and CTA labels, clean sans (Jost) for everything read at length
- Rounded "playing card" panels (1.25rem corners) with a slim translucent gold frame, never a drop shadow
- Small suit-pip glyphs (♠ ♦ ♣ ♥) as the system's one recurring decorative signature
- Pill-shaped buttons; gold fill for the primary action, felt-green fill for the secondary/booking action
- Selection state is never subtle: thicker border + solid fill + checkmark badge, always all three together

## Colors

A warm, sun-lit palette: tan/cream card stock as the base, deep emerald felt as the contrast band, and gold as the single accent that is allowed to be loud.

### Primary
- **Gold** (`#b8863c`): The one accent allowed to command attention — primary CTAs, prices, selected-state fills and borders, section dividers (`.gold-rule`), suit-pip marks. **The Single Loud Color Rule.** Nothing else in the palette is saturated; gold is the only color that gets to shout, which is what makes it register as premium instead of noisy.
- **Gold Bright** (`#e3bd6c`): Gold's hover/emphasis step — ribbon-ticker text, gold-rule gradient midpoint, hover state on gold-filled buttons.

### Secondary
- **Felt** (`#0f3d2e`): The deep-emerald contrast band — header/footer background, hero section, the secondary "Book Now" pill button. Never used as a text color on light backgrounds; it is a surface color.
- **Felt Dark** (`#082720`): Felt's hover/pressed step and the footer's own inner border tone.

### Neutral
- **Onyx** (`#1c1710`): Primary text color everywhere on light surfaces. Near-black with a warm brown cast, never true `#000`.
- **Sable** (`#59503e`): Secondary/muted text — durations, captions, helper copy, unselected-state labels.
- **Cream** (`#eaddbc`): The page's base background.
- **Cream Dim** (`#dac795`): Alternating-section background, one step darker than Cream, used to separate stacked sections without a border.
- **Ivory** (`#fdf8ea`): Card and input surface color — always lighter than whatever Cream/Cream Dim band it sits on, which is what makes cards read as "lifted" paper without a shadow.

### Named Rules
**The No-Shadow Rule.** This system never uses `box-shadow` for elevation. A card reads as raised because Ivory is lighter than the Cream/Cream-Dim it sits on and is framed by a gold border, not because it casts a shadow. The one exception is the deliberately visible selection ring (`0 0 0 3px rgba(184,134,60,0.18)`), which is a state signal, not ambient elevation.

## Typography

**Display Font:** Playfair Display (with ui-serif, serif fallback)
**Body Font:** Jost (with ui-sans-serif, system-ui, sans-serif fallback)

**Character:** An elegant serif marquee voice against a clean, quiet geometric sans — the pairing carries the "upscale card table" feeling in the headline without ever letting the body copy feel decorative or hard to scan.

### Hierarchy
- **Display** (400, `text-4xl`–`text-7xl` responsive, tight `leading-[1.05]` on the hero): Hero headlines, section titles ("The Menu", "Meet Your Barber"). Frequently set in `italic` for CTAs and small eyebrow labels ("Houston's Golden Chair", "Price List") to reinforce the marquee-script feeling.
- **Title** (400, `text-2xl`–`text-3xl`, Playfair Display): Card titles — service names, barber names, wizard step headings.
- **Body** (400, `text-sm`–`text-base`, Jost): Paragraph copy, descriptions, form labels. Comfortable at any width; no enforced max measure beyond the existing `max-w-*` containers.
- **Label** (500, `text-xs`, uppercase, `tracking-wider`, Jost): Durations, statuses, footer headings, nav items.

### Named Rules
**The Italic-for-Voice Rule.** Italic Playfair Display marks a line as the brand *speaking* (eyebrow taglines, button labels, footer heading like "Visit"/"Hours") rather than describing content. Section titles and card titles stay upright.

## Layout

Single-column content stacked inside a `max-w-6xl` (site sections) or `max-w-4xl`/`max-w-3xl` (reading-width pages like Services, the booking wizard) centered container, `px-4 sm:px-6` gutters. Sections alternate Cream and Cream-Dim backgrounds to create rhythm without borders. Cards use `grid` layouts that collapse from 2–3 columns down to 1 below `sm`. No custom spacing scale — standard Tailwind spacing throughout (`py-16`–`py-28` for section rhythm, `gap-3`–`gap-10` for grids).

## Elevation & Depth

Flat by design — see **The No-Shadow Rule** above. Depth is conveyed entirely through: (1) surface-lightness contrast (Ivory cards on Cream/Cream-Dim backgrounds), (2) the translucent gold card-frame border, and (3) the suit-pip corner mark. The one state that intentionally interrupts flatness is a selected booking-flow card, which gets a soft gold glow ring (`box-shadow: 0 0 0 3px rgba(184,134,60,0.18)`) — reserved for that single purpose, never used decoratively.

## Shapes

Rounded, card-like geometry throughout — the opposite of Scissorhands' sharp diagonal-cut panels. The system's signature shape is `.card-frame`: `border-radius: 1.25rem` with a `1px solid rgba(184,134,60,0.35)` gold-tinted border, used for every panel (service rows, barber cards, review cards, gallery tiles, booking-wizard option cards, admin stat tiles). Buttons and date/time chips are fully rounded (`rounded-full`). Inputs use a smaller `rounded-lg` (0.5rem). The suit-pip glyph sits absolutely positioned in a card-frame's top-left (and mirrored, rotated 180°, in the bottom-right on hero/barber/review cards) as the one recurring decorative mark.

## Components

### Buttons
- **Shape:** Fully rounded (`rounded-full`), generous horizontal padding (`px-8`–`px-10`), Playfair Display italic label.
- **Primary (Gold):** Gold background (`#b8863c`), Onyx text. Used for the site's main conversion actions ("Book Your Cut", "Pay & Book"). Hover → Gold Bright (`#e3bd6c`).
- **Secondary (Felt):** Felt background (`#0f3d2e`), Cream text. Used for the persistent header/footer "Book Now" and in-flow "Continue"/booking-confirm actions. Hover → Felt Dark (`#082720`).
- **Ghost/Outline:** Cream-bordered transparent button on the dark hero band ("Call the Shop") — border only, no fill, for a secondary action that must not compete with the primary gold CTA.

### Cards / Containers
- **Corner Style:** `1.25rem` radius (`.card-frame`).
- **Background:** Ivory (`#fdf8ea`) on Cream/Cream-Dim page backgrounds.
- **Shadow Strategy:** None at rest — see Elevation & Depth.
- **Border:** `1px solid rgba(184,134,60,0.35)` at rest.
- **Internal Padding:** `p-4`–`p-6` depending on card density.
- **Selected state (booking wizard only):** border thickens to `2px solid` full-opacity Gold, background gains a `bg-gold/15` tint, a `0 0 0 3px rgba(184,134,60,0.18)` glow ring appears, and a small gold circular checkmark badge (`Check` icon, Onyx on Gold, white/Ivory ring) sits at the card's top-right corner, slightly overhanging the edge. **The Three-Signal Rule.** A selected interactive card must show all three of border, fill, and badge together — never border alone. This was a confirmed defect (an earlier version relied on border color alone and users could not tell what they had selected) and regressing to border-only is a functional bug, not a style choice.

### Inputs / Fields
- **Style:** Ivory background, `rounded-lg` (0.5rem), `1px solid` gold-tinted border at ~20% opacity, Onyx text, Sable placeholder text.
- **Focus:** Border shifts to full-opacity Gold; no glow/ring on plain form fields (the glow ring is reserved for the card-selection state above).

### Navigation
- **Style:** Sticky header on translucent Cream (`bg-cream/95 backdrop-blur`), uppercase Jost labels at `text-sm`, `tracking-wide`. Active/hover state shifts label color to Gold. A slim `.gold-rule` gradient line (transparent → Gold → Gold Bright → Gold → transparent) sits under the header and above the footer content as the site's section-divider signature, replacing the incumbent Scissorhands' animated barber-pole stripe. Mobile collapses into a hamburger with the same label treatment stacked vertically.

### Suit Pip (signature component)
A single glyph (♠, ♦, ♣, or ♥) set in Playfair Display at `0.8rem`, Gold, `opacity: 0.8`, absolutely positioned `0.85rem` from a card-frame's top-left corner (and, on hero/barber/review cards, mirrored bottom-right, rotated 180°). It is the system's one purely decorative signature — every other visual element is functional.

## Do's and Don'ts

### Do:
- **Do** keep gold as the only saturated color in the system (**The Single Loud Color Rule**); every other hue stays muted.
- **Do** signal a selected/active interactive state with all three of border-weight, fill, and badge together (**The Three-Signal Rule**); this is a confirmed-defect guardrail, not a preference.
- **Do** use Playfair Display italic for brand-voice moments (button labels, eyebrow taglines) and upright Playfair Display for section/card titles.
- **Do** keep every card-style panel flat with a gold-tinted border instead of a shadow (**The No-Shadow Rule**).

### Don't:
- **Don't** introduce drop shadows for elevation anywhere in this system.
- **Don't** borrow Scissorhands' visual vocabulary: no dark red/black grunge palette, no Anton display face, no spinning barber-pole stripe, no diagonal-cut sharp card corners, no grain/noise texture overlay. That system is the confirmed anti-reference for this one.
- **Don't** rely on a border-color change alone to indicate selection; a barely-visible border was a real reported defect.
- **Don't** add a second saturated accent color; if a new state needs a color, reach for a neutral (Onyx/Sable) or a Gold variant before introducing a new hue.
