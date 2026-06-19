"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ABILITY_AXES, ABILITY_SUMMARY, PROFILE_CARD } from "@/data/abilities";

const GRID_RINGS = [40, 32, 24, 16, 8];

function polarToPoint(index: number, total: number, radius: number) {
  const angle = -Math.PI / 2 + (Math.PI * 2 * index) / total;
  return {
    x: 50 + Math.cos(angle) * radius,
    y: 50 + Math.sin(angle) * radius,
  };
}

function pointsFor(values: number[]) {
  return values
    .map((value, index) => {
      const point = polarToPoint(index, values.length, (value / 100) * 40);
      return `${point.x},${point.y}`;
    })
    .join(" ");
}

function SkillRadar() {
  const gridPolygons = useMemo(
    () =>
      GRID_RINGS.map((radius) =>
        ABILITY_AXES.map((_, index) => {
          const point = polarToPoint(index, ABILITY_AXES.length, radius);
          return `${point.x},${point.y}`;
        }).join(" ")
      ),
    []
  );
  const abilityPoints = useMemo(
    () => pointsFor(ABILITY_AXES.map((axis) => axis.value)),
    []
  );

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[420px]">
      <svg
        viewBox="0 0 100 100"
        className="h-full w-full overflow-visible"
        aria-label="Radar de habilidades de programacao"
        role="img"
      >
        {gridPolygons.map((points, index) => (
          <polygon
            key={points}
            points={points}
            fill={index % 2 === 0 ? "var(--accent-glow-soft)" : "transparent"}
            stroke="var(--border-2)"
            strokeWidth="0.5"
          />
        ))}
        {ABILITY_AXES.map((_, index) => {
          const edge = polarToPoint(index, ABILITY_AXES.length, 40);
          return (
            <line
              key={index}
              x1="50"
              y1="50"
              x2={edge.x}
              y2={edge.y}
              stroke="var(--border)"
              strokeWidth="0.45"
            />
          );
        })}
        <polygon
          points={abilityPoints}
          fill="var(--accent-glow)"
          stroke="var(--accent)"
          strokeWidth="1.2"
        />
        <polygon
          points={pointsFor(ABILITY_AXES.map(() => 58))}
          fill="transparent"
          stroke="var(--text-3)"
          strokeDasharray="1.5 1.5"
          strokeWidth="0.45"
        />
        <circle cx="50" cy="50" r="2.2" fill="var(--accent)" />
        {ABILITY_AXES.map((axis, index) => {
          const label = polarToPoint(index, ABILITY_AXES.length, 47);
          return (
            <text
              key={axis.key}
              x={label.x}
              y={label.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-[var(--text)] text-[4px] font-bold"
            >
              {axis.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

export function LanyardProfileCard() {
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <div className="relative mx-auto flex min-h-[460px] w-full max-w-[360px] items-start justify-center overflow-hidden px-4 pt-2">
      <div className="absolute left-1/2 top-0 h-24 w-px -translate-x-1/2 bg-[var(--border-2)]" />
      <div className="absolute left-1/2 top-16 h-10 w-24 -translate-x-1/2 rounded-b-3xl border-x border-b border-[var(--border-2)] bg-[var(--bg)]" />

      <div className="relative mt-24 w-[250px] rotate-[-2deg] rounded-[24px] border border-[var(--border-2)] bg-[var(--bg-2)] p-4 shadow-2xl transition-transform duration-300 hover:rotate-0">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--accent)]">
            GRS PASS
          </span>
          <span className="rounded-full border border-[var(--border)] px-2 py-1 text-[10px] text-[var(--text-2)]">
            {PROFILE_CARD.status}
          </span>
        </div>

        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card-bg)]">
          {!photoFailed && (
            <Image
              src={PROFILE_CARD.photoUrl}
              alt="Foto de Gustavo Rodrigues"
              fill
              sizes="250px"
              className="object-cover"
              onError={() => setPhotoFailed(true)}
            />
          )}
          {photoFailed && (
            <div className="grid h-full place-items-center">
              <div className="text-center">
                <p className="text-5xl font-semibold text-[var(--text)]">GR</p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-3)]">
                  public/profile.jpg
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4">
          <p className="text-lg font-semibold text-[var(--text)]">
            {PROFILE_CARD.name}
          </p>
          <p className="text-xs text-[var(--text-2)]">{PROFILE_CARD.role}</p>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {ABILITY_SUMMARY.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-2"
            >
              <p className="font-mono text-[9px] uppercase text-[var(--text-3)]">
                {item.label}
              </p>
              <p className="mt-1 truncate text-xs font-semibold text-[var(--text)]">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SkillsRadarSection() {
  return (
    <section id="skills-radar" className="px-6 py-16 sm:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 max-w-3xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.28em] text-[var(--accent)]">
            Skill radar
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Habilidades organizadas como atributos de jogo.
          </h2>
          <p className="mt-4 text-sm leading-7 text-[var(--text-2)]">
            O grafico mostra onde minhas habilidades de programacao se aplicam:
            web, mobile, backend, dados, seguranca e cloud.
          </p>
        </header>

        <div className="grid gap-6 rounded-3xl border border-[var(--border)] bg-[var(--card-bg)] p-5 sm:p-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SkillRadar />

          <div className="grid gap-3 sm:grid-cols-2">
            {ABILITY_AXES.map((axis) => (
              <article
                key={axis.key}
                className="rounded-2xl border border-[var(--border)] bg-[var(--bg)]/60 p-4"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-[var(--text)]">
                      {axis.title}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-[var(--text-3)]">
                      {axis.application}
                    </p>
                  </div>
                  <span className="font-mono text-lg font-semibold text-[var(--accent)]">
                    {axis.value}
                  </span>
                </div>
                <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-[var(--border)]">
                  <div
                    className="h-full rounded-full bg-[var(--accent)]"
                    style={{ width: `${axis.value}%` }}
                  />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {axis.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-md border border-[var(--border)] px-2 py-0.5 text-[10px] text-[var(--text-3)]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
