import { CONTACT } from "@/content/config";

/**
 * Kalender kontribusi GitHub — diambil SAAT BUILD, bukan di browser.
 *
 * ATURAN INTEGRITAS: tidak ada angka karangan di sini. Kalau datanya tidak bisa
 * diambil (token tidak ada, jaringan gagal, API berubah), fungsi ini
 * mengembalikan `null` dan blok GitHub di beranda hanya menampilkan tautan
 * profilnya — TANPA grid titik palsu dan TANPA jumlah kontribusi karangan.
 *
 * Kenapa perlu token: jumlah kontribusi per hari HANYA tersedia lewat GitHub
 * GraphQL API (`contributionsCollection`), dan GraphQL API mewajibkan
 * autentikasi meski datanya publik. REST API tidak menyediakannya. Alternatif
 * lain adalah menyadap SVG di halaman profil atau memakai API pihak ketiga —
 * dua-duanya rapuh dan bisa mati kapan saja, jadi tidak dipakai.
 *
 * CARA MENGAKTIFKAN (Lintang):
 * 1. Buat token di https://github.com/settings/tokens → "Generate new token
 *    (classic)". **Jangan centang scope apa pun** — kalender kontribusi publik
 *    sudah terbaca tanpa scope, jadi tokennya seaman mungkin.
 * 2. Simpan sebagai `GITHUB_TOKEN`:
 *    - lokal → tulis di `.env.local` (file itu sudah di-gitignore)
 *    - Vercel → Project Settings → Environment Variables
 * 3. Build ulang. Tanpa token, situs tetap jalan — bloknya sekadar lebih sepi.
 *
 * Tokennya TIDAK pernah sampai ke browser: fungsi ini hanya dipanggil dari
 * server component saat prerender, dan yang dikirim ke klien cuma angka.
 */

export type ContributionDay = {
  /** ISO `YYYY-MM-DD`. */
  date: string;
  count: number;
};

export type ContributionCalendar = {
  username: string;
  total: number;
  /** Terurut lama → baru. */
  days: ContributionDay[];
  /** Kontribusi terbanyak dalam sehari — dipakai menskalakan ukuran titik. */
  max: number;
};

/** `codezeros18` dari URL profil di `content/config.ts`. */
export function githubUsername(): string {
  return CONTACT.github.replace(/\/+$/, "").split("/").pop() ?? "";
}

const QUERY = `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

type GraphQLResponse = {
  data?: {
    user?: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: {
            contributionDays: { date: string; contributionCount: number }[];
          }[];
        };
      };
    } | null;
  };
};

export async function getContributionCalendar(): Promise<ContributionCalendar | null> {
  const token = process.env.GITHUB_TOKEN;
  const username = githubUsername();

  if (!token || !username) return null;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: QUERY, variables: { login: username } }),
      // Dibekukan ke hasil build — halamannya tetap statis sepenuhnya.
      cache: "force-cache",
    });

    if (!response.ok) return null;

    const json = (await response.json()) as GraphQLResponse;
    const calendar =
      json.data?.user?.contributionsCollection.contributionCalendar;

    if (!calendar) return null;

    const days = calendar.weeks.flatMap((week) =>
      week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
      })),
    );

    if (days.length === 0) return null;

    return {
      username,
      total: calendar.totalContributions,
      days,
      max: days.reduce((peak, day) => Math.max(peak, day.count), 0),
    };
  } catch {
    // Build tidak boleh gagal hanya karena GitHub sedang tidak bisa dihubungi.
    return null;
  }
}
