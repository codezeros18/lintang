"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Mail, Menu, X } from "lucide-react";

import { navGroups } from "@/components/layout/nav-items";
import { CONTACT } from "@/content/config";
import { cn } from "@/lib/utils";

/**
 * Sidebar — nav persisten di ≥768px, drawer di bawahnya.
 *
 * Tipografi (keputusan Lintang 2026-07-26):
 * - Nama    : **Geist Pixel**, 15px
 * - Item nav: **Geist Mono / ui-monospace**, 13px
 * Ikon dari `lucide-react`. Palet netral grey/white.
 *
 * Transisi drawer memakai CSS, jadi aturan global `prefers-reduced-motion`
 * otomatis mematikannya dan shell tidak menambah JS di atas lipatan.
 */

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function isActiveHref(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="focus-visible:ring-ring text-ink pixel block rounded-sm text-[15px] leading-none outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
    >
      Lintang Balakosa
    </Link>
  );
}

function NavList({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex flex-col gap-7">
      {navGroups.map((group, groupIndex) => (
        <div key={group.title ?? `group-${groupIndex}`}>
          {group.title ? (
            <p className="mono text-n-500 mb-2 px-3 text-[11px] tracking-[0.14em] uppercase">
              {group.title}
            </p>
          ) : null}

          <ul className="flex flex-col gap-0.5">
            {group.items.map((item) => {
              const Icon = item.icon;
              const active = isActiveHref(pathname, item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "mono focus-visible:ring-ring flex h-(--nav-item-h) items-center gap-2.5 rounded-(--radius-sm) px-3 text-[13px]",
                      "outline-none transition-colors focus-visible:ring-2 focus-visible:ring-offset-2",
                      active
                        ? "bg-secondary text-ink"
                        : "text-ink-muted hover:bg-secondary/70 hover:text-ink",
                    )}
                  >
                    <Icon aria-hidden="true" className="size-4 shrink-0" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** Blok kontak di kaki sidebar. */
function ContactBlock() {
  return (
    <div className="border-border mt-auto border-t pt-5">
      <p className="text-ink-muted text-[13px] leading-relaxed">
        For work, collabs &amp; everything else, reach me at
      </p>
      <a
        href={`mailto:${CONTACT.email}`}
        className="mono text-ink hover:text-ink-muted focus-visible:ring-ring mt-2 flex items-center gap-2 rounded-sm text-[13px] outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      >
        <Mail aria-hidden="true" className="size-4 shrink-0" />
        <span className="truncate">{CONTACT.email}</span>
      </a>
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);

  /** Drawer disimpan sebagai "dibuka di halaman mana" — berpindah halaman menutupnya
   *  saat render, tanpa effect yang memanggil setState. */
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const open = openedAt === pathname;
  const setOpen = useCallback(
    (next: boolean) => setOpenedAt(next ? pathname : null),
    [pathname],
  );
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
      {/* ——— Desktop ——— */}
      <aside className="border-border sticky top-0 hidden h-dvh shrink-0 flex-col border-r px-5 py-6 md:flex">
        <Wordmark />
        <nav aria-label="Main" className="mt-9">
          <NavList pathname={pathname} />
        </nav>
        <ContactBlock />
      </aside>

      {/* ——— Mobile: top bar ——— */}
      <div className="bg-paper/90 border-border sticky top-0 z-40 flex h-(--topbar-h) items-center justify-between border-b px-5 backdrop-blur-sm md:hidden">
        <Wordmark />
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open navigation"
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="text-ink hover:bg-secondary focus-visible:ring-ring inline-flex h-10 w-10 items-center justify-center rounded-(--radius-sm) outline-none focus-visible:ring-2"
        >
          <Menu aria-hidden="true" className="size-5" />
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
            "absolute inset-0 bg-[color-mix(in_oklab,var(--n-900),transparent_65%)] transition-opacity duration-200",
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
            "bg-paper border-border absolute inset-y-0 left-0 flex w-[min(280px,85vw)] flex-col overflow-y-auto border-r px-5 py-6",
            "transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
            open ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex items-center justify-between">
            <Wordmark onClick={close} />
            <button
              type="button"
              onClick={close}
              aria-label="Close navigation"
              className="text-ink-muted hover:bg-secondary hover:text-ink focus-visible:ring-ring inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-(--radius-sm) outline-none focus-visible:ring-2"
            >
              <X aria-hidden="true" className="size-5" />
            </button>
          </div>

          <nav aria-label="Main" className="mt-9">
            <NavList pathname={pathname} onNavigate={close} />
          </nav>
          <ContactBlock />
        </div>
      </div>
    </>
  );
}
