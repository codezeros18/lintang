import Link from "next/link";
import { Trophy } from "lucide-react";

import { CertificationCards } from "@/components/home/certification-cards";
import { GithubGraph } from "@/components/home/github-graph";
import { NumberedSection } from "@/components/home/numbered-section";
import { ProjectDeck } from "@/components/home/project-deck";
import { HomeIntro } from "@/components/sections/home-intro";
import { Section } from "@/components/ui/container";
import { CONTACT } from "@/content/config";
import {
  achievements,
  education,
  featuredCertifications,
  workItems,
} from "@/content/experience";
import { featuredProjects } from "@/content/projects";
import { skillGroups } from "@/content/skills";
import { getContributionCalendar, githubUsername } from "@/lib/github";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Home",
  description:
    "A summary of Lintang Balakosa Ardhana's experience, stack, projects, certifications, education, and collabs — each with a link to the full page.",
  path: "/home",
});

/**
 * /home — "portfolio lengkap", dimasuki dari splash `/` lewat "Know me more",
 * tapi juga bisa dituju langsung lewat wordmark di header.
 *
 * Urutan blok (keputusan Lintang 2026-07-27):
 *   01 experience  ← stack menempel DI SINI, bukan di bawah projects
 *   02 projects    ← tumpukan kartu dikipas
 *   03 certifications
 *   04 education
 *   05 collabs
 *   06 github
 *
 * Stack dipindah ke bawah experience karena tools itu lahir dari tempat kerja,
 * bukan dari daftar proyeknya. Nomornya tetap 01–05 seperti index di header,
 * dan stack tetap TANPA nomor sendiri.
 */

/** Baris experience: tahun di kiri, peran di tengah, organisasi di kanan. */
function ExperienceRow({
  year,
  role,
  org,
}: {
  year: string | null;
  role: string;
  org: string;
}) {
  return (
    <li className="border-border/70 grid grid-cols-[3.5rem_1fr] items-baseline gap-x-4 gap-y-1 border-b py-4 last:border-b-0 md:grid-cols-[4.5rem_1fr_auto]">
      <span className="mono text-n-500 text-[12px] tabular-nums">
        {year ?? ""}
      </span>
      <span className="text-ink text-[15px] font-medium">{role}</span>
      {/* Di mobile organisasi turun ke bawah peran (kolom kedua), di ≥768px ia
          duduk rata kanan sebaris — jadi tidak pernah bertabrakan. */}
      <span className="text-ink-muted col-start-2 text-[14px] md:col-start-3 md:text-right">
        {org}
      </span>
    </li>
  );
}

/** Ambil tahun mulai dari string periode CV, mis. "Jun 2026–present" → "2026". */
function startYear(period: string | null) {
  return period?.match(/\d{4}/)?.[0] ?? null;
}

const MAX_STACK_CHIPS = 11;

