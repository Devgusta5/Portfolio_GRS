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
    live: "Acessar Sistema na web",
    loadPreview: "Carregar preview ao vivo",
  },
  projetos: {
    label: "Side quests / product labs",
    title: "Projetos com visao de produto real.",
    desc: "Cada projeto resolve um problema especifico, com fluxo definido e stack adequada — sem descricao enciclopedia.",
    extended: "extended repository field",
    more: "more builds",
    view: "Ver ao vivo",
    items: [
      { name: "Scriptum-Library", description: "Busque livros por imagem em tempo real com visao computacional.", impact: "Transforme fotos em catalogo digital", angle: "computer vision", signal: "camera -> search -> catalog", repoUrl: "https://github.com/Scriptum-Hackaton/Scriptum-Library" },
      { name: "BeautyHub", description: "Conecte clientes a profissionais de beleza com agenda inteligente.", impact: "Agende servicos em segundos", angle: "marketplace SaaS", signal: "profile -> schedule -> conversion", repoUrl: "https://github.com/Otavio-Emanoel/BeautyHub" },
      { name: "Pintoo", description: "Ferramentas criativas de desenho no navegador com exportacao nativa.", impact: "Desenhe, crie e exporte", angle: "creative tool", signal: "pointer -> canvas -> export", repoUrl: "https://github.com/Devgusta5/Pintoo-" },
    ],
    quick: [
      { name: "CoreFlow-OG", description: "Organizador de treino em React Native.", url: "https://github.com/Devgusta5/CoreFlow-OG" },
      { name: "Enem-Gate-Escape", description: "Jogo educacional gamificado baseado em questoes do ENEM.", url: "https://github.com/Devgusta5/Enem-Gate-Escape" },
      { name: "NeuroStore", description: "Loja conceitual com recomendacao de produtos orientada a dados.", url: "https://github.com/Devgusta5/NeuroStore" },
      { name: "InstitutoAmar", description: "Site institucional para ONG, com foco em acessibilidade e doacoes.", url: "https://github.com/Devgusta5/Instituto-Amar" },
      { name: "Projeto-Genesis", description: "Aplicacao conceitual de IA generativa com interface experimental.", url: "https://github.com/Devgusta5/Projeto-G-nesis" },
      { name: "Portfolio GRS", description: "Este portfolio — capability matrix, radar de skills e cursor customizado.", url: "https://github.com/Devgusta5/Portfolio_GRS" },
    ],
  },
  timeline: {
    label: "Trajectory log",
    title: "Da formacao a producao, em ordem.",
    desc: "Cada periodo marcado por entrega real — da Etec ao EtecNotes.",
    entries: [
      { title: "Tecnico em Desenvolvimento de Sistemas — Etec de Peruibe", description: "Formacao tecnica integrada ao ensino medio com foco em desenvolvimento web e mobile; 2x vencedor de hackathons internos. Primeiro contato com tecnologia e desenvolvimento.", period: "02/2023 – 12/2025" },
      { title: "Beyond — Desenvolvedor FullStack", description: "Atuou em 4 projetos de media/grande escala em squads de 8 a 12 pessoas, entregando manutencao, novas funcionalidades de front-end e correcoes de back-end em producao. Adotou IA estrategicamente no fluxo, acelerando entregas em ~30%.", period: "2025" },
      { title: "EtecNotes — Desenvolvedor FullStack", description: "Co-arquitetou e desenvolveu uma plataforma educacional full-stack em producao, hoje usada por mais de 1.100 alunos, professores e gestores da Etec de Peruibe. Construiu 40+ funcionalidades em React e Node.js/Express, implementou canal de report de bugs integrado que reduziu em ate 60% o tempo de resposta a problemas criticos.", period: "2025 – Atual (14 meses)" },
      { title: "ADS — UNISANTA", description: "Analise e Desenvolvimento de Sistemas na Universidade Santa Cecilia, aprofundando desenvolvimento de software, banco de dados e arquitetura de sistemas.", period: "07/2026 – 12/2027 (em andamento)" },
    ],
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
