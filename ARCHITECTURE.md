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
| Contratos        | Zod 4 (`zod/mini`)                                                   | Schemas em `src/contracts/`, usados pelo cliente **e** pelos mocks. Ver "Contratos" abaixo.                                                 |
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

Toda a interface importa ícones de `src/components/icons.tsx`, que expõe nomes por uso. Os ícones
próprios do mobile ficam em `public/assets/icons/icons-mobile/` e geram componentes com prefixo
`Mobile`. Ícones multicoloridos ou de marca (Google e Facebook do login) mantêm as cores
originais. Nomes de arquivo normalizados para kebab-case sem acentos; os ícones de compartilhar
têm o sufixo `-compartilhar`, porque `Linkedin.svg` (compartilhar) e `linkedin.svg` (rede social)
colidiriam em sistemas de arquivos que não diferenciam maiúsculas.

O "+" do stepper no desktop é `plus.svg` (exportado depois). No mobile o Figma usa o caractere "+" como texto dentro do círculo, e o `QuantityStepper` reproduz assim (ícone no desktop, texto abaixo de `lg`).

Ícones usados no Figma que **não vieram na exportação** usam o equivalente do Phosphor:

| Uso             | Onde aparece no Figma                                   | Substituto (Phosphor) |
| --------------- | ------------------------------------------------------- | --------------------- |
| Olho aberto     | alternância de senha; só o "olho fechado" foi exportado | `Eye`                 |
| Seta para baixo | selects (rede, tipo de carteira, `.eth`)                | `CaretDown`           |

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

| Tela                       | No Figma                                                                                                                                                | Na implementação                                                                     | Motivo                                                                                          |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| Carrinho (mobile)          | Ícone de lixeira sobreposto ao botão "+" do terceiro item                                                                                               | Lixeira em posição própria                                                           | Defeito do layout: a sobreposição impede o clique no "+".                                       |
| Login e cadastro (desktop) | Rótulo "2.29 ETH" duplicado sobre um card e selo RARO de canto reto saindo do card (defeitos registrados na descrição do componente "Marketplace Page") | Sem duplicação; selo acompanha o raio do card                                        | Defeitos conhecidos do próprio arquivo.                                                         |
| Footer (mobile e tablet)   | Não existe nos frames mobile                                                                                                                            | Oculto abaixo de 1024px                                                              | Fidelidade aos frames mobile.                                                                   |
| Barra de abas (mobile)     | Só aparece no frame da home                                                                                                                             | Oculta em detalhe, carrinho, pagamento, entrar e cadastro                            | Esses frames têm a própria barra de ação inferior ou são telas cheias.                          |
| Busca (desktop)            | Só o ícone de lupa no header                                                                                                                            | Ícone abre um diálogo de busca                                                       | O layout desktop não tem campo de busca; o diálogo mantém a composição do header.               |
| Ordenação (mobile)         | Não aparece no frame                                                                                                                                    | Dentro do drawer de filtros                                                          | Ordenação é obrigatória; o frame mobile não tem espaço para a linha "Ordenar por".              |
| Contagens dos filtros      | (33), (12), (65)… ilustrativas                                                                                                                          | Calculadas pela API a partir das 36 fixtures                                         | Os números refletem os dados reais da simulação.                                                |
| Galeria do detalhe         | Quatro miniaturas idênticas                                                                                                                             | Quatro enquadramentos da mesma obra                                                  | Dá função real à galeria com a única arte disponível por NFT.                                   |
| "Mais desta coleção"       | Artes variadas                                                                                                                                          | NFTs da mesma categoria                                                              | Nas fixtures cada coleção usa uma única ilustração; a categoria reproduz a variedade do layout. |
| Detalhe: compra            | Sem texto de disponibilidade                                                                                                                            | "N disponíveis · até 10 por pedido" sob a compra (desktop) e sob as edições (mobile) | O limite de quantidade (§3) precisa ser comunicado, não só sinalizado pelo botão desabilitado.  |
| Ações do card (desktop)    | Carrinho, favoritar e ampliar no hover                                                                                                                  | Favoritar e ver detalhes no hover/foco                                               | Adicionar ao carrinho exige escolher a edição; a compra acontece no detalhe.                    |

