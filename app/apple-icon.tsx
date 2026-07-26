import { ImageResponse } from "next/og";

/**
 * Apple touch icon — monogram yang sama dengan `app/icon.svg`, dirender 180×180
 * karena iOS tidak memakai favicon SVG.
 *
 * TODO(lintang): kalau nanti ada logo/mark personal, ganti monogram ini di dua tempat
 * (`app/icon.svg` dan file ini) supaya tetap seragam.
 */

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#171717",
          color: "#FAFAFA",
          fontSize: 116,
          fontWeight: 700,
          fontFamily: "sans-serif",
        }}
      >
        L
      </div>
    ),
    size,
  );
}
