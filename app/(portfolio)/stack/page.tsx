import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { skillGroups } from "@/content/skills";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Stack",
  description:
    "The tools Lintang Balakosa Ardhana actually builds with — each group tied to the project where it was used.",
  path: "/stack",
});

export default function StackPage() {
  return (
    <main id="main">
      <Section className="pt-12 pb-24 md:pt-16 md:pb-28">
        <PageHeader
          title="stack"
          description="The tools I actually build with, grouped by role — every group points at the project where it was used, not a list of things I once opened."
        />

        <div className="mt-12">
          {skillGroups.map((group) => (
            <section key={group.title} className="border-border border-t py-6">
              <h2 className="text-(length:--step-1) leading-snug font-semibold">
                {group.title}
              </h2>

              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <Badge mono tone={item.level ? "neutral" : "outline"}>
                      {item.name}
                      {item.level ? ` · ${item.level}` : null}
                    </Badge>
                  </li>
                ))}
              </ul>

              <p className="text-ink-muted mt-4 text-sm leading-relaxed">
                <span className="text-ink font-medium">Used in: </span>
                {group.provenBy}
              </p>
            </section>
          ))}
        </div>

        {/* §4.4 — level kejujuran ditulis apa adanya, tanpa tafsir tambahan. */}
        <p className="text-ink-muted mt-10 max-w-2xl text-sm leading-relaxed">
          Honest about level:{" "}
          <strong className="text-ink font-medium">React Native = basic</strong>.
        </p>
      </Section>
    </main>
  );
}
