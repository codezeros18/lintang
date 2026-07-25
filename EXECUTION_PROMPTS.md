# EXECUTION_PROMPTS.md
**Prompt siap-copy PER sprint untuk Claude Code · Portfolio Lintang Balakosa Ardhana**

> Cara pakai: taruh 4 file (`PORTFOLIO_BLUEPRINT.md`, `SPRINTS_AND_TRACKING.md`, `PROGRESS_LOG.md`, `EXECUTION_PROMPTS.md`) di root repo → buka VS Code → jalankan **PROMPT 0** → lalu **S1…S7 satu per satu**.
> Prinsip: agen mengerjakan **hanya scope sprint itu**, lalu **centang tracking + set ✅ + tulis PROGRESS_LOG + git commit**, lalu **BERHENTI** menunggu instruksi berikutnya. **Jangan mengarang data** — field kosong = token CONFIG + `// TODO(lintang)`.

---

## PROMPT 0 — Orientasi (JANGAN ngoding dulu)
```
Kamu adalah Claude Code yang akan membangun portfolio website Lintang Balakosa Ardhana.

SEBELUM menulis kode apa pun:
1. Baca ketiga file panduan di root: PORTFOLIO_BLUEPRINT.md (kebenaran tunggal),
   SPRINTS_AND_TRACKING.md (rencana 7 sprint + tracking), PROGRESS_LOG.md (log jalan).
2. Ringkas pemahamanmu dalam <20 baris: positioning, stack, target performa,
   urutan hero project, aturan integritas (jangan mengarang angka; token CONFIG + // TODO(lintang)),
   dan bahwa MVP = S1–S6, Log = S7.
3. Sebutkan daftar token CONFIG yang masih menunggu Lintang (dari PROGRESS_LOG Sprint 0)
   dan sprint mana yang terpengaruh.
4. Konfirmasi package manager yang dipakai (npm / pnpm / yarn) — TANYAKAN, jangan asumsi.
5. JANGAN membuat file/kode apa pun. Berhenti dan tunggu instruksi "mulai S1".

Aturan tetap sepanjang proyek:
- Kerjakan hanya scope sprint yang diminta. Jangan lari ke sprint berikutnya.
- Jangan mengarang angka/klaim. Data hanya dari BLUEPRINT (yang bersumber CV).
  Field belum pasti → token CONFIG di content/config.ts + // TODO(lintang).
- Di akhir tiap sprint: centang task di SPRINTS_AND_TRACKING.md, set status ✅,
  tulis entri baru di PROGRESS_LOG.md (terbaru di atas, jujur soal skip/blocker), lalu git commit.
- Hormati: TypeScript strict, Lighthouse mobile ≥90, LCP <2s, responsive 360px→desktop,
  a11y AA, prefers-reduced-motion. Tanpa backend/DB berbayar.
```

---

## PROMPT S1 — Foundation & Setup
```
Kerjakan HANYA Sprint S1 (Foundation & Setup) dari SPRINTS_AND_TRACKING.md.
Rujuk PORTFOLIO_BLUEPRINT.md §0 (CONFIG), §3 (design tokens/fonts), §8 (struktur folder).

Lakukan:
- Scaffold Next.js App Router + TypeScript strict + Tailwind (tsconfig strict:true).
- Buat struktur folder persis BLUEPRINT §8 (folder kosong boleh pakai .gitkeep).
- lib/fonts.ts: Space Grotesk + Space Mono (next/font/google) + Satoshi (next/font/local) dengan
  fallback DM Sans — build TIDAK boleh gagal bila file Satoshi belum ada (pakai fallback).
- content/config.ts: semua token CONFIG dari §0.1 sebagai konstanta dengan // TODO(lintang).
- app/globals.css: CSS variables palet + type-scale clamp (§3.2–3.3).
- Install framer-motion, shadcn/ui (init secukupnya), @vercel/analytics.
- app/layout.tsx: pasang variabel font ke <html>, metadata dasar.
- Halaman skeleton minimal (TANPA konten karangan).
- Connect ke Vercel & deploy skeleton.

Selesai:
- Pastikan `npm run build` (atau pm terpilih) sukses.
- Centang task S1 + set status ✅ di SPRINTS_AND_TRACKING.md.
- Tulis entri PROGRESS_LOG.md (jujur; sebut deploy skeleton URL bila ada).
- git commit -m "S1: foundation, tooling, fonts, config tokens, Vercel skeleton"
- BERHENTI. Tunggu instruksi S2.
```

---

