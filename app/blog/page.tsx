import Link from "next/link";

import { HoverLift, Stagger, StaggerItem } from "@/components/motion/stagger";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { CONFIG, isSet } from "@/content/config";
import { formatLogDate, getBlogPosts, getBlogTags } from "@/lib/mdx";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Blog",
  description:
    "Notes on building production systems and reading their data — by Lintang Balakosa Ardhana.",
  path: "/blog",
});

/**
 * /blog — daftar post (R4).
 *
 * Tag diambil apa adanya dari frontmatter; tidak ada database, tidak ada filter
 * dinamis. Draft tidak pernah sampai ke sini di produksi (lihat `lib/mdx.ts`).
 */
export default async function BlogPage() {
  const posts = await getBlogPosts();
  const tags = await getBlogTags();

  return (
    <main id="main">
      <Section className="pt-12 pb-24 md:pt-16 md:pb-32">
        {/* Heading TIDAK dibungkus `Reveal`: ia berada di atas lipatan, dan aturan
            R2 melarang `opacity:0` di sana — kalau observer gagal memicu, judul
            halaman ikut hilang. Motion hanya untuk kartu di bawahnya. */}
        <SectionHeading
          eyebrow="Blog"
          title="Notes from building things that run."
          description="Mostly cross-posted from LinkedIn: what I learned shipping production systems, and what the data said afterwards."
          as="h1"
        />

        {tags.length > 0 ? (
          <ul className="mt-8 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li key={tag}>
                <Badge mono tone="outline">
                  {tag}
                </Badge>
              </li>
            ))}
          </ul>
        ) : null}

        {posts.length === 0 ? (
          /* Kosong itu jujur. Yang tidak jujur adalah mengisinya dengan artikel
             karangan — jadi selama Lintang belum menulis, halaman ini mengakuinya
             dan mengarahkan ke tempat tulisannya sekarang berada. */
          <div className="mt-10 max-w-2xl">
            <p className="text-ink-muted leading-relaxed">
              No posts published yet.
            </p>
            {isSet(CONFIG.LINKEDIN_URL) ? (
              <p className="text-ink-muted mt-3 leading-relaxed">
                In the meantime, I write on{" "}
                <a
                  href={CONFIG.LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink decoration-border hover:text-coral-ink hover:decoration-coral-ink underline underline-offset-4"
                >
                  LinkedIn
                </a>
                .
              </p>
            ) : null}
          </div>
        ) : (
          <Stagger className="mt-10 grid gap-4">
            {posts.map((post) => {
              const date = formatLogDate(post.date);

              return (
                <StaggerItem key={post.slug}>
                  <HoverLift className="relative">
                    <Card>
                      <div className="flex flex-wrap items-center gap-2">
                        {post.draft ? (
                          <Badge tone="coral">draft</Badge>
                        ) : null}
                        {post.tags.map((tag) => (
                          <Badge key={tag} mono tone="outline">
                            {tag}
                          </Badge>
                        ))}
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
                          href={`/blog/${post.slug}`}
                          className="focus-visible:ring-ring rounded-sm outline-none after:absolute after:inset-0 after:content-[''] focus-visible:ring-2 focus-visible:ring-offset-2"
                        >
                          {post.title}
                        </Link>
                      </h2>

                      {post.summary ? (
                        <p className="text-ink-muted mt-3 leading-relaxed">
                          {post.summary}
                        </p>
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
