import { getHookStats } from "@/content/hook-stats";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

/**
 * OG image beranda — BLUEPRINT §7: nama + role + hook strip, teks besar.
 * Angka diambil dari `content/hook-stats.ts`, sumber yang sama dengan hero,
 * jadi preview share tidak mungkin memuat angka berbeda dari situsnya.
 */

export const alt =
  "Lintang Balakosa Ardhana — Full-Stack Engineer. Building real production systems and proving their impact with data.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: "Full-Stack Engineer · Informatics, UMN",
    title: "Lintang Balakosa Ardhana",
    subtitle:
      "I build systems real businesses run on — and prove their impact with data.",
    stats: getHookStats().map((stat) => ({
      display: stat.display,
      label: stat.label,
    })),
  });
}
