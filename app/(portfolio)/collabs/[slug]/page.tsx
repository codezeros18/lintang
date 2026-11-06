import Link from "next/link";
import { notFound } from "next/navigation";

import { StoryBody } from "@/components/sections/story-body";
import { Section } from "@/components/ui/container";
import { HighlightChip } from "@/components/ui/highlight-chip";
import { PageHeader } from "@/components/ui/page-header";
import { achievements } from "@/content/experience";
import { getProjectBySlug } from "@/content/projects";
import { buildMetadata } from "@/lib/seo";

type PageParams = { params: Promise<{ slug: string }> };

/**
 * /collabs/[slug] — satu halaman per lomba.
 *
 * Isinya cerita lomba + foto tim. Untuk lomba yang pekerjaannya SUDAH punya
 * case study proyek (SurabayaDev → Hotel), halaman ini tidak menceritakan ulang
 * hasil kerjanya — ia menautkan ke case study-nya (anti double-count §5.2).
 *
 * I/O Festival & CIMB Niaga belum punya case study; templatenya sudah siap di
 * `content/experience.ts` dan halaman ini menampilkan "coming soon" sampai
 * Lintang mengisinya. Tidak ada kalimat karangan di sini.
 */

export const dynamicParams = false;

export async function generateStaticParams() {
  return achievements.map((item) => ({ slug: item.slug }));
}

function getAchievement(slug: string) {
  return achievements.find((item) => item.slug === slug);
}

export async function generateMetadata({ params }: PageParams) {
  const { slug } = await params;
  const item = getAchievement(slug);

  if (!item) return buildMetadata({ noIndex: true });

  return buildMetadata({
    title: item.title,
    description: item.detail,
    path: `/collabs/${item.slug}`,
  });
}

export default async function CollabPage({ params }: PageParams) {
  const { slug } = await params;
  const item = getAchievement(slug);

  if (!item) notFound();

  const project = item.projectSlug ? getProjectBySlug(item.projectSlug) : null;

  return (
    <main id="main">
      <Section className="pt-12 pb-24 md:pt-16 md:pb-28">
        <Link
          href="/collabs"
          className="mono text-ink-muted hover:text-ink focus-visible:ring-ring rounded-sm text-[12px] outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        >
          <span aria-hidden="true">←&nbsp;</span>Collabs
        </Link>

        <div className="mt-8">
          <PageHeader title={item.title} description={item.detail} />
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
          <HighlightChip>{item.role}</HighlightChip>
          <p className="mono text-n-500 text-[12px]">
            {item.scope}
            {item.year ? ` · ${item.year}` : null}
          </p>
        </div>

        <StoryBody story={item.story} />

        {project ? (
          <div className="border-border mt-12 border-t pt-6">
            <p className="mono text-n-500 text-[11px] tracking-[0.16em] uppercase">
              The work itself
            </p>
            <Link
              href={`/projects/${project.slug}`}
              className="mono text-ink decoration-border hover:decoration-ink focus-visible:ring-ring mt-3 inline-block rounded-sm text-[13px] underline underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            >
              Read the full case study <span aria-hidden="true">→</span>
            </Link>
          </div>
        ) : null}
      </Section>
    </main>
  );
}
