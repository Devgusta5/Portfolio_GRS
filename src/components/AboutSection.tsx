"use client";

import { useState } from "react";
import { ABOUT } from "@/data/about";
import { useLanguage } from "@/context/LanguageContext";
import { Reveal } from "./Reveal";
import TiltedCard from "./TiltedCard";
import { BrazilFlag } from "./icons/BrazilFlag";
import { Download, Eye, EyeOff } from "lucide-react";

export function AboutSection() {
  const { t } = useLanguage();
  const [showPreview, setShowPreview] = useState(false);

  return (
    <section
      id="sobre"
      className="relative overflow-hidden px-6 py-20 sm:px-8 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <header className="mb-12 max-w-3xl">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.32em] text-[var(--accent)]">
              {t.about.label}
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {t.about.tagline}
            </h2>
          </header>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[340px_1fr] lg:gap-14">
          <Reveal delay={80}>
            <div className="mx-auto w-[260px] sm:w-[300px] lg:w-full">
              <TiltedCard
                imageSrc="/me.jpg"
                altText="Gustavo Rodrigues - Full Stack Developer"
                captionText=""
                containerHeight="360px"
                containerWidth="100%"
                imageHeight="360px"
                imageWidth="100%"
                scaleOnHover={1.05}
                rotateAmplitude={12}
                showMobileWarning={false}
                showTooltip={true}
                captionContent={
                  <span className="flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-[#2d2d2d] shadow-lg backdrop-blur-sm">
                    <BrazilFlag size={16} />
                    Brasil
                  </span>
                }
              />
            </div>
          </Reveal>

          <div className="flex flex-col gap-6">
            <Reveal delay={120}>
              <div className="space-y-4">
                {t.about.bio.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-sm leading-7 text-[var(--text-2)] sm:text-base sm:leading-8"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {t.about.highlights.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-4 text-center"
                  >
                    <p className="text-lg font-semibold text-[var(--accent)]">
                      {item.value}
                    </p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-[var(--text-3)]">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card-bg)]">
                <div className="relative p-5">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg)]/10 to-[var(--bg)]/60 pointer-events-none" />
                  <div className="relative space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--accent)]">
                        {t.resume.title}
                      </p>
                      <span className="text-[10px] text-[var(--text-3)]">
                        .docx
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-sm text-[var(--text)]">
                        <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                        <span>Gustavo Rodrigues — Full Stack</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[var(--text-2)]">
                        <span className="h-2 w-2 rounded-full bg-[var(--text-3)]" />
                        <span>React, Node.js, TypeScript, Next.js</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[var(--text-2)]">
                        <span className="h-2 w-2 rounded-full bg-[var(--text-3)]" />
                        <span>EtecNotes, 2x Hackathon Winner</span>
                      </div>
                    </div>

                    <div className="relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg)]/50 p-4">
                      <div className="relative z-10 space-y-2 font-mono text-[10px] leading-relaxed text-[var(--text-3)]">
                        <p>Experiencia Profissional</p>
                        <p className="text-[var(--text-2)]">EtecNotes — Co-criador (2025–atual)</p>
                        <p className="pl-3">Plataforma full-stack educacional com React,</p>
                        <p className="pl-3">Node.js e arquitetura em producao.</p>
                        <p className="pt-1 text-[var(--text-2)]">Beyond — Desenvolvedor (2025)</p>
                        <p className="pl-3">4 projetos em squads de 8-12 pessoas.</p>
                        <p className="pt-2 text-[var(--accent)]">Formacao: ADS — UNISANTA (cursando)</p>
                      </div>
                      {!showPreview && (
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg)]/20 to-[var(--bg)]/80 backdrop-blur-[1px]" />
                      )}
                    </div>
                  </div>

                  <div className="relative z-10 mt-4 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowPreview((v) => !v)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[var(--accent)] bg-[var(--accent)] px-4 py-2.5 text-sm font-medium text-[var(--accent-contrast)] shadow-[0_0_20px_var(--accent-glow)] transition-all hover:shadow-[0_0_30px_var(--accent-glow)]"
                    >
                      {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
                      {showPreview ? t.resume.ocultar : t.resume.visualizar}
                    </button>
                    <a
                      href={ABOUT.resumeUrl}
                      download
                      className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[var(--border-2)] px-4 py-2.5 text-sm font-medium text-[var(--text)] transition-all hover:border-[var(--accent)] hover:bg-[var(--card-hover)] hover:text-[var(--accent)]"
                    >
                      <Download size={16} />
                      {t.resume.baixar}
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}


