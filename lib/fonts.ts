// Tipografi — keluarga **Geist** (Geist Sans + Geist Mono).
//
// ⚠️ OVERRIDE BLUEPRINT §3.1 (keputusan Lintang, 2026-07-26).
// BLUEPRINT memilih Space Grotesk / Satoshi+DM Sans / Space Mono. Lintang meminta
// pindah ke keluarga Geist. Konsekuensinya dicatat di `docs/DESIGN_LANGUAGE.md` §2.2
// dan PROGRESS_LOG — termasuk bahwa ini mengendurkan aturan ANTI-CLONE §3.1 #2.
//
// Geist berlisensi terbuka (OFL) dan tersedia lewat `next/font/google`, jadi tetap
// self-hosted saat build: nol permintaan ke server Google saat halaman dibuka.
//
// Efek samping yang disengaja: rantai fallback Satoshi/DM Sans tidak lagi diperlukan,
// karena `--font-body` kini SELALU terdefinisi. File `Satoshi-Variable.woff2` yang
// tidak pernah ada tidak lagi jadi utang.

import { Geist, Geist_Mono } from "next/font/google";

/** Display / headings / item nav. */
export const display = Geist({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

/** Body. */
export const body = Geist({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

/**
 * Angka hook / tech chips / kode — Geist Mono.
 * Variabelnya dinamai `--font-code` (bukan `--font-mono`) untuk menghindari tabrakan
 * dengan token bawaan Tailwind v4; pemetaannya ada di `@theme` `globals.css`.
 */
export const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-code",
  display: "swap",
});

/** Gabungan class variabel font untuk dipasang di `<html>`. */
export const fontVariables = [
  display.variable,
  body.variable,
  mono.variable,
].join(" ");
