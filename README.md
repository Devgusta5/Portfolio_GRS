<div align="center">

# Gustavo Rodrigues — Portfólio

### Full Stack Developer

Co-criador do **[EtecNotes](https://etecnotes.com.br)** — plataforma educacional em produção com **1.100+ usuários** reais.

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149ECA?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Motion](https://img.shields.io/badge/Motion-animations-FF0080?style=flat-square)](https://motion.dev/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://gustavorodrigues.vercel.app)

**[🔗 Ver ao vivo](https://gustavorodrigues.vercel.app)** · [GitHub](https://github.com/Devgusta5) · [LinkedIn](https://linkedin.com/in/devgusta5)

</div>

---

## 👋 Sobre este projeto

Este não é um template de portfólio genérico — é um produto construído do zero pra funcionar como **prova de trabalho**, não só como um currículo em formato de site. Cada seção existe pra responder a uma pergunta que um recrutador ou tech lead faria em 60 segundos: *"o que ele sabe fazer, e onde isso já rodou de verdade?"*

Alguns destaques de engenharia, não só de design:
- Um **terminal funcional** com sistema de arquivos virtual (`cd`, `ls`, `type`, `theme`, `whoami`...) — não é decoração, é navegável.
- Um **radar de capacidades (SVG)** com drill-down por eixo (Frontend, Backend, Mobile, Produto, Dados, Infra), cada um com sub-skills, tecnologias e conquistas reais.
- Um card de **Tech Stack "prova de uso"**: cada tecnologia que já rodou em produção (EtecNotes, DailyFlow, etc.) ganha um selo com tooltip animado mostrando em qual projeto — nada de lista de logos sem contexto.
- **Contador de visitantes únicos** via Redis (Upstash), sem cookies de terceiros.
- Todo o motion design (cursor customizado, dot-field reativo ao mouse, scroll-linked reveals) **respeita `prefers-reduced-motion`** e dispositivos touch.

## ✨ Features

| | |
|---|---|
| 🖥️ **Terminal GR.OS** | Emulador de terminal com filesystem virtual, histórico de comandos e temas trocáveis via `theme <nome>` |
| 📡 **Capability Matrix** | Radar SVG interativo com drill-down: sub-skills, tecnologias, projetos e métricas por eixo |
| 🧩 **Tech Stack com prova real** | Pills de tecnologia com tooltip animado "usado em: EtecNotes, DailyFlow..." gerado a partir dos dados reais dos projetos |
| 🚀 **EtecNotes Showcase** | Preview ao vivo (iframe) do produto flagship em produção, com métricas reais de operação |
| 📊 **GitHub Activity** | Feed de commits recentes consumido direto da API pública do GitHub |
| 🎨 **5 temas** | Dark, Light, Green Tech, Purple Cyber, Cosmic Blue — trocados via CSS vars, sem flash no load |
| 🌍 **i18n completo** | Português, Inglês e Espanhol, com troca instantânea via `LanguageContext` |
| 👁️ **Contador de visitantes** | Únicos por dispositivo, via Redis (Upstash), com fallback silencioso se não configurado |
| ♿ **Acessível por padrão** | `prefers-reduced-motion` respeitado em cursor, dot-field e scroll reveals; cursor nativo nunca é removido |
| ⚡ **Boot loader** | Sequência de boot estilo terminal no primeiro paint, puramente estético e rápido (~2s) |

## 🛠️ Stack técnica

| Camada | Tecnologias |
|---|---|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **UI** | React 19, TypeScript 5, Tailwind CSS v4 |
| **Animação** | Motion (Framer Motion) |
| **Dados / Cache** | Upstash Redis (contador de visitantes) |
| **Deploy** | Vercel |
| **Outros** | lucide-react, country-flag-icons |

## 📁 Estrutura do projeto

```
src/
  app/
    layout.tsx              # Layout raiz, metadata/SEO, providers
    page.tsx                # Composição das seções da home
    globals.css              # Variáveis de tema e estilos globais
    opengraph-image.tsx       # OG image gerada dinamicamente
    sitemap.ts / robots.ts     # SEO
    api/
      github/                  # Proxy para a API pública do GitHub (atividade recente)
      visitors/                # Contador de visitantes únicos (Redis)
  components/
    Navbar.tsx, Hero.tsx, Footer.tsx        # Layout principal
    BootLoader.tsx                            # Sequência de boot estilo terminal
    Terminal.tsx                                # Emulador de terminal com filesystem virtual
    CapabilityMatrix.tsx                          # Radar SVG com drill-down
    BentoSection.tsx, SkillsCard.tsx, GithubCard.tsx  # Bento grid de stack/atividade
    EtecNotesShowcase.tsx                              # Showcase do projeto flagship
    ProjectsGrid.tsx, ProjectCard.tsx                    # Grid de outros projetos
    Timeline.tsx                                           # Trajetória acadêmica/profissional
    CustomCursor.tsx, DotField.tsx, DotFieldBackground.tsx   # Motion design do cursor/fundo
    MagneticButton.tsx, SpotlightCard.tsx, ShinyText.tsx, TiltedCard.tsx  # Micro-interações
    VisitorCounter.tsx, LanguageSwitcher.tsx, Reveal.tsx        # Utilitários de UI
  data/
    about.ts, capabilities.ts, skills.ts       # Conteúdo do perfil e do radar
    etecnotes.ts, projects.ts                    # Conteúdo dos projetos
    timeline.ts, github.ts, themes.ts              # Trajetória, links sociais, temas
    filesystem.ts                                    # Filesystem virtual do terminal
    locales/{pt,en,es}.ts                              # Traduções (fonte única de texto)
  context/
    ThemeContext.tsx, LanguageContext.tsx      # Providers globais
  types/
    index.ts, i18n.ts                            # Tipos compartilhados
```

> Todo o conteúdo factual (stack, projetos, timeline, bio) vive em `src/data/` e `src/data/locales/`. Pra atualizar qualquer informação, basta editar o dado — os componentes não precisam ser tocados.

## 🚀 Rodando localmente

Requer **Node.js 18.18+** (recomendado 20 ou 22).

```bash
# 1. Instalar dependências
npm install

# 2. Rodar em modo desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

### Build de produção

```bash
npm run build
npm run start
```

### Variáveis de ambiente (opcional)

O contador de visitantes usa Redis (Upstash). Sem essas variáveis o site funciona normalmente — o contador simplesmente não aparece.

```bash
# .env.local
KV_REST_API_URL=...
KV_REST_API_TOKEN=...
```

## 🎨 Sistema de temas

Cinco temas trocam um atributo `data-theme` no `<html>`, que reescreve variáveis CSS (`--bg`, `--accent`, `--text`, etc.) consumidas por todos os componentes. A preferência é salva em `localStorage` e restaurada sem flash visual via script inline que roda antes da hidratação do React.

| Tema | Acento |
|---|---|
| Dark (padrão) | Ciano elétrico `#06b6d4` |
| Light | Azul premium `#1d4ed8` |
| Green Tech | Verde neon `#10b981` |
| Purple Cyber | Violeta `#8b5cf6` |
| Cosmic Blue | Safira `#3b82f6` |

## 🌍 Internacionalização

Português, Inglês e Espanhol — trocados instantaneamente via `LanguageContext`, sem reload de página. Toda a cópia do site (incluindo bio, timeline e projetos) vive em `src/data/locales/`.

## ♿ Acessibilidade

- `prefers-reduced-motion: reduce` desativa o dot-field animado e trava os reveals com scroll em seu estado final — sem quebrar layout.
- O cursor nativo do sistema **nunca é escondido**; o anel/ponto customizado é só um efeito decorativo por cima.
- Em dispositivos touch, o spotlight radial dos cards e o glow que segue o cursor são desativados automaticamente via `matchMedia('(pointer: coarse)')`.
- Skip link para o conteúdo principal (`#main-content`).

## 📬 Contato

- **GitHub:** [github.com/Devgusta5](https://github.com/Devgusta5)
- **LinkedIn:** [linkedin.com/in/devgusta5](https://linkedin.com/in/devgusta5)
- **E-mail:** gusta.gu.112007.55@gmail.com

## 📄 Licença

Projeto pessoal — código disponível para consulta e aprendizado. Sem licença de reuso comercial.
