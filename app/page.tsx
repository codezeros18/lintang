import Link from "next/link";

import { NumberedSection } from "@/components/home/numbered-section";
import { HomeIntro } from "@/components/sections/home-intro";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/container";
import {
  achievements,
  certifications,
  education,
  workItems,
} from "@/content/experience";
import { displayName, featuredProjects } from "@/content/projects";
import { skillGroups } from "@/content/skills";
import { getBlogPosts } from "@/lib/mdx";

/**
 * Beranda — **ringkasan**, bukan tempat semua isi ditumpuk.
 *
 * Struktur (keputusan Lintang 2026-07-26): intro pendek, lalu enam blok bernomor
 * `01 — experience`, `02 — projects`, … yang masing-masing hanya memuat cuplikan
 * dan mengantar ke halaman detailnya sendiri.
 *
 * Stack sengaja TIDAK jadi blok bernomor sendiri — ia menempel di bawah projects,
 * karena tools-nya memang milik proyek-proyek itu.
 */

function Row({
  href,
  primary,
  secondary,
  meta,
}: {
  href?: string;
  primary: string;
  secondary?: string;
  meta?: string;
}) {
  const content = (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
      <span className="text-ink text-[15px] font-medium">{primary}</span>
      {meta ? (
        <span className="mono text-n-500 text-[12px]">{meta}</span>
      ) : null}
    </div>
  );

  const body = secondary ? (
    <p className="text-ink-muted mt-1.5 text-[15px] leading-relaxed">
      {secondary}
    </p>
  ) : null;

  // `py-5` + `gap-y` yang lega: sebelumnya `py-3` membuat baris berikutnya
  // menempel ke deskripsi baris sebelumnya sehingga terlihat bertabrakan.
  return (
    <li className="border-border/70 border-b py-5 first:pt-0 last:border-b-0 last:pb-0">
      {href ? (
        <Link
          href={href}
          className="focus-visible:ring-ring hover:bg-secondary/40 -mx-3 block rounded-(--radius-sm) px-3 py-1 outline-none transition-colors focus-visible:ring-2"
        >
          {content}
          {body}
        </Link>
      ) : (
        <>
          {content}
          {body}
        </>
      )}
    </li>
  );
}

export default async function Home() {
  const blogPosts = await getBlogPosts();

  const sortedWork = [...workItems].sort((a, b) => a.order - b.order);
  const sortedCerts = [...certifications].sort((a, b) => a.order - b.order);
  const sortedEducation = [...education].sort((a, b) => a.order - b.order);
  const sortedAchievements = [...achievements].sort((a, b) => a.order - b.order);

  return (
    <main id="main">
      <Section className="pt-0 pb-24 md:pt-0 md:pb-28">
        <HomeIntro />

        <div className="space-y-16 md:space-y-20">
          <NumberedSection
            index={1}
            label="experience"
            href="/experience"
            linkLabel="All experience"
          >
            <ul>
              {sortedWork.slice(0, 3).map((item) => (
                <Row
                  key={item.org}
                  primary={item.role}
                  secondary={item.org}
                  meta={item.period ?? undefined}
                />
              ))}
            </ul>
          </NumberedSection>

          <NumberedSection
            index={2}
            label="projects"
            href="/projects"
            linkLabel="All projects"
          >
            <ul>
              {featuredProjects.map((project) => (
                <Row
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  primary={displayName(project)}
                  secondary={project.tagline}
                  meta={project.honesty}
                />
              ))}
            </ul>

            {/* Stack menempel di bawah projects, bukan blok bernomor sendiri
                (keputusan Lintang) — tools-nya memang milik proyek-proyek di atas. */}
            <div className="border-border/70 mt-6 border-t pt-5">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <p className="mono text-n-500 text-[11px] tracking-[0.16em] uppercase">
                  Stack
                </p>
                <Link
                  href="/stack"
                  className="mono text-ink-muted hover:text-ink focus-visible:ring-ring rounded-sm text-[12px] tracking-[0.08em] uppercase outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                >
                  Full stack
                  <span aria-hidden="true">&nbsp;→</span>
                </Link>
              </div>

              <ul className="mt-4 flex flex-wrap gap-2">
                {skillGroups.flatMap((group) =>
                  group.items.slice(0, 3).map((item) => (
                    <li key={`${group.title}-${item.name}`}>
                      <Badge mono tone="outline">
                        {item.name}
                      </Badge>
                    </li>
                  )),
                )}
              </ul>
            </div>
          </NumberedSection>

          <NumberedSection
            index={3}
            label="certifications"
            href="/certifications"
            linkLabel="All certifications"
          >
            <ul>
              {sortedCerts.slice(0, 3).map((cert) => (
                <Row
                  key={cert.name}
                  primary={cert.name}
                  secondary={cert.issuer}
                  meta={cert.date}
                />
              ))}
            </ul>
          </NumberedSection>

          <NumberedSection
            index={4}
            label="education"
            href="/education"
            linkLabel="All education"
          >
            <ul>
              {sortedEducation.map((item) => (
                <Row
                  key={item.school}
                  primary={item.school}
                  secondary={item.program}
                  meta={item.period}
                />
              ))}
            </ul>
          </NumberedSection>

          <NumberedSection
            index={5}
            label="collabs"
            href="/collabs"
            linkLabel="All collabs"
          >
            <ul>
              {sortedAchievements.map((item) => (
                <Row
                  key={item.title}
                  primary={`${item.medal} ${item.title}`}
                  secondary={item.detail}
                  meta={item.year ?? undefined}
                />
              ))}
            </ul>
          </NumberedSection>

          <NumberedSection
            index={6}
            label="blog"
            href="/blog"
            linkLabel="All posts"
          >
            {blogPosts.length === 0 ? (
              <p className="text-ink-muted text-sm leading-relaxed">
                No posts published yet.
              </p>
            ) : (
              <ul>
                {blogPosts.slice(0, 3).map((post) => (
                  <Row
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    primary={post.title}
                    secondary={post.summary}
                  />
                ))}
              </ul>
            )}
          </NumberedSection>
        </div>
      </Section>
    </main>
  );
}
