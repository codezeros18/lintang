/**
 * Item navigasi — IA fase 2 (`SPRINTS_PHASE2_REDESIGN.md` R1).
 *
 * Dua jenis item:
 * - `sectionId` → anchor ke section di halaman utama; dipakai scroll-spy.
 * - `href`      → rute tersendiri.
 *
 * `pending: true` = rutenya BELUM dibangun (Blog = R4, Collabs = R5). Item seperti ini
 * dirender sebagai teks non-link bertanda "soon", **bukan tautan ke 404** — aturan
 * "tidak ada link mati" (BLUEPRINT §9) tetap berlaku di fase 2.
 */

export type NavItem = {
  label: string;
  /** Id section di halaman utama. */
  sectionId?: string;
  /** Rute mandiri. */
  href?: string;
  /** Rutenya belum ada → render non-link. */
  pending?: boolean;
};

export const navItems: NavItem[] = [
  { label: "Home", sectionId: "top" },
  { label: "Projects", sectionId: "projects" },
  { label: "About", sectionId: "about" },
  { label: "Blog", href: "/blog" }, // rutenya dibangun di R4
  { label: "Collabs", href: "/collabs" }, // rutenya dibangun di R5
  { label: "Contact", sectionId: "contact" },
];

/** Id section yang diamati scroll-spy, sesuai urutan di halaman. */
export const sectionIds = navItems
  .filter((item) => item.sectionId)
  .map((item) => item.sectionId as string);

/**
 * Anchor section berlaku lintas halaman: di `/` cukup `#id`, di halaman lain
 * harus `/#id` supaya tetap membawa pengunjung kembali ke beranda.
 */
export function sectionHref(sectionId: string, pathname: string): string {
  return pathname === "/" ? `#${sectionId}` : `/#${sectionId}`;
}
