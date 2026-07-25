import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { formatLogDate, getLogPosts, resultTone } from "@/lib/mdx";

/**
 * Log teaser di beranda (BLUEPRINT §2) — menunjukkan bahwa Lintang masih aktif.
 * Menampilkan maksimal 3 post terbaru; kalau belum ada post sama sekali,
 * section ini tidak dirender (lebih baik absen daripada tampil kosong).
 */
export async function LogTeaser() {
  const posts = (await getLogPosts()).slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <Section id="log">
      <Reveal>
        <SectionHeading
          eyebrow="Log"
          title="Yang sedang dikerjakan."
          description="Catatan lomba, event, dan proyek — termasuk yang hasilnya belum sesuai harapan."
          action={
            <Button href="/log" variant="secondary" size="sm">
              Lihat semua
            </Button>
          }
        />
      </Reveal>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => {
          const date = formatLogDate(post.date);

          return (
            <Card
              key={post.slug}
              padding="sm"
              elevation="flat"
              className="relative flex flex-col"
            >
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="outline">{post.type}</Badge>
                <Badge tone={resultTone(post.result)}>{post.result}</Badge>
                {date ? (
                  <time dateTime={post.date} className="text-ink-muted mono text-xs">
                    {date}
                  </time>
                ) : null}
              </div>

              <h3 className="mt-3 leading-snug font-semibold">
                <Link
                  href={`/log/${post.slug}`}
                  className="focus-visible:ring-ring rounded-sm outline-none after:absolute after:inset-0 after:content-[''] focus-visible:ring-2 focus-visible:ring-offset-2"
                >
                  {post.title}
                </Link>
              </h3>

              {post.role ? (
                <p className="text-ink-muted mt-2 text-sm leading-relaxed">
                  {post.role}
                </p>
              ) : null}
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
