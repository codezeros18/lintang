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

### [2026-07-26 09:20] — Di luar sprint — Tipografi diganti ke keluarga Geist
**Status:** ✅ selesai
**Pemicu:** Permintaan Lintang — memakai keluarga **Geist**, mengacu pada portfolio referensi (bryllim).
**Selesai:**
- `lib/fonts.ts` ditulis ulang: **Geist Sans** untuk `--font-display` **dan** `--font-body`, **Geist Mono** untuk `--font-code`. Semuanya lewat `next/font/google` → tetap **self-hosted saat build**, nol permintaan ke server Google saat halaman dibuka.
- `app/globals.css`: rantai fallback `var(--font-body, var(--font-body-fallback))` dihapus di dua tempat karena `--font-body` kini selalu terdefinisi.
- Space Grotesk, Space Mono, dan DM Sans **dilepas seluruhnya**; komentar di `sidebar.tsx`, `badge.tsx`, `section-heading.tsx` ikut disesuaikan agar tidak menyesatkan.
- **Utang Satoshi lunas.** Blok `localFont` yang sejak S1 dinonaktifkan sudah tidak relevan; `public/fonts/` dikosongkan. Item "file Satoshi belum ada" bisa dicoret dari daftar utang.
- `npm run build` ✅ (24 halaman) · `npm run lint` ✅ · diverifikasi lewat screenshot 1280px: headline, body, dan angka hook semuanya ter-render Geist.
**Yang saya sampaikan sebelum mengerjakan (dan tetap berlaku):**
- ✅ **Aman secara lisensi.** Geist open-source (OFL) buatan Vercel dan bahkan jadi font default `create-next-app` — scaffold S1 kita memakainya sebelum saya ganti ke Space Grotesk. Memakainya **bukan** plagiat dalam bentuk apa pun.
- ⚠️ **Biayanya di diferensiasi, bukan legalitas.** Geist sangat lazim di portfolio Next.js. Space Grotesk membuat situs terbaca sebagai keputusan desain; Geist mendekatkannya ke tampilan default framework. Untuk positioning "di atas level template", ini kemunduran kecil yang perlu disadari.
- Lintang tetap memilih Geist. **Keputusan pemilik proyek, dan mudah dibalik** (ganti 3 baris di `lib/fonts.ts`).
**Dampak ke dokumen (dirapikan supaya tidak saling bertentangan):**
- `docs/DESIGN_LANGUAGE.md` §2.2 ditulis ulang + baris font di §1.1/§1.4 disesuaikan + catatan kaki di tabel peta terjemahan (tabelnya sendiri tidak diedit karena harus "persis" salinan sprint doc).
- **ANTI-CLONE §3.1 aturan #2 dilonggarkan secara eksplisit** dan tercatat: larangan memakai font referensi dicabut untuk Geist. **Yang tetap penuh berlaku:** jangan membuka situs referensi untuk mengambil nilai apa pun, dan penambahan font baru butuh keputusan Lintang — bukan inisiatif agen.
- `PORTFOLIO_BLUEPRINT.md` §3.1 diberi blok **OVERRIDE** di atas spesifikasi lama. Spesifikasi aslinya **sengaja tidak dihapus** supaya niat desain awal tetap terbaca dan gampang dikembalikan.
**Gagal / skip / blocker (jujur):**
- ⚠️ **OG image belum ikut Geist.** `lib/og.tsx` merender lewat Satori, yang butuh **berkas font mentah** — `next/font` tidak menyediakannya. Jadi preview share masih memakai sans-serif bawaan sistem, sementara situsnya Geist. Tidak saya kerjakan karena tidak diminta dan butuh mengunduh `.ttf` ke repo. **Kalau mau seragam, bilang** — saya unduh Geist `.ttf` ke `public/fonts/` lalu suapkan ke `ImageResponse`.
- ⚠️ Belum di-deploy saat entri ini ditulis (menyusul di langkah berikutnya).
- ⚠️ Gate Lighthouse R6 **masih menunggu Lintang**; perubahan font tidak menggugurkan kebutuhan itu — malah sebaiknya diukur setelah font final terpasang.
**Commit:** `type: switch typography to the Geist family`

### [2026-07-26 08:45] — Fase 2 · Sprint R6 — Polish · a11y · SEO/OG · redeploy
**Status:** 🟡 **jalan — SENGAJA belum ✅.** Semua yang bisa dikerjakan agen sudah selesai dan **redesign sudah LIVE**, tapi gate performa belum dibuktikan. Instruksi R6 melarang menutupnya sebelum Lintang mengonfirmasi Lighthouse.
**URL live (redesign):** **https://lintang-sigma.vercel.app**
**🔧 Perbaikan a11y terbesar: `Reveal`/`Stagger` ditulis ulang**
- Masalah yang dicatat di R5: HTML server memuat `opacity:0`, `useReducedMotion` tidak berlaku saat SSR, dan konten bisa tidak pernah muncul bila observer gagal.
- Polanya sekarang dibalik — sama seperti perbaikan `CountUp` di R1: **default terlihat**, penyembunyian hanya dilakukan di client setelah dipastikan animasinya bisa jalan. Elemen yang sudah berada di viewport saat mount **tidak pernah disembunyikan sama sekali**.
- Framer Motion dilepas dari `Reveal`, `Stagger`, dan `HoverLift`; ketiganya kini murni CSS + satu `IntersectionObserver`. `prefers-reduced-motion` ditangani di CSS sehingga **berlaku sejak paint pertama, tanpa menunggu JavaScript**.
- Pengaman `<noscript>` dari S2 dihapus karena tidak ada lagi yang perlu diselamatkan.
- **Hasil terukur: `opacity:0` di HTML server = 0** pada `/`, `/blog`, `/collabs`, `/log`, dan case study — sebelumnya 14 di `/collabs` saja. Terverifikasi juga di produksi.
- Efek samping yang bagus: screenshot verifikasi akhirnya bisa menangkap seluruh halaman, sesuatu yang gagal sejak R1.
**Selesai:**
- **OG image per-tipe** lewat satu renderer bersama `lib/og.tsx`: beranda (dengan hook strip), `/blog`, `/collabs`, dan **4 case study** (`/projects/[slug]/opengraph-image` — `params` async, breaking change Next 16). Semuanya 200 `image/png`; hasil render case study Ankop sudah diperiksa mata.
- `sitemap.ts` & `robots.ts` mencakup semua rute baru; draft blog tidak pernah masuk.
- **`app/ui-demo` dihapus** (utang fase 1) — 404 di produksi.
- **Audit kontras diulang untuk 8 pasangan warna yang benar-benar dipakai: semua lolos AA** (ink/paper 17.58 · ink-muted/paper 7.06 · ink-muted/card 7.37 · ink-muted/secondary 6.46 · putih/indigo 5.13 · indigo/paper 4.92 · coral-ink/paper 5.12 · coral-ink/card 5.34).
- Semantic & fokus: `<main id="main">` di **semua** halaman, skip-link, focus ring indigo, drawer `role="dialog"` + `aria-modal` + focus-trap + Esc.
- **Cek broken link menyeluruh** di 6 halaman: 19 tautan internal + aset **semua 200**, GitHub **200**, LinkedIn **999**.
- `NEXT_PUBLIC_SITE_URL` aktif → canonical & OG **resolve** ke URL hidup (diverifikasi di produksi: `https://lintang-sigma.vercel.app/collabs`).
- Deploy produksi: `/` `/blog` `/collabs` `/log` `/projects/*` `/blog/rss.xml` `/sitemap.xml` `/robots.txt` + 4 OG **semua 200**; `/ui-demo` 404.
- `npm run build` ✅ (24 halaman) · `npm run lint` ✅.

---

## ⛔ TIGA HAL YANG HANYA BISA DIKERJAKAN LINTANG

Agen tidak punya browser sungguhan maupun HP. Tanpa ketiganya, R6 tetap 🟡.

### 1. Audit Lighthouse mobile (gate performa — WAJIB)
1. Buka **Chrome** di laptop → `https://lintang-sigma.vercel.app`
2. Tekan **F12** → tab **Lighthouse**
3. Setel: **Mode** = Navigation · **Device** = **Mobile** · centang **Performance**, **Accessibility**, **Best Practices**, **SEO**
4. Klik **Analyze page load**
5. Ulangi untuk **dua halaman terberat**:
   - `https://lintang-sigma.vercel.app/blog`
   - `https://lintang-sigma.vercel.app/projects/ankop-trace`
