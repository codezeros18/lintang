# DESIGN_LANGUAGE.md
**Kunci bahasa visual fase 2 · "inspired, NOT copied"**
Portfolio Lintang Balakosa Ardhana · dikunci di sprint **R0**

> **Cara pakai:** setiap keputusan desain di R1–R6 **wajib** dicek ke file ini.
> Ragu soal sebuah nilai (warna, ukuran, font, jarak)? Jawabannya ada di sini atau di
> `PORTFOLIO_BLUEPRINT.md` §3 — **bukan** di situs referensi.
>
> Sumber kebenaran tetap `PORTFOLIO_BLUEPRINT.md`. Dokumen ini hanya menurunkan §3
> jadi angka konkret untuk layout baru.

---

## 0 — Posisi hukum & metode

Referensi (`bryllim.com`, `leerob.com`) dipakai sebagai sumber **pola**: alur informasi,
prinsip layout, dan gaya bercerita. Yang diambil adalah *ide struktural*, bukan
*ekspresi visual* — dan itu batas yang memisahkan inspirasi dari plagiarisme.

**Metode yang dipakai agen di R0 (disengaja):** situs referensi **tidak dibuka, tidak
di-fetch, dan tidak di-inspect** saat menyusun dokumen ini. Semua nilai konkret di bawah
diturunkan dari BLUEPRINT §3 dan dari `app/globals.css` yang sudah berjalan sejak fase 1.

Alasannya praktis, bukan formalitas: begitu nilai asli referensi (hex, ukuran, nama font)
masuk ke konteks kerja, godaan "tinggal pakai yang itu" jadi sangat besar dan clone terjadi
tanpa niat. Cara paling andal menjamin tidak menyalin adalah **tidak pernah memegang
angkanya sama sekali**.

Konsekuensi yang harus diterima: dokumen ini **tidak bisa** memuat daftar hex/font milik
bryllim untuk "dihindari" — daftar seperti itu justru mengharuskan agen mencari dan
menyimpannya lebih dulu. Larangan di §3 karena itu dirumuskan sebagai **larangan proses**
("jangan mengambil dari sana"), bukan daftar nilai terlarang.

---

## 1 — Peta terjemahan

Tabel di bawah disalin **persis** dari `SPRINTS_PHASE2_REDESIGN.md` R0, lalu tiap baris
dijabarkan jadi nilai konkret versi Lintang.

| Pola dari referensi | Diadopsi sbg | Terjemahan ke bahasa Lintang | Yang dibuat BEDA (anti-clone) |
|---|---|---|---|
| bryllim: sidebar nav kiri tetap | Prinsip: nav persisten hemat ruang | Sidebar kiri **dengan tipografi Space Grotesk + aksen indigo**, monogram "LBA" sendiri | Lebar, warna, item nav, ikon → milik Lintang; bukan salinan tata letak Bryl |
| bryllim: container lega + banyak white-space | Prinsip: ruang bernafas | Container `--maxw` + ritme `py` sendiri di atas paper `#FBFAF7` | Skala spacing & radius versi BLUEPRINT §3.3, bukan angka bryllim |
| bryllim: section Blog/Collabs/Consulting | IA (struktur situs) | Nama & isi section dari CV Lintang (lomba nyata, bantu developer) | Copy, kategori, dan visual kartu orisinal |
| leerob: case study naratif personal/fun | Gaya menulis | Narasi problem→akhir pakai suara Lintang (jujur, konkret, angka CV) | Bukan meniru kata-kata/joke leerob; cerita nyata Ankop/Bisasinema |
| leerob: konten-first, ringan | Prinsip performa | LCP <2s dipertahankan (hero tanpa motion berat) | — |

---

### 1.1 Sidebar nav kiri tetap → **nilai konkret Lintang**

