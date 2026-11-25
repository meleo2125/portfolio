import { NavRail } from "@/components/layout/NavRail";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/sections/About";
import { SkillsPanel } from "@/components/sections/SkillsPanel";
import { ExperienceLog } from "@/components/sections/ExperienceLog";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { Credentials } from "@/components/sections/Credentials";
import { ContactPrompt } from "@/components/sections/ContactPrompt";
import { SignalLine } from "@/components/shared/SignalLine";
import { KeyboardHintOverlay } from "@/components/shared/KeyboardHintOverlay";
import { getProjects, getSiteContent } from "@/lib/data";

export default async function Home() {
  const projects = await getProjects();
  const siteContent = await getSiteContent();

  return (
    <>
      <NavRail />
      <SignalLine />
      <KeyboardHintOverlay />

      <main id="main" className="relative">
        <Hero content={siteContent} />
        <About />
        <SkillsPanel projects={projects} />
        <ExperienceLog content={siteContent} />
        <ProjectGrid projects={projects} />
        <Credentials />
        <ContactPrompt />
      </main>

      <Footer />
    </>
  );
}
