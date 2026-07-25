import type { MetadataRoute } from "next";

import { caseStudyProjects } from "@/content/projects";
import { SITE_URL } from "@/lib/seo";

/**
 * Sitemap hanya memuat rute yang BENAR-BENAR sudah ada.
 * `/log` menyusul di S7 — jangan didaftarkan sebelum ada, karena sitemap berisi
 * 404 merugikan SEO.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...caseStudyProjects.map((project) => ({
      url: `${SITE_URL}/projects/${project.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
