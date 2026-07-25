# PROGRESS_LOG.md
**Log jalan eksekusi · Portfolio Lintang Balakosa Ardhana**

> **Aturan:** entri **terbaru di ATAS**. Jujur soal gagal/skip/blocker — log yang menyembunyikan kegagalan tidak berguna.
> Tulis 1 entri setiap akhir sprint (dan kapan pun ada blocker penting). Jangan mengarang data; catat token CONFIG yang menunggu Lintang.
> Referensi: `PORTFOLIO_BLUEPRINT.md` (kebenaran), `SPRINTS_AND_TRACKING.md` (rencana), `EXECUTION_PROMPTS.md` (prompt per sprint).

---

## FORMAT ENTRI (salin blok ini untuk entri baru, taruh di atas)
```
### [YYYY-MM-DD HH:MM] — Sprint S# — <nama sprint>
**Status:** 🟡 jalan | ✅ selesai | ⛔ blocked
**Selesai:**
- ...
**Gagal / skip / blocker (jujur):**
- ...
**Keputusan / catatan:**
- ...
**CONFIG/TODO yang masih menunggu Lintang:**
- ...
**Commit:** <hash / pesan commit>
**Sprint berikutnya:** S# — <nama> (menunggu instruksi)
```

---

<!-- ENTRI BARU DI ATAS GARIS INI -->

