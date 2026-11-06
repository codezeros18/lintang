import Image from "next/image";

import type { OrgLogo } from "@/content/experience";
import { resolveImage } from "@/lib/photos";
import { cn } from "@/lib/utils";

/**
 * OrgMark — kotak penanda organisasi di timeline `/experience` dan kartu
 * `/projects`.
 *
 * Menampilkan **logo** bila filenya ada (permintaan Lintang 2026-07-27:
 * "yang singkatan ANK, BI itu ganti jadi logo picture"), dan jatuh ke
 * singkatan huruf bila belum ada — bukan logo tiruan buatan sendiri.
 *
 * Rasio tiap logo berbeda jauh: Ankop bundar, Bisasinema kotak, Bank Sampah
 * Digital wordmark memanjang. Karena itu kotaknya persegi dengan
 * `object-contain` + padding, jadi logo apa pun tetap utuh dan sebaris rapi.
 *
 * Responsif: 40px di layar kecil, 44px di ≥768px — sama untuk versi logo
 * maupun versi huruf, supaya baris timeline tidak bergeser saat sebagian
 * entri sudah punya logo dan sebagian belum.
 */
export function OrgMark({
  logo,
  short,
  className,
}: {
  logo: OrgLogo | null;
  short: string;
  className?: string;
}) {
  const box = cn(
    "border-border bg-card flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-(--radius-sm) border md:size-11",
    className,
  );

  // Logo yang filenya belum ada jatuh ke singkatan huruf (lib/photos.ts),
  // jadi slot logo boleh ditulis lebih dulu sebelum filenya dikirim.
  const src = logo ? resolveImage(logo.src) : null;

  if (!logo || !src) {
    return (
      <span aria-hidden="true" className={cn(box, "mono text-ink text-[11px]")}>
        {short}
      </span>
    );
  }

  return (
    <span className={box}>
      <Image
        src={`/images/${src}`}
        alt={logo.alt}
        width={88}
        height={88}
        sizes="44px"
        className="size-full object-contain p-0.5"
      />
    </span>
  );
}
