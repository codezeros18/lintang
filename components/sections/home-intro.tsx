import Image from "next/image";
import Link from "next/link";

import { CountUp } from "@/components/motion/count-up";
import { SmoothLink } from "@/components/layout/smooth-link";
import { CONFIG, CONTACT, isSet } from "@/content/config";
import { getHookStats } from "@/content/hook-stats";

/**
 * HomeIntro — konten splash `/`: foto + bio dengan tautan inline + strip angka.
 *
 * Bio ditulis mengikuti gaya leerob.com: tautan diselipkan LANGSUNG di dalam
 * kalimat dan digarisbawahi, bukan dikumpulkan jadi baris ikon terpisah.
 * Ditutup satu tautan **"Know me more →"** yang membawa pembaca ke `/home` —
 * "portfolio lengkap" bersidebar (keputusan Lintang 2026-07-26). Splash ini
 * sendiri TIDAK memakai sidebar; lihat `app/page.tsx` vs `app/(portfolio)/`.
 *
 * Navigasi ke `/home` memakai `SmoothLink` (cross-fade via View Transition API,
 * dipicu klik — aman untuk LCP karena tidak menyentuh render server).
 *
 * Layout foto:teks tetap 50:50 (`grid-cols-2`), tanpa bingkai/border di foto.
 * Ukuran teks: 15px bio, 18px angka strip, 11px label strip, judul Geist Pixel
 * `--step-2`.
 *
 * Juga dipakai di puncak `/home` (dengan `showKnowMore={false}`) — Lintang
 * meminta foto+headline+KPI ini TIDAK hilang dari `/home`, supaya orang yang
 * mendarat langsung di sana (mis. lewat sidebar) tetap melihatnya, bukan cuma
 * pengunjung yang datang dari splash `/`.
 *
 * Tanpa komponen motion — ini konten atas-lipatan (aturan R2).
 */

function InlineLink({
  href,
  external,
  download,
  children,
}: {
  href: string;
  external?: boolean;
  download?: boolean;
  children: React.ReactNode;
}) {
  const className =
    "text-ink decoration-border hover:decoration-ink underline underline-offset-4";

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }
  if (download) {
    return (
      <a href={href} download className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function HomeIntro({
  showKnowMore = true,
}: {
  /** `false` di `/home` — tautannya tidak masuk akal menunjuk ke halaman sendiri. */
  showKnowMore?: boolean;
}) {
  const stats = getHookStats();
  const photo = CONFIG.PHOTO_FILE;

  return (
    <section id="top">
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
              I&rsquo;m a{" "}
              <InlineLink href="/experience">full-stack engineer</InlineLink>{" "}
              and informatics student at UMN. I build systems real businesses
              run on — offline-first operations, multi-tenant SaaS, and live
              payments — starting with{" "}
              <InlineLink href="/projects/ankop-trace">Ankop Trace</InlineLink>
              , then prove their impact with data.
            </p>
            <p className="text-ink-muted">
              You can find my code on{" "}
              <InlineLink href={CONTACT.github} external>
                GitHub
              </InlineLink>
              {isSet(CONFIG.LINKEDIN_URL) ? (
                <>
                  , connect on{" "}
                  <InlineLink href={CONFIG.LINKEDIN_URL} external>
                    LinkedIn
                  </InlineLink>
                </>
              ) : null}
              , or reach me by{" "}
              <InlineLink href={`mailto:${CONTACT.email}`}>email</InlineLink>.
              {isSet(CONFIG.CV_FILE) ? (
                <>
                  {" "}
                  Want the full picture? Here&rsquo;s my{" "}
                  <InlineLink href={`/cv/${CONFIG.CV_FILE}`} download>
                    CV
                  </InlineLink>
                  .
                </>
              ) : null}
            </p>
          </div>

          {/* Pintu masuk ke /home (portfolio lengkap bersidebar) — bukan tombol,
              melainkan tautan yang menyatu dengan nada bio: santai, digarisbawahi,
              dengan panah yang "meloncat" pelan saat di-hover (bukan makna
              fungsional, murni sentuhan playful sesuai permintaan Lintang).
              Disembunyikan di /home sendiri — menunjuk ke halaman yang sedang
              dibuka tidak ada gunanya. */}
          {showKnowMore ? (
            <SmoothLink
              href="/home"
              className="group text-ink decoration-border hover:decoration-ink mt-6 inline-flex items-center gap-1 text-[15px] italic underline underline-offset-4"
            >
              Know me more
              <span
                aria-hidden="true"
                className="not-italic transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </SmoothLink>
          ) : null}
        </div>
      </div>

      {/* Strip angka — tanpa garis pembagi antar item; angka 18px, label 11px. */}
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
