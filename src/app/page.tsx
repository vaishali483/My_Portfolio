import About from "@/components/About";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero/Hero";
import Nav from "@/components/Nav";
import Projects from "@/components/Projects";
import Publications from "@/components/Publications";
import Skills from "@/components/Skills";
import Timeline from "@/components/Timeline";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Publications />
        <Timeline />
        <Contact />
      </main>
    </>
  );
}
