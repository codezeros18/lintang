import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { HoverLift, Stagger, StaggerItem } from "@/components/motion/stagger";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { formatLogDate, getLogPosts, resultTone } from "@/lib/mdx";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Log",
  description:
    "Catatan lomba, event, dan proyek yang sedang dikerjakan Lintang Balakosa Ardhana — termasuk yang belum berhasil.",
  path: "/log",
});

/**
 * /log — daftar post (BLUEPRINT §6).
 * UI ringan: kartu berisi title · date · badge type · badge result · 1 baris teaser.
 * Filter `type` bersifat opsional di §6 dan belum dipasang (lihat PROGRESS_LOG S7).
 */
export default async function LogPage() {
  const posts = await getLogPosts();

  return (
    <main id="main">
      <Section className="pt-12 pb-24 md:pt-16 md:pb-32">
        <Link
          href="/"
          className="text-ink-muted hover:text-ink text-sm underline-offset-4 hover:underline"
        >
          ← Kembali ke beranda
        </Link>

        <div className="mt-8">
          <Reveal>
            <SectionHeading
              eyebrow="Log"
              title="Apa yang sedang saya kerjakan."
              description="Lomba, event, dan proyek — ditulis apa adanya, termasuk yang hasilnya belum sesuai harapan."
              as="h1"
            />
          </Reveal>
        </div>

        {posts.length === 0 ? (
          <p className="text-ink-muted mt-10">Belum ada post.</p>
        ) : (
          <Stagger className="mt-10 grid gap-4">
            {posts.map((post) => {
              const date = formatLogDate(post.date);

              return (
                <StaggerItem key={post.slug}>
                  <HoverLift className="relative">
                    <Card>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge tone="outline">{post.type}</Badge>
                        <Badge tone={resultTone(post.result)}>
                          {post.result}
                        </Badge>
                        {date ? (
                          <time
                            dateTime={post.date}
                            className="text-ink-muted mono text-xs"
                          >
                            {date}
                          </time>
                        ) : null}
                      </div>

                      <h2 className="mt-4 text-(length:--step-1) leading-snug font-semibold">
                        <Link
                          href={`/log/${post.slug}`}
                          className="focus-visible:ring-ring rounded-sm outline-none after:absolute after:inset-0 after:content-[''] focus-visible:ring-2 focus-visible:ring-offset-2"
                        >
                          {post.title}
                        </Link>
                      </h2>

                      {post.role ? (
                        <p className="text-ink-muted mt-2 text-sm">
                          {post.role}
                        </p>
                      ) : null}

                      {post.lesson ? (
                        <p className="mt-4 leading-relaxed">{post.lesson}</p>
                      ) : null}
                    </Card>
                  </HoverLift>
                </StaggerItem>
              );
            })}
          </Stagger>
        )}
      </Section>
    </main>
  );
}
