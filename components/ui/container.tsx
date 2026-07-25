import { cn } from "@/lib/utils";

/**
 * Container — lebar maksimum situs (`--maxw`, BLUEPRINT §3.2) + padding horizontal
 * yang aman sampai layar 360px.
 */
export function Container({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-content px-5 sm:px-6", className)}
      {...props}
    />
  );
}

/**
 * Section — pembungkus section halaman dengan ritme vertikal `py-20 md:py-28`
 * (BLUEPRINT §3.3). `id` dipakai untuk anchor one-page (#projects, #about, ...).
 */
export function Section({
  className,
  containerClassName,
  children,
  ...props
}: React.ComponentProps<"section"> & { containerClassName?: string }) {
  return (
    <section className={cn("py-20 md:py-28", className)} {...props}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
