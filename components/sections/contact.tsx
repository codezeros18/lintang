import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { CONFIG, CONTACT, isSet } from "@/content/config";

/**
 * Contact — naskah BLUEPRINT §4.5.
 *
 * Aturan link: tidak ada link mati (§9). Fallback-nya tetap dipertahankan —
 * kalau suatu saat `LINKEDIN_URL` atau `CV_FILE` dikosongkan lagi, elemennya
 * menyembunyikan/menonaktifkan diri, bukan menghasilkan 404.
 */
export function Contact() {
  const cvFile = CONFIG.CV_FILE;
  const linkedinUrl = CONFIG.LINKEDIN_URL;

  return (
    <Section id="contact" className="pb-24 md:pb-32">
      <Reveal>
        <SectionHeading
          eyebrow="Contact"
          title="Open to full-stack roles — and projects that need the data side."
          description="Email is the fastest way to reach me."
        />
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Button href={`mailto:${CONTACT.email}`} size="lg">
            {CONTACT.email}
          </Button>

          {cvFile ? (
            <Button
              href={`/cv/${cvFile}`}
              variant="secondary"
              size="lg"
              download
            >
              Download CV
            </Button>
          ) : (
            <Button variant="secondary" size="lg" disabled>
              Download CV — coming soon
            </Button>
          )}

          {isSet(linkedinUrl) ? (
            <Button
              href={linkedinUrl}
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

      <Reveal delay={0.1}>
        <ul className="text-ink-muted mt-8 space-y-2 text-sm">
          <li>
            <span className="text-ink font-medium">Email: </span>
            <a
              href={`mailto:${CONTACT.email}`}
              className="decoration-border hover:text-coral-ink hover:decoration-coral-ink underline underline-offset-4"
            >
              {CONTACT.email}
            </a>
          </li>
          <li>
            <span className="text-ink font-medium">GitHub: </span>
            <a
              href={CONTACT.github}
              target="_blank"
              rel="noopener noreferrer"
              className="decoration-border hover:text-coral-ink hover:decoration-coral-ink underline underline-offset-4"
            >
              github.com/codezeros18
            </a>
          </li>
          {isSet(linkedinUrl) ? (
            <li>
              <span className="text-ink font-medium">LinkedIn: </span>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="decoration-border hover:text-coral-ink hover:decoration-coral-ink underline underline-offset-4"
              >
                LinkedIn profile
              </a>
            </li>
          ) : null}
        </ul>
      </Reveal>
    </Section>
  );
}
