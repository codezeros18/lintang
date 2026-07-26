import {
  caseStudyProjects,
  displayName,
  getProjectBySlug,
} from "@/content/projects";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

/**
 * OG image per case study.
 *
 * CATATAN Next 16: `params` di fungsi pembuat gambar kini **Promise** — ini salah
 * satu breaking change v16 yang dicatat sejak S1.
 */

export const alt = "Case study — Lintang Balakosa Ardhana";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return caseStudyProjects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return renderOgImage({
      eyebrow: "Case study",
      title: "Lintang Balakosa Ardhana",
    });
  }

  const footer = [project.role, project.durationNote]
    .filter(Boolean)
    .join(" · ");

  return renderOgImage({
    eyebrow: `Case study · ${project.honesty}`,
    title: displayName(project),
    subtitle: project.tagline,
    footer,
  });
}
