import { cn } from "@/lib/utils";

export type SectionHeadingProps = {
  /** Label kecil di atas judul (Space Mono, uppercase). Opsional. */
  eyebrow?: string;
  title: string;
  /** Satu kalimat penjelas di bawah judul. Opsional. */
  description?: string;
  /** Level heading — jaga urutan h1→h2→h3 demi a11y (§9). */
  as?: "h1" | "h2" | "h3";
  className?: string;
  /** Elemen tambahan di kanan (mis. link "lihat semua"). */
  action?: React.ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  as: Heading = "h2",
  className,
  action,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="mono text-ink-muted text-xs tracking-[0.14em] uppercase">
            {eyebrow}
          </p>
        ) : null}
        <Heading
          className={cn(
            "text-(length:--step-2) leading-tight font-semibold",
            eyebrow ? "mt-3" : undefined,
          )}
        >
          {title}
        </Heading>
        {description ? (
          <p className="text-ink-muted mt-4 leading-relaxed">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
