import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import {
  displayName,
  featuredProjects,
  otherProjects,
} from "@/content/projects";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Projects",
  description:
    "Production systems and analysis work by Lintang Balakosa Ardhana — offline-first coffee operations, live payments, multi-tenant SaaS, and data analysis.",
  path: "/projects",
});

/** Indeks proyek. Hanya 4 hero yang punya case study; sekunder tanpa halaman. */
export default function ProjectsPage() {
  return (
    <main id="main">
      <Section className="pt-12 pb-24 md:pt-16 md:pb-28">
        <PageHeader
          eyebrow="Projects"
          title="Systems people actually use."
          description="Four case studies with the decisions behind them, plus smaller work."
        />

        <ul className="mt-12">
          {featuredProjects.map((project) => (
            <li key={project.slug} className="border-border border-t">
              <Link
                href={`/projects/${project.slug}`}
                className="focus-visible:ring-ring hover:bg-secondary/50 group block rounded-sm py-6 outline-none transition-colors focus-visible:ring-2"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                  <h2 className="text-(length:--step-1) leading-snug font-semibold">
                    {displayName(project)}
                  </h2>
                  <span className="mono text-n-500 text-[12px]">
                    {project.honesty}
                  </span>
                </div>

                <p className="text-ink-muted mt-2 max-w-2xl leading-relaxed">
                  {project.tagline}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {project.tech.slice(0, 5).map((tech) => (
                    <Badge key={tech} mono tone="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-16">
          <h2 className="mono text-n-500 text-[11px] tracking-[0.16em] uppercase">
            Other projects
          </h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {otherProjects.map((project) => (
              <li
                key={project.slug}
                className="border-border bg-card rounded-(--radius) border p-5"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold">{displayName(project)}</h3>
                  <span className="mono text-n-500 text-[12px]">
                    {project.honesty}
                  </span>
                </div>
                <p className="text-ink-muted mt-2 text-sm leading-relaxed">
                  {project.tagline}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Badge key={tech} mono tone="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </main>
  );
}
