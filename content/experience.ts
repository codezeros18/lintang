/**
 * Experience · Education · Achievements · Certifications · Organisasi.
 *
 * SUMBER: CV `Lintang Balakosa Ardhana` (public/cv/Lintang-Balakosa-Ardhana-CV.pdf),
 * dibaca langsung pada 2026-07-26. Semua judul role, periode, penerbit, dan tanggal
 * di bawah ini disalin dari CV — tidak ada yang ditebak.
 *
 * Yang masih `null` = memang tidak ada di CV (mis. tahun I/O Festival & CIMB Niaga).
 */

import { emptyStory, type Story } from "@/content/story";

/**
 * Logo organisasi di `public/images/<folder>/logo.png`.
 *
 * Dipakai menggantikan kotak singkatan (ANK/BI/BSD) di timeline `/experience`
 * dan kartu `/projects` (permintaan Lintang 2026-07-27). Yang belum punya file
 * logo tetap `null` dan jatuh ke singkatan huruf — bukan logo tiruan buatan
 * sendiri.
 */
export type OrgLogo = {
  /** Path relatif dari `/images/`, mis. `ankop/logo.png`. */
  src: string;
  /** Rasio asli berbeda-beda (Ankop bulat, BSD wordmark memanjang), jadi
   *  penampilnya memakai `object-contain` — lihat `components/ui/org-mark.tsx`. */
  alt: string;
};

export type WorkItem = {
  org: string;
  /**
   * Singkatan 2–3 huruf untuk kotak penanda di timeline `/experience`.
   * Ditulis eksplisit, bukan diturunkan otomatis, supaya hasilnya masuk akal
   * ("PT Anugrah Kopi Nusantara (Ankop)" → `ANK`, bukan `PA`).
   */
  short: string;
  /** Dipakai untuk URL `/experience/<slug>`. */
  slug: string;
  /** Logo perusahaan; `null` = jatuh ke `short`. */
  logo: OrgLogo | null;
  role: string;
  /** Apa adanya dari CV: "Full-time", "Internship", "Virtual internship". */
  employmentType: string;
  /**
   * Tools yang benar-benar dipakai DI PERAN INI — bukan seluruh stack Lintang.
   * Diambil dari `approach`/`tech` proyeknya dan ringkasan CV.
   */
  skills: string[];
  /** Cerita panjang + foto untuk `/experience/<slug>`. Lihat `content/story.ts`. */
  story: Story;
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
  /**
   * `null` = tidak punya halaman detail. Hanya UMN & Digital Skola yang punya
   * (keputusan Lintang 2026-07-27) — SMKN 4 sengaja tetap satu baris.
   */
  slug: string | null;
  /** Template cerita + foto. Lihat `content/story.ts`. */
  story: Story;
  order: number;
};

export type Achievement = {
  medal: string;
  /** Dipakai untuk URL `/collabs/<slug>`. */
  slug: string;
  title: string;
  scope: string;
  /** `null` = tahun tidak tercantum di CV. */
  year: string | null;
  /** Satu baris konteks dari CV. */
  detail: string;
  /** Bila prestasinya sudah jadi case study, tunjuk ke sana alih-alih
   *  menceritakan ulang (anti double-count, §5.2). */
  projectSlug?: string;
  /**
   * Template cerita + foto untuk `/collabs/<slug>`.
   *
   * Untuk lomba yang pekerjaannya SUDAH diceritakan penuh sebagai case study
   * proyek (`projectSlug` terisi), halaman ini tidak mengulang ceritanya —
   * ia hanya memuat foto & konteks lomba, lalu menautkan ke case study-nya
   * (anti double-count, §5.2).
   */
  story: Story;
  order: number;
};

export type Certification = {
  name: string;
  issuer: string;
  /** `null` = tanggalnya memang tidak tercantum di sertifikat → tidak ditampilkan. */
  date: string | null;
  /**
   * Pengelompokan di halaman `/certifications`. Ini label jenis kredensialnya —
   * diturunkan dari apa yang tertulis di CV/sertifikatnya (sertifikasi profesi vs
   * magang vs lomba vs bootcamp vs kursus), bukan kategori karangan.
   */
  category:
    | "Professional"
    | "Competition"
    | "Internship"
    | "Bootcamp"
    | "Coursework";
  /**
   * URL verifikasi resmi dari penerbit (mis. tautan kredensial Coursera).
   * `null` = tautan "Verify" TIDAK dirender — jangan pernah menampilkan tombol
   * verifikasi yang tidak bisa dibuktikan.
   */
  credentialUrl: string | null;
  /**
   * Foto/scan sertifikat — dibuka di modal lewat tombol "View".
   * Ditulis relatif dari `/images/`, mis. `certification_course/bnsp.jpg`
   * (sertifikat lomba: `certification_lomba/...`).
   * `null` = tombol "View" tidak dirender.
   */
  credentialImage: string | null;
  order: number;
};

