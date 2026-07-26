/**
 * CONFIG tokens — PORTFOLIO_BLUEPRINT.md §0.1
 *
 * ATURAN INTEGRITAS: nilai di sini HANYA boleh diisi oleh Lintang.
 * Jangan menebak, jangan mengarang. Selama nilainya `null`, UI WAJIB menyembunyikan
 * elemen terkait — bukan menampilkan link mati, angka tanpa konteks, atau klaim karangan.
 *
 * Cara pakai di komponen:
 *   import { CONFIG, isSet } from "@/content/config";
 *   {isSet(CONFIG.LINKEDIN_URL) && <a href={CONFIG.LINKEDIN_URL}>LinkedIn</a>}
 */

/** Jenis bukti yang boleh ditampilkan (etis — tidak ada demo palsu). */
export type ProofKind = "live" | "repo" | "screenshot" | "loom" | "writeup";

export type Config = {
  /**
   * Semua link LinkedIn (hero, contact, footer, README).
   * CV `.docx` lama: teks `.../lintangbalakosa` tapi hyperlink mengarah `.../tinachi1`.
   * Klik-tes dulu & pastikan URL asli sebelum diisi.
   */
  LINKEDIN_URL: string | null;

  /** Konteks waktu angka Ankop: "dalam X bulan pertama". Ankop mulai Jun 2026. */
  ANKOP_MONTHS: number | null;

  /** Apakah "5.000+ kg" kumulatif sejak live? Menentukan kalimat hasil. */
  ANKOP_KG_CUMULATIVE: boolean | null;

  /** Jenis bukti Ankop Trace. Butuh izin penyebutan nama klien juga. */
  PROOF_ANKOP: ProofKind | null;

  /** Jenis bukti Bisasinema + URL live bila ada. Butuh izin nama klien. */
  PROOF_BISASINEMA: { kind: ProofKind; url: string | null } | null;

  /**
   * Bukti Tera. Bila belum ada tenant bayar → case study memakai label
   * "produksi (production-ready)", bukan klaim demo publik.
   */
  PROOF_TERA: Extract<ProofKind, "live" | "screenshot" | "writeup"> | null;

  /** Link Looker view-only / notebook GitHub untuk Analisis Pembatalan Hotel. */
  PROOF_HOTEL: string | null;

  /** Screenshot dashboard CEO (virtual internship Bank Sampah Digital). */
  PROOF_BANKSAMPAH: string | null;

  /**
   * Boleh sebut nama klien Bisasinema / Ankop?
   * Bila `false` → anonimkan ("produsen kopi specialty", "brand film & edukasi").
   */
  CLIENT_NAME_PERMISSION: boolean | null;

  /** Nama file PDF CV di `public/cv/` — untuk tombol Download CV. */
  CV_FILE: string | null;

  /** Nama file foto profil profesional di `public/images/`. */
  PHOTO_FILE: string | null;

  /** Custom domain situs (tanpa protokol). Default disarankan; konfirmasi/registrasi Lintang. */
  DOMAIN: string;

  /** Tanggal I/O Festival (YYYY-MM-DD) untuk seed post Log. */
  IO_FESTIVAL_DATE: string | null;

  /** Stack proyek I/O Festival untuk seed post Log. */
  IO_FESTIVAL_STACK: string[] | null;

  /**
   * Nomor WhatsApp publik untuk tombol `wa.me`, format internasional tanpa `+`
   * (mis. `6281234567890`).
   *
   * `null` = tombol WhatsApp TIDAK dirender. Keputusan Lintang 2026-07-26:
   * email saja dulu, supaya nomornya tidak jadi tautan yang mudah dipanen bot spam.
   */
  WHATSAPP_NUMBER: string | null;

  /**
   * URL booking Cal.com (gratis) untuk section Help.
   * `null` = tombol booking disembunyikan — bukan link mati.
   */
  CAL_COM_URL: string | null;
};

export const CONFIG: Config = {
  // ✅ Dikonfirmasi Lintang 2026-07-26 + cocok dengan header CV (linkedin.com/in/lintangbalakosa).
  LINKEDIN_URL: "https://www.linkedin.com/in/lintangbalakosa/",
  // ✅ Dikonfirmasi Lintang 2026-07-26: 2 bulan sejak Ankop Trace live (Jun 2026 → Jul 2026),
  // dan ia menyetujui kalimat "5.000+ kg ceri kopi dilacak dalam 2 bulan pertama sejak live"
  // — jadi angkanya memang akumulasi sepanjang rentang itu.
  ANKOP_MONTHS: 2,
  ANKOP_KG_CUMULATIVE: true,
  PROOF_ANKOP: null, // TODO(lintang): jenis bukti Ankop + izin sebut nama klien
  PROOF_BISASINEMA: null, // TODO(lintang): jenis bukti Bisasinema + URL live bila ada
  PROOF_TERA: null, // TODO(lintang): bukti Tera — jangan klaim demo bila belum ada
  PROOF_HOTEL: null, // TODO(lintang): link Looker view-only / notebook GitHub
  PROOF_BANKSAMPAH: null, // TODO(lintang): screenshot dashboard CEO
  // ✅ Dikonfirmasi Lintang 2026-07-26: nama klien boleh disebut.
  CLIENT_NAME_PERMISSION: true,
  CV_FILE: "Lintang-Balakosa-Ardhana-CV.pdf", // ✅ ada di public/cv/
  PHOTO_FILE: null, // TODO(lintang): taruh foto di public/images/ lalu isi nama filenya
  DOMAIN: "lintangbalakosa.dev", // 🟡 default saran BLUEPRINT §0.1 — TODO(lintang): konfirmasi/registrasi
  IO_FESTIVAL_DATE: null, // TODO(lintang): tanggal I/O Festival
  IO_FESTIVAL_STACK: null, // TODO(lintang): stack proyek I/O Festival
  // ✅ Keputusan Lintang 2026-07-26: nomor WhatsApp TIDAK dipublikasikan dulu.
  // Isi dengan format `62812…` (tanpa `+`) bila suatu saat berubah pikiran.
  WHATSAPP_NUMBER: null,
  CAL_COM_URL: null, // TODO(lintang): buat akun Cal.com lalu tempel URL-nya di sini
};

/**
 * Penjaga tipe: `true` hanya bila token sudah diisi Lintang.
 * Dipakai untuk menyembunyikan elemen alih-alih merender token/link kosong.
 */
export function isSet<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/** Data faktual non-token (bersumber CV, BLUEPRINT §4.5) — aman dipakai langsung. */
export const CONTACT = {
  email: "lintangbalakosa@gmail.com",
  github: "https://github.com/codezeros18",
} as const;
