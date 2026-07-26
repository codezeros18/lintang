import { ImageResponse } from "next/og";

/**
 * Bingkai OG image bersama (R6).
 *
 * Satu renderer untuk semua tipe halaman (home / project / blog / collabs) supaya
 * preview share selalu terlihat dari keluarga yang sama. Warnanya token BLUEPRINT
 * §3.2 apa adanya — lihat `docs/DESIGN_LANGUAGE.md` §2.1.
 *
 * TODO(lintang): `PHOTO_FILE` masih kosong, jadi semua OG masih murni tipografi.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const PAPER = "#FBFAF7";
const INK = "#14141A";
const INK_MUTED = "#55555F";
const INDIGO = "#3D5AFE";
const BORDER = "#E6E3DC";

export type OgStat = { display: string; label: string };

export function renderOgImage({
  eyebrow,
  title,
  subtitle,
  stats,
  footer,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** Hook strip — dipakai OG beranda. */
  stats?: OgStat[];
  /** Satu baris kecil di kaki, mis. role · durasi case study. */
  footer?: string;
}) {
  // Judul panjang (nama proyek vs headline beranda) butuh ukuran berbeda supaya
  // tetap terbaca sebagai thumbnail kecil.
  const titleSize = title.length > 42 ? 66 : 82;

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
            {eyebrow}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: titleSize,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1.08,
              marginTop: 28,
            }}
          >
            {title}
          </div>

          {subtitle ? (
            <div
              style={{
                display: "flex",
                fontSize: 32,
                lineHeight: 1.35,
                color: INK_MUTED,
                marginTop: 22,
                maxWidth: 940,
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>

        {stats && stats.length > 0 ? (
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
                  style={{
                    display: "flex",
                    fontSize: 24,
                    color: INK_MUTED,
                    marginTop: 8,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: 32,
              borderTop: `2px solid ${BORDER}`,
              paddingTop: 34,
              fontSize: 24,
              color: INK_MUTED,
            }}
          >
            <div style={{ display: "flex" }}>{footer ?? ""}</div>
            <div style={{ display: "flex", color: INK, fontWeight: 700 }}>
              Lintang Balakosa Ardhana
            </div>
          </div>
        )}
      </div>
    ),
    OG_SIZE,
  );
}
