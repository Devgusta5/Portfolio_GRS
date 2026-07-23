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
    live: "Acceder al Sistema Web",
    loadPreview: "Abrir EtecNotes en vivo",
  },
  projetos: {
    label: "Side quests / product labs",
    title: "Proyectos con visión de producto real.",
    desc: "Cada proyecto resuelve un problema específico, con flujo definido y stack adecuado — sin descripción enciclopédica.",
    extended: "extended repository field",
    more: "más builds",
    view: "Ver en vivo",
    items: [
      { name: "DailyFlow", description: "Una rutina base que se adapta a días específicos, con tareas y compromisos.", impact: "Planifica una vez, adapta cada día", angle: "mobile productivity", signal: "rutina -> día adaptado -> sync", repoUrl: "https://github.com/Devgusta5/DailyFlow" },
      { name: "Scriptum-Library", description: "Busca libros por imagen en tiempo real con visión computacional.", impact: "Convierte fotos en catálogo digital", angle: "computer vision", signal: "camera -> search -> catalog", repoUrl: "https://github.com/Scriptum-Hackaton/Scriptum-Library" },
      { name: "BeautyHub", description: "Conecta clientes con profesionales de belleza con agenda inteligente.", impact: "Agenda servicios en segundos", angle: "marketplace SaaS", signal: "profile -> schedule -> conversion", repoUrl: "https://github.com/Otavio-Emanoel/BeautyHub" },
      { name: "Pintoo", description: "Herramientas creativas de dibujo en el navegador con exportación nativa.", impact: "Dibuja, crea y exporta", angle: "creative tool", signal: "pointer -> canvas -> export", repoUrl: "https://github.com/Devgusta5/Pintoo-" },
    ],
    quick: [
      { name: "CoreFlow-V1", description: "Organizador de entrenamiento en React Native.", url: "https://github.com/Devgusta5/CoreFlow-V1" },
      { name: "Enem-Gate-Escape", description: "Juego educativo gamificado basado en preguntas del ENEM.", url: "https://github.com/Devgusta5/Enem-Gate-Escape" },
      { name: "NeuroStore", description: "Tienda conceptual con recomendación de productos orientada a datos.", url: "https://github.com/Devgusta5/NeuroStore" },
      { name: "InstitutoAmar", description: "Sitio web institucional para ONG, con enfoque en accesibilidad y donaciones.", url: "https://github.com/Devgusta5/Instituto-Amar" },
      { name: "Projeto-Genesis", description: "Aplicación conceptual de IA generativa con interfaz experimental.", url: "https://github.com/Devgusta5/Projeto-G-nesis" },
      { name: "Portfolio GRS", description: "Este portafolio — capability matrix, radar de skills y cursor personalizado.", url: "https://github.com/Devgusta5/Portfolio_GRS" },
    ],
  },
  timeline: {
    label: "Registro de trayectoria",
    title: "De la formación a la producción, en orden.",
    desc: "Cada período marcado por entrega real — desde la Etec hasta EtecNotes.",
    entries: [
      { title: "Técnico en Desarrollo de Sistemas — Etec de Peruíbe", description: "Formación técnica integrada a la enseñanza media con enfoque en desarrollo web y mobile; 2x ganador de hackathons internos. Primer contacto con tecnología y desarrollo.", period: "02/2023 – 12/2025" },
      { title: "Beyond — Desarrollador FullStack", description: "Actuó en 4 proyectos de mediana/gran escala en equipos de 8 a 12 personas, entregando mantenimiento, nuevas funcionalidades de front-end y correcciones de back-end en producción. Adoptó IA estratégicamente en el flujo, acelerando entregas en ~30%.", period: "2025" },
      { title: "EtecNotes — Desarrollador FullStack", description: "Co-arquitectó y desarrolló una plataforma educativa full-stack en producción, hoy usada por más de 1.100 alumnos, profesores y gestores de la Etec de Peruíbe. Construyó 40+ funcionalidades en React y Node.js/Express, implementó un canal de reporte de bugs integrado que redujo hasta un 60% el tiempo de respuesta a problemas críticos.", period: "2025 – Actual (14 meses)" },
      { title: "ADS — UNISANTA", description: "Análisis y Desarrollo de Sistemas en la Universidad Santa Cecilia, profundizando desarrollo de software, bases de datos y arquitectura de sistemas.", period: "07/2026 – 12/2027 (en curso)" },
    ],
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
  boot: {
    skip: "Saltar",
  },
};

export default es;
