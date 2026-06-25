export interface FsFile {
  type: "text" | "exe" | "link";
  content?: string;
  sectionId?: string;
  url?: string;
  label?: string;
}

export interface FsDir {
  type: "dir";
  children: Record<string, FsDir | FsFile>;
}

export type FsNode = FsDir | FsFile;

function dir(children: Record<string, FsDir | FsFile>): FsDir {
  return { type: "dir", children };
}

function text(content: string): FsFile {
  return { type: "text", content };
}

function exe(sectionId: string): FsFile {
  return { type: "exe", sectionId };
}

function link(url: string, label: string): FsFile {
  return { type: "link", url, label };
}

const ASCII_ART = `:::::::::::::::::::::::::::::::::::::::::::::...................................
:::::::::::::::::::::::::::::::::::::::::::.....................................
:::::::::::::::::::::::::::::::::::::::::::.....................................
:::::::::::::::::::::::::::::::::::::::.........................................
::::::::::::::::::::::::::::::::::::::::........................................
::::::::::::::::::::::::::::::::::..............................................
:::::::::::::::::::::::::::::::...:.............................................
::::::::::::::::::::::::::::::-*#*#######*-=:...................................
::::::::::::::::::::::::::###%##%%%##%%#%%####*=:...............................
:::::::::::::::::::::::=##%@%%@@@@@%@@@@%%%%%@%##=:.............................
:::::::::::::::::::::-#%%%%@@@@%%%%%%%%%%%%%%%%%%%%*:...........................
::::::::::::::::::::=%@@@@@@%%##*############+*+**###:..........................
::::::::::::::::::::#@@@@@%%%########***+===--:-=+*#*:..........................
:::::::::::::::::::*@@@@%#################*+=========*-.........................
::::::::::::::::::-%@@%#################****#***++==+=-.........................
:::::::::::::::::::%@%################*+==+*###*++*#*+:.............:=::::::::..
::::::::::::::::::-%%%%########%%%%@@@@%%###*****+==++:...:...::::::::-------=::
:::::::::::::::::::*%%%##*****#######%%@@%%%########*=:..:::----------------:-=:
::::::::::::::::::+#%%##***####%%%%###%%%%%%%%%%%%@@@%*:.:+-==+=:-----=====-=+-+
::::::::::::::::-%%%####**######%@%%@@@%%%%##%%@%%%#%%#:::-.+**#=--------:----==
::::::::::::::::-%#%%%############%%%%%%%%####%%%%%%%%-::-=----==+++++*###*==--:
:::::::::::::::::*#%%%######################**#%%%@%%-::::==----------------===+
::::::::::::::::::#%#%#####################*+-*#####*::::=---==-----------------
:::::::::::::::::::#%#######################*++####-.::-#=--==-----------------
:::::::::::::::::::::=#################%%%@%%%@#####:.-:++-=-==-------------=%%%
:::::::::::::::::::::-##########%#####%%%%%%%##*##*=.-:-*=+==+--------------#@@@
:::::::::::::::::::::-#####%%%%%%%%%%%%%%%%%%#####*.::-++====*===-----------%@@@
:::::::::::::::::::::-###%%%%%%%%%%%%%##%%%%%%@%%#::::=*===+++--------------%@@%
:::::::::::::::::::::=#%%%%%%%%%%%%%%%%%%#####%%#-::::=*=+=++=--------------%@@%
:::::::::::::::::::::=#%%%%%%%%%%%%%%%%%%%@@%%%#::::::=====+*#%====#%####*++%@@%
:::::::::::::::::::::##%%%%%%%%%%%%%%%%%%%%%%%+::::::::===+++===------------%@@%
::::::::::::::::::::%%##%%%%%%@@@@@@%%%%%%%%%-::::::::-===+%%#*===+++++===++%@@@
:::::::::::::::::::*%@#%%%%%%%%@@@@@@@@@@@@%%*::::::::=====%@%*====%%%%%%##*%@@@
:::::::::::::::::-#%@@%%%%%%%%%%%%%%%%%%%%%###+:::::--====*%@%+===+%%#%%%#**%@@@
::::::::::::-+#%%%%%@@@@%%%%%%%%%%%%%%%%@@@%%#**+----=====#%%%====+%##%%##**%@@@
:::::::-=*#%%%%%%%%%@@@@@@%%%%%%%%%%%@@@@@@@%%#####+-====+#%%#====*#%#%%#**+%@@@
::-+##%%##%%%%%%%%%%%@@@@@@@%%%%@@@@@@@@@@@%%%#%%%####*==*#%%#====####%%#**+%@@@
%######%%%%%%%%%@%%%@@@@@@@@@@@@@@@@@@@@@@@%@#####%######**%%*====####%##*++%@@@
####%%%%%%%%%%@@@@@@@@@%+==++*#%@@@@@@@@@%%@%%#######%######*===-=####%##*++%@@@
##%%%%%%%%%%%%@@@@@@@@@@+========+%@@@@%#%@***#################*==####%#**++%@@@
%%%%@@@@@@@@@@@@@@@@@@@@@======+*%@@@@@%%####****###########%%%%##*#####*=-=%@@@
@@@@@@@@@@@@@@@@@@@@@@@@@#=====#@@@@@@@%##############***********##*++*#++=+%@@@
@@@@@@@@@@@@@@@@@@@@@@@@@%=+++#@@@@@@@@%%%%%%%%%%%#####%%%%%########****++*#%@@@
@@@@@@@@@@@@@@@@@@@@@@@@%=====#@@@@@@@@@@@@%%%%%%%%%%%@@%%%%#######*#######%@@@%
@@@@@@@@@@@@@@@@@@@@@@@#======#@@@@@@@@@@@@@@%%%%%%%%%%%###%%%%%###%#%%****%@@@%
@@@@@@@@@@@@@@@@@@@@@@#====+==%@@@@@@@@@@@@@@%%%%%%%%%%%%%%%%%%###%%@@%****%@@@%
@@@@@@@@@@@@@@@@@@@@@@========@@@@@@@@@%@@@%%%%%%%%%%%%%@@@%%%##%@@@@%###%%%@@@#
@@@@@@@@@@@@@@@@@@@@@*=======*@@@@@@@@@@@@@@@%%%%%%%%%%@@%%%%##%@@@@%%%##%%%@@@*
@@@@@@@@@@@@@@@@@@@@@========%@@@@@@@@@@@@@@@@%%%%%%%%%%%%%%%%@@@@@%%@%***#%@@@#
@@@@@@@@@@@@@@@@@@@@+=+++===+@@@@@@@@@@@@@@@@@@@%%%%%%%%%%%%%@@@@%%%@@#+++**##%#
@@@@@@@@@@@@@@@@@@@@+++++++=%@@@@@@@@@@@@@@@@@@@@@%%%%%%%@@@@@@@%%@@*-+++++**+*#
@@@@@@@@@@@@@@@@@@@+++++++++@@@@@@@@@@@@@@@@@@@@@@@%%%%%%@@@@@@@@%-=-++******+*#
@@@@@@@@@@@@@@@@@@@++++++++*@@@@@@@@@@@@@@@@@@@@@@@@%%%%%@@@@@@@%+++*****+****##`;

