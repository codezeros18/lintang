import { HomeIntro } from "@/components/sections/home-intro";

/**
 * Splash `/` — HANYA foto + headline + strip angka (keputusan Lintang 2026-07-26).
 *
 * TIDAK ada sidebar/nav di sini — root layout tidak lagi membungkus dengan
 * `AppShell`; itu sekarang dipindah ke `app/(portfolio)/layout.tsx`, jadi
 * halaman ini satu-satunya rute yang benar-benar polos.
 *
 * Konten dipusatkan VERTIKAL (jarak atas=bawah) lewat `min-h-dvh` + flex
 * `items-center`, bukan sekadar padding-top seperti versi sebelumnya —
 * `dvh` dipakai (bukan `vh`) supaya tetap akurat di browser mobile yang
 * address bar-nya bisa menyusut/melebar.
 *
 * "Portfolio lengkap" (sidebar + Experience/Projects/dst.) hidup di `/home`,
 * dituju lewat tautan "Know me more" di dalam `HomeIntro`.
 */
export default function SplashPage() {
  return (
    <main
      id="main"
      className="flex min-h-dvh items-center justify-center px-5 py-10 sm:px-6"
    >
      <div className="w-full max-w-content">
        <HomeIntro />
      </div>
    </main>
  );
}
