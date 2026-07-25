import { CONFIG, isSet } from "@/content/config";

/**
 * Hook strip — 3 angka [FAKTA] dari CV (BLUEPRINT §0.2).
 *
 * Satu sumber untuk Hero DAN OG image, supaya angka di situs dan angka di preview
 * share tidak mungkin berbeda.
 *
 * Format angka mengikuti CV versi Inggris: `Rp20M+`, `5,000+ kg`.
 *
 * "5,000+ kg" WAJIB tampil bersama konteks waktu `ANKOP_MONTHS` (§0.2). Kalau token
 * itu dikosongkan, angka kg TIDAK ditampilkan dan slotnya diisi "15+ active suppliers"
 * — angka CV lain yang aturan tampilnya "apa adanya".
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

  const coffeeStat: HookStat = isSet(ankopMonths)
    ? {
        value: 5000,
        suffix: "+ kg",
        label: `of coffee tracked in the first ${ankopMonths} months`,
        display: "5,000+ kg",
      }
    : {
        value: 15,
        suffix: "+",
        label: "active suppliers",
        display: "15+",
      };

  return [
    {
      value: 20,
      prefix: "Rp",
      suffix: "M+",
      label: "in transactions (early launch)",
      display: "Rp20M+",
    },
    coffeeStat,
    { value: 6, label: "role-gated dashboards", display: "6" },
  ];
}
