/**
 * Projects — PORTFOLIO_BLUEPRINT.md §5 (bersumber CV).
 *
 * Aturan integritas yang dijaga file ini:
 * - Tidak ada angka/klaim di luar §0.2 dan §5.2.
 * - Angka yang aturannya terikat konteks waktu (5.000+ kg → `ANKOP_MONTHS`) hanya
 *   muncul setelah tokennya diisi. Selama kosong, angka itu **tidak ditampilkan**
 *   — bukan ditampilkan tanpa konteks.
 * - Field yang jawabannya hanya Lintang yang tahu bertipe `null` + `// TODO(lintang)`,
 *   dan UI menyembunyikan bloknya (§9: tidak boleh ada token bocor ke UI).
 *
 * Deviasi dari skema §5.1 (disengaja, dicatat di PROGRESS_LOG):
 * - `ownVsTeam` & `learned` → `string | null` supaya bisa disembunyikan saat belum diisi.
 * - Tambahan `tech[]` (untuk tech chip di kartu), `award` (medali), `anonymousName`
 *   (dipakai bila `CLIENT_NAME_PERMISSION === false`), dan `proof.configKey` +
 *   `proof.pendingNote` supaya bukti tersambung ke token `PROOF_*`.
 */

import { CONFIG, isSet } from "@/content/config";

export type ProofConfigKey =
  | "PROOF_ANKOP"
  | "PROOF_BISASINEMA"
  | "PROOF_TERA"
  | "PROOF_HOTEL"
  | "PROOF_BANKSAMPAH";

export type Project = {
  slug: string;
  name: string;
  /** Nama pengganti bila penyebutan klien belum diizinkan (§0.1). */
  anonymousName?: string;
  tagline: string;
  role: string;
  /** Termasuk konteks waktu. `null` = belum dipastikan Lintang → disembunyikan. */
  durationNote: string | null;
  problem: string;
  /** Keputusan teknis + KENAPA-nya. */
  approach: string[];
  /** Jujur soal porsi kerja sendiri vs tim. `null` = belum dipastikan Lintang. */
  ownVsTeam: string | null;
  /** [FAKTA] dari CV + konteks waktu. */
  results: string[];
  /** Satu pelajaran spesifik. `null` = belum ditulis Lintang. */
  learned: string | null;
  tech: string[];
  award?: string;
  /** Belum semua proyek punya token bukti sendiri di §0.1 (mis. Kuali). */
  proof?: {
    /** Token CONFIG yang menentukan bukti apa yang boleh ditampilkan. */
    configKey: ProofConfigKey;
    /** Rencana bukti — ditampilkan sebagai "bukti menyusul" selama token kosong. */
    pendingNote: string;
  };
  honesty:
    | "produksi"
    | "produksi (production-ready)"
    | "hackathon"
    | "bootcamp"
    | "kompetisi";
  lane: "fullstack" | "data" | "both";
  featured: boolean;
  order: number;
};

const ankopMonths = CONFIG.ANKOP_MONTHS;

