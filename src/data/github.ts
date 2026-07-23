import type { Repo, SocialLink } from "@/types";

export const GITHUB_USERNAME = "Devgusta5";

/**
 * Fallback estatico exibido enquanto a rota /api/github/repos carrega
 * (ou se ela falhar). Os numeros de estrela devem refletir a realidade —
 * a fonte de verdade e sempre a API do GitHub.
 */
export const REPOS: Repo[] = [
  { name: "DailyFlow", description: "Produtividade — Flutter, Go e PostgreSQL", stars: 0 },
  { name: "CoreFlow-V1", description: "Organizador de treino em React Native", stars: 0 },
  { name: "Pintoo-", description: "Canvas interativo de desenho", stars: 1 },
  { name: "media-pipe-hands", description: "Controle de pagina por gestos (MediaPipe)", stars: 2 },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub - Devgusta5", url: `https://github.com/${GITHUB_USERNAME}`, kind: "github" },
  { label: "LinkedIn", url: "https://linkedin.com/in/devgusta5", kind: "linkedin" },
  { label: "Contato", url: "mailto:gusta.gu.112007.55@gmail.com", kind: "email" },
];
