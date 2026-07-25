import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { mdxComponents } from "@/components/mdx-components";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/container";
import { formatLogDate, getLogPost, getLogPosts, resultTone } from "@/lib/mdx";
import { buildMetadata } from "@/lib/seo";

type PageParams = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getLogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageParams) {
  const { slug } = await params;
  const post = await getLogPost(slug);

  if (!post) return buildMetadata({ noIndex: true });

  return buildMetadata({
    title: post.title,
    description: post.lesson || post.role || undefined,
    path: `/log/${post.slug}`,
  });
}

export default async function LogPostPage({ params }: PageParams) {
  const { slug } = await params;
  const post = await getLogPost(slug);

  if (!post) notFound();

  const date = formatLogDate(post.date);

  return (
    <main id="main">
      <Section className="pt-12 pb-24 md:pt-16 md:pb-32">
        <Link
          href="/log"
          className="text-ink-muted hover:text-ink text-sm underline-offset-4 hover:underline"
        >
          ← Semua log
        </Link>

        <article className="mt-8 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="outline">{post.type}</Badge>
            <Badge tone={resultTone(post.result)}>{post.result}</Badge>
            {/* Tanggal hanya tampil bila memang diisi — tidak pernah ditebak. */}
            {date ? (
              <time dateTime={post.date} className="text-ink-muted mono text-xs">
                {date}
              </time>
            ) : null}
          </div>

          <h1 className="mt-5 text-(length:--step-3) leading-tight font-semibold">
            {post.title}
          </h1>

          {post.role ? (
            <p className="text-ink-muted mt-4 text-(length:--step-0)">
              {post.role}
            </p>
          ) : null}

          {post.stack.length > 0 ? (
            <ul className="mt-5 flex flex-wrap gap-2">
              {post.stack.map((item) => (
                <li key={item}>
                  <Badge mono>{item}</Badge>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-10 space-y-5">
            <MDXRemote source={post.body} components={mdxComponents} />
          </div>

          {/* Blok pelajaran hanya muncul bila Lintang sudah menulisnya. */}
          {post.lesson ? (
            <Card
              padding="sm"
              elevation="flat"
              className="border-l-indigo-brand mt-10 rounded-l-none border-l-[3px]"
            >
              <p className="mono text-ink-muted text-xs tracking-[0.14em] uppercase">
                1 pelajaran
              </p>
              <p className="mt-3 leading-relaxed">{post.lesson}</p>
            </Card>
          ) : null}

          {post.cta ? (
            <div className="border-border mt-12 border-t pt-8">
              <p className="text-(length:--step-1) leading-snug font-semibold">
                {post.cta}
              </p>
              <div className="mt-5">
                <Button href="/#contact">Hubungi saya</Button>
              </div>
            </div>
          ) : null}
        </article>
      </Section>
    </main>
  );
}