## Verificação visual

`pnpm screens` (`scripts/capture-screens.mjs`) captura cada tela em 390, 768 e 1440px, aponta
overflow horizontal e erros de console, e gera imagens lado a lado "implementação | Figma" em
`screenshots/` (não versionado). Toda tela é conferida assim antes do commit da fase.

## Estado e cache (TanStack Query)

| Aspecto             | Política                                                                                                               | Por quê                                                                                                                                                             |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Chaves públicas     | `['nfts', 'list', consulta]`, `['nfts', 'detail', id]`, `['nfts', 'highlights']`                                       | A consulta inteira faz parte da chave: cada combinação de filtros tem cache próprio.                                                                                |
| Chaves privadas     | Sempre sob `['user', userId, …]` (ex.: favoritos); carrinho sob `['user', id, 'cart']` ou `['guest', guestId, 'cart']` | Isolamento por dono: o logout/troca de usuário remove o prefixo inteiro (Fase 5).                                                                                   |
| `staleTime`         | 30s (destaques: 5 min)                                                                                                 | Navegar e voltar não refaz a consulta à toa; o tempo real cobre mudanças relevantes.                                                                                |
| Retry               | Até 2 vezes, **só** em falha transitória (rede, timeout, 5xx); mutations nunca                                         | 4xx é definitivo; repetir mutation poderia duplicar operação (pedidos usam idempotência).                                                                           |
| Paginação/filtros   | `placeholderData: keepPreviousData` + indicador "atualizando"                                                          | A lista anterior fica visível enquanto a nova carrega, sem pular o layout.                                                                                          |
| Respostas obsoletas | `signal` repassado ao Axios                                                                                            | Quando a consulta deixa de ser a atual, a requisição é cancelada; uma resposta antiga nunca ocupa a chave da consulta nova (testado com o cenário `fora-de-ordem`). |
| Pré-carregamento    | Loaders das rotas chamam `prefetchQuery` sem `await`; `defaultPreload: 'intent'`                                       | Hover/foco em links já busca os dados, sem bloquear a navegação (a tela mostra o skeleton).                                                                         |
| Otimista            | Favoritos: `onMutate` grava o novo estado, `onError` restaura o anterior e avisa, `onSettled` revalida                 | Resposta imediata ao clique, com rollback em falha.                                                                                                                 |

## Catálogo e detalhe

- **Estado na URL**: busca, coleções, redes, faixa de preço, aba, ordem e página são search params
  em pt-BR (`?busca=&colecoes=musica,arte-3d&redes=&precoMin=&precoMax=&aba=&ordem=&pagina=`),
  validados por `validateSearch` (valores inválidos são descartados, não quebram a página). Cada
  mudança é uma entrada no histórico; mudança de filtro remove `pagina`; valores padrão não vão
  para a URL. Filtros não rolam a página (`resetScroll: false`); a paginação leva ao topo do catálogo.
- **Busca**: digitação local com debounce de 350ms; uma entrada no histórico por busca, não por
  tecla. Se a URL muda por fora (voltar), o campo acompanha.
- **Estados**: skeleton com as dimensões finais (sem deslocamento), vazio com "limpar filtros",
  erro com "tentar novamente", atualização em segundo plano com indicador e anúncio do total de
  resultados para leitores de tela.
- **Filtros acessíveis**: checkboxes nativos (combináveis, operáveis por teclado) estilizados como
  a lista do Figma, com sinal de marcação além da cor; slider de preço com nome e valor textual por
  controle ("Preço mínimo, 0,02 ETH"). No mobile, drawer com foco preso e devolvido ao botão.
