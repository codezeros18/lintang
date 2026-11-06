import { cn } from "@/lib/utils";

/**
 * HighlightChip — penanda peran yang memang ingin ditonjolkan (permintaan Lintang
 * 2026-11-07): "Founder · SaaS" di Muara & Weigh to Go, "Team leader" di setiap lomba.
 *
 * Satu gaya untuk semua tempat: wash hijau aksen + teks aksen (kontras 6.21:1,
 * lolos AA; lihat PROGRESS_LOG 2026-07-28). Sengaja kecil dan mono, sama dengan
 * label kejujuran, supaya terbaca sebagai fakta, bukan iklan.
 */
export function HighlightChip({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "mono bg-accent-wash text-accent inline-flex items-center rounded-full px-2 py-0.5 text-[10px] tracking-[0.1em] whitespace-nowrap uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}
