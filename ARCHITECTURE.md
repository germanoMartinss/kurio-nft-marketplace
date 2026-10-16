# Arquitetura

Documento vivo: cada fase acrescenta as decisões que tomou. Contexto e requisitos em
[CLAUDE.md](CLAUDE.md) e [CHALLENGE.md](CHALLENGE.md).

## Stack e versões

| Responsabilidade | Escolha                                                              | Observação                                                                                                                                  |
| ---------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Build            | Vite 8                                                               | SPA estática; não há necessidade de SSR e o deploy é um diretório `dist/`.                                                                  |
| UI               | React 19 + TypeScript 6.0 (strict)                                   | TypeScript 7 ainda não é suportado pelo `typescript-eslint` (exige `<6.1`).                                                                 |
| Rotas            | TanStack Router (file-based)                                         | Parâmetros e search params tipados; árvore gerada em `src/routeTree.gen.ts` (versionada, para que o typecheck funcione num checkout limpo). |
| Estado remoto    | TanStack Query 5                                                     |                                                                                                                                             |
| HTTP             | Axios                                                                | Instância única em `src/api/http.ts`.                                                                                                       |
| Contratos        | Zod 4                                                                | Schemas em `src/contracts/`, usados pelo cliente **e** pelos mocks.                                                                         |
| Tempo real       | socket.io-client 4.8                                                 |                                                                                                                                             |
| Mocks            | MSW **2.15.0** (versão exata) + `@mswjs/socket.io-binding` **0.2.0** | Ver abaixo.                                                                                                                                 |
| Estilo           | Tailwind CSS 4 + shadcn/ui                                           |                                                                                                                                             |

### Por que o MSW está fixado em 2.15.0

O `@mswjs/socket.io-binding@0.2.0` (última versão, publicada em junho de 2025) declara
`peerDependencies: { msw: "^2.10.2" }`. O MSW 3 foi lançado em setembro de 2026 e está fora desse
intervalo. Fixamos a última 2.x **sem `^`** porque a integração depende de detalhes internos do MSW
(ver "Limitações do transporte"), e uma atualização silenciosa de minor poderia quebrá-la.
Atualizar para o MSW 3 exige reavaliar o binding ou substituí-lo por um adaptador próprio.

`msw` e `@mswjs/socket.io-binding` são `dependencies` (e não `devDependencies`) porque fazem parte
do bundle de demonstração publicado.

## Design system

### Tokens

Fonte: `design/tokens.md` (CSS exportado do Figma). Os nomes das variáveis do Figma estão
inconsistentes com o uso real, então os tokens foram renomeados pelo papel que cumprem:

| Figma (variável → rótulo no layer)        | Valor             | Token no código                                                    |
| ----------------------------------------- | ----------------- | ------------------------------------------------------------------ |
| `color/ink`                               | #140D0A           | `background`, `primary-foreground`                                 |
| `color/background` → "Foreground"         | #F5F1EB           | `foreground`                                                       |
| `color/text-primary` → "Surface Card"     | #241612           | `card` / `surface`                                                 |
| `color/text-secondary` → "Surface Raised" | #2F1D15           | `surface-raised` (também `muted`, `secondary`, `accent` do shadcn) |
| `color/surface-dark`                      | #38220F           | `surface-dark`                                                     |
| `color/primary`                           | #D28A4C           | `primary`                                                          |
| `text/accent`                             | #E89B55           | `accent-text`, `ring`                                              |
| `text/secondary`                          | #CFB28C           | `muted-foreground`                                                 |
| `color/secondary`                         | #B39463           | `subtle`                                                           |
| `text/coral`                              | #F0805F           | `coral`, `destructive`                                             |
| `color/border` · `color/border-soft`      | #3F2319 · #55321F | `border` · `border-soft`                                           |

No shadcn, `accent`, `secondary` e `muted` são **fundos** (hover de itens de menu, botões
secundários). Usar esses nomes para as cores de texto do Figma faria os componentes gerados
pintarem fundos laranja. Por isso o texto de destaque é `accent-text` e o tom areia é `subtle`.

