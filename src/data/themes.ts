import type { ThemeDefinition } from "@/types";

export const THEMES: ThemeDefinition[] = [
  { id: "dark", label: "Dark", swatch: "#1a1a1a" },
  { id: "light", label: "Light", swatch: "#e2e8f0" },
  { id: "green", label: "Green Tech", swatch: "#10b981" },
  { id: "purple", label: "Purple Cyber", swatch: "#8b5cf6" },
  { id: "cosmic", label: "Cosmic Blue", swatch: "#3b82f6" },
];

export const DEFAULT_THEME: ThemeDefinition["id"] = "dark";
