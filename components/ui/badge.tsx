import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Dipakai untuk tech chip, label kejujuran proyek ("produksi", "hackathon", ...),
// dan badge hasil di Log. Coral HEMAT (§3.2): hanya untuk satu penanda menonjol.
const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs leading-none font-medium whitespace-nowrap",
  {
    variants: {
      tone: {
        neutral: "border-border bg-secondary text-ink-muted",
        accent:
          "border-transparent bg-[color-mix(in_oklab,var(--indigo),transparent_88%)] text-[color-mix(in_oklab,var(--indigo),black_18%)]",
        coral:
          "border-transparent bg-[color-mix(in_oklab,var(--coral),transparent_88%)] text-[color-mix(in_oklab,var(--coral),black_28%)]",
        outline: "border-border bg-transparent text-ink-muted",
      },
      /** Tech chip & angka memakai Space Mono (§3.1). */
      mono: {
        true: "font-mono tracking-tight",
        false: "",
      },
    },
    defaultVariants: {
      tone: "neutral",
      mono: false,
    },
  },
);

export type BadgeProps = React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants>;

export function Badge({ className, tone, mono, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ tone, mono }), className)} {...props} />
  );
}

export { badgeVariants };
