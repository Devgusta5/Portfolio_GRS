import type { Translations } from "@/types/i18n";

const pt: Translations = {
  nav: {
    inicio: "Início",
    matriz: "Matriz",
    stack: "Stack",
    etecnotes: "EtecNotes",
    projetos: "Projetos",
    trajetoria: "Trajetória",
  },
  hero: {
    subtitle: "Full Stack Developer",
    status_open: "Open to Work",
    status_freelance: "Open to Freelance",
    cta_projects: "Ver EtecNotes",
    cta_resume: "Visualizar currículo",
  },
  about: {
    label: "Sobre / Capability Matrix",
    tagline: "Dev FullStack movido a resolver problema real.",
    bio: [
      "Há 14 meses sou co-criador do EtecNotes, plataforma educacional que hoje atende mais de 1.100 alunos, professores e gestores da Etec de Peruíbe — com 40+ funcionalidades no ar.",
      "Co-arquitetei essa plataforma full-stack em produção do zero: React no front-end, Node.js/Express no back-end, integrações de API e uma arquitetura pensada para evoluir junto com a demanda real da escola. Um destaque foi criar um canal de report de bugs direto do app para o painel de dev, reduzindo em até 60% o tempo de resposta a problemas críticos.",
      "Atuei em 4 projetos grandes em squads de 8 a 12 pessoas, resolvendo bugs de back-end e construindo features de front sob demanda real de cliente. Usei IA de forma estratégica no fluxo de trabalho e acelerei entregas em ~30%.",
    ],
    highlights: [
      { label: "Experiência", value: "14 meses em produto real" },
      { label: "Impacto", value: "1100+ usuários" },
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
    title: "EtecNotes — plataforma ao vivo em produção.",
    desc: "Dashboard, mobile app e métricas reais de operação.",
    users: "Usuários Cadastrados",
    repo: "Ver repositório",
    live: "Acessar Sistema na web",
    loadPreview: "Abrir EtecNotes ao vivo",
  },
  projetos: {
    label: "Side quests / product labs",
    title: "Projetos com visão de produto real.",
    desc: "Cada projeto resolve um problema específico, com fluxo definido e stack adequada — sem descrição enciclopédia.",
    extended: "extended repository field",
    more: "more builds",
    view: "Ver ao vivo",
    items: [
      { name: "DailyFlow", description: "Rotina base que se adapta a dias específicos, com tarefas e compromissos.", impact: "Planeje uma vez, adapte cada dia", angle: "mobile productivity", signal: "rotina -> dia adaptado -> sync", repoUrl: "https://github.com/Devgusta5/DailyFlow" },
      { name: "Scriptum-Library", description: "Busque livros por imagem em tempo real com visão computacional.", impact: "Transforme fotos em catálogo digital", angle: "computer vision", signal: "camera -> search -> catalog", repoUrl: "https://github.com/Scriptum-Hackaton/Scriptum-Library" },
      { name: "BeautyHub", description: "Conecte clientes a profissionais de beleza com agenda inteligente.", impact: "Agende serviços em segundos", angle: "marketplace SaaS", signal: "profile -> schedule -> conversion", repoUrl: "https://github.com/Otavio-Emanoel/BeautyHub" },
      { name: "Pintoo", description: "Ferramentas criativas de desenho no navegador com exportação nativa.", impact: "Desenhe, crie e exporte", angle: "creative tool", signal: "pointer -> canvas -> export", repoUrl: "https://github.com/Devgusta5/Pintoo-" },
    ],
    quick: [
      { name: "CoreFlow-V1", description: "Organizador de treino em React Native.", url: "https://github.com/Devgusta5/CoreFlow-V1" },
      { name: "Enem-Gate-Escape", description: "Jogo educacional gamificado baseado em questões do ENEM.", url: "https://github.com/Devgusta5/Enem-Gate-Escape" },
      { name: "NeuroStore", description: "Loja conceitual com recomendação de produtos orientada a dados.", url: "https://github.com/Devgusta5/NeuroStore" },
      { name: "InstitutoAmar", description: "Site institucional para ONG, com foco em acessibilidade e doações.", url: "https://github.com/Devgusta5/Instituto-Amar" },
      { name: "Projeto-Genesis", description: "Aplicação conceitual de IA generativa com interface experimental.", url: "https://github.com/Devgusta5/Projeto-G-nesis" },
      { name: "Portfolio GRS", description: "Este portfólio — capability matrix, radar de skills e cursor customizado.", url: "https://github.com/Devgusta5/Portfolio_GRS" },
    ],
  },
  timeline: {
    label: "Trajectory log",
    title: "Da formação à produção, em ordem.",
    desc: "Cada período marcado por entrega real — da Etec ao EtecNotes.",
    entries: [
      { title: "Técnico em Desenvolvimento de Sistemas — Etec de Peruíbe", description: "Formação técnica integrada ao ensino médio com foco em desenvolvimento web e mobile; 2x vencedor de hackathons internos. Primeiro contato com tecnologia e desenvolvimento.", period: "02/2023 – 12/2025" },
      { title: "Beyond — Desenvolvedor FullStack", description: "Atuou em 4 projetos de média/grande escala em squads de 8 a 12 pessoas, entregando manutenção, novas funcionalidades de front-end e correções de back-end em produção. Adotou IA estrategicamente no fluxo, acelerando entregas em ~30%.", period: "2025" },
      { title: "EtecNotes — Desenvolvedor FullStack", description: "Co-arquitetou e desenvolveu uma plataforma educacional full-stack em produção, hoje usada por mais de 1.100 alunos, professores e gestores da Etec de Peruíbe. Construiu 40+ funcionalidades em React e Node.js/Express, implementou canal de report de bugs integrado que reduziu em até 60% o tempo de resposta a problemas críticos.", period: "2025 – Atual (14 meses)" },
      { title: "ADS — UNISANTA", description: "Análise e Desenvolvimento de Sistemas na Universidade Santa Cecília, aprofundando desenvolvimento de software, banco de dados e arquitetura de sistemas.", period: "07/2026 – 12/2027 (em andamento)" },
    ],
  },
  footer: {
    label: "Ready to build",
    title: "Se a ideia precisa sair do papel, o portfólio já mostrou o ritmo.",
    desc: "Gustavo Rodrigues - Full Stack Developer focado em produto, performance e interfaces que ficam na memória.",
    github: "GitHub",
    linkedin: "LinkedIn",
    contato: "Contato",
    built: "Built with Next.js and Tailwind CSS",
    visitors: "visitantes",
  },
  resume: {
    title: "Currículo",
    visualizar: "Visualizar",
    ocultar: "Ocultar",
    baixar: "Baixar",
  },
  recent: {
    title: "last commits",
    error: "Erro ao carregar atividade.",
    empty: "Nenhum commit recente.",
  },
  boot: {
    skip: "Pular",
  },
};

export default pt;
