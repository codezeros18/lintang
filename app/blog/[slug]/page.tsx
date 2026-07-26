import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { mdxComponents } from "@/components/mdx-components";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/container";
import { formatLogDate, getBlogPost, getBlogPosts } from "@/lib/mdx";
import { buildMetadata } from "@/lib/seo";

type PageParams = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

/** Slug di luar daftar (termasuk draft di produksi) → 404. */
export const dynamicParams = false;

export async function generateMetadata({ params }: PageParams) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) return buildMetadata({ noIndex: true });

  const metadata = buildMetadata({
    title: post.title,
    description: post.summary || undefined,
    path: `/blog/${post.slug}`,
    // Draft hanya bisa dibuka di dev, tapi tetap ditandai noindex demi jaga-jaga.
    noIndex: post.draft,
  });

  // `canonical` diisi bila tulisannya lebih dulu terbit di tempat lain.
  // Konsekuensinya: mesin pencari menganggap sumber itu yang berhak atas
  // peringkatnya — trade-off yang dijelaskan di `content/blog/_TEMPLATE.mdx`.
  if (post.canonical) {
    metadata.alternates = { ...metadata.alternates, canonical: post.canonical };
  }

  return metadata;
}

export default async function BlogPostPage({ params }: PageParams) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) notFound();

  const date = formatLogDate(post.date);

  return (
    <main id="main">
      <Section className="pt-12 pb-24 md:pt-16 md:pb-32">
        <Link
          href="/blog"
          className="text-ink-muted hover:text-ink text-sm underline-offset-4 hover:underline"
        >
          ← All posts
        </Link>

        <article className="mt-8 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            {post.draft ? <Badge tone="coral">draft</Badge> : null}
            {post.tags.map((tag) => (
              <Badge key={tag} mono tone="outline">
                {tag}
              </Badge>
            ))}
            {date ? (
              <time dateTime={post.date} className="text-ink-muted mono text-xs">
                {date}
              </time>
            ) : null}
          </div>

          <h1 className="mt-5 text-(length:--step-3) leading-tight font-semibold">
            {post.title}
          </h1>

          {post.summary ? (
            <p className="text-ink-muted mt-5 text-(length:--step-1) leading-relaxed">
              {post.summary}
            </p>
          ) : null}

          {/* Asal tulisan ditampilkan terbuka, bukan disamarkan. */}
          {post.canonical ? (
            <p className="text-ink-muted mt-4 text-sm">
              Originally published on{" "}
              <a
                href={post.canonical}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink decoration-border hover:text-coral-ink hover:decoration-coral-ink underline underline-offset-4"
              >
                its original source
              </a>
              .
            </p>
          ) : null}

          <div className="mt-10 space-y-5">
            <MDXRemote source={post.body} components={mdxComponents} />
          </div>
        </article>
      </Section>
    </main>
  );
}
