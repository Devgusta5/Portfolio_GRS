export interface SubSkill {
  name: string
  value: number
}

export interface CapabilityAxis {
  key: string
  label: string
  title: string
  description: string
  value: number
  subSkills: SubSkill[]
  technologies: string[]
  projects: string[]
  achievements: string[]
  metrics: { label: string; value: string }[]
}

export const MAIN_AXES: CapabilityAxis[] = [
  {
    key: "frontend",
    label: "F/E",
    title: "Frontend Engineering",
    description:
      "Construo interfaces modernas, responsivas e performáticas com React, Next.js e TypeScript. Experiência em dashboards, landing pages e produtos SaaS completos.",
    value: 92,
    subSkills: [
      { name: "HTML & CSS", value: 90 },
      { name: "JavaScript", value: 92 },
      { name: "TypeScript", value: 95 },
      { name: "React", value: 93 },
      { name: "Next.js", value: 90 },
      { name: "Tailwind CSS", value: 88 },
    ],
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vite"],
    projects: ["EtecNotes", "Portfolio GRS", "Dashboards Analytics"],
    achievements: [
      "Criação de design system próprio",
      "Landing pages com performance 95+ Lighthouse",
      "SPA e SSR com Next.js",
    ],
    metrics: [
      { label: "Performance", value: "95/100" },
      { label: "Acessibilidade", value: "92/100" },
    ],
  },
  {
    key: "backend",
    label: "B/E",
    title: "Backend Engineering",
    description:
      "Desenvolvo APIs REST seguras e escaláveis com Node.js, Express e Firebase. Experiência em autenticação, upload de arquivos e regras de negócio complexas.",
    value: 86,
    subSkills: [
      { name: "Node.js", value: 88 },
      { name: "Express", value: 85 },
      { name: "REST APIs", value: 90 },
      { name: "JWT Auth", value: 82 },
      { name: "Firebase Services", value: 85 },
      { name: "Software Architecture", value: 80 },
    ],
    technologies: ["Node.js", "Express", "Firebase", "JWT", "C#", ".NET"],
    projects: ["EtecNotes API", "Sistema de Autenticação", "API de Upload"],
    achievements: [
      "API com autenticação JWT + RBAC",
      "Upload e processamento de arquivos",
      "Integração com serviços Firebase",
    ],
    metrics: [
      { label: "Uptime", value: "99.9%" },
      { label: "Resposta", value: "<200ms" },
    ],
  },
  {
    key: "mobile",
    label: "MOB",
    title: "Mobile Development",
    description:
      "Crio aplicativos mobile com React Native e Flutter, focando em UX nativa, navegação fluida e integração com APIs.",
    value: 82,
    subSkills: [
      { name: "React Native", value: 80 },
      { name: "Flutter", value: 82 },
      { name: "Mobile UX", value: 85 },
      { name: "Responsividade", value: 90 },
      { name: "Navegação", value: 83 },
      { name: "API Integration", value: 85 },
    ],
    technologies: ["React Native", "Flutter", "Expo", "Android Studio"],
    projects: ["EtecNotes Mobile", "Apps Acadêmicos"],
    achievements: [
      "Aplicativo publicado",
      "Consumo de APIs REST em mobile",
      "UI consistente entre plataformas",
    ],
    metrics: [
      { label: "Usuários", value: "1100+" },
      { label: "Plataformas", value: "2" },
    ],
  },
  {
    key: "product",
    label: "PRD",
    title: "Product Building",
    description:
      "Penso e construo produtos digitais completos do início ao fim. Do problema à solução, do protótipo ao deploy — com foco em entrega de valor real.",
    value: 95,
    subSkills: [
      { name: "SaaS Development", value: 92 },
      { name: "User Experience", value: 90 },
      { name: "Problem Solving", value: 95 },
      { name: "Product Thinking", value: 88 },
      { name: "Scalability", value: 82 },
      { name: "Delivery", value: 90 },
    ],
    technologies: ["Next.js", "Firebase", "Vercel", "Node.js", "React"],
    projects: ["EtecNotes", "GRS Portfolio", "Produtos Acadêmicos"],
    achievements: [
      "1100+ usuários impactados",
      "Aplicações em produção",
      "Produtos Web e Mobile publicados",
      "Experiência em Hackathons",
    ],
    metrics: [
      { label: "Usuários Impactados", value: "1100+" },
      { label: "Produtos", value: "4+" },
    ],
  },
  {
    key: "data",
    label: "DAT",
    title: "Data & Persistence",
    description:
      "Trabalho com bancos de dados NoSQL e SQL, modelagem de dados, sincronização em tempo real e persistência escalável.",
    value: 78,
    subSkills: [
      { name: "Firestore", value: 85 },
      { name: "Firebase", value: 88 },
      { name: "Supabase", value: 75 },
      { name: "MySQL", value: 80 },
      { name: "MongoDB", value: 78 },
      { name: "Data Modeling", value: 82 },
    ],
    technologies: ["Firebase", "Supabase", "MySQL", "MongoDB", "Firestore"],
    projects: ["EtecNotes Database", "Sistema de Dados"],
    achievements: [
      "Persistência em tempo real com Firestore",
      "Estruturação de dados NoSQL",
      "Migração de dados",
    ],
    metrics: [
      { label: "Tempo Real", value: "<50ms" },
      { label: "Disponibilidade", value: "99.9%" },
    ],
  },
  {
    key: "infra",
    label: "OPS",
    title: "Infrastructure",
    description:
      "Gerencia deployments, versionamento, CI/CD e ambientes de produção. Experiência com Vercel, Git e Linux.",
    value: 74,
    subSkills: [
      { name: "Git", value: 92 },
      { name: "GitHub", value: 90 },
      { name: "Linux", value: 78 },
      { name: "Vercel", value: 88 },
      { name: "CI/CD", value: 80 },
      { name: "Deployments", value: 85 },
    ],
    technologies: ["Vercel", "Git", "GitHub", "Linux", "Azure"],
    projects: ["EtecNotes Deploy", "CI/CD Pipeline"],
    achievements: [
      "Deploy em produção automatizado",
      "Versionamento semântico",
      "Ambientes de staging e produção",
    ],
    metrics: [
      { label: "Deploys", value: "50+" },
      { label: "Uptime", value: "99.9%" },
    ],
  },
];

export function getAxisByKey(key: string): CapabilityAxis | undefined {
  return MAIN_AXES.find((a) => a.key === key);
}
