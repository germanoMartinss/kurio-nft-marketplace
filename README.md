# Kurio — NFT Marketplace

Marketplace de NFTs em React + TypeScript (teste técnico Frontend · Jungle Gaming). Descoberta,
compra e conta do colecionador, em desktop e mobile, com **API, autenticação, carteiras, pagamento e
eventos em tempo real simulados na camada de rede (MSW)**: nenhum backend é necessário.

- **Aplicação publicada:** https://kurio-nft-marketplace-iota.vercel.app
- **Repositório:** https://github.com/germanoMartinss/kurio-nft-marketplace
- **Painel dos mocks:** [`/mocks`](https://kurio-nft-marketplace-iota.vercel.app/mocks) (service worker, REST e Socket.IO)

| Documento                                            | Conteúdo                                                                                         |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| [ARCHITECTURE.md](ARCHITECTURE.md)                   | Decisões, sessão, cache, carrinho, reconciliação REST + Socket.IO, limitações e desvios do Figma |
| [docs/API.md](docs/API.md)                           | Contratos REST e eventos, erros, cenários e dados de demonstração                                |
| [docs/REQUIREMENTS.md](docs/REQUIREMENTS.md)         | Rastreabilidade: cada requisito do [CHALLENGE.md](CHALLENGE.md) e o teste que o cobre            |
| [lighthouse/RESULTADOS.md](lighthouse/RESULTADOS.md) | Auditoria Lighthouse (mediana de 3 execuções, local e Vercel)                                    |

## Stack

React · TypeScript · TanStack Router · TanStack Query · Axios · REST · Socket.IO (`socket.io-client`)
· Tailwind CSS · shadcn/ui · MSW (`@mswjs/socket.io-binding`) · Playwright · Lighthouse.
Complementares: Vite, `zod/mini` (contratos), big.js (decimais), React Hook Form, sonner (toasts).

## Setup

Requisitos: **Node ≥ 22.12** e **pnpm** (`corepack enable`).

```bash
pnpm install --frozen-lockfile
pnpm dev            # http://localhost:5173, com os mocks ativos
```

Para os testes E2E, instale uma vez o Chromium do Playwright: `pnpm exec playwright install chromium`
(no Linux, `--with-deps` instala também as bibliotecas do sistema).

### Variáveis de ambiente

Copie `.env.example` para `.env.local` se quiser alterá-las. **Nenhuma é segredo** e todas têm padrão
funcional, então nada é obrigatório.

| Variável            | Padrão  | Efeito                                                                                                                   |
| ------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------ |
| `VITE_ENABLE_MOCKS` | `true`  | Ativa o MSW (REST pelo service worker, Socket.IO por interceptação de WebSocket). Fica `true` também no build publicado. |
| `VITE_API_BASE_URL` | `/api`  | Base das chamadas REST feitas pelo Axios.                                                                                |
| `VITE_SOCKET_URL`   | (vazio) | Origem do servidor Socket.IO; vazio = a mesma origem da aplicação.                                                       |

## Credenciais fictícias

| Usuário           | Senha        | Particularidades                                                   |
| ----------------- | ------------ | ------------------------------------------------------------------ |
| `ana@kurio.dev`   | `Kurio@2026` | Carteiras principal (Ethereum) e secundária (Polygon); 2 favoritos |
| `bruno@kurio.dev` | `Colecao#77` | Sem carteiras (cadastre uma em Perfil › Carteiras); 1 favorito     |

Cupons: `KURIO10` (válido, 10%), `GENESIS10` (expirado); qualquer outro código é inválido.
Cadastrar um e-mail já existente (ex.: `ana@kurio.dev`) devolve o conflito `409`.
Senhas são guardadas só como hash PBKDF2-SHA256 (nunca em claro).

## Cenários dos mocks: seleção e reset

O cenário define latência, falhas e o roteiro de eventos. Há 22 cenários determinísticos, listados
com seus efeitos em [docs/API.md](docs/API.md#cenários-da-api-simulada).

- **Por URL (em qualquer rota):** `?cenario=<id>`, por exemplo `/?cenario=lento`. O cenário fica salvo
  no navegador até ser trocado; `?cenario=padrao` volta ao normal.
- **Reset para o estado inicial:** `?reset=1` (ou `?reset=1&cenario=padrao`). Restaura o banco simulado
  ao seed (catálogo, usuários, favoritos, carrinhos, carteiras, pedidos) e limpa o estado do cliente
  (sessão, rascunhos, carrinho de visitante).
- **Pelo painel:** `/mocks` lista os cenários, troca o ativo, mostra se o service worker está ativo e
  testa a ida e volta REST e Socket.IO.
- **Pelo console:** `window.__kurioMock` (age só no backend simulado, nunca na interface):
  `scenarios.set('lento')`, `reset()`, `nft.update('emerald-ape-042', { price: '1.50' })` (publica
  `nft.updated`), `session.expireAll()`, `realtime.disconnectAll()`, `orders.settleNow(id)` etc.
  Tabela completa em [docs/API.md](docs/API.md#controle-para-testes-windowkuriomock).
- **Persistência:** o banco simulado persiste no navegador (um refresh mantém conta, carrinho, pedidos).

## Comandos

| Comando                           | O que faz                                                                                       |
| --------------------------------- | ----------------------------------------------------------------------------------------------- |
| `pnpm dev`                        | Desenvolvimento com os mocks ativos                                                             |
| `pnpm build`                      | Verificação de tipos + build de produção (`dist/`, mocks incluídos)                             |
| `pnpm preview`                    | Serve o build em `http://localhost:4173`                                                        |
| `pnpm typecheck`                  | `tsc -b`                                                                                        |
| `pnpm lint` · `pnpm format:check` | ESLint (inclui a regra que isola os mocks) · Prettier                                           |
| `pnpm test:e2e`                   | Playwright (Chromium, desktop 1440 e mobile 390), contra o build com mocks                      |
| `pnpm test:e2e:update`            | Regenera as baselines da **regressão visual** (`e2e/visual.spec.ts-snapshots/`)                 |
| `pnpm test:e2e:report`            | Abre o relatório HTML (traces das falhas em `test-results/`)                                    |
| `pnpm verify:mocks`               | Verifica a camada de mocks (REST e Socket.IO) fora do navegador de testes                       |
| `pnpm lighthouse`                 | Lighthouse: início e detalhe, mobile e desktop, 3 execuções e mediana (precisa de `pnpm build`) |
| `pnpm lighthouse:vercel [url]`    | O mesmo contra a URL pública (referência de produção)                                           |
| `pnpm screens`                    | Captura as telas em 390/768/1440 e compara com os PNGs do Figma (precisa de `pnpm preview`)     |
| `pnpm requirements`               | Recalcula o resumo de [docs/REQUIREMENTS.md](docs/REQUIREMENTS.md)                              |

`pnpm test:e2e` constrói e serve a aplicação sozinho. Antes de commitar:
`pnpm format:check && pnpm lint && pnpm typecheck && pnpm build && pnpm test:e2e`.

A regressão visual cobre início, detalhe, carrinho e pagamento (desktop e mobile) com dados estáveis
(cenário `padrao`, relógio fixo, animações desligadas). As baselines são de Linux/Chromium.

## Reproduzir os fluxos de falha

Todos os cenários partem de `?cenario=<id>`; use `?reset=1` para recomeçar de um estado limpo.
Faça login com `ana@kurio.dev` onde o fluxo exigir.

| Fluxo                                         | Como reproduzir                                                                                               | O que observar                                                                              |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Resultado vazio                               | `/?cenario=catalogo-vazio`                                                                                    | Estado vazio do catálogo                                                                    |
| Carregamento lento / skeletons                | `/?cenario=lento`                                                                                             | Skeletons com shimmer, sem deslocar o layout                                                |
| Latência variável                             | `/?cenario=latencia-variavel`                                                                                 | Respostas de 200 ms a 1,8 s, sempre na mesma sequência                                      |
| Respostas fora de ordem                       | `/?cenario=fora-de-ordem`, digite na busca / mude de página rápido                                            | A lista exibida é sempre a da consulta atual (a antiga é cancelada)                         |
| Sem conexão                                   | `/?cenario=offline`                                                                                           | Erro com "Tentar novamente"; o socket não conecta                                           |
| Timeout                                       | `/?cenario=timeout`                                                                                           | Falha no 1º pedido de cada rota; nova tentativa funciona                                    |
| Erro 5xx / falha transitória                  | `/?cenario=erro-servidor` (500 fixo) ou `/?cenario=instavel` (503 nas 2 primeiras leituras)                   | Erro com nova tentativa; no `instavel` o retry automático recupera sozinho                  |
| NFT inexistente / 404                         | `/nft/nao-existe` ou `/?cenario=nao-encontrado` + qualquer detalhe; rota qualquer fora do mapa                | Página de NFT inexistente / 404                                                             |
| Sessão expirada                               | `/?cenario=sessao-expirada`, faça login e aguarde 20 s, depois navegue ou finalize a compra                   | Aviso, ida a `/entrar?redirect=…` e retorno ao contexto após o novo login                   |
| Acesso negado                                 | `/?cenario=acesso-negado`, faça login e abra `/perfil`                                                        | Erro 403 sem aparentar sucesso                                                              |
| Conflito de cadastro                          | `/cadastro` com `ana@kurio.dev`                                                                               | Erro 409 no campo e-mail                                                                    |
| Validação de formulários                      | Envie vazio/inválido em cadastro, perfil, senha e carteiras (ex.: endereço sem `0x`, carteira duplicada)      | Mensagens por campo, vindas do cliente e da API                                             |
| Cupom inválido ou expirado                    | No carrinho, aplique `GENESIS10` (expirado) ou `QUALQUER` (inválido)                                          | Erro associado ao campo do cupom; `KURIO10` aplica 10%                                      |
| Favorito com falha e rollback                 | `/?cenario=favoritos-falham`, login, favoritar um NFT                                                         | Atualização otimista, reversão e aviso; a segunda tentativa funciona                        |
| Preço alterado com o carrinho aberto          | `/?cenario=preco-alterado`, login, adicione um NFT e abra `/carrinho`                                         | Em ~4 s chega `nft.updated`: aviso e resumo atualizado; o checkout exige nova confirmação   |
| Edição esgotada na compra                     | `/?cenario=edicao-esgotada`, mesmo caminho                                                                    | Item sinalizado como esgotado; compra impedida                                              |
| Alterar preço por conta própria               | No console: `__kurioMock.nft.update('emerald-ape-042', { price: '1.50' })`                                    | Evento `nft.updated` real pelo socket; carrinho, catálogo e detalhe atualizam               |
| Cotação expirada                              | `/?cenario=cotacao-expirada`, chegue à revisão do pedido e aguarde 4 s                                        | Envio bloqueado até nova cotação                                                            |
| Carteira recusada                             | `/?cenario=carteira-recusada`, em `/pagamento` conecte uma carteira                                           | Recusa explícita, sem avançar                                                               |
| Pagamento confirmado / recusado               | Cenário `padrao` confirma; `/?cenario=pagamento-recusado` recusa                                              | Recibo (snapshot do pedido) só para confirmado; tela de recusa com o carrinho preservado    |
| Pedido pendente → confirma/recusa pelo socket | `/?cenario=pendente-confirma` ou `pendente-recusa`                                                            | "Pagamento em processamento" e depois o resultado por `order.updated`                       |
| Pagamento lento, queda e retomada             | `/?cenario=pagamento-lento`, envie o pedido e recarregue a página (ou `__kurioMock.realtime.disconnectAll()`) | O pedido pendente é recuperado, sem nova compra; `__kurioMock.orders.settleNow(id)` termina |
| Timeout ao criar pedido                       | `/?cenario=timeout-pedido`, envie o pedido                                                                    | O reenvio recupera o **mesmo** pedido (mesma `Idempotency-Key`), sem duplicar               |
| Clique repetido                               | `/?cenario=requisicao-duplicada`, clique várias vezes em "Enviar pedido"                                      | Um único pedido                                                                             |
| Eventos duplicados ou antigos                 | Console: `__kurioMock.realtime.replay()` ou `realtime.emit({ ... versão menor })`                             | Ignorados: o estado mais novo não regride                                                   |
| Troca de usuário / logout                     | Entre como Ana, saia, entre como Bruno                                                                        | Nenhum dado privado da Ana (carrinho, favoritos, pedidos) aparece                           |

## Estrutura

```
src/
  app/ routes/        providers, bootstrap (MSW antes de montar), rotas file-based (paths em pt-BR)
  api/ contracts/     cliente Axios por recurso + schemas Zod compartilhados com os mocks
  realtime/           socket.io-client por sessão, dedupe/versão, reconciliação com o REST
  features/           catalog, nft, favorites, cart, checkout, orders, auth, profile
  components/ lib/    shadcn adaptado, layout, ícones do Figma, dinheiro (big.js)
  mocks/              db, domínio, handlers REST, servidor Socket.IO, cenários, fixtures
e2e/                  specs Playwright + baselines visuais
lighthouse/           configuração, servidor da auditoria e relatórios
```

## Limitações conhecidas

Resumo; detalhes e justificativas em [ARCHITECTURE.md](ARCHITECTURE.md).

- Socket.IO só por **WebSocket** (o binding do MSW não intercepta long-polling).
- Token Bearer no `localStorage`, e não cookie `httpOnly`, porque o MSW roda no navegador.
- O service worker precisa estar pronto antes da primeira requisição: LCP mobile de ~2,3 s.
- Fontes e ícones são os do Figma; a única arte por NFT vem de quatro ilustrações (ver desvios).
