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
  organizationRoles,
  workItems,
} from "@/content/experience";

/**
 * Experience & Achievements — kredibilitas.
 *
 * Aturan yang dijaga:
 * - Ringkas 1–2 baris per entri, tanpa buzzword dan tanpa skill-dump.
 * - Medali SurabayaDev menunjuk ke case study Analisis Pembatalan Hotel alih-alih
 *   menceritakan ulang pekerjaannya (anti double-count, §5.2).
 * - Periode/tahun yang belum dipastikan tidak ditampilkan — bukan ditebak.
 */
export function ExperienceAchievements() {
  const sortedWork = [...workItems].sort((a, b) => a.order - b.order);
  const sortedAchievements = [...achievements].sort((a, b) => a.order - b.order);
  const sortedCerts = [...certifications].sort((a, b) => a.order - b.order);

  return (
    <Section id="experience">
      <Reveal>
        <SectionHeading
          eyebrow="Experience & achievements"
          title="Jejak kerja, kompetisi, dan kredensial."
        />
      </Reveal>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
        {/* ——— Timeline kerja ——— */}
        <div>
          <h3 className="mono text-ink-muted text-xs tracking-[0.14em] uppercase">
            Pengalaman
          </h3>

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

          {organizationRoles.length > 0 ? (
            <div className="mt-8">
              <h3 className="mono text-ink-muted text-xs tracking-[0.14em] uppercase">
                Organisasi
              </h3>
              <ul className="mt-4 space-y-2">
                {organizationRoles.map((item) => (
                  <li key={`${item.org}-${item.role}`} className="text-sm">
                    <span className="font-medium">{item.role}</span>
                    <span className="text-ink-muted"> · {item.org}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        {/* ——— Medali & sertifikasi ——— */}
        <div className="space-y-10">
          <div>
            <h3 className="mono text-ink-muted text-xs tracking-[0.14em] uppercase">
              Prestasi
            </h3>

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
            <h3 className="mono text-ink-muted text-xs tracking-[0.14em] uppercase">
              Sertifikasi
            </h3>
            <ul className="mt-5 space-y-3">
              {sortedCerts.map((cert) => (
                <li key={cert.name} className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium">{cert.name}</span>
                  {cert.issuer ? <Badge tone="outline">{cert.issuer}</Badge> : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
