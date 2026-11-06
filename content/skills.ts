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
      { name: "SQL (MySQL, PostgreSQL)" },
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
    provenBy:
      "Bisasinema, Tera & Ankop; React Native (basic) → digital account-opening app, 2nd Place Internal, CIMB Niaga",
  },
  {
    title: "Backend & API",
    items: [
      { name: "FastAPI" },
      { name: "NestJS" },
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "REST" },
      { name: "LLM/AI API integration (OpenAI, Anthropic)" },
    ],
    provenBy: "NestJS at Ankop & Bisasinema · FastAPI at Tera · LLM column mapping at Muara",
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
      { name: "Matplotlib" },
      { name: "Seaborn" },
      { name: "Folium" },
      { name: "Looker Studio" },
    ],
    provenBy: "Hotel Cancellation Analysis & Bank Sampah Digital",
  },
  {
    title: "Database & Architecture",
    items: [
      { name: "PostgreSQL" },
      { name: "MySQL" },
      { name: "Prisma" },
      { name: "Supabase" },
      { name: "Multi-tenant (RLS)" },
    ],
    provenBy: "RLS at Tera, Weigh to Go & Muara · Prisma + MySQL at Ankop · PostgreSQL ledger at Macacih",
  },
  {
    title: "DevOps & Integrations",
    items: [
      { name: "Docker" },
      { name: "Vercel" },
      { name: "Railway" },
      { name: "GitHub" },
      { name: "Midtrans" },
      { name: "WhatsApp Cloud API" },
      { name: "Technical SEO" },
    ],
    provenBy: "Docker/Railway at Ankop · Midtrans & SEO at Bisasinema · WhatsApp Cloud API at Weigh to Go",
  },
];
