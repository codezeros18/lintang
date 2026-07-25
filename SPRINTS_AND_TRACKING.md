# SPRINTS_AND_TRACKING.md
**Rencana eksekusi + tracking · Portfolio Lintang Balakosa Ardhana**
Sumber kebenaran: `PORTFOLIO_BLUEPRINT.md`. Log jalan: `PROGRESS_LOG.md`. Prompt eksekusi: `EXECUTION_PROMPTS.md`.

> **MVP = S1–S6** (situs live). **Log = S7** (fast-follow, setelah MVP live).
> Default agen: **berhenti di akhir tiap sprint**, menunggu instruksi — jangan lari S1→S7 otomatis.
> Integritas: jangan mengarang angka/klaim; yang belum pasti = token CONFIG + `// TODO(lintang)` (lihat BLUEPRINT §0).

---

## Ringkasan sprint

| Sprint | Nama | Cakupan | Status |
|---|---|---|---|
| **S1** | Foundation & Setup | Scaffold Next.js, tooling, fonts, token CONFIG, deploy skeleton Vercel | ✅ |
| **S2** | Design System & Shared UI | CSS vars, komponen ui/, layout, motion primitive, SEO scaffold | ✅ |
| **S3** | Hero + About + Skills | 3 section atas + hook strip | ✅ |
| **S4** | Featured Projects + Case Study pages | Grid + `/projects/[slug]` (min. ankop-trace) | ✅ |
| **S5** | Experience/Achievements + Contact + CV | Timeline, medali, sertifikasi, kontak, Download CV | ✅ |
| **S6** | Polish · a11y · perf · SEO/OG · Analytics · **Prod deploy (MVP LIVE)** | Lighthouse ≥90, OG, domain, Analytics | 🟡 |
| **S7** | Log/Activity (MDX, fast-follow) | `/log`, MDX, 3 seed post | 🔲 |

Legenda status: 🔲 belum · 🟡 jalan · ✅ selesai.

---

## S1 — Foundation & Setup
**Goal:** repo Next.js siap kerja + deploy skeleton live di Vercel (halaman kosong ber-metadata), tooling & fonts terpasang, token CONFIG ada.

**Tasks:**
- [x] `create-next-app` — App Router + **TypeScript strict** + Tailwind (`tsconfig` `strict:true`)
- [x] Struktur folder sesuai BLUEPRINT §8 (buat folder kosong + `.gitkeep` bila perlu)
- [x] `lib/fonts.ts`: Space Grotesk + Space Mono (google) + Satoshi(local)+DM Sans fallback — **build tak boleh blok bila Satoshi belum ada**
- [x] `content/config.ts`: semua token CONFIG (§0.1) sebagai konstanta ber-`// TODO(lintang)`
- [x] `app/globals.css`: CSS variables palet + type-scale (§3.2–3.3)
- [x] Install: `framer-motion`, shadcn/ui init (secukupnya), `@vercel/analytics`
- [x] `app/layout.tsx`: pasang font variables ke `<html>`, metadata dasar
- [x] Commit + deploy skeleton ke Vercel (halaman placeholder minimal, bukan konten karangan) — ⚠️ deploy lewat **Vercel CLI**, bukan koneksi repo Git (belum ada remote GitHub; lihat PROGRESS_LOG)

