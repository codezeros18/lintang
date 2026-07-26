import Link from "next/link";
import { notFound } from "next/navigation";

import { StoryBody } from "@/components/sections/story-body";
import { Section } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { education } from "@/content/experience";
import { buildMetadata } from "@/lib/seo";

type PageParams = { params: Promise<{ slug: string }> };

/**
 * /education/[slug] — cerita + foto dari masa sekolah.
 *
 * Hanya dibuat untuk entri yang `slug`-nya tidak `null`, yaitu UMN dan Digital
 * Skola (keputusan Lintang 2026-07-27). SMKN 4 sengaja tetap satu baris di
 * daftar, jadi slug-nya `null` dan `generateStaticParams` tidak memuatnya.
 */

export const dynamicParams = false;

const withStory = education.filter(
  (item): item is (typeof education)[number] & { slug: string } =>
    item.slug !== null,
);

export async function generateStaticParams() {
  return withStory.map((item) => ({ slug: item.slug }));
}

function getSchool(slug: string) {
  return withStory.find((item) => item.slug === slug);
}

export async function generateMetadata({ params }: PageParams) {
  const { slug } = await params;
  const item = getSchool(slug);

  if (!item) return buildMetadata({ noIndex: true });

  return buildMetadata({
    title: item.school,
    description: `${item.program} · ${item.period}`,
    path: `/education/${item.slug}`,
  });
}

export default async function EducationDetailPage({ params }: PageParams) {
  const { slug } = await params;
  const item = getSchool(slug);

  if (!item) notFound();

  return (
    <main id="main">
      <Section className="pt-12 pb-24 md:pt-16 md:pb-28">
        <Link
          href="/education"
          className="mono text-ink-muted hover:text-ink focus-visible:ring-ring rounded-sm text-[12px] outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        >
          <span aria-hidden="true">←&nbsp;</span>Education
        </Link>

        <div className="mt-8">
          <PageHeader title={item.school} />
        </div>

        <p className="mono text-n-500 mt-6 text-[12px]">
          {item.program} · {item.period}
          {item.note ? ` · ${item.note}` : null}
        </p>

        <StoryBody story={item.story} />
      </Section>
    </main>
  );
}
