"use client";

import { useState, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CapabilityMatrixSection } from "@/components/CapabilityMatrix";
import { BentoSection } from "@/components/BentoSection";
import { EtecNotesShowcase } from "@/components/EtecNotesShowcase";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { Timeline } from "@/components/Timeline";
import { Footer } from "@/components/Footer";
import { BootLoader } from "@/components/BootLoader";

export default function Home() {
  const [bootFinished, setBootFinished] = useState(false);
  const handleBootFinish = useCallback(() => setBootFinished(true), []);

  return (
    <>
      {!bootFinished && <BootLoader onFinish={handleBootFinish} />}
      <Navbar />
      <main className="flex-1">
        <Hero />
        <CapabilityMatrixSection />
        <BentoSection />
        <EtecNotesShowcase />
        <ProjectsGrid />
        <Timeline />
      </main>
      <Footer />
    </>
  );
}