| Aspek | Nilai terkunci | Dari mana |
|---|---|---|
| Lebar (≥768px) | **`--sidebar-w: 240px`** | Kelipatan skala 4px §3.3; `240 + 1120 = 1360px` masih muat di laptop 1440px dengan gutter |
| Lebar di layar lebih besar | tetap **240px** | Sengaja tidak melebar — ruang ekstra diberikan ke konten, bukan ke nav |
| Titik collapse | **<768px → drawer** | Ditetapkan `SPRINTS_PHASE2_REDESIGN.md` R1 |
| Lebar drawer | **`min(280px, 85vw)`** | Sedikit lebih lebar dari sidebar agar nyaman disentuh; `85vw` menjaga sisa layar tetap terlihat di 360px |
| Tinggi top bar mobile | **`--topbar-h: 56px`** | Kelipatan 4px; cukup untuk target sentuh 40px + padding |
| Latar | **`var(--paper)` `#FBFAF7`** — sama dengan halaman | §3.2. Sidebar dipisahkan garis, bukan blok warna; nav tidak boleh menyaingi konten |
| Pemisah | garis kanan **1px `var(--border)` `#E6E3DC`** | §3.2 |
| Padding | **`p-6` (24px)**, gap antar item **`gap-2` (8px)** | Skala 4px §3.3 |
| Font item nav | **Space Grotesk** (`--font-display`) | §3.1 |
| Ukuran item nav | **`--step--1`** (0.83→0.94rem) | §3.3 |
| Item normal | `var(--ink-muted)` `#55555F` | §3.2 · kontras 7.06:1 di atas paper (diukur S6) |
| Item hover | teks `var(--ink)`, latar `var(--secondary)` `#F2F0EA` | §3.2 · 6.46:1 |
| Item aktif | teks `var(--indigo)` `#3D5AFE` + penanda kiri 2px indigo | §3.2 · 4.92:1 (lolos AA untuk teks besar/UI) |
| Monogram | **"LBA"**, Space Grotesk, `letter-spacing: -0.02em`, indigo | §3.1–3.2 · inisial Lintang Balakosa Ardhana |
| Radius item | **`--radius-sm`** = `calc(14px × 0.6)` ≈ 8.4px | §3.2 turunan `--radius` |
| Fokus keyboard | ring 2px `var(--ring)` (indigo) + offset 2px | Pola fokus fase 1, a11y AA |

**Yang membuat beda:** sidebar ini **tanpa latar berwarna, tanpa ikon**, dan hanya memuat
6 item yang berasal dari IA Lintang sendiri (Home, Projects, About, Blog, Collabs, Contact).
Penanda aktif berupa garis indigo tipis — konsekuensi dari aturan §3.2 "coral HEMAT,
indigo sebagai aksen utama", bukan tiruan penanda milik siapa pun.

### 1.2 Container lega + white-space → **nilai konkret Lintang**

| Aspek | Nilai terkunci | Dari mana |
|---|---|---|
| Lebar konten | **`--maxw: 1120px`** | §3.2 (sudah berjalan sejak S2) |
| Padding horizontal | **`px-5` (20px)** → `sm:px-6` (24px) | Aman di 360px |
| Ritme section | **`py-20 md:py-28`** (80px → 112px) | §3.3 |
| Skala spacing | kelipatan **4px** (`gap-2/4/6/8`) | §3.3 |
| Radius permukaan | **`--radius: 14px`** | §3.2 |
| Bayangan | **`--shadow-soft`** `0 1px 2px rgba(20,20,26,.04), 0 8px 24px rgba(20,20,26,.06)` | §3.2 |
| Lebar teks prosa | **`max-w-3xl`** (±65–75 karakter) | Keterbacaan; dipakai di About & case study fase 1 |

**Yang membuat beda:** angka-angka ini sudah dipakai produksi sejak S2 — *mendahului*
fase 2. Tidak ada satu pun yang diukur dari situs referensi.

### 1.3 Section Blog/Collabs/Consulting → **IA versi Lintang**

Yang diambil hanya **keberadaan tiga kail** (tulisan · kolaborasi · membantu orang).
Isi dan penamaannya berbeda:

| Slot referensi | Versi Lintang | Alasan |
|---|---|---|
| Blog | **`/blog`** — cross-post dari LinkedIn, MDX/SSG | Realistis dijalankan (R4: "blog mati > tak ada blog") |
| Collabs | **`/collabs`** — lomba nyata dari CV (I/O Festival, SurabayaDev, CIMB Niaga) + ajakan kolaborasi | Berbasis fakta CV, bukan kategori karangan |
| Consulting | **"Open to collaborate & help"** — BUKAN jasa berbayar | R5 menegaskan: "Consulting" berbayar = overclaim untuk fresh-grad |

Kartu memakai `Card` fase 1 (`--card` `#FFFFFF`, border `--border`, `--radius` 14px,
`--shadow-soft`) + `Badge` yang sudah ada. Tidak ada komponen kartu baru yang meniru
bentuk referensi.

### 1.4 Case study naratif → **suara Lintang**

| Aspek | Nilai terkunci |
|---|---|
| Font isi | Satoshi bila tersedia, **fallback DM Sans** (`--font-body` → `--font-body-fallback`) |
| Ukuran isi | `--step-0`, `leading-relaxed` |
| Subjudul | Space Grotesk, `--step-1`/`--step-2`, `letter-spacing: -0.02em` |
| Angka & chip | Space Mono (`.mono` / `--font-code`) |
| Aksen kutipan | border kiri 3px `var(--indigo)` + latar `--secondary` (pola yang sudah dipakai micro-copy About) |
| Isi cerita | Ankop, Bisasinema, Tera, Hotel — **fakta CV**, angka berkonteks waktu |

