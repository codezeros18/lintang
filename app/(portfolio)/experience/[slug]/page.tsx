import Link from "next/link";
import { notFound } from "next/navigation";

import { StoryBody } from "@/components/sections/story-body";
import { Section } from "@/components/ui/container";
import { OrgMark } from "@/components/ui/org-mark";
import { workItems } from "@/content/experience";
import { displayName, getProjectBySlug } from "@/content/projects";
import { buildMetadata } from "@/lib/seo";

type PageParams = { params: Promise<{ slug: string }> };

/**
 * /experience/[slug] — satu halaman per PERAN.
 *
 * Pembagiannya (keputusan Lintang 2026-07-27, karena "read the case study" yang
 * melompat ke /projects membingungkan): Ankop dan Bisasinema di CV memang
 * tercatat sebagai **pekerjaan**, bukan proyek sampingan. Jadi:
 *
 *   /experience/<slug>  → TEMPAT KERJANYA. Apa yang bisnisnya butuhkan, apa
 *                         peran Lintang di sana, apa yang berubah, fotonya.
 *   /projects/<slug>    → PRODUKNYA. Bagaimana dibangun, keputusan teknis,
 *                         stack, layar.
 *
 * Keduanya saling menautkan dan TIDAK mengulang isi satu sama lain — halaman
 * peran sengaja menyerahkan pembahasan teknis ke halaman produk (anti
 * double-count §5.2). Dengan begitu satu hal hanya diceritakan sekali, dan
 * pembaca tahu persis apa yang akan ia dapat sebelum mengklik.
 */

export const dynamicParams = false;

export async function generateStaticParams() {
  return workItems.map((item) => ({ slug: item.slug }));
}

function getRole(slug: string) {
  return workItems.find((item) => item.slug === slug);
}

export async function generateMetadata({ params }: PageParams) {
  const { slug } = await params;
  const item = getRole(slug);

  if (!item) return buildMetadata({ noIndex: true });

  return buildMetadata({
    title: `${item.role} — ${item.org}`,
    description: item.summary,
    path: `/experience/${item.slug}`,
  });
}

export default async function ExperienceDetailPage({ params }: PageParams) {
  const { slug } = await params;
  const item = getRole(slug);

  if (!item) notFound();

  const project = item.projectSlug ? getProjectBySlug(item.projectSlug) : null;

  return (
    <main id="main">
      <Section className="pt-12 pb-24 md:pt-16 md:pb-28">
        <Link
          href="/experience"
          className="mono text-ink-muted hover:text-ink focus-visible:ring-ring rounded-sm text-[12px] outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        >
          <span aria-hidden="true">←&nbsp;</span>Experience
        </Link>

        {/* Kepala halaman meniru cara CV dibaca: perusahaan dulu, baru peran. */}
        <header className="mt-8 flex items-start gap-4">
          <OrgMark logo={item.logo} short={item.short} />
          <div className="min-w-0">
            <h1 className="text-ink text-[19px] leading-snug font-medium">
              {item.org}
            </h1>
            <p className="mono text-n-500 mt-1 text-[12px]">
              {item.employmentType}
              {item.location ? ` · ${item.location}` : null}
            </p>
          </div>
        </header>

        <div className="border-border mt-8 border-t pt-7">
          <h2 className="text-ink text-[17px] font-medium">{item.role}</h2>
          {item.period ? (
            <p className="mono text-accent mt-1 text-[12px] tracking-[0.08em] uppercase">
              {item.period}
            </p>
          ) : null}

          <p className="text-ink-muted mt-4 max-w-2xl text-[15px] leading-relaxed">
            {item.summary}
          </p>

          {item.skills.length > 0 ? (
            <ul className="mt-5 flex flex-wrap gap-2">
              {item.skills.map((skill) => (
                <li key={skill}>
                  {/* Radius & border sama persis dengan chip stack di beranda
                      (permintaan Lintang) — satu bahasa untuk satu jenis benda. */}
                  <span className="border-border bg-card text-ink mono inline-flex items-center rounded-md border px-2.5 py-1 text-[13px]">
                    {skill}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <StoryBody story={item.story} />

        {project ? (
          <div className="border-border mt-12 border-t pt-6">
            <p className="mono text-n-500 text-[11px] tracking-[0.16em] uppercase">
              The product this role produced
            </p>
            <Link
              href={`/projects/${project.slug}`}
              className="mono text-accent hover:text-accent-strong focus-visible:ring-ring mt-3 inline-block rounded-sm text-[13px] underline decoration-transparent underline-offset-4 outline-none transition-colors hover:decoration-current focus-visible:ring-2 focus-visible:ring-offset-2"
            >
              {displayName(project)} — how it was built{" "}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        ) : null}
      </Section>
    </main>
  );
}