export type OrganizationRole = {
  org: string;
  /** Dipakai untuk URL `/experience/organizations/<slug>`. */
  slug: string;
  role: string;
  period: string;
  /** Satu baris saja — §S5 melarang skill-dump di bagian organisasi. */
  summary: string;
  /** Template cerita + foto. Lihat `content/story.ts`. */
  story: Story;
  order: number;
};

export const education: EducationItem[] = [
  {
    school: "Universitas Multimedia Nusantara",
    program: "B.Sc. Informatics",
    period: "Aug 2024–present",
    note: "GPA 3.48",
    slug: "universitas-multimedia-nusantara",
    // TODO(lintang): tulis ceritanya + taruh foto di public/images/umn/
    story: emptyStory,
    order: 1,
  },
  {
    school: "Digital Skola",
    program: "Data Science Bootcamp",
    period: "Jun 2025–Oct 2025",
    note: "Excellent Graduate",
    slug: "digital-skola",
    story: {
      // TODO(lintang): tulis `intro` + `sections`-nya.
      intro: null,
      sections: [
        {
          heading: "The internship that came with it",
          body: 'The certificate for the internship reads: a six-week intensive programme from 23 January to 28 February 2026, run by Digital Skola together with Bank Sampah Digital, completed with an "excellent grade" for initiative, participation in discussions, and data analysis work on the dataset in Google Data Studio.\n\nThat is the certificate\'s wording, not mine — the story of what the weeks were actually like is still to be written.',
        },
      ],
      photos: [
        {
          // ⚠️ File ini ada di folder `surabayadev/`, tapi ISINYA sesi Zoom
          // Digital Skola (branding Digital Skola + Desty Eka Putri Sari, CEO
          // Bank Sampah Digital — sama dengan penanda tangan sertifikat magang).
          // Ditempatkan menurut isi, bukan nama foldernya. Lihat PROGRESS_LOG.
          src: "surabayadev/dom1.jpg",
          alt: "Online session with the Digital Skola cohort and mentors on Zoom",
        },
        {
          src: "bsd/certificate.jpg",
          alt: "Certificate of appreciation from Bank Sampah Digital and Digital Skola for the six-week intensive internship, completed with an excellent grade",
        },
      ],
    },
    order: 2,
  },
  {
    school: "SMKN 4 Kota Tangerang",
    program: "Software Engineering",
    period: "Jun 2021–Jul 2024",
    slug: null, // sengaja tanpa halaman detail
    story: emptyStory,
    order: 3,
  },
];

