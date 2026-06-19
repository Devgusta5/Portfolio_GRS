"use client";

import { useEffect, useState } from "react";

const BOOT_LINES = [
  { text: "> GRS.OS v3.2.1", delay: 400 },
  { text: "> Initializing kernel modules...", delay: 900 },
  { text: "> Loading portfolio system...", delay: 1400 },
  { text: "> Rendering interfaces...", delay: 1900 },
  { text: "> System ready.", delay: 2400 },
];

export function BootLoader({ onFinish }: { onFinish: () => void }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    BOOT_LINES.forEach((line, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleLines(i + 1);

          if (i === BOOT_LINES.length - 1) {
            setTimeout(() => {
              setFadeOut(true);
              setTimeout(onFinish, 600);
            }, 600);
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