6. Catat **Performance ≥90** dan **LCP <2s** (LCP ada di bagian "Metrics")
7. **Kirim angkanya** — saya catat di log ini dan baru menutup R6 ✅. Kalau ada yang di bawah target, kirim juga daftar "Opportunities"-nya supaya bisa saya perbaiki.
> Tips: jalankan di **jendela Incognito** tanpa extension — extension bisa menurunkan skor secara palsu.

### 2. Registrasi & pasang custom domain
1. Beli **`lintangbalakosa.dev`** (mis. Niagahoster / Cloudflare Registrar / Porkbun). Domain `.dev` **wajib HTTPS** — otomatis aman.
2. Buka **vercel.com** → project **lintang** → **Settings → Domains** → **Add** → ketik `lintangbalakosa.dev`
3. Vercel menampilkan record DNS. Di panel registrar, tambahkan:
   - `A` record `@` → `76.76.21.21`, **atau** ikuti nameserver yang Vercel tunjukkan
   - `CNAME` `www` → `cname.vercel-dns.com`
4. Tunggu propagasi (biasanya menit–jam). Vercel menerbitkan sertifikat HTTPS otomatis.
5. **Setelah domain hidup:** buka **Settings → Environment Variables**, **hapus** `NEXT_PUBLIC_SITE_URL`, lalu redeploy. Canonical/OG/sitemap otomatis kembali memakai `CONFIG.DOMAIN` (`lintangbalakosa.dev`).

### 3. Tes di HP asli
1. Buka `https://lintang-sigma.vercel.app` di HP (idealnya sekali di Android/Chrome dan sekali di iPhone/Safari).
2. Periksa satu per satu:
   - Tombol **hamburger** membuka drawer; tombol **×** dan tap di luar menutupnya
   - Semua item nav bisa ditekan dengan nyaman (target ≥40px)
   - **Tidak ada scroll ke samping** di halaman mana pun
   - Hook strip terbaca: `Rp20M+ · 5,000+ kg · 6` (**bukan 0**)
   - Tombol **Download CV** benar-benar mengunduh PDF
   - Halaman `/projects/ankop-trace` enak dibaca (ukuran teks, panjang baris)
3. Bonus: nyalakan **Reduce Motion** di setelan HP lalu muat ulang — konten harus **langsung tampil** tanpa animasi.
4. Laporkan apa pun yang aneh; saya perbaiki.

---

**Gagal / skip / blocker (jujur):**
- ⛔ **Lighthouse belum dijalankan** — tidak ada browser sungguhan di lingkungan ini. Target ≥90 & LCP <2s **belum terbukti**, dan saya tidak akan mengarang angkanya. Ini satu-satunya alasan R6 masih 🟡.
- ⛔ **Custom domain belum terpasang** — `lintangbalakosa.dev` belum diregistrasi. Situs hidup di subdomain Vercel (HTTPS aktif).
- ⛔ **Belum diuji di HP asli.**
- ⚠️ **Interaksi drawer & scroll-spy tetap belum diuji di sesi browser sungguhan** (headless tidak bisa klik/gulir). Terverifikasi hanya di tingkat kode + atribut ARIA di HTML. Masuk daftar tes HP di atas.
- ⚠️ **Alt text belum relevan** — situs masih nol gambar (`PHOTO_FILE` kosong). Begitu foto masuk, alt text wajib ditambahkan.
- 🔴 **Repo GitHub masih belum ada** (utang sejak R0). Deploy masih manual; janji "push = deploy" di alur blog belum berlaku.
- 🔴 **Belum layak disebarkan:** 5 token `PROOF_*` kosong (semua case study "Evidence coming soon"), `ownVsTeam`/`learned` kosong, `PHOTO_FILE` kosong, blog kosong.
**ANTI-CLONE CHECK (docs/DESIGN_LANGUAGE.md §3.3) — terhadap diff R6:**
- ✅ Nol hex baru: OG memakai konstanta warna yang identik dengan token §2.1.
- ✅ Nol font baru · nol aset.
- ✅ Situs referensi tidak dibuka selama R6.
**Commit:** `R6: polish, a11y, seo/og, redesign redeploy`
**Berikutnya:** menunggu **angka Lighthouse dari Lintang** → baru R6 ditutup ✅.

### [2026-07-26 07:55] — Fase 2 · Sprint R5 — Collabs + Open-to-help
**Status:** ✅ selesai
**Keputusan Lintang (ditanyakan lebih dulu, sesuai instruksi R5):**
- 🔒 **Nomor WhatsApp TIDAK dipublikasikan.** CTA cukup email. Token `WHATSAPP_NUMBER` tetap disiapkan (`null`) supaya tombol `wa.me` muncul otomatis kalau suatu saat berubah pikiran — tanpa perlu menyentuh komponen. Nomor tetap ada di dalam PDF CV, tapi tidak jadi tautan yang mudah dipanen bot.
- 📅 **Belum punya Cal.com.** Token `CAL_COM_URL` disiapkan (`null` → tombol "Book a chat" **disembunyikan**, bukan link mati). Sementara jalur satu-satunya adalah email.
**Selesai:**
- `app/collabs/page.tsx` — dua lapis: (1) **bukti** kolaborasi nyata dari CV (I/O Festival 🥇, SurabayaDev 🥉, CIMB Niaga 🥈, lengkap dengan konteks masing-masing), (2) **ajakan** lewat 3 kartu: kompetisi & hackathon · membantu usaha kecil go-digital · proyek sampingan dengan pengguna nyata.
- Anti double-count dijaga: kartu SurabayaDev tetap menunjuk ke SATU case study Hotel, bukan diceritakan ulang.
- `components/sections/help.tsx` — framing **"Open to collaborate — and happy to help other developers"**, dengan kalimat eksplisit **"Not a paid service. Just someone a few steps into the same road, with time to talk."** Tidak ada satu pun klaim jasa berbayar.
- Kalimat jujur tambahan di Help: *"I'll also tell you when something is outside what I've done. That's more useful than a confident guess."* — dan di Collabs: pengakuan bahwa ia masih mahasiswa sehingga tidak bisa menerima semua ajakan, tapi akan menjawab cepat alih-alih menghilang.
- Nav **Collabs tidak lagi "soon"**; `/collabs` masuk sitemap. Halaman **statis penuh** (prerender), tanpa DB, tanpa form, tanpa Formspree/Web3Forms — `mailto:` sudah cukup.
- `npm run build` ✅ (19 halaman) · `npm run lint` ✅.
**Verifikasi yang benar-benar dijalankan:**
- ✅ `/collabs` → 200, ter-prerender statis.
- ✅ CTA benar: `mailto:…?subject=Collaboration` dan `mailto:…?subject=Question / help` ada; **`wa.me` dan "Book a chat" TIDAK ada** — sesuai keputusan privasi.
- ✅ Nol kata "consulting"/"hire me"/"paid service" sebagai klaim; yang ada justru penyangkalannya ("Not a paid service").
- ✅ Isi halaman lengkap di HTML (prestasi, kartu ajakan, section Help).
- ⚠️ Screenshot hanya bisa memverifikasi bagian atas halaman — lihat temuan di bawah.
**🔴 Temuan penting untuk R6 (tidak diperbaiki di sini karena di luar scope R5):**
- Saat mencoba men-screenshot `/collabs`, seluruh konten di bawah heading **tidak terlihat**. Setelah ditelusuri, ini bukan bug layout melainkan sifat komponen motion warisan S2:
  1. HTML server memuat **14 elemen `data-reveal` dengan `opacity:0`** (terukur, bukan dugaan).
  2. **`useReducedMotion` tidak berpengaruh pada SSR** — hook itu hanya hidup di client. Artinya pengunjung yang menyalakan `prefers-reduced-motion` **tetap menerima HTML tersembunyi** dan baru melihat isinya setelah hidrasi. Itu justru kebalikan dari maksud reduced-motion.
  3. Pengaman `<noscript>` ada dan selektornya benar (`[data-reveal]{opacity:1!important}` — `!important` di stylesheet memang mengalahkan inline style), tapi **aktivasinya tidak bisa saya buktikan** di headless ini: flag `--disable-javascript` sudah tidak berfungsi dan `--blink-settings=scriptEnabled=false` membuat screenshot gagal dihasilkan.
