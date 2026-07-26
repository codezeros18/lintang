# PORTFOLIO_BLUEPRINT.md
**Kebenaran tunggal · Portfolio Lintang Balakosa Ardhana**
Full-Stack Engineer (primary) · data = pembeda pendukung · Next.js + Vercel

> File ini adalah sumber kebenaran. `SPRINTS_AND_TRACKING.md`, `PROGRESS_LOG.md`, dan `EXECUTION_PROMPTS.md` merujuk ke sini.
> Aturan integritas: **jangan mengarang angka/klaim.** Semua data berasal dari CV. Yang belum pasti = token CONFIG + `// TODO(lintang)`.

---

## §0 — CONFIG / TODO

### 0.1 Token placeholder (JANGAN diisi tebakan — hanya Lintang yang tahu)
Diisi di `content/config.ts`. Sampai terisi, UI menampilkan nilai token apa adanya / menyembunyikan elemen terkait.

| Token | Untuk apa | Status | Catatan |
|---|---|---|---|
| `LINKEDIN_URL` | Semua link LinkedIn (hero, contact, footer, README) | ❌ TODO | CV `.docx` lama: teks `.../lintangbalakosa` tapi hyperlink mengarah `.../tinachi1`. **Klik-tes & pastikan URL asli.** |
| `ANKOP_MONTHS` | Konteks waktu angka Ankop ("dalam X bulan pertama") | ❌ TODO | Ankop mulai Jun 2026. |
| `ANKOP_KG_CUMULATIVE` | Apakah "5.000+ kg" kumulatif sejak live? (boolean) | ❌ TODO | Menentukan kalimat hasil. |
| `PROOF_ANKOP` | Jenis bukti: `live` \| `repo` \| `screenshot` \| `loom` | ❌ TODO | + izin nama klien Ankop. |
| `PROOF_BISASINEMA` | Jenis bukti + URL live bila ada | ❌ TODO | + izin nama klien Bisasinema. |
| `PROOF_TERA` | `live` \| `screenshot` \| `writeup` | ❌ TODO | Bila belum ada tenant bayar → label "production-ready project". |
| `PROOF_HOTEL` | Link Looker view-only / notebook GitHub | ❌ TODO | — |
| `PROOF_BANKSAMPAH` | Screenshot dashboard CEO | ❌ TODO | Virtual internship. |
| `CLIENT_NAME_PERMISSION` | Boleh sebut nama Bisasinema/Ankop? (boolean) | ❌ TODO | Bila `false` → anonimkan ("produsen kopi specialty", "brand film & edukasi"). |
| `CV_FILE` | PDF CV di `public/cv/` | ❌ TODO | Untuk tombol Download CV. |
| `PHOTO_FILE` | Foto profil di `public/images/` | ❌ TODO | Foto profesional. |
| `DOMAIN` | Custom domain | 🟡 default | Disarankan `lintangbalakosa.dev`. |
| `IO_FESTIVAL_DATE` | Tanggal I/O Festival (seed Log post) | ❌ TODO | — |
| `IO_FESTIVAL_STACK` | Stack proyek I/O Festival | ❌ TODO | — |

### 0.2 Angka yang SUDAH FAKTA dari CV — WAJIB diberi konteks waktu, dilarang dilebih-lebihkan
| Angka [FAKTA] | Sumber CV | Aturan tampil |
|---|---|---|
| **Rp20jt+** penjualan tiket awal | Bisasinema | Selalu sertakan kata **"awal / peluncuran awal"**. |
| **5.000+ kg** kopi dilacak | Ankop Trace | Tampilkan dengan `ANKOP_MONTHS`: "dalam X bulan pertama sejak live". |
| **15+** supplier aktif | Ankop Trace | Apa adanya. |
| **~80%** acceptance rate | Ankop Trace | Tandai "live". |
| **puluhan juta rupiah** pembayaran supplier terdigitalisasi | Ankop Trace | Apa adanya (jangan konversi ke angka spesifik). |
| **6** dashboard role-gated | Tera | Apa adanya. |
| 🥇 Juara 1 Nasional I/O Festival · 🥉 Juara 3 Nasional SurabayaDev 2025 · 🥈 Juara 2 Internal CIMB Niaga | Achievements | Apa adanya. |
| **Associate Data Scientist (Competent) — BNSP** · Data Science Bootcamp (Excellent Graduate) | Certifications | Di About/kredensial, bukan hero. |

