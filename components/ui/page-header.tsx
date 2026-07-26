import { cn } from "@/lib/utils";

/**
 * PageHeader — kepala halaman detail (Projects, Experience, Stack, dst).
 *
 * SENGAJA tidak dibungkus `Reveal`: ia selalu berada di atas lipatan, dan aturan
 * R2 melarang `opacity:0` di sana.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <header className={cn("max-w-3xl", className)}>
      <p className="mono text-n-500 text-[11px] tracking-[0.16em] uppercase">
        {eyebrow}
      </p>
      <h1 className="mt-3 text-(length:--step-2) leading-tight font-semibold">
        {title}
      </h1>
      {description ? (
        <p className="text-ink-muted mt-4 leading-relaxed">{description}</p>
      ) : null}
    </header>
  );
}
