import { cn } from "@/lib/utils";

/**
 * PageHeader — kepala halaman, dipakai SERAGAM di semua rute detail.
 *
 * Bentuknya diubah 2026-07-27 (keputusan Lintang): judul cukup **nama halaman
 * huruf kecil** dalam Geist Pixel 24px, lalu satu paragraf deskripsi 15px —
 * tidak ada lagi eyebrow + kalimat judul terpisah, karena itu membuat tiga
 * tingkat teks untuk informasi yang sebenarnya cuma dua.
 *
 * SENGAJA tidak dibungkus `Reveal`: selalu berada di atas lipatan, dan aturan
 * R2 melarang `opacity:0` di sana.
 */
export function PageHeader({
  title,
  description,
  className,
  as: Heading = "h1",
}: {
  /** Nama halaman, huruf kecil — mis. `experience`, `certifications`. */
  title: string;
  description?: string;
  className?: string;
  /** `h2` untuk sub-section, supaya urutan heading tetap benar (a11y). */
  as?: "h1" | "h2";
}) {
  return (
    <header className={cn("max-w-3xl", className)}>
      <Heading className="pixel text-ink text-[24px] leading-none">
        {title}
      </Heading>
      {description ? (
        <p className="text-ink-muted mt-6 text-[15px] leading-relaxed">
          {description}
        </p>
      ) : null}
    </header>
  );
}
