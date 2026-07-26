// Tipografi — keluarga **Geist** lengkap (Sans + Mono + Pixel).
//
// ⚠️ OVERRIDE BLUEPRINT §3.1 (keputusan Lintang, 2026-07-26).
// Detail & konsekuensinya: `docs/DESIGN_LANGUAGE.md` §2.2.
//
// Dipakai dari paket resmi `geist` (Vercel, OFL) alih-alih `next/font/google`,
// karena **Geist Pixel hanya ada di paket ini** — Google Fonts hanya menyediakan
// Sans & Mono. Paket ini juga sudah membungkus `next/font/local`, jadi fontnya
// tetap self-hosted saat build: nol permintaan ke server pihak ketiga.

import { GeistMono } from "geist/font/mono";
// Geist Pixel punya 5 varian (Square/Grid/Circle/Triangle/Line); dipilih Square
// karena bentuk kotaknya paling terbaca di ukuran kecil seperti nama di sidebar.
import { GeistPixelSquare } from "geist/font/pixel";
import { GeistSans } from "geist/font/sans";

/** Display / heading / body. */
export const display = GeistSans;

/** Nav, angka, tech chip, kode, eyebrow. */
export const mono = GeistMono;

/** Nama/monogram di sidebar — Geist Pixel. */
export const pixel = GeistPixelSquare;

/**
 * Variabel CSS yang dipasang ke `<html>`.
 *
 * Nama variabelnya ditetapkan paket `geist` (`--font-geist-*`), jadi di
 * `globals.css` kita memetakannya ke nama token kita sendiri
 * (`--font-display` / `--font-code` / `--font-pixel`).
 */
export const fontVariables = [
  GeistSans.variable,
  GeistMono.variable,
  GeistPixelSquare.variable,
].join(" ");
