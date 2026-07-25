import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";

import { fontVariables } from "@/lib/fonts";
import { buildMetadata } from "@/lib/seo";

import "./globals.css";

// Metadata dasar — PORTFOLIO_BLUEPRINT.md §7, lewat helper `lib/seo.ts`.
// Favicon (`app/icon.svg`, `app/apple-icon.tsx`) dan OG image (`app/opengraph-image.tsx`)
// dipasang otomatis oleh file convention Next.js.
export const metadata: Metadata = buildMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${fontVariables} h-full antialiased`}>
      <head>
        {/*
          Framer Motion merender state awal (opacity 0) di HTML server. Tanpa JS,
          konten ber-`data-reveal` akan tetap tersembunyi — pengaman ini membuatnya
          terlihat penuh untuk pengunjung tanpa JavaScript.
        */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col">
        {/* Skip-link — a11y AA (§9): target pertama Tab, tersembunyi sampai difokus. */}
        <a
          href="#main"
          className="bg-card text-ink focus-visible:ring-ring sr-only rounded-(--radius) px-4 py-2 shadow-(--shadow-soft) focus-visible:not-sr-only focus-visible:absolute focus-visible:top-4 focus-visible:left-4 focus-visible:z-50 focus-visible:ring-2"
        >
          Lompat ke konten utama
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
