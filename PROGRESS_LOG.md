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

### [2026-07-25 23:58] — Sprint S6 — Polish · a11y · perf · SEO/OG · Analytics · Prod deploy
**Status:** 🟡 jalan — **situs LIVE**, tapi 3 task S6 tidak bisa saya selesaikan sendiri (Lighthouse, custom domain, tes HP). Status sprint sengaja **tidak** saya set ✅.
**URL live:** **https://lintang-sigma.vercel.app** (HTTPS aktif, deployment `lintang-lzg1mc0dt-…`)
**Selesai:**
- `content/hook-stats.ts` — angka hook dipindah ke **satu sumber** yang dipakai Hero **dan** OG image, supaya angka di situs tidak mungkin berbeda dari angka di preview share.
- `app/opengraph-image.tsx` (`next/og`, 1200×630) — nama, role label, headline, dan hook strip dengan teks besar. Sudah dilihat hasil render PNG-nya: on-brand (paper/ink/indigo) dan terbaca sebagai thumbnail kecil.
- `app/apple-icon.tsx` (180×180) — monogram sama dengan `app/icon.svg`, karena iOS tidak memakai favicon SVG.
- `@vercel/analytics` dipasang di `app/layout.tsx`. Terverifikasi di produksi: komponennya ada di chunk client dan `/_vercel/insights/script.js` → 200.
- **Skip-link** "Lompat ke konten utama" sebagai elemen fokus pertama, `<main id="main">` di homepage & halaman case study.
- **Audit kontras WCAG diukur, bukan dikira-kira** (script perhitungan rasio). Hasil: ink/paper 17.58 · ink-muted/paper 7.06 · ink-muted/card 7.37 · ink-muted/secondary 6.46 · putih/indigo 5.13 · indigo/paper 4.92.
  🔧 **Satu kegagalan ditemukan & diperbaiki:** coral `#FF6A3D` sebagai teks hanya **2.73:1** di atas paper — gagal AA. Ditambahkan token `--coral-ink: #B34A2B` khusus teks (**5.12:1** di paper, **5.34:1** di card, **4.71:1** di atas tint badge coral). Coral asli tetap dipakai untuk isian non-teks. Semua `text-coral`/`decoration-coral` dialihkan.