const OS_CONTENT: Record<string, FsDir | FsFile> = {
  "README.txt": text(`╔══════════════════════════════════╗
║   GR.OS v3.2.1 — Portfólio OS   ║
╚══════════════════════════════════╝

Bem-vindo ao sistema de arquivos!
Navegue pelo portfólio como se
fosse um sistema operacional.

  dir     listar arquivos
  cd      navegar entre pastas
  type    ler arquivos de texto
  open    executar programas

Digite 'help' para comandos completos.`),

  skills: dir({
    "frontend.txt": text(`FRONTEND STACK
──────────────

  React         • Biblioteca de UI
  Next.js       • Framework React fullstack
  TypeScript    • JavaScript tipado
  JavaScript    • ES6+
  HTML5 / CSS3  • Web standards
  Tailwind CSS  • Estilização utilitária
  Vite          • Bundler de dev`),

    "backend.txt": text(`BACKEND STACK
─────────────

  Node.js     • Runtime JavaScript
  Express     • Framework HTTP
  .NET        • Framework C#
  REST APIs   • Arquitetura de APIs
  Firebase    • Backend-as-a-Service`),

    "mobile.txt": text(`MOBILE STACK
────────────

  Flutter          • UI toolkit nativo
  Android Studio   • IDE mobile
  Expo / RN        • React Native toolchain`),

    "database.txt": text(`DATABASE
────────

  MySQL      • Relacional
  MongoDB    • Documentos
  Firebase   • Tempo real
  Supabase   • PostgreSQL gerenciado`),

    "cloud.txt": text(`CLOUD & TOOLS
─────────────

  Vercel          • Deploy frontend
  Azure           • Cloud Microsoft
  Git / GitHub    • Versionamento
  Linux (Ubuntu)  • Sistema operacional
  VS Code         • Editor principal`),
  }),

  projects: dir({
    "etecnotes.exe": exe("etecnotes"),
    "scriptum.exe": exe("projetos"),
    "beautyhub.exe": exe("projetos"),
    "pintoo.exe": exe("projetos"),
  }),

  journey: dir({
    "timeline.txt": text(`TRAJETÓRIA
───────────

  2022 - 2023
  Técnico em Desenvolvimento de Sistemas
  ETEC de Peruíbe
  Projeto de conclusão: EtecNotes

  2023 - 2024
  Instrutor de Programação
  Beyond
  Ensino de robótica, lógica e programação

  2024 - Atual
  Graduando em Análise e Desenvolvimento de Sistemas
  UNISANTA - Universidade Santa Cecília
  Arquitetura, Produto & Engenharia de Dados

  2025 - Atual
  Creator - EtecNotes
  Plataforma de notas escolares com IA
  14 meses construindo produto com impacto real`),

    "achievements.txt": text(`CONQUISTAS
──────────

  ✓ 2x Hackathon Winner consecutivos
  ✓ 1.1K+ usuários onboardados
  ✓ 60fps como target de interface
  ✓ 4+ projetos em produção
  ✓ Tech stack moderna e escalável
  ✓ Experiência full cycle (ideia → deploy)`),
  }),

  contact: dir({
    "email.txt": text(`CONTATO
───────

  E-mail: gusta.gu.112007.55@gmail.com
  Instagram: @gustav_grs`),

    "github.link": link("https://github.com/devgusta5", "GitHub"),
    "linkedin.link": link("https://linkedin.com/in/devgusta5", "LinkedIn"),
  }),

  "matrix.exe": exe("capability-matrix"),
  "stack.exe": exe("stack"),
  "journey.exe": exe("trajetoria"),

  "me.txt": text(ASCII_ART),

  "cv.txt": text(`GUSTAVO RODRIGUES
─────────────────

  Full Stack Developer
  Graduando em ADS — UNISANTA

  Stack Principal:
  Next.js · React · TypeScript
  Node.js · Flutter · .NET

  2x Hackathon Winner consecutivos
  Apaixonado por produto, performance
  e arquitetura de software.

  "Transformando linhas de código
   em soluções que geram impacto."`),
};

export const ROOT: FsDir = dir({
  GR: dir({
    OS: dir(OS_CONTENT),
  }),
});

export const INITIAL_PATH = ["C:", "GR", "OS"];
