import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Section } from "@/components/ui/container";
import { OrgMark } from "@/components/ui/org-mark";
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
 * Kartu hero — dua kolom: mockup produk di kiri, teks di kanan.
 *
 * Sebelumnya semua kartu identik (kotak, judul, tagline, chip) dan memang
 * terasa datar. Yang membuatnya hidup sekarang bukan hiasan tambahan, tapi
 * **isinya**: proyek yang sudah punya mockup memajangnya langsung di kartu,
 * jadi orang tahu wujud produknya sebelum mengklik.
 *
 * Responsif: satu kolom di bawah `md` (mockup di atas, teks di bawah), dua
 * kolom di atasnya. Proyek tanpa mockup tetap satu kolom penuh dan tidak
 * meninggalkan lubang kosong di sebelah kiri.
 */
function FeaturedCard({ project }: { project: Project }) {
  const cover = project.gallery.screenshots[0];

  return (
    <li
      className={[
        "group border-border bg-card relative overflow-hidden rounded-(--radius) border",
        "hover:border-accent/40 transition-colors duration-300",
        cover ? "md:grid md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]" : "",
      ].join(" ")}
    >
      {cover ? (
        // PNG-nya transparan, jadi diberi latar tipis supaya mockup gelapnya
        // punya bidang sendiri dan tidak melayang di atas kartu putih.
        <div className="bg-secondary/60 flex items-center justify-center overflow-hidden p-4 md:p-6">
          <Image
            src={`/images/${cover.src}`}
            alt={cover.alt}
            width={1920}
            height={1440}
            sizes="(max-width: 768px) 100vw, 420px"
            className="h-auto w-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
          />
        </div>
      ) : null}

      <div className="flex flex-col p-6">
        <div className="flex items-start gap-3">
          <OrgMark logo={project.logo} short={project.short} />
          <div className="flex flex-wrap items-center gap-2">
            <span className="mono border-border text-n-500 rounded-full border px-2 py-0.5 text-[10px] tracking-[0.1em] uppercase">
              {project.honesty}
            </span>
            {project.award ? (
              <span className="mono bg-accent-wash text-accent rounded-full px-2 py-0.5 text-[10px] tracking-[0.1em] uppercase">
                {project.award}
              </span>
            ) : null}
          </div>
        </div>

        <h2 className="mono text-ink mt-5 text-[16px] leading-snug">
          {/* Seluruh kartu jadi target klik lewat `after:inset-0`, tapi hanya
              judulnya yang jadi teks tautan bagi pembaca layar. */}
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

        <div className="border-border/70 mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 border-t pt-4 md:pt-5">
          {project.tech.slice(0, 4).map((tech, index) => (
            <span
              key={tech}
              className="mono text-n-500 flex items-center gap-2 text-[11px]"
            >
              {/* Titik pemisah, bukan chip — empat chip berjajar membuat kaki
                  kartu jadi berat, padahal ini cuma keterangan. */}
              {index > 0 ? (
                <span
                  aria-hidden="true"
                  className="bg-n-300 size-0.5 rounded-full"
                />
              ) : null}
              {tech}
            </span>
          ))}
          {project.tech.length > 4 ? (
            <span className="mono text-n-500 text-[11px]">
              +{project.tech.length - 4}
            </span>
          ) : null}

          <ArrowUpRight
            aria-hidden="true"
            className="text-n-500 group-hover:text-accent ml-auto size-4 shrink-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </div>
      </div>
    </li>
  );
}

/** Kartu sekunder — tanpa halaman case study, jadi tidak bisa diklik. */
function SecondaryCard({ project }: { project: Project }) {
  return (
    <li className="border-border bg-card flex h-full flex-col rounded-(--radius) border p-5">
      <div className="flex items-start gap-3">
        <OrgMark logo={project.logo} short={project.short} />
        <span className="mono border-border text-n-500 rounded-full border px-2 py-0.5 text-[10px] tracking-[0.1em] uppercase">
          {project.honesty}
        </span>
      </div>

      <h3 className="mono text-ink mt-4 text-[15px] leading-snug">
        {displayName(project)}
      </h3>

      <p className="text-ink-muted mt-2 text-[14px] leading-relaxed">
        {project.tagline}
      </p>

      <div className="border-border/70 mt-auto flex flex-wrap gap-x-2 gap-y-1 border-t pt-4">
        {project.tech.slice(0, 4).map((tech, index) => (
          <span
            key={tech}
            className="mono text-n-500 flex items-center gap-2 text-[11px]"
          >
            {index > 0 ? (
              <span
                aria-hidden="true"
                className="bg-n-300 size-0.5 rounded-full"
              />
            ) : null}
            {tech}
          </span>
        ))}
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

        <ul className="mt-14 grid gap-5">
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
              <SecondaryCard key={project.slug} project={project} />
            ))}
          </ul>
        </div>
      </Section>
    </main>
  );
}
