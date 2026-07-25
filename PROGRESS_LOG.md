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