- **Detalhe**: acesso direto e refresh; 404 da API vira "NFT não encontrado"; edições como radios
  (esgotada desabilitada e anunciada); quantidade limitada pela disponibilidade da edição e por 10
  por pedido, com o limite anunciado; "Comprar" adiciona ao carrinho pela API (que revalida a
  disponibilidade) e leva ao carrinho.
- **Imagens**: `<picture>` com AVIF/WebP responsivos, dimensões intrínsecas para evitar CLS e
  `fetchpriority="high"` só na imagem principal.

## Testes E2E (Playwright)

`playwright.config.ts`: build de produção servido pelo `vite preview`, Chromium em dois projetos
(desktop 1440×900 e mobile 390×844 com toque), relatório HTML e trace/vídeo/screenshot das falhas.
Cada teste roda num contexto novo, então começa com storage vazio, banco simulado no seed e
sessão deslogada; o cenário é escolhido por `?cenario=` na primeira navegação (`e2e/support.ts`).
As verificações observam a interface e as requisições reais à API (que passam pelo MSW).

## Contratos

Os schemas em `src/contracts/` são a fonte única dos formatos de REST e de eventos. O cliente
(`src/api/`) valida **toda resposta** antes de entregá-la ao estado, e a API simulada valida
**todo corpo** recebido com os mesmos schemas: um desvio entre os dois lados quebra o typecheck ou
falha na fronteira, em vez de aparecer como `undefined` na tela. As regras de formulário (formato
de e-mail, senha, endereço `0x`, cupom) também moram nos contratos, então formulário e API validam
igual. Documentação dos endpoints, erros e eventos em [docs/API.md](docs/API.md).

**`zod/mini` em vez do Zod clássico.** Medido com os mesmos schemas: 8,0 KB gzip contra 26,6 KB.
A API funcional (`z.optional(x)`, `.check(z.minLength(1))`) é mais verbosa, mas cobre tudo o que
os contratos usam (objetos, enums, regex, inteiros, datas ISO, `z.infer`). As mensagens padrão do
mini são genéricas, o que não importa aqui: toda mensagem exibida é própria, em português.

**Dinheiro.** ETH trafega como string decimal e é calculado com big.js (`src/lib/money.ts`),
tanto na API simulada (totais, desconto, taxa) quanto na exibição. `number` nunca representa
dinheiro. O cliente não recalcula totais: exibe o que a API devolve.

## Backend simulado

```
src/mocks/
  db/          estado único (types), seed determinístico, store com persistência e reset
  fixtures/    36 NFTs, 2 usuários (senhas só em hash), carteiras, favoritos, cupons
  domain/      regras: catálogo e facetas, carrinho, cotação, pedidos e pagamento, sessão, eventos
  handlers/    tradução HTTP → domínio; route() aplica antes as condições de rede do cenário
  scenarios/   presets do §6 e cenário ativo (contadores e PRNG com semente)
  socket/      servidor Socket.IO simulado (ver "Limitações do transporte")
```

- **Estado consistente**: catálogo, favoritos, carrinhos, perfil, carteiras, cotações e pedidos
  vivem num único estado. Toda alteração passa por `mutate()`, que persiste no `localStorage`
  (`kurio:mock:db`). Alterações que afetam recursos observados publicam o evento correspondente
  (`domain/events.ts`), então REST e Socket.IO nunca divergem.
- **Reset**: `?reset=1` ou o painel restauram o seed integralmente e limpam o estado do cliente
  (`kurio:app:*`), voltando a um cenário conhecido e deslogado.
- **Determinismo**: ids sequenciais (`ord_0001`), fixtures sem aleatoriedade, latência variável
  com PRNG de semente fixa e hash de transação derivado do id do pedido. Só tokens de sessão e
  sais de senha novos são aleatórios, por segurança.
- **Senhas**: PBKDF2-SHA256 com 100 mil iterações (WebCrypto). Os hashes das contas de demonstração
  foram calculados fora da aplicação; nem o código nem o storage contêm a senha em claro.
