"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MAIN_AXES, type CapabilityAxis } from "@/data/capabilities";
import { ABOUT } from "@/data/about";
import { useLanguage } from "@/context/LanguageContext";
import TiltedCard from "./TiltedCard";
import { FlagIcon } from "./icons/FlagIcon";
import { Download, Eye, EyeOff } from "lucide-react";

const CENTER = 100;
const MAX_R = 82;
const LABEL_R = 92;
const RINGS = [0.2, 0.4, 0.6, 0.8, 1.0];

function polar(index: number, total: number, radius: number) {
  const angle = -Math.PI / 2 + (Math.PI * 2 * index) / total;
  return {
    x: CENTER + Math.cos(angle) * radius,
    y: CENTER + Math.sin(angle) * radius,
  };
}

function buildPoints(values: number[], total: number) {
  return values
    .map((v, i) => {
      const p = polar(i, total, (v / 100) * MAX_R);
      return `${p.x},${p.y}`;
    })
    .join(" ");
}

function RadarChart({
  axes,
  selectedKey,
  onSelect,
  onBack,
}: {
  axes: CapabilityAxis[];
  selectedKey: string | null;
  onSelect: (key: string) => void;
  onBack: () => void;
}) {
  const total = axes.length;

  const dataPoints = useMemo(
    () => buildPoints(axes.map((a) => a.value), total),
    [axes, total]
  );

  return (
    <svg
      viewBox="0 0 200 200"
      className="h-full w-full drop-shadow-[0_0_30px_var(--accent-glow-soft)]"
      aria-label="Developer Capability Matrix"
      role="img"
    >
      <defs>
        <radialGradient id="matrix-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.08" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx={CENTER} cy={CENTER} r={MAX_R + 10} fill="url(#matrix-glow)" />

      {/* Grid rings */}
      {RINGS.map((r) => {
        const pts = Array.from({ length: total }, (_, i) => {
          const p = polar(i, total, r * MAX_R);
          return `${p.x},${p.y}`;
        }).join(" ");
        return (
          <polygon
            key={r}
            points={pts}
            fill="transparent"
            stroke="var(--border-2)"
            strokeWidth="0.5"
            opacity={0.6}
          />
        );
      })}

      {/* Axis spokes */}
      {Array.from({ length: total }, (_, i) => {
        const p = polar(i, total, MAX_R);
        return (
          <line
            key={i}
            x1={CENTER}
            y1={CENTER}
            x2={p.x}
            y2={p.y}
            stroke="var(--border)"
            strokeWidth="0.4"
          />
        );
      })}

      {/* Data polygon fill */}
      <motion.polygon
        points={dataPoints}
        fill="var(--accent-glow)"
        stroke="var(--accent)"
        strokeWidth="1.2"
        initial={false}
        animate={{ points: dataPoints }}
        transition={{ type: "spring", stiffness: 60, damping: 18, mass: 0.8 }}
      />

      {/* Data polygon outline glow */}
      <motion.polygon
        points={dataPoints}
        fill="transparent"
        stroke="var(--accent)"
        strokeWidth="3"
        opacity={0.25}
        initial={false}
        animate={{ points: dataPoints }}
        transition={{ type: "spring", stiffness: 60, damping: 18, mass: 0.8 }}
      />

      {/* Vertex dots + clickable axis areas */}
      {axes.map((axis, i) => {
        const p = polar(i, total, (axis.value / 100) * MAX_R);
        const labelP = polar(i, total, LABEL_R);
        const isSelected = selectedKey === axis.key;
        return (
          <g
            key={axis.key}
            className="cursor-pointer"
            onClick={() => (isSelected ? onBack() : onSelect(axis.key))}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                isSelected ? onBack() : onSelect(axis.key);
              }
            }}
            role="button"
            tabIndex={0}
          >
            {/* Invisible wider click area */}
            <line
              x1={CENTER}
              y1={CENTER}
              x2={labelP.x}
              y2={labelP.y}
              stroke="transparent"
              strokeWidth="12"
              className="cursor-pointer"
            />
            <motion.circle
              cx={p.x}
              cy={p.y}
              r={isSelected ? 4 : 3}
              fill={isSelected ? "var(--accent)" : "var(--text)"}
              stroke={isSelected ? "var(--accent)" : "var(--accent-2)"}
              strokeWidth={isSelected ? 2 : 1}
              initial={false}
              animate={{ cx: p.x, cy: p.y, r: isSelected ? 4 : 3 }}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
            />
            {isSelected && (
              <motion.circle
                cx={p.x}
                cy={p.y}
                r={8}
                fill="none"
                stroke="var(--accent)"
                strokeWidth={1}
                opacity={0.4}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              />
            )}
            <text
              x={labelP.x}
              y={labelP.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={isSelected ? "var(--accent)" : "var(--text-2)"}
              fontSize={isSelected ? "4.5" : "4"}
              fontWeight={isSelected ? "700" : "500"}
              className="transition-colors duration-300"
            >
              {axis.label}
            </text>
          </g>
        );
      })}

      {/* Center dot — click to go back when in detail */}
      <circle
        cx={CENTER}
        cy={CENTER}
        r={3}
        fill="var(--accent)"
        className={selectedKey ? "cursor-pointer" : ""}
        onClick={selectedKey ? onBack : undefined}
        onKeyDown={selectedKey ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onBack(); } } : undefined}
        role={selectedKey ? "button" : undefined}
        tabIndex={selectedKey ? 0 : undefined}
      />
      {selectedKey && (
        <text
          x={CENTER}
          y={CENTER + 10}
          textAnchor="middle"
          fill="var(--text-3)"
          fontSize="3"
          className="pointer-events-none select-none"
        >
          BACK
        </text>
      )}
    </svg>
  );
}

