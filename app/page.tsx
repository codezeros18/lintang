import { About } from "@/components/sections/about";
import { Hero } from "@/components/sections/hero";
import { Skills } from "@/components/sections/skills";

/**
 * Halaman one-page — urutan BLUEPRINT §2:
 * Hero → Featured Projects → About → Skills → Experience → (Log teaser) → Contact.
 *
 * Featured Projects (S4), Experience & Contact (S5), Log teaser (S7) menyusul.
 * Section Projects dipasang tepat setelah Hero saat S4, sesuai aturan "bukti dulu".
 */
export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
    </main>
  );
}
