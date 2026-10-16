# Kurio — NFT Marketplace (teste técnico Frontend · Jungle Gaming)

Marca no layout: **Kurio**. Repositório: https://github.com/germanoMartinss/kurio-nft-marketplace.
Enunciado completo: [CHALLENGE.md](CHALLENGE.md). Deploy na Vercel.

## Regras de trabalho

1. **Critérios eliminatórios (CHALLENGE §11) acima de tudo**: uso efetivo de toda a stack obrigatória;
   nenhum fluxo principal apenas visual; compra só é confirmada com resposta da simulação; nenhum
   dado vazando entre usuários; eventos nunca simulados direto na UI; testes E2E executáveis.
2. Trabalhar em fases, **um commit por fase**, conventional commits em português
   (`feat(carrinho): ...`, `chore: ...`). Antes de cada commit: `lint` + `typecheck` + `build` passando.
   Mudanças coesas por commit. **Nunca fazer push sem pedido explícito.**
3. Nunca commitar segredos: `.env` e `.env.local` no `.gitignore` desde o início; `.env.example` documentado.
4. Decisões de arquitetura são registradas, com justificativa, em ARCHITECTURE.md.
5. **Nada de respostas fictícias** em componentes, hooks ou no cliente Axios. Todo dado passa pelo MSW
   (REST via handlers HTTP, tempo real via socket.io-client → WebSocket interceptado pelo MSW).
6. Valores em ETH sempre **strings decimais** no transporte; cálculos com biblioteca decimal (big.js).
   Quantidades são inteiras. A cotação da API é a referência para finalizar o pedido.
7. **Fidelidade visual é o critério de maior peso**: seguir `design/*.png` e `design/tokens.md`.
   Estados não desenhados seguem o mesmo padrão visual. Desvios do Figma vão para ARCHITECTURE.md.

## Stack obrigatória

React + TypeScript · TanStack Router · TanStack Query · Axios · REST · Socket.IO (socket.io-client)
· Tailwind CSS · shadcn/ui · MSW · Playwright (E2E + regressão visual) · Lighthouse.
Escolhas complementares: Vite, Zod (contratos), big.js (decimais), React Hook Form, sonner (toasts).

**Restrição de versão**: `@mswjs/socket.io-binding@0.2.0` exige `msw ^2.10.2` → `msw` fixado em
`2.15.0` (versão exata, sem `^`; não usar msw 3). Socket.IO client com `transports: ['websocket']` (o binding só intercepta WebSocket;
long-polling não é suportado no mock — documentar como limitação).

## Requisitos (resumo do CHALLENGE.md)

**Telas** (desktop 9 frames + mobile 6 frames; perfil, carteiras e confirmação também em mobile sem frame;
validar em 390, 768 e 1440 px):

- Início: destaques, catálogo, busca, filtros combináveis, ordenação, paginação — tudo na URL,
  sobrevive a refresh/histórico; mudança de filtro reinicia a página; vazio, erro e respostas fora de ordem.
- Detalhe do NFT: galeria, info, edição, quantidade (limite), favoritos (persistem p/ autenticado), compra;
  acesso direto, NFT inexistente, edição indisponível.
- Carrinho: alterar/remover respeitando disponibilidade por NFT+edição; persiste após refresh; itens do
  visitante preservados ao logar; cupom (inválido/expirado); subtotal/desconto/taxa/total vindos da API;
  reflete `nft.updated` com o carrinho aberto.
- Pagamento: valida campos do layout; revisão antes do envio; carteiras cadastradas, rede, simulação de
  conexão/recusa/desconexão; revalida preço/disponibilidade/cupom/taxas (mudança ⇒ nova confirmação);
  sem pedidos duplicados (clique repetido, reenvio após timeout); pendente/confirmado/recusado com
  recuperação após refresh/reconexão; após confirmação remove só itens/quantidades comprados.
- Confirmação: só para pedido confirmado; recibo = snapshot imutável do pedido; tx/links simulados.
- Login (retorno ao fluxo anterior), Cadastro (conflito), Perfil (dados, avatar, senha), Carteiras
  (principal e secundária). Checkout, perfil, carteiras, favoritos e pedidos exigem autenticação.
- Sessão recuperável após refresh; expiração na navegação e no checkout preservando contexto; logout e
  troca de usuário limpam cache privado e subscriptions. Senhas nunca em claro.
