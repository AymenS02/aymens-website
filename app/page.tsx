import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import PersonalLife from "@/components/PersonalLife";

export default function Home() {
  return (
    <main >
      <section id="home">
        <Hero />
      </section>

      <section id="work">
        <Work />
      </section>

      <section id="education">
        <Education />
      </section>

      <section id="projects">
        <Projects />
      </section>

      <section id="personal">
        <PersonalLife />
      </section>
    </main>
  );
}