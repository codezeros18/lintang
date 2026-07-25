# EXECUTION_PROMPTS_PHASE2.md
**Prompt siap-copy PER sprint · Fase 2 Redesign · Portfolio Lintang Balakosa Ardhana**

> Pakai di chat Claude Code yang SUDAH berisi repo fase 1 + `PORTFOLIO_BLUEPRINT.md` + `SPRINTS_PHASE2_REDESIGN.md` + `PROGRESS_LOG.md`.
> Jalankan **PROMPT R0** dulu → lalu R1…R6 satu per satu. Agen **berhenti di akhir tiap sprint**.
>
> 🔒 **ATURAN INTI SEPANJANG FASE (tempel di kepala tiap prompt):**
> - **DILARANG menyalin bryllim.com / leerob.com piksel-per-piksel** (layout signature, warna, font, komponen, aset). Itu plagiat + menurunkan branding + mematahkan klaim full-stack. Yang diadopsi: **alur (IA), storytelling, prinsip layout** — diekspresikan lewat **design system Lintang** (Space Grotesk / Satoshi+DM Sans / Space Mono · paper #FBFAF7 / ink #14141A / indigo #3D5AFE / coral #FF6A3D). Cek tiap keputusan ke `docs/DESIGN_LANGUAGE.md`.
> - **Jangan mengarang** angka/klaim/artikel. Field kosong = token CONFIG + `// TODO(lintang)`.
> - **Tanpa backend/DB berbayar.** Blog/Collabs/Help = MDX/SSG + layanan gratis (Cal.com/Formspree/Web3Forms free tier).
> - **Jaga LCP <2s:** hero & konten atas-lipatan TANPA Framer Motion `opacity:0`. Reveal hanya di bawah lipatan.
> - Akhir sprint: centang tracking + status ✅ + tulis `PROGRESS_LOG.md` (terbaru di atas, jujur) + `git commit` + **BERHENTI**.

---

## PROMPT R0 — Design-language lock (JANGAN redesign dulu)
```
Konteks: MVP fase 1 sudah live. Kita masuk fase 2 (redesign inspired-not-copied + blog/collabs/help).
Baca: PORTFOLIO_BLUEPRINT.md, SPRINTS_PHASE2_REDESIGN.md (R0–R6), PROGRESS_LOG.md.

Kerjakan HANYA R0:
1. Buat docs/DESIGN_LANGUAGE.md. Isi tabel "Peta terjemahan" dari SPRINTS_PHASE2_REDESIGN.md R0 PERSIS,
   lalu untuk tiap baris jabarkan: nilai konkret versi Lintang (ukuran sidebar, spacing, radius, warna, font)
   yang DIAMBIL dari BLUEPRINT §3 — BUKAN dari bryllim/leerob.
   Tambahkan bagian "ANTI-CLONE CHECK": daftar hal yang DILARANG disalin (warna hex bryllim, font bryllim,
   layout signature, aset). Agen wajib mengecek ke file ini di tiap sprint berikutnya.
2. Konfirmasi design tokens final (boleh perhalus, tapi tetap keluarga font & palet BLUEPRINT §3).
   JANGAN mengambil warna/font dari situs referensi.
3. Keputusan infra: apakah bikin repo GitHub sekarang + sambungkan Vercel (blog butuh alur push=deploy)?
   Tanyakan ke user bila belum jelas. Bila ya & belum ada git: `git init`, siapkan .gitignore, commit awal,
   pandu buat remote. JANGAN push kredensial.
4. Catat keputusan DOMAIN (registrasi boleh paralel).

JANGAN mengubah UI/komponen apa pun di R0. Ini fase keputusan + dokumen.

Selesai: centang R0 + ✅; tulis PROGRESS_LOG (keputusan git/domain, ringkas isi DESIGN_LANGUAGE);
git commit -m "R0: design-language lock (inspired-not-copied) + infra decision".
BERHENTI. Tunggu instruksi R1.
```

---

## PROMPT R1 — Layout shell: sidebar + container + rhythm
```
Kerjakan HANYA R1. Patuhi ATURAN INTI. Cek tiap keputusan ke docs/DESIGN_LANGUAGE.md.

Lakukan:
- components/layout/Sidebar.tsx: nav kiri persisten (desktop), collapse jadi drawer/hamburger di <768px.
  Item: Home, Projects, About, Blog, Collabs, Contact. Monogram "LBA" milik Lintang (bukan meniru logo bryllim).
  Warna/tipografi/spacing HANYA dari tokens Lintang (Space Grotesk, indigo, paper). JANGAN meniru sidebar bryllim.
- components/layout/AppShell.tsx: grid [sidebar | content]; content pakai Container (--maxw) + ritme py-20 md:py-28.
- Scroll-spy ringan via IntersectionObserver (highlight section aktif). Tanpa lib berat.
- Perbaiki anchor warisan #projects & #contact agar punya tujuan.
- Mobile drawer: focus-trap + Esc close + hormati prefers-reduced-motion.
- Bungkus app/layout.tsx dengan AppShell.

Verifikasi anti-clone: bandingkan hasil dengan DESIGN_LANGUAGE.md "ANTI-CLONE CHECK". Bila ada yang menyerupai
nilai visual bryllim → ganti ke tokens Lintang. Catat di PROGRESS_LOG bila sempat tergoda.

Selesai: responsif 360px→desktop; scroll-spy jalan; build sukses; centang R1 + ✅; PROGRESS_LOG;
git commit -m "R1: layout shell (sidebar + container + rhythm)".
BERHENTI. Tunggu instruksi R2.
```

---

## PROMPT R2 — Hero + navigasi baru (storytelling entry)
```
Kerjakan HANYA R2. Patuhi ATURAN INTI.

Lakukan:
- Refactor components/sections/hero.tsx ke shell baru: role label (Full-Stack Engineer), headline §4.1,
  sub-headline, hook strip (Space Mono).
- Hero TANPA Framer Motion berat (jaga LCP <2s; opacity:0 di atas-lipatan dilarang). Reveal hanya di bawah lipatan.
- Tambah 1 kalimat "pintu cerita" yang mengajak baca case study naratif.
- Hook strip: pakai ANKOP_MONTHS bila terisi; bila kosong tetap sembunyikan kg (jangan mengarang).
- Identitas visual = tokens Lintang. JANGAN meniru hero bryllim/leerob.

Selesai: hero lolos 8 detik + mengundang baca; LCP tak turun; build sukses; centang R2 + ✅; PROGRESS_LOG;
git commit -m "R2: hero + storytelling entry".
BERHENTI. Tunggu instruksi R3.
```

---

## PROMPT R3 — Case study naratif (feel leerob, suara Lintang)
```
Kerjakan HANYA R3. Patuhi ATURAN INTI. Ambil GAYA storytelling leerob (personal, mendalam, fun),
BUKAN kata-kata/desainnya. Cerita = pengalaman nyata Lintang dari CV.

Lakukan:
- components/projects/CaseStudyArticle.tsx: layout artikel (prosa + subjudul + reading-time), sumber data
  tetap content/projects.ts.
- app/projects/[slug]/page.tsx: pakai layout artikel baru; pertahankan SSG generateStaticParams + generateMetadata.
- Tulis narasi ankop-trace LENGKAP dengan suara Lintang: problem (kenapa penting) → keputusan (kenapa offline-first,
  kenapa NestJS/Prisma) → proses/momen sulit → hasil [FAKTA] + konteks waktu → pelajaran.
  Blok ownVsTeam & learned: tampilkan HANYA bila token terisi; bila kosong sembunyikan (JANGAN mengarang).
- Bukti etis: PROOF_* kosong → "Bukti menyusul" + rencana; tak ada demo palsu.
- Analisis Hotel tetap 1 case study + badge SurabayaDev (anti double-count).
- Tambah "next project" di akhir.

Selesai: ankop-trace jadi artikel naratif utuh & jujur; angka berkonteks; build+SSG sukses; centang R3 + ✅;
PROGRESS_LOG; git commit -m "R3: narrative case study (leerob-style voice)".
BERHENTI. Tunggu instruksi R4.
```

---

## PROMPT R4 — Blog (MDX/SSG, cross-post LinkedIn)
```
Kerjakan HANYA R4. Patuhi ATURAN INTI. TANPA backend/DB berbayar.

Lakukan:
- Extend lib/mdx.ts untuk content/blog/*.mdx (reuse next-mdx-remote).
- app/blog/page.tsx (list: judul, tanggal, tag, ringkasan) + app/blog/[slug]/page.tsx (SSG) + generateMetadata.
- app/blog/rss.xml (route handler, feed statis).
- Tag statis dari frontmatter (title, date, tags[], summary, canonical opsional link LinkedIn). Tanpa DB.
- content/blog/_TEMPLATE.mdx + dokumentasikan alur cross-post LinkedIn→MDX di komentar file.
- Seed 2 post: boleh draft dengan // TODO(lintang) untuk isi final. JANGAN mengarang artikel utuh
  seolah tulisan Lintang.

Selesai: /blog + detail + RSS jalan (SSG); nol backend berbayar; build sukses; centang R4 + ✅; PROGRESS_LOG;
git commit -m "R4: blog (mdx/ssg + rss + linkedin cross-post flow)".
BERHENTI. Tunggu instruksi R5.
```

---

## PROMPT R5 — Collabs + Consulting/Help
```
Kerjakan HANYA R5. Patuhi ATURAN INTI. Framing JUJUR (bukan jasa berbayar yang belum bisa di-back-up).

Lakukan:
- app/collabs/page.tsx (atau section home): showcase aktivitas kolaboratif dari CV (I/O Festival, SurabayaDev,
  CIMB Niaga) + kartu "Ajak saya collab" (lomba / bantu UMKM / proyek).
- CTA: email (mailto) WAJIB; WhatsApp (wa.me) OPSIONAL — TANYAKAN dulu ke user apakah nomor boleh publik
  (ada isu privasi nomor di CV). Default email saja bila belum dikonfirmasi.
- components/sections/Help.tsx: framing "Open to collaborate & help developers" (BUKAN "consulting" berbayar).
  Link Cal.com (gratis) untuk booking ngobrol. Bila pakai form → Formspree/Web3Forms free tier, bukan backend sendiri.
- Semua statis; tanpa DB.

Selesai: Collabs & Help tampil; CTA email jalan; framing jujur; privasi nomor diputuskan; build sukses;
centang R5 + ✅; PROGRESS_LOG; git commit -m "R5: collabs + open-to-help (no paid backend)".
BERHENTI. Tunggu instruksi R6.
```

---

## PROMPT R6 — Polish · a11y · perf · SEO/OG · Re-deploy (REDESIGN LIVE)
```
Kerjakan HANYA R6. Patuhi ATURAN INTI.

Lakukan:
- OG image per-tipe (home/project/blog/collabs) via next/og.
- Update sitemap.ts + robots.ts untuk route baru (/blog, /collabs, blog slugs).
- A11y AA: kontras, alt text (bila ada gambar), semantic, focus ring, skip-link, drawer focus-trap.
- Hapus app/ui-demo (dev-only) sebelum launch.
- Set NEXT_PUBLIC_SITE_URL ke domain final (bila sudah ada); canonical/OG resolve.
- Cek broken link (LinkedIn setelah LINKEDIN_URL terisi).
- Siapkan custom domain + HTTPS.

WAJIB diserahkan ke Lintang (agen tak punya browser/HP):
- Audit Lighthouse mobile ≥90 & LCP <2s pada /blog dan case study naratif (halaman terberat).
- Registrasi/hubungkan domain.
- Tes di HP asli.
Tulis instruksi langkah-demi-langkah untuk ketiganya di PROGRESS_LOG. JANGAN tutup R6 ✅ sampai Lintang
mengonfirmasi Lighthouse lolos.

Selesai (tunggu konfirmasi Lintang utk perf/domain/HP): centang task yang selesai; set R6 🟡→✅ HANYA setelah
gate performa dibuktikan; PROGRESS_LOG; git commit -m "R6: polish, a11y, seo/og, redesign redeploy".
BERHENTI.
```

---

## BONUS C — Anti-clone audit (jalankan kapan pun ragu)
```
Jangan tulis fitur baru. Audit orisinalitas desain:
- Bandingkan komponen layout/hero/kartu terhadap docs/DESIGN_LANGUAGE.md "ANTI-CLONE CHECK".
- Tandai elemen mana pun yang nilai visualnya (warna/font/spacing/layout signature) menyerupai bryllim/leerob
  alih-alih tokens Lintang. Perbaiki ke tokens Lintang.
- Tulis temuan di PROGRESS_LOG. git commit -m "chore: anti-clone audit + fixes".
BERHENTI.
```

## BONUS D — Isi CONFIG lanjutan (setelah Lintang menjawab)
```
Update content/config.ts dengan nilai yang Lintang berikan (LINKEDIN_URL, ANKOP_MONTHS, PROOF_*, CV_FILE,
PHOTO_FILE, DOMAIN, ownVsTeam/learned tiap proyek, izin nomor WA, CLIENT_NAME_PERMISSION).
- Hapus // TODO(lintang) HANYA untuk yang benar-benar terisi.
- Perbarui UI bergantung (hero strip, link LinkedIn, Download CV, blok case study ownVsTeam/learned, bukti,
  CTA collabs) TANPA mengarang nilai yang belum ada.
- CLIENT_NAME_PERMISSION=false → pakai anonymousName otomatis.
- Build; catat di PROGRESS_LOG token mana terisi/menunggu.
git commit -m "content: fill CONFIG (phase 2)".
BERHENTI.
```