export const projects: Project[] = [
  {
    slug: "ankop-trace",
    name: "Ankop Trace",
    anonymousName: "Produsen kopi specialty",
    tagline:
      "Ops kopi offline-first — dari intake sampai pembayaran supplier, tetap jalan waktu sinyal hilang.",
    role: "Full-Stack Software Engineer",
    durationNote: "Jun 2026–sekarang",
    problem:
      "Operasional kopi berjalan di atas kertas dan Excel. Sinyal sering drop di pabrik, sehingga penimbangan bisa hilang begitu saja. Pembayaran supplier dihitung manual dan tidak transparan bagi yang dibayar.",
    approach: [
      "Offline-first: input diantre di perangkat dan tersinkron otomatis saat koneksi kembali. Dipilih karena constraint lapangan yang nyata — sinyal di pabrik memang tidak bisa diandalkan — bukan karena arsitekturnya sedang tren.",
      "NestJS + Prisma untuk backend yang type-safe, karena alurnya panjang dan saling bergantung: intake → fermentasi → drying → hulling → sorting → warehouse → payment → reporting. Satu salah tipe di tengah rantai itu mahal.",
      "Docker + Railway supaya lingkungan deploy konsisten dan rilis tidak bergantung pada mesin siapa pun.",
      "Pembayaran auto-computed dari kilogram yang diterima lalu melewati approval, menggantikan hitungan manual yang sebelumnya jadi sumber sengketa.",
    ],
    ownVsTeam: null, // TODO(lintang): solo atau tim? Kalau tim, sebut porsi kerjamu.
    results: [
      // "5.000+ kg kopi dilacak" WAJIB tampil bersama konteks waktu (§0.2).
      // Selama `ANKOP_MONTHS` kosong, angka ini sengaja TIDAK ditampilkan.
      // TODO(lintang): isi ANKOP_MONTHS + ANKOP_KG_CUMULATIVE.
      ...(isSet(ankopMonths)
        ? [`5.000+ kg kopi dilacak dalam ${ankopMonths} bulan pertama sejak live`]
        : []),
      "15+ supplier aktif",
      "~80% acceptance rate (live)",
      "Puluhan juta rupiah pembayaran supplier terdigitalisasi",
    ],
    learned: null, // TODO(lintang): 1 pelajaran spesifik (mis. cara menyelesaikan konflik sync offline)
    tech: ["NestJS", "Prisma", "PostgreSQL", "Docker", "Railway", "Offline-first"],
    proof: {
      configKey: "PROOF_ANKOP",
      pendingNote:
        "Rencana bukti: screenshot beranotasi + walkthrough Loom. Sistemnya internal, jadi butuh izin klien sebelum dibuka.",
    },
    honesty: "produksi",
    lane: "fullstack",
    featured: true,
    order: 1,
  },
  {
    slug: "bisasinema",
    name: "Bisasinema",
    anonymousName: "Brand film & edukasi",
    tagline:
      "Platform belajar-dan-tiket dengan pembayaran live — presence digital pertama sebuah brand film.",
    role: "Tech Lead & Assistant Product Manager",
    durationNote: "Mar 2026–sekarang",
    problem:
      "Sebuah brand film dan edukasi belum punya presence digital sama sekali, dan belum punya cara menjual kelas maupun tiket selain manual.",
    approach: [
      "Membangun platform ala Coursera (Filmmaking Lab + Masterclass) supaya kelas bisa dijual berulang, bukan sekali jalan per event.",
      "Midtrans untuk transaksi live: pembayaran harus benar-benar menerima uang dengan aman, bukan sekadar tombol checkout yang mengarah ke transfer manual.",
      "Dashboard monitoring internal untuk pembayaran dan penjualan secara real-time, menggantikan pencatatan manual yang sebelumnya jadi satu-satunya sumber angka.",
      "Technical SEO sejak awal supaya penemuan organik tidak bergantung pada iklan.",
    ],
    ownVsTeam: null, // TODO(lintang): CV menulis "Led end-to-end build" — kerja sendiri, atau memimpin tim? Sebut anggotanya bila ada.
    results: [
      "Rp20jt+ penjualan tiket pada peluncuran awal Learning Lab",
      "Visibilitas pencarian teratas untuk keyword inti",
    ],
    learned: null, // TODO(lintang): 1 pelajaran spesifik dari membangun & meluncurkan ini
    tech: ["React", "Tailwind CSS", "Express.js", "Midtrans", "Technical SEO"],
    proof: {
      configKey: "PROOF_BISASINEMA",
      pendingNote:
        "Rencana bukti: URL live bila boleh dibagikan, atau screenshot beranotasi. Menunggu konfirmasi izin klien.",
    },
    honesty: "produksi",
    lane: "fullstack",
    featured: true,
    order: 2,
  },
  {
    slug: "tera",
    name: "Tera",
    tagline:
      "SaaS multi-tenant untuk ops ekspor — isolasi data ditegakkan sampai level database.",
    role: "Full-Stack Engineer",
    durationNote: null, // TODO(lintang): durasi proyek Tera (dan apakah ini solo project)
    problem:
      "Operasional ekspor melibatkan banyak pihak dalam satu sistem. Data antar-tenant tidak boleh saling terlihat, dan tiap peran — admin, field officer, procurement, CEO, viewer, Q-grader — butuh akses yang berbeda.",
    approach: [
      "Access control 3 lapis: route guard di frontend, penegakan peran di API, dan PostgreSQL Row Level Security. RLS dipakai supaya isolasi tetap berlaku di level database — kalau ada bug di API, data tenant lain tetap tidak bisa terbaca.",
      "6 dashboard yang dibatasi per peran, supaya tiap pihak melihat persis yang jadi urusannya.",
      "Rule-based pricing engine dengan alur weigh → price → WhatsApp, mengikuti cara pihak lapangan sudah bekerja alih-alih memaksa mereka pindah alat.",
      "Traceability harvest-to-buyer supaya asal barang bisa ditelusuri di sepanjang rantai.",
    ],
    ownVsTeam: null, // TODO(lintang): solo project atau ada tim?
    results: [
      "6 dashboard role-gated",
      "Isolasi data multi-tenant penuh (frontend, API, dan RLS di database)",
      // TODO(lintang): apakah sudah ada tenant nyata / tenant berbayar?
    ],
    learned: null, // TODO(lintang): 1 pelajaran spesifik
    tech: ["Next.js 14", "FastAPI", "PostgreSQL 16", "Supabase", "RLS"],
    proof: {
      configKey: "PROOF_TERA",
      pendingNote:
        "Rencana bukti: studi kasus tertulis + diagram akses berlapis. Selama belum ada demo publik, tidak ada demo yang ditautkan.",
    },
    // §5.2: selama belum ada tenant berbayar, labelnya "production-ready" — bukan klaim produksi penuh.
    honesty: "produksi (production-ready)",
    lane: "fullstack",
    featured: true,
    order: 3,
  },
  {
    slug: "analisis-pembatalan-hotel",
    name: "Analisis Pembatalan Hotel",
    tagline:
      "Mencari penyebab hotel kehilangan pendapatan karena pembatalan — lalu mengubahnya jadi rekomendasi.",
    role: "Analis data",
    durationNote: "Kompetisi nasional, 2025",
    problem:
      "Hotel kehilangan pendapatan karena pembatalan booking, tapi faktor pendorongnya belum teridentifikasi sehingga belum bisa ditindaklanjuti.",
    approach: [
      "EDA pada pola booking dan pembatalan untuk menemukan di mana kerugiannya benar-benar terjadi, bukan di mana ia terasa.",
      "Identifikasi driver revenue loss, supaya rekomendasinya menyerang penyebab dan bukan gejala.",
      "Dashboard interaktif + rekomendasi, supaya temuannya bisa dipakai mengambil keputusan, bukan berhenti jadi notebook.",
    ],
    ownVsTeam: null, // TODO(lintang): kompetisi ini diikuti sendiri atau tim?
    results: [
      "Juara 3 Nasional SurabayaDev 2025",
      "Diakui juri kuat di storytelling dan kedalaman analisis",
    ],
    learned: null, // TODO(lintang): 1 pelajaran spesifik
    tech: ["Python", "Looker Studio", "Google Colab", "Figma"],
    award: "🥉 Juara 3 Nasional SurabayaDev 2025",
    proof: {
      configKey: "PROOF_HOTEL",
      pendingNote:
        "Rencana bukti: dashboard Looker (view-only) + notebook analisis + slide presentasi.",
    },
    honesty: "kompetisi",
    lane: "data",
    featured: true,
    order: 4,
  },

  // ——— Sekunder (§5.3): kartu kecil, bukan hero, tanpa halaman case study ———
  {
    slug: "kuali",
    name: "Kuali",
    tagline: "AI ops assistant lewat WhatsApp — chat diubah jadi data terstruktur.",
    role: "Builder",
    durationNote: "Hackathon",
    problem:
      "Pekerjaan operasional sehari-hari masih dicatat lewat percakapan, sehingga datanya tidak pernah rapi.",
    approach: [
      "Pipeline LLM chat→JSON supaya pesan bebas bisa berubah jadi data terstruktur yang bisa diproses.",
      "Arsitektur produk dirancang di sekitar WhatsApp, kanal yang memang sudah dipakai penggunanya.",
    ],
    ownVsTeam: null, // TODO(lintang)
    results: [],
    learned: null, // TODO(lintang)
    tech: ["LLM", "WhatsApp", "Product architecture"],
    // BLUEPRINT §0.1 belum menyediakan token bukti untuk Kuali, jadi tidak ada
    // klaim bukti apa pun di sini. TODO(lintang): tambahkan bila memang ada.
    honesty: "hackathon",
    lane: "both",
    featured: false,
    order: 5,
  },
  {
    slug: "bank-sampah-digital",
    name: "Bank Sampah Digital",
    tagline: "Dashboard keputusan untuk CEO, dari data operasional yang tadinya mentah.",
    role: "Data analyst (virtual internship)",
    durationNote: "Bootcamp / virtual internship",
    problem:
      "Data operasional tersedia tapi belum berbentuk yang bisa dipakai pimpinan untuk mengambil keputusan.",
    approach: [
      "EDA, cleaning, dan feature engineering untuk membuat datanya layak dianalisis.",
      "Dashboard Looker Studio yang ditujukan langsung ke kebutuhan CEO.",
    ],
    ownVsTeam: null, // TODO(lintang)
    results: [],
    learned: null, // TODO(lintang)
    tech: ["Looker Studio", "Pandas", "EDA"],
    proof: {
      configKey: "PROOF_BANKSAMPAH",
      pendingNote: "Rencana bukti: screenshot dashboard CEO.",
    },
    honesty: "bootcamp",
    lane: "data",
    featured: false,
    order: 6,
  },
];

