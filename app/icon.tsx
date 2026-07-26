import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { CONFIG } from "@/content/config";

/**
 * Favicon — foto Lintang, bukan monogram huruf (keputusan Lintang 2026-07-27).
 *
 * Fotonya dibaca dari `public/images/` saat build lalu ditanam sebagai data URI,
 * karena Satori tidak bisa mengambil aset lewat path relatif. Latarnya diberi
 * warna solid supaya bentuknya tetap terbaca di tab browser — foto aslinya
 * transparan, dan ikon transparan hilang di tab bertema terang.
 */

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  const photo = CONFIG.PHOTO_FILE;
  if (!photo) {
    // Tanpa foto, jangan render ikon karangan — biarkan browser pakai default.
    return new ImageResponse(<div style={{ display: "flex" }} />, size);
  }

  const bytes = await readFile(join(process.cwd(), "public", "images", photo));
  const src = `data:image/png;base64,${bytes.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          background: "#E6E6E6",
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          width={64}
          height={64}
          style={{ objectFit: "cover" }}
        />
      </div>
    ),
    size,
  );
}
