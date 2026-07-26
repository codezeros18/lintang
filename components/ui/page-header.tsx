import { cn } from "@/lib/utils";

/**
 * PageHeader — kepala halaman detail, dipakai SERAGAM di semua halaman
 * (Projects, Experience, Stack, Certifications, Education, Blog, Collabs, Log).
 *
 * Bentuknya sengaja dibuat sesederhana mungkin: eyebrow mono kecil, judul,
 * lalu deskripsi — tanpa kartu/bingkai (keputusan Lintang 2026-07-27).
 *
 * SENGAJA tidak dibungkus `Reveal`: ia selalu berada di atas lipatan, dan aturan
 * R2 melarang `opacity:0` di sana.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  className,
  as: Heading = "h1",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
  /** `h2` untuk sub-section, supaya urutan heading tetap benar (a11y). */
  as?: "h1" | "h2";
}) {
  return (
    <header className={cn("max-w-3xl", className)}>
      <p className="mono text-n-500 text-[11px] tracking-[0.16em] uppercase">
        {eyebrow}
      </p>
      <Heading className="mt-3 text-(length:--step-2) leading-tight font-semibold">
        {title}
      </Heading>
      {description ? (
        <p className="text-ink-muted mt-4 text-[15px] leading-relaxed">
          {description}
        </p>
      ) : null}
    </header>
  );
}
