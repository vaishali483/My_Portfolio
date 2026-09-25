import About from "@/components/About";
import Contact from "@/components/Contact";
import Intro from "@/components/Hero/Intro";
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
        <Intro />
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