### [2026-07-25 23:07] — Sprint S3 — Hero + About + Skills
**Status:** ✅ selesai
**Selesai:**
- `components/sections/hero.tsx` — naskah §4.1 dipakai **persis**: role label "Full-Stack Engineer · Informatika UMN", headline utama ("Saya membangun sistem yang dipakai bisnis nyata — dan membuktikan dampaknya lewat data."), sub-headline, hook strip, tombol. Identitas hero murni **Full-Stack Engineer** — tidak ada kata "hybrid" maupun "Data Scientist" (§1); dicek di HTML hasil render.
- Hook strip 3 angka pakai `CountUp` (Space Mono lewat class `.stat-num`), dibungkus `<dl>/<dt>/<dd>` supaya terbaca screen reader.
- `components/sections/about.tsx` — naskah ±120 kata §4.3 persis (3 paragraf), **Associate Data Scientist (BNSP)** ditebalkan, ditutup micro-copy anti-salah-baca §4.6 dalam blok beraksen indigo.
- `content/skills.ts` + `components/sections/skills.tsx` — 6 grup §4.4 apa adanya, tiap kartu menutup dengan **"Dipakai di: …"**. React Native diberi badge coral bertuliskan `React Native · basic`, plus baris "Kejujuran level: React Native = basic".
- `app/page.tsx` menyusun Hero → About → Skills (Featured Projects akan disisipkan tepat setelah Hero di S4, sesuai urutan "bukti dulu" §2).
- Reveal-on-scroll ringan dipakai di About & Skills (`Reveal`, `Stagger`); `npm run build` ✅ · `npm run lint` ✅.
**Gagal / skip / blocker (jujur):**
- 🔴 **Angka "5.000+ kg" TIDAK ditampilkan di hero.** Aturan §0.2 mengikat angka itu ke konteks waktu `ANKOP_MONTHS`, dan tokennya masih `null`. Dari dua opsi yang diberikan (tampil tanpa klaim waktu **atau** disembunyikan), saya pilih **disembunyikan** karena §9 mensyaratkan semua angka tampil berkonteks waktu. Slotnya diisi **"15+ supplier aktif"** — angka CV lain yang aturan tampilnya "apa adanya", jadi hook strip tetap 3 angka dan tidak ada yang dikarang. **Begitu `ANKOP_MONTHS` diisi, angka kg otomatis naik menggantikan slot itu** (logikanya sudah ada di `getStats()`).
- ⚠️ **Inkonsistensi yang saya sadari:** paragraf About tetap menyebut "melacak 5.000+ kg" tanpa konteks bulan, karena itu naskah §4.3 apa adanya dan mengubahnya berarti menulis ulang teks yang sudah disetujui. Jadi angka kg disembunyikan di hero tapi ada di About. **Keputusan Lintang:** isi `ANKOP_MONTHS` (menyelesaikan keduanya) atau minta saya menyunting kalimat About sementara.
- ⚠️ **Tombol "Download CV" tidak dirender** karena `CV_FILE` masih `null` — link mati dilarang (§9). Slot kedua diisi CTA **"Hubungi"** yang memang disediakan §4.1 sebagai opsi, jadi jalur konversi tetap ada dan tidak ada tombol disabled yang membingungkan. Otomatis berubah jadi Download CV begitu `CV_FILE` diisi.
- ⚠️ **Anchor `#projects` dan `#contact` belum punya tujuan** — sectionnya baru dibuat di S4 & S5. Sampai itu, klik tombol hero tidak memindahkan halaman.
- ⚠️ **Foto profil belum ada** (`PHOTO_FILE` masih `null`), jadi hero murni tipografi tanpa visual. Bukan masalah desain, tapi hero berfoto biasanya lebih kuat untuk recruiter — menunggu Lintang.
- ⚠️ **Responsive 360px→desktop belum diuji di viewport sungguhan.** Yang ada: kelas breakpoint (`sm:grid-cols-3`, `flex-wrap`, `max-w-*`, type-scale clamp) + build sukses. Belum ada browser untuk diukur — masuk daftar uji S6 bareng Lighthouse.
- Tidak ada deploy di sprint ini (S3 tidak memintanya).
**Keputusan / catatan:**
- **Hero sengaja TIDAK dibungkus `Reveal`/`Stagger`** (tindak lanjut temuan S2): Framer Motion merender `opacity:0` di HTML server, jadi membungkus hero berarti menunda LCP sampai hidrasi. Dicek ulang di HTML produksi — satu-satunya `opacity:0` ada di About & Skills yang berada di bawah lipatan.
- `CountUp` di hero aman untuk LCP: nilai akhir sudah ada di HTML server, animasi hanya berjalan setelah hidrasi dan tidak jalan sama sekali saat reduced-motion.
- Judul section About & Skills adalah copy UI (bukan klaim berangka) yang saya turunkan dari prinsip §4.2/§4.4. Kalau nada bahasanya kurang pas, gampang diganti.
- Draf awal Skills sempat menambahkan tafsir sendiri soal arti "basic" pada React Native ("cukup untuk demo, belum untuk produksi"). **Dihapus** — BLUEPRINT hanya menulis "basic", jadi tidak boleh saya bumbui.
- Varian headline engineer-forward (§4.1) tidak dipakai; yang dipakai headline utama. Tinggal tukar satu baris kalau Lintang lebih suka varian itu.
**CONFIG/TODO yang masih menunggu Lintang:** *(13 token masih `null`)*
- ⛔ **`ANKOP_MONTHS`** — sekarang berdampak langsung & terlihat: angka kg absen dari hero sampai ini diisi. (`ANKOP_KG_CUMULATIVE` menyusul untuk kalimat hasil di S4.)
- ⛔ **`CV_FILE`** — tombol Download CV belum ada di hero maupun (nanti) Contact.
- ⛔ **`PHOTO_FILE`** — hero tanpa foto; juga dibutuhkan OG image S6.
- ⛔ `LINKEDIN_URL` · `PROOF_ANKOP` · `PROOF_BISASINEMA` · `PROOF_TERA` · `PROOF_HOTEL` · `PROOF_BANKSAMPAH` · `CLIENT_NAME_PERMISSION` · `IO_FESTIVAL_DATE` · `IO_FESTIVAL_STACK`
- 🟡 `DOMAIN` — masih default, belum diregistrasi.
- ⛔ Non-token: repo GitHub (auto-deploy), file `Satoshi-Variable.woff2`.
**Commit:** `S3: hero + about + skills`
**Sprint berikutnya:** S4 — Featured Projects + Case Study pages (menunggu instruksi)

