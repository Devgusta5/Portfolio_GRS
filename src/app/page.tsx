"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SkillsRadarSection } from "@/components/AbilityConsole";
import { BentoSection } from "@/components/BentoSection";
import { EtecNotesShowcase } from "@/components/EtecNotesShowcase";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { Timeline } from "@/components/Timeline";
import { Footer } from "@/components/Footer";
import { BootLoader } from "@/components/BootLoader";

export default function Home() {
  const [bootFinished, setBootFinished] = useState(false);

  return (
    <>
      {!bootFinished && <BootLoader onFinish={() => setBootFinished(true)} />}
      <Navbar />
      <main className="flex-1">
        <Hero />
        <SkillsRadarSection />
        <BentoSection />
        <EtecNotesShowcase />
        <ProjectsGrid />
        <Timeline />
      </main>
      <Footer />
    </>
  );
}
