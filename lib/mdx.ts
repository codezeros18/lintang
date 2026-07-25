import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

import matter from "gray-matter";

/**
 * Log / Activity — BLUEPRINT §6.
 *
 * Arsitektur: MDX git-based, dibaca dari `content/log/` saat build (SSG).
 * Tambah post = tulis file `.mdx` + `git push`. **Tanpa backend/DB berbayar.**
 *
 * File yang diawali `_` diperlakukan sebagai template/draft dan TIDAK diterbitkan.
 */

export const LOG_DIR = join(process.cwd(), "content", "log");

export type LogType = "competition" | "event" | "project";
export type LogResult = "won" | "lost" | "participated";

export type LogFrontmatter = {
  title: string;
  /** `YYYY-MM-DD`. Boleh kosong bila tanggalnya belum dipastikan → tidak ditampilkan. */
  date: string;
  type: LogType;
  role: string;
  stack: string[];
  result: LogResult;
  /** Satu pelajaran. Boleh kosong → blok pelajaran disembunyikan (jangan dikarang). */
  lesson: string;
  /** `true` = ide inti sengaja dikaburkan. */
  teaser: boolean;
  cta: string;
};

export type LogPost = LogFrontmatter & {
  slug: string;
  /** Isi MDX mentah, siap dirender. */
  body: string;
};

function normalize(data: Record<string, unknown>): LogFrontmatter {
  return {
    title: typeof data.title === "string" ? data.title : "",
    date: typeof data.date === "string" ? data.date : "",
    type: (data.type as LogType) ?? "project",
    role: typeof data.role === "string" ? data.role : "",
    stack: Array.isArray(data.stack) ? (data.stack as string[]) : [],
    result: (data.result as LogResult) ?? "participated",
    lesson: typeof data.lesson === "string" ? data.lesson : "",
    teaser: data.teaser === true,
    cta: typeof data.cta === "string" ? data.cta : "",
  };
}

/** Semua post terbit, terbaru di atas. Post tanpa tanggal ditaruh paling akhir. */
export async function getLogPosts(): Promise<LogPost[]> {
  let files: string[];
  try {
    files = await readdir(LOG_DIR);
  } catch {
    return [];
  }

  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx") && !file.startsWith("_"))
      .map(async (file) => {
        const raw = await readFile(join(LOG_DIR, file), "utf8");
        const { data, content } = matter(raw);
        return {
          ...normalize(data),
          slug: file.replace(/\.mdx$/, ""),
          body: content.trim(),
        } satisfies LogPost;
      }),
  );

  return posts.sort((a, b) => {
    if (!a.date && !b.date) return a.title.localeCompare(b.title);
    if (!a.date) return 1;
    if (!b.date) return -1;
    return b.date.localeCompare(a.date);
  });
}

export async function getLogPost(slug: string): Promise<LogPost | null> {
  const posts = await getLogPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

/** Tanggal untuk ditampilkan. String kosong → `null` supaya elemennya disembunyikan. */
export function formatLogDate(date: string): string | null {
  if (!date) return null;
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Nada badge hasil — menang tidak dirayakan berlebihan, kalah tidak disembunyikan. */
export function resultTone(result: LogResult): "accent" | "neutral" | "outline" {
  switch (result) {
    case "won":
      return "accent";
    case "lost":
      return "outline";
    default:
      return "neutral";
  }
}
