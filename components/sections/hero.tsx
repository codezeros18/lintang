import Link from "next/link";

import { CountUp } from "@/components/motion/count-up";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { CONFIG, isSet } from "@/content/config";
import { getHookStats } from "@/content/hook-stats";

/**
 * Hero — naskah PORTFOLIO_BLUEPRINT.md §4.1, diterjemahkan ke Inggris tanpa mengubah
 * satu pun fakta atau angka.
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
    // `id="top"` dipakai item nav "Home" + scroll-spy (R1).
    // Padding atas lebih kecil di mobile karena top bar sticky (`--topbar-h`)
    // sudah memakan ruang; di ≥768px sidebar menggantikannya sehingga hero
    // boleh bernapas lebih lega.
    <section id="top" className="pt-12 pb-20 md:pt-20 md:pb-28">
      <Container>
        <p className="mono text-ink-muted text-xs tracking-[0.14em] uppercase sm:text-sm">
          Full-Stack Engineer · Informatics, UMN
        </p>

        <h1 className="mt-5 max-w-4xl text-(length:--step-4) leading-[1.05] font-semibold text-balance">
          I build systems real businesses run on — and prove their impact with
          data.
        </h1>

        <p className="text-ink-muted mt-6 max-w-2xl text-(length:--step-1) leading-relaxed">
          An informatics student at UMN who has already shipped production
          systems — live payments, offline-first, multi-tenant — that move real
          money and real goods.
        </p>

        {/*
          "Pintu cerita" (R2) — satu kalimat yang mengubah hero dari banner jadi
          undangan membaca, plus satu tautan konkret ke case study utama.
          Tautannya ke halaman yang BENAR-BENAR ada (`/projects/ankop-trace`),
          bukan janji kosong.
        */}
        <p className="mt-8 max-w-2xl text-(length:--step-0) leading-relaxed">
          Every project here has a story — from the problem to the proof.{" "}
          <Link
            href="/projects/ankop-trace"
            className="text-ink decoration-border hover:text-coral-ink hover:decoration-coral-ink font-medium underline underline-offset-4"
          >
            Start with Ankop Trace
            {/* Panah ikut di dalam tautan supaya tidak pernah terpisah ke baris
                lain; `aria-hidden` agar screen reader tidak membacanya. */}
            <span aria-hidden="true">&nbsp;→</span>
          </Link>
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
            View projects
          </Button>

          {/*
            Tombol kedua: Download CV. Fallback dipertahankan — kalau `CV_FILE`
            dikosongkan, slotnya diisi CTA "Get in touch" alih-alih tombol mati.
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
                Get in touch
              </Button>
            </>
          ) : (
            <Button href="#contact" variant="secondary" size="lg">
              Get in touch
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
}
