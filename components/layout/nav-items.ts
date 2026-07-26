import {
  Award,
  Braces,
  BriefcaseBusiness,
  FolderGit2,
  GraduationCap,
  Home,
  type LucideIcon,
  User,
  Users,
} from "lucide-react";

/**
 * Item navigasi sidebar — struktur baru (keputusan Lintang 2026-07-26).
 *
 * Setiap bagian portfolio kini punya **halaman detailnya sendiri**, bukan sekadar
 * anchor ke section di beranda. Beranda berubah jadi ringkasan bernomor yang
 * mengantar ke halaman-halaman ini.
 *
 * Ikon memakai `lucide-react` (sudah terpasang sejak shadcn init di S1).
 */

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export type NavGroup = {
  /** `null` = grup pertama, tanpa judul. */
  title: string | null;
  items: NavItem[];
};

export const navGroups: NavGroup[] = [
  {
    title: null,
    items: [
      { label: "Home", href: "/home", icon: Home },
      { label: "About", href: "/about", icon: User },
      { label: "Collabs", href: "/collabs", icon: Users },
      // Blog & Log SEMENTARA disembunyikan dari nav (keputusan Lintang
      // 2026-07-27) sampai isinya jelas. Rutenya sengaja TIDAK dihapus —
      // `/blog` & `/log` masih hidup dan masih di sitemap, hanya tidak
      // dipajang. Kembalikan barisnya di sini untuk menampilkannya lagi:
      //   { label: "Blog", href: "/blog", icon: FileText },
      //   { label: "Log", href: "/log", icon: Handshake },
    ],
  },
  {
    title: "Portfolio",
    items: [
      { label: "Projects", href: "/projects", icon: FolderGit2 },
      { label: "Experience", href: "/experience", icon: BriefcaseBusiness },
      { label: "Stack", href: "/stack", icon: Braces },
      { label: "Certifications", href: "/certifications", icon: Award },
      { label: "Education", href: "/education", icon: GraduationCap },
    ],
  },
];

/** Datar — dipakai untuk menentukan item aktif. */
export const allNavItems = navGroups.flatMap((group) => group.items);
