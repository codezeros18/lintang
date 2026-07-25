import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo";

/**
 * Sitemap hanya memuat rute yang BENAR-BENAR sudah ada.
 * Halaman `/projects/[slug]` menyusul di S4 dan `/log` di S7 — jangan didaftarkan
 * sebelum ada, karena sitemap berisi 404 merugikan SEO.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
