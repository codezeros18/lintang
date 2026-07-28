import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/container";
import { PhotoGallery, ScreenshotStrip } from "@/components/ui/photo-gallery";
import { workItems } from "@/content/experience";
import {
  displayName,
  honestyTone,
  MAX_GALLERY_ITEMS,
  resolveProof,
  type Project,
} from "@/content/projects";

/**
 * CaseStudyArticle — layout artikel untuk `/projects/[slug]` (R3).
 *
 * Gaya yang diadopsi dari referensi hanyalah **cara bercerita** (prosa panjang,
 * subjudul, sudut pandang orang pertama). Semua nilai visual tetap tokens Lintang
 * dan setiap kalimat naratifnya bersumber CV — lihat `docs/DESIGN_LANGUAGE.md` §1.4.
 *
 * Proyek tanpa `narrative` tetap tampil sebagai artikel, hanya saja isinya dirakit
 * dari `problem` + `approach` — tidak ada teks yang dikarang untuk menambalnya.
 */

const WORDS_PER_MINUTE = 200;

/**
 * Reading time dihitung dari teks yang BENAR-BENAR dirender di halaman ini,
 * bukan angka hiasan. Blok yang disembunyikan (mis. `learned` yang masih kosong)
 * sengaja tidak ikut dihitung.
 */
