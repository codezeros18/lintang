/**
 * Skills — PORTFOLIO_BLUEPRINT.md §4.4 (bersumber CV).
 *
 * Aturan: tiap grup terhubung ke bukti nyata ("dipakai di ___"). Tidak ada skill
 * yang ditambahkan di luar tabel §4.4, dan level kejujuran ditulis eksplisit
 * (React Native = basic).
 */

export type SkillItem = {
  name: string;
  /** Ditulis apa adanya bila kemampuannya belum setara yang lain. */
  level?: "basic";
};

export type SkillGroup = {
  title: string;
  items: SkillItem[];
  /** Kolom "Dipakai di" §4.4 — skill harus tersambung ke proyek nyata. */
  provenBy: string;
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    items: [
      { name: "Python" },
      { name: "SQL (MySQL/PostgreSQL)" },
      { name: "JavaScript" },
      { name: "TypeScript" },
    ],
    provenBy: "Ankop & Tera",
  },
  {
    title: "Frontend",
    items: [
      { name: "React" },
      { name: "Next.js" },
      { name: "Tailwind CSS" },
      { name: "React Native", level: "basic" },
    ],
    provenBy: "Bisasinema & Tera; React Native (basic) → Juara 2 Internal CIMB Niaga",
  },
  {
    title: "Backend & API",
    items: [
      { name: "FastAPI" },
      { name: "NestJS" },
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "REST" },
      { name: "Integrasi LLM (OpenAI/Anthropic)" },
    ],
    provenBy: "NestJS di Ankop · FastAPI di Tera · LLM di Kuali",
  },
  {
    title: "Data & ML",
    items: [
      { name: "EDA" },
      { name: "Cleaning" },
      { name: "Feature engineering" },
      { name: "Predictive modeling" },
      { name: "Regression/classification" },
      { name: "Pandas" },
      { name: "NumPy" },
      { name: "Scikit-learn" },
      { name: "Looker Studio" },
    ],
    provenBy: "Analisis Hotel & Bank Sampah",
  },
  {
    title: "Database & Arsitektur",
    items: [
      { name: "PostgreSQL" },
      { name: "MySQL" },
      { name: "Prisma" },
      { name: "Supabase" },
      { name: "Multi-tenant (RLS)" },
    ],
    provenBy: "RLS 6-role di Tera · Prisma di Ankop",
  },
  {
    title: "DevOps & Integrasi",
    items: [
      { name: "Docker" },
      { name: "Vercel" },
      { name: "Railway" },
      { name: "GitHub" },
      { name: "Midtrans" },
      { name: "Technical SEO" },
    ],
    provenBy: "Docker/Railway di Ankop · Midtrans & SEO di Bisasinema",
  },
];
