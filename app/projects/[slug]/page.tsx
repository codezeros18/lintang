import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/container";
import {
  caseStudyProjects,
  displayName,
  getProjectBySlug,
  honestyTone,
  resolveProof,
  type Project,
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

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-border border-t pt-8">
      <h2 className="mono text-ink-muted text-xs tracking-[0.14em] uppercase">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Proof({ project }: { project: Project }) {
  const proof = resolveProof(project);
  if (!proof) return null;

  // Selama token PROOF_* kosong: tampilkan "bukti menyusul" apa adanya.
  // TIDAK pernah merender demo palsu atau link mati (§9).
  if (proof.status === "pending") {
    return (
      <Card padding="sm" elevation="flat" className="bg-secondary/50">
        <p className="font-medium">Bukti menyusul.</p>
        <p className="text-ink-muted mt-2 text-sm leading-relaxed">
          {proof.note}
        </p>
      </Card>
    );
  }

  return (
    <Card padding="sm" elevation="flat">
      <p className="font-medium">{proof.label}</p>
      {proof.url ? (
        <a
          href={proof.url}
          className="text-ink hover:text-coral-ink hover:decoration-coral-ink decoration-border mt-2 inline-block text-sm underline underline-offset-4"
          target="_blank"
          rel="noopener noreferrer"
        >
          Lihat bukti
        </a>
      ) : null}
    </Card>
  );
}

export default async function ProjectPage({ params }: PageParams) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project || !project.featured) notFound();

  const name = displayName(project);

  return (
    <main id="main">
      <Section className="pt-12 pb-20 md:pt-16 md:pb-28">
        <Link
          href="/#projects"
          className="text-ink-muted hover:text-ink text-sm underline-offset-4 hover:underline"
        >
          ← Semua proyek
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          <Badge tone={honestyTone(project.honesty)}>{project.honesty}</Badge>
          {project.award ? <Badge tone="coral">{project.award}</Badge> : null}
        </div>

        <h1 className="mt-5 max-w-3xl text-(length:--step-3) leading-tight font-semibold">
          {name}
        </h1>
        <p className="text-ink-muted mt-5 max-w-2xl text-(length:--step-1) leading-relaxed">
          {project.tagline}
        </p>

        <p className="text-ink-muted mt-6 text-sm">
          {project.role}
          {project.durationNote ? ` · ${project.durationNote}` : null}
        </p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <li key={tech}>
              <Badge mono>{tech}</Badge>
            </li>
          ))}
        </ul>

        <div className="mt-14 max-w-3xl space-y-10">
          <Block title="Problem">
            <p className="leading-relaxed">{project.problem}</p>
          </Block>

          <Block title="Keputusan & alasannya">
            <ul className="space-y-4">
              {project.approach.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed">
                  <span
                    aria-hidden="true"
                    className="bg-indigo-brand mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Block>

          {/* Blok jujur "sendiri vs tim" hanya muncul setelah Lintang mengisinya.
              Selama null, blok ini disembunyikan — tidak ada tebakan porsi kerja. */}
          {project.ownVsTeam ? (
            <Block title="Kerja sendiri vs tim">
              <p className="leading-relaxed">{project.ownVsTeam}</p>
            </Block>
          ) : null}

          {project.results.length > 0 ? (
            <Block title="Hasil">
              <ul className="space-y-3">
                {project.results.map((result) => (
                  <li key={result} className="flex gap-3 leading-relaxed">
                    <span
                      aria-hidden="true"
                      className="bg-indigo-brand mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    />
                    <span>{result}</span>
                  </li>
                ))}
              </ul>
            </Block>
          ) : null}

          {project.learned ? (
            <Block title="Satu pelajaran">
              <p className="leading-relaxed">{project.learned}</p>
            </Block>
          ) : null}

          <Block title="Bukti">
            <Proof project={project} />
          </Block>

          <Block title="Status proyek">
            <p className="leading-relaxed">
              Proyek ini dilabeli{" "}
              <strong className="font-semibold">{project.honesty}</strong>.
            </p>
          </Block>
        </div>
      </Section>
    </main>
  );
}
