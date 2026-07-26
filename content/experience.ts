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
  /**
   * Pengelompokan di halaman `/certifications`. Ini label jenis kredensialnya —
   * diturunkan dari apa yang tertulis di CV (sertifikasi profesi vs bootcamp vs
   * kursus), bukan kategori karangan.
   */
  category: "Professional" | "Bootcamp" | "Coursework";
  /**
   * URL verifikasi resmi dari penerbit (mis. tautan kredensial Coursera).
   * `null` = tautan "Verify" TIDAK dirender — jangan pernah menampilkan tombol
   * verifikasi yang tidak bisa dibuktikan.
   */
  credentialUrl: string | null;
  /**
   * Alternatif bila penerbitnya tidak punya halaman verifikasi online:
   * foto/scan sertifikat di `public/images/certification_course/`.
   * Ditulis relatif dari `/images/`, mis. `certification_course/bnsp.jpg`.
   */
  credentialImage: string | null;
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
    period: "Aug 2024–present",
    note: "GPA 3.48",
    order: 1,
  },
  {
    school: "Digital Skola",
    program: "Data Science Bootcamp",
    period: "Jun 2025–Oct 2025",
    note: "Excellent Graduate",
    order: 2,
  },
  {
    school: "SMKN 4 Kota Tangerang",
    program: "Software Engineering",
    period: "Jun 2021–Jul 2024",
    order: 3,
  },
];

export const workItems: WorkItem[] = [
  {
    org: "PT Anugrah Kopi Nusantara (Ankop)",
    role: "Full-Stack Software Engineer",
    period: "Jun 2026–present",
    location: "Bandung",
    summary:
      "Built Ankop Trace, an offline-first coffee operations system that took a specialty coffee producer fully off paper — from cherry intake through supplier payments and owner reporting.",
    projectSlug: "ankop-trace",
    order: 1,
  },
  {
    org: "Bisasinema",
    role: "Tech Lead & Assistant Product Manager",
    period: "Mar 2026–present",
    location: "Tangerang",
    summary:
      "Led the build of Bisasinema's first product platform: Coursera-style classes, digital ticketing with live payments, an internal monitoring dashboard, and technical SEO.",
    projectSlug: "bisasinema",
    order: 2,
  },
  {
    org: "Bank Sampah Digital",
    role: "Data Scientist Intern",
    period: "Jan 2026–Mar 2026",
    location: "Serang · virtual internship",
    summary:
      "Built CEO-facing monitoring dashboards and prepared the data behind them — exploration, cleaning, anomaly handling, and feature engineering.",
    order: 3,
  },
  {
    org: "PT Anugrah Energi Indonesia",
    role: "Frontend Developer",
    period: "Jun 2023–Oct 2023",
    location: "Tangerang · vocational internship",
    summary:
      "Vocational-school internship: built responsive, scalable web interfaces with React and Tailwind CSS in a production environment.",
    order: 4,
  },
];

export const achievements: Achievement[] = [
  {
    medal: "🥇",
    title: "1st Place, National — I/O Festival",
    scope: "National competition",
    year: null, // Tahun tidak tercantum di CV. TODO(lintang): isi bila ingin ditampilkan.
    detail: "Built a B2B platform for the circular economy.",
    order: 1,
  },
  {
    medal: "🥉",
    title: "3rd Place, National — SurabayaDev Developer Battle 2025",
    scope: "National data analysis competition",
    year: "2025",
    detail:
      "A national data analysis competition focused on hotel booking and cancellation patterns.",
    // Pekerjaannya sudah diceritakan penuh sebagai case study.
    projectSlug: "hotel-cancellation-analysis",
    order: 2,
  },
  {
    medal: "🥈",
    title: "2nd Place, Internal — CIMB Niaga Pitching Day (UMN)",
    scope: "Internal competition",
    year: null, // Tahun tidak tercantum di CV. TODO(lintang): isi bila ingin ditampilkan.
    detail:
      "Built a functional mobile app for digital account opening using React Native and Expo Go.",
    order: 3,
  },
];

export const certifications: Certification[] = [
  {
    name: "Associate Data Scientist (Competent)",
    issuer: "BNSP",
    date: "Jan 2026",
    category: "Professional",
    credentialUrl: null, // TODO(lintang): URL verifikasi BNSP bila ada
    credentialImage: null, // TODO(lintang): atau foto sertifikat di public/images/certification_course/
    order: 1,
  },
  {
    name: "Data Science Bootcamp (Excellent Graduate)",
    issuer: "Digital Skola",
    date: "Nov 2025",
    category: "Bootcamp",
    credentialUrl: null, // TODO(lintang): URL sertifikat Digital Skola bila ada
    credentialImage: null, // TODO(lintang): atau foto sertifikat di public/images/certification_course/
    order: 2,
  },
  {
    name: "Exploratory Data Analysis for Machine Learning",
    issuer: "IBM (Coursera)",
    date: "Jan 2026",
    category: "Coursework",
    credentialUrl: null, // TODO(lintang): tempel URL kredensial Coursera
    credentialImage: null,
    order: 3,
  },
  {
    name: "Supervised Machine Learning: Regression",
    issuer: "IBM (Coursera)",
    date: "Jan 2026",
    category: "Coursework",
    credentialUrl: null, // TODO(lintang): tempel URL kredensial Coursera
    credentialImage: null,
    order: 4,
  },
  {
    name: "Data Science Capstone Project: Predicting Bicycle Rental",
    issuer: "University of London (Coursera)",
    date: "Jan 2025",
    category: "Coursework",
    credentialUrl: null, // TODO(lintang): tempel URL kredensial Coursera
    credentialImage: null,
    order: 5,
  },
  {
    name: "Python for Data Science, AI & Development",
    issuer: "IBM (Coursera)",
    date: "Jan 2025",
    category: "Coursework",
    credentialUrl: null, // TODO(lintang): tempel URL kredensial Coursera
    credentialImage: null,
    order: 6,
  },
];

/** Urutan tampil grup di halaman `/certifications`. */
export const certificationCategories: Certification["category"][] = [
  "Professional",
  "Bootcamp",
  "Coursework",
];

export const organizationRoles: OrganizationRole[] = [
  {
    org: "UMN ECO",
    role: "Coordinator, Website Division",
    period: "Jan 2026–present",
    summary: "Led development and maintenance of the organization's website.",
    order: 1,
  },
  {
    org: "Duta Anti Narkoba UMN",
    role: "Coordinator, Website Division",
    period: "Dec 2024–Nov 2025",
    summary:
      "Managed end-to-end website delivery, including event schedules and ticketing features.",
    order: 2,
  },
  {
    org: "STARLIGHT",
    role: "Website Division Member",
    period: "Oct 2024–Nov 2025",
    summary:
      "Built interactive division pages with a focus on usability and responsive design.",
    order: 3,
  },
  {
    org: "AI Community",
    role: "Volunteer",
    period: "Mar 2025–May 2025",
    summary:
      "Delivered AI demonstrations and hands-on sessions at Open House events for students and parents.",
    order: 4,
  },
];
