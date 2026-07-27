"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  indexItems,
  indexLabel,
  type NavItem,
  utilityItems,
} from "@/components/layout/nav-items";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

/**
 * TopIndex — navigasi situs, menggantikan sidebar (keputusan Lintang 2026-07-27).
 *
 * Bentuknya **daftar isi bernomor** yang menempel di puncak halaman: nama di
 * kiri, lalu `01 experience  02 projects  …` di kanan. Angkanya sengaja sama
 * persis dengan blok bernomor di `/home`, jadi header ini terbaca sebagai
 * "daftar isi portfolio", bukan menu generik.
 *
 * Kenapa bukan sidebar lagi: sidebar mendorong seluruh isi halaman ke kiri.
 * Tanpa sidebar, `Container` yang sudah `mx-auto` langsung membuat portfolio
 * rata tengah tanpa perlu penyeimbang buatan.
 *
 * Tanpa drawer, tanpa tombol hamburger: di layar kecil barisnya cukup
 * membungkus (`flex-wrap`) sehingga semua tautan tetap terlihat — tidak ada
 * yang tersembunyi di balik satu klik, dan tidak ada focus-trap yang perlu
 * dijaga.
 */

function isActiveHref(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function IndexLink({
  item,
  position,
  pathname,
}: {
  item: NavItem;
  /** `null` = kelompok utilitas (about/stack), dirender tanpa angka. */
  position: number | null;
  pathname: string;
}) {
  const active = isActiveHref(pathname, item.href);

  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "mono focus-visible:ring-ring inline-flex items-baseline gap-1.5 rounded-sm text-[12px] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-offset-2",
        active ? "text-ink" : "text-ink-muted hover:text-ink",
      )}
    >
      {position !== null ? (
        <span
          aria-hidden="true"
          className={cn(
            "text-[11px] tabular-nums",
            active ? "text-ink" : "text-n-400",
          )}
        >
          {indexLabel(position)}
        </span>
      ) : null}
      <span
        className={cn(
          "underline-offset-4",
          active ? "decoration-ink underline" : "no-underline",
        )}
      >
        {item.label}
      </span>
    </Link>
  );
}

export function TopIndex() {
  const pathname = usePathname();

  return (
    <header className="bg-paper/85 border-border sticky top-0 z-40 border-b backdrop-blur-sm">
      <Container className="flex flex-col gap-3 py-4 md:flex-row md:items-baseline md:justify-between md:gap-10">
        <Link
          href="/home"
          className="focus-visible:ring-ring text-ink pixel shrink-0 rounded-sm text-[15px] leading-none outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        >
          {/* Nama lengkap "Lintang Balakosa Ardhana" dipendekkan jadi "Lintang
              Balakosa A." di sini supaya muat satu baris bersama index; di
              halaman lain selalu ditulis penuh. */}
          Lintang Balakosa A.
        </Link>

        <nav
          aria-label="Main"
          className="flex flex-wrap items-baseline gap-x-4 gap-y-2"
        >
          {indexItems.map((item, position) => (
            <IndexLink
              key={item.href}
              item={item}
              position={position}
              pathname={pathname}
            />
          ))}

          <span aria-hidden="true" className="bg-border h-3 w-px self-center" />

          {utilityItems.map((item) => (
            <IndexLink
              key={item.href}
              item={item}
              position={null}
              pathname={pathname}
            />
          ))}
        </nav>
      </Container>
    </header>
  );
}