- Konsekuensi nyata: pada perangkat lambat, JS gagal, atau observer tidak memicu, **seluruh konten di bawah lipatan bisa tidak pernah muncul**. Ini kelas masalah yang sama dengan bug `CountUp` yang saya perbaiki di R1 (yang itu menampilkan angka salah; yang ini menyembunyikan konten).
- **Rekomendasi R6 (sprint a11y + perf):** ubah `Reveal`/`Stagger` agar **default-nya terlihat**, dan penyembunyian hanya dilakukan di client setelah dipastikan animasinya akan berjalan — persis pola yang dipakai untuk memperbaiki `CountUp`.
**Gagal / skip / blocker (jujur):**
- ⚠️ **Verifikasi visual `/collabs` tidak lengkap.** Yang terbukti tampil hanya heading; sisanya dipastikan lewat HTML, bukan mata. Saya tidak mengklaim halamannya "terlihat bagus" — belum bisa saya lihat utuh.
- ⚠️ Section Help hanya ada di `/collabs`, **tidak di beranda**. Pertimbangannya beranda sudah panjang dan Collabs+Help adalah permukaan konversi yang sama. Kalau ingin Help juga di beranda, tinggal satu baris di `app/page.tsx`.
- ⚠️ `CAL_COM_URL` kosong → tidak ada jalur booking; orang hanya bisa email.
- 🔴 **Repo GitHub masih belum ada** (utang sejak R0).
- ⚠️ Belum di-deploy (R5 tidak memintanya).
**ANTI-CLONE CHECK (docs/DESIGN_LANGUAGE.md §3.3) — terhadap diff R5:**
- ✅ Nol hex mentah · nol `font-family` baru · nol aset — memakai `Card`, `Badge`, `Button`, `SectionHeading` yang sudah ada.
- ✅ Situs referensi tidak dibuka selama R5.
- ✅ Copy kartu collab ditulis dari pengalaman Lintang sendiri (lomba nyata, ops kopi, "bukan demo yang berhenti di localhost").
- ✅ Framing Help sengaja **menolak** pola "consulting" yang lazim di situs portofolio — justru menjauh dari template, bukan mendekatinya.
**Commit:** `R5: collabs + open-to-help (no paid backend)`
**Sprint berikutnya:** R6 — Polish · a11y · perf · SEO/OG · re-deploy (menunggu instruksi)

### [2026-07-26 07:15] — Fase 2 · Sprint R4 — Blog (MDX/SSG + RSS + alur cross-post LinkedIn)
**Status:** ✅ selesai
**Selesai:**
- `lib/mdx.ts` di-extend untuk `content/blog/*.mdx` memakai pipeline yang sama dengan Log (gray-matter + `next-mdx-remote`, dibaca saat build). **Nol backend, nol DB, nol biaya server.**
- Frontmatter: `title, date, tags[], summary, canonical, draft`.
- `app/blog/page.tsx` (judul · tanggal · tag · ringkasan) + `app/blog/[slug]/page.tsx` (SSG, `dynamicParams=false`, `generateMetadata`).
- `app/blog/rss.xml/route.ts` dengan **`dynamic = "force-static"`** → dirender sekali saat build dan disajikan sebagai file; tidak ada fungsi server yang jalan per-request. Terverifikasi `Content-Type: application/rss+xml`, XML valid, karakter di-escape (`&apos;` pada judul berapostrof).
- Tag dihitung dari frontmatter saat build (`getBlogTags()`) — statis, tanpa DB.
- `content/blog/_TEMPLATE.mdx` — alur **cross-post LinkedIn → MDX** 5 langkah, ditulis dengan premis "jangan menulis untuk blog; tulis untuk LinkedIn lalu pindahkan", karena itu satu-satunya ritme yang realistis dan blog mati lebih merugikan daripada tidak punya blog.
- Nav: item **Blog tidak lagi "soon"** — rutenya sudah ada, jadi kini tautan sungguhan. `sitemap.ts` memuat `/blog` + post terbit.
**Keputusan penting: `draft: true` dan kenapa itu ada**
- R4 meminta 2 seed post tapi melarang mengarang artikel utuh seolah tulisan Lintang. Dua hal itu bertabrakan kalau seed langsung diterbitkan.
- Solusinya: field **`draft`**. Draft **tidak muncul** di `/blog`, RSS, maupun sitemap di produksi, dan halamannya **404**. Di `next dev` draft tetap terbuka supaya Lintang bisa menulis sambil melihat hasilnya.
- Dua seed dibuat sebagai **kerangka** — judul, tag, dan ringkasan diturunkan dari fakta yang sudah ada (Ankop offline-first; SurabayaDev + pelajaran I/O Festival), lalu tiap bagian isinya `TODO(lintang)`. **Nol paragraf karangan.**
- Efek sampingnya jujur: **`/blog` di produksi saat ini kosong.** Halamannya mengakui itu apa adanya ("No posts published yet") dan mengarahkan ke LinkedIn — yang sekarang bisa ditautkan karena `LINKEDIN_URL` sudah terisi.
**Verifikasi yang benar-benar dijalankan:**
- ✅ Produksi: `/blog` 200 · `/blog/rss.xml` 200 · `/blog/offline-first-was-not-a-choice` **404** (draft benar-benar tidak bocor).
- ✅ Dev: kedua draft tampil dengan badge `draft`, halaman draft 200, RSS ikut merender item + `<category>`. Artinya pipeline-nya benar; yang kosong di produksi memang karena statusnya draft, bukan karena rusak.
- ✅ Sitemap produksi hanya memuat `/blog`, nol URL draft.
- ✅ Screenshot 1280px: halaman kosong tetap terbaca rapi, bukan seperti halaman rusak.
**🔧 Perbaikan yang ditemukan saat verifikasi:**
- Screenshot pertama `/blog` menunjukkan **judul halaman hilang** — `SectionHeading` terbungkus `Reveal` padahal ia berada **di atas lipatan**, melanggar aturan yang saya tetapkan sendiri di R2 (`opacity:0` dilarang di atas lipatan). Diperbaiki: heading dirender langsung, motion hanya untuk kartu di bawahnya.
- ⚠️ **`/log` punya masalah yang sama** (warisan S7: `SectionHeading`-nya dibungkus `Reveal`). Tidak saya sentuh karena di luar scope R4 — **dicatat untuk R6**.
**Gagal / skip / blocker (jujur):**
- ⚠️ **Blog kosong di produksi.** Ini konsekuensi sadar dari larangan mengarang, bukan kelalaian. Sampai Lintang menulis, `/blog` hanya berisi pengakuan + tautan LinkedIn. Backlog fase 2 sendiri sudah menargetkan "2–3 post cross-post saat launch" — itu tetap harus Lintang yang isi.
- ⚠️ **RSS belum diuji dengan post terbit sungguhan di produksi** (karena belum ada). Sudah diuji di dev dan itemnya ter-render benar.
- ⚠️ **Filter tag belum interaktif** — tag hanya ditampilkan sebagai daftar. R4 memintanya "sederhana, statis, tanpa DB", jadi ini sesuai; tapi mengkliknya belum menyaring apa pun. Kalau nanti diinginkan, bentuk termurahnya `/blog/tag/[tag]` yang tetap SSG.
- 🔴 **Repo GitHub MASIH belum ada.** Ini sprint yang paling bergantung padanya: seluruh alur di `_TEMPLATE.mdx` berakhir di "`git push` → Vercel deploy otomatis", dan langkah itu **belum benar-benar berlaku**. Sekarang menambah post masih berarti deploy manual. Utang ini sudah menggantung sejak R0.
- ⚠️ Belum di-deploy (R4 tidak memintanya).
**ANTI-CLONE CHECK (docs/DESIGN_LANGUAGE.md §3.3) — terhadap diff R4:**
- ✅ Nol hex mentah · nol `font-family` baru · nol aset — memakai `Card`, `Badge`, `SectionHeading` yang sudah ada.
- ✅ Situs referensi tidak dibuka selama R4.
- ✅ Copy halaman blog ditulis dari premis cross-post milik Lintang sendiri.
**Commit:** `R4: blog (mdx/ssg + rss + linkedin cross-post flow)`
**Sprint berikutnya:** R5 — Collabs + Help (menunggu instruksi)

