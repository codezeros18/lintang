/**
 * Slot foto yang "disiapkan dulu, diisi belakangan" (permintaan Lintang 2026-11-07).
 *
 * Masalah yang dipecahkan: proyek baru (AEI, Macacih, Muara, Weigh to Go) sudah
 * punya tempat foto di desain, tapi filenya belum ada. Daripada menulis galeri
 * kosong lalu mengedit kode lagi saat foto datang, setiap slot ditulis SEKARANG
 * dengan nama berkas yang disepakati, dan berkas yang belum ada di disk
 * disaring di sini saat build.
 *
 * Akibatnya:
 * - Belum ada berkas → slotnya tidak dirender sama sekali. Tidak ada bingkai
 *   kosong, tidak ada gambar rusak, tidak ada placeholder palsu.
 * - Berkas ditaruh di `public/images/<folder>/` dengan nama yang sama → muncul
 *   sendiri di build berikutnya, tanpa menyentuh kode.
 *
 * Ekstensi boleh dihilangkan di `src` (mis. `macacih/mock1`): yang dicari
 * berurutan `.png`, `.jpg`, `.jpeg`, `.webp`, jadi Lintang tidak perlu
 * mengingat format apa yang ia simpan.
 *
 * HANYA untuk server component (memakai `node:fs`). Komponen klien seperti
 * `PhotoGallery` menerima hasil saringannya lewat props.
 */

import fs from "node:fs";
import path from "node:path";

const IMAGES_DIR = path.join(process.cwd(), "public", "images");
const EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp"];

/** `src` relatif dari `/images/` → `src` lengkap dengan ekstensi, atau `null`. */
export function resolveImage(src: string): string | null {
  if (path.extname(src)) {
    return fs.existsSync(path.join(IMAGES_DIR, src)) ? src : null;
  }
  for (const ext of EXTENSIONS) {
    if (fs.existsSync(path.join(IMAGES_DIR, src + ext))) return src + ext;
  }
  return null;
}

/** Saring daftar foto: buang yang berkasnya belum ada, lengkapi ekstensinya. */
export function onDisk<T extends { src: string }>(photos: T[]): T[] {
  return photos.flatMap((photo) => {
    const src = resolveImage(photo.src);
    return src ? [{ ...photo, src }] : [];
  });
}