---

## §1 — POSITIONING & NARASI PROBLEM→SOLUSI

**Positioning terkunci:** Full-Stack Engineer PRIMARY; data = pembeda pendukung. Hero **tanpa** kata "hybrid" dan **tanpa** menaruh "Data Scientist" sejajar "Full-Stack". "Associate Data Scientist (BNSP)" muncul di About.

**Problem tingkat-situs (untuk employer):** Startup/UMKM butuh satu orang yang bisa **membangun sistem produksi yang benar-benar dipakai** *dan* **membaca datanya untuk keputusan** — tanpa dua headcount. Mayoritas fresh-grad hanya bisa satu sisi, sering baru level tutorial.

**Solusi tingkat-situs:** Lintang sudah menaruh sistem produksi nyata (payment live, offline-first, multi-tenant) yang memindahkan uang & barang, lalu membuktikan dampaknya lewat data — sejak kuliah. **Bukti di atas klaim.**

**Peta problem→solusi per hero:**

| Hero | Problem nyata | Solusi/keputusan | Skill dibuktikan | Sinyal recruiter |
|---|---|---|---|---|
| Ankop Trace | Ops kopi di atas kertas/Excel; sinyal drop di pabrik → penimbangan hilang; pembayaran supplier manual | Offline-first (antre lokal + auto-sync); pembayaran auto-computed | Offline-first, NestJS/Prisma/Docker, end-to-end | Selesaikan constraint dunia nyata; ownership |
| Bisasinema | Brand film/edukasi tanpa presence digital & cara jual tiket/kelas | Platform ala Coursera + ticketing; Midtrans live; dashboard monitoring; SEO | Payment, product build, SEO | Bikin produk yang menghasilkan uang |
| Tera | Ops ekspor multi-pihak butuh isolasi data & akses per-peran | 3-layer access control (route guard + API + PostgreSQL RLS); 6 dashboard | Multi-tenant/RLS, judgment | Judgment arsitektur di atas fresh-grad |
| Analisis Hotel (Juara 3 SurabayaDev) | Hotel rugi karena pembatalan; driver tak teridentifikasi | EDA → identifikasi driver → dashboard + rekomendasi | EDA, storytelling, Looker | Ubah data jadi keputusan; tervalidasi nasional |

---

## §2 — SITEMAP / IA

| Route | Section (one-page) | Tujuan | MVP / Fast-follow |
|---|---|---|---|
| `/` | Hero | Lolos uji 8 detik (Fullstack + angka) | **MVP** |
| `/` | Featured Projects (4) | Bukti dalam | **MVP** |
| `/` | About | Arc + kredensial BNSP | **MVP** |
| `/` | Skills | Jujur + terhubung bukti | **MVP** |
| `/` | Experience & Achievements | Kredibilitas | **MVP** |
| `/` | Log / Activity (teaser + link) | Tunjukkan aktif | **Fast-follow (S7)** |
| `/` | Contact | Konversi | **MVP** |
| `/projects/[slug]` | Case study detail | Problem→keputusan→hasil | **MVP** (min. `ankop-trace`) |
| `/log` | Daftar post | Aktif & konsisten | **Fast-follow (S7)** |
| `/log/[slug]` | Post detail (MDX) | Substansi + CTA kolaborasi | **Fast-follow (S7)** |

**Urutan (target primer startup):** bukti dulu → Featured Projects langsung setelah hero, sebelum About. Tombol `Lihat proyek` + `Download CV` sudah ada di hero (konversi tak menunggu scroll).

---

## §3 — DESIGN SYSTEM

### 3.1 Tipografi (BUKAN Poppins/Inter)

> ⚠️ **OVERRIDE 2026-07-26 (keputusan Lintang):** situs kini memakai keluarga **Geist**
> (Geist Sans untuk display + body, Geist Mono untuk angka/chip) menggantikan
> Space Grotesk / Satoshi+DM Sans / Space Mono di bawah. Spesifikasi asli sengaja
> **tidak dihapus** supaya niat desain awalnya tetap terbaca dan mudah dikembalikan.
> Detail & konsekuensinya: `docs/DESIGN_LANGUAGE.md` §2.2.
- **Display/headings:** Space Grotesk — `next/font/google`.
- **Body:** Satoshi — `next/font/local` (Fontshare). **Fallback DM Sans** (`next/font/google`) agar build tak blok bila file Satoshi belum ada.
- **Angka hook / tech chips / kode:** Space Mono — `next/font/google`.
- Maks 2 keluarga + 1 mono. *(Opsional fase polish: upgrade display ke Clash Display via `next/font/local`.)*