### [2026-07-26 06:35] — Fase 2 · Sprint R3 — Case study naratif (leerob-style voice)
**Status:** ✅ selesai
**Selesai:**
- `components/projects/case-study-article.tsx` — layout artikel: header (badge kejujuran, judul, tagline, role · durasi · **reading-time**, tech chip), prosa bersubjudul, lalu blok What changed / Evidence / Project status, ditutup **"Next project"**.
- `app/projects/[slug]/page.tsx` dirampingkan jadi pemanggil komponen artikel. **SSG `generateStaticParams` + `dynamicParams=false` + `generateMetadata` dipertahankan** — 4 halaman tetap ter-prerender.
- **Narasi Ankop Trace lengkap** dalam sudut pandang orang pertama: intro + 5 subjudul — *Why paper was expensive · The constraint I could not negotiate with · Why NestJS and Prisma, specifically · Payments people can actually check · Attendance you can audit*.
- **Reading-time dihitung dari teks yang benar-benar dirender** (4 min untuk Ankop), bukan angka hiasan. Blok yang disembunyikan sengaja tidak ikut dihitung — kalau `learned` nanti diisi, angkanya ikut naik dengan sendirinya.
- **"Next project" berputar** Ankop → Bisasinema → Tera → Hotel → Ankop (diverifikasi keempatnya), jadi pembaca selalu punya langkah berikutnya.
- Proyek tanpa `narrative` (Bisasinema, Tera, Hotel) **tetap tampil sebagai artikel**, isinya dirakit dari `problem` + `approach` yang sudah ada — tidak ada teks yang dikarang untuk menambal.
- `npm run build` ✅ (16 halaman, 4 case study SSG) · `npm run lint` ✅.
**Verifikasi yang benar-benar dijalankan:**
- ✅ Struktur heading Ankop persis seperti rancangan; `4 min read` dan `Jun 2026–present · Bandung` tampil.
- ✅ **Blok "Solo vs team" dan "One lesson" TIDAK ada di HTML** — token `ownVsTeam`/`learned` masih `null`, jadi benar-benar disembunyikan, bukan diisi tebakan.
- ✅ **Anti double-count:** badge `3rd Place, National — SurabayaDev 2025` hanya muncul di case study Hotel, nol kemunculan di case study lain.
- ✅ `PROOF_ANKOP` kosong → "Evidence coming soon" + rencana buktinya. Nol demo palsu.
- ✅ Screenshot desktop 1280px: artikel terbaca lega, tipografi Space Grotesk untuk subjudul, prosa memakai `max-w-3xl`.
**Gagal / skip / blocker (jujur):**
- 🟠 **"Momen sulit" TIDAK ditulis sebagai anekdot personal — ini penyimpangan sadar dari instruksi R3.** Instruksi meminta "proses/momen sulit", tapi kejadian personal (mis. "suatu malam sync-nya konflik dan saya begadang memperbaikinya") **hanya Lintang yang tahu**; mengarangnya sama saja memalsukan pengalaman, dan itu melanggar aturan inti proyek.
  Yang saya tulis sebagai gantinya: **kendala yang terdokumentasi** — sinyal yang drop di pabrik — dinarasikan sebagai bagian tersulit yang membentuk arsitektur ("The constraint I could not negotiate with"). Semuanya bersumber CV. **Kalau Lintang mengirim satu cerita nyata (bug tersulit, konflik sync, penolakan di lapangan), saya sisipkan dan artikelnya langsung jauh lebih kuat.**
- ⚠️ **Hanya Ankop yang punya narasi penuh.** DoD R3 memang menetapkan "minimal `ankop-trace`", jadi ini terpenuhi — tapi Bisasinema, Tera, dan Hotel masih terasa lebih kaku dibanding Ankop. Menulis narasi mereka butuh detail proses yang tidak ada di CV.
- ⚠️ `learned` keempat proyek masih kosong, jadi **tidak ada satu pun artikel yang ditutup dengan pelajaran** — padahal justru itu penutup terkuat sebuah case study naratif.
- ⚠️ **Repo GitHub masih belum ada** (utang sejak R0; R4/blog benar-benar mengandalkannya).
- ⚠️ Belum di-deploy (R3 tidak memintanya).
**Catatan penulisan:**
- Setiap kalimat naratif bisa ditelusuri ke CV atau BLUEPRINT §5.2. Tipe `narrative` di `content/projects.ts` diberi komentar aturan ini supaya sprint berikutnya tidak tergoda menambah anekdot.
- Yang saya ambil dari referensi hanyalah **cara bercerita** (prosa orang pertama, subjudul yang berupa kalimat, membuka dengan konteks sebelum teknis). Nol kata, nol struktur kalimat, nol lelucon yang dipinjam.
**ANTI-CLONE CHECK (docs/DESIGN_LANGUAGE.md §3.3) — terhadap diff R3:**
- ✅ Nol hex mentah · nol `font-family` baru · nol aset — semua warna lewat token yang sudah ada.
- ✅ Situs referensi tidak dibuka selama R3.
- ✅ Judul-judul section ditulis dari materi Ankop sendiri, bukan pola judul referensi.
**Commit:** `R3: narrative case study (leerob-style voice)`
**Sprint berikutnya:** R4 — Blog MDX/SSG (menunggu instruksi) — **repo GitHub sebaiknya beres dulu**

### [2026-07-26 06:05] — Fase 2 · Sprint R2 — Hero + storytelling entry
**Status:** ✅ selesai
**Selesai:**
- **Pintu cerita ditambahkan** — satu kalimat yang mengubah hero dari banner jadi undangan membaca: *"Every project here has a story — from the problem to the proof."* diikuti tautan **"Start with Ankop Trace →"**.
- Tautannya menunjuk `/projects/ankop-trace` — halaman yang **benar-benar ada** dan sudah ter-SSG sejak S4, bukan janji kosong. Panah `→` ditaruh **di dalam** tautan (`&nbsp;` + `aria-hidden`) supaya tidak pernah terpisah ke baris lain; sempat terpisah di render pertama dan langsung diperbaiki.
- Hero diselaraskan ke shell R1: padding atas `pt-12` di mobile (top bar sticky sudah memakan ruang) → `md:pt-20` di desktop (sidebar menggantikan top bar, hero boleh lebih lega).
- Naskah §4.1 **tidak diubah sama sekali** — role label, headline, sub-headline, dan hook strip tetap apa adanya. Yang bertambah hanya satu kalimat yang memang diminta R2.
- `npm run build` ✅ · `npm run lint` ✅.
**Verifikasi yang benar-benar dijalankan:**
- ✅ **Hero bebas motion, diukur bukan diklaim:** posisi byte di HTML produksi menunjukkan `opacity:0` pertama ada di indeks 15574, sedangkan hook strip berakhir di 13373 — artinya seluruh konten atas-lipatan bersih dari `opacity:0`, dan Reveal hanya hidup di bawahnya. Ini menjawab langsung larangan R2.
- ✅ Desktop 1280px: hero + sidebar tampil utuh, hook strip menunjukkan angka benar (`Rp20M+ · 5,000+ kg · 6`).
- ✅ 360px sungguhan (lewat iframe, karena Chrome headless meng-clamp `--window-size` ke ≥400px): kalimat pintu cerita membungkus rapi, panah menempel pada "Trace", tidak ada overflow horizontal.
**Gagal / skip / blocker (jujur):**
- ⚠️ **LCP tidak diukur.** R2 mensyaratkan "LCP tak turun", tapi tidak ada Lighthouse di lingkungan ini. Yang bisa saya buktikan: hero tetap server-rendered, tidak ada client component baru (tautan pintu cerita dirender di server), dan tidak ada `opacity:0` di atas lipatan. **Angka LCP sesungguhnya tetap harus diukur Lintang** — sudah jadi gate R6.
- ⚠️ Bagian "navigasi baru" pada judul R2 sudah terpenuhi di R1 (sidebar + scroll-spy); R2 tidak menambah mekanisme navigasi baru selain tautan pintu cerita.
- ⚠️ **Repo GitHub masih belum ada** — utang prasyarat yang sama sejak R0/R1, dan R4 (blog) semakin dekat.
- ⚠️ Belum di-deploy (R2 tidak memintanya).
- ⚠️ Interaksi drawer & scroll-spy dari R1 tetap belum diuji di sesi browser sungguhan.
**ANTI-CLONE CHECK (docs/DESIGN_LANGUAGE.md §3.3) — terhadap diff R2:**
- ✅ Nol hex mentah, nol `font-family` baru, nol aset — perubahannya murni satu paragraf teks + penyesuaian padding.
- ✅ Kalimat pintu cerita ditulis sendiri dari materi Lintang ("problem → proof" adalah rangka case study fase 1), **bukan** parafrase copy referensi.
- ✅ Situs referensi tidak dibuka selama R2.
**Commit:** `R2: hero + storytelling entry`
**Sprint berikutnya:** R3 — Case study naratif (menunggu instruksi)