export const workItems: WorkItem[] = [
  {
    org: "PT Anugrah Kopi Nusantara (Ankop)",
    slug: "ankop",
    short: "ANK",
    employmentType: "Full-time",
    skills: [
      "Next.js",
      "NestJS",
      "Prisma",
      "MySQL",
      "Docker",
      "Railway",
      "Offline-first",
    ],
    story: {
      intro:
        "Ankop is a specialty coffee producer in Pangalengan. I joined in June 2026 as their full-stack engineer, and the brief covered the whole operation — from the moment cherry arrives at the gate to the moment a supplier gets paid.",
      sections: [
        {
          heading: "What the business needed",
          body: "Everything ran on paper and spreadsheets, and the signal at the factory is genuinely unreliable. That combination is expensive in a specific way: the kilograms recorded at intake are what a supplier eventually gets paid for, so a lost or re-typed number is not an inconvenience — it is somebody's money and, over time, their trust.",
        },
        {
          heading: "What I actually did here",
          body: "I built and shipped Ankop Trace, the system that runs the operation end to end. The engineering decisions behind it — why offline-first, why NestJS and Prisma — are written up on the product page rather than repeated here.\n\nThe part that belongs to the job rather than the product: this was work done on site, walking the drying beds and reading the handwritten batch cards that the software was going to replace.",
        },
      ],
      photos: [
        {
          src: "ankop/dom4.jpeg",
          alt: "A drying bed labelled by hand — batch number, date and temperature written on a card — the paper process the system replaced",
        },
        {
          src: "ankop/dom1.jpeg",
          alt: "Site visit to the drying greenhouse, walking the beds with the producer",
        },
        {
          src: "ankop/dom3.jpeg",
          alt: "Working on site at the processing facility, laptop open beside the fermentation tanks",
        },
      ],
    },
    logo: {
      src: "ankop/logo.png",
      // Logo menuliskan "CV. Anugrah Kopi Nusantara — Pangalengan", sedangkan CV
      // Lintang menulis "PT". Nama di teks tetap mengikuti CV; lihat catatan di
      // PROGRESS_LOG. TODO(lintang): pastikan CV atau PT yang benar.
      alt: "Anugrah Kopi Nusantara logo",
    },
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
    slug: "bisasinema",
    short: "BI",
    employmentType: "Full-time",
    skills: [
      "React",
      "Tailwind CSS",
      "Express.js",
      "Midtrans",
      "Technical SEO",
    ],
    story: {
      intro:
        "Bisasinema is a film brand. I joined in March 2026 as tech lead and assistant product manager, which in practice meant being the person responsible for their first product platform existing at all.",
      sections: [
        {
          heading: "What the business needed",
          body: "A film brand with an audience but no product surface: no way to sell a class, no way to sell a ticket, no way to see what was selling. Everything a viewer could do with the brand happened somewhere else, on somebody else's platform.",
        },
        {
          heading: "What the role involved beyond code",
          body: "Tech lead and assistant product manager are two jobs, and the second one is the one that does not show up in a commit history: deciding what shipped first, and saying no to the rest until it did.\n\nThe build itself — Coursera-style classes, digital ticketing with live payments, the internal monitoring dashboard, and the technical SEO — is written up on the product page.",
        },
      ],
      photos: [
        {
          src: "bisasinema/dom1.jpeg",
          alt: "The Bisasinema team around the work table, a class recording open on the monitor behind them",
        },
        {
          src: "bisasinema/dom2.jpeg",
          alt: "Working session at the Bisasinema studio, holding up the brand sticker",
        },
      ],
    },
    logo: { src: "bisasinema/logo.png", alt: "Bisasinema logo" },
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
    slug: "bank-sampah-digital",
    short: "BSD",
    employmentType: "Virtual internship",
    skills: [
      "Python",
      "Pandas",
      "EDA",
      "Feature engineering",
      "Looker Studio",
    ],
    story: {
      intro:
        "A six-week intensive internship run by Digital Skola together with Bank Sampah Digital, from 23 January to 28 February 2026. I worked on the data side: preparing it, then building what the CEO actually looked at.",
      sections: [
        {
          heading: "What the work was",
          body: "Exploration, cleaning, anomaly handling and feature engineering first — then CEO-facing monitoring dashboards on top of the result. The order matters: a dashboard built on unexamined data is a confident-looking way to be wrong.",
        },
        {
          heading: "How it ended",
          body: 'The programme certificate records an "excellent grade", citing initiative, active participation in discussions, and the data analysis work on the dataset in Google Data Studio. That is the certificate\'s wording — the fuller story is still to be written.',
        },
      ],
      photos: [
        {
          src: "bsd/certificate.jpg",
          alt: "Certificate of appreciation from Bank Sampah Digital and Digital Skola for the six-week intensive internship, completed with an excellent grade",
        },
      ],
    },
    logo: { src: "bsd/logo.png", alt: "Bank Sampah Digital logo" },
    role: "Data Scientist Intern",
    period: "Jan 2026–Mar 2026",
    // Jenis kerjanya sudah di `employmentType`, jadi lokasi cukup kotanya saja.
    location: "Serang",
    summary:
      "Built CEO-facing monitoring dashboards and prepared the data behind them — exploration, cleaning, anomaly handling, and feature engineering.",
    order: 3,
  },
  {
    org: "PT Anugrah Energi Indonesia",
    slug: "anugrah-energi-indonesia",
    short: "AEI",
    employmentType: "Vocational internship",
    skills: ["React", "Tailwind CSS", "Responsive design"],
    story: {
      intro:
        "My vocational-school internship, and the first time I wrote frontend code that other people depended on rather than code only I would ever run.",
      sections: [
        {
          heading: "What I did",
          body: "Built responsive, scalable web interfaces with React and Tailwind CSS in a production environment.",
        },
      ],
      photos: [],
    },
    logo: { src: "aei/logo.png", alt: "Anugrah Energi Indonesia logo" },
    role: "Frontend Developer",
    period: "Jun 2023–Oct 2023",
    // Jenis kerjanya sudah di `employmentType`, jadi lokasi cukup kotanya saja.
    location: "Tangerang",
    summary:
      "Vocational-school internship: built responsive, scalable web interfaces with React and Tailwind CSS in a production environment.",
    order: 4,
  },
];

