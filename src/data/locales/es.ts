import type { Translations } from "@/types/i18n";

const es: Translations = {
  nav: {
    inicio: "Inicio",
    matriz: "Matriz",
    stack: "Stack",
    etecnotes: "EtecNotes",
    projetos: "Proyectos",
    trajetoria: "Trayectoria",
  },
  hero: {
    subtitle: "Full Stack Developer",
    status_open: "Open to Work",
    status_freelance: "Open to Freelance",
  },
  about: {
    label: "Sobre mí / Capability Matrix",
    tagline: "Dev FullStack impulsado por problemas reales.",
    bio: [
      "Durante 14 meses he sido co-creador de EtecNotes, una plataforma educativa que atiende a más de 1.100 alumnos, profesores y gestores de la Etec de Peruíbe — con más de 40 funcionalidades en producción.",
      "Co-arquitecté desde cero una plataforma full-stack en producción: React en el front, Node.js/Express en el back, integraciones de API y una arquitectura que evoluciona con la demanda real de la escuela. Destaco: creé un canal de reporte de bugs directo de la app al panel dev — redujo hasta un 60% el tiempo de respuesta a problemas críticos.",
      "Actué en 4 grandes proyectos en equipos de 8 a 12 personas, resolviendo bugs de back-end y construyendo features de front bajo demanda real de cliente. Usé IA de forma estratégica en el flujo de trabajo y aceleré entregas en ~30%.",
    ],
    highlights: [
      { label: "Experiencia", value: "14 meses en producto real" },
      { label: "Impacto", value: "1100+ usuarios" },
      { label: "Proyectos", value: "4+ entregados" },
      { label: "Stack", value: "React, Node.js, TypeScript" },
    ],
  },
  matrix: {
    label: "Capability Matrix",
    hint: "Haz clic en un eje para explorar",
    select: "Selecciona un eje del radar",
    select_hint: "para ver detalles de la capacidad",
  },
  stack: {
    label: "Stack control room",
    title: "Tech stack organizada por capas.",
    desc: "Frontend, backend, mobile, datos y deploy — cada herramienta en su contexto, sin lista infinita de logos.",
  },
  github: {
    label: "telemetría open-source",
    explore: "Explorar ecosistema",
  },
  etecnotes: {
    label: "Flagship / producto real",
    title: "EtecNotes — plataforma en vivo en produccion.",
    desc: "Dashboard, app movil y metricas reales de operacion.",
    users: "Usuarios Registrados",
    repo: "Ver repositorio",
    live: "Acceder app en vivo",
  },
  projetos: {
    label: "Side quests / product labs",
    title: "Proyectos secundarios con aspecto de experimento serio.",
    desc: "Cada proyecto obtiene contexto de producto: qué problema toca, qué flujo resuelve y qué tecnologías sostienen la experiencia.",
    extended: "extended repository field",
    more: "más builds",
    view: "Ver en vivo",
  },
  timeline: {
    label: "Registro de trayectoria",
    title: "La línea de tiempo también debe sentirse como un logro.",
    desc: "Educación técnica, hackathons y graduación aparecen como hitos de evolución, no como currículum estático.",
  },
  footer: {
    label: "Ready to build",
    title: "Si la idea necesita salir del papel, el portafolio ya mostró el ritmo.",
    desc: "Gustavo Rodrigues - Full Stack Developer enfocado en producto, rendimiento e interfaces memorables.",
    github: "GitHub",
    linkedin: "LinkedIn",
    contato: "Contacto",
    built: "Construido con Next.js y Tailwind CSS",
  },
  resume: {
    title: "Currículum",
    visualizar: "Visualizar",
    ocultar: "Ocultar",
    baixar: "Descargar",
  },
  recent: {
    title: "últimos commits",
    error: "Error al cargar actividad.",
    empty: "Sin commits recientes.",
  },
};

export default es;
