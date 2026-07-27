import type { ContributionCalendar } from "@/lib/github";

/**
 * Grid kontribusi GitHub — titik, bukan kotak.
 *
 * Titiknya membesar mengikuti jumlah kontribusi hari itu, memakai hijau aksen
 * untuk hari yang paling ramai. Datanya nyata (`lib/github.ts`); komponen ini
 * tidak pernah mengarang angka — kalau `calendar` `null`, ia tidak dirender
 * sama sekali oleh pemanggilnya.
 *
 * Skalanya relatif terhadap hari terbanyak (`max`), jadi grafiknya jujur untuk
 * volume kontribusi berapa pun dan tidak melebih-lebihkan minggu yang sepi.
 *
 * Murni CSS + SVG, tanpa JS di klien.
 */

const DOT_STEPS = [
  { minRatio: 0, radius: 1.1, className: "fill-n-200" },
  { minRatio: 0.001, radius: 1.7, className: "fill-n-300" },
  { minRatio: 0.25, radius: 2.4, className: "fill-accent/45" },
  { minRatio: 0.5, radius: 3.1, className: "fill-accent/70" },
  { minRatio: 0.75, radius: 3.8, className: "fill-accent" },
];

function step(count: number, max: number) {
  const ratio = max === 0 ? 0 : count / max;
  return [...DOT_STEPS].reverse().find((s) => ratio >= s.minRatio)!;
}

const CELL = 10;

export function GithubGraph({ calendar }: { calendar: ContributionCalendar }) {
  // Kolom = minggu, baris = hari. Hari pertama data belum tentu Minggu, jadi
  // barisnya dihitung dari tanggalnya sendiri agar grid tidak bergeser.
  const columns: { day: (typeof calendar.days)[number]; row: number }[][] = [];
  let current: { day: (typeof calendar.days)[number]; row: number }[] = [];

  for (const day of calendar.days) {
    const row = new Date(`${day.date}T00:00:00Z`).getUTCDay();
    if (row === 0 && current.length > 0) {
      columns.push(current);
      current = [];
    }
    current.push({ day, row });
  }
  if (current.length > 0) columns.push(current);

  const width = columns.length * CELL;
  const height = 7 * CELL;

  return (
    <div className="mt-5">
      {/* Grid-nya lebar; di layar kecil ia menggulir sendiri di dalam kotaknya
          supaya halaman tidak ikut menggulir mendatar. */}
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          width={width}
          height={height}
          role="img"
          aria-label={`${calendar.total.toLocaleString("en-US")} GitHub contributions in the last year`}
          className="h-auto max-w-none min-w-full"
        >
          {columns.map((column, columnIndex) =>
            column.map(({ day, row }) => {
              const { radius, className } = step(day.count, calendar.max);
              return (
                <circle
                  key={day.date}
                  cx={columnIndex * CELL + CELL / 2}
                  cy={row * CELL + CELL / 2}
                  r={radius}
                  className={className}
                />
              );
            }),
          )}
        </svg>
      </div>

      <p className="mono text-n-500 mt-4 text-[11px] tracking-[0.12em] uppercase">
        {calendar.total.toLocaleString("en-US")} contributions in the last year
      </p>
    </div>
  );
}
