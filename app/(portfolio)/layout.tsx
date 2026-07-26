import { AppShell } from "@/components/layout/app-shell";

/**
 * Layout untuk grup rute `(portfolio)` — semua halaman KECUALI splash `/`.
 *
 * Route group ini tidak mengubah URL (mis. `(portfolio)/projects` tetap
 * `/projects`), tapi memisahkan mana yang tampil dengan sidebar (`AppShell`)
 * dan mana yang tidak (splash `/`, lihat `app/page.tsx`).
 */
export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