### [2026-07-25 22:52] — Sprint S2 — Design System & Shared UI
**Status:** ✅ selesai
**Selesai:**
- `components/ui/button.tsx` — **ditulis ulang**, menggantikan Button bawaan shadcn. Varian `primary` (indigo) · `secondary` (outline warm) · `ghost` · `link`; ukuran `sm/md/lg`; **coral hanya di varian `link`** (hover), sesuai aturan "coral hemat" §3.2. Merender `<button>`, `next/link` (href diawali `/`), atau `<a>` (anchor/eksternal). Tanpa hook → tetap server component.
- `components/ui/card.tsx` (+ `CardTitle`, `CardDescription`), `badge.tsx` (tone `neutral/accent/coral/outline` + opsi `mono` untuk tech chip), `section-heading.tsx` (eyebrow mono uppercase + judul + deskripsi + slot `action`, level heading bisa diatur demi urutan a11y).
- `components/ui/container.tsx` — `Container` (max-width `--maxw`, padding aman di 360px) + `Section` (`py-20 md:py-28` + anchor `id`).
- `components/motion/` — `Reveal`, `Stagger` + `StaggerItem` + `HoverLift`, `CountUp`. Semua memakai `useReducedMotion`: saat reduce, komponen merender `<div>` biasa **tanpa transform/opacity** (final state), bukan animasi yang dipercepat.
- `CountUp` dirancang jujur: render server/tanpa-JS langsung menampilkan **nilai akhir**, animasi hanya jalan sekali saat masuk viewport, dan `useLayoutEffect` isomorfik dipakai supaya tidak berkedip.
- `lib/seo.ts` — `SITE` (§7), `SITE_URL`, dan `buildMetadata({title, description, path, noIndex})` menghasilkan title/desc/canonical/OG/Twitter. `openGraph.images` sengaja dikosongkan supaya diisi otomatis oleh `app/opengraph-image.tsx` di S6 (tidak ada URL gambar karangan).
- `app/layout.tsx` sekarang memakai `buildMetadata()`.
- `app/sitemap.ts` (**hanya `/`** — rute yang benar-benar ada) + `app/robots.ts` (allow all + host + sitemap).
- Favicon placeholder `app/icon.svg` (monogram "L", indigo di atas paper). **`app/favicon.ico` bawaan dihapus** karena isinya logo Next.js, bukan merek Lintang.
- `app/ui-demo/page.tsx` — halaman verifikasi komponen, **404 di produksi** (`notFound()` saat `NODE_ENV=production`), `noIndex` di metadata. Isinya contoh netral, bukan klaim tentang Lintang.
- Verifikasi produksi via `next start`: `/` → 200, `/ui-demo` → **404**, `robots.txt` & `sitemap.xml` terbit benar, `<link rel="icon" ... type="image/svg+xml">` terpasang. `npm run build` ✅ · `npm run lint` ✅.
**Gagal / skip / blocker (jujur):**
- ⚠️ **`prefers-reduced-motion` BELUM diuji di browser sungguhan.** Tidak ada browser yang bisa saya kendalikan di lingkungan ini. Yang sudah dipastikan: (a) tiap komponen motion punya cabang `if (shouldReduceMotion) return <div>…` yang deterministik, jadi tidak ada transform/opacity sama sekali; (b) blok `@media (prefers-reduced-motion: reduce)` ada di `globals.css`. **Perlu Lintang / S6:** emulasikan di DevTools → Rendering → "Emulate CSS media feature prefers-reduced-motion".
- 🔴 **Temuan penting untuk S3:** HTML server dari Framer Motion berisi `opacity:0; transform:translateY(16px)` (terkonfirmasi di output `/ui-demo`). Artinya apa pun yang dibungkus `Reveal`/`Stagger` **tidak terlihat sampai hidrasi** → kalau hero dibungkus, target **LCP <2s** berisiko gagal. Mitigasi yang sudah dipasang: `<noscript>` di `app/layout.tsx` memaksa `[data-reveal]` jadi `opacity:1` untuk pengunjung tanpa JS. Aturan yang saya pegang di S3: **hero tidak dibungkus komponen motion**; Reveal hanya untuk section di bawah lipatan.
- ⚠️ `robots.txt`/canonical saat ini menunjuk `https://lintangbalakosa.dev` yang **belum diregistrasi**. `lib/seo.ts` sudah menyediakan override `NEXT_PUBLIC_SITE_URL`, tapi env-nya belum diset di Vercel — jadi kalau di-redeploy sekarang, sitemap menunjuk domain yang belum resolve. Diselesaikan di S6 (atau set env sekarang bila mau).
- Tidak ada deploy ulang di sprint ini (S2 tidak memintanya); situs live masih berisi skeleton S1.
- `@base-ui/react` kini tidak terpakai (bekas Button shadcn). Dibiarkan terpasang karena komponen shadcn lain mungkin membutuhkannya; kalau sampai S6 tetap tak terpakai, bisa di-uninstall.
**Keputusan / catatan:**
- **Kenapa Button shadcn diganti:** varian bawaan (`base-nova`) berukuran aplikasi padat (tinggi default 32px) dan bergantung pada primitive `@base-ui/react`, sementara yang dibutuhkan portfolio adalah CTA besar yang bisa jadi link. Konvensi shadcn (`cva` + `cn` + `components.json`) tetap dipertahankan, jadi `npx shadcn add` untuk komponen lain masih jalan normal.
- Efek hover-lift **tidak** ditaruh di `Card` melainkan di `HoverLift`, supaya seluruh keputusan animasi (termasuk reduced-motion) terpusat di `components/motion/`.
- `Section` dan `SectionHeading` dipisah supaya section bisa memakai heading level berbeda tanpa merusak urutan h1→h2→h3.
- Sitemap sengaja **tidak** mendaftarkan `/projects/*` atau `/log` sebelum halamannya ada — sitemap berisi 404 merugikan SEO. Ditambah di S4 & S7.
- `keywords` §7 dipasang di metadata apa adanya (11 kata kunci, tanpa stuffing).
**CONFIG/TODO yang masih menunggu Lintang:** *(tidak berubah — 13 token masih `null`, `DOMAIN` masih default)*
- ⛔ `LINKEDIN_URL` · `ANKOP_MONTHS` · `ANKOP_KG_CUMULATIVE` · `PROOF_ANKOP` · `PROOF_BISASINEMA` · `PROOF_TERA` · `PROOF_HOTEL` · `PROOF_BANKSAMPAH` · `CLIENT_NAME_PERMISSION` · `CV_FILE` · `PHOTO_FILE` · `IO_FESTIVAL_DATE` · `IO_FESTIVAL_STACK`
- 🟡 `DOMAIN` — belum diregistrasi; berdampak langsung ke canonical & sitemap (lihat blocker di atas).
- ⛔ Non-token: repo GitHub (auto-deploy), file `Satoshi-Variable.woff2`.
**Commit:** `S2: design system, shared UI, motion primitives, SEO scaffold`
**Sprint berikutnya:** S3 — Hero + About + Skills (menunggu instruksi)