`lib/fonts.ts`:
```ts
import { Space_Grotesk, Space_Mono, DM_Sans } from "next/font/google";
import localFont from "next/font/local";

export const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
export const mono = Space_Mono({ subsets: ["latin"], weight: ["400","700"], variable: "--font-mono", display: "swap" });
// Fallback body (selalu ada):
export const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-body-fallback", display: "swap" });
// Body utama (letakkan file di /public/fonts atau /app/fonts; jika belum ada, biarkan var fallback yang menang):
export const satoshi = localFont({
  src: [
    { path: "../public/fonts/Satoshi-Variable.woff2", weight: "300 900", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
});
// NOTE(claude-code): jika file Satoshi belum ada, JANGAN gagalkan build —
// pakai hanya dmSans.variable di <html> dan set --font-body: var(--font-body-fallback).
```

### 3.2 Palet & CSS variables (terang-profesional; dark = fast-follow)
`app/globals.css`:
```css
:root {
  --paper: #FBFAF7;       /* background warm paper */
  --ink: #14141A;         /* teks utama */
  --ink-muted: #55555F;   /* teks sekunder */
  --border: #E6E3DC;      /* garis warm */
  --card: #FFFFFF;        /* permukaan kartu */
  --indigo: #3D5AFE;      /* aksen utama */
  --coral: #FF6A3D;       /* aksen kedua — HEMAT (CTA/hover kecil saja) */
  --accent: var(--indigo);

  --radius: 14px;
  --shadow-soft: 0 1px 2px rgba(20,20,26,.04), 0 8px 24px rgba(20,20,26,.06);
  --maxw: 1120px;
}
* { border-color: var(--border); }
body { background: var(--paper); color: var(--ink);
  font-family: var(--font-body, var(--font-body-fallback)), system-ui, sans-serif; }
h1,h2,h3 { font-family: var(--font-display), system-ui, sans-serif; letter-spacing: -0.02em; }
.mono, .stat-num { font-family: var(--font-mono), ui-monospace, monospace; }
```

### 3.3 Type-scale (clamp) & spacing
```css
--step--1: clamp(.83rem, .78rem + .2vw, .94rem);
--step-0 : clamp(1rem, .95rem + .3vw, 1.13rem);
--step-1 : clamp(1.25rem, 1.1rem + .6vw, 1.6rem);
--step-2 : clamp(1.6rem, 1.3rem + 1.2vw, 2.4rem);
--step-3 : clamp(2rem, 1.5rem + 2.5vw, 3.4rem);
--step-4 : clamp(2.6rem, 1.8rem + 4vw, 4.6rem);  /* hero display */
```
Spacing: skala 4px (`gap-2/4/6/8`, section padding `py-20 md:py-28`). Radius `var(--radius)`. Shadow `var(--shadow-soft)`.