- **Carrinho de visitante na API**: identificado por `X-Guest-Id`, para que também o carrinho sem
  login siga as regras de disponibilidade da API, em vez de uma cópia local com regras paralelas.
  Ao autenticar, `POST /cart/merge` soma as quantidades respeitando a disponibilidade.
- **Cotação e pedido**: a cotação congela preços, cupom e taxa; o pedido só nasce de uma cotação
  ainda válida (`409 QUOTE_STALE` caso contrário). O pagamento simulado tem o horário de término
  persistido, então um pedido pendente continua e termina mesmo após refresh.
- **Idempotência**: a chave fica associada ao hash canônico do corpo (chaves ordenadas em todos os
  níveis). Mesma chave e mesmo corpo devolvem o pedido existente; corpo diferente é conflito.
- **Isolamento**: pedidos de outro usuário respondem 404. `order.updated` só é enviado às conexões
  cujo token pertence ao dono, resolvido no momento do envio (sessão expirada deixa de receber).

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

### Ciclo de vida da sessão (Fase 5)

`bindSessionLifecycle` (`src/app/session-lifecycle.ts`) fica **fora do React** e reage à store da
sessão (`features/auth/session-store.ts`), então vale também para mudanças vindas de outra aba
(evento `storage`).

- **Troca de usuário, logout e expiração**: `cancelQueries` + `removeQueries(['user', idAnterior])`
  e troca do socket. Os dados privados ficam sempre sob `['user', id]`, então, mesmo antes da
  limpeza, o usuário B nunca lê a chave do A. Uma mutation do A ainda em voo pode recriar uma chave
  `['user', A, …]` ao falhar; ela é inalcançável para o B e some no próximo `gcTime`.
- **Expiração (401 `SESSION_EXPIRED`/`UNAUTHENTICATED`)** é detectada em dois pontos: no
  interceptor do Axios (qualquer chamada privada) e no `beforeLoad` das rotas privadas
  (`requireAuth`, que valida a sessão com a API antes de renderizar). O interceptor só encerra a
  sessão se o token recusado ainda é o da sessão atual: resposta tardia do usuário anterior não
  derruba quem entrou depois. Em rota privada, avisa e vai a `/entrar?redirect=<destino>` (usa
  `router.latestLocation`, que inclui a navegação em curso); em página pública, avisa e oferece
  "Entrar". Após novo login, volta ao destino.
- **Refresh**: o token fica no `localStorage` e é revalidado em segundo plano no boot; falha de rede
  não derruba a sessão, 401 sim.
- **Login**: grava a sessão, une o carrinho de visitante (`POST /cart/merge`) e só então sai da tela;
  falha na junção não bloqueia o login (aviso; os itens seguem no carrinho de visitante).
- **Rascunhos** (checkout, Fase 7) serão guardados por `userId`: preservados na expiração do
  mesmo usuário e descartados no logout/troca.
- **Socket por sessão** (`src/realtime/session-socket.ts`): conexão própria (`forceNew`) com o
  token no handshake; ao trocar de sessão o anterior perde todos os listeners e é desconectado.
- **Armadilha**: o `engine.io-client` guarda o `WebSocket` global ao ser avaliado. Importado antes
  de o MSW subir, ele fica com o WebSocket nativo e escapa dos mocks. Por isso `socket.io-client` é
  importado dinamicamente em `createRealtimeSocket`; nenhum import estático dele pode entrar no
  caminho do `main.tsx`.

### Desvios do Figma nas telas de autenticação

- Os campos têm só placeholder no layout; ganharam `label` oculto visualmente (`sr-only`) para
  leitores de tela, e mensagens de erro com ícone + texto (não só cor).
- O fundo da página atrás do diálogo tem véu leve (25%); o Figma não escurece.
- No frame mobile de cadastro o placeholder de "Nome de usuário" está centralizado; mantivemos o
  alinhamento à esquerda dos demais campos.
- "Esqueceu a senha?" e "Continuar com Google/Facebook" estão fora do escopo: anunciados como
  indisponíveis (`UnavailableAction`), sem simular sucesso.
