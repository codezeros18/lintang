import { notFound } from "next/navigation";

import { CaseStudyArticle } from "@/components/projects/case-study-article";
import {
  caseStudyProjects,
  displayName,
  getProjectBySlug,
} from "@/content/projects";
import { buildMetadata } from "@/lib/seo";

type PageParams = { params: Promise<{ slug: string }> };

/** SSG: hanya 4 hero yang punya halaman case study (§5.3 — sekunder tidak). */
export async function generateStaticParams() {
  return caseStudyProjects.map((project) => ({ slug: project.slug }));
}

/** Slug di luar daftar → 404, bukan render on-demand. */
export const dynamicParams = false;

export async function generateMetadata({ params }: PageParams) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return buildMetadata({ noIndex: true });

  return buildMetadata({
    title: `${displayName(project)} — case study`,
    description: project.tagline,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectPage({ params }: PageParams) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project || !project.featured) notFound();

  // "Next project" berputar mengikuti urutan hero (§5.2), jadi pembaca selalu
  // punya satu langkah berikutnya alih-alih berhenti di ujung halaman.
  const index = caseStudyProjects.findIndex((item) => item.slug === slug);
  const candidate = caseStudyProjects[(index + 1) % caseStudyProjects.length];
  const nextProject =
    candidate && candidate.slug !== project.slug ? candidate : undefined;

  return (
    <main id="main">
      <CaseStudyArticle project={project} nextProject={nextProject} />
    </main>
  );
}
