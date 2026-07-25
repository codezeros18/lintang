"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

export type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Jeda mulai (detik) untuk mengurutkan beberapa Reveal manual. */
  delay?: number;
  /** Jarak geser awal (px). BLUEPRINT §3.4 memakai 16. */
  y?: number;
};

/**
 * Reveal — fade + naik saat masuk viewport (BLUEPRINT §3.4).
 *
 * Kalau pengguna memilih `prefers-reduced-motion: reduce`, komponen langsung
 * merender **final state** (opacity 1, tanpa transform) — bukan animasi cepat.
 */
export function Reveal({ children, className, delay = 0, y = 16 }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      data-reveal
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
