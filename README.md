# Portfólio — Gustavo Rodrigues

Portfólio pessoal ultra-premium, construído em **Next.js 16 + React 19 + TypeScript + Tailwind CSS v4**, com sistema de temas dinâmicos, bento grid, showcase cross-platform do projeto EtecNotes e timeline de trajetória.

## Como rodar localmente

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

## Estrutura do projeto

```
src/
  app/
    layout.tsx          # Layout raiz, metadata, ThemeProvider
    page.tsx             # Composição das seções da home
    globals.css          # Variáveis de tema (5 temas) e estilos globais
  components/
    Navbar.tsx            # Navbar fixa com navegação e ThemeSwitcher
    ThemeSwitcher.tsx      # Dropdown de seleção de tema
    ThemeInitScript.tsx    # Script anti-flash de tema (roda antes da hidratação)
    Hero.tsx               # Seção hero com BlurText e CTAs magnéticos
    BlurText.tsx            # Animação de revelação de texto com blur
    MagneticButton.tsx      # Botão que reage à proximidade do cursor
    ShinyText.tsx            # Texto com efeito de brilho animado
    SpotlightCard.tsx         # Card com borda iluminada seguindo o cursor
    InteractiveBackground.tsx # Grid + glow de fundo (desativado em touch)
    BentoSection.tsx           # Seção que organiza o bento grid
    SkillsCard.tsx               # Card de tech stack
    GithubCard.tsx                # Card simulando feed de repositórios
    ProfileCard.tsx                # Card de destaques rápidos do perfil
    EtecNotesShowcase.tsx           # Seção de destaque do projeto flagship
    CrossPlatformDisplay.tsx         # Orquestra laptop+phone (desktop) / abas (mobile)
    mockups/
      LaptopMockup.tsx                # Mockup de notebook (Tailwind puro)
      PhoneMockup.tsx                  # Mockup de smartphone (Tailwind puro)
    ProjectsGrid.tsx                    # Grid secundário de projetos
    ProjectCard.tsx                      # Card individual de projeto
    Timeline.tsx                          # Timeline vertical de trajetória
    Footer.tsx                             # Rodapé com links sociais
    icons/                                  # Ícones SVG inline reutilizáveis
  data/
    themes.ts        # Metadados dos 5 temas
    skills.ts          # Tech stack real (linguagens, frontend, backend, mobile, db)
    github.ts            # Repositórios em destaque + links sociais
    etecnotes.ts            # Conteúdo do projeto flagship
    projects.ts                # Demais projetos do grid secundário
    timeline.ts                    # Trajetória acadêmica e conquistas
  context/
    ThemeContext.tsx    # Provider + hook useTheme()
  types/
    index.ts              # Tipos compartilhados (Theme, Skill, Project, etc.)
```

## Sistema de temas

Cinco temas trocam um atributo `data-theme` no `<html>`, que reescreve variáveis CSS (`--bg`, `--accent`, `--text`, etc.) consumidas por todos os componentes:

| Tema | Acento |
|---|---|
| Dark (padrão) | Ciano elétrico `#06b6d4` |
| Light | Azul premium `#1d4ed8` |
| Verde Tecnológico | Verde neon `#10b981` |
| Roxo Cyberpunk | Violeta `#8b5cf6` |
| Azul Cósmico | Safira `#3b82f6` |

A preferência é salva em `localStorage` e restaurada sem flash visual (via `ThemeInitScript`, que roda antes da hidratação do React).

## Atualizando o conteúdo

Todo o conteúdo factual (stack, projetos, timeline, repositórios) vive em `src/data/`. Para atualizar qualquer informação, edite o arquivo de dados correspondente — os componentes não precisam ser tocados.

## Responsividade

- **Mobile-first**, testado de 360px a desktop wide.
- Em telas *touch*, o spotlight radial dos cards e o glow que segue o cursor são desativados automaticamente (via `matchMedia('(pointer: coarse)')`), evitando custo de listener sem benefício visual.
- `prefers-reduced-motion: reduce` desativa todas as animações globalmente.
- A seção EtecNotes alterna de **sobreposição lado a lado** (desktop) para **abas Web/Mobile** (telas pequenas).
