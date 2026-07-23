"use client";

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

export default function DotFieldBackground() {
  const { theme } = useTheme();

  // Componente e montado apenas no cliente (dynamic import com ssr:false),
  // entao podemos derivar direto de window/DOM sem efeitos nem estado.
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;
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