export const achievements: Achievement[] = [
  {
    medal: "🥇",
    slug: "io-festival",
    title: "1st Place, National — I/O Festival",
    scope: "National competition",
    // CV tidak menyebut tahun, tapi sertifikat pesertanya
    // (`iofest/certificate.png`) menulis "I/O FESTIVAL 2026 … 4-5 Juni 2026",
    // dan layar panggung di `iofest/dom3.jpeg` juga menulis 2026. Diisi dari
    // dokumen itu, bukan tebakan. TODO(lintang): koreksi kalau keliru.
    year: "2026",
    detail: "Built a B2B platform for the circular economy.",
    story: {
      // TODO(lintang): tulis `intro` + `sections`-nya. Fotonya sudah terpasang.
      intro: null,
      sections: [],
      photos: [
        {
          src: "iofest/dom4.jpeg",
          alt: "Pitching on stage at the I/O Festival — the slide reads PulangKeMerek, “mengubah sampah menjadi data, memberikan tanggung jawab kembali ke penciptanya”",
        },
        {
          src: "iofest/dom2.jpeg",
          alt: "The platform's dashboard on the projector during the pitch, showing recovery rate, cost per unit, and difficulty score per material",
        },
        {
          src: "iofest/dom1.jpeg",
          alt: "Lintang Balakosa Ardhana presenting with a teammate on the I/O Festival stage",
        },
        {
          src: "iofest/dom3.jpeg",
          alt: "Winners lined up on stage during the I/O Festival 2026 awarding session",
        },
        {
          src: "iofest/dom5.jpeg",
          alt: "Group photo of all I/O Festival winners with the committee, trophies and certificates in hand",
        },
      ],
    },
    order: 1,
  },
  {
    medal: "🥉",
    slug: "surabayadev-developer-battle-2025",
    title: "3rd Place, National — SurabayaDev Developer Battle 2025",
    scope: "National data analysis competition",
    year: "2025",
    detail:
      "A national data analysis competition focused on hotel booking and cancellation patterns.",
    // Pekerjaannya sudah diceritakan penuh sebagai case study.
    projectSlug: "hotel-cancellation-analysis",
    // Ceritanya sudah penuh di case study — halaman ini cuma foto + konteks.
    story: {
      intro: null,
      sections: [],
      photos: [
        {
          // ⚠️ File ini ada di folder `bsd/`, tapi ISINYA prize giving ceremony
          // Developer Battle 2025 (nama peserta "Lintang_CALON MANTU_Universitas
          // Multimedia Nusantara" terbaca jelas — tim yang sama dengan yang
          // tertulis di sertifikatnya). Ditempatkan menurut isi, bukan nama
          // foldernya. Lihat PROGRESS_LOG.
          src: "bsd/dom1.jpg",
          alt: "The Developer Battle 2025 prize giving ceremony on Zoom, with the finalist teams on screen",
        },
        {
          src: "surabayadev/certificate.jpg",
          alt: "3rd place certificate for SurabayaDev Developer Battle 2025, awarded to Lintang Balakosa Ardhana of team CALON MANTU",
        },
      ],
    },
    order: 2,
  },
  {
    medal: "🥈",
    slug: "cimb-niaga-pitching-day",
    title: "2nd Place, Internal — CIMB Niaga Pitching Day (UMN)",
    scope: "Internal competition",
    year: null, // Tahun tidak tercantum di CV. TODO(lintang): isi bila ingin ditampilkan.
    detail:
      "Built a functional mobile app for digital account opening using React Native and Expo Go.",
    story: {
      // TODO(lintang): tulis `intro` + `sections`-nya. Fotonya sudah terpasang.
      intro: null,
      sections: [],
      photos: [
        {
          src: "cimb/dom1.jpeg",
          alt: "The four-person team holding the 2nd place cheque at the UMN × CIMB Niaga Pitching Day",
        },
        {
          src: "cimb/certificate.jpg",
          alt: "2nd place certificate for Pitching Day: From Classroom to Boardroom, naming Lintang Balakosa Ardhana and his three teammates",
        },
      ],
    },
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
    // Disalin apa adanya dari foto sertifikat di public/images/cimb/certificate.jpg:
    // "PITCHING DAY — From Classroom to Boardroom: Solving Real World Problems",
    // 2nd Place, ditandatangani Dekan Fakultas Teknik & Informatika UMN.
    name: "2nd Place — Pitching Day: From Classroom to Boardroom",
    issuer: "UMN feat. CIMB Niaga",
    date: null, // Sertifikatnya tidak mencantumkan tanggal. TODO(lintang): isi bila ingat.
    category: "Competition",
    credentialUrl: null,
    credentialImage: "cimb/certificate.jpg",
    order: 2,
  },
  {
    // Disalin dari public/images/bsd/certificate.jpg. Sertifikatnya menyebut
    // magang 6 minggu, 23 Jan–28 Feb 2026, "excellent grade", diselenggarakan
    // Digital Skola & Bank Sampah Digital.
    name: "Internship Program (Excellent Grade)",
    issuer: "Bank Sampah Digital & Digital Skola",
    date: "May 2026", // tanggal terbit di sertifikat: 16 Mei 2026
    category: "Internship",
    credentialUrl: null,
    credentialImage: "bsd/certificate.jpg",
    order: 3,
  },
  {
    // `surabayadev/certificate.jpg`: "Sertifikat Penghargaan — Developer Battle
    // 2025 … JUARA 3", tim CALON MANTU, 20 Agustus–18 Oktober 2025.
    name: "3rd Place — SurabayaDev Developer Battle 2025",
    issuer: "SurabayaDev",
    date: "Oct 2025",
    category: "Competition",
    credentialUrl: null,
    credentialImage: "surabayadev/certificate.jpg",
    order: 9,
  },
  // ——— Sertifikat PARTISIPASI ———
  // Keempat berikut tertulis jelas "Peserta"/"Participation" di dokumennya, jadi
  // judulnya ditulis apa adanya sebagai partisipasi. Ikut lomba memang bukan
  // menang, dan menyamarkannya jadi seolah-olah prestasi = memalsukan.
  {
    // `iofest/certificate.png` — perhatikan: ini sertifikat PESERTA kategori
    // Web Development, BUKAN sertifikat juara 1 yang ada di daftar collabs.
    name: "Participant — Web Development (National), I/O Festival 2026",
    issuer: "BEM FTI Universitas Tarumanagara",
    date: "Jun 2026",
    category: "Competition",
    credentialUrl: null,
    credentialImage: "iofest/certificate.png",
    order: 10,
  },
  {
    name: "Participant — Gunadarma Code Week 2026 Hackathon",
    issuer: "Gunadarma Code Week & Google Developer Group",
    date: "Jun 2026",
    category: "Competition",
    credentialUrl: null,
    credentialImage: "certification_lomba/codeweek.jpg",
    order: 11,
  },
  {
    name: "Participant — Garuda Hacks 7.0",
    issuer: "Garuda Hacks",
    date: null, // Sertifikatnya tidak mencantumkan tanggal.
    category: "Competition",
    credentialUrl: null,
    credentialImage: "certification_lomba/garudahacks.jpg",
    order: 12,
  },
  {
    name: "Participant — Gelar Rasa 2025",
    issuer: 'UPN "Veteran" Jawa Timur',
    date: "Nov 2025",
    category: "Competition",
    credentialUrl: null,
    credentialImage: "certification_lomba/gelarrasa.png",
    order: 13,
  },
  {
    name: "Data Science Bootcamp (Excellent Graduate)",
    issuer: "Digital Skola",
    date: "Nov 2025",
    category: "Bootcamp",
    credentialUrl: null, // TODO(lintang): URL sertifikat Digital Skola bila ada
    credentialImage: null, // TODO(lintang): atau foto sertifikat di public/images/certification_course/
    order: 4,
  },
  {
    name: "Exploratory Data Analysis for Machine Learning",
    issuer: "IBM (Coursera)",
    date: "Jan 2026",
    category: "Coursework",
    credentialUrl: null, // TODO(lintang): tempel URL kredensial Coursera
    credentialImage: null,
    order: 5,
  },
  {
    name: "Supervised Machine Learning: Regression",
    issuer: "IBM (Coursera)",
    date: "Jan 2026",
    category: "Coursework",
    credentialUrl: null, // TODO(lintang): tempel URL kredensial Coursera
    credentialImage: null,
    order: 6,
  },
  {
    name: "Data Science Capstone Project: Predicting Bicycle Rental",
    issuer: "University of London (Coursera)",
    date: "Jan 2025",
    category: "Coursework",
    credentialUrl: null, // TODO(lintang): tempel URL kredensial Coursera
    credentialImage: null,
    order: 7,
  },
  {
    name: "Python for Data Science, AI & Development",
    issuer: "IBM (Coursera)",
    date: "Jan 2025",
    category: "Coursework",
    credentialUrl: null, // TODO(lintang): tempel URL kredensial Coursera
    credentialImage: null,
    order: 8,
  },
];

