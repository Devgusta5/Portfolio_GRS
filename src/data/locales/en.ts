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
    live: "Access live app",
  },
  projetos: {
    label: "Side quests / product labs",
    title: "Secondary projects with serious experiment vibes.",
    desc: "Each project gets product context: which problem it touches, the main flow it solves, and what technologies power the experience.",
    extended: "extended repository field",
    more: "more builds",
    view: "View live",
  },
  timeline: {
    label: "Trajectory log",
    title: "The timeline must also feel like an achievement.",
    desc: "Technical education, hackathons, and graduation appear as evolution milestones, not a static resume.",
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
