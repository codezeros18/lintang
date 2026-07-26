import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";

import { AppShell } from "@/components/layout/app-shell";
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
    <html lang="en" className={`${fontVariables} h-full antialiased`}>
      {/*
        Pengaman `<noscript>` dari S2 DIHAPUS di R6: sejak `Reveal`/`Stagger`
        ditulis ulang, HTML server tidak lagi memuat `opacity:0` sama sekali,
        jadi tidak ada yang perlu diselamatkan untuk pengunjung tanpa JS.
      */}
      <body className="flex min-h-full flex-col">
        {/* Skip-link — a11y AA (§9): target pertama Tab, tersembunyi sampai difokus. */}
        <a
          href="#main"
          className="bg-card text-ink focus-visible:ring-ring sr-only rounded-(--radius) px-4 py-2 shadow-(--shadow-soft) focus-visible:not-sr-only focus-visible:absolute focus-visible:top-4 focus-visible:left-4 focus-visible:z-50 focus-visible:ring-2"
        >
          Skip to main content
        </a>
        <AppShell>{children}</AppShell>
        <Analytics />
      </body>
    </html>
  );
}