### [2026-07-25 22:39] — Sprint S1 — Foundation & Setup
**Status:** ✅ selesai
**Selesai:**
- Scaffold `create-next-app`: **Next.js 16.2.11 + React 19.2.4 + TypeScript strict + Tailwind v4**, App Router, tanpa `src/`, alias `@/*`. Scaffold dibuat di subfolder sementara lalu dipindah ke root (create-next-app menolak folder yang sudah berisi file `.md` panduan).
- Struktur folder BLUEPRINT §8 dibuat (`components/sections`, `components/motion`, `content/log`, `public/cv|fonts|images`, `app/projects/[slug]`, `app/log`) dengan `.gitkeep`.
- `lib/fonts.ts`: Space Grotesk (`--font-display`), Space Mono (`--font-code`), DM Sans (`--font-body-fallback`) + export `fontVariables`.
- `content/config.ts`: **14 token CONFIG §0.1** lengkap, bertipe, semua `null` + `// TODO(lintang)`, plus helper `isSet()` supaya UI menyembunyikan elemen alih-alih merender token kosong. Email & GitHub (fakta CV) dipisah ke `CONTACT`.
- `app/globals.css`: palet §3.2 + type-scale clamp §3.3 + `prefers-reduced-motion` + `.mono`/`.stat-num`; token shadcn dipetakan ke palet (mis. `--primary → --indigo`, `--border → #E6E3DC`, `--radius → 14px`).
- Install: `framer-motion` 12, `@vercel/analytics` 2 (baru dipasang, **belum di-mount** — itu scope S6), shadcn/ui init (menambah `components.json`, `lib/utils.ts`, `components/ui/button.tsx`, `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`, `tw-animate-css`, `@base-ui/react`).
- `app/layout.tsx`: `lang="id"`, font variables di `<html>`, `metadataBase` dari `CONFIG.DOMAIN`, title & description dari §7.
- `app/page.tsx`: skeleton minimal — hanya nama + role label §4.1 + "Situs sedang dibangun". **Tanpa angka/klaim.**
- `npm run build` ✅ sukses (Turbopack, 4 halaman statis). `npm run lint` ✅ bersih.
- Deploy skeleton **LIVE**: https://lintang-sigma.vercel.app (HTTP 200, publik, title benar). Deployment URL: `lintang-gs2pjp8mw-lintangs-projects-cae75e2f.vercel.app`, akun Vercel `code081805-1658`, project `lintang`.
- `git init` + commit pertama.
**Gagal / skip / blocker (jujur):**
- ⚠️ **"Connect repo ke Vercel" TIDAK terpenuhi sepenuhnya.** Belum ada repo GitHub (dan `gh` CLI tidak terpasang), jadi deploy dilakukan lewat **Vercel CLI manual**, bukan integrasi Git. Akibatnya belum ada auto-deploy tiap `git push` — ini yang diandalkan alur "tambah post = git push" di S7. **Perlu Lintang:** buat repo GitHub + hubungkan di dashboard Vercel.
- ⚠️ **Satoshi belum ada.** `public/fonts/Satoshi-Variable.woff2` tidak tersedia; `next/font/local` akan menggagalkan build bila file hilang, jadi blok `localFont` sengaja **dinonaktifkan (dikomentari)** di `lib/fonts.ts` dan body memakai **DM Sans**. Ini persis jalur yang diizinkan BLUEPRINT §3.1. Aktifkan blok tersebut setelah file ditaruh.
- `tailwind.config.ts` **tidak dibuat** — Tailwind v4 memakai konfigurasi CSS-first (`@theme` di `globals.css`); file config JS sudah tidak dipakai. Deviasi dari daftar file §8, disengaja.
- `next.config.mjs` → nyatanya `next.config.ts` (bawaan scaffold Next 16). Deviasi kosmetik.
- Blok `.dark` bawaan shadcn **dihapus** (nilai netral oklch, bukan palet brand) karena §3.2 menaruh dark mode sebagai fast-follow. Variant `dark:` tetap bisa dipakai nanti.
- Token `--chart-*` dan `--sidebar-*` bawaan shadcn dihapus karena tidak dipakai; kalau nanti butuh komponen sidebar/chart, `npx shadcn add` akan menambahkannya lagi.
- `README.md` masih bawaan create-next-app — belum disentuh (bukan scope S1).
- `npm audit` melaporkan 12 kerentanan high dari dependency transitif scaffold; belum ditindak (perlu cek apakah menyentuh runtime produksi — masuk backlog S6).
**Keputusan / catatan:**
- **Nama variabel font Space Mono diubah** dari `--font-mono` (di BLUEPRINT §3.1) menjadi `--font-code`. Alasan: Tailwind v4 sudah memakai `--font-mono` sebagai token tema bawaannya, dan next/font menyetel variabel lewat class di `<html>` — dua-duanya menyasar elemen yang sama dengan spesifisitas setara, jadi rawan tabrakan diam-diam. `--font-code` dipetakan ke `--font-mono` Tailwind di `@theme`, sehingga utility `font-mono` **dan** class `.mono`/`.stat-num` sama-sama menghasilkan Space Mono.
- `--accent` diikat ke `--indigo` sesuai §3.2. Konsekuensinya hover ghost/outline bawaan shadcn ikut indigo (bukan abu-abu netral). Ditinjau ulang saat komponen `Button`/`Card`/`Badge` dibuat di S2.
- Turbopack aktif default di Next 16 untuk `dev` maupun `build` — tidak ada konfigurasi webpack, jadi aman.
- Breaking change Next 16 yang dicatat untuk sprint berikutnya: `params`/`searchParams` kini **async** (berdampak ke `app/projects/[slug]` di S4), begitu pula `params` di `opengraph-image` (S6) dan `id` di `sitemap` (S2).
- SVG bawaan scaffold (`next.svg`, `vercel.svg`, dll) dihapus dari `public/`.
**CONFIG/TODO yang masih menunggu Lintang:** *(tidak berubah dari Sprint 0 — semua 14 token masih `null`)*
- ⛔ `LINKEDIN_URL` · ⛔ `ANKOP_MONTHS` · ⛔ `ANKOP_KG_CUMULATIVE` · ⛔ `PROOF_ANKOP` · ⛔ `PROOF_BISASINEMA` · ⛔ `PROOF_TERA` · ⛔ `PROOF_HOTEL` · ⛔ `PROOF_BANKSAMPAH` · ⛔ `CLIENT_NAME_PERMISSION` · ⛔ `CV_FILE` · ⛔ `PHOTO_FILE` · ⛔ `IO_FESTIVAL_DATE` · ⛔ `IO_FESTIVAL_STACK`
- 🟡 `DOMAIN` — diisi default `lintangbalakosa.dev` di `content/config.ts` (dipakai `metadataBase`). **Belum diregistrasi/dihubungkan**; sampai itu terjadi situs hidup di `lintang-sigma.vercel.app`.
- ⛔ Non-token: `ownVsTeam` + 1 pelajaran tiap hero project (blokir kelengkapan S4); file font Satoshi; repo GitHub.
**Commit:** `S1: foundation, tooling, fonts, config tokens, Vercel skeleton`
**Sprint berikutnya:** S2 — Design System & Shared UI (menunggu instruksi)

