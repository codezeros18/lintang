import Image from "next/image";
import Link from "next/link";

import { CountUp } from "@/components/motion/count-up";
import { CONFIG, CONTACT, isSet } from "@/content/config";
import { getHookStats } from "@/content/hook-stats";

/**
 * HomeIntro — pembuka beranda: foto + perkenalan singkat + strip angka.
 *
 * Layout foto:teks dibagi **50:50** lewat `grid-cols-2` (keputusan Lintang).
 * Ukuran teks: 15px untuk paragraf, judul memakai Geist Pixel `--step-2`,
 * angka strip 18px, label strip 11px.
 *
 * Foto TIDAK dibingkai kotak/border — background-nya sudah transparan, dan
 * jaraknya ke teks dibuat rapat (bukan lebar seperti versi sebelumnya).
 *
 * Fotonya adalah elemen LCP halaman ini, jadi memakai `next/image` dengan
 * `priority` + `sizes` supaya browser memuatnya lebih awal dan mengunduh ukuran
 * yang tepat. `width`/`height` diisi dimensi asli foto (500×500) agar tidak ada CLS.
 *
 * Tanpa komponen motion — ini konten atas-lipatan (aturan R2).
 */
export function HomeIntro() {
  const stats = getHookStats();
  const photo = CONFIG.PHOTO_FILE;

  return (
    <section id="top" className="pt-10 pb-12 md:pt-14">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center sm:gap-5">
        {isSet(photo) ? (
          <div className="order-first sm:order-0">
            {/* Tanpa border/bg-card di sekeliling foto — fotonya sendiri sudah
                transparan (background dihapus), jadi tidak butuh bingkai kotak. */}
            <Image
              src={`/images/${photo}`}
              alt="Lintang Balakosa Ardhana"
              width={500}
              height={500}
              priority
              sizes="(max-width: 640px) 224px, 320px"
              className="aspect-square w-full max-w-56 object-contain sm:max-w-80"
            />
          </div>
        ) : null}

        <div className="min-w-0">
          <p className="mono text-n-500 text-[11px] tracking-[0.16em] uppercase">
            Full-Stack Engineer · Informatics, UMN
          </p>

          <h1 className="pixel text-ink mt-4 text-(length:--step-2) leading-none">
            Lintang Balakosa Ardhana
          </h1>

          <div className="mt-6 max-w-2xl space-y-4 text-[15px] leading-relaxed">
            <p>
              I&rsquo;m a full-stack engineer. I build systems real businesses
              run on — offline-first operations, multi-tenant SaaS, and live
              payments — and then prove their impact with data.
            </p>
            <p className="text-ink-muted">
              Right now I&rsquo;m shipping production software while finishing my
              informatics degree. Every project here has a story, from the
              problem to the proof.
            </p>
          </div>

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
        </div>
      </div>

      {/* Strip angka — tanpa garis pembagi antar item (keputusan Lintang);
          angka 18px, label 11px, keduanya Geist Mono. */}
      <dl className="border-border mt-8 grid grid-cols-1 gap-6 border-t pt-6 sm:grid-cols-3 sm:gap-8">
        {stats.map((stat) => (
          <div key={stat.label}>
            <dt className="sr-only">{stat.label}</dt>
            <dd>
              <CountUp
                to={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                className="text-ink block text-[18px] leading-none font-medium"
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
