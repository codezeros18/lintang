import { SiteFooter } from "@/components/layout/site-footer";
import { TopIndex } from "@/components/layout/top-index";

/**
 * AppShell — kerangka satu kolom rata tengah (keputusan Lintang 2026-07-27).
 *
 * Sebelumnya `[sidebar | content]`, yang membuat seluruh isi halaman terdorong
 * ke kanan sidebar dan tidak pernah benar-benar di tengah layar. Sidebar
 * diganti `TopIndex` (daftar isi bernomor yang sticky), sehingga `Container`
 * yang memang sudah `mx-auto` langsung memusatkan konten tanpa penyeimbang
 * buatan.
 *
 * Blok kontak yang dulu di kaki sidebar pindah ke `SiteFooter` — bukan hilang.
 *
 * `flex-1` pada konten + `min-h-dvh` pada pembungkus menjaga footer tetap di
 * bawah pada halaman pendek, alih-alih menggantung di tengah layar.
 *
 * Ritme vertikal dan lebar `--maxw` tetap dipegang `Section`/`Container` di
 * tiap halaman, bukan di shell.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <TopIndex />
      <div className="min-w-0 flex-1">{children}</div>
      <SiteFooter />
    </div>
  );
}