- Fora do escopo (editorial, suporte, atividade, ofertas, downloads, login social): comportamento
  coerente, **sem aparentar sucesso**.

**Estado**: contratos tipados transporte→estado→UI; loading/vazio/erro/sucesso/refetch em background;
invalidação coerente; cancelamento de respostas obsoletas; isolamento por usuário e por parâmetros;
retry sem duplicar operações; 404 e acesso direto a qualquer rota; ≥1 update otimista com rollback;
política de cache/retry/sync documentada.

**REST mínimo**: sessão/conta, NFTs (lista+detalhe), favoritos, carrinho, cotação, pedidos (criação
idempotente via chave; mesma chave+corpo ⇒ mesmo pedido; mesma chave+corpo diferente ⇒ 409), perfil,
carteiras. Erros: validação, sessão inválida, sem permissão, inexistente, conflito de disponibilidade,
falha transitória.

**MSW**: mocks na camada de rede, reutilizados em dev/demo/testes; estado consistente entre recursos;
persistência local + reset para cenário conhecido; condições de rede configuráveis e reproduzíveis
(latência, variação, timeout, offline, 4xx/5xx); ≥2 usuários; cenários determinísticos listados no §6;
ativado por config e disponível no build de demonstração; mudanças refletidas em REST **e** eventos.

**Tempo real**: `nft.updated`, `order.updated` com id estável, recurso e versão; tolerar duplicatas e
eventos antigos; reconciliar com REST após reconexão; isolamento por sessão; liberar listeners.

**A11y**: teclado, foco visível, foco preso em dialogs/drawers, semântica/labels/erros associados,
alt text, contraste, estados não só por cor, feedback acessível (aria-live), zoom sem overflow.
Skeletons com shimmer (respeitando `prefers-reduced-motion`) sem layout shift.

**Testes** (§9) e **Lighthouse** (§10: Perf ≥90, A11y ≥95, BP ≥95, SEO ≥90; 3 execuções, mediana;
início e detalhe; mobile e desktop; LCP/CLS/TBT). **Entrega** (§12): README e ARCHITECTURE.md.

## Design tokens (de design/tokens.md, renomeados semanticamente)

