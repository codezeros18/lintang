// Skeleton S1 — sengaja minimal.
// Tidak ada konten karangan di sini: hanya nama + role label (BLUEPRINT §4.1) dan
// penanda bahwa situs masih dibangun. Section asli menyusul di S3–S5.
export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-content flex-1 flex-col justify-center px-6 py-24">
      <p className="mono text-sm tracking-wide text-ink-muted uppercase">
        Full-Stack Engineer · Informatika UMN
      </p>
      <h1 className="mt-4 text-(length:--step-3) leading-tight font-semibold">
        Lintang Balakosa Ardhana
      </h1>
      <p className="mt-6 max-w-prose text-ink-muted">
        Situs sedang dibangun. Konten portfolio menyusul.
      </p>
    </main>
  );
}
