import { PhotoGallery } from "@/components/ui/photo-gallery";
import type { Story } from "@/content/story";

/**
 * Badan halaman detail bercerita — dipakai bersama oleh organisasi,
 * pendidikan, dan collabs supaya ketiganya terbaca sebagai satu keluarga.
 *
 * Blok yang datanya belum ada TIDAK dirender: tidak ada paragraf karangan,
 * tidak ada bingkai foto kosong. Kalau seluruh ceritanya masih kosong,
 * halaman menampilkan satu baris jujur "coming soon" — pola yang sama dengan
 * "Evidence coming soon" di case study proyek.
 */
export function StoryBody({ story }: { story: Story }) {
  const isEmpty =
    story.intro === null &&
    story.sections.length === 0 &&
    story.photos.length === 0;

  if (isEmpty) {
    return (
      <p className="mono text-n-500 border-border mt-10 border-t pt-6 text-[12px]">
        Story and photos coming soon.
      </p>
    );
  }

  return (
    <div className="mt-10">
      {story.intro ? (
        <p className="text-ink text-[15px] leading-relaxed">{story.intro}</p>
      ) : null}

      {story.sections.length > 0 ? (
        <div className="mt-10 space-y-10">
          {story.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="mono text-n-500 text-[11px] tracking-[0.16em] uppercase">
                {section.heading}
              </h2>
              <div className="mt-3 space-y-4">
                {section.body.split("\n\n").map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className="text-ink-muted text-[15px] leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : null}

      {story.photos.length > 0 ? (
        <section className="mt-12">
          <h2 className="mono text-n-500 text-[11px] tracking-[0.16em] uppercase">
            Photos
          </h2>
          <PhotoGallery photos={story.photos} className="mt-4" />
        </section>
      ) : null}
    </div>
  );
}