Os nomes das variáveis no Figma estão inconsistentes (ex.: `color/background` = #F5F1EB, que é a cor
de texto; `color/text-primary` = #241612, que é a superfície dos cards). No código usamos nomes
semânticos e registramos o mapeamento em ARCHITECTURE.md.

| Token              | Hex     | Uso                                                  |
| ------------------ | ------- | ---------------------------------------------------- |
| `background`       | #140D0A | fundo da página; texto sobre botão primário          |
| `surface`          | #241612 | cards, painel de filtros, modais, footer             |
| `surface-raised`   | #2F1D15 | superfícies elevadas                                 |
| `surface-dark`     | #38220F | faixa da marca no footer, chips de carteiras         |
| `border`           | #3F2319 | bordas de inputs, divisores                          |
| `border-soft`      | #55321F | bordas suaves                                        |
| `foreground`       | #F5F1EB | texto principal                                      |
| `primary`          | #D28A4C | botões, sublinhado ativo, badges, bordas de destaque |
| `accent-text`      | #E89B55 | preços, links, nav ativa                             |
| `muted-foreground` | #CFB28C | texto secundário                                     |
| `subtle`           | #B39463 | ícones e textos de menu, placeholders                |
| `coral`            | #F0805F | asterisco de obrigatório; erros (com ícone + texto)  |

- Fonte única: **Roboto Mono** (400/500/700), self-hosted. Escala: 43/70 (display), 28/37, 24/32,
  22/29, 18, 17, 16, 15, 14, 13, 12, 10, 9. `letter-spacing: 0.1em` no wordmark e labels em caixa alta.
- Raios: 3px (inputs), 4px (chips/checkbox), 6px (botões), 8px (cards), 16–20px (cards mobile),
  24px (imagem do hero), full (steppers, badges, pills mobile).
- Espaçamentos recorrentes: 4, 6, 8, 10, 12, 16, 20, 24, 28, 32, 40. Container desktop 1200px (gutter 120 em 1440).
- Sombras: `0 4px 12px -2px rgb(20 13 10 / .15)`; modal `0 0 20px rgb(10 6 4 / .45)`.
- `design/tokens.md` só cobre desktop; tokens mobile foram derivados das PNGs.
- Tokens em `src/styles/index.css` com os nomes de variável do shadcn (`--primary`, `--card`...).
  Atenção: no shadcn, `accent`/`secondary`/`muted` são **fundos** de hover e de botões
  secundários; por isso a cor de texto de destaque do Figma é `accent-text` e o tom areia é
  `subtle`. Tipografia em classes `text-9` … `text-43` (o `cn` em `src/lib/utils.ts` conhece
  essa escala). Raios: `rounded-xs` 3 · `sm` 4 · `md` 6 · `lg` 8 · `xl` 16 · `2xl` 20 · `3xl` 24.
- Layout: abaixo de `lg` (1024px) vale o padrão mobile (barra de abas inferior); a partir de `lg`,
  header e footer de desktop. Largura útil com a utility `container-page`.
- Ícones só via `src/components/icons.tsx` (SVGs do Figma gerados por `pnpm icons:generate`;
  Phosphor só onde o Figma não exportou). Imagens dos NFTs: variantes AVIF/WebP em
  `public/assets/nfts/optimized/` (`pnpm images:optimize`). Ações fora do escopo usam `UnavailableAction`.
- Mobile **não** é o desktop redimensionado: topo por tela (`MobileTopBar`), sem footer, barra de abas.
- Toda tela é conferida com `pnpm screens` (390, 768 e 1440 contra os PNGs desktop e mobile) antes do commit.

## Arquitetura (resumo — detalhes em ARCHITECTURE.md quando existir)

```
src/
  app/          providers, queryClient, router, bootstrap (inicia MSW antes de montar)
  routes/       rotas file-based do TanStack Router (paths em pt-BR)
  api/          cliente Axios, interceptors, funções por recurso (validam com Zod)
  contracts/    schemas Zod + tipos compartilhados entre api/ e mocks/ (REST e eventos)
  realtime/     socket.io-client por sessão, roteador de eventos, dedupe/versão, reconciliação
  features/     catalog, nft, favorites, cart, checkout, orders, auth, profile, wallets
  components/   ui/ (shadcn adaptado), layout/ (Header, Footer, TabBar), common/
  lib/          money (big.js), format, storage, ids
  mocks/        browser.ts, db/ (estado + persistência + seed), handlers/, socket/, scenarios/, fixtures/
e2e/            specs Playwright, fixtures de teste, baselines visuais
lighthouse/     configuração e relatórios versionados
```

- Rotas em pt-BR: `/`, `/nft/$nftId`, `/carrinho`, `/pagamento`, `/pedido/$orderId`, `/entrar`,
  `/cadastro`, `/perfil`, `/perfil/carteiras`, além de 404. **A URL é a fonte da verdade**: `/entrar` e
  `/cadastro` são rotas próprias (acesso direto e refresh funcionam); no desktop são renderizadas como
  diálogo sobre a página inicial, no mobile como página cheia. Retorno ao fluxo via `?redirect=`
  (validado: apenas caminhos internos).
- Sessão: token Bearer opaco (Axios interceptor). Diferença em relação a cookie httpOnly documentada em
  ARCHITECTURE.md.
- queryKeys: públicos `['nfts', 'list', params]`, `['nfts', 'detail', id]`; privados sempre sob
  `['user', userId, ...]`; carrinho de visitante sob `['guest', guestId, 'cart']`.
- Logout/troca de usuário: desconectar socket da sessão, `removeQueries(['user', prevId])`, limpar rascunhos.
- Pedido: `Idempotency-Key` gerada por tentativa (quoteId + hash do corpo), persistida até estado terminal.
- Eventos: envelope `{ eventId, type, resource: { type, id }, version, occurredAt, userId?, payload }`.

## Comandos

Gerenciador: **pnpm** (Node ≥ 22.12). Disponíveis: `pnpm dev` (com mocks) · `pnpm build` ·
`pnpm preview` · `pnpm typecheck` · `pnpm lint` · `pnpm format` / `pnpm format:check` ·
`pnpm screens` · `pnpm icons:generate` · `pnpm images:optimize`.
Previstos: `test:e2e`, `test:e2e:update` (Fase 9) e `lighthouse` (Fase 10).

Antes de cada commit: `pnpm format:check && pnpm lint && pnpm typecheck && pnpm build`.

- Socket.IO usa `path: '/realtime/'` (não `/socket.io/`): o MSW 2.x reescreve esse prefixo. Ver ARCHITECTURE.md.
- `/mocks` é o painel de diagnóstico da camada de mocks.
