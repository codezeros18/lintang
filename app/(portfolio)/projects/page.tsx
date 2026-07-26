import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import {
  displayName,
  featuredProjects,
  otherProjects,
  type Project,
} from "@/content/projects";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Projects",
  description:
    "Production systems and analysis work by Lintang Balakosa Ardhana — offline-first coffee operations, live payments, multi-tenant SaaS, and data analysis.",
  path: "/projects",
});

/**
 * Kotak singkatan proyek — pengganti logo, karena belum ada aset logo untuk
 * proyek-proyek ini dan menggambar logo tiruan sendiri lebih buruk daripada
 * penanda huruf yang jujur.
 */
function ProjectMark({ short }: { short: string }) {
  return (
    <span
      aria-hidden="true"
      className="border-border bg-secondary mono text-ink flex size-12 shrink-0 items-center justify-center rounded-(--radius-sm) border text-[11px] tracking-[0.04em]"
    >
      {short}
    </span>
  );
}

function FeaturedCard({ project }: { project: Project }) {
  return (
    <li className="border-border bg-card hover:border-n-300 relative rounded-(--radius) border p-6 transition-colors">
      <div className="flex gap-4">
        <ProjectMark short={project.short} />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Badge mono tone="outline">
              {project.honesty}
            </Badge>
            {project.award ? (
              <Badge mono tone="outline">
                {project.award}
              </Badge>
            ) : null}
          </div>

          {/* Judul mono seperti kartu referensi; seluruh kartu jadi target klik
              lewat `after:inset-0`, tapi hanya judulnya yang jadi teks tautan. */}
          <h2 className="mono text-ink mt-3 text-[16px] leading-snug">
            <Link
              href={`/projects/${project.slug}`}
              className="focus-visible:ring-ring rounded-sm outline-none after:absolute after:inset-0 after:content-[''] focus-visible:ring-2 focus-visible:ring-offset-2"
            >
              {displayName(project)}
            </Link>
          </h2>

          <p className="text-ink-muted mt-2 text-[14px] leading-relaxed">
            {project.tagline}
          </p>

          <div className="border-border/70 mt-5 flex flex-wrap items-center gap-2 border-t pt-4">
            {project.tech.slice(0, 5).map((tech) => (
              <Badge key={tech} mono tone="outline">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </li>
  );
}

/** Indeks proyek. Hanya 4 hero yang punya case study; sekunder tanpa halaman. */
export default function ProjectsPage() {
  return (
    <main id="main">
      <Section className="pt-12 pb-24 md:pt-16 md:pb-28">
        <PageHeader
          title="projects"
          description="Production systems and analysis work — offline-first coffee operations, live payments, multi-tenant SaaS, and a national data competition. Four case studies with the decisions behind them, plus smaller work."
        />

        <ul className="mt-14 grid gap-4">
          {featuredProjects.map((project) => (
            <FeaturedCard key={project.slug} project={project} />
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
                <div className="flex gap-4">
                  <ProjectMark short={project.short} />

                  <div className="min-w-0 flex-1">
                    <Badge mono tone="outline">
                      {project.honesty}
                    </Badge>
                    <h3 className="mono text-ink mt-3 text-[15px] leading-snug">
                      {displayName(project)}
                    </h3>
                    <p className="text-ink-muted mt-2 text-[14px] leading-relaxed">
                      {project.tagline}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <Badge key={tech} mono tone="outline">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </main>
  );
}