### 3.4 Animasi Framer Motion (memperkuat pesan, bukan gimmick)
- **Reveal** (`components/motion/Reveal.tsx`): `initial {opacity:0, y:16}` → `whileInView {opacity:1, y:0}`, `viewport {once:true, margin:"-10%"}`, `transition {duration:.5, ease:[.22,1,.36,1]}`.
- **Stagger** (`Stagger.tsx`): parent `staggerChildren:.08` untuk grid kartu.
- **Hover-lift** kartu: `whileHover {y:-4}` + shadow naik.
- **CountUp** hook (`CountUp.tsx`) untuk angka hero — **opsional**, hanya bila `!prefers-reduced-motion`.
- **Buang:** parallax, 3D, custom cursor, sound, page-transition berat.
- **Reduced motion (WAJIB):**
```ts
import { useReducedMotion } from "framer-motion";
// jika shouldReduceMotion → render tanpa transform/opacity animation (tampilkan final state).
```
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration:.001ms!important; transition-duration:.001ms!important; }
}
```

---

## §4 — NASKAH JADI-PAKAI (data nyata CV)

### 4.1 Hero
- **Role label:** `Full-Stack Engineer · Informatika UMN`
- **Headline (utama):** Saya membangun sistem yang dipakai bisnis nyata — dan membuktikan dampaknya lewat data.
- **Headline (varian engineer-forward):** Full-stack engineer yang menaruh produk ke produksi, bukan cuma ke localhost.
- **Sub-headline:** Mahasiswa Informatika UMN yang sudah nge-ship sistem produksi — payment live, offline-first, multi-tenant — yang memindahkan uang dan barang nyata.
- **Hook strip (3 stat, angka pakai Space Mono):**
  `Rp20jt+` transaksi (peluncuran awal) · `5.000+ kg` kopi dilacak {{ANKOP_MONTHS ? "dalam "+ANKOP_MONTHS+" bulan pertama" : "// TODO(lintang): konteks waktu"}} · `6` dashboard role-gated
- **Tombol:** primary `Lihat proyek` · secondary `Download CV` · (opsional) `Hubungi`

### 4.2 About — ±60 kata
> Saya Lintang, full-stack engineer dan mahasiswa Informatika UMN. Berawal dari SMK RPL, saya tidak berhenti di proyek kelas — saya membangun yang benar-benar dipakai: sistem operasi kopi offline-first yang melacak 5.000+ kg, platform belajar-dan-tiket dengan pembayaran live, dan SaaS multi-tenant. Lalu saya buktikan dampaknya lewat data. Prinsip saya: bangun yang dipakai orang, buktikan dampaknya.

### 4.3 About — ±120 kata
> Saya Lintang Balakosa Ardhana, full-stack engineer dan mahasiswa Informatika UMN. Jalannya dimulai dari SMK RPL dan magang frontend di lingkungan produksi sejak 2023, lalu diperdalam lewat Data Science Bootcamp (Excellent Graduate) dan sertifikasi **Associate Data Scientist (BNSP)**.
>
> Alih-alih berhenti di proyek kelas, saya membangun sistem yang dipakai orang: Ankop Trace — ops kopi offline-first yang melacak 5.000+ kg dan mendigitalkan pembayaran supplier; Bisasinema — platform belajar-dan-tiket dengan pembayaran Midtrans live (Rp20jt+ penjualan awal); dan Tera — SaaS multi-tenant dengan isolasi data berlapis.
>
> Lalu saya membuktikan dampaknya lewat data — dashboard keputusan untuk pimpinan, dan analisis yang membawa juara nasional. Benang merahnya: **bangun yang dipakai orang, lalu buktikan dampaknya lewat data.**

### 4.4 Skills (grup → 1 proyek bukti)
| Grup | Isi | Dipakai di |
|---|---|---|
| Languages | Python, SQL (MySQL/PostgreSQL), JavaScript, TypeScript | Ankop & Tera |
| Frontend | React, Next.js, Tailwind CSS, React Native *(basic)* | Bisasinema & Tera; RN basic → Juara 2 CIMB Niaga |
| Backend & API | FastAPI, NestJS, Node.js, Express.js, REST, integrasi LLM (OpenAI/Anthropic) | NestJS di Ankop · FastAPI di Tera · LLM di Kuali |
| Data & ML | EDA, cleaning, feature engineering, predictive modeling, regression/classification; Pandas, NumPy, Scikit-learn; Looker Studio | Analisis Hotel & Bank Sampah |
| Database & Arsitektur | PostgreSQL, MySQL, Prisma, Supabase, multi-tenant (RLS) | RLS 6-role di Tera · Prisma di Ankop |
| DevOps & Integrasi | Docker, Vercel, Railway, GitHub, Midtrans, Technical SEO | Docker/Railway di Ankop · Midtrans & SEO di Bisasinema |

*Kejujuran level: React Native = **basic** (eksplisit).*

### 4.5 Contact
> Terbuka untuk peran **full-stack** (dan proyek yang butuh sisi data). Paling cepat lewat email.
> 📧 lintangbalakosa@gmail.com · 💼 {{LINKEDIN_URL}} · 🐙 github.com/codezeros18 · `Download CV`

### 4.6 Micro-copy anti-salah-baca
> Fokus saya full-stack engineering; kemampuan data adalah **pembeda, bukan pengalih** — saya membangun sistemnya, lalu membaca datanya.

---

## §5 — CASE STUDIES (terstruktur)

### 5.1 Skema field (`content/projects.ts`)
```ts
export type Project = {
  slug: string;
  name: string;
  tagline: string;
  role: string;
  durationNote: string;      // termasuk konteks waktu angka
  problem: string;
  approach: string[];        // keputusan teknis + KENAPA
  ownVsTeam: string;         // jujur
  results: string[];         // [FAKTA] + konteks waktu
  learned: string;
  proof: { live?: string; repo?: string; media?: string[] }; // etis; jangan pura-pura
  honesty: "produksi" | "hackathon" | "bootcamp" | "kompetisi" | "produksi (production-ready)";
  lane: "fullstack" | "data" | "both";
  featured: boolean;
  order: number;
};
```

### 5.2 Isi 4 hero (urutan: Ankop → Bisasinema → Tera → Analisis Hotel)

**1. Ankop Trace** — `slug: ankop-trace`
- Role/durasi: Full-Stack Software Engineer · Jun 2026–sekarang. Angka = akumulasi sejak live `// TODO(lintang): ANKOP_MONTHS`.
- Problem: ops kopi di atas kertas/Excel; sinyal drop di pabrik → penimbangan bisa hilang; pembayaran supplier manual & tak transparan.
- Approach: (1) offline-first — input antre lokal, auto-sync saat koneksi balik (dipilih karena constraint lapangan, bukan tren); (2) NestJS + Prisma untuk backend type-safe di alur kompleks (intake→fermentasi→drying→hulling→sorting→warehouse→payment→reporting); (3) Docker + Railway untuk deploy konsisten; (4) pembayaran auto-computed dari kg diterima + approval.
- ownVsTeam: `// TODO(lintang): solo atau tim?`
- results: 5.000+ kg dilacak (`ANKOP_KG_CUMULATIVE`?) · 15+ supplier aktif · ~80% acceptance rate (live) · puluhan juta rupiah pembayaran terdigitalisasi.
- learned: `// TODO(lintang): 1 pelajaran spesifik (mis. konflik sync offline)`.
- proof: `PROOF_ANKOP` → default screenshot beranotasi + Loom (kemungkinan internal). `// izin Ankop`.
- honesty: **produksi**.