### [2026-07-26 05:40] — Fase 2 · Sprint R1 — Layout shell (sidebar + container + rhythm)
**Status:** ✅ selesai
**Selesai:**
- `components/layout/sidebar.tsx` — nav persisten ≥768px (sticky, `h-dvh`, latar `--paper` + garis kanan `--border`) dan **top bar + drawer** di bawahnya. Monogram **"LBA"** teks Space Grotesk indigo; hamburger digambar dari 3 batang CSS (bukan aset impor).
- **Blog & Collabs dirender sebagai teks non-link bertanda "soon"**, bukan tautan. Rutenya baru dibangun di R4/R5 — menautkannya sekarang berarti 2 link mati, yang dilarang BLUEPRINT §9. Item tetap ada di nav supaya IA fase 2 sudah terbaca.
- `components/layout/app-shell.tsx` — grid `[var(--sidebar-w) | 1fr]` dengan **`min-w-0`** di kolom konten (tanpa itu konten lebar memaksa kolom melebar → scroll horizontal). Ritme `py-20 md:py-28` dan `--maxw` sengaja **tetap** dipegang `Section`/`Container` per halaman, bukan shell, supaya halaman artikel R3 nanti tidak perlu melawan shell.
- `components/layout/use-active-section.ts` — scroll-spy IntersectionObserver murni, `rootMargin: -45% 0px -45% 0px` (pita tipis di tengah layar). **Nol dependency baru.**
- Anchor warisan: `#projects` & `#contact` **sudah** punya tujuan sejak S4/S5 (diverifikasi lewat grep, bukan asumsi); ditambah `id="top"` di hero untuk item "Home".
- Drawer: focus-trap manual, `Esc` menutup, scroll body dikunci, fokus dikembalikan ke tombol pemicu, `role="dialog"` + `aria-modal`. Transisi memakai **CSS**, bukan Framer Motion — jadi aturan global `prefers-reduced-motion` otomatis mematikannya dan shell tidak menambah beban JS di atas lipatan.
- `app/layout.tsx` membungkus konten dengan `AppShell`. Skip-link **diterjemahkan** ("Lompat ke konten utama" → "Skip to main content") — terlewat di pass i18n karena `sr-only`, padahal terbaca screen reader.
- Token `--sidebar-w: 240px`, `--nav-item-h: 36px`, `--topbar-h: 56px` dipasang di `globals.css`. `npm run build` ✅ · `npm run lint` ✅.
**🔴 Bug integritas yang ditemukan saat verifikasi R1 (di luar scope, tetap diperbaiki):**
- Screenshot headless menunjukkan hook strip menampilkan **"Rp0M+ / 0+ kg / 0"** — bukan angka sebenarnya. Diuji ulang dengan budget 15 detik: **tetap 0**, bukan sekadar tertangkap di tengah animasi.
- Penyebabnya `CountUp` sejak S3: sebuah layout effect menurunkan nilai ke `from` (0) sebelum paint agar animasi tidak berkedip. Kalau animasinya kemudian tidak pernah jalan (observer tak memicu, JS gagal, tab background), angka **berhenti di 0** — situs menampilkan angka palsu.
- Diperbaiki: nilai awal sekarang **selalu nilai akhir yang benar**, dan penurunan ke `from` hanya terjadi di dalam animasi itu sendiri. Setiap mode gagal kini berakhir pada angka yang BENAR; harganya kedip ~1 frame saat animasi mulai. Terverifikasi lewat screenshot ulang: `Rp20M+ · 5,000+ kg · 6`.
- Saya memilih memperbaikinya meski ini scope R2, karena aturan inti proyek adalah tidak pernah menampilkan angka yang salah — membiarkannya demi kerapian sprint akan salah.
**Verifikasi yang benar-benar dijalankan (Chrome headless):**
- ✅ Desktop 1280px: sidebar, monogram, penanda aktif indigo pada "Home", badge "soon" — semua tampil benar.
- ✅ **360px sungguhan**: top bar + hamburger tampil, teks membungkus rapi, **tidak ada overflow horizontal**.
- ⚠️ Catatan tooling: `--window-size=360` **tidak** menghasilkan viewport 360px — Chrome headless meng-clamp ke ≥400px, jadi screenshot pertama tampak "terpotong" dan sempat saya kira bug layout. Dibuktikan dengan halaman probe media-query, lalu diuji ulang lewat iframe selebar 360px. **Bukan bug, artefak alat.**
**Gagal / skip / blocker (jujur):**
- ⚠️ **Scroll-spy, drawer, focus-trap, dan Esc BELUM diuji interaktif.** Screenshot statis tidak bisa mengklik atau menggulir, dan percobaan memuat `/#about` di headless menghasilkan viewport kosong (kemungkinan kuirk fragment + virtual-time; bukan indikasi regresi, tapi **juga bukan bukti bahwa fiturnya jalan**). Semua ini baru terverifikasi di tingkat kode. **Tolong cek manual:** klik hamburger, tekan Esc, Tab keliling drawer, dan gulir beranda untuk melihat highlight nav berpindah.
- ⚠️ **Repo GitHub masih belum ada** — `SPRINTS_PHASE2_REDESIGN.md` §0 menetapkannya sebagai prasyarat **sebelum R1**. R1 tetap dikerjakan sesuai instruksi, tapi utangnya belum lunas dan makin dekat ke R4 (blog) yang benar-benar mengandalkannya.
- ⚠️ Belum di-deploy (R1 tidak memintanya); situs live masih versi sebelum shell.
- ⚠️ Sidebar belum tampil di halaman `/log` dan `/projects/[slug]`? **Tampil** — `AppShell` dipasang di root layout, jadi seluruh rute ikut. Yang belum diuji hanya highlight nav di rute tersebut (seharusnya tidak ada yang tersorot, sesuai desain).
**ANTI-CLONE CHECK (docs/DESIGN_LANGUAGE.md §3.3) — dijalankan terhadap diff R1:**
- ✅ Nol hex mentah di `components/layout/*` — semua warna lewat token (`bg-paper`, `text-indigo-brand`, `border-border`, `bg-secondary`; overlay memakai `color-mix` dari `--ink`).
- ✅ Satu-satunya `font-family` adalah `var(--font-display)` = Space Grotesk.
- ✅ Nol aset impor: monogram = teks "LBA", hamburger = 3 batang CSS.
- ✅ Label nav generik (Home/Projects/About/Blog/Collabs/Contact) — berasal dari sprint doc, bukan dari copy referensi.
- ✅ **Situs referensi tidak dibuka sama sekali selama R1.**
- 🟡 **Jujur soal godaan (diminta eksplisit oleh instruksi):** ada satu titik saya ingin membuka bryllim untuk "melihat lebar sidebar dan bentuk penanda aktifnya". Tidak saya lakukan — lebar 240px diturunkan dari aritmetika `--maxw` + skala 4px, dan penanda aktif dipilih garis indigo 2px karena §3.2 menetapkan indigo sebagai aksen utama. Keduanya keputusan dari tokens sendiri, bukan hasil mengintip.
- 🔧 **Koreksi dokumen R0:** `DESIGN_LANGUAGE.md` semula menulis sidebar persisten "≥1024px", padahal sprint doc R1 menetapkan collapse **<768px**. Diselaraskan jadi ≥768px (sprint doc yang menang), plus dicatat lebar drawer `min(280px,85vw)` dan `--topbar-h`.
**Commit:** `R1: layout shell (sidebar + container + rhythm)`
**Sprint berikutnya:** R2 — Hero + navigasi baru (menunggu instruksi)