/**
 * Urutan tampil grup di halaman `/certifications`.
 *
 * "Competition" sudah disiapkan untuk sertifikat lomba yang jumlahnya akan
 * banyak (fotonya di `public/images/certification_lomba/`). Grup yang belum
 * punya isi TIDAK dirender, jadi menambah kategori di sini aman.
 */
/**
 * Tiga kartu sertifikat yang dipajang di beranda (permintaan Lintang
 * 2026-07-27: "fokusin ke BNSP dan course yang paling menarik, 3 saja").
 *
 * Dipilih eksplisit, bukan `slice(0, 3)`, supaya urutannya tidak berubah
 * sendiri saat ada sertifikat baru: BNSP karena itu satu-satunya sertifikasi
 * profesi, lalu dua coursework dengan penerbit paling dikenal (IBM dan
 * University of London).
 */
export const featuredCertificationNames = [
  "Associate Data Scientist (Competent)",
  "Exploratory Data Analysis for Machine Learning",
  "Data Science Capstone Project: Predicting Bicycle Rental",
];

export const featuredCertifications: Certification[] =
  featuredCertificationNames.flatMap(
    (name) => certifications.find((cert) => cert.name === name) ?? [],
  );

export const certificationCategories: Certification["category"][] = [
  "Professional",
  "Competition",
  "Internship",
  "Bootcamp",
  "Coursework",
];

