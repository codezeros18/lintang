import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { CONFIG } from "@/content/config";

/**
 * Apple touch icon — versi 180×180 dari `app/icon.tsx` (foto, bukan monogram).
 * iOS tidak memakai favicon SVG, jadi ikon ini dirender terpisah.
 */

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const photo = CONFIG.PHOTO_FILE;
  if (!photo) {
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
          width={180}
          height={180}
          style={{ objectFit: "cover" }}
        />
      </div>
    ),
    size,
  );
}
