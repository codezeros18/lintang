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
import type { OrgLogo } from "@/content/experience";
import type { StoryPhoto } from "@/content/story";

/**
 * Dokumentasi visual sebuah proyek (permintaan Lintang 2026-07-27).
 *
 * Dua laci terpisah, karena keduanya menjawab pertanyaan berbeda:
 * - `screenshots`  — tampilan produknya sendiri (dashboard, company profile, app).
 * - `documentation`— foto proses kerjanya (survei lapangan, rapat, foto bersama).
 *
 * **Maksimum 3 masing-masing.** Batas ini juga dipaksakan saat render
 * (`.slice(0, MAX_GALLERY_ITEMS)`), jadi kalau nanti terisi lebih, layoutnya
 * tidak jebol diam-diam. Laci yang kosong tidak dirender sama sekali.
 */
export const MAX_GALLERY_ITEMS = 3;

export type ProjectGallery = {
  screenshots: StoryPhoto[];
  documentation: StoryPhoto[];
};

/** Template kosong untuk proyek yang belum punya foto apa pun. */
export const emptyGallery: ProjectGallery = {
  screenshots: [],
  documentation: [],
};

export type ProofConfigKey =
  | "PROOF_ANKOP"
  | "PROOF_BISASINEMA"
  | "PROOF_TERA"
  | "PROOF_HOTEL"
  | "PROOF_BANKSAMPAH";

export type Project = {
  slug: string;
  name: string;
  /**
   * Singkatan 2–3 huruf untuk kotak penanda di kartu `/projects`.
   * Ditulis eksplisit supaya hasilnya masuk akal, bukan diturunkan otomatis.
   */
  short: string;
  /** Logo klien/produk; `null` = jatuh ke kotak singkatan `short`. */
  logo: OrgLogo | null;
  /** Screenshot produk + foto proses. Lihat `ProjectGallery`. */
  gallery: ProjectGallery;
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
  /**
   * Narasi panjang untuk halaman case study (R3).
   *
   * ATURAN: setiap kalimat di sini harus bisa ditelusuri ke CV atau BLUEPRINT §5.2.
   * Yang dinarasikan adalah **kendala dan keputusan yang terdokumentasi** — BUKAN
   * anekdot ("suatu malam sync-nya rusak dan saya…"), karena kejadian personal
   * semacam itu hanya Lintang yang tahu dan mengarangnya = memalsukan pengalaman.
   *
   * `undefined` → halaman jatuh ke struktur `problem` + `approach` seperti biasa.
   */
  narrative?: {
    intro: string[];
    sections: { heading: string; paragraphs: string[] }[];
  };
  /** Belum semua proyek punya token bukti sendiri di §0.1 (mis. Kuali). */
  proof?: {
    /** Token CONFIG yang menentukan bukti apa yang boleh ditampilkan. */
    configKey: ProofConfigKey;
    /** Rencana bukti — ditampilkan sebagai "bukti menyusul" selama token kosong. */
    pendingNote: string;
  };
  honesty:
    | "production"
    | "production-ready"
    | "hackathon"
    | "bootcamp"
    | "competition";
  lane: "fullstack" | "data" | "both";
  featured: boolean;
  order: number;
};

const ankopMonths = CONFIG.ANKOP_MONTHS;

