import { ImageResponse } from "next/og";

import { getHookStats } from "@/content/hook-stats";

/**
 * OG image — BLUEPRINT §7: nama + role + hook strip, teks besar supaya tetap terbaca
 * sebagai thumbnail kecil di chat.
 *
 * Angka diambil dari `content/hook-stats.ts`, sumber yang sama dengan hero — jadi
 * preview share tidak mungkin memuat angka yang berbeda dari situsnya.
 *
 * TODO(lintang): `PHOTO_FILE` masih kosong, jadi OG ini murni tipografi. Begitu foto
 * profil tersedia, tambahkan di kolom kanan (§7 menyebut "+ foto").
 */

export const alt =
  "Lintang Balakosa Ardhana — Full-Stack Engineer. Building real production systems and proving their impact with data.";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#FBFAF7";
const INK = "#14141A";
const INK_MUTED = "#55555F";
const INDIGO = "#3D5AFE";
const BORDER = "#E6E3DC";

export default function OpengraphImage() {
  const stats = getHookStats();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: PAPER,
          color: INK,
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              fontSize: 26,
              letterSpacing: 2,
              color: INK_MUTED,
              textTransform: "uppercase",
            }}
          >
            <div
              style={{
                width: 40,
                height: 8,
                background: INDIGO,
                borderRadius: 4,
                display: "flex",
              }}
            />
            Full-Stack Engineer · Informatics, UMN
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 82,
              fontWeight: 700,
              letterSpacing: -2,
              marginTop: 28,
            }}
          >
            Lintang Balakosa Ardhana
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 34,
              lineHeight: 1.35,
              color: INK_MUTED,
              marginTop: 22,
              maxWidth: 900,
            }}
          >
            I build systems real businesses run on — and prove their impact with
            data.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 56,
            borderTop: `2px solid ${BORDER}`,
            paddingTop: 34,
          }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div style={{ display: "flex", fontSize: 54, fontWeight: 700 }}>
                {stat.display}
              </div>
              <div
                style={{ display: "flex", fontSize: 24, color: INK_MUTED, marginTop: 8 }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
