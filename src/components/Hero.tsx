"use client";

import { Terminal } from "@/components/Terminal";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { VisitorCounter } from "./VisitorCounter";
import { useLanguage } from "@/context/LanguageContext";
import DotFieldBackground from "./DotFieldBackground";

export function Hero() {
  const { t } = useLanguage();

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

      {/* Top bar: badges + language */}
      <div className="absolute left-0 right-0 top-6 z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-6 sm:px-8">
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="hidden items-center gap-2.5 rounded-full border border-[var(--border-2)] bg-[var(--bg-2)]/60 px-4 py-1.5 text-sm font-semibold text-[var(--text-2)] backdrop-blur-md sm:inline-flex">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            {t.hero.status_open}
          </span>
          <div className="hidden rounded-full border border-[var(--border-2)] bg-[var(--bg-2)]/60 px-4 py-1.5 backdrop-blur-md sm:block">
            <VisitorCounter />
          </div>
        </div>
        <LanguageSwitcher />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-12">
        {/* Left: Text */}
        <div className="w-full text-center lg:w-auto lg:text-left">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
            {t.hero.subtitle}
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
