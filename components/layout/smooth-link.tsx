"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

/**
 * SmoothLink — navigasi dengan cross-fade halus lewat View Transition API
 * bawaan browser, dipicu SETELAH klik (client-side, pasca-hidrasi).
 *
 * Ini AMAN untuk LCP: berbeda dari animasi berbasis CSS/opacity yang dipasang
 * saat mount (penyebab bug `opacity:0` di HTML server yang diperbaiki di R1/R6),
 * `document.startViewTransition` hanya berjalan sebagai respons klik pengguna —
 * tidak pernah menyentuh render server maupun cat pertama halaman mana pun.
 *
 * Browser yang tidak mendukung View Transitions (mis. Firefox versi lama)
 * otomatis jatuh ke navigasi biasa tanpa animasi — bukan error.
 */
export function SmoothLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const router = useRouter();

  const onClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const nav = () => router.push(href);

      if (prefersReducedMotion || !document.startViewTransition) {
        nav();
        return;
      }

      document.startViewTransition(nav);
    },
    [href, router],
  );

  return (
    <a href={href} onClick={onClick} className={className}>
      {children}
    </a>
  );
}
