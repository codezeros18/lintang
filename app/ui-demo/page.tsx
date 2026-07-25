import { notFound } from "next/navigation";

import { CountUp } from "@/components/motion/count-up";
import { Reveal } from "@/components/motion/reveal";
import { HoverLift, Stagger, StaggerItem } from "@/components/motion/stagger";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "UI demo",
  path: "/ui-demo",
  noIndex: true,
});

/**
 * Halaman kerja internal untuk melihat komponen design system (S2).
 * Sengaja 404 di produksi supaya tidak bocor ke situs publik.
 * Angka & teks di sini adalah contoh netral — bukan klaim tentang Lintang.
 */
export default function UiDemoPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <Section>
      <SectionHeading
        eyebrow="Internal"
        title="Design system — S2"
        description="Halaman verifikasi komponen. Aktifkan prefers-reduced-motion di OS/devtools: semua animasi harus langsung tampil di final state."
        as="h1"
        action={
          <Button href="/" variant="secondary" size="sm">
            Kembali
          </Button>
        }
      />

      <div className="mt-14 space-y-14">
        <Reveal>
          <h2 className="text-(length:--step-1) font-semibold">Button</h2>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link (aksen coral)</Button>
            <Button size="lg">Large</Button>
            <Button size="sm">Small</Button>
            <Button disabled>Disabled</Button>
            <Button href="https://example.com">Anchor eksternal</Button>
          </div>
        </Reveal>

        <Reveal>
          <h2 className="text-(length:--step-1) font-semibold">Badge</h2>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <Badge>neutral</Badge>
            <Badge tone="accent">accent</Badge>
            <Badge tone="coral">coral</Badge>
            <Badge tone="outline">outline</Badge>
            <Badge mono>TypeScript</Badge>
            <Badge tone="accent" mono>
              PostgreSQL
            </Badge>
          </div>
        </Reveal>

        <div>
          <h2 className="text-(length:--step-1) font-semibold">
            Card + Stagger + HoverLift
          </h2>
          <Stagger className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {["Satu", "Dua", "Tiga"].map((label) => (
              <StaggerItem key={label}>
                <HoverLift>
                  <Card className="h-full">
                    <CardTitle>Kartu {label}</CardTitle>
                    <CardDescription className="mt-2">
                      Permukaan kartu memakai token --card, --border, --radius,
                      dan --shadow-soft.
                    </CardDescription>
                  </Card>
                </HoverLift>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal>
          <h2 className="text-(length:--step-1) font-semibold">CountUp</h2>
          <p className="text-ink-muted mt-2 text-sm">
            Contoh angka netral (bukan data Lintang). Tanpa JS atau saat
            reduced-motion, nilai akhir langsung tampil.
          </p>
          <div className="mt-5 flex flex-wrap gap-8">
            <CountUp to={1234} className="text-(length:--step-3)" />
            <CountUp
              to={80}
              suffix="%"
              className="text-indigo-brand text-(length:--step-3)"
            />
          </div>
        </Reveal>

        <Reveal>
          <h2 className="text-(length:--step-1) font-semibold">Type-scale</h2>
          <div className="mt-5 space-y-3">
            {(["--step-4", "--step-3", "--step-2", "--step-1", "--step-0", "--step--1"] as const).map(
              (step) => (
                <p key={step} style={{ fontSize: `var(${step})` }}>
                  <span className="mono text-ink-muted text-xs">{step}</span>{" "}
                  Bangun yang dipakai orang.
                </p>
              ),
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
