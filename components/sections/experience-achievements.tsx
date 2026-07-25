import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  achievements,
  certifications,
  education,
  organizationRoles,
  workItems,
} from "@/content/experience";

/**
 * Experience & Achievements — kredibilitas. Semua isinya dari CV.
 *
 * Aturan yang dijaga:
 * - Ringkas 1–2 baris per entri, tanpa buzzword dan tanpa skill-dump.
 * - Medali SurabayaDev menunjuk ke case study Analisis Pembatalan Hotel alih-alih
 *   menceritakan ulang pekerjaannya (anti double-count, §5.2).
 * - Tahun yang tidak tercantum di CV tidak ditampilkan — bukan ditebak.
 */

function GroupHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mono text-ink-muted text-xs tracking-[0.14em] uppercase">
      {children}
    </h3>
  );
}

export function ExperienceAchievements() {
  const sortedWork = [...workItems].sort((a, b) => a.order - b.order);
  const sortedAchievements = [...achievements].sort((a, b) => a.order - b.order);
  const sortedCerts = [...certifications].sort((a, b) => a.order - b.order);
  const sortedOrgs = [...organizationRoles].sort((a, b) => a.order - b.order);
  const sortedEducation = [...education].sort((a, b) => a.order - b.order);

  return (
    <Section id="experience">
      <Reveal>
        <SectionHeading
          eyebrow="Experience & achievements"
          title="Jejak kerja, kompetisi, dan kredensial."
        />
      </Reveal>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
        {/* ——— Kolom kiri: timeline kerja + pendidikan + organisasi ——— */}
        <div className="space-y-10">
          <div>
            <GroupHeading>Pengalaman</GroupHeading>

            <ol className="border-border mt-5 space-y-8 border-l pl-6">
              {sortedWork.map((item) => (
                <li key={item.org} className="relative">
                  <span
                    aria-hidden="true"
                    className="bg-indigo-brand absolute top-2 -left-[26.5px] h-2 w-2 rounded-full ring-4 ring-[var(--paper)]"
                  />
                  <p className="font-semibold">{item.role}</p>
                  <p className="text-ink-muted mt-1 text-sm">
                    {item.org}
                    {item.period ? ` · ${item.period}` : null}
                  </p>
                  {item.location ? (
                    <p className="text-ink-muted mono mt-1 text-xs">
                      {item.location}
                    </p>
                  ) : null}
                  <p className="text-ink-muted mt-2 text-sm leading-relaxed">
                    {item.summary}
                  </p>
                  {item.projectSlug ? (
                    <Link
                      href={`/projects/${item.projectSlug}`}
                      className="text-ink hover:text-coral-ink decoration-border hover:decoration-coral-ink mt-2 inline-block text-sm underline underline-offset-4"
                    >
                      Baca case study
                    </Link>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>

          <div>
            <GroupHeading>Pendidikan</GroupHeading>
            <ul className="mt-5 space-y-4">
              {sortedEducation.map((item) => (
                <li key={item.school}>
                  <p className="text-sm font-semibold">{item.school}</p>
                  <p className="text-ink-muted mt-1 text-sm">
                    {item.program} · {item.period}
                    {item.note ? ` · ${item.note}` : null}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {sortedOrgs.length > 0 ? (
            <div>
              <GroupHeading>Organisasi</GroupHeading>
              <ul className="mt-5 space-y-4">
                {sortedOrgs.map((item) => (
                  <li key={`${item.org}-${item.role}`}>
                    <p className="text-sm font-semibold">
                      {item.role}
                      <span className="text-ink-muted font-normal">
                        {" "}
                        · {item.org} · {item.period}
                      </span>
                    </p>
                    <p className="text-ink-muted mt-1 text-sm leading-relaxed">
                      {item.summary}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        {/* ——— Kolom kanan: medali & sertifikasi ——— */}
        <div className="space-y-10">
          <div>
            <GroupHeading>Prestasi</GroupHeading>

            <Stagger className="mt-5 space-y-3">
              {sortedAchievements.map((item) => (
                <StaggerItem key={item.title}>
                  <Card padding="sm" elevation="flat" className="flex gap-4">
                    <span aria-hidden="true" className="text-2xl leading-none">
                      {item.medal}
                    </span>
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-ink-muted mt-1 text-sm">
                        {item.scope}
                        {item.year ? ` · ${item.year}` : null}
                      </p>
                      <p className="text-ink-muted mt-2 text-sm leading-relaxed">
                        {item.detail}
                      </p>
                      {item.projectSlug ? (
                        <Link
                          href={`/projects/${item.projectSlug}`}
                          className="text-ink hover:text-coral-ink decoration-border hover:decoration-coral-ink mt-2 inline-block text-sm underline underline-offset-4"
                        >
                          Lihat case study-nya
                        </Link>
                      ) : null}
                    </div>
                  </Card>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <div>
            <GroupHeading>Sertifikasi</GroupHeading>
            <ul className="mt-5 space-y-3">
              {sortedCerts.map((cert) => (
                <li key={cert.name}>
                  <p className="text-sm font-medium">{cert.name}</p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2">
                    <Badge tone="outline">{cert.issuer}</Badge>
                    <span className="text-ink-muted mono text-xs">
                      {cert.date}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