Tipografia: Roboto Mono variável, self-hosted via `@fontsource-variable` (sem requisição a
terceiros). A escala do Figma vira classes `text-9` … `text-43`, cada uma com a altura de linha
mais usada no layout. O `cn` (`src/lib/utils.ts`) registra essa escala no `tailwind-merge`. Sem
isso, `cn('text-15 text-foreground')` descarta o tamanho, por tratar `text-15` como cor (reproduzido).

O Kurio só tem tema escuro: o variant `dark:` dos componentes shadcn foi redefinido para valer
sempre, em vez de depender do `prefers-color-scheme` do sistema.

### Componentes

- shadcn/ui com base Radix (preset `radix-lyra`, o estilo reto e compacto pensado para fontes
  mono). Os componentes ficam no repositório (`src/components/ui`) e foram ajustados ao Figma:
  raios, alturas (inputs de 40px), cores de foco e erro, textos de acessibilidade em português.
- Variantes de botão: `primary`, `outline`, `neutral` (login social), `ghost`, `link`, `pill`
  (CTAs mobile com gradiente) e `icon`. O `Button` usa `type="button"` por padrão para não enviar
  formulários por acidente.
- `Skeleton` com shimmer em gradiente, estático com `prefers-reduced-motion` e `aria-hidden`
  (quem anuncia o carregamento é o contêiner, com `aria-busy`).
- Dependências do preset descartadas: a fonte JetBrains Mono, o `next-themes` (não há troca de
  tema) e o pacote `cn` (publicado poucos dias antes; preferimos clsx + tailwind-merge).
- Ícones: ver "Assets" abaixo.

### Layout e navegação

- A partir de `lg` (1024px): header e footer de desktop do Figma. Abaixo disso, o padrão das telas
  mobile, que **não é o desktop redimensionado**: não há header global (cada tela tem o próprio topo,
  `MobileTopBar`, com voltar circular, título e ação), não há footer (nenhum frame mobile tem) e a
  navegação fica na barra de abas inferior, com recorte côncavo em volta do botão central e ícones
  preenchidos. O recorte é um path SVG de largura fixa entre duas partes flexíveis, para a curva não
  deformar entre 390 e 1023px. O tablet (768px) segue o padrão mobile, porque a navegação de desktop
  não cabe nessa largura.
- Header: "Início" ativo nas telas de início, conta e autenticação; "Mercado" nas telas do fluxo
  de compra, que também não têm a divisória sob o header (conforme a descrição do componente no Figma).
- Link "Pular para o conteúdo" como primeiro elemento focável; `<main id="conteudo">`.

### Assets

**Ícones.** Os SVGs exportados do Figma ficam em `public/assets/icons/` (nomes em kebab-case) e são
convertidos em componentes React por `pnpm icons:generate` (`scripts/generate-icons.mjs` →
`src/components/figma-icons.generated.tsx`). A conversão troca a cor fixa de cada SVG por
`currentColor`: no Figma o mesmo ícone aparece em cores diferentes conforme o contexto (o carrinho é
claro no header; o logout é escuro dentro do botão laranja). IDs internos de máscaras e clip-paths
recebem um sufixo de `useId()`, para não duplicar IDs quando o ícone se repete na página. Inline em
vez de `<img>`: herda cor, não gera requisições e não pisca no carregamento.

Toda a interface importa ícones de `src/components/icons.tsx`, que expõe nomes por uso. Ícones
usados no Figma que **não vieram na exportação** usam o equivalente do Phosphor até serem exportados:

