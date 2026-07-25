import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

/**
 * About — naskah ±120 kata PORTFOLIO_BLUEPRINT.md §4.3, diterjemahkan ke Inggris
 * tanpa mengubah fakta, ditutup micro-copy anti-salah-baca §4.6.
 *
 * Di sinilah kredensial data muncul (Associate Data Scientist BNSP) — bukan di hero,
 * supaya positioning full-stack tidak kabur (§1).
 */
export function About() {
  return (
    <Section id="about">
      <Reveal>
        <SectionHeading
          eyebrow="About"
          title="Build what people use, then prove it works."
        />
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mt-10 max-w-3xl space-y-6 text-(length:--step-0) leading-relaxed">
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
            that tracks 5,000+ kg and digitizes supplier payments; Bisasinema — a
            learning-and-ticketing platform with live Midtrans payments (Rp20M+
            in early sales); and Tera — a multi-tenant SaaS with layered data
            isolation.
          </p>
          <p>
            Then I prove the impact with data — decision dashboards for
            leadership, and analysis that placed nationally. The through line:{" "}
            <strong className="font-semibold">
              build what people use, then prove it works with data.
            </strong>
          </p>
        </div>
      </Reveal>

      {/* Micro-copy anti-salah-baca — §4.6 */}
      <Reveal delay={0.1}>
        <p className="bg-secondary/60 border-l-indigo-brand mt-10 max-w-2xl border-l-[3px] px-5 py-4 text-(length:--step-0) leading-relaxed">
          My focus is full-stack engineering; the data side is a{" "}
          <strong className="font-semibold">
            differentiator, not a distraction
          </strong>{" "}
          — I build the system, then read what it tells me.
        </p>
      </Reveal>
    </Section>
  );
}
