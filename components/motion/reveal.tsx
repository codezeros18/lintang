"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

/**
 * Reveal — fade + naik saat masuk viewport (BLUEPRINT §3.4).
 *
 * DITULIS ULANG DI R6. Versi sebelumnya memakai `whileInView` Framer Motion, yang
 * merender `opacity:0` **di HTML server**. Tiga akibatnya:
 *   1. Konten di bawah lipatan tidak terlihat sampai hidrasi selesai.
 *   2. `useReducedMotion` **tidak berlaku saat SSR**, jadi pengunjung yang memilih
 *      `prefers-reduced-motion` justru tetap menerima HTML tersembunyi.
 *   3. Kalau JS gagal atau observer tidak memicu, konten **tidak pernah muncul**.
 *
 * Sekarang polanya dibalik — sama seperti perbaikan `CountUp` di R1:
 * **default-nya terlihat**, dan penyembunyian hanya dilakukan di client setelah
 * dipastikan animasinya memang bisa dijalankan. Setiap mode gagal berakhir pada
 * konten yang TERBACA.
 *
 * Elemen yang sudah berada di viewport saat mount tidak pernah disembunyikan sama
 * sekali, sehingga konten atas-lipatan tidak pernah berkedip.
 *
 * `prefers-reduced-motion` ditangani murni di CSS (`globals.css`), jadi sudah
 * berlaku bahkan sebelum JavaScript jalan.
 */

export type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Jeda mulai (detik) untuk mengurutkan beberapa Reveal manual. */
  delay?: number;
};

/** Dipakai bersama oleh Reveal & StaggerItem. */
export function useRevealOnScroll(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Hormati preferensi pengguna tanpa menunggu hook client.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Sudah terlihat saat mount → biarkan apa adanya, jangan disembunyikan.
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return;

    element.style.transitionDelay = delay ? `${delay}s` : "";
    element.dataset.revealState = "hidden";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            element.dataset.revealState = "shown";
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay]);

  return ref;
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRevealOnScroll(delay);

  return (
    <div ref={ref} data-reveal className={cn(className)}>
      {children}
    </div>
  );
}
