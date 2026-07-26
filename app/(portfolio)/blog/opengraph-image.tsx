import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt =
  "Blog — Lintang Balakosa Ardhana. Notes from building things that run.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function BlogOpengraphImage() {
  return renderOgImage({
    eyebrow: "Blog",
    title: "Notes from building things that run.",
    subtitle:
      "What I learned shipping production systems, and what the data said afterwards.",
    footer: "lintangbalakosa.dev/blog",
  });
}
