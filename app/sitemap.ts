import type { MetadataRoute } from "next";

import { caseStudyProjects } from "@/content/projects";
import { getBlogPosts, getLogPosts } from "@/lib/mdx";
import { SITE_URL } from "@/lib/seo";

/** Sitemap hanya memuat rute yang BENAR-BENAR sudah ada. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const logPosts = await getLogPosts();
  // Draft sudah tersaring di `getBlogPosts()`, jadi tidak mungkin bocor ke sitemap.
  const blogPosts = await getBlogPosts();

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
    // `/log` hanya didaftarkan bila sudah ada post yang terbit.
    ...(logPosts.length > 0
      ? [
          {
            url: `${SITE_URL}/log`,
            lastModified,
            changeFrequency: "weekly" as const,
            priority: 0.6,
          },
          ...logPosts.map((post) => ({
            url: `${SITE_URL}/log/${post.slug}`,
            lastModified,
            changeFrequency: "monthly" as const,
            priority: 0.5,
          })),
        ]
      : []),
    // `/blog` selalu ada sebagai halaman (walau isinya masih kosong), tapi
    // detail post hanya didaftarkan bila memang ada post terbit.
    {
      url: `${SITE_URL}/blog`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
    ...blogPosts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    {
      url: `${SITE_URL}/collabs`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    // Halaman detail per bagian portfolio (struktur baru 2026-07-26).
    ...["/about", "/projects", "/experience", "/stack", "/certifications", "/education"].map(
      (path) => ({
        url: `${SITE_URL}${path}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }),
    ),
  ];
}
