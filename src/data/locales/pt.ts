import type { Translations } from "@/types/i18n";

const pt: Translations = {
  nav: {
    inicio: "Inicio",
    matriz: "Matriz",
    stack: "Stack",
    etecnotes: "EtecNotes",
    projetos: "Projetos",
    trajetoria: "Trajetoria",
  },
  hero: {
    subtitle: "Full Stack Developer",
    status_open: "Open to Work",
    status_freelance: "Open to Freelance",
  },
  about: {
    label: "Sobre / Capability Matrix",
    tagline: "Dev FullStack movido a resolver problema real.",
    bio: [
      "Ha 14 meses sou co-criador do EtecNotes, plataforma educacional que hoje atende mais de 1.100 alunos, professores e gestores da Etec de Peruibe — com 40+ funcionalidades no ar.",
      "Co-arquitetei do zero uma plataforma full-stack em producao: React no front, Node.js/Express no back, integracoes de API e uma arquitetura que evolui junto com a demanda real da escola. Destaque: criei um canal de report de bugs direto do app pro painel dev — cortou em ate 60% o tempo de resposta a problemas criticos.",
      "Atuei em 4 projetos grandes em squads de 8 a 12 pessoas, resolvendo bugs de back-end e construindo features de front sob demanda real de cliente. Usei IA de forma estrategica no fluxo de trabalho e acelerei entregas em ~30%.",
    ],
    highlights: [
      { label: "Experiencia", value: "14 meses em produto real" },
      { label: "Impacto", value: "1100+ usuarios" },
      { label: "Projetos", value: "4+ entregues" },
      { label: "Stack", value: "React, Node.js, TypeScript" },
    ],
  },
  matrix: {
    label: "Capability Matrix",
    hint: "Clique em um eixo para explorar",
    select: "Selecione um eixo do radar",
    select_hint: "para ver detalhes da capacidade",
  },
  stack: {
    label: "Stack control room",
    title: "Tech stack organizada por camadas.",
    desc: "Frontend, backend, mobile, dados e deploy — cada ferramenta no seu contexto, sem lista infinita de logos.",
  },
  github: {
    label: "open-source telemetry",
    explore: "Explorar ecossistema",
  },
  etecnotes: {
    label: "Flagship / real product",
    title: "EtecNotes — plataforma ao vivo em producao.",
    desc: "Dashboard, mobile app e metricas reais de operacao.",
    users: "Usuarios Cadastrados",
    repo: "Ver repositorio",
    live: "Acessar app ao vivo",
  },
  projetos: {
    label: "Side quests / product labs",
    title: "Projetos secundarios com cara de experimento serio.",
    desc: "Cada projeto ganha contexto de produto: qual problema toca, qual fluxo principal resolve e quais tecnologias sustentam a experiencia.",
    extended: "extended repository field",
    more: "more builds",
    view: "Ver ao vivo",
  },
  timeline: {
    label: "Trajectory log",
    title: "A linha do tempo tambem precisa parecer conquista.",
    desc: "Educacao tecnica, hackathons e graduacao aparecem como marcos de evolucao, nao como curriculo estatico.",
  },
  footer: {
    label: "Ready to build",
    title: "Se a ideia precisa sair do papel, o portfolio ja mostrou o ritmo.",
    desc: "Gustavo Rodrigues - Full Stack Developer focado em produto, performance e interfaces que ficam na memoria.",
    github: "GitHub",
    linkedin: "LinkedIn",
    contato: "Contato",
    built: "Built with Next.js and Tailwind CSS",
  },
  resume: {
    title: "Curriculo",
    visualizar: "Visualizar",
    ocultar: "Ocultar",
    baixar: "Baixar",
  },
  recent: {
    title: "last commits",
    error: "Erro ao carregar atividade.",
    empty: "Nenhum commit recente.",
  },
};

export default pt;