**2. Bisasinema** — `slug: bisasinema`
- Role/durasi: Tech Lead & Assistant Product Manager · Mar 2026–sekarang.
- Problem: brand film & edukasi belum punya presence digital & cara jual kelas/tiket.
- Approach: platform ala Coursera (Filmmaking Lab + Masterclass); Midtrans untuk transaksi live & aman; dashboard monitoring internal (real-time payments/sales, ganti tracking manual); technical SEO untuk discovery organik. Stack React/Tailwind/Express.
- ownVsTeam: `// TODO(lintang)` ("Led end-to-end build" → ownership; sebut tim bila ada).
- results: **Rp20jt+ penjualan tiket awal** (peluncuran Learning Lab) · top search visibility keyword inti. *Pertahankan "awal".*
- learned: `// TODO(lintang)`.
- proof: `PROOF_BISASINEMA` (live URL? `// izin Bisasinema`).
- honesty: **produksi**.

**3. Tera** — `slug: tera`
- Role/durasi: `// TODO(lintang): solo project? durasi?`
- Problem: ops ekspor multi-pihak butuh isolasi data antar-tenant + akses per-peran (admin, field officer, procurement, CEO, viewer, Q-grader).
- Approach: 3-layer access control (frontend route guard + API role enforcement + PostgreSQL RLS) — RLS agar isolasi ditegakkan di level database; 6 dashboard role-gated; rule-based pricing engine (weigh→price→WhatsApp) + traceability harvest-to-buyer. Stack Next.js 14 + FastAPI + PostgreSQL 16 + Supabase.
- results: 6 role-gated dashboards · isolasi multi-tenant penuh. `// TODO(lintang): ada tenant nyata?`
- proof: `PROOF_TERA` → bila tak ada demo publik: studi kasus tertulis + screenshot diagram akses berlapis. Jangan klaim demo.
- honesty: **produksi (production-ready)** bila belum ada tenant bayar.

