/**
 * Loading UI untuk `/home` (Next.js file convention) — tampil sesaat saat
 * segmen ini di-fetch, mis. saat masuk dari splash lewat tautan
 * "Know me more" (permintaan Lintang: "animasi loading ke portonya").
 *
 * Statis, tanpa spinner berputar terus — cukup teks pulsing ringan yang
 * otomatis berhenti berdenyut saat `prefers-reduced-motion` aktif (lihat
 * aturan global di `globals.css`).
 */
export default function HomeLoading() {
  return (
    <main
      id="main"
      className="flex min-h-[60vh] items-center justify-center px-5"
    >
      <p className="mono text-n-500 animate-pulse text-[13px] tracking-[0.16em] uppercase">
        Loading portfolio…
      </p>
    </main>
  );
}
