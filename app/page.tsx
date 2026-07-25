import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { ExperienceAchievements } from "@/components/sections/experience-achievements";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Hero } from "@/components/sections/hero";
import { Skills } from "@/components/sections/skills";

/**
 * Halaman one-page — urutan BLUEPRINT §2:
 * Hero → Featured Projects → About → Skills → Experience → (Log teaser) → Contact.
 *
 * Log teaser (S7) menyusul, disisipkan sebelum Contact.
 */
export default function Home() {
  return (
    <main id="main">
      <Hero />
      <FeaturedProjects />
      <About />
      <Skills />
      <ExperienceAchievements />
      <Contact />
    </main>
  );
}
