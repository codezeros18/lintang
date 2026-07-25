import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// BLUEPRINT §3.2 — coral dipakai HEMAT: hanya untuk aksen kecil (varian `link`),
// bukan sebagai warna tombol utama. Aksi utama memakai indigo.
const buttonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-(--radius)",
    "font-medium whitespace-nowrap select-none",
    "transition-[background-color,border-color,color,box-shadow,transform] duration-200",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
    "disabled:pointer-events-none disabled:opacity-50",
    "aria-disabled:pointer-events-none aria-disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-(--shadow-soft) hover:bg-[color-mix(in_oklab,var(--indigo),black_12%)] active:translate-y-px",
        secondary:
          "border border-border bg-card text-ink hover:bg-secondary active:translate-y-px",
        ghost: "text-ink-muted hover:bg-secondary hover:text-ink",
        link: "h-auto rounded-none px-0 text-ink underline decoration-border underline-offset-4 hover:text-coral-ink hover:decoration-coral-ink",
      },
      size: {
        sm: "h-9 px-3.5 text-sm",
        md: "h-11 px-5 text-sm sm:text-base",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonBaseProps = VariantProps<typeof buttonVariants> & {
  className?: string;
};

type ButtonAsButton = ButtonBaseProps &
  Omit<React.ComponentProps<"button">, "className"> & { href?: undefined };

type ButtonAsLink = ButtonBaseProps &
  Omit<React.ComponentProps<"a">, "className" | "href"> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Button — merender `<button>`, atau anchor bila `href` diberikan
 * (`next/link` untuk rute internal, `<a>` biasa untuk anchor/URL eksternal).
 *
 * Sengaja bukan client component: tanpa hook, jadi bisa dipakai di server component.
 * Kalau butuh `onClick`, panggil dari komponen client pembungkusnya.
 */
export function Button({ className, variant, size, ...props }: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);

  if (typeof props.href === "string") {
    const { href, ...rest } = props as ButtonAsLink;
    if (href.startsWith("/")) {
      return <Link href={href} className={classes} {...rest} />;
    }
    return <a href={href} className={classes} {...rest} />;
  }

  const { type = "button", ...rest } = props as ButtonAsButton;
  return <button type={type} className={classes} {...rest} />;
}

export { buttonVariants };