**Aturan integritas yang tidak berubah di fase 2:** angka `5,000+ kg` tetap terikat
`ANKOP_MONTHS`; `PROOF_*` kosong → "Evidence coming soon"; `ownVsTeam`/`learned` kosong →
**blok disembunyikan**, bukan dikarang. Gaya bercerita boleh terinspirasi; **substansinya
tidak boleh dipinjam dari siapa pun**.

### 1.5 Konten-first & ringan → **gate performa**

| Aturan | Nilai |
|---|---|
| LCP | **<2s** (BLUEPRINT §9) |
| Lighthouse mobile | **≥90** — dibuktikan Lintang di R6, bukan diklaim agen |
| Hero | **tanpa `Reveal`/`Stagger`** — temuan S2: Framer Motion merender `opacity:0` di HTML server sehingga LCP menunggu hidrasi |
| Reveal | hanya di bawah lipatan |
| Durasi motion | 0.5s, easing `[0.22, 1, 0.36, 1]`; stagger 0.08s; hover-lift −4px |
| Reduced motion | `useReducedMotion` → render **final state**, bukan animasi dipercepat |
| Drawer mobile | transisi ≤200ms, easing sama, dimatikan saat reduced-motion |

---

## 2 — Design tokens final (dikonfirmasi R0)

Palet & keluarga font **tidak berubah** dari BLUEPRINT §3. Yang dilakukan R0 hanya
mengunci dua tambahan yang lahir dari kebutuhan nyata, keduanya **turunan**, bukan warna baru.

### 2.1 Warna — terkunci

| Token | Nilai | Catatan |
|---|---|---|
| `--paper` | `#FBFAF7` | latar |
| `--ink` | `#14141A` | teks utama · 17.58:1 |
| `--ink-muted` | `#55555F` | teks sekunder · 7.06:1 |
| `--card` | `#FFFFFF` | permukaan |
| `--border` | `#E6E3DC` | garis warm |
| `--secondary` / `--muted` | `#F2F0EA` | latar halus |
| `--indigo` | `#3D5AFE` | aksen utama |
| `--coral` | `#FF6A3D` | aksen kedua — **HEMAT**, isian/non-teks saja |
| `--coral-ink` | `#B34A2B` | **tambahan S6**: coral asli hanya 2.73:1 sebagai teks (gagal AA). Ini 5.12:1 di paper |

**Tidak ada warna baru di fase 2.** Butuh nuansa? Turunkan dari token yang ada
(`color-mix`), jangan perkenalkan hex baru.

### 2.2 Tipografi — terkunci

| Peran | Font | Variabel |
|---|---|---|
| Display/heading, item nav, monogram | **Space Grotesk** | `--font-display` |
| Body | **Satoshi** bila filenya ada, **fallback DM Sans** | `--font-body` → `--font-body-fallback` |
| Angka, tech chip, eyebrow, kode | **Space Mono** | `--font-code` |

Catatan warisan: `public/fonts/Satoshi-Variable.woff2` **belum ada**, jadi body masih
DM Sans. Blok `localFont` di `lib/fonts.ts` sengaja dinonaktifkan agar build tidak gagal.
Ini tidak memblokir R1–R6.

### 2.3 Ruang, bentuk, ukuran — terkunci

`--radius: 14px` · `--shadow-soft` · `--maxw: 1120px` · type-scale `--step--1`…`--step-4`
(§3.3) · skala spacing 4px · ritme section `py-20 md:py-28`.

### 2.4 Token baru yang diusulkan R0 (dipasang di R1)

| Token | Nilai | Alasan |
|---|---|---|
| `--sidebar-w` | `240px` | Layout shell butuh satu sumber lebar; kelipatan 4px |
| `--nav-item-h` | `36px` | Target sentuh nyaman, tetap kelipatan 4px |
| `--topbar-h` | `56px` | Tinggi top bar mobile (ditambahkan saat R1) |

Ketiganya **ukuran, bukan warna atau font** — jadi tidak menambah permukaan risiko clone.

---

## 3 — ANTI-CLONE CHECK

**Wajib dibaca ulang di awal tiap sprint R1–R6.** Bila salah satu jawaban di bawah "ya",
pekerjaan itu **berhenti dan diulang**.

### 3.1 Larangan keras