## PROMPT S2 — Design System & Shared UI
```
Kerjakan HANYA Sprint S2. Rujuk BLUEPRINT §3 (design system), §7 (SEO).

Lakukan:
- components/ui/: Button, Card, Badge, SectionHeading (pakai CSS vars; coral hemat).
- components/motion/: Reveal, Stagger, CountUp — hormati useReducedMotion (§3.4).
- Util layout/container (max-width --maxw, padding section py-20 md:py-28).
- lib/seo.ts: helper metadata (title/desc/OG) dari §7.
- app/sitemap.ts, app/robots.ts.
- Favicon placeholder (final di S6).
- Verifikasi prefers-reduced-motion → animasi jadi final-state.

Selesai: build sukses; centang S2 + ✅; tulis PROGRESS_LOG;
git commit -m "S2: design system, shared UI, motion primitives, SEO scaffold".
BERHENTI. Tunggu instruksi S3.
```

---

## PROMPT S3 — Hero + About + Skills
```
Kerjakan HANYA Sprint S3. Rujuk BLUEPRINT §4 (naskah), §3 (motion).

Lakukan:
- components/sections/Hero.tsx: role label, headline, sub-headline, hook strip (angka Space Mono),
  tombol Lihat proyek + Download CV. Pakai naskah §4.1 PERSIS.
- Hook strip: jika ANKOP_MONTHS terisi → "dalam X bulan pertama"; jika kosong → JANGAN mengarang,
  tampilkan angka tanpa klaim waktu ATAU sembunyikan kg sampai token terisi (catat di PROGRESS_LOG).
- CountUp opsional pada angka (hormati reduced-motion).
- components/sections/About.tsx: versi ±120 kata (§4.3) + kredensial BNSP + micro-copy anti-salah-baca (§4.6).
- content/skills.ts + components/sections/Skills.tsx (§4.4): grup → "dipakai di ___"; React Native = basic.
- Reveal-on-scroll ringan.

Integritas: identitas hero = Full-Stack Engineer; JANGAN taruh "Data Scientist"/"hybrid" di hero.

Selesai: responsive 360px→desktop; build sukses; centang S3 + ✅; PROGRESS_LOG;
git commit -m "S3: hero + about + skills".
BERHENTI. Tunggu instruksi S4.
```

---

## PROMPT S4 — Featured Projects + Case Study pages
```
Kerjakan HANYA Sprint S4. Rujuk BLUEPRINT §5 (case studies), §2 (urutan).

Lakukan:
- content/projects.ts: 4 hero + 2 sekunder sesuai skema §5 (data dari CV; // TODO(lintang) utk yang belum pasti).
- components/sections/FeaturedProjects.tsx: kartu (nama, tagline, tech chips, badge kejujuran, hover-lift),
  urut Ankop → Bisasinema → Tera → Analisis Hotel. + "Other projects": Kuali, Bank Sampah.
- app/projects/[slug]/page.tsx: SSG generateStaticParams; layout case study
  (problem → approach+KENAPA → ownVsTeam jujur → results+konteks waktu → learned → proof → label).
- Analisis Hotel = SATU case study (gabung medali SurabayaDev). Anti double-count.
- Bukti mengikuti PROOF_* : screenshot beranotasi / Loom / write-up. JANGAN render demo palsu;
  proof kosong → tampilkan "bukti menyusul", bukan link mati.
- generateMetadata per case study.

Integritas: semua angka berkonteks waktu; Tera label "production-ready" bila belum ada tenant.

Selesai: build + SSG sukses; ankop-trace lengkap & jujur; centang S4 + ✅; PROGRESS_LOG;
git commit -m "S4: featured projects + case study pages".
BERHENTI. Tunggu instruksi S5.
```

---

## PROMPT S5 — Experience/Achievements + Contact + CV
```
Kerjakan HANYA Sprint S5. Rujuk BLUEPRINT §4.5 (contact), CV (experience/achievements/cert).

Lakukan:
- content/experience.ts: timeline kerja (Bisasinema, Ankop, Bank Sampah, PT Anugrah Energi) +
  achievements (I/O 🥇, SurabayaDev 🥉, CIMB 🥈) + sertifikasi (BNSP, Digital Skola, Coursera) — dari CV.
- components/sections/ExperienceAchievements.tsx: timeline + medali + cert (jujur, tanpa buzzword).
- components/sections/Contact.tsx: ajakan (§4.5) + email + LINKEDIN_URL(fixed) + GitHub + tombol Download CV (CV_FILE).
- CV_FILE di public/cv/. Bila belum ada → tombol disabled rapi + // TODO(lintang), JANGAN link mati.
- Org roles cukup 1 baris (hindari skill-dump).

Selesai: data akurat dari CV; build sukses; centang S5 + ✅; PROGRESS_LOG;
git commit -m "S5: experience/achievements + contact + CV".
BERHENTI. Tunggu instruksi S6.
```