### [2026-07-26 02:05] — Fase 2 · Sprint R0 — Design-language lock (inspired, NOT copied)
**Status:** ✅ selesai (fase keputusan + dokumen; **nol perubahan UI**, sesuai instruksi)
**Selesai:**
- **`docs/DESIGN_LANGUAGE.md` dibuat.** Tabel "Peta terjemahan" disalin **persis** dari `SPRINTS_PHASE2_REDESIGN.md` R0, lalu tiap baris dijabarkan jadi angka konkret yang seluruhnya diturunkan dari BLUEPRINT §3 + `app/globals.css` yang sudah jalan sejak S2.
- **Sidebar dikunci:** `--sidebar-w: 240px` (tetap 240px di ≥1280px — ruang ekstra diberikan ke konten), collapse <768px, latar **`--paper` sama dengan halaman** + garis kanan 1px `--border`, padding 24px, item Space Grotesk `--step--1`, normal `--ink-muted` / hover `--secondary` / aktif `--indigo` + penanda kiri 2px, monogram **"LBA"**, radius `--radius-sm` ≈8.4px, ring fokus indigo 2px+2px.
- **Container & ritme dikunci:** `--maxw 1120px`, `px-5 → sm:px-6`, `py-20 md:py-28`, skala 4px, `--radius 14px`, `--shadow-soft`, prosa `max-w-3xl`. Semua ini sudah dipakai produksi **sejak S2** — mendahului fase 2, jadi jelas bukan hasil menyalin.
- **IA tiga kail diterjemahkan:** `/blog` (cross-post LinkedIn) · `/collabs` (lomba nyata CV) · **"Open to collaborate & help"** — bukan "Consulting" berbayar, sesuai peringatan R5 soal overclaim fresh-grad.
- **Bagian ANTI-CLONE CHECK** berisi 7 larangan keras, daftar yang boleh diadopsi, **checklist 6 poin per sprint**, dan uji akhir R6 ("kemiripan struktur = wajar; kemiripan rasa = gagal").
- **Tokens final dikonfirmasi:** palet & keluarga font **tidak berubah** dari §3. Hanya 2 token baru — `--sidebar-w` dan `--nav-item-h` — keduanya **ukuran, bukan warna/font**, jadi tidak menambah permukaan risiko clone. Dicatat juga bahwa `--coral-ink` (S6) adalah turunan aksesibilitas, bukan warna baru.
- **Audit repo sebelum push:** nol file sensitif ter-track (`.env*`, `.vercel`, kunci, token) — `.gitignore` sudah menutup semuanya. 10 commit, 63 file ter-track, siap di-push begitu remote ada.
**Keputusan (dijawab Lintang hari ini):**
- 🟢 **Repo GitHub: YA, dan PUBLIK.** Cara: **Lintang membuat repo kosong sendiri di github.com lalu mengirim URL-nya**; agen menyambungkan remote + push. Dipilih karena paling aman — agen tidak pernah memegang kredensial GitHub. (`gh` CLI tidak terpasang di mesin ini, jadi agen memang tidak bisa membuat repo sendiri.)
- 🟢 **`DOMAIN`: `lintangbalakosa.dev`** — sudah jadi nilai `CONFIG.DOMAIN` sejak S1, jadi tidak ada perubahan kode. Registrasi jalan paralel dan **tidak memblokir R1–R5**.
- `git init` **tidak perlu dijalankan** — repo lokal sudah ada sejak S1.
**Gagal / skip / blocker (jujur):**
- ⛔ **Repo GitHub belum ada, jadi Vercel belum tersambung Git.** Ini **prasyarat R1** menurut `SPRINTS_PHASE2_REDESIGN.md` §0. Kirim URL repo dan sambungannya beres dalam satu langkah. Sampai itu, deploy masih manual (`npx vercel --prod`) dan janji R4 "tambah post = git push" belum berlaku.
- ⚠️ **Situs referensi sengaja TIDAK dibuka/di-fetch/di-inspect** saat menyusun dokumen ini. Alasannya ditulis eksplisit di §0 dokumen: begitu nilai asli referensi masuk ke konteks kerja, godaan memakainya jadi besar dan clone terjadi tanpa niat.
  **Konsekuensi yang harus diterima:** dokumen ini **tidak memuat daftar hex/font milik bryllim "yang dilarang"** — daftar semacam itu justru mengharuskan agen mencari dan menyimpannya lebih dulu. Larangan karena itu dirumuskan sebagai **larangan proses** ("jangan ambil dari sana"), bukan daftar nilai terlarang. Kalau Lintang lebih suka daftar eksplisit, itu keputusan sadar yang harus diminta terpisah.
- ⚠️ Warisan fase 1 yang **belum** tersentuh dan tetap jadi gate: Lighthouse mobile (sebelum R5), tes HP asli & registrasi domain (sebelum launch ulang), serta `PROOF_*` ×5, `ownVsTeam`, `learned`, `PHOTO_FILE` (sebelum sebar URL). R0 memang tidak memperbaiki ini — hanya memaksa keputusannya dicatat.
- ⚠️ Font Satoshi masih belum ada → body tetap DM Sans. Tidak memblokir R1–R6.
**Commit:** `R0: design-language lock (inspired-not-copied) + infra decision`
**Sprint berikutnya:** R1 — Layout shell (sidebar + container + rhythm) — **menunggu instruksi**, dan idealnya menunggu repo GitHub tersambung dulu.

### [2026-07-26 01:20] — Di luar sprint — Situs dialihkan ke bahasa Inggris
**Status:** ✅ selesai
**Pemicu:** Permintaan Lintang — portfolio ditujukan untuk audiens internasional.
**Selesai:**
- **Semua copy yang dilihat pengunjung kini bahasa Inggris**: Hero, About (versi ±120 kata), Skills, Featured Projects, keempat case study, Experience/Education/Organizations/Achievements/Certifications, Contact, Log (list + detail + teaser), OG image, dan metadata.
- `<html lang="id">` → **`lang="en"`**; `og:locale` `id_ID` → **`en_US`**; format tanggal Log `id-ID` → `en-US`; `CountUp` memakai pemisah ribuan `en-US`.
- **Format angka disamakan dengan CV versi Inggris:** `Rp20jt+` → **`Rp20M+`**, `5.000+ kg` → **`5,000+ kg`**. Ini bukan perubahan nilai — hanya notasi, dan justru menghilangkan risiko titik/koma desimal salah baca oleh pembaca internasional.
- **Nilai enum ikut diterjemahkan** karena tampil apa adanya sebagai badge: label kejujuran `produksi`→`production`, `produksi (production-ready)`→`production-ready`, `kompetisi`→`competition`; tipe Log `lomba|event|proyek`→`competition|event|project`; hasil Log `menang|kalah|ikut`→`won|lost|participated`. Frontmatter MDX ikut disesuaikan.
- **Slug case study hotel diubah** `analisis-pembatalan-hotel` → **`hotel-cancellation-analysis`** (URL juga dibaca audiens). Sitemap ikut menyesuaikan otomatis.
- Nama anonim untuk mode `CLIENT_NAME_PERMISSION=false` ikut diterjemahkan ("A specialty coffee producer", "A film & education brand") supaya tetap konsisten kalau tokennya diubah.
- `npm run build` ✅ (16 halaman) · `npm run lint` ✅ · dicek di HTML produksi: `lang="en"`, `og:locale=en_US`, nol sisa kata Indonesia di teks yang tampil.
**Gagal / skip / blocker (jujur):**
- ⚠️ **URL lama `/projects/analisis-pembatalan-hotel` sekarang 404.** Tidak ada redirect yang dipasang. Aman karena URL itu belum pernah disebarkan, tapi kalau ternyata sudah pernah dibagikan ke seseorang, bilang — saya tambahkan redirect permanen di `next.config.ts`.
- ⚠️ **Komentar kode, `PORTFOLIO_BLUEPRINT.md`, `SPRINTS_AND_TRACKING.md`, dan PROGRESS_LOG ini tetap bahasa Indonesia.** Semuanya dokumen kerja internal yang tidak dilihat pengunjung; menerjemahkannya cuma menambah churn tanpa manfaat untuk audiens. Kalau nanti repo GitHub-nya mau ikut dipamerkan ke recruiter internasional, ini bisa ditinjau ulang.
- ⚠️ `app/ui-demo` masih berbahasa Indonesia — halaman kerja internal yang 404 di produksi, jadi tidak terlihat pengunjung.
- ⚠️ **Situs tidak jadi bilingual.** Permintaannya "ubah full ke English", jadi versi Indonesia tidak dipertahankan dan tidak ada language switcher.
- ⚠️ Nama file CV tetap `Lintang-Balakosa-Ardhana-CV.pdf`, dan **isi PDF-nya memang sudah berbahasa Inggris** — jadi tidak ada ketidakcocokan bahasa antara situs dan CV.
**Keputusan / catatan:**
- Terjemahan dibuat sebagai **penulisan ulang idiomatis, bukan terjemahan harfiah** — misalnya headline §4.1 jadi "I build systems real businesses run on — and prove their impact with data." Semua fakta, angka, nama, dan tanggal identik dengan versi Indonesia.
- Aturan integritas tidak berubah: angka 5,000+ kg tetap terikat `ANKOP_MONTHS`, bukti tetap "Evidence coming soon" selama `PROOF_*` kosong, blok `learned`/`ownVsTeam` tetap tersembunyi.
- BLUEPRINT tetap jadi sumber kebenaran meski berbahasa Indonesia — copy Inggris adalah turunannya, bukan penggantinya.
**Commit:** `i18n: switch all visitor-facing copy to English`

