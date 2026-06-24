"use client";

import { useEffect, useState, useRef } from "react";

const BOOT_LINES = [
  { text: "> GRS.OS v3.2.1", delay: 400 },
  { text: "> Initializing kernel modules...", delay: 900 },
  { text: "> Loading portfolio system...", delay: 1400 },
  { text: "> Rendering interfaces...", delay: 1900 },
  { text: "> System ready.", delay: 2400 },
];

const BOOT_SKIP_KEY = "grs-portfolio-boot-skipped";

export function BootLoader({ onFinish }: { onFinish: () => void }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const finishedRef = useRef(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alreadySeen = localStorage.getItem(BOOT_SKIP_KEY) === "true";

    if (prefersReduced || alreadySeen) {
      setFadeOut(true);
      const t = setTimeout(() => { finishedRef.current = true; onFinish(); }, 500);
      return () => clearTimeout(t);
    }

    setVisibleLines(0);
    setShowCursor(true);

    const timers: ReturnType<typeof setTimeout>[] = [];

    BOOT_LINES.forEach((line, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleLines(i + 1);

          if (i === BOOT_LINES.length - 1) {
            const t1 = setTimeout(() => {
              setFadeOut(true);
              const t2 = setTimeout(() => {
                localStorage.setItem(BOOT_SKIP_KEY, "true");
                if (!finishedRef.current) {
                  finishedRef.current = true;
                  onFinish();
                }
              }, 600);
              timers.push(t2);
            }, 600);
            timers.push(t1);
          }
        }, line.delay)
      );
    });

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(cursorInterval);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[var(--bg)] transition-opacity duration-700 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <button
        type="button"
        onClick={() => {
          if (finishedRef.current) return;
          finishedRef.current = true;
          setFadeOut(true);
          setTimeout(onFinish, 500);
        }}
        className="absolute right-4 top-4 z-10 rounded-lg border border-[var(--border)] bg-[var(--bg-2)]/60 px-3 py-1.5 text-xs text-[var(--text-2)] backdrop-blur-sm transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
        aria-label="Pular animacao de boot"
      >
        Skip
      </button>

      <div className="w-full max-w-md px-6">
        <div className="mb-6 h-px bg-[var(--border-2)]" />

        <div className="space-y-2.5 font-mono text-sm">
          {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
            <p
              key={i}
              className="text-[var(--text-2)]"
              style={{
                animation: `fade-up 0.4s ease both`,
              }}
            >
              {line.text}
            </p>
          ))}
          {visibleLines <= BOOT_LINES.length && (
            <span
              className={`inline-block h-4 w-2 bg-[var(--accent)] ${
                showCursor ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
        </div>

        {visibleLines > 0 && (
          <div className="mt-6">
            <div className="h-px overflow-hidden bg-[var(--border)]">
              <div
                className="h-full bg-[var(--accent)] transition-all duration-300"
                style={{
                  width: `${(visibleLines / BOOT_LINES.length) * 100}%`,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
