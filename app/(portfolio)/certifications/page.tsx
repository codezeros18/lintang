import { Section } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import {
  certificationCategories,
  certifications,
  type Certification,
} from "@/content/experience";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Certifications",
  description:
    "Certifications held by Lintang Balakosa Ardhana — BNSP Associate Data Scientist, Digital Skola, and IBM/University of London via Coursera.",
  path: "/certifications",
});

/**
 * Inisial penerbit sebagai "mark" di kartu — dipakai karena belum ada berkas
 * logo di `public/images/`. Sengaja huruf, bukan logo asli milik penerbit:
 * menampilkan logo IBM/Coursera/BNSP tanpa izin justru bermasalah.
 * TODO(lintang): kalau nanti ada aset logo yang boleh dipakai, ganti di sini.
 */
function issuerMark(issuer: string) {
  return issuer
    .replace(/\(.*?\)/g, "") // buang "(Coursera)" dsb.
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function CertificationCard({ cert }: { cert: Certification }) {
  return (
    <li className="border-border bg-card hover:border-n-300 flex flex-col rounded-(--radius) border p-5 transition-colors">
      <span
        aria-hidden="true"
        className="bg-secondary text-ink mono flex size-9 items-center justify-center rounded-full text-[12px] font-medium"
      >
        {issuerMark(cert.issuer)}
      </span>

      <h3 className="text-ink mt-4 text-[15px] leading-snug font-medium">
        {cert.name}
      </h3>

      <p className="mono text-n-500 mt-2 text-[11px] tracking-[0.12em] uppercase">
        {cert.issuer}
      </p>

      <div className="border-border/70 mt-4 flex items-center justify-between gap-3 border-t pt-4">
        <span className="mono text-n-500 text-[12px]">{cert.date}</span>

        {/* Tautan "Verify" HANYA muncul kalau URL-nya memang ada — tombol
            verifikasi yang tidak bisa dibuktikan lebih buruk daripada tidak ada. */}
        {cert.credentialUrl ? (
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mono text-ink-muted hover:text-ink focus-visible:ring-ring rounded-sm text-[12px] tracking-[0.08em] uppercase outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            Verify
            <span aria-hidden="true">&nbsp;→</span>
          </a>
        ) : null}
      </div>
    </li>
  );
}

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

        <div className="mt-12 space-y-12">
          {certificationCategories.map((category) => {
            const items = sorted.filter((cert) => cert.category === category);
            if (items.length === 0) return null;

            return (
              <section key={category}>
                <h2 className="mono text-n-500 text-[11px] tracking-[0.16em] uppercase">
                  {category}
                </h2>

                <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((cert) => (
                    <CertificationCard key={cert.name} cert={cert} />
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </Section>
    </main>
  );
}
