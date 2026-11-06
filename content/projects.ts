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
 * - Tambahan `tech[]` (untuk tech chip di kartu), `award` (medali), dan
 *   `anonymousName` (dipakai bila `CLIENT_NAME_PERMISSION === false`).
 *
 * Blok "Evidence" DIHAPUS 2026-07-28 (keputusan Lintang): angka di dashboard
 * Ankop & Bisasinema rahasia perusahaan dan disensor bahkan di mockup-nya,
 * jadi bukti publik memang tidak akan pernah ada. Menyimpan janji "bukti
 * menyusul" untuk sesuatu yang tidak akan menyusul lebih buruk daripada tidak
 * menjanjikannya sama sekali. Token `PROOF_*` ikut dihapus dari `config.ts`.
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
  /**
   * Label kejujuran status proyek.
   * - `production`       : dipakai bisnis nyata, uang/barang nyata bergerak.
   * - `production-ready` : selesai dibangun & teruji, belum ada pemakaian nyata.
   * - `in-development`   : sedang dibangun; sebagian modul belum jadi.
   *   (Ditambahkan 2026-11-07. Lintang: Macacih, AEI, Weigh to Go & Muara
   *   semuanya masih ia kerjakan → keempatnya `in-development`.)
   * - `on-hiatus`        : dihentikan sementara (Tera, keputusan Lintang
   *   2026-11-07: tertahan masalah riset & pengembangan).
   */
  honesty:
    | "production"
    | "production-ready"
    | "in-development"
    | "on-hiatus"
    | "hackathon"
    | "bootcamp"
    | "competition";
  /**
   * Proyek sekunder yang TETAP punya halaman case study (mis. Hotel Cancellation
   * Analysis setelah dipindah ke "Other projects" 2026-11-07 — halamannya
   * dirujuk dari lomba SurabayaDev, jadi tidak boleh hilang).
   */
  caseStudy?: boolean;
  /**
   * Peran yang ingin ditonjolkan sebagai chip di kartu & case study
   * (mis. "Founder · SaaS" untuk Muara & Weigh to Go — permintaan Lintang 2026-11-07).
   */
  highlight?: string;
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
    // Nama klien di CV terbaru (Nov 2026): CV Anugrah Kopi Nusantara (Ankop).
    anonymousName: "A specialty coffee producer",
    tagline:
      "Offline-first coffee operations — from cherry intake to supplier payment, still running when the signal drops.",
    role: "Full-Stack Software Engineer",
    durationNote: "Jun 2026–present · Bandung",
    problem:
      "Coffee operations ran on paper and Excel. Signal regularly drops at the factory, so a weighing could simply be lost. Supplier payments were computed by hand and were not transparent to the people being paid.",
    approach: [
      "Offline-first: field inputs queue locally and auto-sync the moment the connection returns. Chosen because of a real field constraint — the signal at the factory genuinely cannot be relied on — not because the architecture is fashionable. The effect: no weighing is ever lost.",
      "NestJS + Prisma for a type-safe backend, because the pipeline is long and interdependent — nine steps: cherry reception → fermentation → drying dome → dryer → huller → sorting → warehouse → farmer payment → owner report. One type error mid-chain is expensive.",
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
      "One live system covering all 9 steps, from cherry intake to warehouse and farmer payment — paper records and Excel reports retired",
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
        "Ankop Trace is the system that took a specialty coffee producer off paper. I joined CV Anugrah Kopi Nusantara in June 2026 as their full-stack engineer, and the scope was the whole operation: from the moment cherry arrives at the gate to the moment a supplier gets paid.",
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
            "The pipeline is long and every step feeds the next: cherry reception, fermentation, the drying dome, the dryer, hulling, sorting, warehouse, farmer payment, then the owner report. Nine steps, each inheriting the numbers from the one before it.",
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
      "One platform running four product lines for a film education brand — company profile, online courses, offline Masterclass ticketing and digital templates.",
    // CV terbaru (Nov 2026): "Tech Lead", Dec 2025 – Oct 2026.
    role: "Tech Lead",
    durationNote: "Dec 2025–Oct 2026 · Tangerang",
    problem:
      "A film education brand had an audience but no product surface of its own: no way to sell a course, a ticket or a template, and no way to see what was selling without stitching together manual reports.",
    approach: [
      "One system for four product lines — company profile, a Coursera-style online course LMS, offline Masterclass / Learning Lab ticketing, and digital templates — so members, transactions and income live in one place instead of four.",
      "The whole journey inside the system, from registration to checkout, including a one-week offline course (Filmmaking Lab) and Masterclass tickets.",
      "Two payment gateways (Midtrans and iPaymu) with promo codes, early-bird pricing and group pricing, so the commercial rules the team actually uses are handled by the system rather than by hand.",
      "A revenue dashboard showing members, transactions and income per product, replacing manual reports.",
      "Technical SEO from the start, so organic discovery and sign-ups do not depend on ad spend.",
    ],
    ownVsTeam: null, // TODO(lintang): kerja sendiri, atau memimpin tim? Sebut anggotanya bila ada.
    results: [
      // CV terbaru menulis Rp30M+ (versi lama Rp20M+). Kata "early" WAJIB ikut (§0.2).
      "Rp30M+ in early ticket sales from the Learning Lab launch alone",
      "Top search results for the brand, driving organic sign-ups",
      "Four product lines running on one platform",
    ],
    learned: null, // TODO(lintang): 1 pelajaran spesifik dari membangun & meluncurkan ini
    tech: [
      "React",
      "Tailwind CSS",
      "NestJS",
      "MySQL",
      "Midtrans",
      "Cloudflare R2",
      "Technical SEO",
      "Vercel",
      "Railway",
    ],
    honesty: "production",
    lane: "fullstack",
    featured: true,
    order: 2,
  },
  {
    // Sumber: CV terbaru + vault Obsidian `Projects/Macacih` (ringkasan sistem
    // per 25 Sep 2026). Klaim CV yang TIDAK cocok dengan vault sengaja tidak
    // dimasukkan dulu (pemesanan online + ambil di gerobak listrik, "launched")
    // — lihat PROGRESS_LOG 2026-11-07. TODO(lintang): konfirmasi status terbaru.
    slug: "macacih",
    name: "Macacih Digital OS",
    short: "MAC",
    logo: { src: "macacih/logo", alt: "Macacih logo" }, // ✅ file ada (2026-11-07)
    // Slot foto disiapkan; muncul otomatis begitu berkasnya ada (lib/photos.ts).
    // TODO(lintang): taruh mock1–3 (layar produk) di public/images/macacih/.
    gallery: {
      screenshots: [
        { src: "macacih/mock1", alt: "Macacih Digital OS — product screen" },
        { src: "macacih/mock2", alt: "Macacih Digital OS — product screen" },
        { src: "macacih/mock3", alt: "Macacih Digital OS — product screen" },
      ],
      // Foto proses kerja tinggal di halaman peran `/experience/macacih`.
      documentation: [],
    },
    anonymousName: "A campus matcha brand",
    tagline:
      "One ledger for every rupiah a matcha brand makes — campus booths, workshops, memberships and sponsorships — correctable, never hideable.",
    role: "Full-Stack Software Engineer",
    durationNote: "Sep 2026–present · Skystar Ventures, Tangerang",
    problem:
      "Macacih sells matcha through booths that move between campuses, paid workshops, campus sponsorships and brand collaborations. All of it ran on Excel, Google Forms, Instagram DMs and WhatsApp, so not a single sales record could be trusted: cash and stock differences were noticed but never recorded, and the high-value channels could never be compared with the booth.",
    approach: [
      "One money ledger, many source books. Every rupiah lives in one append-only ledger; orders, workshop bookings and partnership deals record what happened, and both are written in the same database transaction. Reports read only the ledger, so two tables can never claim the same number.",
      "Ledger before dashboard. Dashboards and memberships consume data; the booth produces it. Building the dashboard first would have produced an expensive Excel sheet filled in by hand, so the capture point came first.",
      "Offline-first booth capture where the tablet is never trusted with money. It sends only intent — variant, quantity, a unique entry id — and the server recalculates and freezes the price. A double submit still produces one order, and rejected entries land in a visible problem box instead of vanishing.",
      "Nothing blocks the cashier waiting on a payment webhook. The order is created before the gateway is called, so a timeout loses a QR code, never a sale. Midtrans handles online payments for workshops and memberships.",
      "Corrections without hiding: append-only records, a hash-chained audit trail and a mandatory reason for every edit — with the limit stated openly that the chain proves internal consistency, not anything to an outside party.",
      "Integer rupiah everywhere, and price, product name and discount snapshotted onto each order, so changing the menu tomorrow never rewrites yesterday's report.",
    ],
    ownVsTeam: null, // TODO(lintang): sendiri atau dengan tim? (vault tidak menyebutnya)
    results: [
      "Booth POS that works offline, a live order queue, digital receipts by QR, workshop ticketing with seat selection and QR check-in, a prepaid membership with loyalty points across channels, and an owner dashboard of revenue, stock and margin per channel and per event",
      "As of 25 Sep 2026: 22 of 25 planned sprints complete in code — 52 pages, 82 API endpoints, 54 database models, and 1,014 of 1,014 tests passing",
      "Not yet proven in the field at that point: no real crew shift and no real payment had run through it — every “done” meant built and tested, not used",
    ],
    learned:
      "The gap between built and used widens quietly. Twenty-two sprints in, not one real shift had run through the system. A real-world checkpoint has to block the next sprint, not sit politely beside it — which is the rule I carried into the next product.",
    tech: [
      "Next.js 15",
      "Prisma",
      "PostgreSQL 16",
      "Midtrans",
      "PWA",
      "IndexedDB (offline)",
      "Auth.js",
    ],
    // Lintang 2026-11-07: masih dikerjakan → in-development.
    honesty: "in-development",
    lane: "fullstack",
    featured: true,
    order: 3,
  },
  {
    // Sumber: CV terbaru + vault Obsidian `Projects/AEI` (kit snapshot 4 Nov 2026).
    slug: "aei-project-control",
    name: "AEI Project & Finance Control",
    short: "AEI",
    logo: { src: "aei/logo.png", alt: "Anugrah Energi Indonesia logo" },
    // TODO(lintang): taruh mock1–3 (layar produk / website baru) di public/images/aei/.
    gallery: {
      screenshots: [
        { src: "aei/mock1", alt: "AEI system — product screen" },
        { src: "aei/mock2", alt: "AEI system — product screen" },
        { src: "aei/mock3", alt: "AEI system — product screen" },
      ],
      documentation: [],
    },
    anonymousName: "A boiler contractor",
    tagline:
      "One system for a boiler contractor — company website, offline field reports, milestone billing, cost control and tax recaps, with access set for 8 roles.",
    role: "Full-Stack Software Engineer (contract)",
    durationNote: "Nov 2026–present · Tangerang",
    problem:
      "PT Anugrah Energi Indonesia builds and services industrial boilers. Its old company website had been compromised, and the work behind every project — field progress, milestone billing with down payments, retention and taxes, costs against budget — lived in separate places, so an invoice could go out incomplete or late, and directors saw progress only when someone compiled it.",
    approach: [
      "A rebuilt public website, fully separated from internal data and built static, with a quote-request form and SEO so new clients can find the company on Google.",
      "An offline field app: technicians send daily reports from plant areas where phones are not allowed, filling them in after leaving the work area. Reports become BoQ-weighted progress and a planned-versus-actual S-curve for the directors.",
      "A milestone billing engine written as pure functions and tested first — down payment, retention, income tax and VAT per milestone — so each invoice goes out complete, with its supporting documents bundled into one PDF.",
      "Cost control that checks purchase orders against the budget and surfaces variation work not yet billed.",
      "Tax recaps per period that prepare the data only. Filing stays with AEI's tax officer in Coretax — the system deliberately does not report to the tax office.",
      "Access scoped across exactly 8 roles, with an audit trail on every change.",
    ],
    ownVsTeam:
      "I lead the build of the system for AEI. The repository, hosting, storage and domain belong to the company.",
    results: [
      "Nov 2026: quote-request form, lead emails, contact and privacy pages, and 301 redirects from the old site built; go-live on AEI's own domain is the current step",
      "Office auth, file handling and notification groundwork in place; field reports, billing and cost control are the next stages of the plan",
    ],
    learned: null, // TODO(lintang): 1 pelajaran spesifik
    tech: ["Next.js", "PostgreSQL", "Prisma", "PWA", "Offline-first", "Railway"],
    // Modul intinya (lapangan, termin, biaya) masih dibangun.
    honesty: "in-development",
    lane: "fullstack",
    featured: true,
    order: 4,
  },
  {
    // Sumber: CV terbaru + vault Obsidian `Projects/Weigh to Go` (ringkasan per 30 Okt 2026).
    slug: "weigh-to-go",
    name: "Weigh to Go",
    short: "WTG",
    logo: { src: "weigh-to-go/logo", alt: "Weigh to Go logo" }, // ✅ file ada (2026-11-07)
    // TODO(lintang): taruh mock1–3 di public/images/weigh-to-go/ (dom1–3 untuk foto proses).
    gallery: {
      screenshots: [
        { src: "weigh-to-go/mock1", alt: "Weigh to Go — product screen" },
        { src: "weigh-to-go/mock2", alt: "Weigh to Go — product screen" },
        { src: "weigh-to-go/mock3", alt: "Weigh to Go — product screen" },
      ],
      documentation: [
        { src: "weigh-to-go/dom1", alt: "Building Weigh to Go" },
        { src: "weigh-to-go/dom2", alt: "Building Weigh to Go" },
        { src: "weigh-to-go/dom3", alt: "Building Weigh to Go" },
      ],
    },
    tagline:
      "A SaaS I founded: a purchasing planner for kitchens that cook for hundreds — next week's shopping list in rupiah and tomorrow's portion count, from headcounts, portion standards and the menu cycle.",
    role: "Founder",
    highlight: "Founder · SaaS",
    durationNote: "Oct 2026–present · started in UMN's Technopreneurship course",
    problem:
      "Institutional kitchens — boarding schools, pesantren, and caterers who buy their own ingredients — ask the same two questions every week: what do we buy, how much, and for how many rupiah; and every afternoon, how many portions do we cook tomorrow. The answers are worked out by hand, from memory.",
    approach: [
      "The purchase engine follows SPMI, the standard method for institutional food service taught in Indonesian nutrition programmes, filled with each kitchen's own numbers. Everything is deterministic integer math, rounded to real pack sizes — no AI anywhere near a number.",
      "Tests were written before the engine code, so every formula had a failing case waiting for it.",
      "A hard floor: tomorrow's suggestion never drops below the highest consumption of the past 14 days, because the product must never be the reason someone goes without a meal.",
      "A 21-day reverse trial that compares planned against actual purchases every week in shadow mode and sends the owner a simple weekly report.",
      "Each kitchen's data is kept separate with PostgreSQL row-level security, under a non-superuser runtime role, with isolation tests proven to fail before they were allowed to pass.",
      "Daily headcounts can be sent by chat through the WhatsApp Cloud API, so the kitchen does not have to open an app to report.",
    ],
    ownVsTeam: null, // TODO(lintang): founder sendiri, atau bersama tim NoLabs? Sebut porsimu.
    results: [
      "Deployed to production on Railway in Oct 2026",
      "As of 30 Oct 2026: 1,653 tests passing with none skipped, and 13 of 13 structural guards green",
      "Not proven with real users yet: the zero-assistance test with outsiders and one real kitchen running a full week are the next gates, and the WhatsApp channel is built but not live",
    ],
    learned:
      "I put real-world gates into this product as the lesson from Macacih — and still caught the sprints running past the first gate. Knowing a pattern is not the same as being protected from it; the gate has to actually stop the work.",
    tech: [
      "Next.js 15",
      "PostgreSQL 16",
      "Prisma",
      "RLS",
      "Midtrans",
      "WhatsApp Cloud API",
      "Railway",
    ],
    // Lintang 2026-11-07: masih dikerjakan → in-development (meski sudah ter-deploy).
    honesty: "in-development",
    lane: "fullstack",
    featured: true,
    order: 5,
  },
  {
    // Sumber: CV terbaru + vault Obsidian `Projects/Muara` (ringkasan per 27 Okt 2026).
    slug: "muara",
    name: "Muara",
    short: "MUA",
    logo: { src: "muara/logo", alt: "Muara logo" },
    // TODO(lintang): taruh mock1–3 di public/images/muara/ (dom1–3 untuk foto proses).
    gallery: {
      screenshots: [
        { src: "muara/mock1", alt: "Muara — product screen" },
        { src: "muara/mock2", alt: "Muara — product screen" },
        { src: "muara/mock3", alt: "Muara — product screen" },
      ],
      documentation: [
        { src: "muara/dom1", alt: "Building Muara" },
        { src: "muara/dom2", alt: "Building Muara" },
        { src: "muara/dom3", alt: "Building Muara" },
      ],
    },
    tagline:
      "A SaaS I founded: sales reports from Shopee, Tokopedia, TikTok Shop and Lazada combined into one traceable revenue number — so sellers know where they stand against the Rp500M tax threshold.",
    role: "Founder",
    highlight: "Founder · SaaS",
    durationNote: "Aug 2026–present · current direction since Oct 2026",
    problem:
      "Since 1 October 2026, marketplaces collect a 0.5% income tax from sellers, and the Rp500M exemption for individual sellers counts revenue across all their shops, not one at a time. Every marketplace only sees its own shop, reports come in different formats, and the usual answer is a hand-made Excel recap that cannot be traced back to anything.",
    approach: [
      "Deliberately not a tax app: Muara does not calculate tax owed, give advice or file anything. It is an honest, auditable adding machine, and every number can be traced back to its file, sheet and row.",
      "Report parsers that recognise each file format and stop when they meet an unknown one, instead of showing a wrong number.",
      "An LLM is used only to map unfamiliar report columns. It receives masked samples, so customer data never leaves the system, and a person approves every mapping before it is used.",
      "Files instead of marketplace API access, so sellers never have to hand a third party the keys to their shop.",
      "Data isolation and history enforced in the database itself: row-level security policies, append-only tables and triggers, rather than conventions in application code.",
    ],
    ownVsTeam: null, // TODO(lintang): founder sendiri atau ada tim?
    results: [
      "As of 27 Oct 2026: foundation, data security, the number engine, the generic parser, accounts with privacy consent, file intake, AI-assisted mapping with human approval, plans with an automatic 21-day trial, a public calculator and payments — built and tested, about 694 test cases",
      "Not yet able to show real numbers to users: the per-platform mapping rules are waiting on real report files from sellers",
    ],
    learned:
      "Five research phases judged the market and none judged me as the founder. I now check founder capacity before locking in any SaaS direction — it changed how I scoped this one.",
    tech: [
      "Next.js 15",
      "Prisma",
      "PostgreSQL 16",
      "RLS",
      "Claude API",
      "Auth.js",
      "Midtrans",
      "Railway",
    ],
    honesty: "in-development",
    lane: "fullstack",
    featured: true,
    order: 6,
  },
  {
    // Diperbarui 2026-11-07 dari vault Obsidian `Projects/Tera` (ringkasan per 14 Agu 2026).
    slug: "tera",
    name: "Tera",
    short: "TER",
    logo: { src: "tera/logo", alt: "Tera logo" },
    // TODO(lintang): taruh mock1–3 di public/images/tera/ bila ada.
    gallery: {
      screenshots: [
        { src: "tera/mock1", alt: "Tera — product screen" },
        { src: "tera/mock2", alt: "Tera — product screen" },
        { src: "tera/mock3", alt: "Tera — product screen" },
      ],
      documentation: [],
    },
    tagline:
      "Origin operations for small specialty-coffee exporters — accept or reject with a reason, weigh, price deterministically, and pay the farmer with proof on WhatsApp.",
    role: "Founder & full-stack engineer",
    durationNote: "2026 · on hiatus since Nov 2026",
    problem:
      "Small and mid-sized specialty-coffee exporters and processors (50–200 tonnes a year) set purchase prices ad hoc in Excel and WhatsApp groups, argue over weighings, and rarely know their true cherry-to-green-bean yield. The farmer at the other end often does not know why a delivery was rejected and has no proof of what they were paid.",
    approach: [
      "The way in is one loop — the intake settlement: cherry arrives, is accepted or rejected with a labelled reason, weighed, priced from a versioned rate chart, and paid, with the proof sent to the farmer's own WhatsApp.",
      "Two speeds by design. The capture side is one screen with four fields that works offline on a cheap phone over 2G, and structural tests fail if anyone adds a field to it. The decision side — procurement and admin — is allowed to be rich.",
      "Money rules that cannot drift: integer rupiah and integer grams, rate charts that a database trigger refuses to edit, and corrections recorded as a reversal plus a re-issue instead of a silent edit.",
      "Tenant isolation with row-level security forced on every table, under a non-superuser runtime role — because a superuser bypasses RLS and would make every isolation test pass falsely.",
      "AI never touches money: alerts are explicit statistics, and anything read by a machine still needs a human-approved amount.",
    ],
    ownVsTeam: null, // TODO(lintang): vault menyebutnya proyek solo-founder — konfirmasi sebelum ditulis.
    results: [
      "End-to-end checkpoint of the core intake-to-payment flow passed on 2 Aug 2026",
      "As of 14 Aug 2026: 34 tables, 165 API endpoints, 795 backend and 187 web tests, the pricing engine at 100% coverage, and 97.3% of the code tenant-agnostic",
      "Premium modules (ledger, advances, cash flow) stay locked until exporters outside the founder's own circle show they will pay",
      "On hiatus since Nov 2026 while the open research and development questions are worked out",
    ],
    learned:
      "A design partner who uses the system for free and has no pricing problem is not a future customer — it is a reference deployment. I wrote the disappointing interview down as it was and let it change the plan.",
    tech: ["Next.js 14", "FastAPI", "PostgreSQL 16", "Supabase", "RLS", "Alembic"],
    // Lintang 2026-11-07: Tera di-HIATUS dulu (masalah riset, pengembangan, dll).
    // Dipindah ke "Other projects"; case study tetap bisa dibuka.
    honesty: "on-hiatus",
    lane: "fullstack",
    featured: false,
    caseStudy: true,
    order: 7,
  },
  {
    slug: "hotel-cancellation-analysis",
    name: "Hotel Cancellation Analysis",
    short: "HCA",
    logo: null, // TODO(lintang): belum ada file logo di public/images/
    gallery: emptyGallery, // TODO(lintang): maks 3 screenshot + 3 foto dokumentasi
    tagline:
      "Finding why a hotel loses revenue to cancellations — and turning that into recommendations.",
    role: "Team leader · data analysis",
    durationNote: "National competition, 2025",
    problem:
      "A hotel was losing revenue to booking cancellations, but the drivers had not been identified, so nothing could be acted on.",
    approach: [
      "EDA on booking and cancellation patterns to find where the loss actually happens, not where it feels like it happens.",
      "Identified the drivers of revenue loss, so the recommendations attack causes rather than symptoms.",
      "Interactive dashboards + recommendations, so the findings could drive decisions instead of ending as a notebook.",
    ],
    // Lintang 2026-11-07: ia team leader di setiap lomba (tim CALON MANTU).
    ownVsTeam: "Team leader of team CALON MANTU.",
    results: [
      "3rd Place, National — SurabayaDev Developer Battle 2025",
      "Recognized by the judges for strong storytelling and analytical depth",
    ],
    learned: null, // TODO(lintang): 1 pelajaran spesifik
    tech: ["Python", "Looker Studio", "Google Colab", "Figma"],
    award: "🥉 3rd Place, National — SurabayaDev 2025",
    honesty: "competition",
    lane: "data",
    // Dipindah ke "Other projects" 2026-11-07 (permintaan Lintang). Halaman
    // case study-nya DIPERTAHANKAN karena dirujuk dari lomba SurabayaDev.
    featured: false,
    caseStudy: true,
    order: 8,
  },

  // ——— Sekunder (§5.3): kartu kecil, bukan hero (Hotel tetap punya case study) ———
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
    order: 9,
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
    honesty: "bootcamp",
    lane: "data",
    featured: false,
    order: 10,
  },
];

/**
 * Hero, urut: produksi dulu (Ankop → Bisasinema), lalu Macacih → AEI →
 * Weigh to Go → Muara (diperbarui 2026-11-07; Tera hiatus → Other). Beranda memajang 3 pertama.
 */
export const featuredProjects = projects
  .filter((project) => project.featured)
  .sort((a, b) => a.order - b.order);

/** Kartu kecil "Other projects" (§5.3). */
export const otherProjects = projects
  .filter((project) => !project.featured)
  .sort((a, b) => a.order - b.order);

/**
 * Proyek yang punya halaman `/projects/<slug>`: semua hero + sekunder yang
 * ditandai `caseStudy: true`. Urutannya = urutan tampil (dipakai "Next project").
 */
export const caseStudyProjects = [
  ...featuredProjects,
  ...otherProjects.filter((project) => project.caseStudy),
];

export function hasCaseStudy(project: Project): boolean {
  return caseStudyProjects.some((item) => item.slug === project.slug);
}

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