export const organizationRoles: OrganizationRole[] = [
  {
    org: "UMN ECO",
    slug: "umn-eco",
    role: "Coordinator, Website Division",
    period: "Jan 2026–present",
    summary: "Led development and maintenance of the organization's website.",
    // TODO(lintang): tulis ceritanya + foto di public/images/umn-eco/
    story: emptyStory,
    order: 1,
  },
  {
    org: "Duta Anti Narkoba UMN",
    slug: "duta-anti-narkoba-umn",
    role: "Coordinator, Website Division",
    period: "Dec 2024–Nov 2025",
    summary:
      "Managed end-to-end website delivery, including event schedules and ticketing features.",
    story: {
      // TODO(lintang): tulis `intro` + `sections`-nya. Fotonya sudah terpasang.
      intro: null,
      sections: [],
      photos: [
        {
          src: "dan/dom1.jpg",
          alt: "The Duta Anti Narkoba UMN cohort filling the auditorium for a group photo",
        },
      ],
    },
    order: 2,
  },
  {
    org: "STARLIGHT",
    slug: "starlight",
    role: "Website Division Member",
    period: "Oct 2024–Nov 2025",
    summary:
      "Built interactive division pages with a focus on usability and responsive design.",
    story: {
      // TODO(lintang): tulis `intro` + `sections`-nya. Fotonya sudah terpasang.
      intro: null,
      sections: [],
      photos: [
        {
          src: "starlight/dom1.jpeg",
          alt: "The STARLIGHT committee in matching event shirts on stage in front of the event backdrop",
        },
        {
          src: "starlight/dom2.jpeg",
          alt: "Full group photo of the STARLIGHT participants and committee filling the hall",
        },
      ],
    },
    order: 3,
  },
  {
    org: "AI Community",
    slug: "ai-community",
    role: "Volunteer",
    period: "Mar 2025–May 2025",
    summary:
      "Delivered AI demonstrations and hands-on sessions at Open House events for students and parents.",
    story: {
      // TODO(lintang): tulis `intro` + `sections`-nya. Fotonya sudah terpasang.
      intro: null,
      sections: [],
      photos: [
        {
          src: "aicom/dom2.jpeg",
          alt: "A room full of visiting students after an AI demonstration session, the demo still open on the projector",
        },
        {
          src: "aicom/dom1.jpeg",
          alt: "The AI Community volunteers with guests on the auditorium stage after a session",
        },
        {
          src: "aicom/dom3.jpeg",
          alt: "Lintang Balakosa Ardhana with two fellow volunteers in the lab, presentation slides on the screen behind them",
        },
      ],
    },
    order: 4,
  },
];
