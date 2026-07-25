import type { Metadata } from "next";

import { CONFIG } from "@/content/config";

/**
 * URL kanonik situs.
 *
 * `CONFIG.DOMAIN` masih default saran BLUEPRINT dan **belum diregistrasi**, jadi
 * `NEXT_PUBLIC_SITE_URL` bisa dipakai untuk menimpanya (mis. isi dengan URL
 * `*.vercel.app` yang sekarang aktif) supaya canonical/sitemap tidak menunjuk ke
 * domain yang belum resolve. Setelah domain final aktif, env ini boleh dihapus.
 */
const envSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const SITE_URL =
  envSiteUrl && envSiteUrl.length > 0
    ? envSiteUrl.replace(/\/$/, "")
    : `https://${CONFIG.DOMAIN}`;

/** Identitas situs — BLUEPRINT §7. Nama identik lintas kanal demi ATS. */
export const SITE = {
  name: "Lintang Balakosa Ardhana",
  role: "Full-Stack Engineer",
  title: "Lintang Balakosa Ardhana — Full-Stack Engineer",
  description:
    "Full-stack engineer (Next.js, NestJS, FastAPI) building real production systems — offline-first, multi-tenant, live payments — and proving their impact with data. Informatics student at UMN, Indonesia.",
  locale: "en_US",
  keywords: [
    "full-stack engineer",
    "Next.js",
    "NestJS",
    "FastAPI",
    "offline-first",
    "multi-tenant",
    "RLS",
    "AI/LLM",
    "data",
    "Indonesia",
    "internship",
  ],
} as const;

export type BuildMetadataOptions = {
  /** Judul halaman tanpa nama situs — helper yang menambahkan sufiksnya. */
  title?: string;
  description?: string;
  /** Path absolut dari root, mis. `/projects/ankop-trace`. */
  path?: string;
  /** Set `true` untuk halaman yang tidak boleh diindeks. */
  noIndex?: boolean;
};

/**
 * Helper metadata per halaman (BLUEPRINT §7).
 *
 * `openGraph.images` sengaja tidak diisi: `app/opengraph-image.tsx` (S6) akan
 * otomatis dipasang Next.js lewat file convention. Jangan menambah URL gambar
 * karangan di sini.
 */
export function buildMetadata({
  title,
  description = SITE.description,
  path = "/",
  noIndex = false,
}: BuildMetadataOptions = {}): Metadata {
  const fullTitle = title ? `${title} — ${SITE.name}` : SITE.title;
  const url = new URL(path, SITE_URL).toString();

  return {
    metadataBase: new URL(SITE_URL),
    title: fullTitle,
    description,
    keywords: [...SITE.keywords],
    authors: [{ name: SITE.name }],
    creator: SITE.name,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: SITE.locale,
      title: fullTitle,
      description,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
