import Navbar from '../../components/Navbar';
import Hero from '../../components/sections/Hero';
import Stats from '../../components/sections/Stats';
import About from '../../components/sections/About';
import Experience from '../../components/sections/Experience';
import Skills from '../../components/sections/Skills';
import Certifications from '../../components/sections/Certifications';
import Projects from '../../components/sections/Projects';
import Blog from '../../components/sections/Blog';
import GitHubActivity from '../../components/sections/GitHubActivity';
import Contact from '../../components/sections/Contact';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <Hero />
        <Stats />
        <About />
        <Experience />
        <Skills />
        <Certifications />
        <Projects />
        <Blog />
        <GitHubActivity />
        <Contact />
      </main>
    </>
  );
}