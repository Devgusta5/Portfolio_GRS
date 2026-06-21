"use client";

import { useEffect, useState } from "react";

const ORBS = [
  { size: 600, pos: "top-[-10rem] right-[-10rem]", dur: "20s", del: "0s" },
  { size: 500, pos: "bottom-[-10rem] left-[-10rem]", dur: "26s", del: "-6s" },
  { size: 400, pos: "top-1/3 left-1/4", dur: "22s", del: "-12s" },
];

const BEAMS = [
  { angle: "rotate-[22deg]", dur: "10s", del: "0s" },
  { angle: "-rotate-[12deg]", dur: "14s", del: "-3s" },
];

function GridLayer() {
  const [size, setSize] = useState("64px");

  useEffect(() => {
    setSize(window.matchMedia("(pointer: coarse)").matches ? "48px" : "64px");
  }, []);

  return (
    <div
      className="absolute inset-0 opacity-[0.022]"
      style={{
        backgroundImage:
          "linear-gradient(var(--text) 1px, transparent 1px), linear-gradient(90deg, var(--text) 1px, transparent 1px)",
        backgroundSize: size,
        maskImage:
          "linear-gradient(to bottom, black 0%, black 40%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, black 0%, black 40%, transparent 100%)",
      }}
    />
  );
}

export function HeroBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--accent-glow-soft)_0%,transparent_70%)] opacity-[0.12]" />

      {ORBS.map((orb, i) => (
        <div
          key={i}
          className={`absolute ${orb.pos} rounded-full bg-[var(--accent-glow)] opacity-[0.07] blur-[120px]`}
          style={{
            width: orb.size,
            height: orb.size,
            animation: `float-soft ${orb.dur} ease-in-out infinite`,
            animationDelay: orb.del,
          }}
        />
      ))}

      <div className="absolute inset-0 overflow-hidden">
        {BEAMS.map((beam, i) => (
          <div
            key={i}
            className={`absolute left-1/3 top-0 h-px w-[200%] -translate-x-1/3 ${beam.angle} bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-[0.05]`}
            style={{
              animation: `beam-drift ${beam.dur} ease-in-out infinite`,
              animationDelay: beam.del,
            }}
          />
        ))}
        <div
          className="absolute left-2/3 top-0 h-px w-[200%] -translate-x-2/3 rotate-[40deg] bg-gradient-to-r from-transparent via-[var(--accent-2)] to-transparent opacity-[0.03]"
          style={{
            animation: "beam-drift 18s ease-in-out infinite",
            animationDelay: "-8s",
          }}
        />
      </div>

      <GridLayer />
    </div>
  );
}
