import Link from "next/link";
import { notFound } from "next/navigation";

import { StoryBody } from "@/components/sections/story-body";
import { Section } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { organizationRoles } from "@/content/experience";
import { buildMetadata } from "@/lib/seo";

type PageParams = { params: Promise<{ slug: string }> };

/**
 * /experience/organizations/[slug] — halaman cerita per organisasi.
 *
 * Isinya bukan case study bisnis seperti Ankop/Bisasinema, melainkan cerita
 * "bagaimana rasanya di dalam organisasi itu": kerja bareng koordinator divisi
 * lain (mis. divisi website × divisi visual) plus foto-fotonya.
 *
 * Ceritanya masih template kosong di `content/experience.ts` — halaman ini
 * hanya menampilkan fakta yang sudah ada (peran, periode, ringkasan CV) dan
 * satu baris "coming soon" sampai Lintang menulisnya.
 */

export const dynamicParams = false;

export async function generateStaticParams() {
  return organizationRoles.map((item) => ({ slug: item.slug }));
}

function getRole(slug: string) {
  return organizationRoles.find((item) => item.slug === slug);
}

export async function generateMetadata({ params }: PageParams) {
  const { slug } = await params;
  const role = getRole(slug);

  if (!role) return buildMetadata({ noIndex: true });

  return buildMetadata({
    title: `${role.org} — ${role.role}`,
    description: role.summary,
    path: `/experience/organizations/${role.slug}`,
  });
}

export default async function OrganizationPage({ params }: PageParams) {
  const { slug } = await params;
  const role = getRole(slug);

  if (!role) notFound();

  return (
    <main id="main">
      <Section className="pt-12 pb-24 md:pt-16 md:pb-28">
        <Link
          href="/experience"
          className="mono text-ink-muted hover:text-ink focus-visible:ring-ring rounded-sm text-[12px] outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        >
          <span aria-hidden="true">←&nbsp;</span>Experience
        </Link>

        <div className="mt-8">
          <PageHeader title={role.org} description={role.summary} />
        </div>

        <p className="mono text-n-500 mt-6 text-[12px]">
          {role.role} · {role.period}
        </p>

        <StoryBody story={role.story} />
      </Section>
    </main>
  );
}
