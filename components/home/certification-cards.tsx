import { SiCoursera } from "react-icons/si";

import type { Certification } from "@/content/experience";

/**
 * Tiga kartu sertifikat di beranda — penanda penerbit di tengah, nama, penerbit,
 * lalu tautan "verify" (permintaan Lintang 2026-07-27).
 *
 * Tautan verify HANYA dirender kalau kredensialnya memang ada (URL resmi atau
 * foto sertifikatnya). Sertifikat tanpa keduanya tetap tampil, cuma tanpa
 * tombol — lebih baik begitu daripada memasang tombol yang tidak membuktikan
 * apa-apa.
 *
 * Ikon: hanya Coursera yang tersedia di Simple Icons; sisanya inisial huruf,
 * bukan logo tiruan buatan sendiri.
 */

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

function Card({ cert }: { cert: Certification }) {
  const href =
    cert.credentialUrl ??
    (cert.credentialImage ? `/images/${cert.credentialImage}` : null);

  return (
    <li className="border-border bg-card hover:border-accent/35 flex flex-col items-center rounded-(--radius) border px-5 py-7 text-center transition-colors">
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

      {href ? (
        <a
          href={href}
          target={cert.credentialUrl ? "_blank" : undefined}
          rel={cert.credentialUrl ? "noopener noreferrer" : undefined}
          className="mono text-accent hover:text-accent-strong focus-visible:ring-ring mt-5 rounded-sm text-[11px] tracking-[0.14em] uppercase outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        >
          <span aria-hidden="true">&#10216;&nbsp;</span>
          Verify
          <span aria-hidden="true">&nbsp;&#10217;</span>
        </a>
      ) : null}
    </li>
  );
}

export function CertificationCards({ items }: { items: Certification[] }) {
  if (items.length === 0) return null;

  return (
    <ul className="mt-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((cert) => (
        <Card key={cert.name} cert={cert} />
      ))}
    </ul>
  );
}