### [2026-07-26 00:38] — Di luar sprint — Pengisian data dari CV asli + LinkedIn
**Status:** ✅ selesai
**Pemicu:** Lintang mengirim URL LinkedIn dan menaruh `LINTANGBALAKOSAARDHANACV.pdf` di root. CV **dibaca langsung** — banyak data yang sebelumnya "tidak ada sumbernya" ternyata ada di sana.
**Selesai:**
- **`LINKEDIN_URL` terisi** → `https://www.linkedin.com/in/lintangbalakosa/` (cocok dengan header CV). Link LinkedIn kini muncul di Contact, plus tombol khusus.
- **`CV_FILE` terisi** → PDF dipindah ke `public/cv/Lintang-Balakosa-Ardhana-CV.pdf` (nama dirapikan agar layak diunduh recruiter). **Tombol Download CV aktif di hero DAN Contact**; terverifikasi 200 `application/pdf`.
- **Timeline kerja dikoreksi & dilengkapi dari CV:** nama klien Ankop yang sebenarnya (**PT Anugrah Kopi Nusantara**), lokasi tiap tempat kerja, dan **semua periode yang sebelumnya hilang** — Bank Sampah Digital **Jan 2026–Mar 2026** (role sebenarnya: **Data Scientist Intern**, bukan tebakan "Data Analyst") dan PT Anugrah Energi Indonesia **Jun 2023–Okt 2023** (**Frontend Developer**, magang SMK — judul role yang di S5 saya tandai perlu konfirmasi, ternyata tepat).
- **Blok Pendidikan baru:** UMN B.Sc. Informatics (IPK 3.48, Agu 2024–sekarang) · Digital Skola Data Science Bootcamp (Excellent Graduate, Jun 2025–Okt 2025) · SMKN 4 Kota Tangerang RPL (Jun 2021–Jul 2024).
- **Blok Organisasi akhirnya terisi** (S5 sebelumnya gagal total karena nol data): UMN ECO (Koordinator Divisi Website) · Duta Anti Narkoba UMN (Koordinator Divisi Website) · STARLIGHT (Anggota Divisi Website) · AI Community (Volunteer). Masing-masing 1 baris, sesuai larangan skill-dump.
- **Sertifikasi 2 → 6**, lengkap dengan tanggal: BNSP (Jan 2026), Digital Skola (Nov 2025), dan **4 sertifikat Coursera** yang di S5 terpaksa dilewati — EDA for ML (IBM, Jan 2026), Supervised ML: Regression (IBM, Jan 2026), Data Science Capstone: Predicting Bicycle Rental (University of London, Jan 2025), Python for Data Science AI & Development (IBM, Jan 2025).
- **Prestasi dapat konteks:** I/O Festival ("platform B2B untuk ekonomi sirkular"), SurabayaDev kini bernama lengkap **Developer Battle 2025**, CIMB Niaga kini **Pitching Day (UMN)** dengan detail aplikasi pembukaan rekening digital (React Native + Expo Go).
- 🔧 **KOREKSI FAKTA PENTING:** database Ankop adalah **MySQL**, bukan PostgreSQL seperti yang saya tulis di S4. Tech chip Ankop diperbaiki (+ Next.js, sesuai CV). **Kesalahan ini sudah tayang sejak S4** — kalau CV tidak dibaca, tech stack di portfolio akan berbeda dari CV yang sama-sama dilihat recruiter.
- **Case study diperkaya dari CV:** Ankop dapat modul *Workforce Scheduling & Anti-Fraud Attendance* (audit trail penuh) dan hasil "log pergerakan berat otomatis menggantikan Excel manual"; Bisasinema dapat detail Filmmaking Lab (kursus offline 1 minggu) + tiket digital Masterclass; Tera dapat *self-serve signup* + penyediaan tenant otomatis dan penyebutan 6 peran secara eksplisit.
- **`ownVsTeam` Kuali TERISI** — CV menyatakan eksplisit "Led a hackathon team". Stack Kuali dikoreksi jadi Next.js + Supabase + LLM. Bank Sampah dapat role & periode asli.
- Skills ditambah dari CV: **Matplotlib, Seaborn, Folium**; bukti React Native basic disambungkan ke aplikasi CIMB Niaga.
- `npm run build` ✅ · `npm run lint` ✅ · semua data terverifikasi tampil di HTML produksi.
**Gagal / skip / blocker (jujur):**
- 🔴 **CV yang kini bisa diunduh publik memuat nomor HP Lintang (+62 812 8481 8862).** Ini konsekuensi nyata dari menerbitkan CV apa adanya — nomor itu akan terekspos ke siapa pun, termasuk scraper. **Perlu keputusan Lintang:** terbitkan apa adanya, atau saya siapkan versi tanpa nomor HP untuk web.
- ⚠️ **`ANKOP_MONTHS` masih kosong** → angka **"5.000+ kg" tetap tidak tampil** di hero, OG image, dan case study Ankop. CV menyebut angkanya tanpa rentang waktu; menyimpulkan "2 bulan" dari tanggal mulai role adalah tebakan, jadi tidak saya lakukan.
- ⚠️ **`ownVsTeam` Ankop, Bisasinema, Tera, dan Analisis Hotel masih kosong.** Sempat saya isi "proyek mandiri" untuk Tera karena CV menaruhnya di bagian PROJECTS tanpa menyebut tim — **saya batalkan**: "tidak disebut" bukan berarti "sendirian".
- ⚠️ **`learned` (1 pelajaran) semua proyek masih kosong** — refleksi pribadi tidak ada di CV dan tidak boleh saya karang.
- ⚠️ **Kelima token `PROOF_*` masih kosong** → semua case study tetap "Bukti menyusul". Ini sekarang **satu-satunya blocker terbesar** yang tersisa.
- ⚠️ **`PHOTO_FILE` masih kosong** → hero tanpa foto, OG image murni tipografi.
- ⚠️ Tahun I/O Festival & CIMB Niaga tidak tercantum di CV, jadi tidak ditampilkan.
- ⚠️ LinkedIn membalas HTTP **999** untuk permintaan otomatis — itu perilaku anti-bot standar LinkedIn, bukan link mati. Tetap perlu klik-tes manual sekali oleh Lintang.
- ⚠️ Belum di-deploy; situs live masih versi S6.
**Keputusan / catatan:**
- **Nomor HP TIDAK ditaruh di halaman web** meski ada di CV. BLUEPRINT §4.5 hanya menyebut email/LinkedIn/GitHub/CV, dan menampilkan nomor pribadi di halaman publik mengundang spam.
- **Nama klien tetap ditampilkan** (`CLIENT_NAME_PERMISSION` masih `null`). Penguat: CV yang Lintang serahkan sendiri menyebut PT Anugrah Kopi Nusantara dan Bisasinema secara terbuka. Nama anonim tetap siap dipakai bila tokennya diset `false`.
- Hero kini punya 3 tombol: **Lihat proyek** (primary) · **Download CV** (secondary) · **Hubungi** (ghost). Fallback lama dipertahankan — kalau `CV_FILE` dikosongkan lagi, slotnya kembali jadi "Hubungi", bukan tombol mati.
- Nama file CV diubah jadi `Lintang-Balakosa-Ardhana-CV.pdf` supaya rapi saat diunduh recruiter (nama asli `LINTANGBALAKOSAARDHANACV.pdf` sulit dibaca).
**CONFIG/TODO yang masih menunggu Lintang:** *(dari 13 → **9** token kosong)*
- ✅ **SELESAI:** `LINKEDIN_URL` · `CV_FILE`
- 🔴 5 token `PROOF_*` · `ownVsTeam` (4 proyek) · `learned` (semua proyek) · `PHOTO_FILE`
- 🟠 `ANKOP_MONTHS` · `ANKOP_KG_CUMULATIVE` · `CLIENT_NAME_PERMISSION` · `IO_FESTIVAL_DATE` · `IO_FESTIVAL_STACK` · durasi Tera · tenant nyata Tera · `lesson` surabayadev · 1 post Log kalah/ikut
- 🟡 `DOMAIN` · skor Lighthouse · tes HP asli · repo GitHub · file Satoshi
**Commit:** `data: isi profil dari CV asli + LinkedIn (LINKEDIN_URL, CV_FILE, pengalaman, pendidikan, organisasi, sertifikasi)`

