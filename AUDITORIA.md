# Auditoria — Portfólio Gustavo Rodrigues (GRS)

> Auditoria técnica e de UX realizada em **23/07/2026**, sobre o commit `40b5fc8`.
> Stack: Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · `motion` · shadcn.
> **Nenhum código foi alterado.** Este documento é somente diagnóstico.

---

## Pontos fortes

- **Stack moderna e coerente.** App Router, React 19, Tailwind v4 com design tokens via CSS custom properties. Boa escolha de fontes (Space Grotesk + JetBrains Mono) com `preconnect`.
- **Separação dados/UI exemplar.** Quase todo conteúdo mora em [`src/data/`](src/data/) (projects, skills, capabilities, timeline, etecnotes). Componentes são de apresentação — fácil de manter.
- **i18n bem estruturado.** Três locales (`pt`/`en`/`es`) com o **mesmo formato** e tamanho (109 linhas cada), tipados por [`Translations`](src/types/i18n.ts). Persistência em `localStorage`.
- **Acessibilidade acima da média para um portfólio.** Skip link ([`layout.tsx:31`](src/app/layout.tsx#L31)), `:focus-visible` global, `prefers-reduced-motion` respeitado ([`globals.css:299`](src/app/globals.css#L299)), `role="log"` + `aria-live` no terminal, `role="button"`/`tabIndex` nos eixos do radar.
- **Sistema de temas sólido.** 5 temas, script anti-FOUC no `<head>` ([`ThemeInitScript.tsx`](src/components/ThemeInitScript.tsx)), tokens bem organizados.
- **Interações com cuidado de performance.** O `DotField` limita `devicePixelRatio` a 2, faz debounce de resize, usa um único `requestAnimationFrame` e `path` batched. A API do GitHub roda no server com `revalidate: 300`.
- **Terminal interativo real.** Filesystem virtual, histórico de comandos, navegação, `theme`, deep-links de seção — é o diferencial mais memorável do site.

---

## Problemas encontrados

### 🔴 Críticos (afetam credibilidade ou quebram build)

1. **Dados de GitHub fabricados.** [`src/data/github.ts`](src/data/github.ts) mostra estrelas fixas — EtecNotes **48**, Scriptum **31**, BeautyHub **27**, Pintoo **18** — renderizadas em [`GithubCard.tsx:39`](src/components/GithubCard.tsx#L39). Na conta real (`Devgusta5`) os repositórios têm **0 a 2 estrelas**. Num portfólio de vaga, números inflados são o maior risco reputacional: qualquer recrutador que clicar no GitHub percebe a discrepância.
2. **Link de repositório quebrado (404).** [`etecnotes.ts:19`](src/data/etecnotes.ts#L19) aponta para `github.com/Devgusta5/EtecNotes` — **não existe** (404 confirmado). O repositório real é `EtecNotes-App`. Idem no `github.ts`, que usa o nome inexistente "EtecNotes".
3. **3 erros de ESLint bloqueiam o lint limpo.** `react-hooks/set-state-in-effect` em [`BootLoader.tsx:25`](src/components/BootLoader.tsx#L25) e duas vezes em [`DotFieldBackground.tsx:39`](src/components/DotFieldBackground.tsx#L39). `npx eslint .` retorna **3 errors, 11 warnings**.

### 🟠 Comparação com o GitHub — projetos ausentes

Repositórios públicos relevantes que **não aparecem** no portfólio:

| Repositório | Stack | Atualizado | Situação |
|---|---|---|---|
| **DailyFlow** | Flutter · Go · PostgreSQL | **23/07/2026 (hoje)** | Ausente — é o projeto mais recente e o mais "full-stack real" (mobile + backend + banco) |
| **CoreFlow-V1** | React Native (TypeScript) | 17/07/2026 | Ausente — o portfólio linka o **CoreFlow-OG** (versão antiga) |
| NutriViva | TypeScript | 17/07/2026 | Ausente |
| GarageLK | CSS/HTML | 17/07/2026 | Ausente (landing page) |
| ITC-Clinic | CSS/HTML/JS | 17/07/2026 | Ausente (landing premium) |
| media-pipe-hands | HTML | 24/08/2025 | Ausente (base do Scriptum — visão computacional) |

**DailyFlow é o caso mais importante:** demonstra Flutter + Go + PostgreSQL, exatamente a "arquitetura escalável / mobile" que o `<title>` promete. Merece destaque, não só um chip na lista.

### 🟡 SEO

- Metadata mínima em [`layout.tsx:8`](src/app/layout.tsx#L8): só `title` e `description`. **Faltam** `metadataBase`, Open Graph, Twitter Card, `canonical`, `robots`, `icons`/`themeColor`.
- **Sem `robots.txt` nem `sitemap.xml`** (o App Router permite gerar ambos trivialmente).
- **Sem imagem de compartilhamento (OG image)** — links no LinkedIn/WhatsApp saem sem preview.
- **`<html lang="pt-BR">` fixo** ([`layout.tsx:20`](src/app/layout.tsx#L20)): ao trocar para EN/ES o atributo `lang` não muda. Problema de acessibilidade (leitores de tela) e de SEO.
- Todo o conteúdo é `"use client"` a partir de [`page.tsx:1`](src/app/page.tsx#L1) — o HTML inicial vem mais "vazio" para crawlers do que precisaria.

### 🟡 Performance

- **iframe do site ao vivo do EtecNotes** ([`EtecNotesShowcase.tsx:68`](src/components/EtecNotesShowcase.tsx#L68)): embute o `etecnotes.com.br` inteiro num container de **até 960px de altura**. Carrega um site externo completo (JS, fontes, imagens de terceiros), é o maior custo de rede da página e depende da disponibilidade/velocidade daquele domínio. `loading="lazy"` ajuda, mas o ideal seria screenshot/vídeo com play sob demanda.
- **Três laços de animação simultâneos**: canvas do `DotField` (RAF), `CustomCursor` (RAF) e springs do `motion`. Em notebooks fracos isso soma.
- **Boot loader roda em toda visita** ([`BootLoader.tsx`](src/components/BootLoader.tsx)): 2,4s de tela preta antes do conteúdo, sem `sessionStorage` para pular em revisitas.
- Sem `next/image` config e sem otimização das imagens estáticas (`me.jpg`, PDFs no `public/`).

### 🟡 Acessibilidade / UX

- **`CustomCursor` injeta `*{cursor:none!important}`** ([`CustomCursor.tsx:21`](src/components/CustomCursor.tsx#L21)) no site inteiro. Se o JS atrasar/falhar, o usuário fica **sem cursor nenhum**; e some o cursor de texto/`pointer` semântico. É uma aposta arriscada de UX por um detalhe estético.
- Rótulos do radar em `fontSize` **4px** ([`CapabilityMatrix.tsx:185`](src/components/CapabilityMatrix.tsx#L185)) — dependem do scaling do SVG; em telas pequenas ficam no limite da legibilidade.
- Contraste: `--text-3` (`#606060` sobre `#000`) em textos "mono" pequenos pode ficar abaixo de 4.5:1.

### 🟢 Qualidade de código / higiene do repositório

- **Arquivos de lixo versionados:** `ascii-art .html` (**153 KB**, com espaço no nome), `public/ascii-art.html`, três currículos duplicados na raiz (`Curriculo_Gustavo-mesclado.pdf`, `Curriculo_Portf.docx`, `Gustavo_Rodrigues.pdf`), a pasta **`melhorias/`** com prompts e documentos pessoais (`.docx`, `.jpeg`, `API.txt`), e `tsconfig.tsbuildinfo` commitado (embora esteja no `.gitignore`).
- **Ícones duplicados:** `GithubIcon`, `LinkedinIcon`, `MailIcon`, `InstagramIcon` estão inline em [`Navbar.tsx:19-53`](src/components/Navbar.tsx#L19) **e** também em [`src/components/icons/`](src/components/icons/).
- **Código morto / avisos:** `TIMELINE` importado e não usado em [`Timeline.tsx:1`](src/components/Timeline.tsx#L1); prop `index` não usada em [`ProjectCard.tsx:23`](src/components/ProjectCard.tsx#L23); `eslint-disable` inútil em [`DotField.tsx:251`](src/components/DotField.tsx#L251); params `_f` e `current` sem uso no `Navbar`.
- **Duplicação de fonte de verdade:** `REPO_URLS` em [`ProjectCard.tsx:15`](src/components/ProjectCard.tsx#L15) repete URLs que já estão em `projects.ts`; a bio existe tanto em [`about.ts`](src/data/about.ts) quanto nos três locales.
- **Expressão-statement com ternário** em [`CapabilityMatrix.tsx:138`](src/components/CapabilityMatrix.tsx#L138) (`isSelected ? onBack() : onSelect()`), sinalizada pelo lint.
- **`no-case-declarations` latente:** `const section` dentro do `case "etecnotes"` sem bloco em [`Terminal.tsx:162`](src/components/Terminal.tsx#L162).

### Bugs potenciais

- Trocar idioma não muda `<html lang>` (ver SEO).
- `ThemeContext` grava `data-theme=""` (string vazia) para o tema *dark* ([`ThemeContext.tsx:30`](src/context/ThemeContext.tsx#L30)) — funciona, mas deixa um atributo vazio no DOM.
- O `IntersectionObserver` do Navbar observa `section[id]`; a seção `#top` (Hero) e `#capability-matrix` competem no rootMargin — a marcação de "ativo" pode piscar entre seções altas.

---

## Melhorias recomendadas (em ordem de impacto)

1. **Corrigir a credibilidade dos dados** — remover estrelas fabricadas e o link 404; puxar estrelas reais da API do GitHub (você já tem uma route server-side) ou simplesmente omitir o número. *(Impacto altíssimo, esforço baixo.)*
2. **Adicionar o DailyFlow** (e reavaliar CoreFlow-V1 vs OG) como projeto em destaque — é seu trabalho mais completo e mais recente. *(Alto impacto, esforço médio.)*
3. **Zerar os erros de ESLint** (3 `set-state-in-effect`) para ter build/CI limpo. *(Alto impacto de qualidade, esforço baixo.)*
4. **SEO completo**: `metadataBase` + Open Graph + Twitter Card + OG image + `robots.ts` + `sitemap.ts`, e sincronizar `<html lang>` com o idioma. *(Alto impacto para quem compartilha o link, esforço médio.)*
5. **Trocar o iframe do EtecNotes** por screenshot/vídeo otimizado com "abrir ao vivo" sob demanda. *(Médio-alto impacto de performance.)*
6. **Suavizar o `CustomCursor`** — não aplicar `cursor:none` global; manter fallback nativo. *(Médio impacto de UX/robustez.)*
7. **Limpeza do repositório** — remover lixo versionado e ícones/estados duplicados. *(Baixo impacto visível, alto valor de manutenção.)*

---

## Melhorias rápidas (< 30 min)

- [ ] Remover estrelas fake de [`github.ts`](src/data/github.ts) (ou trocar por dado real/omitir).
- [ ] Corrigir o `repoUrl` do EtecNotes (`EtecNotes` → `EtecNotes-App`) em [`etecnotes.ts:19`](src/data/etecnotes.ts#L19) e `github.ts`.
- [ ] Rodar `npx eslint . --fix` e limpar imports/params não usados (`TIMELINE`, `index`, `_f`, `current`, `eslint-disable`).
- [ ] Envolver o `case "etecnotes"` do [`Terminal.tsx`](src/components/Terminal.tsx#L162) em `{ }`.
- [ ] Adicionar `metadataBase`, `openGraph`, `twitter` e `icons` em [`layout.tsx`](src/app/layout.tsx#L8).
- [ ] `git rm --cached` em `tsconfig.tsbuildinfo`, `ascii-art .html`, currículos duplicados e pasta `melhorias/`.
- [ ] Guardar o boot loader com `sessionStorage` para não repetir em cada visita.
- [ ] Deduplicar os ícones inline do `Navbar` usando `src/components/icons/`.

## Melhorias médias

- [ ] Corrigir os 3 `set-state-in-effect` (derivar `isMobile`/`rgb`/`fadeOut` fora do effect ou usar `useSyncExternalStore`/inicialização lazy).
- [ ] Sincronizar `<html lang>` com o idioma ativo (via efeito no `LanguageProvider` ou `document.documentElement.lang`).
- [ ] Gerar `robots.ts`, `sitemap.ts` e uma **OG image** (`opengraph-image.tsx`).
- [ ] Adicionar **DailyFlow** e **CoreFlow-V1** aos dados de projetos (destaque + card), com tags corretas (Flutter/Go/PostgreSQL).
- [ ] Consolidar a fonte de verdade de projetos: eliminar `REPO_URLS` e a bio duplicada (`about.ts` vs locales).
- [ ] Revisar contraste de `--text-3` e aumentar o `fontSize` mínimo dos rótulos do radar.
- [ ] Suavizar `CustomCursor` (remover `!important` global; desativar por completo em `prefers-reduced-motion`/touch — já faz parte disso).

## Melhorias grandes

- [ ] **Substituir o iframe do EtecNotes** por uma vitrine de mídia (screenshots/loop de vídeo) com carregamento sob demanda — ganho real de performance e resiliência.
- [ ] **Reduzir a superfície client-side**: transformar seções estáticas (Timeline, Projects, Bento) em Server Components e manter `"use client"` só onde há interação, melhorando o HTML inicial para SEO/LCP.
- [ ] **Dados de GitHub dinâmicos de verdade**: estender a route `/api/github` para trazer repositórios + estrelas + linguagens reais, alimentando `GithubCard` e a grade de projetos automaticamente (fim do risco de dados desatualizados).
- [ ] **Página/rota dedicada por projeto** (case study) para DailyFlow e EtecNotes, com problema → arquitetura → resultado — muito mais forte que cards curtos para recrutadores técnicos.
- [ ] Medir com Lighthouse/Web Vitals reais e orçar animações (desligar `DotField` em telas pequenas — já há config mobile, mas o canvas ainda monta).

---

### Apêndice — evidências verificadas

- Estrelas reais (API GitHub, 23/07/2026): a maioria dos repos de `Devgusta5` tem 0★; `Pintoo-` 1★; `media-pipe-hands` 2★. Nenhum bate com os valores 48/31/27/18.
- `GET github.com/Devgusta5/EtecNotes` → **404**; `EtecNotes-App` → **200**.
- `npx eslint .` → **3 errors, 11 warnings**.
- `DailyFlow` `updated_at` = 2026-07-23 (mais recente da conta).
