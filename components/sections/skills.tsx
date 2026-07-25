import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { skillGroups } from "@/content/skills";

/**
 * Skills — PORTFOLIO_BLUEPRINT.md §4.4.
 * Tiap grup wajib menunjuk bukti ("dipakai di ___") supaya daftar skill tidak
 * berubah jadi buzzword. Level yang belum kuat ditulis apa adanya (React Native = basic).
 */
export function Skills() {
  return (
    <Section id="skills">
      <Reveal>
        <SectionHeading
          eyebrow="Skills"
          title="Skills I can point to evidence for."
          description="Every group links back to the project where it was actually used."
        />
      </Reveal>

      <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <StaggerItem key={group.title}>
            <Card className="flex h-full flex-col">
              <h3 className="text-(length:--step-1) font-semibold">
                {group.title}
              </h3>

              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <Badge mono tone={item.level ? "coral" : "neutral"}>
                      {item.name}
                      {item.level ? ` · ${item.level}` : null}
                    </Badge>
                  </li>
                ))}
              </ul>

              <p className="text-ink-muted mt-auto pt-5 text-sm leading-relaxed">
                <span className="text-ink font-medium">Used in: </span>
                {group.provenBy}
              </p>
            </Card>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal>
        {/* §4.4 — "Kejujuran level: React Native = basic (eksplisit)". Ditulis apa
            adanya, tanpa tambahan tafsir soal sejauh mana kemampuannya. */}
        <p className="text-ink-muted mt-8 max-w-2xl text-sm leading-relaxed">
          Honest about level:{" "}
          <strong className="text-ink font-medium">React Native = basic</strong>.
        </p>
      </Reveal>
    </Section>
  );
}
