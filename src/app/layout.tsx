import type { Metadata } from "next";
import { Fraunces, Jost, IBM_Plex_Mono } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyBookBar } from "@/components/StickyBookBar";
import { LocalBusinessSchema } from "@/components/LocalBusinessSchema";
import { PHOTOS } from "@/lib/photos";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const title = "Golden Spades Barbershop | Houston, TX";
const description =
  "Fades, beard grooming, hot towel shaves, and freestyle braids at Golden Spades Barbershop in Houston, TX. Book with Lupe R. online in under a minute.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "barbershop Houston TX",
    "haircut Houston",
    "barber near me",
    "braids Houston",
    "fade haircut Houston",
  ],
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Golden Spades Barbershop",
    locale: "en_US",
    type: "website",
    images: [PHOTOS.storefront],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [PHOTOS.storefront],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${jost.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-onyx pb-20">
        <LocalBusinessSchema />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <StickyBookBar />
      </body>
    </html>
  );
}