1. ❌ **Mengambil nilai hex apa pun dari bryllim.com / leerob.com** — termasuk hasil
   inspect element, screenshot yang di-eyedrop, atau CSS yang di-fetch. Semua warna
   **wajib** berasal dari daftar §2.1.
2. ❌ **Memakai font yang dipakai referensi** (kecuali kebetulan sudah ada di §2.2 sejak
   BLUEPRINT fase 1). Jangan pernah membuka situs referensi untuk mencari nama fontnya.
3. ❌ **Menyalin layout signature** — proporsi persis, urutan elemen yang khas, bentuk
   penanda nav, komposisi hero, atau susunan grid yang menjadi ciri visual mereka.
4. ❌ **Mengambil aset** — logo, ikon, ilustrasi, foto, ikon SVG, animasi Lottie, pola
   latar. Monogram Lintang **wajib "LBA"** dan digambar sendiri.
5. ❌ **Menyalin copy/microcopy** — kalimat hero, judul section, tombol, joke, atau
   metafora khas. Termasuk parafrase yang masih mengikuti struktur kalimatnya.
6. ❌ **Menyalin nama & struktur URL yang khas** bila itu ciri mereka. `/blog`, `/collabs`
   aman karena generik dan sudah ditetapkan `SPRINTS_PHASE2_REDESIGN.md`.
7. ❌ **Menyalin isi/klaim** — angka, testimoni, daftar klien. Sudah dijamin aturan
   integritas fase 1, tapi ditegaskan lagi di sini.

### 3.2 Yang BOLEH diadopsi

✅ Pola struktural umum: sidebar persisten · container ber-max-width · case study naratif ·
adanya section blog/kolaborasi · prinsip konten-first.
Semuanya adalah **konvensi web yang lazim**, bukan ekspresi milik satu situs.

### 3.3 Checklist per sprint

Jawab sebelum menutup sprint mana pun:

- [ ] Apakah ada hex di diff ini yang **tidak** ada di §2.1? → kalau ya, ganti ke token.
- [ ] Apakah ada `font-family` di luar §2.2? → kalau ya, hapus.
- [ ] Apakah saya membuka situs referensi lalu menyalin nilai apa pun darinya? → kalau ya, batalkan.
- [ ] Apakah ada aset (gambar/ikon/logo) yang bukan buatan sendiri atau bukan lisensi terbuka?
- [ ] Apakah ada kalimat yang meniru copy referensi?
- [ ] Kalau layout ini disandingkan dengan situs referensi, apakah orang akan bilang
      "ini situs yang sama"? → kalau ya, ubah proporsi/komposisinya.

### 3.4 Uji akhir (R6)

> Buka situs Lintang dan situs referensi berdampingan. Situs Lintang harus tetap dikenali
> sebagai **milik Lintang** dari warna, tipografi, dan suara tulisannya — bahkan ketika
> struktur navigasinya mirip. Kemiripan struktur = wajar. Kemiripan **rasa** = gagal.

---

## 4 — Keputusan infrastruktur (R0)

| Keputusan | Status | Catatan |
|---|---|---|
| **Repo GitHub** | ✅ Diputuskan: **buat sekarang, publik** | Lintang membuat repo manual di github.com lalu mengirim URL-nya; agen menyambungkan remote & push. **Kredensial tidak pernah dipegang agen.** |
| **Sambung Vercel** | ⏳ Setelah remote ada | Wajib beres **sebelum R1** — R4 (blog) mengandalkan alur `git push` = deploy |
| **`DOMAIN`** | ✅ **`lintangbalakosa.dev`** | Sudah jadi nilai `CONFIG.DOMAIN` sejak S1; registrasi jalan paralel, tidak memblokir R1–R5 |
| **`NEXT_PUBLIC_SITE_URL`** | Aktif sementara | Menunjuk `https://lintang-sigma.vercel.app` supaya canonical/OG/sitemap resolve. **Hapus env ini** begitu domain final aktif (R6) |

---

## 5 — Riwayat

| Tanggal | Perubahan |
|---|---|
| 2026-07-26 | Dokumen dibuat & dikunci di R0. Tokens dikonfirmasi tanpa perubahan palet/font; ditambah `--sidebar-w` & `--nav-item-h` (dipasang R1). |
| 2026-07-26 (R1) | **Koreksi breakpoint:** baris sidebar semula menulis "≥1024px", padahal `SPRINTS_PHASE2_REDESIGN.md` R1 menetapkan collapse **<768px**. Diselaraskan jadi persisten ≥768px — sprint doc yang menang. Ditambah nilai lebar drawer & `--topbar-h`. |