---

## PROMPT S6 — Polish · a11y · perf · SEO/OG · Analytics · Prod deploy (MVP LIVE)
```
Kerjakan HANYA Sprint S6. Rujuk BLUEPRINT §7 (SEO/OG), §9 (definisi sukses).

Lakukan:
- app/opengraph-image.tsx (next/og): nama + role + hook strip + foto; teks besar terbaca di thumbnail.
- Favicon final + meta/title per halaman via lib/seo.ts.
- Optimisasi gambar (next/image, priority hero, lazy sisanya).
- Audit Lighthouse mobile ≥90 & LCP <2s; perbaiki CLS/font-swap.
- A11y AA: kontras, alt text, semantic HTML, focus ring, skip-link.
- @vercel/analytics aktif.
- Cek broken link (khusus LinkedIn); pastikan TIDAK ada token CONFIG bocor ke UI final.
- Custom domain (DOMAIN) + HTTPS di Vercel. Tes di HP asli.

Selesai (MVP LIVE): centang S6 + ✅; PROGRESS_LOG (catat skor Lighthouse & URL live);
git commit -m "S6: polish, a11y, perf, SEO/OG, analytics, prod deploy (MVP live)".
BERHENTI. Tunggu instruksi S7 (fast-follow).
```

---

## PROMPT S7 — Log / Activity (MDX, fast-follow)
```
Kerjakan HANYA Sprint S7. Rujuk BLUEPRINT §6 (spec Log).

Lakukan:
- lib/mdx.ts + setup next-mdx-remote/Contentlayer (SSG). TANPA backend/DB berbayar.
- content/log/*.mdx + frontmatter (§6).
- app/log/page.tsx (list kartu: title·date·badge type·badge result·teaser; filter type opsional).
- app/log/[slug]/page.tsx (SSG) + generateMetadata.
- components/sections/LogTeaser.tsx di homepage (link ke /log).
- Seed 3 post: io-festival.mdx (contoh terisi §6) + surabayadev.mdx + 1 post result kalah/ikut // TODO(lintang).
- Tiap post: substansi (peran/dibangun/stack/1 pelajaran) + ide inti dikaburkan + CTA "hubungi untuk kolaborasi".

Selesai: /log & detail ter-render (SSG); ≥3 seed (min 1 kalah/ikut); centang S7 + ✅; PROGRESS_LOG;
git commit -m "S7: log/activity (mdx)".
BERHENTI.
```

---

## BONUS A — Sinkron tracking (audit centang vs realita)
```
Jangan tulis fitur baru. Audit konsistensi:
- Bandingkan checkbox & status di SPRINTS_AND_TRACKING.md dengan kode yang BENAR-BENAR ada di repo.
- Tandai task yang tercentang tapi tidak terbukti di kode (atau sebaliknya).
- Perbaiki status agar jujur; tambahkan entri PROGRESS_LOG "audit sinkron" berisi temuan.
- Jangan mengarang kemajuan. git commit -m "chore: sync tracking with actual repo state".
BERHENTI.
```

## BONUS B — Isi CONFIG (setelah Lintang menjawab placeholder)
```
Lintang telah memberi nilai untuk sebagian token CONFIG. Tugas:
- Update content/config.ts dengan nilai nyata (LINKEDIN_URL, ANKOP_MONTHS, ANKOP_KG_CUMULATIVE,
  PROOF_*, CLIENT_NAME_PERMISSION, CV_FILE, PHOTO_FILE, DOMAIN, IO_FESTIVAL_*).
- Hapus // TODO(lintang) HANYA untuk token yang benar-benar terisi; sisakan yang masih kosong.
- Perbarui UI yang bergantung (hero strip konteks waktu, link LinkedIn, Download CV, bukti case study,
  seed Log) TANPA mengarang nilai yang belum diberikan.
- Bila CLIENT_NAME_PERMISSION=false → anonimkan nama klien ("produsen kopi specialty", "brand film & edukasi").
- Jalankan build; catat di PROGRESS_LOG token mana yang terisi & mana yang masih menunggu.
- git commit -m "content: fill CONFIG tokens provided by Lintang".
BERHENTI.
```
