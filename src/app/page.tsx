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

export default function Home() {
  return (
    <>
      <NavRail />
      <SignalLine />
      <KeyboardHintOverlay />

      <main id="main" className="relative">
        <Hero />
        <About />
        <SkillsPanel />
        <ExperienceLog />
        <ProjectGrid />
        <Credentials />
        <ContactPrompt />
      </main>

      <Footer />
    </>
  );
}
