"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export type CountUpProps = {
  /** Nilai akhir — WAJIB angka sebenarnya, bukan angka hiasan. */
  to: number;
  from?: number;
  /** Durasi animasi (detik). */
  duration?: number;
  /** Pemformat tampilan, mis. `(v) => v.toLocaleString("id-ID")`. */
  format?: (value: number) => string;
  prefix?: string;
  suffix?: string;
  className?: string;
};

const defaultFormat = (value: number) =>
  Math.round(value).toLocaleString("en-US");

/**
 * CountUp — animasi angka hook (BLUEPRINT §3.4, opsional).
 *
 * Aturan yang dijaga di sini:
 * - Render awal (server / tanpa JS) langsung menampilkan **nilai akhir**, jadi angka
 *   yang terbaca selalu benar walau JavaScript gagal jalan.
 * - `prefers-reduced-motion: reduce` → tidak ada animasi sama sekali, nilai akhir saja.
 * - Animasi hanya berjalan sekali, saat elemen masuk viewport.
 */
export function CountUp({
  to,
  from = 0,
  duration = 1.2,
  format = defaultFormat,
  prefix,
  suffix,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  // Nilai awal SELALU nilai akhir yang benar.
  //
  // Versi sebelumnya menurunkannya ke `from` di layout effect agar animasinya
  // tidak berkedip. Akibatnya fatal: kalau animasi tidak pernah jalan (observer
  // tidak memicu, JS gagal, tab background), angka **berhenti di 0** — situs
  // menampilkan "Rp0M+" alih-alih "Rp20M+". Terbukti di uji headless R1.
  //
  // Sekarang penurunan ke `from` hanya terjadi di dalam animasi itu sendiri,
  // jadi setiap mode gagal berakhir pada angka yang BENAR. Konsekuensinya ada
  // kedip ~1 frame saat animasi mulai — harga yang jauh lebih murah daripada
  // menampilkan angka palsu.
  const [value, setValue] = useState(to);

  useEffect(() => {
    if (shouldReduceMotion || !isInView) return;
    const controls = animate(from, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: setValue,
    });
    return () => controls.stop();
  }, [duration, from, isInView, shouldReduceMotion, to]);

  return (
    <span ref={ref} className={cn("stat-num tabular-nums", className)}>
      {prefix}
      {format(value)}
      {suffix}
    </span>
  );
}
