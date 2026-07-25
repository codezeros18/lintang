// PORTFOLIO_BLUEPRINT.md §3.1 — Tipografi
// Display: Space Grotesk · Body: Satoshi (local) dengan fallback DM Sans · Mono: Space Mono
//
// CATATAN PENTING (aturan BLUEPRINT §3.1):
// File `public/fonts/Satoshi-Variable.woff2` BELUM ada. `next/font/local` di-resolve saat
// build dan akan MENGGAGALKAN build bila file tidak ditemukan, jadi blok Satoshi sengaja
// dinonaktifkan (lihat di bawah) dan body memakai DM Sans sebagai fallback.
// Selama `--font-body` tidak terdefinisi, `app/globals.css` otomatis jatuh ke
// `var(--font-body-fallback)` (DM Sans). Tidak ada nama font karangan yang dipakai.

import { DM_Sans, Space_Grotesk, Space_Mono } from "next/font/google";

/** Display / headings — Space Grotesk. */
export const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

/**
 * Angka hook / tech chips / kode — Space Mono.
 * Variabel dinamai `--font-code` (bukan `--font-mono`) untuk menghindari tabrakan dengan
 * token bawaan Tailwind v4 `--font-mono`; pemetaannya dilakukan di `@theme` globals.css.
 */
export const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-code",
  display: "swap",
});

/** Fallback body — DM Sans. Selalu ada, jadi build tidak pernah blok. */
export const bodyFallback = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body-fallback",
  display: "swap",
});

// TODO(lintang): taruh `Satoshi-Variable.woff2` (Fontshare) di `public/fonts/`,
// lalu aktifkan blok di bawah + tambahkan `satoshi.variable` ke `fontVariables`.
//
// import localFont from "next/font/local";
//
// export const satoshi = localFont({
//   src: [{ path: "../public/fonts/Satoshi-Variable.woff2", weight: "300 900", style: "normal" }],
//   variable: "--font-body",
//   display: "swap",
// });

/** Gabungan class variabel font untuk dipasang di `<html>`. */
export const fontVariables = [
  display.variable,
  mono.variable,
  bodyFallback.variable,
  // satoshi.variable, // ← aktifkan bersama blok Satoshi di atas
].join(" ");
