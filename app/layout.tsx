import type { Metadata } from "next";

import { CONFIG } from "@/content/config";
import { fontVariables } from "@/lib/fonts";

import "./globals.css";

// Metadata dasar — PORTFOLIO_BLUEPRINT.md §7.
// OG image, sitemap, robots, favicon final menyusul (S2 & S6).
export const metadata: Metadata = {
  metadataBase: new URL(`https://${CONFIG.DOMAIN}`),
  title: "Lintang Balakosa Ardhana — Full-Stack Engineer",
  description:
    "Full-stack engineer (Next.js, NestJS, FastAPI) yang membangun sistem produksi nyata — offline-first, multi-tenant, payment live — dan membuktikan dampaknya lewat data. Mahasiswa Informatika UMN, Indonesia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${fontVariables} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
