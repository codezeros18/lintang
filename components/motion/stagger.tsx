"use client";

import { Children, isValidElement } from "react";

import { useRevealOnScroll } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/**
 * Stagger — grid/daftar yang anaknya muncul berurutan (BLUEPRINT §3.4, 0.08s).
 *
 * Ditulis ulang di R6 dengan alasan yang sama seperti `Reveal`: **default terlihat**,
 * penyembunyian hanya terjadi di client bila animasinya memang bisa berjalan.
 * Tidak ada `opacity:0` di HTML server, jadi konten selalu terbaca walau JS gagal.
 *
 * Urutan tampil diatur lewat `delay` per anak, bukan orkestrasi Framer Motion —
 * lebih ringan dan tidak menambah JS di jalur render.
 */

export type StaggerProps = {
  children: React.ReactNode;
  className?: string;
};

const STEP_SECONDS = 0.08;

export function Stagger({ children, className }: StaggerProps) {
  // Wadahnya sendiri tidak dianimasikan; tiap anak yang mengatur jedanya.
  const items = Children.toArray(children);

  return (
    <div className={cn(className)}>
      {items.map((child, index) =>
        isValidElement<{ delayIndex?: number }>(child)
          ? // `delayIndex` disuntikkan supaya `StaggerItem` tahu urutannya tanpa
            // perlu context atau state global.
            withDelayIndex(child, index)
          : child,
      )}
    </div>
  );
}

function withDelayIndex(
  child: React.ReactElement<{ delayIndex?: number }>,
  index: number,
) {
  if (child.props.delayIndex !== undefined) return child;
  return { ...child, props: { ...child.props, delayIndex: index } };
}

export function StaggerItem({
  children,
  className,
  delayIndex = 0,
}: StaggerProps & { delayIndex?: number }) {
  const ref = useRevealOnScroll(delayIndex * STEP_SECONDS);

  return (
    <div ref={ref} data-reveal className={cn(className)}>
      {children}
    </div>
  );
}

/**
 * HoverLift — kartu terangkat 4px saat hover (§3.4).
 * Kini murni CSS: transisinya otomatis dimatikan oleh aturan global
 * `prefers-reduced-motion` di `globals.css`, dan nol JavaScript.
 */
export function HoverLift({ children, className }: StaggerProps) {
  return (
    <div
      className={cn(
        "transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1",
        className,
      )}
    >
      {children}
    </div>
  );
}
