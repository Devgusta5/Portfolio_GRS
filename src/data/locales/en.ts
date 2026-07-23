import type { Translations } from "@/types/i18n";

const en: Translations = {
  nav: {
    inicio: "Home",
    matriz: "Matrix",
    stack: "Stack",
    etecnotes: "EtecNotes",
    projetos: "Projects",
    trajetoria: "Timeline",
  },
  hero: {
    subtitle: "Full Stack Developer",
    status_open: "Open to Work",
    status_freelance: "Open to Freelance",
  },
  about: {
    label: "About / Capability Matrix",
    tagline: "FullStack Dev driven by real problems.",
    bio: [
      "For 14 months I've been co-creating EtecNotes, an educational platform serving 1,100+ students, teachers, and staff at Etec de Peruibe — with 40+ features in production.",
      "Co-architected a full-stack platform from scratch: React frontend, Node.js/Express backend, API integrations, and an architecture that evolves with real school demand. Highlight: built a bug-report channel straight from the app to the dev panel — cutting critical issue response time by up to 60%.",
      "Worked on 4 large projects in squads of 8-12 people, fixing backend bugs and building frontend features under real client demand. Used AI strategically in the workflow, speeding up deliveries by ~30%.",
    ],
    highlights: [
      { label: "Experience", value: "14 months in real product" },
      { label: "Impact", value: "1100+ users" },
      { label: "Projects", value: "4+ delivered" },
      { label: "Stack", value: "React, Node.js, TypeScript" },
    ],
  },
  matrix: {
    label: "Capability Matrix",
    hint: "Click an axis to explore",
    select: "Select a radar axis",
    select_hint: "to view capability details",
  },
  stack: {
    label: "Stack control room",
    title: "Tech stack organized by layers.",
    desc: "Frontend, backend, mobile, data and deploy — each tool in its context, no infinite logo list.",
  },
  github: {
    label: "open-source telemetry",
    explore: "Explore ecosystem",
  },
  etecnotes: {
    label: "Flagship / real product",
    title: "EtecNotes — live platform in production.",
    desc: "Dashboard, mobile app, and real operation metrics.",
    users: "Registered Users",
    repo: "View repository",
    live: "Access System on Web",
    loadPreview: "Load live preview",
  },
  projetos: {
    label: "Side quests / product labs",
    title: "Projects built with a product mindset.",
    desc: "Each project solves a specific problem with a clear flow and proper stack — no encyclopedia descriptions.",
    extended: "extended repository field",
    more: "more builds",
    view: "View live",
    items: [
      { name: "DailyFlow", description: "A base routine that adapts to specific days, with tasks and events.", impact: "Plan once, adapt every day", angle: "mobile productivity", signal: "routine -> adapted day -> sync", repoUrl: "https://github.com/Devgusta5/DailyFlow" },
      { name: "Scriptum-Library", description: "Search books by image in real time using computer vision.", impact: "Turn photos into a digital catalog", angle: "computer vision", signal: "camera -> search -> catalog", repoUrl: "https://github.com/Scriptum-Hackaton/Scriptum-Library" },
      { name: "BeautyHub", description: "Connect clients to beauty professionals with smart scheduling.", impact: "Book services in seconds", angle: "marketplace SaaS", signal: "profile -> schedule -> conversion", repoUrl: "https://github.com/Otavio-Emanoel/BeautyHub" },
      { name: "Pintoo", description: "Creative drawing tools in the browser with native export.", impact: "Draw, create, and export", angle: "creative tool", signal: "pointer -> canvas -> export", repoUrl: "https://github.com/Devgusta5/Pintoo-" },
    ],
    quick: [
      { name: "CoreFlow-V1", description: "Workout organizer built with React Native.", url: "https://github.com/Devgusta5/CoreFlow-V1" },
      { name: "Enem-Gate-Escape", description: "Gamified educational quiz game based on ENEM questions.", url: "https://github.com/Devgusta5/Enem-Gate-Escape" },
      { name: "NeuroStore", description: "Concept store with data-driven product recommendations.", url: "https://github.com/Devgusta5/NeuroStore" },
      { name: "InstitutoAmar", description: "NGO institutional website focused on accessibility and donations.", url: "https://github.com/Devgusta5/Instituto-Amar" },
      { name: "Projeto-Genesis", description: "Conceptual generative AI application with experimental interface.", url: "https://github.com/Devgusta5/Projeto-G-nesis" },
      { name: "Portfolio GRS", description: "This portfolio — capability matrix, skill radar, and custom cursor.", url: "https://github.com/Devgusta5/Portfolio_GRS" },
    ],
  },
  timeline: {
    label: "Trajectory log",
    title: "From education to production, in order.",
    desc: "Each period marked by real delivery — from Etec to EtecNotes.",
    entries: [
      { title: "Systems Development Technician — Etec de Peruibe", description: "Technical training integrated with high school focused on web and mobile development; 2x internal hackathon winner. First contact with technology and development.", period: "02/2023 – 12/2025" },
      { title: "Beyond — FullStack Developer", description: "Worked on 4 medium/large-scale projects in squads of 8-12 people, delivering maintenance, new frontend features, and backend fixes in production. Strategically adopted AI in the workflow, accelerating deliveries by ~30%.", period: "2025" },
      { title: "EtecNotes — FullStack Developer", description: "Co-architected and developed a full-stack educational platform in production, now used by over 1,100 students, teachers, and staff at Etec de Peruibe. Built 40+ features in React and Node.js/Express, implemented an integrated bug report channel that cut critical issue response time by up to 60%.", period: "2025 – Present (14 months)" },
      { title: "ADS — UNISANTA", description: "Systems Analysis and Development at Universidade Santa Cecilia, deepening software development, database, and systems architecture.", period: "07/2026 – 12/2027 (ongoing)" },
    ],
  },
  footer: {
    label: "Ready to build",
    title: "If the idea needs to leave the paper, the portfolio has already shown the pace.",
    desc: "Gustavo Rodrigues - Full Stack Developer focused on product, performance, and memorable interfaces.",
    github: "GitHub",
    linkedin: "LinkedIn",
    contato: "Contact",
    built: "Built with Next.js and Tailwind CSS",
  },
  resume: {
    title: "Resume",
    visualizar: "Preview",
    ocultar: "Hide",
    baixar: "Download",
  },
  recent: {
    title: "last commits",
    error: "Failed to load activity.",
    empty: "No recent commits.",
  },
};

export default en;
