"use client";

import { useEffect, useState } from "react";
import DotField from "./DotField";

interface RGB {
  r: number;
  g: number;
  b: number;
}

function parseAccentGlow(): RGB {
  const el = document.documentElement;
  const value = getComputedStyle(el).getPropertyValue("--accent-glow").trim();
  const match = value.match(/rgba$$\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (match) {
    return {
      r: parseInt(match[1]),
      g: parseInt(match[2]),
      b: parseInt(match[3]),
    };
  }
  return { r: 6, g: 182, b: 212 };
}

export default function DotFieldBackground() {
  const [rgb, setRgb] = useState<RGB | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    setRgb(parseAccentGlow());

    const observer = new MutationObserver(() => {
      setRgb(parseAccentGlow());
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  if (!rgb) return null;

  const r = rgb.r;
  const g = rgb.g;
  const b = rgb.b;

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <DotField
        dotRadius={isMobile ? 1 : 1.5}
        dotSpacing={isMobile ? 24 : 14}
        bulgeStrength={67}
        glowRadius={160}
        sparkle={false}
        waveAmplitude={0}
        cursorRadius={isMobile ? 0 : 500}
        cursorForce={0.1}
        bulgeOnly
        gradientFrom={`rgba(${r}, ${g}, ${b}, 0.4)`}
        gradientTo={`rgba(${r}, ${g}, ${b}, 0.15)`}
        glowColor="transparent"
      />
    </div>
  );
}
