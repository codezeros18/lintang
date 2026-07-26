import Link from "next/link";

import { Section } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { organizationRoles, workItems } from "@/content/experience";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Experience",
  description:
    "Work history of Lintang Balakosa Ardhana — full-stack engineering, tech lead, and data roles, all sourced from his CV.",
  path: "/experience",
});

/**
 * /experience — timeline vertikal bergaris, terbaru di atas.
 *
 * Tiap entri diberi kotak singkatan organisasi (`short` di `content/experience.ts`)
 * dan dihubungkan garis vertikal, supaya urutan waktunya terbaca sekali lihat.
 */
export default function ExperiencePage() {
  const sortedWork = [...workItems].sort((a, b) => a.order - b.order);
  const sortedOrgs = [...organizationRoles].sort((a, b) => a.order - b.order);

  return (
    <main id="main">
      <Section className="pt-12 pb-24 md:pt-16 md:pb-28">
        <PageHeader
          title="experience"
          description="Three years from a vocational internship to shipping production systems — frontend at PT Anugrah Energi in 2023, data work at Bank Sampah Digital, and now building full-stack at Bisasinema and Ankop."
        />

        <ol className="mt-14">
          {sortedWork.map((item, index) => {
            const isLast = index === sortedWork.length - 1;

            return (
              <li key={item.org} className="flex gap-5">
                {/* Kolom penanda: kotak singkatan + garis penghubung ke entri
                    berikutnya. Garisnya tidak digambar di entri terakhir supaya
                    tidak menggantung. */}
                <div className="flex flex-col items-center">
                  <span
                    aria-hidden="true"
                    className="border-border bg-card mono text-ink flex size-11 shrink-0 items-center justify-center rounded-(--radius-sm) border text-[11px] tracking-[0.04em]"
                  >
                    {item.short}
                  </span>
                  {!isLast ? (
                    <span aria-hidden="true" className="bg-border w-px flex-1" />
                  ) : null}
                </div>

                <div className={isLast ? "pb-0" : "pb-10"}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h2 className="text-ink text-[15px] font-medium">
                      {item.role}
                    </h2>
                    {item.period ? (
                      <span className="mono text-n-500 text-[12px]">
                        {item.period}
                      </span>
                    ) : null}
                  </div>

                  <p className="mono text-ink-muted mt-1 text-[14px]">
                    {item.org}
                    {item.location ? ` · ${item.location}` : null}
                  </p>

                  <p className="text-ink-muted mt-3 max-w-2xl text-[14px] leading-relaxed">
                    {item.summary}
                  </p>

                  {item.projectSlug ? (
                    <Link
                      href={`/projects/${item.projectSlug}`}
                      className="mono text-ink hover:text-ink-muted focus-visible:ring-ring mt-3 inline-block rounded-sm text-[13px] outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                    >
                      Read the case study <span aria-hidden="true">→</span>
                    </Link>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>

        {sortedOrgs.length > 0 ? (
          <div className="mt-16">
            <h2 className="mono text-n-500 text-[11px] tracking-[0.16em] uppercase">
              Organizations
            </h2>
            <ul className="mt-5">
              {sortedOrgs.map((item) => (
                <li
                  key={`${item.org}-${item.role}`}
                  className="border-border/70 border-b py-4 last:border-b-0"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <p className="text-[15px] font-medium">{item.role}</p>
                    <span className="mono text-n-500 text-[12px]">
                      {item.period}
                    </span>
                  </div>
                  <p className="mono text-ink-muted mt-1 text-[14px]">
                    {item.org}
                  </p>
                  <p className="text-ink-muted mt-2 text-[14px] leading-relaxed">
                    {item.summary}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Section>
    </main>
  );
}
