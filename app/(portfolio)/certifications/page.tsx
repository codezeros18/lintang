import { Section } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { certifications } from "@/content/experience";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Certifications",
  description:
    "Certifications held by Lintang Balakosa Ardhana — BNSP Associate Data Scientist, Digital Skola, and IBM/University of London via Coursera.",
  path: "/certifications",
});

export default function CertificationsPage() {
  const sorted = [...certifications].sort((a, b) => a.order - b.order);

  return (
    <main id="main">
      <Section className="pt-12 pb-24 md:pt-16 md:pb-28">
        <PageHeader
          eyebrow="Certifications"
          title="Credentials I can show."
          description="All issued and dated — nothing in progress is listed as finished."
        />

        <ul className="mt-12">
          {sorted.map((cert) => (
            <li key={cert.name} className="border-border border-t py-5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h2 className="text-[15px] font-medium">{cert.name}</h2>
                <span className="mono text-n-500 text-[12px]">{cert.date}</span>
              </div>
              <p className="mono text-ink-muted mt-1 text-[14px]">
                {cert.issuer}
              </p>
            </li>
          ))}
        </ul>
      </Section>
    </main>
  );
}
