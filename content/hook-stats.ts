import { CONFIG, isSet } from "@/content/config";

/**
 * Hook strip — 3 angka [FAKTA] dari CV (BLUEPRINT §0.2).
 *
 * Satu sumber untuk Hero DAN OG image, supaya angka di situs dan angka di preview
 * share tidak mungkin berbeda.
 *
 * "5.000+ kg kopi dilacak" WAJIB tampil bersama konteks waktu `ANKOP_MONTHS` (§0.2).
 * Selama token itu kosong, angka kg TIDAK ditampilkan; slotnya diisi "15+ supplier
 * aktif" — angka CV lain yang aturan tampilnya "apa adanya".
 * TODO(lintang): isi `ANKOP_MONTHS` (+ `ANKOP_KG_CUMULATIVE`) agar angka kg naik ke hero & OG.
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
        label: `kopi dilacak dalam ${ankopMonths} bulan pertama`,
        display: "5.000+ kg",
      }
    : {
        value: 15,
        suffix: "+",
        label: "supplier aktif",
        display: "15+",
      };

  return [
    {
      value: 20,
      prefix: "Rp",
      suffix: "jt+",
      label: "transaksi (peluncuran awal)",
      display: "Rp20jt+",
    },
    coffeeStat,
    { value: 6, label: "dashboard role-gated", display: "6" },
  ];
}
