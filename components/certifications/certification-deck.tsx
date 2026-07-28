import { SiCoursera } from "react-icons/si";

import { PhotoLink } from "@/components/ui/photo-gallery";
import type { Certification } from "@/content/experience";
import { cn } from "@/lib/utils";

/**
 * CertificationDeck — kartu sertifikat yang miring-miring dan meluruskan diri
 * saat disentuh kursor (permintaan Lintang 2026-07-27).
 *
 * Cara kerjanya: tiap kartu diberi rotasi & pergeseran vertikal kecil yang
 * BERPOLA (bukan acak — hasil acak berubah tiap render dan bikin hydration
 * mismatch). **Hanya kartu yang benar-benar disentuh** yang meluruskan diri,
 * naik sedikit, dan maju ke depan.
 *
 * Sempat dibuat satu deret ikut lurus semua begitu kursor masuk
 * (`group-hover/deck`), tapi itu salah: menyenggol satu kartu membuat seluruh
 * baris bergerak, jadi mata kehilangan kartu yang sedang dituju. Sekarang
 * reaksinya lokal — satu kartu, satu respons.
 *
 * Catatan anti-clone (docs/DESIGN_LANGUAGE.md §3.1): tumpukan miring ini bentuk
 * yang juga dipakai referensi. Yang diambil hanya idenya — sudut, jarak,
 * bayangan, radius, tipografi, warna aksen hijau, dan isi kartunya sendiri.
 *
 * Semua gerakan CSS murni, jadi aturan global `prefers-reduced-motion` di
 * `globals.css` mematikannya; tanpa animasi kartunya cuma tampil lurus, dan
 * tata letaknya tetap terbaca.
 *
 * Di bawah `sm` semua rotasi dilepas — kartu miring di layar sempit hanya
 * memakan ruang dan menyulitkan dibaca.
 */

/** Pola sudut & dorongan vertikal, berulang tiap 4 kartu. */
const TILTS = [
  "sm:-rotate-[2.5deg] sm:translate-y-1",
  "sm:rotate-[1.5deg] sm:-translate-y-2",
  "sm:-rotate-[1deg] sm:translate-y-2",
  "sm:rotate-[2.5deg] sm:-translate-y-1",
];

function issuerInitials(issuer: string) {
  return issuer
    .replace(/\(.*?\)/g, "")
    .replace(/[^\p{L}\s]/gu, " ")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function DeckCard({ cert, tilt }: { cert: Certification; tilt: string }) {
  return (
    <li
      className={cn(
        "bg-card border-border hover:border-accent/40 relative flex flex-col items-center rounded-(--radius) border px-5 py-7 text-center",
        "transition-[transform,box-shadow,border-color] duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform",
        "sm:shadow-soft",
        tilt,
        // Hanya kartu ini yang bereaksi: lurus, naik sedikit, naik ke depan.
        "sm:hover:z-10 sm:hover:-translate-y-1.5 sm:hover:rotate-0",
      )}
    >
      <span
        aria-hidden="true"
        className="border-border bg-paper text-ink flex size-12 items-center justify-center rounded-(--radius-sm) border"
      >
        {/coursera/i.test(cert.issuer) ? (
          <SiCoursera className="size-5" />
        ) : (
          <span className="mono text-[13px] font-medium">
            {issuerInitials(cert.issuer)}
          </span>
        )}
      </span>

      <h3 className="text-ink mt-5 text-[15px] leading-snug font-medium text-balance">
        {cert.name}
      </h3>

      <p className="mono text-n-500 mt-2 text-[11px] tracking-[0.12em] uppercase">
        {cert.issuer}
      </p>

      {cert.date ? (
        <p className="mono text-n-500 mt-1 text-[11px]">{cert.date}</p>
      ) : null}

      {/* Hanya satu dari dua yang muncul, dan hanya kalau memang ada buktinya. */}
      {cert.credentialUrl ? (
        <a
          href={cert.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mono text-accent hover:text-accent-strong focus-visible:ring-ring mt-5 rounded-sm text-[11px] tracking-[0.14em] uppercase outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        >
          <span aria-hidden="true">&#10216;&nbsp;</span>
          Verify
          <span aria-hidden="true">&nbsp;&#10217;</span>
        </a>
      ) : cert.credentialImage ? (
        <PhotoLink
          photo={{
            src: cert.credentialImage,
            alt: `${cert.name} — ${cert.issuer}`,
          }}
          label="⟨ VIEW ⟩"
          className="text-accent hover:text-accent-strong mt-5 tracking-[0.14em] no-underline"
        />
      ) : null}
    </li>
  );
}

export function CertificationDeck({ items }: { items: Certification[] }) {
  if (items.length === 0) return null;

  return (
    <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((cert, index) => (
        <DeckCard
          key={cert.name}
          cert={cert}
          tilt={TILTS[index % TILTS.length]}
        />
      ))}
    </ul>
  );
}
