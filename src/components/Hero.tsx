"use client";

import dynamic from "next/dynamic";
import { Terminal } from "@/components/Terminal";

const DotFieldBackground = dynamic(() => import("./DotFieldBackground"), { ssr: false });

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center px-6 pb-12 pt-28 sm:px-8 lg:pt-24"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--accent-glow-soft)_0%,transparent_70%)] opacity-[0.12]" />
      </div>

      {/* DotField animated dots */}
      <DotFieldBackground />

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-12">
        {/* Left: Text */}
        <div className="w-full text-center lg:w-auto lg:text-left">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
            Full Stack Developer
          </p>

          <h1 className="text-4xl font-semibold leading-[0.96] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            Gustavo Rodrigues
          </h1>
        </div>

        {/* Right: Terminal */}
        <div className="w-full lg:w-[700px] xl:w-[800px]">
          <Terminal />
        </div>
      </div>
    </section>
  );
}
