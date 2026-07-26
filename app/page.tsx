import { HomeIntro } from "@/components/sections/home-intro";

/**
 * Splash `/` — HANYA foto + headline + strip angka (keputusan Lintang 2026-07-26).
 *
 * TIDAK ada sidebar/nav di sini — root layout tidak lagi membungkus dengan
 * `AppShell`; itu sekarang dipindah ke `app/(portfolio)/layout.tsx`, jadi
 * halaman ini satu-satunya rute yang benar-benar polos.
 *
 * "Portfolio lengkap" (sidebar + Experience/Projects/dst.) hidup di `/home`,
 * dituju lewat tautan "Know me more" di dalam `HomeIntro`.
 */
export default function SplashPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-content px-5 sm:px-6">
      <HomeIntro />
    </main>
  );
}
