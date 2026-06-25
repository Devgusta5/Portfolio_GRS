export type Lang = "pt" | "en" | "es";

export type Translations = {
  nav: {
    inicio: string;
    matriz: string;
    stack: string;
    etecnotes: string;
    projetos: string;
    trajetoria: string;
  };
  hero: {
    subtitle: string;
    status_open: string;
    status_freelance: string;
  };
  about: {
    label: string;
    tagline: string;
    bio: string[];
    highlights: { label: string; value: string }[];
  };
  matrix: {
    label: string;
    hint: string;
    select: string;
    select_hint: string;
  };
  stack: {
    label: string;
    title: string;
    desc: string;
  };
  github: {
    label: string;
    explore: string;
  };
  etecnotes: {
    label: string;
    title: string;
    desc: string;
    users: string;
    repo: string;
    live: string;
  };
  projetos: {
    label: string;
    title: string;
    desc: string;
    extended: string;
    more: string;
    view: string;
    items: {
      name: string;
      description: string;
      angle: string;
      signal: string;
      impact?: string;
      status?: string;
      repoUrl?: string;
    }[];
    quick: {
      name: string;
      description: string;
      url?: string;
    }[];
  };
  timeline: {
    label: string;
    title: string;
    desc: string;
    entries: {
      title: string;
      description: string;
      period: string;
    }[];
  };
  footer: {
    label: string;
    title: string;
    desc: string;
    github: string;
    linkedin: string;
    contato: string;
    built: string;
  };
  resume: {
    title: string;
    visualizar: string;
    ocultar: string;
    baixar: string;
  };
  recent: {
    title: string;
    error: string;
    empty: string;
  };
};
