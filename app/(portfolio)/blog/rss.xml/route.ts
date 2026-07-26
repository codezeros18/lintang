import { getBlogPosts } from "@/lib/mdx";
import { SITE, SITE_URL } from "@/lib/seo";

/**
 * RSS feed blog — route handler statis (R4).
 *
 * `force-static` membuatnya dirender sekali saat build lalu disajikan sebagai
 * file, jadi tidak ada fungsi server yang jalan per-request. **Nol backend berbayar.**
 * Draft tidak pernah masuk feed karena `getBlogPosts()` sudah menyaringnya di produksi.
 */
export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = await getBlogPosts();

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`;
      const pubDate = post.date
        ? new Date(post.date).toUTCString()
        : undefined;

      return [
        "    <item>",
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${escapeXml(url)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
        post.summary
          ? `      <description>${escapeXml(post.summary)}</description>`
          : null,
        pubDate ? `      <pubDate>${pubDate}</pubDate>` : null,
        ...post.tags.map(
          (tag) => `      <category>${escapeXml(tag)}</category>`,
        ),
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${SITE.name} — Blog`)}</title>
    <link>${SITE_URL}/blog</link>
    <description>${escapeXml(SITE.description)}</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