function SidePanelContent({ axis }: { axis: CapabilityAxis }) {
  return (
    <motion.div
      key={axis.key}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex flex-col gap-5"
    >
      {/* Title */}
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--accent)]">
          capability / {axis.key}
        </p>
        <h3 className="mt-1.5 text-xl font-semibold tracking-tight text-[var(--text)] sm:text-2xl">
          {axis.title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-[var(--text-2)]">
          {axis.description}
        </p>
      </div>

      {/* Technologies */}
      <div>
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--text-3)]">
          Stack Principal
        </p>
        <div className="flex flex-wrap gap-1.5">
          {axis.technologies.map((t) => (
            <span
              key={t}
              className="rounded-lg border border-[var(--border)] bg-[var(--card-bg)] px-2.5 py-1 text-xs text-[var(--text-2)]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--text-3)]">
          Principais Conquistas
        </p>
        <ul className="space-y-1.5">
          {axis.achievements.map((a) => (
            <li key={a} className="flex items-start gap-2 text-xs text-[var(--text-2)]">
              <span className="mt-0.5 text-[var(--accent)]">▸</span>
              {a}
            </li>
          ))}
        </ul>
      </div>

      {/* Projects */}
      <div>
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--text-3)]">
          Projetos Relacionados
        </p>
        <div className="flex flex-wrap gap-1.5">
          {axis.projects.map((p) => (
            <span
              key={p}
              className="rounded-full border border-[var(--border-2)] px-2.5 py-1 text-xs text-[var(--text-2)]"
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* Metrics */}
      {axis.metrics.length > 0 && (
        <div>
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--text-3)]">
            Métricas
          </p>
          <div className="flex flex-wrap gap-2">
            {axis.metrics.map((m) => (
              <div
                key={m.label}
                className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] px-3 py-2"
              >
                <span className="font-mono text-xs font-semibold text-[var(--accent)]">
                  {m.value}
                </span>
                <span className="text-[10px] text-[var(--text-3)]">{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

export function CapabilityMatrixSection() {
  const { t } = useLanguage();
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const displayAxes = useMemo(() => {
    if (!selectedKey) return MAIN_AXES;
    const parent = MAIN_AXES.find((a) => a.key === selectedKey);
    if (!parent) return MAIN_AXES;
    return parent.subSkills.map((s) => ({
      key: `${selectedKey}-${s.name.toLowerCase().replace(/\s+/g, "-")}`,
      label: s.name.length > 12 ? s.name.slice(0, 10) + ".." : s.name,
      title: s.name,
      description: "",
      value: s.value,
      subSkills: [],
      technologies: [],
      projects: [],
      achievements: [],
      metrics: [],
    }));
  }, [selectedKey]);

  const selectedAxis = selectedKey
    ? MAIN_AXES.find((a) => a.key === selectedKey) ?? null
    : null;

  const handleSelect = useCallback((key: string) => {
    setSelectedKey(key);
  }, []);

  const handleBack = useCallback(() => {
    setSelectedKey(null);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="capability-matrix"
      className="px-6 py-20 sm:px-8 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        {/* Combined Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8 max-w-3xl"
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.32em] text-[var(--accent)]">
            {t.about.label}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {t.about.tagline}
          </h2>
          <p className="mt-4 text-sm leading-7 text-[var(--text-2)]">
            {t.about.bio[0]}
          </p>
        </motion.div>

        {/* About highlights row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
          className="mb-8 grid grid-cols-2 gap-2 sm:grid-cols-4"
        >
              {t.about.highlights.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-3 text-center"
            >
              <p className="text-base font-semibold text-[var(--accent)]">
                {item.value}
              </p>
              <p className="mt-0.5 text-[10px] uppercase tracking-[0.16em] text-[var(--text-3)]">
                {item.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Layout */}
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          {/* Radar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="relative mx-auto w-full max-w-[480px]"
          >
            <RadarChart
              axes={displayAxes}
              selectedKey={selectedKey}
              onSelect={handleSelect}
              onBack={handleBack}
            />
            {!selectedKey && (
              <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-3)] opacity-60">
                {t.matrix.hint}
              </p>
            )}
          </motion.div>

          {/* Side Panel — shows resume preview by default, drill-down on selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          >
            <div className="relative min-h-[400px] rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6 sm:p-7">
              {!selectedAxis ? (
                <motion.div
                  key="about"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col gap-5"
                >
                  <div className="mx-auto w-[220px] sm:w-[260px]">
                    <TiltedCard
                      imageSrc="/me.jpg"
                      altText="Gustavo Rodrigues - Full Stack Developer"
                      captionText=""
                      containerHeight="260px"
                      containerWidth="100%"
                      imageHeight="260px"
                      imageWidth="100%"
                      scaleOnHover={1.03}
                      rotateAmplitude={8}
                      showMobileWarning={false}
                      showTooltip={true}
                      captionContent={
                          <FlagIcon lang="pt" size={64} />
                        }
                    />
                  </div>

                  <div>
                    <p className="text-center text-sm leading-6 text-[var(--text-2)]">
                      {t.about.bio[2]}
                    </p>
                  </div>

                  <div className="overflow-hidden rounded-xl border border-[var(--border)]">
                    <div className="relative p-5">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
                            {t.resume.title}
                          </p>
                          <span className="text-xs text-[var(--text-3)]">.docx</span>
                        </div>
                        <div className="relative overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg)]/50 p-4">
                          <div className="relative z-10 space-y-1.5 font-mono text-xs leading-relaxed text-[var(--text-3)]">
                            <p className="text-sm text-[var(--text-2)]">EtecNotes — Co-criador (2025–atual)</p>
                            <p className="text-sm text-[var(--text-2)]">Beyond — Desenvolvedor (2025)</p>
                            <p className="text-sm text-[var(--accent)]">ADS — UNISANTA</p>
                          </div>
                          {!showPreview && (
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg)]/20 to-[var(--bg)]/80 backdrop-blur-[1px]" />
                          )}
                        </div>
                      </div>
                      <div className="mt-4 flex gap-3">
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
                          className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[var(--border-2)] px-4 py-2.5 text-sm font-medium text-[var(--text)] transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]"
                        >
                          <Download size={16} />
                          {t.resume.baixar}
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <AnimatePresence mode="wait">
                  <SidePanelContent key={selectedAxis.key} axis={selectedAxis} />
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