**Susulan (jawaban Lintang, 2026-07-26):**
- ✅ **`ANKOP_MONTHS: 2`** + **`ANKOP_KG_CUMULATIVE: true`** — Lintang menyetujui kalimat "5.000+ kg ceri kopi dilacak dalam 2 bulan pertama sejak live". **Angka kg akhirnya muncul** di hero, OG image, dan case study Ankop; slot "15+ supplier aktif" di hook strip digantikannya (angka itu tetap ada di daftar hasil case study).
- ✅ **`CLIENT_NAME_PERMISSION: true`** — nama klien boleh disebut. Sekarang eksplisit, bukan default diam.
- ⚠️ **Nomor HP di CV: diterbitkan apa adanya atas keputusan Lintang.** Risikonya sudah disampaikan (terekspos ke scraper/spam). Nomor tetap **tidak** ditampilkan di halaman web — hanya ada di dalam PDF.
- **Sisa token kosong: 6** → 5× `PROOF_*` + `PHOTO_FILE` (plus `IO_FESTIVAL_DATE`/`IO_FESTIVAL_STACK` untuk Log, serta `ownVsTeam`/`learned` yang bukan token).

### [2026-07-26 00:14] — Sprint S7 — Log / Activity (MDX, fast-follow)
**Status:** 🟡 jalan — infrastruktur Log **selesai & jalan**, tapi seed post kurang satu dan tidak bisa saya isi sendiri.
**Selesai:**
- `lib/mdx.ts` — baca `content/log/*.mdx` dengan `gray-matter` saat build (SSG). **Git-based, tanpa backend/DB berbayar**: tambah post = tulis `.mdx` + `git push`. File berawalan `_` diperlakukan draft/template dan tidak diterbitkan.
- Frontmatter §6 lengkap (`title`, `date`, `type`, `role`, `stack`, `result`, `lesson`, `teaser`, `cta`) dengan normalisasi bertipe; tanggal & pelajaran kosong tidak merusak build, elemennya cuma disembunyikan.
- `app/log/page.tsx` — kartu ringan: badge `type` · badge `result` · tanggal · judul · role · pelajaran.
- `app/log/[slug]/page.tsx` — SSG (`generateStaticParams` + `dynamicParams=false`) + `generateMetadata`; render MDX lewat `next-mdx-remote/rsc` dengan pemetaan komponen di `components/mdx-components.tsx`.
- `components/sections/log-teaser.tsx` — 3 post terbaru di beranda, disisipkan sebelum Contact (urutan §2). Kalau belum ada post, section-nya tidak dirender sama sekali.
- `app/sitemap.ts` — `/log` dan tiap post ditambahkan, tapi **hanya bila ada post terbit**.
- Seed `io-festival.mdx` memakai contoh §6 apa adanya, termasuk pelajarannya ("Menang bukan karena fitur terbanyak, tapi karena masalahnya paling jelas didefinisikan"), teaser, dan CTA kolaborasi.
- Seed `surabayadev.mdx` disusun dari fakta CV/BLUEPRINT (peran, alur kerja EDA→driver→dashboard, stack Python/Looker/Colab/Figma, Juara 3 Nasional, penilaian juri) + tautan ke case study Analisis Pembatalan Hotel.
- Verifikasi: `/log` 200 · `/log/io-festival` 200 · `/log/surabayadev` 200 · `/log/_template-kalah-atau-ikut` **404** (template tidak bocor). Tidak ada YAML/frontmatter/`TODO(lintang)` yang bocor ke HTML. `npm run build` ✅ (16 halaman) · `npm run lint` ✅.
**Gagal / skip / blocker (jujur):**
- ⛔ **Post `kalah`/`ikut` TIDAK dibuat — ini kegagalan memenuhi DoD sprint.** §6 mewajibkan minimal 1 post berhasil-atau-tidak yang diframing sebagai pelajaran, dan BLUEPRINT sendiri menandainya `// TODO(lintang)`: acaranya harus nyata dan di luar CV. Mengarang sebuah kekalahan sama merusaknya dengan mengarang prestasi, jadi tidak saya lakukan. Gantinya: `content/log/_template-kalah-atau-ikut.mdx` — tinggal disalin tanpa awalan `_`, isi 5 blok, selesai. **Justru post inilah yang bikin Log terbaca jujur; tanpanya Log cuma etalase kemenangan.**
- ⛔ **`lesson` di `surabayadev.mdx` sengaja dikosongkan.** Menulis "1 pelajaran" atas nama Lintang dari kompetisi yang saya tidak ikuti = mengarang refleksi pribadi. Bloknya disembunyikan sampai diisi.
- ⚠️ **Kedua post belum punya tanggal.** `io-festival` menunggu `IO_FESTIVAL_DATE`; `surabayadev` cuma punya keterangan tahun "2025" di CV (sudah ada di judul), dan tanggal persisnya tidak saya tebak. Sempat saya isi `2025-01-01` sebagai penanda urutan — **dibatalkan**, karena itu akan menaruh tanggal palsu di atribut `<time datetime>`. Akibatnya urutan post sementara berdasarkan judul, bukan waktu.
- ⚠️ **`stack` `io-festival` kosong** (`IO_FESTIVAL_STACK` belum diisi), jadi chip stack tidak muncul di post itu.
- ⚠️ **Filter `type` tidak dipasang.** §6 menyebutnya opsional; dengan 2 post, filter cuma menambah komponen client tanpa manfaat. Gampang ditambahkan setelah jumlah post bertambah.
- ⚠️ **Belum di-deploy.** S7 tidak meminta deploy, jadi situs live masih versi S6 (tanpa `/log`). Satu perintah `npx vercel --prod` kalau mau dinaikkan.
- ⚠️ **`git push` masih belum memicu redeploy** — repo GitHub belum ada. Ini menyentuh langsung janji §6 "tambah post = file .mdx + git push → Vercel auto-redeploy". Alurnya sekarang: tulis `.mdx` → commit → **deploy manual**.
**Keputusan / catatan:**
- Dipilih `next-mdx-remote` v6 (bukan `@next/mdx` maupun Contentlayer): satu dependency, frontmatter jalan tanpa rantai plugin remark, dan konten tetap di `content/log/` alih-alih dipaksa jadi rute file. Contentlayer sendiri sudah lama tidak dirawat aktif.
- Badge `result`: `menang` = indigo, `ikut` = netral, `kalah` = outline. Kekalahan tidak diberi warna "peringatan" — §6 memang meminta framing pelajaran, bukan daftar kekalahan.
- Ritme posting tidak dijanjikan di UI mana pun (§6: "jangan janji mingguan").
**CONFIG/TODO yang masih menunggu Lintang:**
- 🔴 **1 post `kalah`/`ikut` dari acara nyata** — pakai template yang sudah disiapkan.
- 🔴 `lesson` untuk `surabayadev.mdx`.
- ⛔ `IO_FESTIVAL_DATE` + `IO_FESTIVAL_STACK` · tanggal SurabayaDev.
- 🔴 Sisa dari sprint sebelumnya (belum berubah): 5 token `PROOF_*` · `LINKEDIN_URL` · `CV_FILE` · `PHOTO_FILE` · `ownVsTeam`/`learned` 4 hero · `ANKOP_MONTHS` · `ANKOP_KG_CUMULATIVE` · `CLIENT_NAME_PERMISSION` · data CV yang hilang (S5) · skor Lighthouse · custom domain · tes HP asli · repo GitHub.
**Commit:** `S7: log/activity (mdx)`
**Sprint berikutnya:** — (S1–S7 sudah dilalui; sisanya menunggu data dari Lintang)

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