export const projects: Project[] = [
  {
    slug: "ankop-trace",
    name: "Ankop Trace",
    short: "ANK",
    logo: { src: "ankop/logo.png", alt: "Anugrah Kopi Nusantara logo" },
    gallery: {
      screenshots: [
        {
          src: "ankop/mock1.png",
          alt: "Ankop Trace operations dashboard and the batch management screen, showing cherry intake through to warehouse across each batch's stages",
        },
      ],
      // Foto lapangannya pindah ke halaman PERAN `/experience/ankop`
      // (keputusan Lintang 2026-07-28) — isinya cerita tempat kerja, bukan
      // cerita produk. Case study ini menautkannya, tidak menyalinnya.
      documentation: [],
    },
    // Nama klien di CV: PT Anugrah Kopi Nusantara (Ankop).
    anonymousName: "A specialty coffee producer",
    tagline:
      "Offline-first coffee operations — from cherry intake to supplier payment, still running when the signal drops.",
    role: "Full-Stack Software Engineer",
    durationNote: "Jun 2026–present · Bandung",
    problem:
      "Coffee operations ran on paper and Excel. Signal regularly drops at the factory, so a weighing could simply be lost. Supplier payments were computed by hand and were not transparent to the people being paid.",
    approach: [
      "Offline-first: field inputs queue locally and auto-sync the moment the connection returns. Chosen because of a real field constraint — the signal at the factory genuinely cannot be relied on — not because the architecture is fashionable. The effect: no weighing is ever lost.",
      "NestJS + Prisma for a type-safe backend, because the pipeline is long and interdependent: cherry intake → fermentation → drying → hulling → sorting → warehouse → payment → owner reporting. One type error mid-chain is expensive.",
      "Docker + Railway so the deploy environment stays consistent and releases do not depend on anyone's machine.",
      "Payments auto-computed from accepted kilograms and then routed through approval, replacing the manual arithmetic that used to cause disputes — the owner gets real-time visibility with zero manual reports.",
      "A Workforce Scheduling and Anti-Fraud Attendance module with a full audit trail, so attendance and scheduling can be traced rather than merely recorded.",
    ],
    ownVsTeam: null, // TODO(lintang): CV tidak menyebut tim. Solo atau ada tim? Kalau tim, sebut porsimu.
    results: [
      // "5.000+ kg" WAJIB tampil bersama konteks waktu (§0.2). CV menyebut angkanya
      // tanpa rentang waktu, jadi selama `ANKOP_MONTHS` kosong angka ini disembunyikan.
      // TODO(lintang): isi ANKOP_MONTHS + ANKOP_KG_CUMULATIVE.
      ...(isSet(ankopMonths)
        ? [`5,000+ kg of coffee cherry tracked in the first ${ankopMonths} months since launch`]
        : []),
      "15+ active suppliers",
      "~80% acceptance rate (live)",
      "Tens of millions of rupiah in supplier payments digitized",
      "Automated weight-movement logs replaced manual Excel tracking",
    ],
    learned: null, // TODO(lintang): 1 pelajaran spesifik (mis. cara menyelesaikan konflik sync offline)
    tech: [
      "Next.js",
      "NestJS",
      "Prisma",
      "MySQL",
      "Docker",
      "Railway",
      "Offline-first",
    ],
    narrative: {
      intro: [
        "Ankop Trace is the system that took a specialty coffee producer off paper. I joined PT Anugrah Kopi Nusantara in June 2026 as their full-stack engineer, and the scope was the whole operation: from the moment cherry arrives at the gate to the moment a supplier gets paid.",
        "Before it existed, all of that lived in notebooks and spreadsheets.",
      ],
      sections: [
        {
          heading: "Why paper was expensive",
          paragraphs: [
            "Every weighing was written down by hand first and typed into Excel later. That gap sounds harmless until you follow what the number does next: the kilograms accepted at intake are what a supplier eventually gets paid for.",
            "So the cost of paper was not really inefficiency. It was trust. When the figure that decides someone's payment is copied twice before anyone can check it, the person being paid has no way to verify anything — they can only take your word for it.",
          ],
        },
        {
          heading: "The constraint I could not negotiate with",
          paragraphs: [
            "At the factory, the signal drops. Not occasionally — reliably enough that any design assuming a live connection would lose data on its first bad afternoon. A weighing that fails to save is not a failed request; it is a truck already unloaded and a number nobody can reconstruct.",
            "That single fact decided the architecture. Field inputs queue locally on the device and sync automatically the moment the connection returns, so no weighing is ever lost. I chose offline-first because of a constraint I could not argue with, not because the pattern was fashionable — and I would have chosen a simpler build if the site had reliable signal.",
          ],
        },
        {
          heading: "Why NestJS and Prisma, specifically",
          paragraphs: [
            "The pipeline is long and every stage feeds the next: cherry intake, fermentation, drying, hulling, sorting, warehouse, payment, then owner reporting. Eight stages, each inheriting the numbers from the one before it.",
            "In a chain like that, a type error rarely announces itself as a crash. It shows up much later as a wrong number in somebody's payment — which is the worst possible place to find a bug. NestJS plus Prisma gave me typed boundaries from the API down to the MySQL schema, so mismatches surface at build time instead of at payout time.",
            "Docker and Railway handle the deploys, which keeps releases independent of whichever machine happens to be around.",
          ],
        },
        {
          heading: "Payments people can actually check",
          paragraphs: [
            "Payments are computed automatically from the kilograms accepted, then routed through an approval step before anything is settled. The arithmetic that used to be done by hand — and used to be the source of disputes — is now the same calculation every time, visible to both sides.",
            "The owner gets real-time visibility with zero manual reports, and the automated weight-movement log replaced the Excel tracking entirely.",
          ],
        },
        {
          heading: "Attendance you can audit",
          paragraphs: [
            "I also designed a workforce scheduling and anti-fraud attendance module with a full audit trail — because in an operation where shifts and weighings both feed payroll, attendance records need to be traceable, not merely recorded.",
          ],
        },
      ],
    },
    proof: {
      configKey: "PROOF_ANKOP",
      pendingNote:
        "Planned evidence: annotated screenshots + a Loom walkthrough. The system is internal, so it needs client approval before anything is opened up.",
    },
    honesty: "production",
    lane: "fullstack",
    featured: true,
    order: 1,
  },
  {
    slug: "bisasinema",
    name: "Bisasinema",
    short: "BI",
    logo: { src: "bisasinema/logo.png", alt: "Bisasinema logo" },
    gallery: {
      screenshots: [
        {
          src: "bisasinema/mock1.png",
          alt: "The Bisasinema admin dashboard — users, revenue per product line and payment status — beside the course player a student sees",
        },
        {
          src: "bisasinema/mock2.png",
          alt: "The public Bisasinema site: the landing page and the three class formats — E-Course, Masterclass and Learning Lab",
        },
      ],
      // Idem: foto studio & tim ada di `/experience/bisasinema`.
      documentation: [],
    },
    anonymousName: "A film & education brand",
    tagline:
      "A learning-and-ticketing platform with live payments — a film brand's first digital presence.",
    role: "Tech Lead & Assistant Product Manager",
    durationNote: "Mar 2026–present · Tangerang",
    problem:
      "A film media and education brand had no digital presence at all, and no way to sell classes or tickets other than manually.",
    approach: [
      "Built a Coursera-style learning platform powering two products at once: the Filmmaking Lab (a one-week offline course) and Masterclass digital ticketing — from registration through checkout.",
      "Midtrans for live transactions: the payment flow had to actually take money securely, not just be a checkout button that ends in a manual bank transfer.",
      "An internal monitoring dashboard for payments and sales in real time, replacing the manual tracking that had been the only source of numbers.",
      "Technical SEO from the start, so organic discovery does not depend on ad spend.",
    ],
    ownVsTeam: null, // TODO(lintang): CV menulis "Led the end-to-end build" — kerja sendiri, atau memimpin tim? Sebut anggotanya bila ada.
    results: [
      "Rp20M+ in ticket sales at the early Learning Lab launch",
      "Top search visibility for core keywords — organic discovery without ads",
      "The brand's first digital presence, built from scratch",
    ],
    learned: null, // TODO(lintang): 1 pelajaran spesifik dari membangun & meluncurkan ini
    tech: ["React", "Tailwind CSS", "Express.js", "Midtrans", "Technical SEO"],
    proof: {
      configKey: "PROOF_BISASINEMA",
      pendingNote:
        "Planned evidence: the live URL if it can be shared, or annotated screenshots. Awaiting client approval.",
    },
    honesty: "production",
    lane: "fullstack",
    featured: true,
    order: 2,
  },
  {
    slug: "tera",
    name: "Tera",
    short: "TER",
    logo: null, // TODO(lintang): belum ada file logo di public/images/
    gallery: emptyGallery, // TODO(lintang): maks 3 screenshot + 3 foto dokumentasi
    tagline:
      "Multi-tenant SaaS for specialty-coffee export operations — data isolation enforced all the way down to the database.",
    role: "Full-Stack Engineer",
    durationNote: null, // TODO(lintang): durasi proyek Tera (CV tidak mencantumkannya)
    problem:
      "Specialty-coffee export operations put many parties inside one system. Tenants must never see each other's data, and every role — admin, field officer, procurement, CEO, viewer, Q-grader — needs different access.",
    approach: [
      "Three-layer access control: frontend route guards, role enforcement in the API, and PostgreSQL Row-Level Security. RLS is there so isolation still holds at the database level — if the API has a bug, another tenant's data still cannot be read.",
      "Self-serve signup with automated tenant provisioning, so onboarding a new tenant needs no manual intervention.",
      "Six role-gated dashboards, so each party sees exactly what concerns them.",
      "A transparent rule-based pricing engine following a weigh → price → WhatsApp flow, matching how field staff already work instead of forcing them onto a new tool.",
      "A harvest-to-buyer traceability timeline, so a lot's origin can be followed along the whole chain.",
    ],
    // CV mendaftarkan Tera di bagian PROJECTS tanpa menyebut tim — tapi "tidak disebut"
    // bukan berarti "sendirian", jadi tidak saya simpulkan.
    ownVsTeam: null, // TODO(lintang): Tera dikerjakan sendiri atau ada tim?
    results: [
      "6 role-gated dashboards (admin, field officer, procurement, CEO, viewer, Q-grader)",
      "Full multi-tenant data isolation (frontend, API, and RLS in the database)",
      "Automated tenant provisioning via self-serve signup",
      // TODO(lintang): apakah sudah ada tenant nyata / tenant berbayar?
    ],
    learned: null, // TODO(lintang): 1 pelajaran spesifik
    tech: ["Next.js 14", "FastAPI", "PostgreSQL 16", "Supabase", "RLS"],
    proof: {
      configKey: "PROOF_TERA",
      pendingNote:
        "Planned evidence: a written case study + a diagram of the layered access control. Until a public demo exists, no demo is linked.",
    },
    // §5.2: selama belum ada tenant berbayar, labelnya "production-ready" — bukan klaim produksi penuh.
    honesty: "production-ready",
    lane: "fullstack",
    featured: true,
    order: 3,
  },
  {
    slug: "hotel-cancellation-analysis",
    name: "Hotel Cancellation Analysis",
    short: "HCA",
    logo: null, // TODO(lintang): belum ada file logo di public/images/
    gallery: emptyGallery, // TODO(lintang): maks 3 screenshot + 3 foto dokumentasi
    tagline:
      "Finding why a hotel loses revenue to cancellations — and turning that into recommendations.",
    role: "Data analyst",
    durationNote: "National competition, 2025",
    problem:
      "A hotel was losing revenue to booking cancellations, but the drivers had not been identified, so nothing could be acted on.",
    approach: [
      "EDA on booking and cancellation patterns to find where the loss actually happens, not where it feels like it happens.",
      "Identified the drivers of revenue loss, so the recommendations attack causes rather than symptoms.",
      "Interactive dashboards + recommendations, so the findings could drive decisions instead of ending as a notebook.",
    ],
    ownVsTeam: null, // TODO(lintang): kompetisi ini diikuti sendiri atau tim?
    results: [
      "3rd Place, National — SurabayaDev Developer Battle 2025",
      "Recognized by the judges for strong storytelling and analytical depth",
    ],
    learned: null, // TODO(lintang): 1 pelajaran spesifik
    tech: ["Python", "Looker Studio", "Google Colab", "Figma"],
    award: "🥉 3rd Place, National — SurabayaDev 2025",
    proof: {
      configKey: "PROOF_HOTEL",
      pendingNote:
        "Planned evidence: a view-only Looker dashboard + the analysis notebook + the presentation deck.",
    },
    honesty: "competition",
    lane: "data",
    featured: true,
    order: 4,
  },

  // ——— Sekunder (§5.3): kartu kecil, bukan hero, tanpa halaman case study ———
  {
    slug: "kuali",
    name: "Kuali",
    short: "KUA",
    logo: null, // TODO(lintang): belum ada file logo di public/images/
    gallery: emptyGallery, // TODO(lintang): maks 3 screenshot + 3 foto dokumentasi
    tagline:
      "An AI ops assistant for WhatsApp-first culinary MSMEs — messy chats become structured orders.",
    role: "Team lead",
    durationNote: "Hackathon",
    problem:
      "Culinary MSMEs take orders through messy WhatsApp conversations, so the data is never clean and operations are hard to plan.",
    approach: [
      "An LLM parsing pipeline from chat to structured JSON, turning free-form messages into orders, payment reminders, ingredient/production planning, and daily recaps.",
      "Product architecture designed around WhatsApp, the channel the users already live in.",
    ],
    // CV: "Led a hackathon team building an AI assistant…"
    ownVsTeam:
      "Led the hackathon team; owned the LLM parsing pipeline design and the overall product architecture.",
    results: [],
    learned: null, // TODO(lintang): 1 pelajaran spesifik
    tech: ["Next.js", "Supabase", "LLM"],
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
    short: "BSD",
    logo: null, // TODO(lintang): belum ada file logo di public/images/
    gallery: emptyGallery, // TODO(lintang): maks 3 screenshot + 3 foto dokumentasi
    tagline:
      "Decision-ready dashboards for the CEO, built from raw sustainability and operations data.",
    role: "Data Scientist Intern",
    durationNote: "Jan 2026–Mar 2026 · virtual internship",
    problem:
      "Sustainability and operations data existed, but not in a form leadership could use to make fast decisions.",
    approach: [
      "Translated digital-transformation problems into measurable analytical objectives — so the analysis answers a decision instead of just showing charts.",
      "Exploration, cleaning, anomaly handling, and feature engineering to make the data trustworthy.",
      "Looker Studio monitoring dashboards aimed directly at the CEO's needs, plus final reports refined through stakeholder feedback.",
    ],
    ownVsTeam: null, // TODO(lintang): magang ini dikerjakan sendiri atau dalam tim?
    results: [],
    learned: null, // TODO(lintang): 1 pelajaran spesifik
    tech: ["Python", "Looker Studio", "Data Storytelling"],
    proof: {
      configKey: "PROOF_BANKSAMPAH",
      pendingNote: "Planned evidence: screenshots of the CEO dashboard.",
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
        ? { status: "available", label: "Dashboard screenshots", url: value }
        : pending;
    }
  }
}

/** Label kejujuran → nada badge. */
export function honestyTone(
  honesty: Project["honesty"],
): "accent" | "neutral" | "outline" {
  switch (honesty) {
    case "production":
      return "accent";
    case "production-ready":
      return "neutral";
    default:
      return "outline";
  }
}