/** 4 hero, urut Ankop → Bisasinema → Tera → Analisis Hotel (§5.2). */
export const featuredProjects = projects
  .filter((project) => project.featured)
  .sort((a, b) => a.order - b.order);

/** Kartu kecil "Other projects" (§5.3). */
export const otherProjects = projects
  .filter((project) => !project.featured)
  .sort((a, b) => a.order - b.order);

/** Hanya hero yang punya halaman case study sendiri. */
export const caseStudyProjects = featuredProjects;

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/**
 * Nama yang boleh ditampilkan.
 *
 * `CLIENT_NAME_PERMISSION === false` → pakai nama anonim (§0.1).
 * Selama tokennya `null` (belum dijawab), nama tetap ditampilkan karena nama-nama ini
 * berasal dari riwayat kerja di CV Lintang sendiri. **Set token ke `false` bila salah
 * satu klien tidak boleh disebut** — lihat catatan di PROGRESS_LOG S4.
 */
export function displayName(project: Project): string {
  if (CONFIG.CLIENT_NAME_PERMISSION === false && project.anonymousName) {
    return project.anonymousName;
  }
  return project.name;
}

export type ProofState =
  | { status: "pending"; note: string }
  | { status: "available"; label: string; url?: string };

/**
 * Bukti hanya ditampilkan bila tokennya sudah diisi. Selama kosong → "bukti menyusul".
 * Tidak pernah merender demo palsu atau link mati (§9).
 */