- Cek broken link: GitHub `codezeros18` → 200. LinkedIn memang tidak ditautkan sama sekali.
- Cek kebocoran token di 5 halaman produksi: tidak ada `TODO(lintang)`, `PROOF_*`, `ANKOP_MONTHS`, `CV_FILE`, `PHOTO_FILE`, `LINKEDIN_URL`, maupun `undefined`.
- `/ui-demo` → **404 di produksi** (halaman kerja internal tidak bocor).
- `NEXT_PUBLIC_SITE_URL` diset di Vercel (production) ke URL `.vercel.app`, jadi canonical/`og:url`/`og:image`/`robots.txt`/`sitemap.xml` semuanya menunjuk URL yang **benar-benar resolve** — bukan `lintangbalakosa.dev` yang belum ada.
- Verifikasi live: `/` `/projects/ankop-trace` `/robots.txt` `/sitemap.xml` `/opengraph-image` `/apple-icon` → semua **200**. `npm run build` ✅ · `npm run lint` ✅.
**Gagal / skip / blocker (jujur):**
- ⛔ **Lighthouse mobile TIDAK dijalankan.** Tidak ada browser yang bisa saya kendalikan di lingkungan ini, jadi **saya tidak punya skor apa pun untuk dilaporkan** — dan saya tidak akan mengarang angka. Target ≥90 & LCP <2s **belum terbukti**. Yang bisa saya ukur: HTML halaman utama ±103 KB (termasuk RSC payload), 11 chunk JS. **Aksi Lintang:** buka DevTools → Lighthouse → Mobile di URL live, lalu catat skornya di sini.
- ⛔ **Custom domain belum dipasang** — `lintangbalakosa.dev` belum diregistrasi. Situs live di subdomain Vercel. Begitu domain aktif: tambahkan di dashboard Vercel, lalu **hapus** env `NEXT_PUBLIC_SITE_URL` supaya canonical kembali ke `CONFIG.DOMAIN`.
- ⛔ **Tes di HP asli belum dilakukan** — hanya bisa Lintang. Termasuk verifikasi responsif 360px yang sejak S3 belum pernah diuji di viewport sungguhan.
- ⛔ **Optimisasi gambar tidak dikerjakan karena tidak ada gambar sama sekali** di situs — belum ada foto profil maupun screenshot bukti. Begitu `PHOTO_FILE` ada, hero + OG perlu `next/image` dengan `priority`.
- ⚠️ **Favicon "final" masih monogram huruf L**, bukan logo hasil desain. Fungsional dan on-brand, tapi kalau Lintang punya mark sendiri, ganti di `app/icon.svg` + `app/apple-icon.tsx`.
- ⚠️ **A11y belum diuji dengan screen reader sungguhan.** Yang sudah: kontras terukur, HTML semantik (`<main>`, `<ol>`, `<dl>`, urutan heading h1→h2→h3), focus ring di semua elemen interaktif, skip-link, `aria-hidden` pada ornamen. Belum: uji NVDA/VoiceOver dan uji navigasi keyboard menyeluruh.
- ⚠️ **`prefers-reduced-motion` masih belum diuji di browser** (menggantung sejak S2).
- ⚠️ Deploy masih lewat **Vercel CLI manual**, bukan integrasi Git — repo GitHub belum ada. `git push` belum memicu redeploy.
**Keputusan / catatan:**
- Status S6 saya set **🟡 bukan ✅**. MVP-nya memang sudah live dan berfungsi, tapi tiga item Definition of Done (skor Lighthouse, custom domain, tes HP) belum terpenuhi — menandainya selesai berarti menyembunyikan itu.
- 🔴 **Saran kuat: JANGAN sebarkan URL dulu.** Situs sekarang tidak punya bukti satu pun (5 token `PROOF_*` kosong), tidak punya link LinkedIn, tidak punya tombol CV, dan tidak punya foto. Recruiter yang membuka hari ini melihat klaim tanpa bukti — persis lawan dari prinsip §1 "bukti di atas klaim". Isi dulu `PROOF_*`, `LINKEDIN_URL`, `CV_FILE`, `PHOTO_FILE`, plus `ownVsTeam`/`learned`.
- `--coral-ink` adalah token baru di luar §3.2. Alasannya murni aksesibilitas: palet asli tidak lolos AA untuk teks. Coral asli tidak diubah.
**CONFIG/TODO yang masih menunggu Lintang:** *(13 token masih `null`)*
- 🔴 Jalankan **Lighthouse mobile** di URL live + catat skornya.
- 🔴 5 token `PROOF_*` · `LINKEDIN_URL` · `CV_FILE` · `PHOTO_FILE` · `ownVsTeam`/`learned` 4 hero.
- 🔴 Registrasi `DOMAIN` + hubungkan di Vercel (lalu hapus env `NEXT_PUBLIC_SITE_URL`).
- 🔴 Tes di HP asli (termasuk 360px).
- ⛔ `ANKOP_MONTHS` · `ANKOP_KG_CUMULATIVE` · `CLIENT_NAME_PERMISSION` · `IO_FESTIVAL_DATE` · `IO_FESTIVAL_STACK` · data CV yang hilang (S5).
- ⛔ Repo GitHub (auto-deploy) · file `Satoshi-Variable.woff2`.
**Commit:** `S6: polish, a11y, perf, SEO/OG, analytics, prod deploy (MVP live)`
**Sprint berikutnya:** S7 — Log/Activity (MDX, fast-follow) — menunggu instruksi

