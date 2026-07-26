import Link from "next/link";

import { CountUp } from "@/components/motion/count-up";
import { CONFIG, CONTACT, isSet } from "@/content/config";
import { getHookStats } from "@/content/hook-stats";

/**
 * HomeIntro — pembuka beranda.
 *
 * Menggantikan hero lama yang headline-nya memakai `--step-4` (sampai 4.6rem) dan
 * terasa terlalu besar. Sekarang: nama dalam Geist Pixel, dua paragraf pendek, baris
 * tautan, lalu strip angka. Isi naskahnya tetap fakta yang sama (BLUEPRINT §4.1).
 *
 * Tanpa komponen motion — ini konten atas-lipatan, aturan R2 berlaku.
 */
export function HomeIntro() {
  const stats = getHookStats();

  return (
    <section id="top" className="pt-10 pb-12 md:pt-14">
      <p className="mono text-n-500 text-[11px] tracking-[0.16em] uppercase">
        Full-Stack Engineer · Informatics, UMN
      </p>

      <h1 className="pixel text-ink mt-4 text-(length:--step-2) leading-none">
        Lintang Balakosa Ardhana
      </h1>

      <div className="mt-6 max-w-2xl space-y-4 leading-relaxed">
        <p>
          I&rsquo;m a full-stack engineer. I build systems real businesses run on
          — offline-first operations, multi-tenant SaaS, and live payments — and
          then prove their impact with data.
        </p>
        <p className="text-ink-muted">
          Right now I&rsquo;m shipping production software while finishing my
          informatics degree. Every project here has a story, from the problem to
          the proof.
        </p>
      </div>

      {/* Baris tautan ringkas — mono, sejajar seperti daftar. */}
      <div className="mono text-ink-muted mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px]">
        <a
          href={CONTACT.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-ink focus-visible:ring-ring rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        >
          github <span aria-hidden="true">↗</span>
        </a>
        {isSet(CONFIG.LINKEDIN_URL) ? (
          <a
            href={CONFIG.LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink focus-visible:ring-ring rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            linkedin <span aria-hidden="true">↗</span>
          </a>
        ) : null}
        <a
          href={`mailto:${CONTACT.email}`}
          className="hover:text-ink focus-visible:ring-ring rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        >
          email
        </a>
        {isSet(CONFIG.CV_FILE) ? (
          <a
            href={`/cv/${CONFIG.CV_FILE}`}
            download
            className="hover:text-ink focus-visible:ring-ring rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            cv <span aria-hidden="true">↓</span>
          </a>
        ) : null}
        <Link
          href="/projects/ankop-trace"
          className="hover:text-ink focus-visible:ring-ring rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        >
          start with ankop trace <span aria-hidden="true">→</span>
        </Link>
      </div>

      {/* Strip angka — dibagi garis, angka pakai Geist Mono. */}
      <dl className="border-border mt-10 grid grid-cols-1 gap-6 border-t pt-8 sm:grid-cols-3 sm:gap-0">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={
              index > 0 ? "sm:border-border sm:border-l sm:pl-6" : "sm:pr-6"
            }
          >
            <dt className="sr-only">{stat.label}</dt>
            <dd>
              <CountUp
                to={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                className="text-ink block text-(length:--step-1) leading-none font-medium"
              />
              <span className="mono text-n-500 mt-2 block text-[11px] tracking-[0.12em] uppercase">
                {stat.label}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
