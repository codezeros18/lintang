import Link from "next/link";

import { HoverLift, Stagger, StaggerItem } from "@/components/motion/stagger";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { formatLogDate, getLogPosts, resultTone } from "@/lib/mdx";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Log",
  description:
    "Notes on competitions, events, and projects by Lintang Balakosa Ardhana — including the ones that did not work out.",
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
        {/* `PageHeader` seragam dengan halaman detail lain (keputusan Lintang);
            tidak dibungkus `Reveal` karena berada di atas lipatan (aturan R2). */}
        <PageHeader
          eyebrow="Log"
          title="What I&rsquo;m working on."
          description="Competitions, events, and projects — written plainly, including the ones that did not go my way."
        />

        {posts.length === 0 ? (
          <p className="text-ink-muted mt-10">No posts yet.</p>
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
