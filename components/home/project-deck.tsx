import Link from "next/link";

import { OrgMark } from "@/components/ui/org-mark";
import { displayName, type Project } from "@/content/projects";
import { cn } from "@/lib/utils";

/**
 * ProjectDeck — tiga proyek sebagai tumpukan kartu yang dikipas.
 *
 * Bentuknya diminta Lintang (2026-07-27): kartu tengah tegak dan disorot,
 * kiri–kanan miring di belakangnya; saat kursor menyentuh salah satu sisi,
 * kartu itu maju dan yang tengah sedikit mundur.
 *
 * Catatan anti-clone (docs/DESIGN_LANGUAGE.md §3.1): tumpukan kartu dikipas
 * adalah bentuk yang juga dipakai referensi. Yang dipinjam hanya **idenya**;
 * seluruh nilainya milik sendiri — sudut, jarak, radius, bayangan, tipografi,
 * dan sorotan hijau aksen. Isi kartunya juga beda: referensi memajang badge
 * app store, ini memajang label kejujuran (`production` / `competition`) yang
 * memang jadi aturan portfolio ini.
 *
 * Semua gerakan CSS (`group-hover` + `transition`), tanpa JS. Aturan global
 * `prefers-reduced-motion` di `globals.css` mematikan transisinya, dan karena
 * tata letaknya tidak bergantung pada gerakan, tanpa animasi pun tetap terbaca.
 *
 * Di bawah `md` kipasnya dilepas jadi tumpukan lurus satu kolom — kartu miring
 * di 360px tidak bisa dipakai.
 */

type Slot = "left" | "center" | "right";

/** Kartu tengah paling menonjol; sisi kiri/kanan lebih kecil dan miring. */
const SLOT_STYLES: Record<Slot, string> = {
  left: "md:z-10 md:-rotate-[7deg] md:-translate-x-[62%] md:translate-y-3 md:scale-[0.93] md:group-hover/deck:-translate-x-[70%] md:hover:!-translate-x-[76%] md:hover:!rotate-[-4deg] md:hover:!scale-[0.99] md:hover:!z-30",
  center:
    "md:z-20 md:group-hover/deck:scale-[0.97] md:hover:!scale-100 md:hover:!z-30",
  right:
    "md:z-10 md:rotate-[7deg] md:translate-x-[62%] md:translate-y-3 md:scale-[0.93] md:group-hover/deck:translate-x-[70%] md:hover:!translate-x-[76%] md:hover:!rotate-[4deg] md:hover:!scale-[0.99] md:hover:!z-30",
};

function DeckCard({ project, slot }: { project: Project; slot: Slot }) {
  const highlighted = slot === "center";

  return (
    <article
      className={cn(
        "bg-card relative rounded-(--radius) border p-6",
        "transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "md:absolute md:w-[19rem] md:origin-bottom",
        highlighted
          ? "border-accent/35 shadow-soft"
          : "border-border md:shadow-soft",
        SLOT_STYLES[slot],
      )}
    >
      <div className="flex items-start gap-3">
        <OrgMark logo={project.logo} short={project.short} />
        <span
          className={cn(
            "mono rounded-full px-2 py-1 text-[10px] tracking-[0.1em] uppercase",
            highlighted
              ? "bg-accent-wash text-accent"
              : "border-border text-n-500 border",
          )}
        >
          {project.honesty}
        </span>
      </div>

      <h3 className="mono text-ink mt-4 text-[15px]">
        {/* Tautan direntangkan ke seluruh kartu — seluruh kartu bisa diklik
            tanpa menyarangkan tautan di dalam tautan. */}
        <Link
          href={`/projects/${project.slug}`}
          className="focus-visible:ring-ring rounded-sm outline-none before:absolute before:inset-0 before:content-[''] focus-visible:ring-2 focus-visible:ring-offset-2"
        >
          {displayName(project)}
        </Link>
      </h3>

      <p className="text-ink-muted mt-2 text-[14px] leading-relaxed">
        {project.tagline}
      </p>
    </article>
  );
}

export function ProjectDeck({ projects }: { projects: Project[] }) {
  // Butuh tepat tiga: satu tengah, satu kiri, satu kanan.
  const [center, left, right] = projects.slice(0, 3);
  if (!center) return null;

  return (
    <div className="group/deck relative mt-6 flex flex-col gap-4 md:mt-10 md:h-[19rem] md:flex-row md:items-center md:justify-center md:gap-0">
      {left ? <DeckCard project={left} slot="left" /> : null}
      <DeckCard project={center} slot="center" />
      {right ? <DeckCard project={right} slot="right" /> : null}
    </div>
  );
}
