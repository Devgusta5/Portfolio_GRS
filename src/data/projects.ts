import type { Project } from "@/types";

export const PROJECTS: Project[] = [
  {
    name: "Scriptum-Library",
    description:
      "Biblioteca virtual com visao computacional para busca de livros em tempo real usando reconhecimento de imagem.",
    tags: ["React", "JavaScript", "MediaPipe"],
    repoUrl: "#",
    featured: true,
    angle: "computer vision",
    signal: "camera -> search -> catalog",
  },
  {
    name: "BeautyHub",
    description:
      "SaaS que conecta clientes a profissionais de beleza com agenda inteligente e perfis verificados.",
    tags: ["Next.js", "TypeScript", "Node.js", "Firebase"],
    repoUrl: "#",
    featured: true,
    angle: "marketplace SaaS",
    signal: "profile -> schedule -> conversion",
  },
  {
    name: "Pintoo",
    description:
      "Aplicacao interativa de desenho em canvas com ferramentas criativas e exportacao nativa.",
    tags: ["Canvas", "Tailwind CSS", "JavaScript"],
    repoUrl: "#",
    featured: true,
    angle: "creative tool",
    signal: "pointer -> canvas -> export",
  },
  {
    name: "CoreFlow-OG",
    description: "Gerenciador de fluxos de trabalho para equipes de desenvolvimento.",
    tags: ["React", "Node.js"],
    repoUrl: "#",
    featured: false,
  },
  {
    name: "Enem-Gate-Escape",
    description: "Jogo educacional gamificado baseado em questoes do ENEM.",
    tags: ["JavaScript", "HTML5", "CSS3"],
    repoUrl: "#",
    featured: false,
  },
  {
    name: "NeuroStore",
    description: "Loja conceitual com recomendacao de produtos orientada a dados.",
    tags: ["React", "TypeScript"],
    repoUrl: "#",
    featured: false,
  },
  {
    name: "InstitutoAmar",
    description: "Site institucional para ONG, com foco em acessibilidade e doacoes.",
    tags: ["Next.js", "Tailwind CSS"],
    repoUrl: "#",
    featured: false,
  },
  {
    name: "Projeto-Genesis",
    description: "Aplicacao conceitual de IA generativa com interface experimental.",
    tags: ["TypeScript", "Next.js"],
    repoUrl: "#",
    featured: false,
  },
];