| Uso                                                 | Onde aparece no Figma                                                              | Substituto (Phosphor)                                        |
| --------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Casa, coração, carrinho e usuário **preenchidos**   | barra de abas mobile; botão de carrinho do detalhe mobile                          | `House`, `Heart`, `ShoppingCartSimple`, `User` (peso `fill`) |
| Botão central da barra de abas (moldura de leitura) | barra de abas mobile                                                               | `Scan`                                                       |
| Filtros                                             | botão ao lado da busca mobile                                                      | `SlidersHorizontal`                                          |
| Menos / mais                                        | steppers de quantidade (desktop e mobile)                                          | `Minus`, `Plus`                                              |
| Menu "⋮" e carteira                                 | cards de carteira do pagamento mobile                                              | `DotsThreeVertical`, `Wallet`                                |
| Fechar                                              | diálogos (login, cadastro, confirmação)                                            | `X`                                                          |
| Seta para baixo                                     | selects (rede, tipo de carteira, `.eth`)                                           | `CaretDown`                                                  |
| Olho aberto                                         | alternância de senha (só o "olho fechado" foi exportado)                           | `Eye`                                                        |
| Compartilhar e redes sociais                        | detalhe (LinkedIn, e-mail, X) e footer (Facebook, Instagram, X, LinkedIn, YouTube) | logos do Phosphor                                            |
| Logos Google e Facebook                             | login e cadastro                                                                   | pendente (ações de login social estão fora do escopo)        |
| Ilustração "Thank you"                              | confirmação de pedido                                                              | pendente                                                     |

O "voltar" usa o chevron exportado (`arrow-right-2`) espelhado, como no Figma.

**Imagens dos NFTs.** O Figma usa quatro ilustrações (`ape-oculos`, `gorila-chapeu`,
`ape-gola-alta`, `macaco-fone`), exportadas em PNG de 500×500 (~430 KB cada). `pnpm images:optimize`
(`scripts/optimize-images.mjs`, com `sharp`) gera AVIF e WebP em 160, 240, 320 e 500px em
`public/assets/nfts/optimized/` (de ~3 KB a ~26 KB). A maior variante é 500px porque essa é a
resolução do original; ampliar só aumentaria o peso. As saídas são versionadas, para o build não
depender de processamento de imagem. Os PNGs originais ficam como fonte e não são servidos às páginas.

### Ações fora do escopo

O enunciado exige que ações fora do escopo tenham comportamento coerente sem aparentar sucesso.
Regra adotada:

| Tipo                                                                       | Comportamento                                                                                                                                                                           |
| -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Destino existe no produto (perfil, lista de interesse, catálogo)           | Link real.                                                                                                                                                                              |
| Contato (e-mail, telefone)                                                 | `mailto:` e `tel:`.                                                                                                                                                                     |
| Redes sociais                                                              | Link externo em nova aba, com aviso no nome acessível.                                                                                                                                  |
| Seção fora da entrega (Criadores, Aprenda, Central de ajuda, Atividade...) | `UnavailableAction`: botão com `aria-disabled` e "(indisponível nesta demonstração)" no nome acessível; ao ser acionado, explica o motivo num toast. Não navega e não simula resultado. |

### Desvios do Figma

| Tela                       | No Figma                                                                                                                                                | Na implementação                              | Motivo                                                    |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- | --------------------------------------------------------- |
| Carrinho (mobile)          | Ícone de lixeira sobreposto ao botão "+" do terceiro item                                                                                               | Lixeira em posição própria                    | Defeito do layout: a sobreposição impede o clique no "+". |
| Login e cadastro (desktop) | Rótulo "2.29 ETH" duplicado sobre um card e selo RARO de canto reto saindo do card (defeitos registrados na descrição do componente "Marketplace Page") | Sem duplicação; selo acompanha o raio do card | Defeitos conhecidos do próprio arquivo.                   |
| Footer (mobile e tablet)   | Não existe nos frames mobile                                                                                                                            | Oculto abaixo de 1024px                       | Fidelidade aos frames mobile.                             |

## Verificação visual

`pnpm screens` (`scripts/capture-screens.mjs`) captura cada tela em 390, 768 e 1440px, aponta
overflow horizontal e erros de console, e gera imagens lado a lado "implementação | Figma" em
`screenshots/` (não versionado). Toda tela é conferida assim antes do commit da fase.

## Mocks e tempo real

- **REST**: handlers HTTP do MSW, servidos pelo service worker (`public/mockServiceWorker.js`,
  mantido em sincronia com a versão da biblioteca pelo `postinstall` do msw — liberado em
  `pnpm-workspace.yaml`).
