"use client";

import { ABOUT } from "@/data/about";
import { Reveal } from "./Reveal";
import TiltedCard from "./TiltedCard";
import { Download } from "lucide-react";

export function AboutSection() {
  return (
    <section
      id="sobre"
      className="relative overflow-hidden px-6 py-20 sm:px-8 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <header className="mb-12 max-w-3xl">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.32em] text-[var(--accent)]">
              Sobre mim
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {ABOUT.tagline}
            </h2>
          </header>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[340px_1fr] lg:gap-14">
          <Reveal delay={80}>
            <div className="mx-auto w-[260px] sm:w-[300px] lg:w-full">
              <TiltedCard
                imageSrc="/me.jpg"
                altText="Gustavo Rodrigues - Full Stack Developer"
                captionText="Gustavo Rodrigues"
                containerHeight="360px"
                containerWidth="100%"
                imageHeight="360px"
                imageWidth="100%"
                scaleOnHover={1.05}
                rotateAmplitude={12}
                showMobileWarning={false}
                showTooltip={true}
              />
            </div>
          </Reveal>

          <div className="flex flex-col gap-6">
            <Reveal delay={120}>
              <div className="space-y-4">
                {ABOUT.bio.map((paragraph, i) => (
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
                {ABOUT.highlights.map((item) => (
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
              <a
                href={ABOUT.resumeUrl}
                download
                className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--border-2)] px-5 py-2.5 text-sm font-medium text-[var(--text)] transition-all hover:border-[var(--accent)] hover:bg-[var(--card-hover)] hover:text-[var(--accent)]"
              >
                <Download size={16} />
                Baixar curriculo
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
