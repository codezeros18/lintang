/**
 * Item navigasi — struktur baru tanpa sidebar (keputusan Lintang 2026-07-27).
 *
 * Navigasinya kini **index bernomor sticky** di puncak halaman. Angkanya bukan
 * hiasan: `indexItems` sengaja **persis mengikuti penomoran blok di `/home`**
 * (01 experience, 02 projects, 03 certifications, 04 education, 05 collabs),
 * jadi "03" di header dan "03 — certifications" di beranda selalu menunjuk hal
 * yang sama.
 *
 * Karena itu **Stack tidak diberi nomor**: di beranda ia memang menempel di
 * bawah projects, bukan blok bernomor sendiri (permintaan Lintang 2026-07-26).
 * Ia dan About masuk `utilityItems` — kelompok kedua tanpa angka. Beranda
 * sendiri dicapai lewat wordmark, jadi tidak perlu item nav.
 *
 * Ikon `lucide-react` masih dipakai oleh menu mobile.
 */

import {
  Award,
  Braces,
  BriefcaseBusiness,
  FolderGit2,
  GraduationCap,
  type LucideIcon,
  User,
  Users,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

/** Bernomor — urutannya = urutan blok di `/home`. */
export const indexItems: NavItem[] = [
  { label: "experience", href: "/experience", icon: BriefcaseBusiness },
  { label: "projects", href: "/projects", icon: FolderGit2 },
  { label: "certifications", href: "/certifications", icon: Award },
  { label: "education", href: "/education", icon: GraduationCap },
  { label: "collabs", href: "/collabs", icon: Users },
];

/** Tanpa nomor — tidak punya blok bernomor sendiri di beranda. */
export const utilityItems: NavItem[] = [
  { label: "about", href: "/about", icon: User },
  { label: "stack", href: "/stack", icon: Braces },
];

// Blog & Log SEMENTARA disembunyikan (keputusan Lintang 2026-07-27) sampai
// isinya jelas. Rutenya sengaja TIDAK dihapus — `/blog` & `/log` masih hidup
// dan masih di sitemap, hanya tidak dipajang. Kembalikan ke `utilityItems`
// untuk menampilkannya lagi:
//   { label: "blog", href: "/blog", icon: FileText },
//   { label: "log", href: "/log", icon: Handshake },

/** Datar — dipakai untuk menentukan item aktif. */
export const allNavItems = [...indexItems, ...utilityItems];

/** Nomor urut yang ditampilkan di index ("01", "02", …). */
export function indexLabel(position: number) {
  return String(position + 1).padStart(2, "0");
}