### [2026-07-25 23:41] — Sprint S5 — Experience/Achievements + Contact + CV
**Status:** ✅ selesai (dengan satu task sengaja tidak dikerjakan — lihat blocker)
**Selesai:**
- `content/experience.ts` — timeline kerja (Ankop Trace, Bisasinema, Bank Sampah Digital, PT Anugrah Energi), 3 prestasi (I/O 🥇, SurabayaDev 🥉, CIMB Niaga 🥈), dan sertifikasi (BNSP, Digital Skola). Tipe `WorkItem`/`Achievement`/`Certification` memakai `string | null` untuk periode/tahun/penerbit supaya yang belum pasti bisa disembunyikan.
- `components/sections/experience-achievements.tsx` — timeline bertitik indigo di kiri (2 kolom di layar besar), kartu medali, daftar sertifikasi. Tiap entri ringkas 1–2 baris, tanpa buzzword dan tanpa skill-dump.
- **Anti double-count dijaga:** kartu medali SurabayaDev hanya memuat judul + link "Lihat case study-nya" ke `/projects/analisis-pembatalan-hotel`. Pekerjaannya tidak diceritakan ulang. Entri kerja Ankop & Bisasinema juga menaut ke case study masing-masing.
- `components/sections/contact.tsx` — naskah §4.5 ("Terbuka untuk peran full-stack (dan proyek yang butuh sisi data). Paling cepat lewat email."), tombol email besar, daftar email + GitHub.
- `app/page.tsx` lengkap: Hero → Featured Projects → About → Skills → Experience → Contact (urutan §2). Anchor `#projects` dan `#contact` yang dipakai hero **sekarang sudah punya tujuan**.
- Verifikasi di server produksi: semua entri tampil benar; **tidak ada** `href="/cv/null"`, `href="null"`, teks `null`, atau `TODO(lintang)` yang bocor ke HTML. `npm run build` ✅ · `npm run lint` ✅.
**Gagal / skip / blocker (jujur):**
- ⛔ **Org roles TIDAK dikerjakan.** BLUEPRINT tidak memuat satu pun data organisasi, dan file CV tidak ada di repo — jadi tidak ada yang bisa ditulis tanpa mengarang. Struktur `organizationRoles` sudah disiapkan dan blok "Organisasi" muncul otomatis begitu diisi. Ini satu-satunya task S5 yang tidak selesai.
- ⛔ **Sertifikat Coursera dilewati.** Nama kursus dan penerbitnya tidak ada di BLUEPRINT maupun di repo. Menuliskan "Coursera" tanpa nama sertifikat sama saja klaim kosong, jadi barisnya tidak dirender.
- ⚠️ **Data CV yang saya tidak punya** (semuanya dibiarkan `null` dan tidak ditampilkan): periode magang PT Anugrah Energi · periode Bank Sampah Digital · tahun I/O Festival · tahun CIMB Niaga. Yang tampil hanya periode Ankop (Jun 2026) & Bisasinema (Mar 2026) serta tahun SurabayaDev (2025) — ketiganya memang ada di BLUEPRINT.
- ⚠️ **Role PT Anugrah Energi saya tulis "Frontend Developer (magang)"** — turunan dari §4.3 ("magang frontend di lingkungan produksi sejak 2023"), sedangkan nama perusahaannya sendiri hanya muncul di `EXECUTION_PROMPTS.md`, bukan di BLUEPRINT. **Judul role persisnya perlu dikonfirmasi Lintang.**
- ⚠️ **LinkedIn tidak ditautkan sama sekali.** `LINKEDIN_URL` masih `null`, dan BLUEPRINT §0.1 memperingatkan hyperlink di CV lama mengarah ke `/tinachi1`. Menautkan tebakan berisiko mengarahkan recruiter ke profil orang lain — jadi barisnya disembunyikan sampai URL-nya dipastikan. Ini **kehilangan satu kanal konversi**.
- ⚠️ **Tombol Download CV disabled** ("Download CV — segera") karena `public/cv/` masih kosong. Sesuai instruksi S5 (disabled rapi, bukan link mati). Catatan: di hero (S3) saya justru mengganti slotnya dengan CTA "Hubungi" — jadi tombol disabled hanya ada satu, di Contact.
- Tidak ada deploy di sprint ini (S5 tidak memintanya).
**Keputusan / catatan:**
- Timeline diurutkan dari yang terbaru (Ankop → Bisasinema → Bank Sampah → PT Anugrah Energi) lewat field `order` eksplisit, karena sebagian periodenya `null` sehingga tidak bisa diurutkan otomatis.
- Nama penerbit "Digital Skola" untuk Data Science Bootcamp diambil dari `EXECUTION_PROMPTS.md` (dokumen proyek), bukan dari BLUEPRINT. Dicatat di komentar file supaya jelas sumbernya.
- Sertifikasi dirender sebagai daftar ringkas dengan badge penerbit, bukan kartu besar — kredensial mendukung, bukan bintang utama (§1).
- Email dijadikan tombol primer karena §4.5 menyebut "paling cepat lewat email".
**CONFIG/TODO yang masih menunggu Lintang:** *(13 token masih `null`)*
- 🔴 `LINKEDIN_URL` — sekarang berdampak terlihat: **tidak ada link LinkedIn di situs sama sekali.**
- 🔴 `CV_FILE` — tombol Download CV disabled.
- 🔴 5 token `PROOF_*` + `ownVsTeam`/`learned` (dari S4) — masih blocker terbesar.
- 🔴 Data CV yang hilang: role/periode PT Anugrah Energi · periode Bank Sampah · tahun I/O Festival & CIMB · sertifikat Coursera · org roles.
- ⛔ `ANKOP_MONTHS` · `ANKOP_KG_CUMULATIVE` · `PHOTO_FILE` · `CLIENT_NAME_PERMISSION` · `IO_FESTIVAL_DATE` · `IO_FESTIVAL_STACK`
- 🟡 `DOMAIN` masih default. Non-token: repo GitHub, file Satoshi.
**Commit:** `S5: experience/achievements + contact + CV`
**Sprint berikutnya:** S6 — Polish · a11y · perf · SEO/OG · Analytics · **Prod deploy (MVP LIVE)** (menunggu instruksi)