**4. Analisis Pembatalan Hotel** — `slug: analisis-pembatalan-hotel` — 🥉 Juara 3 Nasional SurabayaDev 2025
*(Gabungan "Proactive Cancellation Management" + medali SurabayaDev = SATU case study. Anti double-count.)*
- Role/durasi: analis data · kompetisi nasional 2025.
- Problem: hotel rugi karena pembatalan; driver tak teridentifikasi.
- Approach: EDA pola booking/cancellation → identifikasi driver revenue loss → dashboard interaktif + rekomendasi. Python, Looker Studio, Colab, Figma.
- results: **Juara 3 Nasional**; diakui kuat storytelling & kedalaman analisis.
- proof: `PROOF_HOTEL` (Looker view-only + notebook + slide).
- honesty: **kompetisi**.

### 5.3 Sekunder (kartu kecil "Other projects", bukan hero)
- **Kuali** — AI ops assistant WhatsApp; LLM chat→JSON pipeline; product architecture. honesty: **hackathon**.
- **Bank Sampah Digital** — dashboard CEO Looker Studio; EDA/cleaning/feature engineering. proof: `PROOF_BANKSAMPAH`. honesty: **bootcamp/virtual internship**.

---

## §6 — SPEC LOG (fast-follow, S7)

**Arsitektur:** Git-based **MDX / SSG** (`next-mdx-remote` atau Contentlayer). Tambah post = file `.mdx` + `git push` → Vercel auto-redeploy. **Tanpa backend/DB berbayar.** (Notion CMS = alternatif hanya bila mau posting dari HP; tidak untuk v1.)

**Frontmatter:**
```yaml
---
title: ""
date: ""              # YYYY-MM-DD
type: ""              # lomba | event | proyek
role: ""
stack: []
result: ""            # menang | kalah | ikut
lesson: ""
teaser: true          # true = ide inti dikaburkan
cta: "Konsep lengkap belum dibuka — hubungi saya untuk kolaborasi."
---
```

**Format post (substansi + ide dikaburkan + CTA):** Konteks · Peran · Yang dibangun (konkret sampai batas aman) · Stack/skill · **1 pelajaran** · ide inti dikaburkan + CTA kolaborasi. **Wajib ada minimal 1 post `result: kalah|ikut`** berframing pelajaran (bukan daftar kekalahan).

**Seed 3 post saat launch** (jangan feed kosong):
1. `io-festival.mdx` (menang) — contoh terisi di bawah.
2. `surabayadev.mdx` (menang, tapi bisa diframing "yang saya pelajari").
3. `// TODO(lintang)`: 1 post `kalah`/`ikut` dari event nyata di luar CV.

**Contoh seed `content/log/io-festival.mdx`:**
```mdx
---
title: "Juara 1 Nasional — I/O Festival"
date: "{{IO_FESTIVAL_DATE}}"   # // TODO(lintang)
type: "lomba"
role: "Builder — platform B2B circular economy"
stack: {{IO_FESTIVAL_STACK}}   # // TODO(lintang)
result: "menang"
lesson: "Menang bukan karena fitur terbanyak, tapi karena masalahnya paling jelas didefinisikan."
teaser: true
cta: "Konsep lengkap belum dibuka — hubungi saya untuk kolaborasi."
---

**Konteks.** Kompetisi tingkat nasional bertema ekonomi sirkular.
**Peran saya.** Membangun platform **B2B** dari sisi produk dan implementasi.
**Yang saya kerjakan.** Merancang alur B2B yang menghubungkan pihak-pihak dalam rantai ekonomi sirkular, membangun antarmuka dan logika inti sampai bisa didemokan langsung ke juri.
**1 pelajaran.** {frontmatter.lesson} — sesuatu yang sekarang saya bawa ke setiap proyek.
**Ide inti sengaja dikaburkan.** Mekanisme bisnis utamanya belum saya buka di sini.

> → Tertarik konsep lengkapnya? **[Hubungi saya untuk kolaborasi.](/#contact)**
```

**Ritme:** 1–2 post/bulan atau tiap event/milestone. Jangan janji mingguan. **UI ringan:** list kartu (title · date · badge type · badge result · 1 baris teaser); filter `type` opsional.

---

## §7 — SEO / OG / DISTRIBUSI 1-URL

