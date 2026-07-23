# Auditoria de UX/UI, Storytelling e Percepção de Recrutador — Portfólio GRS

> Auditoria realizada em **23/07/2026**, lendo o código-fonte completo (não apenas a superfície visual).
> Óticas aplicadas: Senior Frontend Engineer, Senior UI/UX Designer, Product Designer, Tech Lead de contratação, Recrutador técnico.
> **Nenhum código foi alterado.** Documento 100% diagnóstico + plano.
>
> **Correção de escopo (v2):** a primeira versão deste documento partiu da premissa de que o DailyFlow deveria virar o projeto central do portfólio. O usuário corrigiu isso: **EtecNotes continua sendo o carro-chefe**; o DailyFlow mantém a posição atual (card no grid de projetos), só precisando de **dados corretos** (tags de stack ausentes). Este documento foi revisado para refletir essa decisão em todas as seções.
>
> Existe também um [`AUDITORIA.md`](AUDITORIA.md) na raiz, feito hoje, focado em **código/dados/SEO/perf** (estrelas de GitHub fabricadas, link 404 do EtecNotes, erros de ESLint, SEO incompleto). Este documento **não repete** aquele diagnóstico — assume-o como verdadeiro e cruza com ele quando relevante, porque alguns achados de lá (dados fabricados, link quebrado) são também, na prática, problemas de **credibilidade em 60 segundos**, que é exatamente o escopo pedido aqui.

---

## Resumo executivo

O portfólio tem um nível de execução técnica **acima da média** de um júnior — radar SVG com drill-down, dock estilo macOS com magnetismo, terminal DOS funcional com filesystem virtual, sistema de 5 temas, custom cursor, spotlight cards. Isso **é** um sinal real de senioridade em craft de frontend.

O problema não é o código, nem a escolha de manter o EtecNotes como carro-chefe — essa escolha é legítima (é o único projeto com prova social real: 1.100+ usuários, produção, 40+ funcionalidades). O problema é que **os dados de apoio não acompanharam o crescimento recente**: Go, PostgreSQL, Docker, Render e Neon **não existem em lugar nenhum dos dados estruturados** (`skills.ts`, `capabilities.ts`) que alimentam o radar de capacidades e o card de Tech Stack — exatamente as duas peças que deveriam provar que você é full stack e está evoluindo. Eles só aparecem, parcialmente, como 2 tags soltas no card do DailyFlow.

Em paralelo, alguns elementos de "personalidade" (boot loader de ~2,4s toda visita, badge fixo "Beta" no canto, cursor customizado que substitui o cursor nativo do sistema inteiro) competem com o objetivo de causar boa impressão rápido. Para um recrutador de tech em modo de scan de 60 segundos, esses elementos custam tempo e podem ler como "projeto pessoal divertido" em vez de "esse candidato entrega produto". Não são erros de execução — são erros de **priorização de sinal**, independentes de qual projeto é o principal.

---

## 1. Primeira impressão (os primeiros 60 segundos)

