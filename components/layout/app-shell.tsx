import { Sidebar } from "@/components/layout/sidebar";

/**
 * AppShell — kerangka `[sidebar | content]` (`SPRINTS_PHASE2_REDESIGN.md` R1).
 *
 * Di ≥768px sidebar jadi kolom grid selebar `--sidebar-w`; di bawahnya sidebar
 * berubah jadi top bar + drawer, dan halaman kembali satu kolom penuh.
 *
 * `min-w-0` pada kolom konten wajib: tanpa itu, isi yang lebar (tabel/kode)
 * memaksa kolom grid melebar dan memunculkan scroll horizontal di layar kecil.
 *
 * Ritme vertikal (`py-20 md:py-28`) dan lebar `--maxw` tetap dipegang
 * `Section`/`Container` di tiap halaman, bukan di shell — supaya halaman yang
 * butuh ritme berbeda (mis. artikel case study) tidak perlu melawan shell.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="md:grid md:grid-cols-[var(--sidebar-w)_1fr] md:items-start">
      <Sidebar />
      <div className="min-w-0">{children}</div>
    </div>
  );
}
