import Link from "next/link";
import { Trophy } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Help } from "@/components/sections/help";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { CONFIG, CONTACT, isSet } from "@/content/config";
import { achievements } from "@/content/experience";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Collabs",
  description:
    "Competitions and collaborative work by Lintang Balakosa Ardhana — and how to invite him to build something together.",
  path: "/collabs",
});

/**
 * /collabs (R5) — dua hal sekaligus:
 * 1. Bukti bahwa Lintang memang sudah berkolaborasi (lomba nyata dari CV).
 * 2. Pintu masuk buat orang yang mau mengajak kerja bareng.
 *
 * Semua statis, tanpa DB dan tanpa backend. CTA-nya `mailto:`; tombol WhatsApp
 * hanya dirender bila `WHATSAPP_NUMBER` diisi — keputusan privasi ada di Lintang.
 *
 * Anti double-count (§5.2): medali SurabayaDev tetap menunjuk ke SATU case study
 * Hotel, tidak diceritakan ulang sebagai pekerjaan terpisah.
 */

const collabInvites = [
  {
    title: "Competitions & hackathons",
    body: "I've built for national competitions before and I'd do it again — especially the ones where the problem still needs defining, not just implementing.",
  },
  {
    title: "Helping a small business go digital",
    body: "Taking an operation off paper is the work I know best: intake, payments, reporting, and the messy parts in between.",
  },
  {
    title: "Side projects with real users",
    body: "I'd rather build something a handful of people actually use than another demo that never leaves localhost.",
  },
];

export default function CollabsPage() {
  const whatsapp = CONFIG.WHATSAPP_NUMBER;
  const sortedAchievements = [...achievements].sort((a, b) => a.order - b.order);

  return (
    <main id="main">
      <Section className="pt-12 pb-16 md:pt-16 md:pb-20">
        {/* Heading di atas lipatan → tanpa `Reveal` (aturan R2). */}
        <SectionHeading
          eyebrow="Collabs"
          title="Things I've built with other people."
          description="Competitions, teams, and the kind of work I'd like to do more of."
          as="h1"
        />

        <div className="mt-10 max-w-3xl">
          <h2 className="mono text-ink-muted text-xs tracking-[0.14em] uppercase">
            Where it happened
          </h2>

          <Stagger className="mt-5 space-y-3">
            {sortedAchievements.map((item) => (
              <StaggerItem key={item.title}>
                <Card padding="sm" elevation="flat" className="flex gap-4">
                  {/* Ikon grey konsisten menggantikan emoji medali. */}
                  <Trophy
                    aria-hidden="true"
                    className="text-n-500 mt-0.5 size-5 shrink-0"
                  />
                  <div>
                    <p className="text-ink text-[15px] font-medium">
                      {item.title}
                    </p>
                    <p className="mono text-n-500 mt-1 text-[12px]">
                      {item.scope}
                      {item.year ? ` · ${item.year}` : null}
                    </p>
                    <p className="text-ink-muted mt-2 text-[14px] leading-relaxed">
                      {item.detail}
                    </p>
                    {item.projectSlug ? (
                      <Link
                        href={`/projects/${item.projectSlug}`}
                        className="text-ink hover:text-coral-ink decoration-border hover:decoration-coral-ink mt-2 inline-block text-sm underline underline-offset-4"
                      >
                        See the case study
                      </Link>
                    ) : null}
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      <Section className="pt-4 pb-16 md:pt-6 md:pb-20">
        <Reveal>
          <SectionHeading
            eyebrow="Work with me"
            title="Invite me to build something."
            description="Open to competitions, small-business projects, and things that ship to real users."
          />
        </Reveal>

        <Stagger className="mt-10 grid gap-4 md:grid-cols-3">
          {collabInvites.map((invite) => (
            <StaggerItem key={invite.title} className="h-full">
              <Card className="flex h-full flex-col">
                <h3 className="text-ink text-[15px] font-medium">
                  {invite.title}
                </h3>
                <p className="text-ink-muted mt-3 text-[14px] leading-relaxed">
                  {invite.body}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              href={`mailto:${CONTACT.email}?subject=${encodeURIComponent("Collaboration")}`}
              size="lg"
            >
              Email me about a collab
            </Button>

            {/* Tombol WhatsApp hanya ada bila nomornya memang boleh publik. */}
            {isSet(whatsapp) ? (
              <Button
                href={`https://wa.me/${whatsapp}`}
                variant="secondary"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </Button>
            ) : null}

            {isSet(CONFIG.LINKEDIN_URL) ? (
              <Button
                href={CONFIG.LINKEDIN_URL}
                variant="ghost"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </Button>
            ) : null}
          </div>
        </Reveal>

        <Reveal>
          <p className="text-ink-muted mt-6 max-w-2xl text-sm leading-relaxed">
            <Badge tone="outline">Honest note</Badge>{" "}
            <span className="mt-2 inline-block">
              I&rsquo;m a student and I still have coursework — so I say yes to
              fewer things than I&rsquo;d like. If I can&rsquo;t take something
              on, I&rsquo;ll say so quickly rather than go quiet.
            </span>
          </p>
        </Reveal>
      </Section>

      <Help />
    </main>
  );
}