**O que convence:**
- A estética "GR.OS" (terminal, mono font, glow, dock) é coesa e memorável — não é um template genérico do Awwwards. Isso diferencia de 90% dos portfólios júnior.
- O radar de capacidades ([`CapabilityMatrix.tsx`](src/components/CapabilityMatrix.tsx)) é o elemento mais forte do site: interativo, com dados reais por trás (subskills, achievements, metrics), animação de spring bem calibrada. É o tipo de coisa que um Tech Lead nota e pensa "esse dev sabe SVG/math/motion".
- O dock de navegação flutuante com efeito de magnificação ([`Navbar.tsx:86-94`](src/components/Navbar.tsx#L86)) é um detalhe de polish que a maioria não implementa.

**O que faria eu (recrutador) fechar a aba ou perder o interesse antes dos 60s:**
1. **O boot loader.** [`BootLoader.tsx`](src/components/BootLoader.tsx) roda em **toda** visita (não usa `sessionStorage`/`localStorage` para pular em revisitas — confirmado, `bootFinished` é `useState` local, reseta a cada load). São ~2,4s de tela preta com texto de terminal antes do conteúdo aparecer, com um botão "Pular" no canto — ou seja, o site sabe que isso atrapalha (por isso o botão existe) mas mantém o atraso como padrão. Em um teste de 60 segundos, isso é **4% do orçamento de tempo** perdido de propósito, todas as vezes.
2. **Hero sem proposta de valor.** [`Hero.tsx:44-46`](src/components/Hero.tsx#L44) mostra só "Gustavo Rodrigues" + um label mono pequeno "Full Stack Developer". Nenhuma frase de impacto (a que só aparece 1 seção depois, na bio). Um recrutador que abre o link do currículo já sabe seu nome e cargo — o Hero deveria dizer *por que ele deveria continuar rolando*.
3. **O terminal, no estado inicial, está vazio.** [`Terminal.tsx:16-19`](src/components/Terminal.tsx#L16) mostra só 2 linhas de sistema + um prompt piscando. O valor real (comandos, ASCII art, troca de tema) só aparece se o visitante souber que pode digitar — a maioria não vai digitar comandos de DOS em 60 segundos. Ocupa ~700-800px de largura ([`Hero.tsx:50`](src/components/Hero.tsx#L50)) só de **espaço vazio antecipando uma interação que não vai acontecer**.
4. **Badge "Beta" fixo no canto** ([`Navbar.tsx:345-355`](src/components/Navbar.tsx#L345)). Em um portfólio cujo objetivo é provar competência sênior, anunciar "isto está em beta" é o oposto do sinal que você quer mandar — soa a "ainda não terminei", não a "still shipping".
5. **Mobile: a primeira tela inteira (`min-h-screen`) é nome + status + terminal vazio.** Em celular, isso significa um scroll completo antes de qualquer conteúdo de prova aparecer.

**Veredito rápido:** o site impressiona *depois* que a pessoa investe tempo nele. O problema é que hoje ele pede esse investimento **antes** de provar que vale a pena — o que é o inverso do que se precisa para converter em 60 segundos.

---

## 2. Hierarquia visual

| Aspecto | Estado atual | Problema |
|---|---|---|
| **Espaçamento** | `EtecNotesShowcase` usa `py-52 sm:py-64 md:py-80` ([linha 16](src/components/EtecNotesShowcase.tsx#L16)) — até **320px** de padding vertical só no topo/base da seção, em uma página onde as outras seções usam `py-20 md:py-28`. | Mesmo sendo o carro-chefe, isso é **desproporcional em termos de design** — 3x mais espaço em tela que qualquer outra seção não é necessário para comunicar "isto é importante"; é possível dar o mesmo destaque com um layout mais denso e eficiente, sem gastar tanta rolagem do visitante. |
| **Contraste** | `--text-3: #757575` sobre `--bg: #000000` (tema escuro padrão) e usado em bastante texto mono pequeno (10-11px). Já sinalizado no `AUDITORIA.md` como risco de ficar abaixo de 4.5:1 em certas combinações. | Textos secundários (labels de categoria, datas, metadados) arriscam legibilidade baixa exatamente nos textos que dão contexto rápido — ruim para scan de 60s. |
| **Tipografia** | Só duas famílias (Space Grotesk + JetBrains Mono), usadas de forma consistente (mono para labels/dados, sans para títulos). | Isso é um **ponto forte**, não fraco — mas o tamanho de rótulo do radar cai a `fontSize="4.5"`/`"5"` num viewBox de 200 ([`CapabilityMatrix.tsx:186-187`](src/components/CapabilityMatrix.tsx#L186)), o que em telas pequenas fica no limite da legibilidade. |
| **Grid / consistência** | Uso consistente de `max-w-7xl`, `px-6 sm:px-8`, grids responsivos bem pensados (`md:grid-cols-[0.75fr_1fr]` em quase todo header de seção). | Ponto forte real — headers de seção seguem o mesmo padrão em `ProjectsGrid`, `Timeline`, `BentoSection`. Consistência de sistema, não de sorte. |
| **Cor** | Sistema de tokens (`--accent`, `--text-2`, `--card-bg` etc.) trocável via `data-theme`, 5 temas. | Ponto forte de engenharia. Risco: no tema `light`, `--accent: #1d4ed8` é um azul saturado — vale checar contraste de texto sobre botões sólidos nesse tema (`--accent-contrast: #ffffff` deveria bastar, mas testar). |
| **Ritmo visual** | Seções alternam bem entre "denso" (radar+bio) e "respirado" (timeline), **exceto** o salto brusco de `BentoSection` (py-20/28, compacta) para `EtecNotesShowcase` (py-52 a py-80, gigante). | O ritmo quebra exatamente na transição para a seção que carrega a maior prova social do site — vale suavizar essa transição, não eliminar o destaque. |
| **Quantidade de informação** | Radar + bio + highlights + tech stack + github card + EtecNotes + projetos + timeline + footer — 7 seções completas antes do footer. | Não é excesso de conteúdo por seção (cada uma é enxuta), é excesso de **seções de "prova"** sequenciais que, juntas, adiam o momento em que o recrutador entende "isto é o mais importante" (o EtecNotes) — ele só chega lá depois de 2 seções anteriores. |
| **Responsividade** | Bem trabalhada (mobile-first, dock vira barra inferior, terminal reduz altura). | Ponto forte. Nenhum breakpoint quebrado identificado na leitura do código. |

---

## 3. UX e navegação

**"O usuário sempre sabe para onde olhar?"** Na maior parte do tempo sim — cada seção tem um header com label mono + título + descrição no mesmo padrão visual, o que cria previsibilidade.

**"O próximo passo está claro?"** Não. Não existe um CTA primário no Hero (baixar currículo / ver o produto principal / falar comigo). O CTA de currículo só aparece dentro do painel lateral do radar ([`CapabilityMatrix.tsx:486-503`](src/components/CapabilityMatrix.tsx#L486)), e o CTA de contato só no rodapé. Um recrutador decidido a agir precisa rolar a página inteira para achar "Contato" ou usar o popover de ícones escondido no dock ([`Navbar.tsx:147-198`](src/components/Navbar.tsx#L147)), que exige hover/clique para revelar os links.

**Seção cansativa / candidata a redução (não a corte):** `EtecNotesShowcase` no formato atual. Não pelo conteúdo (é a prova mais forte do site, com número de usuários verdadeiro), mas pelo **peso visual desproporcional**: iframe de até 960px de altura que exige clique pra carregar, mais ~500-600px de padding vertical somado. Dá pra manter — ou até aumentar — a força de comunicação com menos altura de página.

**Seção que falta:** um CTA cedo (Hero ou logo após) que aponte diretamente para o EtecNotes ("veja o produto em produção") — hoje o visitante precisa rolar por duas seções antes de saber que existe uma prova social forte esperando.

---

## 4. Storytelling

**Narrativa que o site conta hoje**, seção por seção:
1. Hero: "Meu nome é Gustavo, sou Full Stack Developer" (nenhuma prova ainda).
2. Capability Matrix + bio: "Sou o co-criador do EtecNotes" (3 parágrafos, os 3 sobre o mesmo produto).
3. Tech Stack: lista de tecnologias sem contexto de uso, e **desatualizada** (sem Go/Postgres/Docker/Render/Neon).
4. EtecNotes: repete o EtecNotes, agora em formato showcase gigante.
5. Projetos: DailyFlow e outros aparecem, todos em cards equivalentes.
6. Timeline: EtecNotes de novo, Beyond, Etec, UNISANTA.
7. Footer: CTA genérico.

Isso está, na sua maior parte, **alinhado com a decisão de manter o EtecNotes como carro-chefe** — não é um problema de "personagem errado", é um problema de **acabamento**: a bio inteira (3 de 3 parágrafos) fala só de EtecNotes sem nenhuma linha sobre a evolução recente (full stack, Go, Postgres, Docker), e o radar/tech stack — que deveriam ser a prova objetiva dessa evolução — estão com dados de 2024/2025. Resultado: mesmo mantendo o EtecNotes no centro, a impressão que fica é **"esse cara fez uma coisa muito boa há um tempo"**, não **"esse cara fez uma coisa muito boa e continua evoluindo rápido"**. A segunda frase é mais forte para quem contrata, e custa poucas linhas de copy + dados corretos para conseguir — não uma reestruturação de layout.

**Ajuste de narrativa proposto** (mantendo a estrutura atual de seções):

1. **Hero**: nome + role + uma frase de impacto real (ex.: "Full Stack Developer — co-criei uma plataforma usada por 1.100+ pessoas e hoje construo produtos com Go, Docker e PostgreSQL.") + CTA (Ver EtecNotes / Baixar currículo) acima da dobra.
2. **Capability Matrix + bio**: mantém o EtecNotes como eixo central, mas **1 dos 3 parágrafos** passa a mencionar a evolução recente de stack (sem precisar criar uma seção nova).
3. **Tech Stack**: dados atualizados com Go/PostgreSQL/Docker/Render/Neon (seção 6 detalha o redesenho visual).
4. **EtecNotes**: mantém o destaque, com ajuste de proporção/altura (não é sobre reduzir importância, é sobre eficiência de layout).
5. **Projetos**: DailyFlow permanece no grid, na posição atual, com as tags de stack corrigidas.
6. **Timeline / Footer**: sem mudança estrutural necessária.

---

## 5. Projetos — análise e ordem

| Projeto | Posição atual | Destaque atual | Diagnóstico |
|---|---|---|---|
| **EtecNotes** | Seção própria, showcase completo, antes do grid de projetos | Máximo destaque do site | Correto manter como carro-chefe — é a única prova social com números reais (1.100+ usuários, produção). Ajuste recomendado é só de **proporção/eficiência de layout** (seção 8), não de posição ou importância. |
| **DailyFlow** | 1º no grid de `ProjectsGrid` ([`projects.ts:4`](src/data/projects.ts#L4)) | Card padrão, igual aos outros 3 do grid | **Mantém a posição.** Único ajuste necessário: dados corretos. Hoje o card só lista `Flutter, Go, PostgreSQL` ([`projects.ts:8`](src/data/projects.ts#L8)) — falta Docker/Render/Neon, que também fazem parte do projeto segundo o que você descreveu. Status "MVP" (ponto âmbar) é aceitável para um projeto pessoal em construção — não precisa mudar, só garantir que a tag esteja correta. |
| **Scriptum-Library** | 2º no grid | Igual aos outros | Visão computacional é um diferencial pouco comum — vale manter no grid, sem necessidade de mudança. |
| **BeautyHub** | 3º no grid | Igual aos outros | Descrito como "SaaS" com status "Prototype" — coerente, sem necessidade de mudança. |
| **Pintoo** | 4º no grid | Igual aos outros | Projeto menor (canvas/desenho) — adequado no grid, não precisa de mais espaço. |
| Demais (`quick` list) | Lista compacta de chips no fim da seção | Mínimo, correto | Bom tratamento — não inflar isso. |

**Conclusão desta seção:** nenhuma mudança estrutural de layout é necessária nos projetos. O único trabalho real é de **dados**: garantir que DailyFlow (e qualquer outro projeto que use) reflita Docker/Render/Neon nas tags, e que essas mesmas tecnologias existam no `skills.ts`/`capabilities.ts` (seção 6), já que são essas duas fontes — não o card do projeto — que carregam o peso de "provar" a evolução de stack no site.

---

## 6. Card de Tech Stack — diagnóstico e 5 propostas

### Diagnóstico do estado atual ([`SkillsCard.tsx`](src/components/SkillsCard.tsx))
- Visualmente é uma lista de `<span>` em formato de pílula, agrupada por categoria em linhas com borda. Única microinteração: `hover:border-[var(--accent)]` na pílula ([linha 56](src/components/SkillsCard.tsx#L56)).
- Nenhum ícone, nenhuma indicação de nível/proficiência, nenhuma profundidade (glass, sombra em camadas), nenhuma animação de entrada própria (herda só o `Reveal` do pai).
- **Gap crítico de conteúdo**: `Go`, `PostgreSQL`, `Docker`, `Render` e `Neon` — o que você descreveu como o crescimento recente — **não existem em [`skills.ts`](src/data/skills.ts) nem em [`capabilities.ts`](src/data/capabilities.ts)**. O eixo "DAT" do radar cita Firestore/Firebase/Supabase/MySQL/MongoDB mas não Postgres; o eixo "OPS" cita Vercel/Git/GitHub/Linux/Azure mas não Docker/Render. Ou seja: **o card mais visível de "o que eu sei fazer" está desatualizado exatamente na direção que você quer comunicar.** Isso continua sendo a correção de maior alavancagem de todo o documento, e é barata — e agora, sem depender de nenhuma decisão sobre qual projeto é o flagship.

### 5 propostas de reformulação

**Proposta A — Bento Grid por camada com anel de proficiência**
Cada categoria (Frontend/Backend/Mobile/Dados/Infra) vira um tile independente num bento grid, com ícone da tecnologia principal, um anel/barra de proficiência sutil (não número exagerado, algo como um traço de progresso) e 1 chip "usado em: EtecNotes / DailyFlow" por tecnologia.
- ✅ Prós: aproveita o padrão bento que já existe em `BentoSection`; fácil de tornar responsivo; permite hierarquia visual clara (camada > tecnologia).
- ❌ Contras: com 19 skills + 7 tools, tiles podem ficar poluídos se não houver colapso/expansão; precisa de ícones (lucide-react já é dependência, mas nem toda tech tem ícone bom lá — precisa de um set tipo `simple-icons` ou SVGs próprios).
- Esforço: médio.

**Proposta B — Painel estilo "config file" (aproveita o branding GR.OS já existente)**
Renderizar o stack como um bloco de código com syntax highlight, tipo um `stack.config.ts` ou `docker-compose.yml` real, mono font, dentro do mesmo visual do `Terminal.tsx`. Ex.: linhas tipo `frontend: [react, next.js, typescript, tailwind]`, `infra: [docker, render, neon, vercel]`.
- ✅ Prós: reforço de marca (o site já vende "terminal/OS"), literalmente "prova de código" em vez de ícones genéricos, barato de implementar (é HTML/CSS com syntax highlight fake ou uma lib leve tipo `shiki`), se diferencia muito de qualquer portfólio padrão de Awwwards.
- ❌ Contras: menos "escaneável" num primeiro olhar para quem não lê código com fluência (mas o público-alvo é dev/recrutador técnico, então isso é uma feature, não bug); exige disciplina de manter o "arquivo" enxuto.
- Esforço: baixo-médio. **Esta é a recomendação principal** — é a que melhor equilibra impacto visual, esforço e coerência com o resto do site.

**Proposta C — Grafo/constelação de nós (tech ↔ projeto)**
Grafo interativo tipo knowledge-graph: nós de tecnologia conectados a nós de projeto (EtecNotes puxa para React/Node/Firebase; DailyFlow puxa para Flutter/Go/Postgres/Docker). Hover destaca o subgrafo.
- ✅ Prós: visualmente é o mais "uau" das 5 opções, comunica relação tech↔produto de forma orgânica, aproveita `motion` que já é dependência.
- ❌ Contras: maior custo de implementação (layout de força, colisão de nós, responsividade em mobile é genuinamente difícil), risco de acessibilidade (texto pequeno, difícil de tabular para leitor de tela), risco de virar "bonito mas confuso" se mal calibrado.
- Esforço: alto.

**Proposta D — Diagrama de arquitetura em camadas ("iceberg" full stack)**
Um diagrama horizontal/vertical literal: Frontend → Backend → Dados → Infra, cada camada com ícones docados, como um diagrama de arquitetura de sistema real (não uma lista de skills).
- ✅ Prós: comunica diretamente "eu penso em sistemas", que é o argumento certo para quem quer ser visto como full stack sênior, não só "sei várias linguagens"; reaproveita a metáfora de "layers" que já existe na copy (`stack.desc` já diz "organizada por camadas").
- ❌ Contras: é mais estático/menos "vivo" que as outras opções; exige cuidado de design para não parecer um slide de PowerPoint corporativo.
- Esforço: médio.

**Proposta E — Proof-of-work: stack como resultado, não como lista**
Em vez de "aqui estão minhas tecnologias", inverter para "aqui está o que cada tecnologia construiu": cada tech mostra o(s) projeto(s) reais onde foi usada e, quando disponível, uma métrica (ex.: "Node.js/Express → EtecNotes API, 99.9% uptime"). Layout tipo tabela/lista compacta com badges de projeto.
- ✅ Prós: transforma a seção de "checklist de currículo" (o que todo portfólio júnior faz) em prova de uso real — é o argumento mais forte para um Tech Lead ("ele não só conhece, ele usou").
- ❌ Contras: exige que cada tecnologia tenha pelo menos 1 projeto real associado nos dados (hoje nem toda skill em `skills.ts` tem isso mapeado) — trabalho de dados antes do trabalho visual.
- Esforço: médio.

**Recomendação final:** combinar **B (painel estilo config file, pelo reforço de marca e baixo custo)** com o princípio de **E (linkar tech → projeto real)** dentro das linhas do "arquivo" — ex. um comentário inline tipo `// usado no EtecNotes` do lado de `node.js`, e `// usado no DailyFlow` do lado de `go`. Isso dá 90% do "uau" das opções C/D por uma fração do esforço, e fica coerente com a identidade GR.OS que o site já construiu — sem depender de qual projeto é tratado como principal.

---

## 7. Animações e microinterações

| Elemento | Onde | Veredito | Motivo |
|---|---|---|---|
| Boot loader (linhas de terminal + fade) | [`BootLoader.tsx`](src/components/BootLoader.tsx) | **Cortar o delay padrão** (manter só como easter egg opcional, ex. atrás de um comando do terminal) | Custa ~2,4s em toda visita sem ganho proporcional de percepção de qualidade; para o objetivo "impressionar em 60s" é dedo no próprio olho. |
| Badge "Beta" com pulso | [`Navbar.tsx:345`](src/components/Navbar.tsx#L345) | **Remover** | Sinal contrário ao objetivo (parece incompleto). |
| Custom cursor (ring + dot, RAF, lerp 0.35) | [`CustomCursor.tsx`](src/components/CustomCursor.tsx) | **Manter, mas tirar o `cursor:none!important` global** | Bem calibrado tecnicamente (throttle, cresce em elementos interativos), mas apostar o cursor do sistema inteiro nisso é um risco de robustez desnecessário — já fica ótimo sem sequestrar o cursor nativo. |
| DotField (bulge de partículas no Hero) | [`DotField.tsx`](src/components/DotField.tsx) | **Ajustar** | Sutil e performático (RAF único, DPR capado em 2, pausa fora da viewport — boa engenharia), mas **não respeita `prefers-reduced-motion`** — o loop de RAF roda incondicionalmente, só as animações CSS globais são pausadas pela regra em `globals.css:299`. É uma lacuna real de acessibilidade num componente que, de resto, é o mais bem escrito tecnicamente do repositório. |
| Dock com magnificação estilo macOS | [`Navbar.tsx:86-94`](src/components/Navbar.tsx#L86) | **Manter — é um dos pontos fortes** | Propósito claro (indicar item ativo/hover), bem calibrado (spring stiffness 200/damping 12), não exagerado. |
| Radar com drill-down (spring) | [`CapabilityMatrix.tsx`](src/components/CapabilityMatrix.tsx) | **Manter e destacar mais — é o ponto mais forte do site** | Interação com propósito real (explorar sub-skills), matemática própria (coordenadas polares), transições de spring bem ajustadas. |
| Reveal (fade-up ao entrar na viewport) | [`Reveal.tsx`](src/components/Reveal.tsx), usado em quase toda seção | **Manter** | Consistente, sóbrio, não briga por atenção. |
| Shiny text (gradiente que "brilha" no hover) | [`ShinyText.tsx`](src/components/ShinyText.tsx), `globals.css:230` | **Manter** | Microinteração discreta, cabe no tom do site. |
| Spotlight nos cards (glow que segue o mouse) | [`SpotlightCard.tsx`](src/components/SpotlightCard.tsx) | **Manter** | Bem implementado (custom property, sem re-render), desliga em touch (`pointer: coarse`). |
| Tilt 3D na foto de perfil | `TiltedCard` em [`CapabilityMatrix.tsx:452`](src/components/CapabilityMatrix.tsx#L452) | **Estender** | Hoje só a foto tem esse tratamento "premium" de profundidade — vale aplicar um tilt sutil também no mockup/screenshot do EtecNotes para dar a mesma sensação de "produto físico". |

**Onde faltam microinterações:**
- Nenhum hover state nos chips de tecnologia além de troca de cor de borda — poderia ganhar um leve scale/glow (já existe o padrão de glow em outros componentes, é só reaproveitar).
- Nenhuma animação com scroll-scrub (parallax ou reveal progressivo ligado à posição de scroll) em nenhuma seção — `motion` já é dependência e suporta isso via `useScroll`/`useTransform`. É a maior lacuna de "efeito cinematográfico" pedida: hoje tudo é hover ou fade binário, nada é "acontece conforme você rola".
- O showcase do EtecNotes é o lugar certo para isso — ex. o mockup/screenshot ganhando profundidade/parallax leve conforme entra na tela, em vez de um fade-up genérico igual ao resto do site.

**Framer Motion (`motion`) vs Anime.js:** `motion` (Framer Motion) já é dependência do projeto e cobre 100% do que seria necessário (springs, drag, scroll-linked animations, layout animations). **Não há motivo para introduzir Anime.js** — seria uma segunda biblioteca de animação fazendo o mesmo trabalho, aumentando bundle size e superfície de manutenção sem ganho. Onde vale investir mais é em **usar melhor o que já está instalado** (`useScroll`/`useTransform` do `motion` para os efeitos "cinematográficos" pedidos), não em somar libs.

---

## 8. Melhorias visuais — propostas de composição maiores

1. **Hero com CTA acima da dobra.** Adicionar um ou dois `MagneticButton` (componente já existe, é só reaproveitar) logo abaixo do `<h1>`: "Ver EtecNotes" (scroll até a seção) e "Baixar currículo" (o mesmo fluxo que já existe no painel do radar, só que promovido para o Hero).
2. **Tornar o EtecNotes mais eficiente em espaço, sem perder destaque.** Trocar `py-52 sm:py-64 md:py-80` por algo como `py-28 md:py-36` (ainda maior que as outras seções, mas sem o exagero atual) e substituir o iframe ao vivo (960px) por uma imagem/vídeo com altura fixa menor (ex. 480-560px), com o link "Acessar sistema" continuando disponível para quem quiser a experiência completa. Isso também resolve, de graça, o ponto de performance já sinalizado no `AUDITORIA.md`.
3. **Glassmorphism/profundidade na Tech Stack** conforme proposta B/E da seção 6.
4. **Scroll-linked reveal** no bloco do EtecNotes, usando `useScroll` do `motion` — imagem entra com leve parallax/scale em vez de fade-up genérico.
5. **CTA de contato promovido**: hoje é um popover escondido no dock ([`SocialPopover`](src/components/Navbar.tsx#L147)) — para quem decide agir rápido, um botão de contato visível deveria existir também no Hero, não só no rodapé/dock.
6. **Copy em português sem acentuação.** Verificado sistematicamente: [`pt.ts`](src/data/locales/pt.ts) inteiro está sem nenhum acento/cedilha ("producao", "arquitetei", "estrategica", "especificos"). Isso não é estético — é **erro ortográfico real** em português correndo por toda a bio, timeline e descrições de projeto. Para qualquer recrutador brasileiro lendo em pt-BR, isso lê como descuido, mesmo que o motivo original tenha sido evitar problemas de encoding em algum pipeline. Vale corrigir com acentuação correta (o projeto já usa UTF-8 em outros lugares — os emojis e caracteres especiais no `AUDITORIA.md` e os "▸" no código provam que o pipeline aceita UTF-8 sem problema).

---

## 9. Benchmark vs. melhores portfólios de desenvolvedores

**O que os melhores portfólios (dev pessoal, não agência) costumam ter que este não tem:**
- **Vídeo/GIF do produto real rodando**, não apenas texto + tags. O EtecNotes usa um iframe ao vivo (custoso e dependente de uptime externo) em vez de mídia controlada; nenhum outro projeto mostra tela alguma.
- **CTA acima da dobra** (currículo/contato visível sem rolar).
- **Velocidade de carregamento como parte do pitch** — muitos dos melhores portfólios de devs sênior são propositalmente "chatos" em animação e "instantâneos" em carregamento, porque a mensagem implícita é "eu sei que performance importa". Um boot loader de 2,4s manda a mensagem oposta.
- **Dados de apoio (skills, métricas) sempre atualizados** — nos melhores portfólios, a lista de tecnologias reflete literalmente o que a pessoa está fazendo agora, não um snapshot de meses atrás.

**O que vale incorporar:** CTA cedo, mídia controlada (screenshot/vídeo em vez de iframe pesado), stack de dados sempre sincronizada com a realidade atual.
**O que NÃO vale copiar cegamente:** gimmicks visuais por si só (cursor customizado, boot sequence, partículas) quando não estão a serviço de uma mensagem clara — o risco real aqui, dado o nível de execução já alto do site, é continuar investindo em "mais um efeito bonito" em vez de resolver a lacuna de dados (stack desatualizado) e a fricção de entrada (boot loader, badge beta). Tecnicamente, este portfólio já tem *mais* efeitos visuais únicos que a maioria dos benchmarks — o gargalo não é falta de polish, é **dados desatualizados + fricção de entrada**.

---

## Nota geral: **7,0 / 10**

| Critério | Nota | Comentário |
|---|---|---|
| Craft técnico / execução de UI | 8,5/10 | Radar, dock, terminal, temas — nível bem acima de júnior. |
| Hierarquia visual e consistência | 7/10 | Sistema de grid/tokens sólido; penalizado pela desproporção de altura do EtecNotes. |
| Storytelling / alinhamento com objetivo atual | 6/10 | A escolha de manter o EtecNotes como carro-chefe é coerente; penalizado porque a bio/dados não mencionam a evolução recente de stack. |
| Tech stack showcase | 4/10 | Visualmente simples e, mais grave, **desatualizado** nos dados que mais importam agora (Go/Postgres/Docker/Render/Neon ausentes). |
| Primeira impressão / velocidade até o valor | 5/10 | Boot loader + Hero sem CTA + terminal vazio custam tempo sem retorno proporcional. |
| Credibilidade de dados (cross-ref `AUDITORIA.md`) | 4/10 | Estrelas de GitHub fabricadas e link 404 do EtecNotes são risco real se o recrutador clicar. |

---

## Pontos fortes

- Radar de capacidades interativo com drill-down — o elemento mais diferenciado do site ([`CapabilityMatrix.tsx`](src/components/CapabilityMatrix.tsx)).
- Terminal funcional com filesystem virtual, histórico, troca de tema via comando — profundidade técnica real, não é decoração.
- Dock de navegação com magnetismo/glow, comportamento macOS bem executado.
- Sistema de 5 temas via CSS custom properties, trocável em runtime, sem FOUC.
- Grid/spacing/tipografia consistentes em todas as seções (mesmo padrão de header repetido corretamente).
- EtecNotes como carro-chefe é uma escolha correta: é a única prova social com números reais e produção contínua.
- Boa separação dados/UI (`src/data/*`) — facilita implementar todas as correções de conteúdo sugeridas aqui sem mexer em componentes.
- `SpotlightCard`, `Reveal`, `MagneticButton` são componentes reutilizáveis bem desenhados — a base para os ajustes propostos já existe, não precisa ser inventada.

## Pontos fracos

- Go, PostgreSQL, Docker, Render e Neon estão ausentes dos dados estruturados de skills/capabilities — o card mais visível de "o que eu sei" está desatualizado na direção que mais importa agora.
- DailyFlow mostra só 3 das tags de stack reais (`Flutter, Go, PostgreSQL`), sem Docker/Render/Neon.
- `EtecNotesShowcase` consome altura desproporcional (até 320px de padding só de respiro + iframe de 960px) para o que precisa comunicar — dá pra manter o destaque com bem menos espaço.
- Boot loader de ~2,4s roda em toda visita sem persistência de "já visto".
- Hero não tem proposta de valor nem CTA — só nome e cargo.
- Badge "Beta" fixo manda sinal de imaturidade.
- Bio inteira (3 de 3 parágrafos) fala só do EtecNotes, sem nenhuma linha sobre a evolução recente de stack.
- Bio, timeline e descrições em português sem nenhuma acentuação — erro ortográfico sistemático.
- Tech Stack card é uma lista de pílulas sem ícones, sem profundidade, sem ligação a projetos reais.
- Nenhuma animação scroll-linked (parallax/scroll-scrub) apesar de `motion` já suportar — todo o motion design é hover ou fade binário.
- `CustomCursor` substitui o cursor nativo do sistema inteiro (`cursor:none!important`) — aposta de robustez desnecessária.
- `DotField` não respeita `prefers-reduced-motion` (loop de RAF roda incondicionalmente).
- (Cross-ref `AUDITORIA.md`): estrelas de GitHub fabricadas e link de repositório 404 — risco de credibilidade se clicado.

---

## Melhorias rápidas (< 30 min cada)

| # | Melhoria | Impacto | Dificuldade | Tempo | Risco de regressão |
|---|---|---|---|---|---|
| 1 | Remover o badge "Beta" fixo (`Navbar.tsx:345-355`) | Médio | Trivial | 5 min | Nenhum |
| 2 | Adicionar Go, PostgreSQL, Docker, Render, Neon em `skills.ts` (categorias backend/database/infra) | **Alto** | Trivial | 15 min | Nenhum (só dado) |
| 3 | Adicionar Docker/Render/Neon como tags no card do DailyFlow (`projects.ts:8` e `pt.ts:64`) | Alto | Trivial | 10 min | Nenhum |
| 4 | Persistir boot loader com `sessionStorage` (só roda 1x por sessão) | Médio-alto | Baixa | 20 min | Baixo (testar refresh) |
| 5 | Corrigir acentuação em pelo menos `pt.ts` (bio, timeline, projetos) | Médio | Baixa (é digitação, mas precisa revisão cuidadosa nas 3 strings de bio) | 25-30 min | Nenhum |
| 6 | Ajustar `EtecNotesShowcase` de `py-52/64/80` para algo mais próximo de `py-28/36` (menos exagerado, ainda em destaque) | Alto | Trivial | 10 min | Baixo (checar espaçamento visual depois) |

## Melhorias médias

| # | Melhoria | Impacto | Dificuldade | Tempo | Risco de regressão |
|---|---|---|---|---|---|
| 1 | Reescrever 1 dos 3 parágrafos da bio (`about.bio`) para incluir o crescimento recente (full stack, Go/Postgres/Docker), mantendo o EtecNotes como eixo principal | Alto | Baixa (copywriting) | 45-60 min | Nenhum |
| 2 | Adicionar CTA no Hero (`MagneticButton` "Ver EtecNotes" + "Baixar currículo") | Alto | Baixa (componente já existe) | 30-45 min | Baixo |
| 3 | Atualizar `capabilities.ts`: incluir Go/Docker/PostgreSQL/Render/Neon nos eixos backend/data/infra (technologies, achievements, subSkills) | Alto | Baixa | 40 min | Nenhum |
| 4 | Trocar `cursor:none!important` global por um cursor customizado que **coexiste** com o nativo (ou só adiciona o glow por cima) | Médio | Média | 45-60 min | Médio (testar em todos os elementos interativos) |
| 5 | Adicionar `prefers-reduced-motion` check no `DotField` (pausar RAF, não só as animações CSS) | Baixo (a11y) mas correto | Baixa | 20-30 min | Baixo |
| 6 | Trocar o iframe do EtecNotes por uma imagem/vídeo estático com altura menor, mantendo o link "abrir ao vivo" | Alto (perf + hierarquia) | Média | 1-2h (produzir o screenshot/vídeo + trocar o componente) | Baixo |

## Melhorias grandes

| # | Melhoria | Impacto | Dificuldade | Tempo | Risco de regressão |
|---|---|---|---|---|---|
| 1 | Reformular o Tech Stack card seguindo a Proposta B+E (seção 6): painel estilo "config file" com tech → projeto | Alto | Média | 3-5h | Baixo-médio |
| 2 | Adicionar `useScroll`/`useTransform` do `motion` para reveal com parallax leve no bloco do EtecNotes | Médio-alto | Média | 2-3h | Baixo |
| 3 | Produzir vídeo/GIF curto do EtecNotes (e opcionalmente do DailyFlow) para substituir o iframe/texto por mídia real controlada | Alto | Depende de gravação/edição, não de código | 2-4h (fora do código) | Nenhum |

## Melhorias de alto impacto (visão consolidada)

Estas são as mudanças que, se só pudesse escolher poucas, movem mais a agulha em "impressionar um recrutador em 60 segundos", já considerando que o EtecNotes segue como carro-chefe:

1. **Atualizar os dados de skills/capabilities com Go, PostgreSQL, Docker, Render, Neon** — correção de 15 minutos com efeito desproporcional, porque é literalmente a informação que falta para provar o crescimento recente.
2. **Corrigir as tags de stack do DailyFlow** — mesmo sem virar flagship, ele é a única prova visível de mobile + backend próprio + banco relacional; hoje está incompleto.
3. **Tornar o EtecNotes mais eficiente em espaço + CTA no Hero** — corrige o desequilíbrio de hierarquia sem tirar o destaque do carro-chefe, e devolve tempo/atenção ao visitante nos primeiros segundos.
4. **Tech Stack premium (painel estilo config file)** — troca "lista de pílulas" por algo que parece um artefato de engenharia real, coerente com a identidade GR.OS.
5. **Remover fricção de entrada** (boot loader persistente/opcional, remover badge "Beta") — devolve segundos do orçamento de 60s para o conteúdo, não para a decoração.

---

## Plano de implementação em ordem de prioridade

| Ordem | Item | Impacto esperado | Dificuldade | Tempo estimado | Risco de regressão |
|---|---|---|---|---|---|
| 1 | Adicionar Go/PostgreSQL/Docker/Render/Neon em `skills.ts` + `capabilities.ts` + tags do DailyFlow | Altíssimo | Trivial | 30 min | Nenhum |
| 2 | Remover badge "Beta"; persistir boot loader com `sessionStorage` | Alto | Baixa | 30 min | Baixo |
| 3 | Ajustar padding/altura do `EtecNotesShowcase` (menos exagerado, mantendo destaque) | Alto | Trivial | 15 min | Baixo |
| 4 | Reescrever 1 parágrafo da bio + acentuação correta em `pt.ts` | Alto | Baixa | 60-90 min | Nenhum |
| 5 | CTA no Hero (`MagneticButton` já existente) | Alto | Baixa | 45 min | Baixo |
| 6 | Trocar iframe do EtecNotes por screenshot/vídeo controlado | Alto | Média | 1-2h (+ produção de mídia) | Baixo |
| 7 | Reformular Tech Stack card (Proposta B+E) | Alto | Média | 3-5h | Baixo-médio |
| 8 | Ajustar `CustomCursor` (tirar `cursor:none` global) e `DotField` (`prefers-reduced-motion`) | Médio | Baixa-média | 60-90 min | Médio/Baixo |
| 9 | Scroll-linked reveal (parallax) no bloco do EtecNotes via `motion` | Médio-alto | Média | 2-3h | Baixo |

**Nota final de execução:** os itens 1-5 somam menos de 3h de trabalho e já resolvem a maior parte da divergência entre "o que o site diz" e "o que você quer que ele diga" — sem exigir nenhuma reestruturação de seções ou novo componente. O item 6 (mídia real do EtecNotes) é o que mais eleva a percepção de produto pronto, e o item 7 (Tech Stack premium) é a peça visual mais nova pedida. Recomendo essa ordem porque corrige primeiro os erros baratos de alto custo reputacional (dados desatualizados, fricção de entrada), depois entra nos ajustes de mídia e visual mais trabalhosos.
