import { CertificationDeck } from "@/components/certifications/certification-deck";
import { Section } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { certificationCategories, certifications } from "@/content/experience";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Certifications",
  description:
    "Certifications held by Lintang Balakosa Ardhana — BNSP Associate Data Scientist, competition and internship certificates, Digital Skola, and IBM/University of London via Coursera.",
  path: "/certifications",
});

/**
 * /certifications — dikelompokkan per jenis kredensial, tiap grup jadi satu
 * deret kartu miring yang meluruskan diri saat disentuh
 * (`components/certifications/certification-deck.tsx`).
 *
 * Grup yang kosong tidak dirender, jadi menambah kategori baru di
 * `certificationCategories` aman.
 */
export default function CertificationsPage() {
  const sorted = [...certifications].sort((a, b) => a.order - b.order);

  return (
    <main id="main">
      <Section className="pt-12 pb-24 md:pt-16 md:pb-28">
        <PageHeader
          title="certifications"
          description="A BNSP professional certification, competition certificates — placements and participation, labelled as they are — an internship certificate, a bootcamp, and coursework from IBM and the University of London via Coursera."
        />

        <div className="mt-14 space-y-14">
          {certificationCategories.map((category) => {
            const items = sorted.filter((cert) => cert.category === category);
            if (items.length === 0) return null;

            return (
              <section key={category}>
                <h2 className="mono text-n-500 text-[11px] tracking-[0.16em] uppercase">
                  {category}
                </h2>
                <CertificationDeck items={items} />
              </section>
            );
          })}
        </div>
      </Section>
    </main>
  );
}
