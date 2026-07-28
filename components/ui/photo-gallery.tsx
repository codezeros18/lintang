"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Lightbox foto + dua pemicunya.
 *
 * - `PhotoGallery` — grid thumbnail (dipakai halaman organisasi, pendidikan, collabs).
 * - `PhotoLink`    — tautan teks bergaris bawah "View" (dipakai kartu sertifikat).
 *
 * Keduanya memakai modal yang sama supaya perilakunya seragam: klik di luar,
 * tombol ×, atau Esc → tertutup.
 *
 * A11y: modal memakai `role="dialog"` + `aria-modal`, memerangkap fokus, dan
 * mengembalikan fokus ke pemicunya saat ditutup — pola yang sama dengan drawer
 * sidebar. Transisinya CSS, jadi aturan global `prefers-reduced-motion` di
 * `globals.css` otomatis mematikannya.
 *
 * Kalau tidak ada foto, komponen merender **null** — tidak ada bingkai kosong
 * atau placeholder palsu.
 */

export type Photo = {
  /** Path relatif dari `/images/`, mis. `umneco/rapat-divisi.jpg`. */
  src: string;
  /** Wajib diisi — alt kosong membuat foto tak terbaca screen reader. */
  alt: string;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function Lightbox({ photo, onClose }: { photo: Photo; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panel = panelRef.current;
    // Pemicunya masih memegang fokus saat modal dipasang, jadi elemen inilah
    // yang dikembalikan fokusnya saat ditutup — pola yang sama dengan drawer.
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const getItems = () =>
      panel ? Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)) : [];

    getItems()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const items = getItems();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
      {/* Klik di area gelap menutup modal. */}
      <div onClick={onClose} className="bg-overlay absolute inset-0" />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={photo.alt}
        className="relative z-10 flex max-h-full w-full max-w-4xl flex-col"
      >
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close photo"
            className="text-n-0 hover:bg-n-0/15 focus-visible:ring-n-0 mb-2 inline-flex size-10 items-center justify-center rounded-md outline-none focus-visible:ring-2"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>

        <Image
          src={`/images/${photo.src}`}
          alt={photo.alt}
          width={1600}
          height={1200}
          sizes="(max-width: 1024px) 92vw, 900px"
          className="max-h-[80vh] w-full rounded-md object-contain"
        />

        <p className="mono text-n-0/80 mt-3 text-center text-[12px]">
          {photo.alt}
        </p>
      </div>
    </div>
  );
}

export function PhotoGallery({
  photos,
  className,
}: {
  photos: Photo[];
  className?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const close = useCallback(() => setOpenIndex(null), []);

  if (photos.length === 0) return null;

  const active = openIndex === null ? null : photos[openIndex];

  return (
    <>
      <ul
        className={cn(
          "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4",
          className,
        )}
      >
        {photos.map((photo, index) => (
          <li key={photo.src}>
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={`Open photo: ${photo.alt}`}
              className="border-border bg-secondary focus-visible:ring-ring hover:border-n-300 block w-full overflow-hidden rounded-md border outline-none transition-colors focus-visible:ring-2"
            >
              <Image
                src={`/images/${photo.src}`}
                alt={photo.alt}
                width={400}
                height={300}
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 220px"
                className="aspect-4/3 w-full object-cover"
              />
            </button>
          </li>
        ))}
      </ul>

      {active ? <Lightbox photo={active} onClose={close} /> : null}
    </>
  );
}

/**
 * ScreenshotStrip — mockup produk selebar kolom, satu per baris.
 *
 * Beda dari `PhotoGallery` yang thumbnail kecil: mockup ini komposisi lebar
 * (dua jendela browser miring berdampingan), jadi kalau dipaksa dua kolom
 * isinya jadi terlalu kecil untuk dibaca. Karena itu satu per baris, penuh dari
 * kiri ke kanan kolom.
 *
 * File-nya PNG transparan, jadi TIDAK diberi latar, bingkai, atau bayangan —
 * mockup-nya sudah membawa bayangannya sendiri dan akan bertabrakan kalau
 * ditumpuk lagi.
 *
 * **TIDAK dipotong sama sekali** — rasio aslinya dibiarkan apa adanya.
 *
 * Sebelumnya sempat dipangkas `object-cover` (dicoba `2/1` lalu `aspect-video`)
 * untuk membuang pita kosong di atas–bawah PNG-nya. Dua-duanya salah: tiap
 * mockup punya tinggi komposisi yang berbeda, jadi rasio tetap APA PUN akan
 * memotong salah satunya — `mock2` Bisasinema terbukti terpotong di 16/9.
 * Memotong gambar yang isinya justru mau dipamerkan adalah cacat, sementara
 * ruang kosongnya cuma soal rasa. Karena PNG-nya transparan, ruang itu pun
 * tidak terlihat sebagai kotak kosong.
 *
 * Konsekuensinya komponen ini menerima mockup dengan rasio apa pun tanpa perlu
 * disetel ulang.
 */
export function ScreenshotStrip({
  screenshots,
  className,
}: {
  screenshots: Photo[];
  className?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const close = useCallback(() => setOpenIndex(null), []);

  if (screenshots.length === 0) return null;

  const active = openIndex === null ? null : screenshots[openIndex];

  return (
    <>
      {/* Pita kosong bawaan tiap PNG saling menempel kalau jaraknya normal,
          jadi jaraknya dirapatkan — ruang napasnya sudah ada di dalam gambar. */}
      <ul className={cn("-space-y-6 md:-space-y-10", className)}>
        {screenshots.map((shot, index) => (
          <li key={shot.src}>
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={`Open screenshot: ${shot.alt}`}
              className="focus-visible:ring-ring block w-full cursor-zoom-in rounded-(--radius) outline-none focus-visible:ring-2"
            >
              {/* `width`/`height` = ukuran INTRINSIK berkasnya, dipakai
                  next/image untuk memesan ruang; `h-auto` membuat tingginya
                  mengikuti rasio asli berapa pun itu. */}
              <Image
                src={`/images/${shot.src}`}
                alt={shot.alt}
                width={1920}
                height={1440}
                sizes="(max-width: 900px) 100vw, 880px"
                className="h-auto w-full"
              />
            </button>
          </li>
        ))}
      </ul>

      {active ? <Lightbox photo={active} onClose={close} /> : null}
    </>
  );
}

/** Tautan teks "View" yang membuka satu foto di modal. */
export function PhotoLink({
  photo,
  label = "View",
  className,
}: {
  photo: Photo;
  label?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "mono text-ink decoration-border hover:decoration-ink focus-visible:ring-ring rounded-sm text-[12px] underline underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          className,
        )}
      >
        {label}
      </button>

      {open ? <Lightbox photo={photo} onClose={close} /> : null}
    </>
  );
}
