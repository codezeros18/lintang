import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { CONFIG, CONTACT, isSet } from "@/content/config";

/**
 * Help — "Open to collaborate & help developers".
 *
 * FRAMING SENGAJA BUKAN "CONSULTING" (R5, catatan jujur di sprint doc):
 * menawarkan jasa konsultan berbayar sebagai mahasiswa/fresh-grad terbaca
 * overclaim dan justru menurunkan kredibilitas yang sudah dibangun case study.
 * Yang ditawarkan di sini adalah hal yang benar-benar bisa dipenuhi Lintang
 * hari ini: waktu, pengalaman spesifik, dan diskusi — gratis.
 *
 * Tombol booking hanya muncul bila `CAL_COM_URL` terisi. Selama kosong,
 * jalurnya email — tidak ada link mati.
 */
export function Help() {
  const calUrl = CONFIG.CAL_COM_URL;

  return (
    <Section id="help">
      <Reveal>
        <SectionHeading
          eyebrow="Help"
          title="Open to collaborate — and happy to help other developers."
          description="Not a paid service. Just someone a few steps into the same road, with time to talk."
        />
      </Reveal>

      <Reveal delay={0.05}>
        <Card className="mt-10 max-w-3xl">
          <p className="leading-relaxed">
            If you&rsquo;re stuck on something I&rsquo;ve actually done —
            offline-first sync, multi-tenant access control, wiring up a payment
            gateway, or turning messy operational data into something a
            decision-maker can read — I&rsquo;m glad to talk it through.
          </p>
          <p className="text-ink-muted mt-4 leading-relaxed">
            I&rsquo;ll also tell you when something is outside what I&rsquo;ve
            done. That&rsquo;s more useful than a confident guess.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {isSet(calUrl) ? (
              <Button
                href={calUrl}
                target="_blank"
                rel="noopener noreferrer"
                size="md"
              >
                Book a chat
              </Button>
            ) : null}
            <Button
              href={`mailto:${CONTACT.email}?subject=${encodeURIComponent("Question / help")}`}
              variant={isSet(calUrl) ? "secondary" : "primary"}
              size="md"
            >
              Email me
            </Button>
          </div>
        </Card>
      </Reveal>
    </Section>
  );
}
