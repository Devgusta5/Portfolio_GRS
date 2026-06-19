"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { DEFAULT_THEME } from "@/data/themes";
import type { ThemeId } from "@/types";

interface ThemeContextValue {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = "grs-portfolio-theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(() => {
    if (typeof window === "undefined") return DEFAULT_THEME;
    const saved = window.localStorage.getItem(STORAGE_KEY) as ThemeId | null;
    return saved ?? DEFAULT_THEME;
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme === "dark" ? "" : theme;
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  function setTheme(next: ThemeId) {
    setThemeState(next);
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return ctx;
}
