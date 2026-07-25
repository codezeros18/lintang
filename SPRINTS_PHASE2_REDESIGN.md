# SPRINTS_PHASE2_REDESIGN.md
**Fase 2: Redesign (inspired, bukan clone) + Blog/Collabs/Consulting · Portfolio Lintang Balakosa Ardhana**
Dibangun DI ATAS repo yang sudah ada (S1–S7 fase 1). Sumber kebenaran tetap `PORTFOLIO_BLUEPRINT.md`.

> ⚠️ **Prinsip hukum & branding (tidak bisa dilanggar):** kita **TIDAK menyalin** bryllim.com atau leerob.com piksel-per-piksel.
> Kita mengadopsi **alur (IA), storytelling, dan prinsip layout** lalu mengekspresikannya dalam **design system Lintang sendiri**
> (Space Grotesk / Satoshi+DM Sans / Space Mono · paper #FBFAF7 / ink #14141A / indigo #3D5AFE / coral #FF6A3D).
> Menyalin persis = plagiat + menurunkan branding + mematahkan klaim "full-stack engineer". Referensi = inspirasi, bukan template.
>
> **Integritas data tetap berlaku:** jangan mengarang angka/klaim; field kosong = token CONFIG + `// TODO(lintang)`.
> **Tanpa backend/DB berbayar** — blog/collabs/consulting semuanya MDX/SSG + layanan gratis.

---

## 0 — Prasyarat sebelum fase ini (WARISAN dari fase 1 yang belum tuntas)

Redesign menumpuk di atas fondasi. Beberapa blocker fase-1 harus diberesi dulu atau paralel — **jangan tumpuk hutang**:

| Blocker warisan | Dari | Wajib kapan | Siapa |
|---|---|---|---|
| Audit Lighthouse mobile ≥90 / LCP <2s | S6 | Sebelum R5 (perf gate) | **Lintang** (butuh browser) |
| Registrasi custom domain | S6 | Sebelum launch ulang | **Lintang** |
| Tes di HP asli | S6 | Sebelum launch ulang | **Lintang** |
| Repo GitHub + sambung Vercel (auto-deploy) | Backlog | **Sebelum R1** (alur "push = deploy" diandalkan blog) | **Lintang** + agen — ⏳ diputuskan di R0 (publik); menunggu URL repo dari Lintang |
| `LINKEDIN_URL`, `PROOF_*`, `CV_FILE`, `ownVsTeam`, `learned` | CONFIG | Sebelum sebar URL | **Lintang** |

> Redesign **tidak** memperbaiki blocker ini secara ajaib. R0 memaksa memutuskannya lebih dulu.

---

## Ringkasan sprint (fase 2)

| Sprint | Nama | Cakupan | Status |
|---|---|---|---|
| **R0** | Design-language lock (inspired, not copied) | Bedah pola bryllim/leerob → terjemah ke design tokens Lintang; git+domain decision | ✅ |
| **R1** | Layout shell — sidebar + container + rhythm | Sidebar nav, container lega, spacing scale, sticky/scroll-spy | 🔲 |
| **R2** | Hero + navigasi baru (storytelling entry) | Hero versi baru, nav antar-section, motion aman-LCP | 🔲 |
| **R3** | Case study naratif (feel leerob) | Ubah case study jadi cerita panjang problem→akhir; template baru | 🔲 |
| **R4** | Blog (MDX/SSG, cross-post LinkedIn) | `/blog`, list, tag, RSS; nol backend | 🔲 |
| **R5** | Collabs + Consulting/Help | `/collabs` (lomba/kerja + CTA ajak collab) · section Help (Cal.com link) | 🔲 |
| **R6** | Polish · a11y · perf · SEO/OG · **Re-deploy (REDESIGN LIVE)** | Gate performa, OG per-tipe, domain, retest HP | 🔲 |

Legenda: 🔲 belum · 🟡 jalan · ✅ selesai.
Default agen: **berhenti di akhir tiap sprint**, tunggu instruksi. Tiap akhir sprint: centang task + status ✅ + tulis `PROGRESS_LOG.md` (terbaru di atas, jujur) + `git commit`.

---

## R0 — Design-language lock (inspired, NOT copied)
**Goal:** punya "kamus terjemahan" tertulis: pola apa dari bryllim/leerob yang diambil, dan bagaimana ia jadi bahasa visual Lintang — supaya agen tidak tergoda menyalin persis.

**Tasks:**
- [x] Tulis `docs/DESIGN_LANGUAGE.md` berisi tabel: *Pola yang diambil* → *Terjemahan ke tokens Lintang* → *Yang SENGAJA dibuat beda* (lihat "Peta terjemahan" di bawah — WAJIB dipakai).
- [x] Konfirmasi tokens final — palet & keluarga font **tidak berubah**; ditambah `--sidebar-w: 240px` & `--nav-item-h: 36px` (ukuran, bukan warna/font; dipasang di R1).
- [x] Putuskan repo GitHub → ✅ **ya, publik.** ⏳ Menunggu Lintang membuat repo & mengirim URL; agen menyambungkan remote + push. **Sambungan Vercel wajib beres sebelum R1.**
- [x] Putuskan `DOMAIN` → ✅ **`lintangbalakosa.dev`** (sudah jadi nilai `CONFIG.DOMAIN`; registrasi paralel).

**Peta terjemahan (WAJIB — ini yang membuat "inspired" bukan "copy"):**
| Pola dari referensi | Diadopsi sbg | Terjemahan ke bahasa Lintang | Yang dibuat BEDA (anti-clone) |
|---|---|---|---|
| bryllim: sidebar nav kiri tetap | Prinsip: nav persisten hemat ruang | Sidebar kiri **dengan tipografi Space Grotesk + aksen indigo**, monogram "LBA" sendiri | Lebar, warna, item nav, ikon → milik Lintang; bukan salinan tata letak Bryl |
| bryllim: container lega + banyak white-space | Prinsip: ruang bernafas | Container `--maxw` + ritme `py` sendiri di atas paper `#FBFAF7` | Skala spacing & radius versi BLUEPRINT §3.3, bukan angka bryllim |
| bryllim: section Blog/Collabs/Consulting | IA (struktur situs) | Nama & isi section dari CV Lintang (lomba nyata, bantu developer) | Copy, kategori, dan visual kartu orisinal |
| leerob: case study naratif personal/fun | Gaya menulis | Narasi problem→akhir pakai suara Lintang (jujur, konkret, angka CV) | Bukan meniru kata-kata/joke leerob; cerita nyata Ankop/Bisasinema |
| leerob: konten-first, ringan | Prinsip performa | LCP <2s dipertahankan (hero tanpa motion berat) | — |

**Definition of Done:** `docs/DESIGN_LANGUAGE.md` ada & disepakati; tidak ada nilai warna/font/aset yang disalin dari referensi; keputusan git/domain tercatat di PROGRESS_LOG.
**Files:** `docs/DESIGN_LANGUAGE.md`, (opsional) `content/config.ts` (DOMAIN), setup git remote.

---

## R1 — Layout shell: sidebar + container + rhythm
**Goal:** kerangka layout baru (sidebar persisten + area konten ber-container) menggantikan layout one-page polos, TANPA menyalin bryllim.

**Tasks:**
- [ ] `components/layout/Sidebar.tsx`: nav kiri persisten (desktop) → **collapse jadi top-bar/hamburger di <768px**. Item: Home, Projects, About, Blog, Collabs, Contact. Monogram "LBA" sendiri.
- [ ] `components/layout/AppShell.tsx`: grid `[sidebar | content]`; content pakai `Container` (`--maxw`) + ritme section `py-20 md:py-28`.
- [ ] **Scroll-spy** ringan (highlight section aktif) — IntersectionObserver, bukan lib berat.
- [ ] Perbaiki anchor warisan: `#projects`, `#contact` kini punya tujuan pasti (backlog fase 1).
- [ ] Mobile: sidebar → drawer; pastikan focus-trap + `Esc` close (a11y).
- [ ] Hormati `prefers-reduced-motion` untuk transisi drawer.

**Definition of Done:** sidebar tampil & responsif 360px→desktop; scroll-spy jalan; tak ada nilai visual yang menyerupai bryllim (cek terhadap `DESIGN_LANGUAGE.md`); build sukses.
**Files:** `components/layout/Sidebar.tsx`, `AppShell.tsx`, `app/layout.tsx` (bungkus AppShell).

---

## R2 — Hero + navigasi baru (storytelling entry)
**Goal:** hero yang mengundang orang "membaca cerita", bukan sekadar banner — feel leerob, isi & identitas Lintang.

**Tasks:**
- [ ] Refactor `components/sections/hero.tsx` ke shell baru: role label (Full-Stack Engineer), headline §4.1, sub-headline, hook strip (Space Mono).
- [ ] **Hero tetap tanpa Framer Motion berat** (jaga LCP <2s — backlog fase 1 sudah memperingatkan `opacity:0` merusak LCP). Reveal hanya di bawah lipatan.
- [ ] Tambah 1 kalimat "pintu cerita" → mengajak ke case study naratif (mis. "Setiap proyek di sini punya cerita — dari masalah sampai bukti.").
- [ ] Hook strip: pakai `ANKOP_MONTHS` bila terisi; bila kosong tetap sembunyikan kg (aturan fase 1), jangan mengarang.

**Definition of Done:** hero lolos uji 8 detik + mengundang baca; LCP tak turun; identitas visual = tokens Lintang; build sukses.
**Files:** `components/sections/Hero.tsx`.

---

## R3 — Case study naratif (feel leerob)
**Goal:** ubah case study dari "kartu terstruktur" jadi **cerita mengalir** (problem → keputusan → proses → hasil → pelajaran), personal & jujur.

**Tasks:**
- [ ] Template baru `app/projects/[slug]/page.tsx`: layout artikel (prosa panjang + subjudul) alih-alih blok kaku. Pertahankan field data (`content/projects.ts`) sbg sumber.
- [ ] Tulis narasi Ankop **lengkap** (hero utama) dengan suara Lintang — konkret, angka CV + konteks waktu, jujur soal `ownVsTeam`/`learned` **begitu Lintang mengisi** (sampai itu, blok disembunyikan, jangan diarang).
- [ ] Sisipkan elemen "cerita": kutipan keputusan ("kenapa offline-first"), momen sulit, apa yang berubah setelahnya.
- [ ] Bukti tetap etis: `PROOF_*` kosong → "Bukti menyusul" + rencana; tak ada demo palsu.
- [ ] Anti double-count: Analisis Hotel = 1 case study + badge SurabayaDev (pertahankan).
- [ ] Reading-time + "next project" di akhir (dorong lanjut baca).

**Definition of Done:** minimal `ankop-trace` jadi artikel naratif utuh & jujur; angka berkonteks waktu; tak ada klaim karangan; build + SSG sukses.
**Files:** `app/projects/[slug]/page.tsx`, `content/projects.ts`, komponen artikel (`components/projects/CaseStudyArticle.tsx`).

---

## R4 — Blog (MDX/SSG, cross-post LinkedIn) — TANPA backend berbayar
**Goal:** section blog hidup untuk branding "berbagi insight & bantu developer", nol biaya server.

**Tasks:**
- [ ] Reuse pipeline MDX fase-1 (`lib/mdx.ts`, `next-mdx-remote`) untuk `content/blog/*.mdx`.
- [ ] `app/blog/page.tsx` (list: judul, tanggal, tag, ringkasan) + `app/blog/[slug]/page.tsx` (SSG) + `generateMetadata`.
- [ ] `app/blog/rss.xml` (route handler statis) untuk feed.
- [ ] Tag/kategori sederhana (statis, dari frontmatter) — **tanpa DB**.
- [ ] **Strategi anti-blog-mati (WAJIB, seperti Log):** dokumentasikan alur **cross-post dari LinkedIn** — tiap post LinkedIn jadi `.mdx`. Sediakan `content/blog/_TEMPLATE.mdx`.
- [ ] Seed 2 post nyata dari materi Lintang (mis. pelajaran dari Ankop/kompetisi) — `// TODO(lintang)` untuk isi final; **jangan mengarang artikel**.
- [ ] Frontmatter: `title, date, tags[], summary, canonical (opsional link LinkedIn)`.

**Catatan jujur:** blog bernilai TINGGI untuk brandingmu, TAPI **blog mati > tak ada blog**. Komit ritme realistis (mis. 1–2/bulan atau tiap ada post LinkedIn). Jangan janji mingguan.

**Definition of Done:** `/blog` + detail ter-render (SSG); RSS valid; tag jalan; ≥2 seed (boleh draft `// TODO(lintang)`); nol backend berbayar; build sukses.
**Files:** `app/blog/*`, `content/blog/*`, `lib/mdx.ts` (extend).

---

## R5 — Collabs + Consulting/Help
**Goal:** dua kail branding: (a) Collabs — orang bisa ajak Lintang kolaborasi (lomba/kerja/bantu UMKM); (b) Help — Lintang terbuka bantu developer.

**Tasks:**
- [ ] `app/collabs/page.tsx` **atau** section di home: showcase aktivitas kolaboratif (lomba nyata dari CV: I/O Festival, SurabayaDev, CIMB) + kartu "Ajak saya collab" (lomba / bantu UMKM / proyek).
- [ ] CTA Collabs = `mailto:` + link WhatsApp (`wa.me/62812…` — **konfirmasi Lintang** apakah mau nomornya publik; ada isu privasi nomor di CV — lihat backlog fase 1). Default: email dulu, WA opsional.
- [ ] Section **Help / Open to mentor**: framing **jujur** — bukan "jasa konsultan berbayar" (overclaim untuk fresh-grad), tapi "terbuka bantu developer yang lagi bingung". Link **Cal.com** (gratis, open-source) untuk booking ngobrol.
- [ ] Semua statis; tanpa DB. Form (bila perlu) via Formspree/Web3Forms free tier — bukan backend sendiri.

**Catatan jujur (branding, jangan dilewati):** hindari kata "Consulting" berbayar selama masih mahasiswa/fresh-grad — bisa terbaca overclaim & menurunkan kredibilitas. "Open to collaborate & help" lebih autentik dan tetap menjual.

**Definition of Done:** Collabs & Help tampil; CTA berfungsi (email min.); tak ada klaim jasa berbayar yang belum bisa di-back-up; privasi nomor diputuskan; build sukses.
**Files:** `app/collabs/page.tsx` (atau section), `components/sections/Help.tsx`.

---

## R6 — Polish · a11y · perf · SEO/OG · Re-deploy (REDESIGN LIVE)
**Goal:** redesign live, lolos gate performa, semua route baru ter-SEO.

**Tasks:**
- [ ] OG image per-tipe (home / project / blog / collabs) via `next/og`.
- [ ] Update `sitemap.ts` + `robots.ts` untuk route baru (`/blog`, `/collabs`, blog slugs).
- [ ] **Gate performa (WAJIB, hanya Lintang):** Lighthouse mobile ≥90 & LCP <2s pada halaman terberat (blog list & case study naratif). Jangan tutup R6 tanpa ini.
- [ ] A11y AA: kontras, alt text (begitu ada gambar), semantic, focus, skip-link, drawer focus-trap.
- [ ] Hapus `app/ui-demo` (dev-only) sebelum launch (backlog fase 1).
- [ ] Set `NEXT_PUBLIC_SITE_URL` ke domain final; canonical/OG resolve.
- [ ] Custom domain + HTTPS; **tes di HP asli**.
- [ ] Cek broken link (khusus LinkedIn setelah `LINKEDIN_URL` terisi).

**Definition of Done:** redesign LIVE di `DOMAIN`; Lighthouse mobile ≥90 & LCP <2s (dibuktikan Lintang); OG per-tipe ter-render; a11y AA; tak ada token bocor/link mati; diuji di HP asli.
**Files:** `app/opengraph-image.tsx` (+ per-route), `app/sitemap.ts`, `app/robots.ts`.

> 🎯 **Setelah R6 = REDESIGN LIVE.** Baru sebar URL ke LinkedIn/Glints/Kalibrr/Dealls/IG **setelah** `PROOF_*`, `LINKEDIN_URL`, `CV_FILE` terisi.

---

## Catatan lintas-sprint (WAJIB)
1. Centang task `[x]` + set status ✅ di tabel ringkasan fase 2.
2. Tulis entri `PROGRESS_LOG.md` (terbaru di atas; jujur soal skip/blocker).
3. `git commit` dengan pesan yang disarankan di `EXECUTION_PROMPTS_PHASE2.md`.
4. **Jangan menyalin nilai visual referensi.** Setiap keputusan desain dicek terhadap `docs/DESIGN_LANGUAGE.md`. Ragu → pakai tokens Lintang.
5. **Jangan mengarang data/konten.** Field/artikel kosong → `// TODO(lintang)`.
6. **Berhenti** di akhir sprint; tunggu instruksi berikutnya.

### Backlog fase 2 (diisi selama eksekusi)
- [ ] Blog: siapkan 2–3 post cross-post dari LinkedIn saat launch (hindari feed kosong).
- [ ] Collabs: keputusan nomor WhatsApp publik (privasi).
- [ ] Help: pastikan framing "mentor/collab", bukan "consultant berbayar".
- [ ] Warisan fase 1 yang masih terbuka (Lighthouse, domain, HP test, PROOF_*, LINKEDIN_URL, CV_FILE, ownVsTeam/learned) — jangan launch sebelum beres.
