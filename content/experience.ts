/**
 * Experience · Education · Achievements · Certifications · Organisasi.
 *
 * SUMBER: CV `Lintang Balakosa Ardhana` (public/cv/Lintang-Balakosa-Ardhana-CV.pdf),
 * dibaca langsung pada 2026-07-26. Semua judul role, periode, penerbit, dan tanggal
 * di bawah ini disalin dari CV — tidak ada yang ditebak.
 *
 * Yang masih `null` = memang tidak ada di CV (mis. tahun I/O Festival & CIMB Niaga).
 */

export type WorkItem = {
  org: string;
  role: string;
  /** `null` = tidak ada di CV → tidak ditampilkan. */
  period: string | null;
  location: string | null;
  /** Ringkas 1–2 baris. Hindari skill-dump. */
  summary: string;
  /** Tautkan ke case study bila proyeknya punya halaman sendiri. */
  projectSlug?: string;
  order: number;
};

export type EducationItem = {
  school: string;
  program: string;
  period: string;
  note?: string;
  order: number;
};

export type Achievement = {
  medal: string;
  title: string;
  scope: string;
  /** `null` = tahun tidak tercantum di CV. */
  year: string | null;
  /** Satu baris konteks dari CV. */
  detail: string;
  /** Bila prestasinya sudah jadi case study, tunjuk ke sana alih-alih
   *  menceritakan ulang (anti double-count, §5.2). */
  projectSlug?: string;
  order: number;
};

export type Certification = {
  name: string;
  issuer: string;
  date: string;
  order: number;
};

export type OrganizationRole = {
  org: string;
  role: string;
  period: string;
  /** Satu baris saja — §S5 melarang skill-dump di bagian organisasi. */
  summary: string;
  order: number;
};

export const education: EducationItem[] = [
  {
    school: "Universitas Multimedia Nusantara",
    program: "B.Sc. Informatics",
    period: "Agu 2024–sekarang",
    note: "IPK 3.48",
    order: 1,
  },
  {
    school: "Digital Skola",
    program: "Data Science Bootcamp",
    period: "Jun 2025–Okt 2025",
    note: "Excellent Graduate",
    order: 2,
  },
  {
    school: "SMKN 4 Kota Tangerang",
    program: "Rekayasa Perangkat Lunak",
    period: "Jun 2021–Jul 2024",
    order: 3,
  },
];

export const workItems: WorkItem[] = [
  {
    org: "PT Anugrah Kopi Nusantara (Ankop)",
    role: "Full-Stack Software Engineer",
    period: "Jun 2026–sekarang",
    location: "Bandung",
    summary:
      "Membangun Ankop Trace, sistem operasional kopi offline-first yang memindahkan produsen kopi specialty sepenuhnya lepas dari kertas — dari intake ceri sampai pembayaran supplier dan laporan pemilik.",
    projectSlug: "ankop-trace",
    order: 1,
  },
  {
    org: "Bisasinema",
    role: "Tech Lead & Assistant Product Manager",
    period: "Mar 2026–sekarang",
    location: "Tangerang",
    summary:
      "Memimpin pembangunan platform produk pertama Bisasinema: kelas ala Coursera, tiket digital dengan pembayaran live, dashboard monitoring internal, dan technical SEO.",
    projectSlug: "bisasinema",
    order: 2,
  },
  {
    org: "Bank Sampah Digital",
    role: "Data Scientist Intern",
    period: "Jan 2026–Mar 2026",
    location: "Serang · virtual internship",
    summary:
      "Membangun dashboard monitoring untuk CEO dan menyiapkan datanya — dari eksplorasi, cleaning, penanganan anomali, sampai feature engineering.",
    order: 3,
  },
  {
    org: "PT Anugrah Energi Indonesia",
    role: "Frontend Developer",
    period: "Jun 2023–Okt 2023",
    location: "Tangerang · magang SMK",
    summary:
      "Magang SMK: membangun antarmuka web yang responsif dan scalable dengan React dan Tailwind CSS di lingkungan produksi.",
    order: 4,
  },
];

export const achievements: Achievement[] = [
  {
    medal: "🥇",
    title: "Juara 1 Nasional — I/O Festival",
    scope: "Kompetisi nasional",
    year: null, // Tahun tidak tercantum di CV. TODO(lintang): isi bila ingin ditampilkan.
    detail: "Membangun platform B2B untuk ekonomi sirkular.",
    order: 1,
  },
  {
    medal: "🥉",
    title: "Juara 3 Nasional — SurabayaDev Developer Battle 2025",
    scope: "Kompetisi analisis data nasional",
    year: "2025",
    detail:
      "Kompetisi analisis data nasional dengan fokus pola booking dan pembatalan hotel.",
    // Pekerjaannya sudah diceritakan penuh sebagai case study.
    projectSlug: "analisis-pembatalan-hotel",
    order: 2,
  },
  {
    medal: "🥈",
    title: "Juara 2 Internal — CIMB Niaga Pitching Day (UMN)",
    scope: "Kompetisi internal",
    year: null, // Tahun tidak tercantum di CV. TODO(lintang): isi bila ingin ditampilkan.
    detail:
      "Membangun aplikasi mobile pembukaan rekening digital yang berfungsi, memakai React Native dan Expo Go.",
    order: 3,
  },
];

export const certifications: Certification[] = [
  {
    name: "Associate Data Scientist (Competent)",
    issuer: "BNSP",
    date: "Jan 2026",
    order: 1,
  },
  {
    name: "Data Science Bootcamp (Excellent Graduate)",
    issuer: "Digital Skola",
    date: "Nov 2025",
    order: 2,
  },
  {
    name: "Exploratory Data Analysis for Machine Learning",
    issuer: "IBM (Coursera)",
    date: "Jan 2026",
    order: 3,
  },
  {
    name: "Supervised Machine Learning: Regression",
    issuer: "IBM (Coursera)",
    date: "Jan 2026",
    order: 4,
  },
  {
    name: "Data Science Capstone Project: Predicting Bicycle Rental",
    issuer: "University of London (Coursera)",
    date: "Jan 2025",
    order: 5,
  },
  {
    name: "Python for Data Science, AI & Development",
    issuer: "IBM (Coursera)",
    date: "Jan 2025",
    order: 6,
  },
];

export const organizationRoles: OrganizationRole[] = [
  {
    org: "UMN ECO",
    role: "Koordinator Divisi Website",
    period: "Jan 2026–sekarang",
    summary: "Memimpin pengembangan dan perawatan website organisasi.",
    order: 1,
  },
  {
    org: "Duta Anti Narkoba UMN",
    role: "Koordinator Divisi Website",
    period: "Des 2024–Nov 2025",
    summary:
      "Mengelola pengiriman website end-to-end, termasuk jadwal acara dan fitur ticketing.",
    order: 2,
  },
  {
    org: "STARLIGHT",
    role: "Anggota Divisi Website",
    period: "Okt 2024–Nov 2025",
    summary:
      "Membangun halaman divisi yang interaktif dengan fokus usability dan desain responsif.",
    order: 3,
  },
  {
    org: "AI Community",
    role: "Volunteer",
    period: "Mar 2025–Mei 2025",
    summary:
      "Membawakan demonstrasi dan sesi praktik AI di acara Open House untuk siswa dan orang tua.",
    order: 4,
  },
];
