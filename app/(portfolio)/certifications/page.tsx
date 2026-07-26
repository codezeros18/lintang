import { SiCoursera } from "react-icons/si";

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
 * Ikon penerbit dari `react-icons/si` (Simple Icons).
 *
 * Hanya Coursera yang tersedia di sana — IBM sudah ditarik dari Simple Icons,
 * dan BNSP/Digital Skola memang tidak ada. Untuk sertifikat Coursera, ikon
 * Coursera dipakai karena di situlah kredensialnya diverifikasi; penerbit
 * aslinya (IBM, University of London) tetap ditulis apa adanya di bawah judul.
 * Sisanya jatuh ke inisial huruf — bukan logo tiruan buatan sendiri.
 */
function issuerInitials(issuer: string) {
  return issuer
    .replace(/\(.*?\)/g, "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function IssuerMark({ issuer }: { issuer: string }) {
  return (
    <span
      aria-hidden="true"
      className="bg-secondary text-ink flex size-9 items-center justify-center rounded-full"
    >
      {/coursera/i.test(issuer) ? (
        <SiCoursera className="size-4" />
      ) : (
        <span className="mono text-[12px] font-medium">
          {issuerInitials(issuer)}
        </span>
      )}
    </span>
  );
}

function CertificationCard({ cert }: { cert: Certification }) {
  // Verifikasi bisa lewat halaman resmi penerbit ATAU foto sertifikatnya.
  // Kalau dua-duanya kosong, tautannya tidak dirender sama sekali.
  const verifyHref =
    cert.credentialUrl ??
    (cert.credentialImage ? `/images/${cert.credentialImage}` : null);
  const verifyIsExternal = Boolean(cert.credentialUrl);

  return (
    <li className="border-border bg-card hover:border-n-300 flex flex-col rounded-(--radius) border p-5 transition-colors">
      <IssuerMark issuer={cert.issuer} />

      <h3 className="text-ink mt-4 text-[15px] leading-snug font-medium">
        {cert.name}
      </h3>

      <p className="mono text-n-500 mt-2 text-[11px] tracking-[0.12em] uppercase">
        {cert.issuer}
      </p>

      <div className="border-border/70 mt-4 flex items-center justify-between gap-3 border-t pt-4">
        <span className="mono text-n-500 text-[12px]">{cert.date}</span>

        {verifyHref ? (
          <a
            href={verifyHref}
            target={verifyIsExternal ? "_blank" : undefined}
            rel={verifyIsExternal ? "noopener noreferrer" : undefined}
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
          title="certifications"
          description="Credentials across data science and machine learning — a BNSP professional certification, a bootcamp, and coursework from IBM and the University of London via Coursera."
        />

        <div className="mt-14 space-y-12">
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