- Logout no mobile fica na tela de perfil (Fase 8); o menu do usuário do header é só desktop.

## Carrinho e tempo real (Fase 6)

- **Quem calcula é a API.** O cliente nunca soma: toda mutation (`PATCH/DELETE /cart/items`,
  `PUT/DELETE /cart/coupon`) devolve o carrinho recalculado (subtotal, desconto, taxa, total em
  string decimal) e a resposta é gravada na chave do dono. Alternativa descartada: calcular no
  cliente com big.js para resposta instantânea; teríamos duas regras de preço que podem divergir
  (cupom, taxa por rede, disponibilidade). O big.js fica na formatação e na API simulada.
- **Sem update otimista no carrinho.** Os totais dependem da API, então exibir um valor otimista
  seria exibir um número que ninguém calculou. As ações ficam desabilitadas enquanto uma mutation
  está em voo (uma por vez, `cancelQueries` antes), o que também evita respostas fora de ordem. O
  update otimista com rollback exigido está nos favoritos.
- **Visitante e conta.** Chaves `['guest', guestId, 'cart']` e `['user', id, 'cart']`. O carrinho de
  visitante vive na API (header `X-Guest-Id`) e é unido ao da conta no login (`POST /cart/merge`),
  coberto por E2E. O contador do header/tab bar usa a mesma consulta (`useCart`), compartilhada
  com a tela do carrinho.
- **Avisos acessíveis.** A API mantém avisos por item (`preco-alterado`, `quantidade-ajustada`,
  `indisponivel`) até o usuário confirmar ("Entendi", `POST /cart/notices/ack`). Eles aparecem numa
  região `role="status"` (`aria-live="polite"`) que existe sempre, mesmo vazia: leitores de tela só
  anunciam mudanças em regiões vivas já presentes no DOM. O item esgotado fica fora do total e
  bloqueia "Conectar e finalizar" até ser removido.
- **`nft.updated` (src/realtime/nft-sync.ts).** `useRealtimeSync` (no shell) assina o socket da
  sessão e remove os listeners no cleanup. Por evento: (1) `eventId` já visto → ignora
  (duplicata); (2) versão ≤ última versão aplicada do NFT → ignora (evento antigo); (3) aplica no
  detalhe e nas listas/destaques só se a versão do cache for menor (um dado mais novo vindo do REST
  nunca regride); (4) invalida as listas ativas (preço novo muda filtro/ordem/facetas) e o carrinho
  que contenha o NFT, que é rebuscado da API (preço, avisos e total coerentes entre si).
  Duplicata e evento antigo não disparam nenhuma requisição (testado contando requisições).
- **Reconexão.** Ao reconectar (segundo `connect` do mesmo socket), todas as consultas ativas são
  invalidadas e rebuscadas: eventos perdidos durante a queda são reconciliados pelo REST, a fonte
  da verdade. Testado derrubando a conexão e alterando o preço no mesmo instante.
- **Cotação pronta para o checkout.** `useCreateQuote` (mutation) e `quoteDivergences(quote, cart)`
  comparam a cotação com o carrinho vivo (que reflete `nft.updated`); a Fase 7 usa isso para exigir
  nova confirmação.
- **Layout.** Desktop: tabela semântica (`<table>` com cabeçalhos) em linhas-cartão e coluna de
  resumo. Mobile/tablet: cartões e painel de resumo `sticky` na base (`mt-auto`: encosta na base
  também com poucos itens, então o skeleton e o conteúdo ocupam a mesma posição). O skeleton do
  resumo tem as mesmas dimensões do conteúdo (verificado em E2E, ±2px).
- **Desvios do Figma.** (a) A edição aparece numa linha própria sob o ID do token na tabela
  desktop (o Figma só mostra a coluna de quantidade, mas a edição identifica o item). (b) O botão de
  remover no mobile fica no canto superior do cartão: no Figma ele se sobrepõe ao stepper (artefato
  de exportação). (c) O mobile mostra o total da linha (como o Figma) e o preço unitário apenas
  para leitores de tela. (d) Avisos de alteração, estado vazio e erro de cupom não existem no
  Figma e seguem o padrão visual dos demais estados (ícone + texto, não só cor).

