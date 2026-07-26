import { Section } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { education } from "@/content/experience";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Education",
  description:
    "Education of Lintang Balakosa Ardhana — Informatics at Universitas Multimedia Nusantara, a data science bootcamp, and vocational software engineering.",
  path: "/education",
});

export default function EducationPage() {
  const sorted = [...education].sort((a, b) => a.order - b.order);

  return (
    <main id="main">
      <Section className="pt-12 pb-24 md:pt-16 md:pb-28">
        <PageHeader
          title="education"
          description="Informatics at Universitas Multimedia Nusantara, a vocational software engineering background, and the bootcamp that added the data side."
        />

        <ul className="mt-12">
          {sorted.map((item) => (
            <li key={item.school} className="border-border border-t py-5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h2 className="text-[15px] font-medium">{item.school}</h2>
                <span className="mono text-n-500 text-[12px]">
                  {item.period}
                </span>
              </div>
              <p className="mono text-ink-muted mt-1 text-[14px]">
                {item.program}
                {item.note ? ` · ${item.note}` : null}
              </p>
            </li>
          ))}
        </ul>
      </Section>
    </main>
  );
}
