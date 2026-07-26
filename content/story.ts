/**
 * Kerangka "cerita" yang dipakai bersama oleh halaman detail organisasi,
 * pendidikan, dan collabs.
 *
 * ATURAN INTEGRITAS (§ blueprint): file ini hanya menyediakan **template**.
 * Semua `intro`, `sections`, dan `photos` yang belum diisi Lintang sengaja
 * dibiarkan kosong — halaman detailnya akan menyembunyikan blok yang kosong,
 * bukan menampilkan kalimat karangan atau foto placeholder. Jangan pernah
 * mengisi field di sini dengan tebakan.
 *
 * Cara mengisi (Lintang):
 * 1. `intro`    — satu–dua kalimat pembuka: perannya apa, timnya siapa.
 * 2. `sections` — pakai judul yang menceritakan urutan kejadian, mis.
 *                 "What we were asked to do", "Working with the visual division",
 *                 "What shipped", "What I'd do differently".
 * 3. `photos`   — taruh filenya di `public/images/<folder>/`, lalu tulis
 *                 `src` relatif dari `/images/` beserta `alt` yang deskriptif.
 */

export type StoryPhoto = {
  /** Path relatif dari `public/images/`, mis. `umn-eco/rapat-divisi.jpg`. */
  src: string;
  /** Wajib deskriptif — dibaca screen reader dan jadi caption di modal. */
  alt: string;
};

export type StorySection = {
  heading: string;
  /** Paragraf biasa. Satu string; pisahkan paragraf dengan `\n\n`. */
  body: string;
};

export type Story = {
  /** `null` = belum ditulis → paragraf pembuka tidak dirender. */
  intro: string | null;
  /** Kosong = bagian cerita tidak dirender sama sekali. */
  sections: StorySection[];
  /** Kosong = galeri tidak dirender (tanpa bingkai kosong). */
  photos: StoryPhoto[];
};

/** Template kosong — dipakai sebagai nilai awal setiap entri yang belum ditulis. */
export const emptyStory: Story = {
  intro: null,
  sections: [],
  photos: [],
};

/** `true` bila ada sesuatu yang layak dirender di halaman detail. */
export function hasStoryContent(story: Story): boolean {
  return (
    story.intro !== null || story.sections.length > 0 || story.photos.length > 0
  );
}
