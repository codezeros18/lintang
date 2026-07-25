"use client";

import { useEffect, useState } from "react";

/**
 * Scroll-spy ringan — IntersectionObserver murni, tanpa library tambahan
 * (`SPRINTS_PHASE2_REDESIGN.md` R1: "bukan lib berat").
 *
 * Cara kerjanya: `rootMargin` memotong viewport jadi pita tipis di tengah layar.
 * Section yang sedang melintasi pita itulah yang dianggap aktif — jauh lebih stabil
 * daripada menghitung `scrollY` manual, dan tidak memicu listener tiap frame scroll.
 *
 * Mengembalikan `null` bila tidak ada section yang cocok (mis. di halaman case study),
 * sehingga tidak ada item nav yang salah disorot.
 */
export function useActiveSection(ids: string[], enabled = true): string | null {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join(",");

  useEffect(() => {
    // Saat dinonaktifkan, observer tidak dipasang dan state tidak disentuh —
    // nilainya diturunkan saat render (lihat `return` di bawah), bukan di-set
    // dari dalam effect.
    if (!enabled) return;

    const elements = key
      .split(",")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          );

        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key, enabled]);

  return enabled ? active : null;
}
