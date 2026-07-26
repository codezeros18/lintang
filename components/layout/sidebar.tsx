"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { navItems, sectionHref, sectionIds } from "@/components/layout/nav-items";
import { useActiveSection } from "@/components/layout/use-active-section";
import { cn } from "@/lib/utils";

/**
 * Sidebar — nav persisten di ≥768px, drawer di bawahnya.
 *
 * Semua nilai visual diambil dari `docs/DESIGN_LANGUAGE.md` §1.1:
 * latar `--paper` (sama dengan halaman, dipisah garis — bukan blok warna),
 * item Geist Sans `--step--1`, normal `--ink-muted` → hover `--secondary`
 * → aktif `--indigo` + penanda kiri 2px, monogram "LBA", radius `--radius-sm`.
 *
 * Tanpa Framer Motion: transisi drawer memakai CSS, sehingga aturan global
 * `@media (prefers-reduced-motion: reduce)` di `globals.css` otomatis
 * menonaktifkannya, dan shell tidak menambah beban JS di atas lipatan.
 */

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function Monogram({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="focus-visible:ring-ring inline-flex items-baseline gap-1.5 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
    >
      <span className="text-indigo-brand font-[family-name:var(--font-display)] text-lg font-bold tracking-[-0.02em]">
        LBA
      </span>
      <span className="text-ink-muted mono text-[0.6rem] tracking-[0.14em] uppercase">
        Full-stack
      </span>
    </Link>
  );
}

function NavList({
  activeSection,
  pathname,
  onNavigate,
}: {
  activeSection: string | null;
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <ul className="flex flex-col gap-1">
      {navItems.map((item) => {
        // Rute yang belum dibangun tidak pernah jadi tautan (BLUEPRINT §9).
        if (item.pending) {
          return (
            <li key={item.label}>
              <span
                className="text-ink-muted/60 flex h-(--nav-item-h) items-center justify-between rounded-(--radius-sm) px-3 font-[family-name:var(--font-display)] text-(length:--step--1)"
                title="Coming soon"
              >
                {item.label}
                <span className="mono text-[0.6rem] tracking-[0.12em] uppercase">
                  soon
                </span>
              </span>
            </li>
          );
        }

        const isSection = Boolean(item.sectionId);
        const href = isSection
          ? sectionHref(item.sectionId as string, pathname)
          : (item.href as string);

        const isActive = isSection
          ? pathname === "/" && activeSection === item.sectionId
          : pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <li key={item.label}>
            <Link
              href={href}
              onClick={onNavigate}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "focus-visible:ring-ring relative flex h-(--nav-item-h) items-center rounded-(--radius-sm) px-3",
                "font-[family-name:var(--font-display)] text-(length:--step--1)",
                "outline-none transition-colors focus-visible:ring-2 focus-visible:ring-offset-2",
                isActive
                  ? "text-indigo-brand font-medium"
                  : "text-ink-muted hover:bg-secondary hover:text-ink",
              )}
            >
              {/* Penanda aktif: garis indigo tipis (DESIGN_LANGUAGE §1.1). */}
              {isActive ? (
                <span
                  aria-hidden="true"
                  className="bg-indigo-brand absolute top-1.5 bottom-1.5 left-0 w-0.5 rounded-full"
                />
              ) : null}
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);

  /**
   * Drawer disimpan sebagai "dibuka di halaman mana", bukan boolean.
   * Efeknya: begitu `pathname` berubah — termasuk lewat tombol back/forward browser —
   * drawer tertutup dengan sendirinya saat render, tanpa perlu effect yang
   * memanggil `setState` (yang memicu render bertingkat).
   */
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const open = openedAt === pathname;
  const setOpen = useCallback(
    (next: boolean) => setOpenedAt(next ? pathname : null),
    [pathname],
  );

  // Scroll-spy hanya relevan di halaman utama.
  const activeSection = useActiveSection(sectionIds, pathname === "/");

  const close = useCallback(() => setOpen(false), [setOpen]);

  // Focus-trap + Esc + kunci scroll body selama drawer terbuka.
  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const getItems = () =>
      panel ? Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)) : [];

    getItems()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const items = getItems();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [open, setOpen]);

  return (
    <>
      {/* ——— Desktop: nav persisten ——— */}
      <aside className="border-border sticky top-0 hidden h-dvh shrink-0 border-r p-6 md:flex md:flex-col">
        <Monogram />
        <nav aria-label="Main" className="mt-10">
          <NavList activeSection={activeSection} pathname={pathname} />
        </nav>
      </aside>

      {/* ——— Mobile: top bar ——— */}
      <div className="bg-paper/90 border-border sticky top-0 z-40 flex h-(--topbar-h) items-center justify-between border-b px-5 backdrop-blur-sm md:hidden">
        <Monogram />
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open navigation"
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="text-ink hover:bg-secondary focus-visible:ring-ring inline-flex h-10 w-10 items-center justify-center rounded-(--radius-sm) outline-none focus-visible:ring-2"
        >
          <span aria-hidden="true" className="flex flex-col gap-[5px]">
            <span className="bg-ink block h-0.5 w-5 rounded-full" />
            <span className="bg-ink block h-0.5 w-5 rounded-full" />
            <span className="bg-ink block h-0.5 w-3.5 rounded-full" />
          </span>
        </button>
      </div>

      {/* ——— Mobile: drawer ——— */}
      <div
        className={cn(
          "fixed inset-0 z-50 md:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <div
          onClick={close}
          className={cn(
            "absolute inset-0 bg-[color-mix(in_oklab,var(--ink),transparent_65%)] transition-opacity duration-200",
            open ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          id="mobile-nav"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
          className={cn(
            "bg-paper border-border absolute inset-y-0 left-0 flex w-[min(280px,85vw)] flex-col border-r p-6",
            "transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
            open ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex items-center justify-between">
            <Monogram onClick={close} />
            <button
              type="button"
              onClick={close}
              aria-label="Close navigation"
              className="text-ink-muted hover:bg-secondary hover:text-ink focus-visible:ring-ring inline-flex h-10 w-10 items-center justify-center rounded-(--radius-sm) text-xl leading-none outline-none focus-visible:ring-2"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <nav aria-label="Main" className="mt-10">
            <NavList
              activeSection={activeSection}
              pathname={pathname}
              onNavigate={close}
            />
          </nav>
        </div>
      </div>
    </>
  );
}