## Checkout e pedidos (Fase 7)

- **Fluxo.** `/pagamento` (formulário validado com React Hook Form + `buyerSchema`, carteira
  cadastrada, aplicativo de carteira) → "Confirmar compra" pede uma **cotação** (`POST /quotes`) e
  abre a **revisão** (diálogo com foco preso) → "Enviar pedido" cria o pedido → `/pedido/$orderId`,
  que mostra pendente, recusado ou o recibo conforme o estado do pedido. A tela de confirmação só
  renderiza o recibo para `status === 'confirmado'` **com** transação vinda da API; a UI nunca
  decide a confirmação.
- **Cotação.** `useCreateQuote` + `quoteDivergences`/`describeChange`. O envio é bloqueado quando a
  cotação expira (contagem regressiva) ou diverge do carrinho vivo (preço, disponibilidade, total),
  inclusive por `nft.updated` com o diálogo aberto; a diferença é listada numa região `role="alert"`
  e só resta "Atualizar cotação", que gera outra cotação e exige novo "Enviar pedido". A API
  também valida (`409 QUOTE_STALE`/`QUOTE_EXPIRED`), cobrindo o caso em que o evento ainda não
  chegou. O carrinho do checkout é consultado por rede (`[...cartKey, 'checkout', rede]`), porque a
  taxa depende dela; fica sob a chave do carrinho e é invalidado junto.
- **Idempotência.** `Idempotency-Key = idem-<quoteId>-<hash do corpo>` (`features/checkout/draft.ts`).
  A chave só muda quando a cotação ou o conteúdo mudam (recotar gera outra). Clique repetido (guarda
  síncrona `useRef` + botão desabilitado), retry após timeout e reenvio depois de refresh reutilizam
  a mesma chave: a API devolve o mesmo pedido (200 + `Idempotent-Replayed`). Chave igual com corpo
  diferente → `409 IDEMPOTENCY_CONFLICT`. A tentativa fica persistida até o estado terminal.
  Depois de um envio sem resposta (`attempt.sent`), a API decide: o pedido pode já ter consumido o
  carrinho, então divergência e validade da cotação deixam de bloquear o reenvio (bug encontrado
  pelo teste de timeout: o carrinho esvaziado era lido como "item indisponível").
- **Rascunho por usuário** (`kurio:app:checkout:<userId>`): formulário, carteira, conexão e
  tentativa. Preservado quando a sessão **expira** (o mesmo usuário volta e retoma) e descartado
  no logout e na troca de usuário (`sessionStore.endedByExpiry()` distingue os casos).
- **Carteira.** Conexão/desconexão simuladas por `POST /wallets/:id/(connect|disconnect)`; o envio
  conecta a carteira se necessário e a recusa (`WALLET_REJECTED`) não cria pedido.
- **`order.updated`** (`realtime/order-sync.ts`): valida o envelope, descarta evento de outro
  usuário (além do filtro do servidor), duplicata (`eventId`) e evento antigo (versão ≤ a conhecida,
  do cache ou da última aplicada), e nunca regride um estado terminal. Aplica o estado e rebusca o
  pedido (o evento não traz a transação); a confirmação também invalida o carrinho. Na reconexão
  todas as consultas ativas são rebuscadas (reconciliação). Listeners saem no cleanup.
- **Recibo** = snapshot do pedido (`order.lines`, taxa e total congelados na cotação); nenhum
  `nft.updated` toca o cache do pedido. **Carrinho** só é alterado pela confirmação no servidor,
  que remove apenas itens e quantidades comprados.
