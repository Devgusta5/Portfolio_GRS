import type { Skill, CloudTool } from "@/types";
export const SKILLS: Skill[] = [
  { name: "TypeScript", category: "lang" },
  { name: "JavaScript", category: "lang" },
  { name: "C#", category: "lang" },
  { name: "HTML5", category: "lang" },
  { name: "CSS3", category: "lang" },

  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "Vite", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },

  { name: "Node.js", category: "backend" },
  { name: "Express", category: "backend" },
  { name: ".NET", category: "backend" },

  { name: "Flutter", category: "mobile" },
  { name: "Android Studio", category: "mobile" },
  { name: "Expo / React Native", category: "mobile" },

  { name: "MySQL", category: "database" },
  { name: "MongoDB", category: "database" },
  { name: "Firebase", category: "database" },
  { name: "Supabase", category: "database" },
];

export const CLOUD_TOOLS: CloudTool[] = [
  { name: "Vercel" },
  { name: "Azure" },
  { name: "Git" },
  { name: "GitHub" },
  { name: "VS Code" },
  { name: "Linux (Ubuntu)" },
  { name: "Windows" },
];
