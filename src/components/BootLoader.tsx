"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";

const BOOT_LINES = [
  { text: "> GRS.OS v3.2.1", delay: 150 },
  { text: "> Initializing kernel modules...", delay: 380 },
  { text: "> Loading portfolio system...", delay: 610 },
  { text: "> Rendering interfaces...", delay: 840 },
  { text: "> System ready.", delay: 1070 },
];

export function BootLoader({ onFinish }: { onFinish: () => void }) {
  const { t } = useLanguage();
  const [visibleLines, setVisibleLines] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const finishedRef = useRef(false);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    onFinish();
  }, [onFinish]);

  // Botao "pular": faz o fade e finaliza logo em seguida.
  const skip = useCallback(() => {
    setFadeOut(true);
    window.setTimeout(finish, 450);
  }, [finish]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Acessibilidade: quem prefere menos movimento nao ve a animacao.
    if (prefersReduced) {
      const t = setTimeout(finish, 500);
      return () => clearTimeout(t);
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    BOOT_LINES.forEach((line, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleLines(i + 1);

          if (i === BOOT_LINES.length - 1) {
            const t1 = setTimeout(() => {
              setFadeOut(true);
              const t2 = setTimeout(finish, 400);
              timers.push(t2);
            }, 350);
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
  }, [finish]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[var(--bg)] transition-opacity duration-[400ms] ${
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

      {/* Pular animacao — canto inferior direito */}
      <button
        type="button"
        onClick={skip}
        className="group fixed bottom-5 right-5 z-[101] inline-flex items-center gap-2 rounded-full border border-[var(--border-2)] bg-[var(--bg-2)]/60 px-4 py-2 font-mono text-xs text-[var(--text-3)] backdrop-blur-sm transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
      >
        {t.boot.skip}
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">▸▸</span>
      </button>
    </div>
  );
}
