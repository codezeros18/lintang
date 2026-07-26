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
 * Struktur baru (keputusan Lintang 2026-07-26): intro pendek, lalu tujuh blok
 * bernomor `01 — experience`, `02 — projects`, … yang masing-masing hanya memuat
 * cuplikan dan mengantar ke halaman detailnya sendiri.
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
      <span className="text-ink font-medium">{primary}</span>
      {meta ? (
        <span className="mono text-n-500 text-[12px]">{meta}</span>
      ) : null}
    </div>
  );

  return (
    <li className="border-border/70 border-b py-3 last:border-b-0">
      {href ? (
        <Link
          href={href}
          className="focus-visible:ring-ring block rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        >
          {content}
          {secondary ? (
            <p className="text-ink-muted mt-1 text-sm leading-relaxed">
              {secondary}
            </p>
          ) : null}
        </Link>
      ) : (
        <>
          {content}
          {secondary ? (
            <p className="text-ink-muted mt-1 text-sm leading-relaxed">
              {secondary}
            </p>
          ) : null}
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

        <div className="space-y-14">
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
          </NumberedSection>

          <NumberedSection
            index={3}
            label="stack"
            href="/stack"
            linkLabel="Full stack"
          >
            <ul className="flex flex-wrap gap-2">
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
          </NumberedSection>

          <NumberedSection
            index={4}
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
            index={5}
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
            index={6}
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
            index={7}
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
