import type { Metadata } from "next";

import { fontVariables } from "@/lib/fonts";
import { buildMetadata } from "@/lib/seo";

import "./globals.css";

// Metadata dasar — PORTFOLIO_BLUEPRINT.md §7, lewat helper `lib/seo.ts`.
// OG image + favicon final menyusul di S6.
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
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