- **Controle de tempo nos testes.** Cenários com tempos curtos e determinísticos
  (`cotacao-expirada` 4s, `pendente-confirma`/`pendente-recusa` 3s, `requisicao-duplicada`,
  `timeout-pedido`, `pagamento-lento`) e `__kurioMock.orders.settleNow(id)` para terminar o
  pagamento no instante desejado (mesmo caminho do temporizador, com `order.updated`).
  `realtime.emit(evento)` injeta eventos arbitrários (antigos, de outro usuário) pelo servidor de
  socket, sempre passando pelo socket.io-client.
- **Desvios do Figma.** (a) "Usar outra carteira?" foi substituído pela lista de carteiras
  cadastradas ("Carteira conectada", que o frame mobile já tem) também no desktop: é onde ficam
  seleção, conexão e desconexão. (b) Rede, endereço e ENS/secundária são somente leitura (vêm da
  carteira escolhida); "Tipo de carteira" é um `<select>` nativo ligado à escolha da lista de
  aplicativos. (c) O mobile ganhou o formulário (o frame só mostra carteiras e total) abaixo do
  total, para validar os campos também lá. (d) O recibo desktop não tem header/footer, como o
  Figma; foi acrescentado "Continuar explorando", a nota "referências simuladas" e a edição em
  cada linha. (e) Estados pendente e recusado, o diálogo de revisão e a tela de recibo mobile não
  existem no Figma e seguem o mesmo padrão visual. (f) O título da barra superior mobile usa 18px
  abaixo de 640px para caber "Pagamento com carteira" em 390px.

## Perfil e carteiras (Fase 8)

- **Estrutura.** `/perfil` (dados, avatar e senha) e `/perfil/carteiras` compartilham o
  `ProfileLayout`: coluna lateral no desktop (Figma) e, no mobile, o título no topo, abas em pílula
  e o botão "Sair da conta" no fim (o Figma não tem frame mobile; segue o padrão das telas de
  compra). Atividade, ofertas, arquivos baixados e suporte usam `UnavailableAction`.
- **Perfil.** React Hook Form + `profileUpdateSchema`. "Salvar" grava os dados (`PATCH /profile`)
  e, se algum campo de senha foi preenchido, valida no cliente (regras da API + confirmação) e troca a
  senha (`POST /profile/password`) em seguida; falha na senha não desfaz os dados e avisa. Erros da
  API (`fieldErrors`: usuário/e-mail em uso, senha atual incorreta) vão para o campo. O resultado
  alimenta o cache e a sessão (nome e avatar do header). Trocar a senha encerra as outras sessões.
- **Avatar.** Arquivo → data URL (PNG/JPEG/WebP, ≤ 1 MB, validado no cliente e na API) →
  `PUT /profile/avatar`; "Remover" → `DELETE`. Persiste porque o banco simulado persiste.
- **Carteiras.** Um formulário por tipo: cria (`POST`) quando não existe, edita (`PUT`) quando existe.
  "Igual à carteira principal" copia os campos que não são únicos (o endereço duplicado é recusado
  pela API no campo). Rede e tipo são `<select>` nativos (acessíveis por teclado/leitor).
- **Desvios do Figma.** O título "Carteiras" fica só para leitores de tela no desktop (o Figma
  começa em "Carteira principal"); o "Adicionar" do topo da principal não existe (o formulário já
  está aberto); "Nome ENS" tem o sufixo ".eth" fixo, não um select; rótulos de senha são visíveis
  como no Figma e o botão de olho tem nome acessível por campo.
- **Pagamento mobile.** A carteira padrão é a secundária ("Reserva"), como no frame; o total vem
  logo após "Carteira e rede". Diferenças mantidas: status de conexão em cada carteira, o formulário
  do colecionador abaixo do total e o botão "Confirmar compra" fixo na base (`sticky`), para que
  continue alcançável com o formulário longo.
- **Relógio nos testes (`page.clock`).** `e2e/clock.spec.ts` instala o relógio antes de a página
  carregar; como o MSW roda na página, cliente e API simulada compartilham o tempo adiantado:
  cotação de 5 min, sessão de 2 h e pagamento de 12 s são vencidos com `fastForward`, sem espera.

