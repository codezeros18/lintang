import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { HoverLift, Stagger, StaggerItem } from "@/components/motion/stagger";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  displayName,
  featuredProjects,
  honestyTone,
  otherProjects,
  type Project,
} from "@/content/projects";

/**
 * Featured Projects — BLUEPRINT §2 menaruh section ini TEPAT setelah hero
 * ("bukti dulu", sebelum About). Urutan kartu: Ankop → Bisasinema → Tera →
 * Analisis Hotel (§5.2).
 *
 * Analisis Pembatalan Hotel muncul SEKALI di sini, sudah menggabungkan medali
 * SurabayaDev — medalinya tidak dihitung ulang sebagai item terpisah (§5.2).
 */

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="flex h-full flex-col">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone={honestyTone(project.honesty)}>{project.honesty}</Badge>
        {project.award ? <Badge tone="coral">{project.award}</Badge> : null}
      </div>

      <h3 className="mt-4 text-(length:--step-1) leading-snug font-semibold">
        {/* Stretched link: seluruh kartu jadi target klik, tapi hanya judulnya
            yang jadi teks tautan supaya screen reader tetap masuk akal. */}
        <Link
          href={`/projects/${project.slug}`}
          className="focus-visible:ring-ring rounded-sm outline-none after:absolute after:inset-0 after:content-[''] focus-visible:ring-2 focus-visible:ring-offset-2"
        >
          {displayName(project)}
        </Link>
      </h3>

      <p className="text-ink-muted mt-3 leading-relaxed">{project.tagline}</p>

      <ul className="mt-5 flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <li key={tech}>
            <Badge mono>{tech}</Badge>
          </li>
        ))}
      </ul>

      <p className="text-ink-muted mt-auto pt-6 text-sm">
        {project.role}
        {project.durationNote ? ` · ${project.durationNote}` : null}
      </p>
    </Card>
  );
}

export function FeaturedProjects() {
  return (
    <Section id="projects">
      <Reveal>
        <SectionHeading
          eyebrow="Featured projects"
          title="Systems people actually use — and what changed because of them."
          description="Four projects with the technical decisions behind them and what they produced. Open one to read the problem, the decisions, and the results in full."
        />
      </Reveal>

      <Stagger className="mt-10 grid gap-4 md:grid-cols-2">
        {featuredProjects.map((project) => (
          <StaggerItem key={project.slug} className="h-full">
            <HoverLift className="relative h-full">
              <ProjectCard project={project} />
            </HoverLift>
          </StaggerItem>
        ))}
      </Stagger>

      {/* §5.3 — sekunder: kartu kecil, tanpa halaman case study sendiri. */}
      <Reveal>
        <h3 className="text-ink-muted mt-16 text-sm font-medium tracking-[0.14em] uppercase">
          Other projects
        </h3>
      </Reveal>

      <Stagger className="mt-5 grid gap-4 sm:grid-cols-2">
        {otherProjects.map((project) => (
          <StaggerItem key={project.slug} className="h-full">
            <Card padding="sm" elevation="flat" className="flex h-full flex-col">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="font-semibold">{displayName(project)}</h4>
                <Badge tone={honestyTone(project.honesty)}>
                  {project.honesty}
                </Badge>
              </div>
              <p className="text-ink-muted mt-2 text-sm leading-relaxed">
                {project.tagline}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <li key={tech}>
                    <Badge mono tone="outline">
                      {tech}
                    </Badge>
                  </li>
                ))}
              </ul>
            </Card>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
