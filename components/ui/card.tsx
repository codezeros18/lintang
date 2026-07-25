import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const cardVariants = cva(
  "rounded-(--radius) border border-border bg-card text-ink",
  {
    variants: {
      elevation: {
        flat: "",
        soft: "shadow-(--shadow-soft)",
      },
      padding: {
        none: "",
        sm: "p-4",
        md: "p-6",
        lg: "p-6 md:p-8",
      },
    },
    defaultVariants: {
      elevation: "soft",
      padding: "md",
    },
  },
);

export type CardProps = React.ComponentProps<"div"> &
  VariantProps<typeof cardVariants>;

/**
 * Card — permukaan dasar (BLUEPRINT §3.2: `--card`, `--border`, `--radius`, `--shadow-soft`).
 * Efek hover-lift TIDAK dipasang di sini; itu tugas komponen motion supaya
 * `prefers-reduced-motion` tetap dihormati di satu tempat.
 */
export function Card({ className, elevation, padding, ...props }: CardProps) {
  return (
    <div
      className={cn(cardVariants({ elevation, padding }), className)}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      className={cn("text-(length:--step-1) leading-snug font-semibold", className)}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p className={cn("text-ink-muted leading-relaxed", className)} {...props} />
  );
}

export { cardVariants };
