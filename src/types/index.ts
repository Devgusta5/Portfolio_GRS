export type ThemeId = "dark" | "light" | "green" | "purple" | "cosmic";

export interface ThemeDefinition {
  id: ThemeId;
  label: string;
  /** Preview color shown in the navbar theme switcher */
  swatch: string;
}

export type SkillCategory =
  | "lang"
  | "frontend"
  | "backend"
  | "mobile"
  | "database";

export interface Skill {
  name: string;
  category: SkillCategory;
}

export interface CloudTool {
  name: string;
}

export interface Repo {
  name: string;
  description: string;
  stars: number;
}

export interface Project {
  name: string;
  description: string;
  tags: string[];
  repoUrl: string;
  liveUrl?: string;
  featured?: boolean;
  angle?: string;
  signal?: string;
}

export type TimelineIcon = "education" | "trophy" | "graduation";

export interface TimelineEntry {
  period: string;
  title: string;
  description: string;
  icon: TimelineIcon;
}

export interface SocialLink {
  label: string;
  url: string;
  kind: "github" | "linkedin" | "email";
}
