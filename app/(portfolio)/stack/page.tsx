import { Section } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { skillGroups } from "@/content/skills";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Stack",
  description:
    "The tools Lintang Balakosa Ardhana actually builds with, grouped by role.",
  path: "/stack",
});

/**
 * /stack — daftar rapat tanpa "Used in".
 *
 * Baris "Used in: …" DIHAPUS (keputusan Lintang 2026-07-27): setiap proyek sudah
 * mencantumkan stack-nya sendiri di `/projects`, jadi menulisnya dua kali cuma
 * pengulangan. Karena baris itu hilang, pemisah antar grup ikut dihapus dan
 * jaraknya dirapatkan.
 *
 * Ukuran: judul grup Geist Mono 11px uppercase, item 13px, radius `md`.
 */
export default function StackPage() {
  return (
    <main id="main">
      <Section className="pt-12 pb-24 md:pt-16 md:pb-28">
        <PageHeader
          title="stack"
          description="The tools I actually build with, grouped by what they do."
        />

        <div className="mt-14 space-y-8">
          {skillGroups.map((group) => (
            <section key={group.title}>
              <h2 className="mono text-n-500 text-[11px] tracking-[0.16em] uppercase">
                {group.title}
              </h2>

              <ul className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <span className="border-border bg-card text-ink mono inline-flex items-center rounded-md border px-2.5 py-1 text-[13px]">
                      {item.name}
                      {/* Level ditulis apa adanya di chip-nya (§4.4) — tidak
                          disembunyikan supaya klaimnya tetap jujur. */}
                      {item.level ? (
                        <span className="text-n-500">&nbsp;· {item.level}</span>
                      ) : null}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Section>
    </main>
  );
}
