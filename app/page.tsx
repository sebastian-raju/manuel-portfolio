import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Journey from "@/components/Journey";
import Work from "@/components/Work";
import Process from "@/components/Process";
import Principles from "@/components/Principles";
import Curiosity from "@/components/Curiosity";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        {/* Everything after the hero rides up over it. */}
        <div className="relative z-10">
          <About />
          <Skills />
          <Journey />
          <Work />
          <Process />
          <Principles />
          <Curiosity />
          <Contact />
        </div>
      </main>
    </>
  );
}
