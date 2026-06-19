import type { Repo, SocialLink } from "@/types";

export const GITHUB_USERNAME = "Devgusta5";

export const REPOS: Repo[] = [
  { name: "EtecNotes", description: "Plataforma educacional full stack", stars: 48 },
  { name: "Scriptum-Library", description: "Biblioteca com visao computacional", stars: 31 },
  { name: "BeautyHub", description: "SaaS para profissionais beauty", stars: 27 },
  { name: "Pintoo", description: "Canvas interativo de desenho", stars: 18 },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub - Devgusta5", url: `https://github.com/${GITHUB_USERNAME}`, kind: "github" },
  { label: "LinkedIn", url: "https://linkedin.com", kind: "linkedin" },
  { label: "Contato", url: "mailto:gustavo@email.com", kind: "email" },
];
