"use client";

import { useState, useRef, useEffect } from "react";
import { THEMES } from "@/data/themes";
import { useTheme } from "@/context/ThemeContext";
import { ChevronDownIcon, PaintIcon } from "./icons/MiscIcons";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = THEMES.find((t) => t.id === theme) ?? THEMES[0];

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        title="Alterar tema"
        className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card-bg)] px-3 py-1.5 text-xs text-[var(--text-2)] transition-all hover:border-[var(--accent)]/40 hover:bg-[var(--accent-glow-soft)] hover:text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
      >
        <PaintIcon size={13} className="shrink-0 opacity-60" />
        <span
          className="h-2.5 w-2.5 rounded-full ring-1 ring-inset ring-[var(--border)]"
          style={{ backgroundColor: current.swatch, boxShadow: `0 0 8px ${current.swatch}` }}
          suppressHydrationWarning
        />
        <span>{current.label}</span>
        <ChevronDownIcon
          size={12}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-2 w-52 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-2)] py-1.5 shadow-2xl animate-fade-up"
        >
          {THEMES.map((t) => (
            <li key={t.id}>
              <button
                type="button"
                role="option"
                aria-selected={t.id === theme}
                onClick={() => {
                  setTheme(t.id);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-3 px-3.5 py-2 text-left text-sm transition-colors hover:bg-[var(--card-hover)] ${
                  t.id === theme ? "text-[var(--text)]" : "text-[var(--text-2)]"
                }`}
              >
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: t.swatch, boxShadow: `0 0 6px ${t.swatch}` }}
                  suppressHydrationWarning
                />
                {t.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
