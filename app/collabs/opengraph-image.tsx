import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt =
  "Collabs — Lintang Balakosa Ardhana. Competitions, teams, and open to building together.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function CollabsOpengraphImage() {
  return renderOgImage({
    eyebrow: "Collabs",
    title: "Things I've built with other people.",
    subtitle:
      "Competitions, teams, and the kind of work I'd like to do more of.",
    footer: "Open to collaborate",
  });
}