**Definition of Done:** `npm run build` sukses; situs skeleton ter-deploy di URL Vercel; font & CSS vars aktif; `content/config.ts` berisi token TODO; tidak ada konten karangan.
**Files:** `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `lib/fonts.ts`, `content/config.ts`, `tailwind.config.ts`, `tsconfig.json`, `package.json`.

---

## S2 — Design System & Shared UI
**Goal:** komponen dasar + motion primitive + SEO scaffold siap dipakai section.

**Tasks:**
- [x] `components/ui/`: `Button`, `Card`, `Badge`, `SectionHeading` (pakai CSS vars; aksen coral hemat)
- [x] `components/motion/`: `Reveal`, `Stagger` (+ `StaggerItem`, `HoverLift`), `CountUp` — hormati `useReducedMotion` (§3.4)
- [x] Container/layout util (max-width `--maxw`, padding section `py-20 md:py-28`) → `components/ui/container.tsx`
- [x] `lib/seo.ts`: helper `metadata` per halaman (title/desc/OG) dari BLUEPRINT §7
- [x] `app/sitemap.ts`, `app/robots.ts` (rute dasar)
- [x] Favicon placeholder (`app/icon.svg` monogram; ganti final di S6)
- [x] Uji `prefers-reduced-motion` — ⚠️ diverifikasi lewat **inspeksi jalur kode + build**, belum di browser sungguhan (lihat PROGRESS_LOG)

**Definition of Done:** komponen ter-render di halaman demo internal; motion menghormati reduced-motion; `lib/seo.ts` dipakai `layout`; sitemap/robots terbit; build sukses.
**Files:** `components/ui/*`, `components/motion/*`, `lib/seo.ts`, `app/sitemap.ts`, `app/robots.ts`.

---

## S3 — Hero + About + Skills
**Goal:** 3 section teratas jadi, lolos uji 8 detik.

**Tasks:**
- [x] `components/sections/hero.tsx`: role label + headline + sub-headline + **hook strip** (angka Space Mono) + tombol `Lihat proyek` + CTA kedua (naskah BLUEPRINT §4.1)
- [x] Hook strip pakai `ANKOP_MONTHS` bila ada; token kosong → **angka kg disembunyikan** dari hero, slot diisi "15+ supplier aktif" (angka CV lain, aturan "apa adanya"). Tanpa mengarang.
- [x] CountUp opsional pada angka (hormati reduced-motion; nilai akhir tampil saat SSR/tanpa JS)
- [x] `components/sections/about.tsx`: versi ±120 kata + kredensial BNSP + micro-copy anti-salah-baca (§4.3, §4.6)
- [x] `components/sections/skills.tsx`: dari `content/skills.ts` (grup → "dipakai di ___"); React Native = **basic** (§4.4)
- [x] `content/skills.ts` diisi dari CV
- [x] Reveal-on-scroll ringan di About & Skills — **hero sengaja tanpa motion** (lihat catatan LCP di backlog)

**Definition of Done:** hero lolos 8-detik (Full-Stack + angka, data tidak di hero); About memuat BNSP + micro-copy; Skills jujur; responsive 360px→desktop; build sukses.
**Files:** `components/sections/Hero.tsx`, `About.tsx`, `Skills.tsx`, `content/skills.ts`.

---

## S4 — Featured Projects + Case Study pages
**Goal:** grid 4 hero + halaman case study (minimal `ankop-trace` lengkap).

**Tasks:**
- [x] `content/projects.ts`: 4 hero + 2 sekunder sesuai skema BLUEPRINT §5 (data dari CV; `// TODO(lintang)` untuk yang belum pasti)
- [x] `components/sections/featured-projects.tsx`: kartu (nama, tagline, tech chips, badge kejujuran, hover-lift) urut Ankop→Bisasinema→Tera→Analisis Hotel
- [x] `app/projects/[slug]/page.tsx`: SSG `generateStaticParams` (4 halaman ter-prerender); layout case study (problem→approach→ownVsTeam→results→learned→proof→label)
- [x] **Analisis Hotel = 1 case study** (medali SurabayaDev jadi badge di kartu & halamannya, bukan entri terpisah)
- [x] Bukti etis sesuai `PROOF_*` — semua token masih kosong, jadi semua case study menampilkan **"Bukti menyusul" + rencana buktinya**; tidak ada demo palsu maupun link mati
- [x] Section "Other projects" (Kuali, Bank Sampah) sebagai kartu kecil — tanpa halaman case study (slug-nya 404, sudah diverifikasi)
- [x] `generateMetadata` per case study (§7)

**Definition of Done:** 4 kartu tampil & tautkan ke case study; `ankop-trace` lengkap & jujur; semua angka berkonteks waktu; tak ada demo palsu; build + SSG sukses.
**Files:** `content/projects.ts`, `components/sections/FeaturedProjects.tsx`, `app/projects/[slug]/page.tsx`.

---

## S5 — Experience/Achievements + Contact + CV
**Goal:** kredibilitas + jalur konversi.

**Tasks:**
- [x] `content/experience.ts`: timeline kerja (Ankop, Bisasinema, Bank Sampah, PT Anugrah Energi) + achievements (I/O 🥇, SurabayaDev 🥉, CIMB 🥈) + sertifikasi (BNSP, Digital Skola) — ⚠️ **Coursera dilewati**: nama sertifikatnya tidak ada di BLUEPRINT maupun repo (lihat PROGRESS_LOG)
- [x] `components/sections/experience-achievements.tsx`: timeline + medali + cert (jujur, tanpa buzzword). Medali SurabayaDev menunjuk ke case study, tidak diceritakan ulang.
- [x] `components/sections/contact.tsx`: ajakan §4.5 + email + GitHub + tombol Download CV — ⚠️ **LinkedIn tidak ditautkan** selama `LINKEDIN_URL` kosong
- [x] `CV_FILE` belum ada → tombol **disabled** ("Download CV — segera") + `// TODO(lintang)`; tidak ada link mati
- [ ] Org roles = ringkas 1 baris — ⛔ **tidak dikerjakan: nol data organisasi di BLUEPRINT.** Struktur `organizationRoles` sudah siap dan section-nya muncul otomatis begitu diisi.

**Definition of Done:** timeline & achievements akurat dari CV; Contact berfungsi; Download CV bekerja bila `CV_FILE` ada (else disabled rapi); build sukses.
**Files:** `content/experience.ts`, `components/sections/ExperienceAchievements.tsx`, `Contact.tsx`, `public/cv/`.

---

## S6 — Polish · a11y · perf · SEO/OG · Analytics · **Prod deploy (MVP LIVE)**
**Goal:** MVP live di custom domain, lolos target performa.

**Tasks:**
- [x] `app/opengraph-image.tsx` (`next/og`): nama + role + hook strip, teks besar (§7) — ⚠️ **tanpa foto** (`PHOTO_FILE` kosong)
- [x] Favicon + meta/title per halaman via `lib/seo.ts` — `app/icon.svg` + `app/apple-icon.tsx` (monogram; bukan logo hasil desain)
- [ ] Optimisasi gambar — ⛔ **tidak ada gambar sama sekali di situs** (belum ada foto/screenshot). Belum ada yang bisa dioptimalkan.
- [ ] Audit **Lighthouse mobile ≥90**, **LCP <2s** — ⛔ **BELUM DIJALANKAN**: tidak ada browser di lingkungan ini. **Harus dijalankan Lintang.**
- [x] Aksesibilitas **AA**: kontras (diukur, 1 kegagalan diperbaiki), semantic HTML, focus ring, skip-link — ⚠️ belum ada uji screen reader
- [x] `@vercel/analytics` aktif (terpasang di bundle; `/_vercel/insights/script.js` → 200)
- [x] Cek broken link (GitHub → 200; **LinkedIn memang tidak ditautkan**); tidak ada token CONFIG bocor ke UI (dicek di 5 halaman)
- [ ] Custom domain (`DOMAIN`) + HTTPS — ⛔ **domain belum diregistrasi.** Sementara live di `lintang-sigma.vercel.app` (HTTPS aktif); `NEXT_PUBLIC_SITE_URL` sudah diset supaya canonical/sitemap/OG menunjuk URL yang benar-benar resolve.
- [ ] **Tes di HP asli** — ⛔ hanya bisa dilakukan Lintang.

**Definition of Done:** MVP LIVE di `DOMAIN`; Lighthouse mobile ≥90 & LCP <2s; a11y AA; OG ter-render saat di-share; Analytics aktif; tak ada link mati/token bocor.
**Files:** `app/opengraph-image.tsx`, `lib/seo.ts`, `app/layout.tsx`, konfigurasi Vercel/domain.

> 🎯 **Setelah S6 = MVP LIVE.** Distribusikan URL (LinkedIn/Glints/Kalibrr/Dealls/IG/CV) sambil lanjut S7.
>
> ⚠️ **Status nyata: situs LIVE di https://lintang-sigma.vercel.app, tapi S6 belum bisa ditutup ✅.**
> Tiga hal tersisa hanya bisa dikerjakan Lintang: (1) audit Lighthouse mobile, (2) registrasi
> custom domain, (3) tes di HP asli. **Jangan sebarkan URL** sebelum bukti (`PROOF_*`),
> `LINKEDIN_URL`, dan `CV_FILE` terisi — lihat PROGRESS_LOG S6.

---

## S7 — Log / Activity (MDX, fast-follow)
**Goal:** section Log hidup dengan 3 seed post; tanpa backend berbayar.

**Tasks:**
- [ ] `lib/mdx.ts` + setup `next-mdx-remote`/Contentlayer (SSG)
- [ ] `content/log/*.mdx` + frontmatter (BLUEPRINT §6)
- [ ] `app/log/page.tsx` (list kartu: title·date·badge type·badge result·teaser; filter `type` opsional)
- [ ] `app/log/[slug]/page.tsx` (SSG) + `generateMetadata`
- [ ] `components/sections/LogTeaser.tsx` di homepage (link ke `/log`)
- [ ] Seed: `io-festival.mdx` (menang, contoh terisi §6) + `surabayadev.mdx` + **1 post `kalah`/`ikut`** `// TODO(lintang)`
- [ ] Tiap post: substansi + ide inti dikaburkan + CTA "hubungi untuk kolaborasi"

**Definition of Done:** `/log` & detail ter-render (SSG); ≥3 seed (min. 1 `kalah`/`ikut`); tambah post cukup `git push`; tak ada backend berbayar; build sukses.
**Files:** `lib/mdx.ts`, `content/log/*.mdx`, `app/log/page.tsx`, `app/log/[slug]/page.tsx`, `components/sections/LogTeaser.tsx`.

---

## Catatan lintas-sprint (WAJIB tiap sprint)
1. **Centang task** `[x]` yang selesai + set **status ✅** di tabel ringkasan.
2. **Tulis entri `PROGRESS_LOG.md`** (terbaru di atas): apa selesai, apa gagal/skip/blocker, jujur.
3. **`git commit`** dengan pesan yang disarankan di `EXECUTION_PROMPTS.md`.
4. **Jangan mengarang data.** Temui field kosong → pakai token CONFIG + `// TODO(lintang)`, catat di backlog di bawah.
5. **Berhenti** di akhir sprint; tunggu instruksi sprint berikutnya.

### Backlog / temuan (diisi selama eksekusi)
- [ ] `// TODO(lintang)` — daftar token CONFIG yang masih menunggu (lihat PROGRESS_LOG Sprint 0)
- [ ] **Repo GitHub belum ada** → Vercel belum tersambung ke Git, jadi belum ada auto-deploy tiap `git push`. Deploy sekarang manual via `npx vercel --prod`. (Blokir alur "push = redeploy" yang diandalkan S7.)
- [ ] **`public/fonts/Satoshi-Variable.woff2` belum ada** → body font sementara memakai fallback DM Sans. Blok `localFont` di `lib/fonts.ts` sengaja dinonaktifkan agar build tidak gagal.
- [ ] Deviasi stack vs BLUEPRINT §8 (Next.js 16 + Tailwind v4): tidak ada `tailwind.config.ts` (Tailwind v4 CSS-first — token ada di `app/globals.css`), dan config bernama `next.config.ts` bukan `.mjs`.
- [ ] Dark mode belum ada (blok `.dark` bawaan shadcn dihapus) — sesuai §3.2 "dark = fast-follow".
- [ ] **JANGAN bungkus konten hero dengan `Reveal`/`Stagger` di S3.** Framer Motion merender `opacity:0` di HTML server, jadi elemen di atas lipatan baru terlihat setelah hidrasi → merusak target **LCP <2s**. Reveal hanya untuk section di bawah lipatan. (Pengunjung tanpa JS sudah diamankan lewat `<noscript>` di `app/layout.tsx`.)
- [ ] `NEXT_PUBLIC_SITE_URL` belum diset di Vercel → `robots.txt`/canonical masih menunjuk `lintangbalakosa.dev` yang **belum resolve**. Set env ke URL `*.vercel.app` sampai domain aktif (S6).
- [ ] `app/ui-demo` = halaman kerja internal (404 di produksi). Hapus atau biarkan dev-only sebelum launch.
- [ ] Uji `prefers-reduced-motion` di browser sungguhan (devtools → Rendering → Emulate CSS media) saat S6.
- [ ] **Anchor `#projects` di hero belum punya tujuan** — section Featured Projects baru dibuat di S4. Sampai itu, tombol "Lihat proyek" tidak memindahkan halaman.
- [ ] **`#contact` juga belum ada** (S5). Hero memakainya sebagai CTA kedua selama `CV_FILE` kosong.
- [ ] About tetap menyebut "5.000+ kg" tanpa konteks bulan karena itu naskah §4.3 apa adanya, sementara hero menyembunyikannya. Konsisten setelah `ANKOP_MONTHS` diisi — **keputusan Lintang** apakah kalimat About mau diubah sementara.
- [ ] Responsive 360px→desktop belum diuji di viewport sungguhan (hanya lewat kelas breakpoint + build).
- [ ] **Case study belum "lengkap"**: blok *Kerja sendiri vs tim* dan *Satu pelajaran* disembunyikan di keempat proyek karena `ownVsTeam` & `learned` belum diisi Lintang. Ini bagian paling meyakinkan buat recruiter — prioritas tertinggi setelah token bukti.
- [ ] **`CLIENT_NAME_PERMISSION` masih `null`** → nama "Ankop Trace" & "Bisasinema" **ditampilkan**. Set ke `false` bila belum boleh disebut; nama anonim (`anonymousName`) sudah disiapkan dan otomatis dipakai.
- [x] Untuk S5: medali SurabayaDev sudah tampil di kartu/halaman Analisis Hotel. Di section Achievements, tulis sebagai rujukan ke case study itu — jangan diceritakan ulang seolah pekerjaan terpisah. → **selesai**, kartunya hanya memuat judul + link "Lihat case study-nya".
- [ ] **Data S5 yang hilang dan tidak bisa dikarang:** role & periode persis PT Anugrah Energi · periode Bank Sampah Digital · tahun I/O Festival & CIMB Niaga · nama sertifikat Coursera · seluruh org roles. Kirim CV-nya (atau datanya) dan semua ini bisa diisi dalam hitungan menit.
