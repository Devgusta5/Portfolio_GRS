"use client";

import { useState, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CapabilityMatrixSection } from "@/components/CapabilityMatrix";
import { AboutSection } from "@/components/AboutSection";
import { BentoSection } from "@/components/BentoSection";
import { EtecNotesShowcase } from "@/components/EtecNotesShowcase";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { Timeline } from "@/components/Timeline";
import { Footer } from "@/components/Footer";
import { BootLoader } from "@/components/BootLoader";
import { Reveal } from "@/components/Reveal";

export default function Home() {
  const [bootFinished, setBootFinished] = useState(false);
  const handleBootFinish = useCallback(() => setBootFinished(true), []);

  return (
    <>
      {!bootFinished && <BootLoader onFinish={handleBootFinish} />}
      <Navbar />
      <main id="main-content" className="flex-1">
        <Hero />
        <Reveal delay={80}><CapabilityMatrixSection /></Reveal>
        <Reveal delay={100}><AboutSection /></Reveal>
        <Reveal delay={120}><BentoSection /></Reveal>
        <Reveal delay={160}><EtecNotesShowcase /></Reveal>
        <Reveal delay={200}><ProjectsGrid /></Reveal>
        <Reveal delay={240}><Timeline /></Reveal>
      </main>
      <Reveal delay={280}><Footer /></Reveal>
    </>
  );
}
