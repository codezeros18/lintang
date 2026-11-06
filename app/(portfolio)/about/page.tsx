import { Section } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Lintang Balakosa Ardhana — full-stack engineer and informatics student at UMN, with an Associate Data Scientist (BNSP) certification.",
  path: "/about",
});

/**
 * /about — naskah ±120 kata BLUEPRINT §4.3 + micro-copy anti-salah-baca §4.6.
 *
 * Halaman ini WAJIB ada: §9 mensyaratkan About memuat kredensial BNSP dan
 * micro-copy "data = pembeda, bukan pengalih". Saat beranda diubah jadi ringkasan
 * bernomor, keduanya kehilangan tempat — jadi dipindah ke sini, bukan dihapus.
 */
export default function AboutPage() {
  return (
    <main id="main">
      <Section className="pt-12 pb-24 md:pt-16 md:pb-28">
        <PageHeader
          title="about"
          description="Full-stack engineer and informatics student at UMN — building systems people actually use, then proving the impact with data."
        />

        <div className="mt-10 max-w-3xl space-y-6 leading-relaxed">
          <p>
            I&rsquo;m Lintang Balakosa Ardhana, a full-stack engineer and
            informatics student at Universitas Multimedia Nusantara. The path
            started at a vocational software engineering school and a frontend
            internship in a production environment in 2023, then went deeper
            through a Data Science Bootcamp (Excellent Graduate) and the{" "}
            <strong className="font-semibold">
              Associate Data Scientist (BNSP)
            </strong>{" "}
            certification.
          </p>
          <p>
            Instead of stopping at classroom projects, I build systems people
            actually use: Ankop Trace — an offline-first coffee operations system
            that tracks 5,000+ kg and digitizes supplier payments; Bisasinema — one
            platform for four product lines with live payments (Rp30M+ in early
            ticket sales); Macacih Digital OS — a cross-channel ledger for a
            matcha brand; and, back at the company where I interned in 2023, a
            project and billing system for a boiler contractor.
          </p>
          <p>
            I also build my own products: Weigh to Go, a purchasing planner for
            institutional kitchens, and Muara, a revenue tracker for sellers on
            several marketplaces — each labelled honestly with how far it has
            actually got.
          </p>
          <p>
            Then I prove the impact with data — decision dashboards for
            leadership, and analysis that placed nationally. The through line:{" "}
            <strong className="font-semibold">
              build what people use, then prove it works with data.
            </strong>
          </p>
        </div>

        {/* Micro-copy anti-salah-baca — §4.6 */}
        <p className="bg-secondary border-border mt-10 max-w-2xl border-l-2 px-5 py-4 leading-relaxed">
          My focus is full-stack engineering; the data side is a{" "}
          <strong className="font-semibold">
            differentiator, not a distraction
          </strong>{" "}
          — I build the system, then read what it tells me.
        </p>
      </Section>
    </main>
  );
}
