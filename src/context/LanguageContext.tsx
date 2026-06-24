"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Lang, Translations } from "@/types/i18n";
import pt from "@/data/locales/pt";
import en from "@/data/locales/en";
import es from "@/data/locales/es";

const LANG_MAP: Record<Lang, Translations> = { pt, en, es };
const STORAGE_KEY = "grs-portfolio-lang";

interface LanguageContextValue {
  lang: Lang;
  t: Translations;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "pt";
    const saved = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
    return saved ?? "pt";
  });

  function setLang(next: Lang) {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }

  return (
    <LanguageContext.Provider value={{ lang, t: LANG_MAP[lang], setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
