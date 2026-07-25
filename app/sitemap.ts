import type { MetadataRoute } from "next";

import { caseStudyProjects } from "@/content/projects";
import { getLogPosts } from "@/lib/mdx";
import { SITE_URL } from "@/lib/seo";

/** Sitemap hanya memuat rute yang BENAR-BENAR sudah ada. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const logPosts = await getLogPosts();

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
  ];
}