- **Socket.IO**: o MSW intercepta WebSocket **na própria página** (substitui o `WebSocket` global),
  não no service worker. Por isso funciona igual em desenvolvimento, no build publicado e no Playwright.
- A ativação é por configuração (`VITE_ENABLE_MOCKS`, padrão `true`) e acontece **antes** de montar
  a aplicação (`src/main.tsx`), para que nenhuma requisição ou conexão escape dos mocks.
- `/mocks` é o painel de diagnóstico da camada de mocks (service worker, ida e volta REST e ida e
  volta pelo socket). Ele faz parte da infraestrutura de mocks, não do produto.

### Limitações do transporte (e como foram tratadas)

O binding só codifica e decodifica **pacotes de evento**. O restante do protocolo foi completado em
`src/mocks/socket/server.ts`:

| Limitação                                                                                    | Consequência sem tratamento                                                                | Tratamento                                                                                             |
| -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| Só intercepta WebSocket                                                                      | Long-polling do engine.io falharia                                                         | Cliente usa `transports: ['websocket']`.                                                               |
| Anuncia `pingInterval: 25000` mas nunca envia ping                                           | O cliente encerra a conexão por `ping timeout` após ~30s e reconecta em loop (reproduzido) | O servidor simulado envia ping (`2`) a cada 25s.                                                       |
| Ignora o pacote CONNECT (`40{...}`)                                                          | O `auth` do handshake (token da sessão) se perde                                           | O servidor lê o CONNECT e associa a conexão à sessão.                                                  |
| Sem rooms, namespaces, broadcast e acks                                                      | Não há como direcionar eventos por usuário                                                 | Registro próprio de conexões com filtro por destinatário; comandos trafegam por REST, não por ack.     |
| O MSW 2.x remove o prefixo `/socket.io/` da URL do cliente antes de comparar com o `ws.link` | Um link em `/socket.io/*` nunca casa e a conexão vai para a rede                           | Socket.IO usa `path: '/realtime/'`, que não colide com outros WebSockets da origem (ex.: HMR do Vite). |

## Sessão

Token **Bearer** opaco, enviado pelo interceptor do Axios no header `Authorization`.

Num backend real, a recomendação seria um cookie `httpOnly` + `Secure` + `SameSite` com proteção
CSRF: o token fica inacessível a JavaScript e, portanto, a XSS. Aqui isso não é possível de forma
honesta: o MSW responde dentro do navegador e só consegue gravar cookies via `document.cookie`, que
por definição não são `httpOnly`. Simular um cookie que se comporta diferente do real seria pior do
que assumir o Bearer e documentar a diferença.

## Rotas

Paths em pt-BR. A URL é a fonte da verdade: `/entrar` e `/cadastro` são rotas próprias (acesso
direto e refresh funcionam). No desktop aparecem como diálogo sobre a página inicial; no mobile,
como página cheia. Retorno ao fluxo via `?redirect=` (apenas caminhos internos).

## Build e deploy (Vercel)

- `vercel.json`: rewrite das rotas da aplicação para `index.html`. A Vercel serve arquivos existentes
  antes de aplicar rewrites, então `mockServiceWorker.js` e os assets não são afetados. `/static/` e
  `/assets/` ficam **fora** do rewrite: um arquivo inexistente ali responde 404, e não o
  `index.html`. Sem essa exclusão, um chunk antigo pedido após um novo deploy receberia HTML com o
  cache imutável de `/static/`, quebrando aquele navegador por um ano.
- `mockServiceWorker.js` com `Cache-Control: no-cache`, para o navegador nunca usar um worker de
  versão diferente da biblioteca.
- Bundles com hash em `/static/` (cache de 1 ano, `immutable`). `/assets/` fica reservado às imagens
  do Figma em `public/assets/`, que não têm hash no nome e por isso não podem ser imutáveis.
- O MSW 2.15 trata o hard refresh (página carregada sem controle do service worker) recarregando a
  página uma vez; verificado no build de produção.
