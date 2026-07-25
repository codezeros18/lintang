import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

/**
 * About — naskah ±120 kata PORTFOLIO_BLUEPRINT.md §4.3, dipakai persis,
 * ditutup micro-copy anti-salah-baca §4.6.
 *
 * Di sinilah kredensial data muncul (Associate Data Scientist BNSP) — bukan di hero,
 * supaya positioning full-stack tidak kabur (§1).
 */
export function About() {
  return (
    <Section id="about">
      <Reveal>
        <SectionHeading eyebrow="About" title="Bangun yang dipakai orang, lalu buktikan dampaknya." />
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mt-10 max-w-3xl space-y-6 text-(length:--step-0) leading-relaxed">
          <p>
            Saya Lintang Balakosa Ardhana, full-stack engineer dan mahasiswa
            Informatika UMN. Jalannya dimulai dari SMK RPL dan magang frontend di
            lingkungan produksi sejak 2023, lalu diperdalam lewat Data Science
            Bootcamp (Excellent Graduate) dan sertifikasi{" "}
            <strong className="font-semibold">
              Associate Data Scientist (BNSP)
            </strong>
            .
          </p>
          <p>
            Alih-alih berhenti di proyek kelas, saya membangun sistem yang
            dipakai orang: Ankop Trace — ops kopi offline-first yang melacak
            5.000+ kg dan mendigitalkan pembayaran supplier; Bisasinema —
            platform belajar-dan-tiket dengan pembayaran Midtrans live (Rp20jt+
            penjualan awal); dan Tera — SaaS multi-tenant dengan isolasi data
            berlapis.
          </p>
          <p>
            Lalu saya membuktikan dampaknya lewat data — dashboard keputusan
            untuk pimpinan, dan analisis yang membawa juara nasional. Benang
            merahnya:{" "}
            <strong className="font-semibold">
              bangun yang dipakai orang, lalu buktikan dampaknya lewat data.
            </strong>
          </p>
        </div>
      </Reveal>

      {/* Micro-copy anti-salah-baca — §4.6 */}
      <Reveal delay={0.1}>
        <p className="bg-secondary/60 mt-10 max-w-2xl border-l-indigo-brand border-l-[3px] px-5 py-4 text-(length:--step-0) leading-relaxed">
          Fokus saya full-stack engineering; kemampuan data adalah{" "}
          <strong className="font-semibold">pembeda, bukan pengalih</strong> —
          saya membangun sistemnya, lalu membaca datanya.
        </p>
      </Reveal>
    </Section>
  );
}