export default async function HomePage() {
  const sortedWork = [...workItems].sort((a, b) => a.order - b.order);
  const sortedEducation = [...education].sort((a, b) => a.order - b.order);
  const sortedAchievements = [...achievements].sort((a, b) => a.order - b.order);

  // Chip stack diratakan dari semua grup lalu dipotong — sisanya jadi "+ more"
  // yang mengantar ke /stack, bukan disembunyikan diam-diam.
  const allSkills = skillGroups.flatMap((group) =>
    group.items.map((item) => item.name),
  );
  const shownSkills = allSkills.slice(0, MAX_STACK_CHIPS);
  const hiddenSkillCount = allSkills.length - shownSkills.length;

  const calendar = await getContributionCalendar();

  return (
    <main id="main">
      <Section className="pt-12 pb-24 md:pt-16 md:pb-28">
        <HomeIntro showKnowMore={false} />

        <div className="mt-16 space-y-16 md:space-y-20">
          <NumberedSection
            index={1}
            label="experience"
            href="/experience"
            linkLabel="Full history"
          >
            <ul>
              {sortedWork.map((item) => (
                <ExperienceRow
                  key={item.org}
                  year={startYear(item.period)}
                  role={item.role}
                  org={item.org}
                />
              ))}
            </ul>

            {/* Stack menempel di bawah experience (keputusan Lintang
                2026-07-27) — tools ini tumbuh dari tempat-tempat kerja di atas. */}
            <div className="border-border/70 mt-8 border-t pt-6">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <p className="mono text-n-500 text-[11px] tracking-[0.16em] uppercase">
                  Stack
                </p>
                <Link
                  href="/stack"
                  className="mono text-ink-muted hover:text-ink focus-visible:ring-ring rounded-sm text-[12px] tracking-[0.08em] uppercase outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                >
                  View all
                  <span aria-hidden="true">&nbsp;→</span>
                </Link>
              </div>

              <ul className="mt-4 flex flex-wrap gap-2">
                {shownSkills.map((name) => (
                  <li key={name}>
                    <span className="border-border bg-card text-ink mono inline-flex items-center rounded-md border px-2.5 py-1 text-[13px]">
                      {name}
                    </span>
                  </li>
                ))}
                {hiddenSkillCount > 0 ? (
                  <li>
                    <Link
                      href="/stack"
                      className="border-border text-n-500 hover:border-accent/40 hover:text-accent focus-visible:ring-ring mono inline-flex items-center rounded-md border border-dashed px-2.5 py-1 text-[13px] outline-none transition-colors focus-visible:ring-2"
                    >
                      + {hiddenSkillCount} more
                    </Link>
                  </li>
                ) : null}
              </ul>
            </div>
          </NumberedSection>

          <NumberedSection
            index={2}
            label="projects"
            href="/projects"
            linkLabel="All projects"
          >
            <ProjectDeck projects={featuredProjects} />
          </NumberedSection>

          <NumberedSection
            index={3}
            label="certifications"
            href="/certifications"
            linkLabel="All certifications"
          >
            <CertificationCards items={featuredCertifications} />
          </NumberedSection>

          <NumberedSection
            index={4}
            label="education"
            href="/education"
            linkLabel="All education"
          >
            <ul>
              {sortedEducation.map((item) => (
                <ExperienceRow
                  key={item.school}
                  year={startYear(item.period)}
                  role={item.school}
                  org={item.program}
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
                <li
                  key={item.title}
                  className="border-border/70 border-b py-5 first:pt-0 last:border-b-0 last:pb-0"
                >
                  <div className="flex items-start gap-3">
                    <Trophy
                      aria-hidden="true"
                      className="text-accent mt-0.5 size-4 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <Link
                          href={`/collabs/${item.slug}`}
                          className="text-ink hover:text-accent focus-visible:ring-ring rounded-sm text-[15px] font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-offset-2"
                        >
                          {item.title}
                        </Link>
                        {item.year ? (
                          <span className="mono text-n-500 text-[12px]">
                            {item.year}
                          </span>
                        ) : null}
                      </div>
                      <p className="text-ink-muted mt-1.5 text-[14px] leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </NumberedSection>

          {/* 06 — github. Grid titiknya hanya muncul kalau datanya BENAR-BENAR
              terambil dari GitHub saat build (butuh `GITHUB_TOKEN`, lihat
              `lib/github.ts`). Tanpa itu, yang tersisa hanya tautan profil —
              tidak ada grafik hiasan atau jumlah kontribusi karangan. */}
          <section className="border-border scroll-mt-6 border-t pt-7">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="mono text-ink text-[13px] tracking-[0.08em]">
                <span className="text-accent">06</span>
                <span className="text-n-500"> — </span>
                github
              </h2>
              <a
                href={CONTACT.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mono text-ink-muted hover:text-ink focus-visible:ring-ring rounded-sm text-[12px] tracking-[0.08em] uppercase outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              >
                @{githubUsername()}
                <span aria-hidden="true">&nbsp;↗</span>
              </a>
            </div>

            {calendar ? (
              <GithubGraph calendar={calendar} />
            ) : (
              <p className="mono text-n-500 mt-5 text-[12px]">
                Contribution graph not connected yet.
              </p>
            )}
          </section>
        </div>
      </Section>
    </main>
  );
}
