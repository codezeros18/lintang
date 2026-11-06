import { CONFIG, isSet } from "@/content/config";

/**
 * Hook strip — 3 angka [FAKTA] dari CV (BLUEPRINT §0.2).
 *
 * Satu sumber untuk Hero DAN OG image, supaya angka di situs dan angka di preview
 * share tidak mungkin berbeda.
 *
 * Format angka mengikuti CV versi Inggris: `Rp30M+`, `5,000+ kg`.
 *
 * "5,000+ kg" WAJIB tampil bersama konteks waktu `ANKOP_MONTHS` (§0.2). Kalau token
 * itu dikosongkan, angka kg TIDAK ditampilkan; slotnya diisi angka CV Ankop lain
 * yang aturan tampilnya "apa adanya" (15+ supplier, ~80% acceptance rate).
 */

export type HookStat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  /** Bentuk siap-tulis untuk OG image (tanpa animasi). */
  display: string;
};

export function getHookStats(): HookStat[] {
  const ankopMonths = CONFIG.ANKOP_MONTHS;

  // CV Nov 2026: Rp30M+ (versi lama Rp20M+). Kata "early" WAJIB ikut (§0.2).
  const salesStat: HookStat = {
    value: 30,
    prefix: "Rp",
    suffix: "M+",
    label: "in early ticket sales (Learning Lab launch)",
    display: "Rp30M+",
  };

  const suppliersStat: HookStat = {
    value: 15,
    suffix: "+",
    label: "active coffee suppliers on one live system",
    display: "15+",
  };

  // Permintaan Lintang 2026-11-07: ganti "15+ supplier" dengan sesuatu yang lebih
  // "branding". Dipilih juara 1 nasional I/O Festival 2026 — fakta CV + sertifikat,
  // dan satu-satunya angka yang menunjuk ke Lintang sendiri (team leader), bukan ke
  // bisnis klien. "15+" tetap dipakai sebagai cadangan bila ANKOP_MONTHS kosong.
  const brandStat: HookStat = {
    value: 1,
    suffix: "st",
    label: "place nationally, as team leader — I/O Festival 2026",
    display: "1st",
  };

  // Diganti 2026-11-07: "6 role-gated dashboards" (Tera) dikeluarkan dari hook
  // strip — Tera berlabel production-ready dan CV terbaru tidak lagi memuatnya.
  // Hook strip kini hanya berisi angka dari sistem yang benar-benar dipakai.
  if (isSet(ankopMonths)) {
    return [
      salesStat,
      {
        value: 5000,
        suffix: "+ kg",
        label: `of coffee tracked in the first ${ankopMonths} months`,
        display: "5,000+ kg",
      },
      brandStat,
    ];
  }

  return [salesStat, suppliersStat, brandStat];
}
