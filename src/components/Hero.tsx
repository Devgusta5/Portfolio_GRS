"use client";

import dynamic from "next/dynamic";

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
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center lg:flex-row">
        <div className="w-full max-w-xl text-center lg:text-left">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
            Full Stack Developer
          </p>

          <h1 className="text-4xl font-semibold leading-[0.96] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            Gustavo Rodrigues
          </h1>
        </div>
      </div>
    </section>
  );
}