### [2026-XX-XX 00:00] — Sprint 0 — Inisialisasi
**Status:** 🟡 jalan (menunggu CONFIG dari Lintang sebelum konten final)
**Selesai:**
- Menerima paket panduan: `PORTFOLIO_BLUEPRINT.md`, `SPRINTS_AND_TRACKING.md`, `PROGRESS_LOG.md`, `EXECUTION_PROMPTS.md`.
- Fondasi terkunci: Full-Stack primary; stack Next.js(App Router)+TS strict+Tailwind+Framer Motion+shadcn/ui; deploy Vercel; fonts Space Grotesk/Satoshi(+DM Sans)/Space Mono; palet paper/ink/indigo/coral.
**Gagal / skip / blocker (jujur):**
- Belum ada kode. Belum boleh ngoding sampai PROMPT 0 dijalankan & package manager dikonfirmasi.
- Beberapa konten case study TIDAK bisa difinalkan karena menunggu data hanya-Lintang (lihat di bawah). Ini **tidak memblokir** S1–S2 (setup/design system) tapi **memblokir kelengkapan** S3–S5.
**Keputusan / catatan:**
- Angka yang sudah FAKTA dari CV (Rp20jt+, 5.000+ kg, 15+ supplier, ~80%, 6 dashboard) boleh dipakai, **wajib berkonteks waktu**; sisanya token CONFIG.
- MVP = S1–S6; Log = S7 fast-follow.
**CONFIG/TODO yang masih menunggu Lintang:**
- ⛔ `LINKEDIN_URL` — CV lama mengarah ke `/tinachi1`; butuh URL asli (blokir link LinkedIn di S3/S5).
- ⛔ `ANKOP_MONTHS` + `ANKOP_KG_CUMULATIVE` — konteks waktu 5.000+ kg (blokir hero strip final S3 & case study Ankop S4).
- ⛔ `PROOF_ANKOP` / `PROOF_BISASINEMA` / `PROOF_TERA` / `PROOF_HOTEL` / `PROOF_BANKSAMPAH` + `CLIENT_NAME_PERMISSION` — jenis bukti & izin nama klien (blokir bagian "Bukti" S4).
- ⛔ `CV_FILE` — PDF untuk Download CV (blokir tombol S5).
- ⛔ `PHOTO_FILE` — foto profil (blokir hero visual & OG S6).
- 🟡 `DOMAIN` — default `lintangbalakosa.dev` (konfirmasi/registrasi Lintang).
- ⛔ `IO_FESTIVAL_DATE` + `IO_FESTIVAL_STACK` — seed Log post (blokir S7).
- ⛔ ownVsTeam Ankop/Bisasinema + 1 pelajaran tiap hero — narasi jujur (blokir kelengkapan S4).
**Commit:** (belum)
**Sprint berikutnya:** S1 — Foundation & Setup (menunggu PROMPT 0 lalu instruksi S1)
