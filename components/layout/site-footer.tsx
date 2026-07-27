import { Mail } from "lucide-react";

import { Container } from "@/components/ui/container";
import { CONTACT } from "@/content/config";

/**
 * SiteFooter — rumah baru blok kontak.
 *
 * Kalimat "For work, collabs & everything else, reach me at" dulu tinggal di
 * kaki sidebar. Setelah sidebar dihapus (2026-07-27) ia pindah ke kaki halaman,
 * bukan dihapus — itu satu-satunya ajakan kontak yang muncul di setiap halaman.
 */
export function SiteFooter() {
  return (
    <footer className="border-border border-t py-10">
      <Container className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
        <p className="text-ink-muted text-[13px] leading-relaxed">
          For work, collabs &amp; everything else, reach me at
        </p>
        <a
          href={`mailto:${CONTACT.email}`}
          className="mono text-ink hover:text-ink-muted focus-visible:ring-ring inline-flex items-center gap-2 self-start rounded-sm text-[13px] outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        >
          <Mail aria-hidden="true" className="size-4 shrink-0" />
          {CONTACT.email}
        </a>
      </Container>
    </footer>
  );
}
