"use client";

import { useSyncExternalStore } from "react";
import DotField from "./DotField";
import { useTheme } from "@/context/ThemeContext";

const FALLBACK_RGB = { r: 6, g: 182, b: 212 };

const DOT_CONFIG = {
  mobile: { dotRadius: 1, dotSpacing: 24, cursorRadius: 0 },
  desktop: { dotRadius: 1.5, dotSpacing: 14, cursorRadius: 500 },
} as const;

function readAccentGlow() {
  try {
    const raw = getComputedStyle(document.documentElement).getPropertyValue("--accent-glow").trim();
    const m = raw.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
    return m
      ? { r: parseInt(m[1]), g: parseInt(m[2]), b: parseInt(m[3]) }
      : FALLBACK_RGB;
  } catch {
    return FALLBACK_RGB;
  }
}

const BLACK = { r: 0, g: 0, b: 0 };

function dotColorForTheme(theme: string) {
  if (theme === "light") return BLACK;
  return readAccentGlow();
}

function subscribeMediaQuery(query: string) {
  return (callback: () => void) => {
    const mq = window.matchMedia(query);
    mq.addEventListener("change", callback);
    return () => mq.removeEventListener("change", callback);
  };
}

const subscribeReducedMotion = subscribeMediaQuery("(prefers-reduced-motion: reduce)");
const getReducedMotionSnapshot = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const subscribeCoarsePointer = subscribeMediaQuery("(pointer: coarse)");
const getCoarsePointerSnapshot = () => window.matchMedia("(pointer: coarse)").matches;

const getServerSnapshotFalse = () => false;

export default function DotFieldBackground() {
  const { theme } = useTheme();

  // useSyncExternalStore evita mismatch de hidratacao (servidor usa o
  // snapshot falso) e ja re-renderiza sozinho se o usuario mudar a
  // preferencia de reduced-motion em tempo real.
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getServerSnapshotFalse
  );
  const isMobile = useSyncExternalStore(
    subscribeCoarsePointer,
    getCoarsePointerSnapshot,
    getServerSnapshotFalse
  );

  if (prefersReducedMotion) return null;

  const cfg = isMobile ? DOT_CONFIG.mobile : DOT_CONFIG.desktop;
  const { r, g, b } = dotColorForTheme(theme);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <DotField
        dotRadius={cfg.dotRadius}
        dotSpacing={cfg.dotSpacing}
        bulgeStrength={67}
        glowRadius={160}
        sparkle={false}
        waveAmplitude={0}
        cursorRadius={cfg.cursorRadius}
        cursorForce={0.1}
        bulgeOnly
        gradientFrom={`rgba(${r}, ${g}, ${b}, 0.65)`}
        gradientTo={`rgba(${r}, ${g}, ${b}, 0.38)`}
        glowColor="transparent"
      />
    </div>
  );
}
