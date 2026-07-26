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

/* ==========================================================================
   Blog — fase 2 R4
   Pipeline yang sama persis dengan Log: MDX git-based, dibaca saat build.
   Tambah post = tulis `.mdx` + `git push`. **Tanpa backend/DB berbayar.**
   ========================================================================== */

export const BLOG_DIR = join(process.cwd(), "content", "blog");

export type BlogFrontmatter = {
  title: string;
  /** `YYYY-MM-DD`. Kosong → tanggal tidak ditampilkan & post diurutkan terakhir. */
  date: string;
  tags: string[];
  summary: string;
  /**
   * URL asli bila tulisannya lebih dulu terbit di tempat lain (mis. LinkedIn).
   * Dipakai sebagai `alternates.canonical` DAN ditampilkan sebagai tautan
   * "Originally published on …" — supaya pembaca tahu asalnya, bukan disamarkan.
   */
  canonical: string | null;
  /**
   * `true` = kerangka yang belum ditulis Lintang.
   * Draft **tidak diterbitkan** di produksi: tidak muncul di `/blog`, RSS, maupun
   * sitemap, dan halamannya 404. Di `next dev` tetap bisa dibuka untuk menulis.
   */
  draft: boolean;
};

export type BlogPost = BlogFrontmatter & {
  slug: string;
  body: string;
};

function normalizeBlog(data: Record<string, unknown>): BlogFrontmatter {
  return {
    title: typeof data.title === "string" ? data.title : "",
    date: typeof data.date === "string" ? data.date : "",
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    summary: typeof data.summary === "string" ? data.summary : "",
    canonical:
      typeof data.canonical === "string" && data.canonical.length > 0
        ? data.canonical
        : null,
    draft: data.draft === true,
  };
}

/**
 * Post blog, terbaru di atas.
 *
 * Draft disembunyikan di produksi. Ini yang menjaga janji "jangan mengarang":
 * kerangka post boleh ada di repo tanpa pernah tampil sebagai tulisan Lintang
 * sampai ia benar-benar menulisnya.
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  let files: string[];
  try {
    files = await readdir(BLOG_DIR);
  } catch {
    return [];
  }

  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx") && !file.startsWith("_"))
      .map(async (file) => {
        const raw = await readFile(join(BLOG_DIR, file), "utf8");
        const { data, content } = matter(raw);
        return {
          ...normalizeBlog(data),
          slug: file.replace(/\.mdx$/, ""),
          body: content.trim(),
        } satisfies BlogPost;
      }),
  );

  const visible =
    process.env.NODE_ENV === "production"
      ? posts.filter((post) => !post.draft)
      : posts;

  return visible.sort((a, b) => {
    if (!a.date && !b.date) return a.title.localeCompare(b.title);
    if (!a.date) return 1;
    if (!b.date) return -1;
    return b.date.localeCompare(a.date);
  });
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

/** Semua tag yang dipakai post terbit — dihitung dari frontmatter, tanpa DB. */
export async function getBlogTags(): Promise<string[]> {
  const posts = await getBlogPosts();
  return [...new Set(posts.flatMap((post) => post.tags))].sort();
}
