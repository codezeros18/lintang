import { SiCoursera } from "react-icons/si";

import { Section } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { PhotoLink } from "@/components/ui/photo-gallery";
import {
  certificationCategories,
  certifications,
  type Certification,
} from "@/content/experience";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Certifications",
  description:
    "Certifications held by Lintang Balakosa Ardhana — BNSP Associate Data Scientist, a competition and an internship certificate, Digital Skola, and IBM/University of London via Coursera.",
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
    // Buang tanda kutip dsb. supaya `UPN "Veteran" Jawa Timur` jadi "UV",
    // bukan `U"`.
    .replace(/[^\p{L}\s]/gu, " ")
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
  // Dua jalur bukti, keduanya bergaya garis-bawah yang sama supaya seragam
  // dengan tautan di halaman lain (keputusan Lintang 2026-07-27):
  //   • "View"   → foto sertifikatnya, dibuka di modal.
  //   • "Verify" → halaman verifikasi resmi penerbit.
  // Yang datanya kosong tidak dirender — tidak ada tombol yang tak bisa
  // dibuktikan.
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
        {/* Tanggal tidak selalu tercantum di sertifikatnya (mis. CIMB Niaga
            Pitching Day) — kalau `null`, baris ini kosong, bukan menebak. */}
        <span className="mono text-n-500 text-[12px]">{cert.date ?? ""}</span>

        <div className="flex items-center gap-4">
          {cert.credentialImage ? (
            <PhotoLink
              photo={{
                src: cert.credentialImage,
                alt: `${cert.name} — ${cert.issuer}`,
              }}
            />
          ) : null}

          {cert.credentialUrl ? (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mono text-ink-muted decoration-border hover:text-ink hover:decoration-ink focus-visible:ring-ring rounded-sm text-[12px] underline underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            >
              Verify
            </a>
          ) : null}
        </div>
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
          description="A BNSP professional certification, competition certificates — placements and participation, labelled as they are — an internship certificate, a bootcamp, and coursework from IBM and the University of London via Coursera."
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
