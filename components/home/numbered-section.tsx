import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * NumberedSection — blok ringkasan di beranda (`01 — experience`, `02 — projects`, …).
 *
 * Beranda hanya merangkum; isi lengkapnya ada di halaman detail masing-masing,
 * jadi tiap blok wajib punya tautan "ALL … →".
 */
export function NumberedSection({
  index,
  label,
  href,
  linkLabel,
  children,
  className,
  id,
}: {
  /** Nomor urut; diformat jadi 01, 02, … */
  index: number;
  label: string;
  href: string;
  linkLabel: string;
  children: React.ReactNode;
  className?: string;
  /** Dipakai target anchor, mis. tautan "Know me more ↓" di HomeIntro. */
  id?: string;
}) {
  const number = String(index).padStart(2, "0");

  return (
    <section id={id} className={cn("border-border scroll-mt-6 border-t pt-7", className)}>
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="mono text-ink text-[13px] tracking-[0.08em]">
          <span className="text-n-500">{number}</span>
          <span className="text-n-500"> — </span>
          {label}
        </h2>
        <Link
          href={href}
          className="mono text-ink-muted hover:text-ink focus-visible:ring-ring rounded-sm text-[12px] tracking-[0.08em] uppercase outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        >
          {linkLabel}
          <span aria-hidden="true">&nbsp;→</span>
        </Link>
      </div>

      <div className="mt-5">{children}</div>
    </section>
  );
}