export function resolveProof(project: Project): ProofState | null {
  if (!project.proof) return null;

  const pending: ProofState = {
    status: "pending",
    note: project.proof.pendingNote,
  };

  switch (project.proof.configKey) {
    case "PROOF_ANKOP": {
      const value = CONFIG.PROOF_ANKOP;
      return isSet(value) ? { status: "available", label: value } : pending;
    }
    case "PROOF_BISASINEMA": {
      const value = CONFIG.PROOF_BISASINEMA;
      if (!isSet(value)) return pending;
      return {
        status: "available",
        label: value.kind,
        url: value.url ?? undefined,
      };
    }
    case "PROOF_TERA": {
      const value = CONFIG.PROOF_TERA;
      return isSet(value) ? { status: "available", label: value } : pending;
    }
    case "PROOF_HOTEL": {
      const value = CONFIG.PROOF_HOTEL;
      return isSet(value)
        ? { status: "available", label: "Dashboard & notebook", url: value }
        : pending;
    }
    case "PROOF_BANKSAMPAH": {
      const value = CONFIG.PROOF_BANKSAMPAH;
      return isSet(value)
        ? { status: "available", label: "Screenshot dashboard", url: value }
        : pending;
    }
  }
}

/** Label kejujuran → nada badge. */
export function honestyTone(
  honesty: Project["honesty"],
): "accent" | "neutral" | "outline" {
  switch (honesty) {
    case "produksi":
      return "accent";
    case "produksi (production-ready)":
      return "neutral";
    default:
      return "outline";
  }
}
