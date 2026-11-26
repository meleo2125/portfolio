import { Background, Contact, Footer, Hero, Projects, SiteHeader, Skills, Work, Writing } from "@/components/site/Sections";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Work />
        <Projects />
        <Writing />
        <Skills />
        <Background />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