- **Title:** `Lintang Balakosa Ardhana — Full-Stack Engineer`
- **Meta desc:** Full-stack engineer (Next.js, NestJS, FastAPI) yang membangun sistem produksi nyata — offline-first, multi-tenant, payment live — dan membuktikan dampaknya lewat data. Mahasiswa Informatika UMN, Indonesia.
- **Kata kunci natural (no stuffing):** full-stack, Next.js, NestJS, FastAPI, offline-first, multi-tenant, RLS, AI/LLM, data, Indonesia, magang/internship.
- **OG image** (`app/opengraph-image.tsx`, generate via `next/og`): nama + role + hook strip (Rp20jt+ · 5.000+ kg · 6 dashboards) + foto; teks besar terbaca di thumbnail chat.
- **Wajib:** `sitemap.ts`, `robots.ts`, favicon, meta/title per halaman, **Vercel Analytics**.
- **Peta pasang URL:** LinkedIn (headline/Featured/About) · kolom portofolio Glints/Kalibrr/Dealls · DM lamaran IG · aplikasi MSIB · header CV PDF · GitHub profil+repo. Nama **"Lintang Balakosa Ardhana"** identik lintas kanal (ATS).

---

## §8 — ARSITEKTUR & STRUKTUR FOLDER
```
portfolio/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                 # one-page: Hero→Projects→About→Skills→Exp→(Log teaser)→Contact
│   ├── globals.css
│   ├── opengraph-image.tsx
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── projects/[slug]/page.tsx # case study (SSG generateStaticParams)
│   └── log/                     # S7 fast-follow
│       ├── page.tsx
│       └── [slug]/page.tsx
├── components/
│   ├── sections/                # Hero, FeaturedProjects, About, Skills, ExperienceAchievements, Contact, LogTeaser(S7)
│   ├── ui/                      # Button, Card, Badge, SectionHeading (shadcn/ui + custom)
│   └── motion/                  # Reveal, Stagger, CountUp
├── content/
│   ├── config.ts                # CONFIG tokens (§0)
│   ├── projects.ts              # data 4 hero + 2 sekunder (dari CV)
│   ├── skills.ts
│   ├── experience.ts
│   └── log/                     # S7 MDX posts (io-festival.mdx, ...)
├── lib/
│   ├── fonts.ts                 # Space Grotesk, Satoshi(local)+DM Sans, Space Mono
│   ├── seo.ts                   # metadata helper
│   └── mdx.ts                   # S7
├── public/
│   ├── cv/                      # CV PDF (CV_FILE)
│   ├── fonts/                   # Satoshi-Variable.woff2 (bila ada)
│   └── images/                  # foto (PHOTO_FILE), screenshot proyek
├── tailwind.config.ts
├── tsconfig.json                # strict: true
├── next.config.mjs
├── package.json
├── PORTFOLIO_BLUEPRINT.md
├── SPRINTS_AND_TRACKING.md
├── PROGRESS_LOG.md
└── EXECUTION_PROMPTS.md
```

---

## §9 — DEFINISI SUKSES (situs "jadi")
- [ ] Hero lolos uji 8 detik (Full-Stack + angka; data tidak di hero)
- [ ] 4 kartu Featured; **minimal `ankop-trace` punya halaman case study lengkap**
- [ ] Tiap proyek punya bukti sesuai `PROOF_*` (etis; tak ada demo palsu)
- [ ] Semua angka tampil dengan konteks waktu; tak ada overclaim
- [ ] About memuat kredensial BNSP; micro-copy anti-salah-baca ada
- [ ] Skills jujur (React Native = basic)
- [ ] Contact: email + `LINKEDIN_URL`(fixed) + GitHub + Download CV
- [ ] Analisis Hotel = 1 case study (tidak double-count)
- [ ] Responsive 360px→desktop · **Lighthouse mobile ≥90 · LCP <2s** · a11y AA · `prefers-reduced-motion` dihormati
- [ ] SEO/OG/sitemap/robots/favicon + Vercel Analytics aktif
- [ ] Tak ada token CONFIG bocor ke UI final (semua terisi atau elemen disembunyikan)
- [ ] Deploy Vercel + custom domain + HTTPS; broken link (khusus LinkedIn) dicek; **diuji di HP asli**
- [ ] Paralel: LinkedIn diperbaiki + GitHub (6 pin + README) beres
```
