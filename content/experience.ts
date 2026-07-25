/**
 * Experience · Achievements · Certifications.
 *
 * ⚠️ CATATAN SUMBER — penting.
 * File CV tidak ada di repo ini, dan `PORTFOLIO_BLUEPRINT.md` (satu-satunya sumber
 * kebenaran yang tersedia) hanya memuat sebagian data S5:
 *
 *   Ada di BLUEPRINT  : Ankop (role + Jun 2026), Bisasinema (role + Mar 2026),
 *                       Bank Sampah Digital (§5.3), 3 medali (§0.2),
 *                       BNSP "Associate Data Scientist (Competent)" (§0.2),
 *                       "Data Science Bootcamp (Excellent Graduate)" (§0.2),
 *                       "magang frontend di lingkungan produksi sejak 2023" (§4.3).
 *   TIDAK ada         : role & periode persis di PT Anugrah Energi, penerbit/nama
 *                       sertifikat Coursera, periode Bank Sampah, dan seluruh org roles.
 *
 * Yang tidak ada sumbernya TIDAK dikarang: field-nya `null` + `// TODO(lintang)`,
 * dan UI menyembunyikan elemennya (§9).
 */

export type WorkItem = {
  org: string;
  role: string;
  /** `null` = periode belum dipastikan → tidak ditampilkan. */
  period: string | null;
  /** Ringkas 1–2 baris. Hindari skill-dump. */
  summary: string;
  /** Tautkan ke case study bila proyeknya sudah punya halaman sendiri. */
  projectSlug?: string;
  order: number;
};

export type Achievement = {
  medal: string;
  title: string;
  scope: string;
  /** `null` = tanggal/tahun belum dipastikan. */
  year: string | null;
  /** Bila prestasinya sudah diceritakan sebagai case study, tunjuk ke sana
   *  alih-alih menceritakan ulang (anti double-count, §5.2). */
  projectSlug?: string;
  order: number;
};

export type Certification = {
  name: string;
  /** `null` = penerbit belum dipastikan → tidak ditampilkan. */
  issuer: string | null;
  note?: string;
  order: number;
};

export const workItems: WorkItem[] = [
  {
    org: "Ankop Trace",
    role: "Full-Stack Software Engineer",
    period: "Jun 2026–sekarang",
    summary:
      "Membangun sistem operasional kopi offline-first, dari intake sampai pembayaran supplier.",
    projectSlug: "ankop-trace",
    order: 1,
  },
  {
    org: "Bisasinema",
    role: "Tech Lead & Assistant Product Manager",
    period: "Mar 2026–sekarang",
    summary:
      "Membangun platform belajar-dan-tiket dengan pembayaran live dan dashboard monitoring internal.",
    projectSlug: "bisasinema",
    order: 2,
  },
  {
    org: "Bank Sampah Digital",
    role: "Data Analyst (virtual internship)",
    period: null, // TODO(lintang): periode virtual internship Bank Sampah Digital
    summary:
      "Menyiapkan data operasional dan membangun dashboard keputusan untuk CEO.",
    order: 3,
  },
  {
    org: "PT Anugrah Energi",
    // TODO(lintang): konfirmasi judul role persis di CV. BLUEPRINT §4.3 hanya menyebut
    // "magang frontend di lingkungan produksi sejak 2023" tanpa menyebut nama perusahaan;
    // nama PT Anugrah Energi berasal dari EXECUTION_PROMPTS.md.
    role: "Frontend Developer (magang)",
    period: null, // TODO(lintang): periode magang (BLUEPRINT hanya menyebut "sejak 2023")
    summary:
      "Magang frontend di lingkungan produksi — pengalaman kerja pertama di luar proyek kelas.",
    order: 4,
  },
];

export const achievements: Achievement[] = [
  {
    medal: "🥇",
    title: "Juara 1 Nasional — I/O Festival",
    scope: "Kompetisi nasional",
    year: null, // TODO(lintang): tanggal/tahun I/O Festival (token IO_FESTIVAL_DATE)
    order: 1,
  },
  {
    medal: "🥉",
    title: "Juara 3 Nasional — SurabayaDev",
    scope: "Kompetisi nasional",
    year: "2025",
    // Prestasinya sudah diceritakan penuh sebagai case study Analisis Pembatalan Hotel.
    projectSlug: "analisis-pembatalan-hotel",
    order: 2,
  },
  {
    medal: "🥈",
    title: "Juara 2 — Internal CIMB Niaga",
    scope: "Kompetisi internal",
    year: null, // TODO(lintang): tahun kompetisi internal CIMB Niaga
    order: 3,
  },
];

export const certifications: Certification[] = [
  {
    name: "Associate Data Scientist (Competent)",
    issuer: "BNSP",
    order: 1,
  },
  {
    name: "Data Science Bootcamp (Excellent Graduate)",
    // Nama penerbit "Digital Skola" disebut di EXECUTION_PROMPTS.md, bukan di BLUEPRINT.
    issuer: "Digital Skola",
    order: 2,
  },
  // TODO(lintang): sertifikat Coursera — nama kursus & penerbitnya tidak ada di BLUEPRINT
  // maupun di repo ini, jadi sengaja tidak ditulis. Kirim datanya dan saya tambahkan.
];

// TODO(lintang): organizational roles (§S5 "org roles = ringkas 1 baris").
// Tidak ada satu pun data organisasi di BLUEPRINT, jadi tidak ada yang bisa ditulis
// tanpa mengarang. Kirim daftarnya bila memang mau ditampilkan.
export const organizationRoles: { org: string; role: string }[] = [];