function readingMinutes(project: Project): number {
  const parts: string[] = [
    project.tagline,
    project.problem,
    ...project.approach,
    ...project.results,
    project.ownVsTeam ?? "",
    project.learned ?? "",
    ...(project.narrative
      ? [
          ...project.narrative.intro,
          ...project.narrative.sections.flatMap((section) => [
            section.heading,
            ...section.paragraphs,
          ]),
        ]
      : []),
  ];

  const words = parts.join(" ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mono text-ink mt-14 text-[16px] leading-snug">{children}</h2>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return <p className="mt-5 text-[15px] leading-relaxed">{children}</p>;
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 space-y-4">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[15px] leading-relaxed">
          <span
            aria-hidden="true"
            className="bg-n-300 mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Evidence({ project }: { project: Project }) {
  const proof = resolveProof(project);
  if (!proof) return null;

  // Token PROOF_* kosong → "Evidence coming soon" + rencananya.
  // TIDAK pernah merender demo palsu atau tautan mati (BLUEPRINT §9).
  if (proof.status === "pending") {
    return (
      <Card padding="sm" elevation="flat" className="bg-secondary/50 mt-5">
        <p className="font-medium">Evidence coming soon.</p>
        <p className="text-ink-muted mt-2 text-sm leading-relaxed">
          {proof.note}
        </p>
      </Card>
    );
  }

  return (
    <Card padding="sm" elevation="flat" className="mt-5">
      <p className="font-medium">{proof.label}</p>
      {proof.url ? (
        <a
          href={proof.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-ink decoration-border hover:text-coral-ink hover:decoration-coral-ink mt-2 inline-block text-sm underline underline-offset-4"
        >
          View evidence
        </a>
      ) : null}
    </Card>
  );
}

export function CaseStudyArticle({
  project,
  nextProject,
}: {
  project: Project;
  nextProject?: Project;
}) {
  const name = displayName(project);
  const minutes = readingMinutes(project);
  // Peran yang melahirkan produk ini, kalau memang lahir dari sebuah pekerjaan.
  const role = workItems.find((item) => item.projectSlug === project.slug);

  return (
    <Section className="pt-12 pb-24 md:pt-16 md:pb-32">
      <Link
        href="/projects"
        className="text-ink-muted hover:text-ink text-sm underline-offset-4 hover:underline"
      >
        ← All projects
      </Link>

      <article className="mt-8 max-w-3xl">
        <header>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={honestyTone(project.honesty)}>{project.honesty}</Badge>
            {/* Medali tampil di sini sebagai badge, bukan sebagai entri proyek
                terpisah — aturan anti double-count §5.2 tetap berlaku. */}
            {project.award ? <Badge tone="coral">{project.award}</Badge> : null}
          </div>

          {/* Judul & tagline mengikuti sistem `PageHeader`: Geist Pixel 24px
              lalu deskripsi 15px, supaya halaman detail tidak terasa dari
              keluarga tipografi yang berbeda. */}
          <h1 className="pixel text-ink mt-5 text-[24px] leading-none">
            {name}
          </h1>

          <p className="text-ink-muted mt-6 text-[15px] leading-relaxed">
            {project.tagline}
          </p>

          <p className="text-ink-muted mono mt-6 text-xs tracking-[0.06em]">
            {project.role}
            {project.durationNote ? ` · ${project.durationNote}` : null}
            {` · ${minutes} min read`}
          </p>

          <ul className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <li key={tech}>
                <Badge mono>{tech}</Badge>
              </li>
            ))}
          </ul>
        </header>

        {project.narrative ? (
          <>
            {project.narrative.intro.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-6 text-[15px] leading-relaxed first:mt-10"
              >
                {paragraph}
              </p>
            ))}

            {project.narrative.sections.map((section) => (
              <section key={section.heading}>
                <Heading>{section.heading}</Heading>
                {section.paragraphs.map((paragraph) => (
                  <Prose key={paragraph}>{paragraph}</Prose>
                ))}
              </section>
            ))}
          </>
        ) : (
          <>
            <Heading>The problem</Heading>
            <Prose>{project.problem}</Prose>

            <Heading>Decisions & why</Heading>
            <Bullets items={project.approach} />
          </>
        )}

        {/* Blok berikut hanya muncul setelah Lintang mengisinya. Selama `null`,
            bloknya disembunyikan — tidak ada porsi kerja atau pelajaran yang ditebak. */}
        {project.ownVsTeam ? (
          <section>
            <Heading>Solo vs team</Heading>
            <Prose>{project.ownVsTeam}</Prose>
          </section>
        ) : null}

        {project.results.length > 0 ? (
          <section>
            <Heading>What changed</Heading>
            <Bullets items={project.results} />
          </section>
        ) : null}

        {project.learned ? (
          <section>
            <Heading>One lesson</Heading>
            <Prose>{project.learned}</Prose>
          </section>
        ) : null}

        {/* Screenshot produk & foto proses. Masing-masing dibatasi 3
            (`MAX_GALLERY_ITEMS`) dan laci yang kosong tidak dirender —
            tidak ada bingkai kosong menunggu diisi. */}
        {project.gallery.screenshots.length > 0 ? (
          <section>
            <Heading>Screens</Heading>
            <ScreenshotStrip
              screenshots={project.gallery.screenshots.slice(
                0,
                MAX_GALLERY_ITEMS,
              )}
              className="mt-4"
            />
          </section>
        ) : null}

        {project.gallery.documentation.length > 0 ? (
          <section>
            <Heading>On site</Heading>
            <PhotoGallery
              photos={project.gallery.documentation.slice(0, MAX_GALLERY_ITEMS)}
              className="mt-4 sm:grid-cols-3 lg:grid-cols-3"
            />
          </section>
        ) : role ? (
          // Produk yang lahir dari sebuah pekerjaan: foto lapangannya tinggal di
          // halaman perannya, dan halaman ini MENAUTKAN — bukan menyalin —
          // supaya satu foto tidak muncul di dua tempat (§5.2).
          <section>
            <Heading>On site</Heading>
            <Prose>
              The photographs from this work — the site visits, the team, the
              paper process it replaced — sit with the job rather than the
              product.
            </Prose>
            <Link
              href={`/experience/${role.slug}`}
              className="mono text-accent hover:text-accent-strong focus-visible:ring-ring mt-3 inline-block rounded-sm text-[13px] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-offset-2"
            >
              {role.role} at {role.org} <span aria-hidden="true">→</span>
            </Link>
          </section>
        ) : null}

        <section>
          <Heading>Evidence</Heading>
          <Evidence project={project} />
        </section>

        <section>
          <Heading>Project status</Heading>
          <Prose>
            This project is labeled{" "}
            <strong className="font-semibold">{project.honesty}</strong>.
          </Prose>
        </section>

        {nextProject ? (
          <nav
            aria-label="Next project"
            className="border-border mt-16 border-t pt-8"
          >
            <p className="mono text-ink-muted text-xs tracking-[0.14em] uppercase">
              Next project
            </p>
            <Link
              href={`/projects/${nextProject.slug}`}
              className="text-ink hover:text-coral-ink decoration-border hover:decoration-coral-ink mt-3 inline-block text-(length:--step-1) font-semibold underline underline-offset-4"
            >
              {displayName(nextProject)}
              <span aria-hidden="true">&nbsp;→</span>
            </Link>
            <p className="text-ink-muted mt-2 leading-relaxed">
              {nextProject.tagline}
            </p>
          </nav>
        ) : null}
      </article>
    </Section>
  );
}