### [2026-07-25 23:26] — Sprint S4 — Featured Projects + Case Study pages
**Status:** ✅ selesai
**Selesai:**
- `content/projects.ts` — 4 hero (Ankop Trace, Bisasinema, Tera, Analisis Pembatalan Hotel) + 2 sekunder (Kuali, Bank Sampah Digital) sesuai skema §5.1, isinya dari §5.2. Ditambah helper `displayName()`, `resolveProof()`, `honestyTone()`.
- `components/sections/featured-projects.tsx` — grid 4 kartu urut Ankop → Bisasinema → Tera → Analisis Hotel, tiap kartu: badge kejujuran, tagline, tech chip (Space Mono), role + durasi, hover-lift, dan *stretched link* (seluruh kartu bisa diklik tapi hanya judul yang jadi teks tautan supaya screen reader tetap masuk akal). Di bawahnya "Other projects" berisi Kuali & Bank Sampah sebagai kartu kecil.
- Section ini dipasang **tepat setelah Hero, sebelum About** sesuai urutan "bukti dulu" §2.
- `app/projects/[slug]/page.tsx` — SSG lewat `generateStaticParams` (**4 halaman ter-prerender**, terlihat di output build), `dynamicParams = false` supaya slug asing 404, `generateMetadata` per halaman. Urutan blok: Problem → Keputusan & alasannya → (Kerja sendiri vs tim) → Hasil → (Satu pelajaran) → Bukti → Status proyek.
- **Analisis Hotel = SATU case study.** Medali SurabayaDev jadi badge di kartu & halamannya, bukan entri proyek terpisah.
- `app/sitemap.ts` kini memuat 4 URL case study (rutenya sudah benar-benar ada).
- Verifikasi di server produksi: `/` 200 · `/projects/ankop-trace` 200 · `/projects/tera` 200 · **`/projects/kuali` 404** (sekunder memang tidak punya case study). Label kejujuran benar: produksi ×2, **produksi (production-ready)** untuk Tera, kompetisi, hackathon, bootcamp.
- **Cek kebocoran token:** tidak ada string `TODO(lintang)`, `PROOF_*`, `ANKOP_MONTHS`, maupun teks `null` yang tampil di HTML kelima halaman. `npm run build` ✅ · `npm run lint` ✅.
**Gagal / skip / blocker (jujur):**
- 🔴 **Tidak ada satu pun bukti yang bisa ditampilkan.** Kelima token `PROOF_*` masih `null`, jadi keempat case study menampilkan blok **"Bukti menyusul"** + rencana buktinya (mis. Ankop: "screenshot beranotasi + walkthrough Loom, butuh izin klien"). Tidak ada demo palsu, tidak ada link mati. Tapi jujur saja: **case study tanpa bukti adalah kelemahan terbesar situs ini sekarang.**
- 🔴 **Blok "Kerja sendiri vs tim" dan "Satu pelajaran" hilang di keempat proyek** karena `ownVsTeam` & `learned` belum diisi. Keduanya justru bagian yang paling membedakan dari fresh-grad lain (§1: "judgment di atas fresh-grad"). Jadi `ankop-trace` **jujur dan berfungsi, tapi belum "lengkap"** seperti target DoD sprint.
- 🔴 **Angka "5.000+ kg" tetap tidak ditampilkan** — juga di case study Ankop, konsisten dengan keputusan S3. Aturan §0.2 mengikatnya ke `ANKOP_MONTHS` yang masih kosong. Hasil Ankop yang tampil: 15+ supplier aktif · ~80% acceptance rate (live) · puluhan juta rupiah pembayaran terdigitalisasi. Angka kg **otomatis muncul** begitu token diisi.
- ⚠️ **Durasi Tera tidak ditampilkan** (`durationNote: null`) karena §5.2 sendiri menandainya TODO. Halaman Tera hanya menampilkan role. Sempat saya isi dengan string `"// TODO(lintang): …"` — itu akan bocor ke UI, jadi diubah jadi `null` dan bloknya disembunyikan.
- ⚠️ Role Tera saya isi **"Full-Stack Engineer"**; §5.2 tidak menyebut role spesifik untuk Tera, hanya bertanya "solo project? durasi?". Kalau role sebenarnya berbeda, ini perlu dikoreksi Lintang.
- ⚠️ Kuali & Bank Sampah `results: []` — CV/BLUEPRINT §5.3 tidak menyebut hasil terukur, jadi tidak saya karang. Kartunya hanya menampilkan tagline + tech.
- Kuali tidak punya token bukti sendiri di §0.1, jadi field `proof` dibuat opsional dan Kuali tidak mengklaim bukti apa pun.
- Tidak ada deploy di sprint ini (S4 tidak memintanya).
**Keputusan / catatan:**
- 🟠 **`CLIENT_NAME_PERMISSION` masih `null` — saya memilih MENAMPILKAN nama klien** ("Ankop Trace", "Bisasinema"). Alasannya: nama-nama itu adalah riwayat kerja di CV Lintang sendiri, dan menyebut tempat kerja adalah hal lazim. Tapi ini **keputusan saya, bukan izin dari klien.** Nama anonim sudah disiapkan (`anonymousName`: "Produsen kopi specialty", "Brand film & edukasi") dan **otomatis dipakai begitu token diset `false`** — cukup satu baris. **Lintang: mohon pastikan ini sebelum situs disebarkan.**
- Tera dilabeli **"produksi (production-ready)"** sesuai §5.2, karena belum ada konfirmasi tenant berbayar. Konservatif dengan sengaja.
- Deviasi kecil dari skema §5.1, semuanya demi aturan §9 (token tidak boleh bocor ke UI): `ownVsTeam`, `learned`, dan `durationNote` bertipe `string | null` supaya bloknya bisa disembunyikan; `proof` dijadikan opsional dan diikat ke token lewat `configKey`; ditambah field `tech[]` (untuk chip) dan `award` (medali).
- Deskripsi `approach` ditulis dengan **alasan keputusan**, bukan daftar teknologi — sesuai instruksi "approach + KENAPA". Isinya parafrase dari §5.2, tanpa menambah klaim teknis baru.
- Hanya 4 hero yang punya halaman case study; sekunder sengaja tidak (`/projects/kuali` → 404).
**CONFIG/TODO yang masih menunggu Lintang:** *(13 token masih `null`)*
- 🔴 **Prioritas tertinggi sekarang:** `PROOF_ANKOP` · `PROOF_BISASINEMA` · `PROOF_TERA` · `PROOF_HOTEL` · `PROOF_BANKSAMPAH` — tanpa ini semua case study berakhir "bukti menyusul".
- 🔴 **`ownVsTeam` + `learned` untuk 4 hero** (bukan token, tapi blokir kelengkapan case study).
- 🔴 `CLIENT_NAME_PERMISSION` — lihat keputusan di atas.
- ⛔ `ANKOP_MONTHS` + `ANKOP_KG_CUMULATIVE` · `CV_FILE` · `PHOTO_FILE` · `LINKEDIN_URL` · `IO_FESTIVAL_DATE` · `IO_FESTIVAL_STACK`
- ⛔ Durasi & status solo/tim proyek Tera; konfirmasi role Tera.
- 🟡 `DOMAIN` masih default. Non-token: repo GitHub, file Satoshi.
**Commit:** `S4: featured projects + case study pages`
**Sprint berikutnya:** S5 — Experience/Achievements + Contact + CV (menunggu instruksi)

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