## Acessibilidade, testes visuais e desempenho (Fases 9 e 10)

- **Auditoria axe** (`e2e/a11y.spec.ts`): WCAG 2.0/2.1 A e AA mais boas práticas, incluindo contraste,
  em todas as telas e estados principais (início, detalhe e inexistente, carrinho vazio/com itens/com
  aviso, login, cadastro, 404, pagamento, revisão, pedido pendente, recibo, recusado, perfil e
  carteiras), em desktop e mobile. Corrigidos: `dl` com estrutura inválida nos totais (a nota "Taxa
  estimada" passou para dentro do `dd`), `aria-label` em `<p>` na avaliação (texto `sr-only`), ordem
  de títulos no detalhe mobile e devolução do foco ao "Confirmar compra" depois da revisão.
- **Teclado** (`e2e/keyboard.spec.ts`): "Pular para o conteúdo", foco visível, foco preso e devolvido
  na revisão do pedido e na busca, menu do usuário, erro de formulário que foca o primeiro campo
  inválido (descrição acessível ligada ao campo) e carrinho operado só por teclado. Testes só de
  desktop ou só de mobile declaram o motivo no `test.skip`.
- **Zoom/reflow**: 200% (640px) e 400% (320px) sem rolagem horizontal em início, detalhe, carrinho,
  perfil, carteiras e pagamento (corrigidos: abas e busca do catálogo, grades de formulário e título
  da barra superior mobile em 320px).
- **Estados sem depender só de cor**: erros com ícone + texto, esgotado com rótulo, conectada/desconectada
  com símbolo e texto, avisos do carrinho com título, item esgotado riscado e anunciado.
- **Regressão visual** (`e2e/visual.spec.ts`): início, detalhe, carrinho e pagamento, desktop e mobile.
  Dados estáveis: cenário `padrao` (seed determinístico), relógio fixo (`page.clock.setFixedTime`),
  `animations: 'disabled'`, espera por fontes e imagens visíveis e `maxDiffPixelRatio` de 0,5%. As
  baselines ficam em `e2e/visual.spec.ts-snapshots/` (Linux/Chromium; `pnpm test:e2e:update` regenera).
- **Skeletons** (`e2e/skeletons.spec.ts`): perfil, pagamento (carteiras e itens), recibo, detalhe e
  catálogo têm as dimensões do conteúdo final (±2px) para o caso típico da demonstração; o
  detalhe reserva também as abas e "Mais desta coleção", e o catálogo, a paginação. Com número de
  itens/carteiras diferente do típico há pequena diferença (não é possível saber antes da resposta).
- **Lighthouse** (`pnpm lighthouse`, `lighthouse/`): início e detalhe, mobile e desktop, 3 execuções
  com mediana, relatórios HTML/JSON versionados, resumo e ambiente em `lighthouse/RESULTADOS.md`.
  O build é servido por `lighthouse/serve.mjs` (HTTP/2, Brotli, cache imutável e fallback de SPA como
  a Vercel); com `vite preview` (HTTP/1.1 sem compressão) o mobile fica em ~85–89, o que mede o
  servidor de preview e não o deploy.
- **Otimizações de carga** (todas valem para o app, não só para a auditoria): chunk dos mocks de 473
  para ~181 KB (o armazenamento de cookies do MSW é trocado por um stub no build: a aplicação não usa
  cookies); núcleo comum em poucos chunks estáveis; `modulepreload` dos chunks do MSW e da tela
  inicial; código da tela de entrada baixado em paralelo com o início do MSW; `socket.io-client` só
  com o navegador ocioso (um evento publicado antes da conexão é reconciliado pelo REST); casca de
  carregamento no `index.html`.
- **Limitação conhecida.** O MSW (service worker) precisa estar pronto antes da primeira requisição, o
  que mantém o LCP mobile em ~2,3 s (desktop ~0,5 s). É o custo de os mocks fazerem parte do build de
  demonstração.

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
