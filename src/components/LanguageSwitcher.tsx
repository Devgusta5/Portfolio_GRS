"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import type { Lang } from "@/types/i18n";
import { motion, AnimatePresence } from "motion/react";
import { FlagIcon } from "./icons/FlagIcon";

const OPTIONS: { lang: Lang; label: string }[] = [
  { lang: "pt", label: "Português" },
  { lang: "en", label: "English" },
  { lang: "es", label: "Español" },
];

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, []);

  const active = OPTIONS.find((o) => o.lang === lang)!;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group flex items-center gap-2 rounded-lg border border-[var(--border-2)] bg-[var(--bg-2)]/50 px-2.5 py-1.5 text-xs font-medium text-[var(--text-2)] backdrop-blur-sm transition-all duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)] hover:shadow-[0_0_12px_var(--accent-glow)]"
        aria-label="Mudar idioma"
      >
        <FlagIcon lang={active.lang} size={18} />
        <span className="font-mono text-[11px] font-semibold tracking-wider">
          {active.lang.toUpperCase()}
        </span>
        <svg
          className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 w-44 overflow-hidden rounded-xl border border-[var(--border-2)] bg-[var(--bg-2)]/95 shadow-2xl backdrop-blur-xl"
          >
            {OPTIONS.map((opt) => {
              const isActive = opt.lang === lang;
              return (
                <button
                  key={opt.lang}
                  type="button"
                  onClick={() => { setLang(opt.lang); setOpen(false); }}
                  className={`flex w-full items-center gap-3 px-3.5 py-2.5 text-left text-xs transition-colors duration-150 ${
                    isActive
                      ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                      : "text-[var(--text-2)] hover:bg-[var(--card-hover)] hover:text-[var(--text)]"
                  }`}
                >
                  <FlagIcon lang={opt.lang} size={18} />
                  <span className="flex-1 font-medium">{opt.label}</span>
                  {isActive && (
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
