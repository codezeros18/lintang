import { CountUp } from "@/components/motion/count-up";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { CONFIG, isSet } from "@/content/config";
import { getHookStats } from "@/content/hook-stats";

/**
 * Hero — naskah PORTFOLIO_BLUEPRINT.md §4.1, dipakai persis.
 *
 * Identitas hero = **Full-Stack Engineer**. Tidak ada kata "hybrid" dan tidak ada
 * "Data Scientist" di sini (§1) — kredensial data muncul di About.
 *
 * Catatan performa (temuan S2): section ini SENGAJA tidak dibungkus `Reveal`/`Stagger`.
 * Framer Motion merender `opacity:0` di HTML server, jadi konten di atas lipatan baru
 * terlihat setelah hidrasi dan target LCP <2s jadi berisiko.
 */

export function Hero() {
  // Angka hook berasal dari `content/hook-stats.ts` — sumber yang sama dengan OG image.
  const stats = getHookStats();

  return (
    <section className="pt-16 pb-20 md:pt-24 md:pb-28">
      <Container>
        <p className="mono text-ink-muted text-xs tracking-[0.14em] uppercase sm:text-sm">
          Full-Stack Engineer · Informatika UMN
        </p>

        <h1 className="mt-5 max-w-4xl text-(length:--step-4) leading-[1.05] font-semibold text-balance">
          Saya membangun sistem yang dipakai bisnis nyata — dan membuktikan
          dampaknya lewat data.
        </h1>

        <p className="text-ink-muted mt-6 max-w-2xl text-(length:--step-1) leading-relaxed">
          Mahasiswa Informatika UMN yang sudah nge-ship sistem produksi — payment
          live, offline-first, multi-tenant — yang memindahkan uang dan barang
          nyata.
        </p>

        <dl className="border-border mt-10 grid gap-6 border-t pt-8 sm:grid-cols-3 sm:gap-8">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <CountUp
                  to={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  className="block text-(length:--step-2) leading-none font-bold"
                />
                <span className="text-ink-muted mt-2 block text-sm">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Button href="#projects" size="lg">
            Lihat proyek
          </Button>

          {/*
            Tombol kedua: Download CV. Fallback dipertahankan — kalau `CV_FILE`
            dikosongkan, slotnya diisi CTA "Hubungi" (§4.1 menyediakannya sebagai
            opsi) alih-alih tombol mati.
          */}
          {isSet(CONFIG.CV_FILE) ? (
            <>
              <Button
                href={`/cv/${CONFIG.CV_FILE}`}
                variant="secondary"
                size="lg"
                download
              >
                Download CV
              </Button>
              <Button href="#contact" variant="ghost" size="lg">
                Hubungi
              </Button>
            </>
          ) : (
            <Button href="#contact" variant="secondary" size="lg">
              Hubungi
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
}
