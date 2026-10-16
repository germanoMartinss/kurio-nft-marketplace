# Rastreabilidade dos requisitos

Checklist de todos os requisitos do [CHALLENGE.md](../CHALLENGE.md), seções 3 a 12. Atualizado ao
final de cada fase.

**Status**: `feito` (implementado e verificado) · `parcial` (implementado em parte, ou sem o teste
exigido) · `pendente`.
**Teste**: arquivo de teste Playwright que cobre o item (`e2e/…`), ou o que verificou o item enquanto
os testes E2E não existem.

Última atualização: Fase 3 (contratos e backend simulado).

## Resumo

| Seção                                         | Itens   | feito  | parcial | pendente |
| --------------------------------------------- | ------- | ------ | ------- | -------- |
| §3 Telas e fluxos                             | 72      | 1      | 31      | 40       |
| §4 Integração e estado                        | 12      | 0      | 5       | 7        |
| §5 Contratos REST                             | 12      | 12     | 0       | 0        |
| §6 Mocking com MSW                            | 27      | 24     | 2       | 1        |
| §7 Tempo real com Socket.IO                   | 11      | 1      | 5       | 5        |
| §8 Interface, responsividade e acessibilidade | 17      | 2      | 9       | 6        |
| §9 Testes com Playwright                      | 19      | 0      | 0       | 19       |
| §10 Performance e Lighthouse                  | 9       | 0      | 0       | 9        |
| §11 Critérios eliminatórios                   | 6       | 0      | 4       | 2        |
| §12 Entrega                                   | 11      | 3      | 5       | 3        |
| **Total**                                     | **196** | **43** | **61**  | **92**   |

## §3 Telas e fluxos

### Telas (tabela do §3)

| ID    | Requisito                                                                                               | Status   | Onde                                           | Teste                                                 |
| ----- | ------------------------------------------------------------------------------------------------------- | -------- | ---------------------------------------------- | ----------------------------------------------------- |
| R3.1  | Início: destaques                                                                                       | pendente |                                                |                                                       |
| R3.2  | Início: catálogo                                                                                        | pendente |                                                |                                                       |
| R3.3  | Início: busca                                                                                           | pendente |                                                |                                                       |
| R3.4  | Início: filtros                                                                                         | pendente |                                                |                                                       |
| R3.5  | Início: ordenação                                                                                       | pendente |                                                |                                                       |
| R3.6  | Início: navegação para o NFT                                                                            | pendente |                                                |                                                       |
| R3.7  | Detalhe: galeria                                                                                        | pendente |                                                |                                                       |
| R3.8  | Detalhe: informações                                                                                    | pendente |                                                |                                                       |
| R3.9  | Detalhe: edição                                                                                         | pendente |                                                |                                                       |
| R3.10 | Detalhe: quantidade                                                                                     | pendente |                                                |                                                       |
| R3.11 | Detalhe: favoritos                                                                                      | pendente |                                                |                                                       |
| R3.12 | Detalhe: compra                                                                                         | pendente |                                                |                                                       |
| R3.13 | Carrinho: edição de quantidades                                                                         | pendente |                                                |                                                       |
| R3.14 | Carrinho: remoção                                                                                       | pendente |                                                |                                                       |
| R3.15 | Carrinho: cupom                                                                                         | pendente |                                                |                                                       |
| R3.16 | Carrinho: resumo de valores                                                                             | pendente |                                                |                                                       |
| R3.17 | Pagamento: dados do colecionador                                                                        | pendente |                                                |                                                       |
| R3.18 | Pagamento: seleção de carteira e rede                                                                   | pendente |                                                |                                                       |
| R3.19 | Pagamento: revisão e envio do pedido                                                                    | pendente |                                                |                                                       |
| R3.20 | Confirmação: resultado, identificação da transação, itens, taxas e total                                | pendente |                                                |                                                       |
| R3.21 | Login: autenticação, validação e retorno ao fluxo anterior                                              | pendente |                                                |                                                       |
| R3.22 | Cadastro: criação de conta, validação e tratamento de conflito                                          | pendente |                                                |                                                       |
| R3.23 | Perfil: edição dos dados, avatar e alteração de senha                                                   | pendente |                                                |                                                       |
| R3.24 | Carteiras: cadastro e edição de carteiras principal e secundária                                        | pendente |                                                |                                                       |
| R3.25 | Frames desktop e mobile disponíveis implementados (9 desktop, 6 mobile)                                 | parcial  | `src/components/layout/`                       | `pnpm screens` (shell: header, footer, barra de abas) |
| R3.26 | Perfil, carteiras e confirmação funcionam em mobile mesmo sem frame                                     | pendente |                                                |                                                       |
| R3.27 | Páginas editoriais, suporte, atividade, ofertas e downloads fora da entrega, com comportamento coerente | parcial  | `src/components/common/unavailable-action.tsx` | verificação manual                                    |
| R3.28 | Ações fora do escopo não aparentam sucesso funcional                                                    | parcial  | `UnavailableAction`, `newsletter-form.tsx`     | verificação manual                                    |

### Catálogo e detalhe

| ID    | Requisito                                                     | Status   | Onde                                                                  | Teste               |
| ----- | ------------------------------------------------------------- | -------- | --------------------------------------------------------------------- | ------------------- |
| R3.29 | Busca, filtros, ordenação e paginação compõem o estado da URL | pendente |                                                                       |                     |
| R3.30 | Esse estado sobrevive a refresh e à navegação pelo histórico  | pendente |                                                                       |                     |
| R3.31 | Filtros combináveis                                           | pendente |                                                                       |                     |
| R3.32 | Mudança de filtro reinicia a paginação                        | pendente |                                                                       |                     |
| R3.33 | Consultas refletem os parâmetros enviados à API               | parcial  | `GET /api/nfts` aplica todos os parâmetros; consulta pela UI pendente | `pnpm verify:mocks` |
| R3.34 | Tratamento de resultado vazio                                 | pendente |                                                                       |                     |
| R3.35 | Tratamento de falhas                                          | pendente |                                                                       |                     |
| R3.36 | Tratamento de respostas fora de ordem                         | parcial  | cenário `fora-de-ordem`; descarte no cliente pendente                 | `pnpm verify:mocks` |
| R3.37 | Detalhe: acesso direto                                        | parcial  | rota `/nft/$nftId` (provisória)                                       | smoke de rotas      |
| R3.38 | Detalhe: NFT inexistente                                      | parcial  | `GET /api/nfts/:id` → 404 `NOT_FOUND`; tela pendente                  | `pnpm verify:mocks` |
| R3.39 | Detalhe: edição indisponível                                  | parcial  | edições com `available: 0` (ex.: Emerald Ape 1/1); tela pendente      | `pnpm verify:mocks` |
| R3.40 | Detalhe: limite de quantidade                                 | parcial  | `maxQuantity` e 409 `AVAILABILITY_CONFLICT` na API; tela pendente     | `pnpm verify:mocks` |
| R3.41 | Favoritos persistem para o usuário autenticado                | parcial  | favoritos persistidos por usuário na API; tela pendente               | `pnpm verify:mocks` |

### Carrinho

| ID    | Requisito                                                                                    | Status  | Onde                                                                             | Teste               |
| ----- | -------------------------------------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------- | ------------------- |
| R3.42 | Adicionar, alterar e remover itens respeitando a disponibilidade por NFT e edição            | parcial | regras de disponibilidade por NFT e edição na API; tela pendente                 | `pnpm verify:mocks` |
| R3.43 | Carrinho mantido após refresh                                                                | parcial | carrinho persistido na API (usuário e visitante via `X-Guest-Id`); tela pendente | `pnpm verify:mocks` |
| R3.44 | Itens do visitante preservados ao autenticar                                                 | parcial | `POST /api/cart/merge`; chamada no login pendente                                | `pnpm verify:mocks` |
| R3.45 | Aplicar e remover cupom; tratar código inválido ou expirado                                  | parcial | `PUT/DELETE /api/cart/coupon` (`KURIO10`, `GENESIS10` expirado); tela pendente   | `pnpm verify:mocks` |
| R3.46 | Subtotal, desconto, taxa de rede e total coerentes com a resposta da API                     | parcial | resumo calculado na API com big.js; tela pendente                                | `pnpm verify:mocks` |
| R3.47 | Alterações de preço e disponibilidade refletidas com o carrinho aberto                       | parcial | avisos `preco-alterado`/`indisponivel` e `nft.updated`; tela pendente            | `pnpm verify:mocks` |
| R3.48 | ETH como strings decimais, com precisão nos cálculos e na apresentação; quantidades inteiras | parcial | contratos com `ethAmountSchema`; `src/lib/money.ts` (big.js); exibição pendente  | `pnpm verify:mocks` |
| R3.49 | A cotação da API é a referência para finalizar o pedido                                      | parcial | `POST /api/quotes`; pedido só a partir de cotação válida                         | `pnpm verify:mocks` |

### Pagamento e confirmação

| ID    | Requisito                                                                                            | Status   | Onde                                                                        | Teste                                                   |
| ----- | ---------------------------------------------------------------------------------------------------- | -------- | --------------------------------------------------------------------------- | ------------------------------------------------------- |
| R3.50 | Validar os campos do layout e permitir revisão antes do envio                                        | pendente |                                                                             |                                                         |
| R3.51 | Usar as carteiras cadastradas, com seleção de rede                                                   | pendente |                                                                             |                                                         |
| R3.52 | Simular conexão, recusa e desconexão da carteira                                                     | parcial  | `POST /api/wallets/:id/connect                                              | disconnect`, cenário `carteira-recusada`; tela pendente | `pnpm verify:mocks` |
| R3.53 | Revalidar preço, disponibilidade, cupom e taxas antes de confirmar; mudanças exigem nova confirmação | parcial  | `409 QUOTE_STALE` com as mudanças; nova confirmação na tela pendente        | `pnpm verify:mocks`                                     |
| R3.54 | Impedir pedidos duplicados em cliques repetidos                                                      | pendente |                                                                             |                                                         |
| R3.55 | Impedir pedidos duplicados em reenvios após timeout                                                  | parcial  | idempotência na API e cenário `timeout-pedido`; reenvio no cliente pendente | `pnpm verify:mocks`                                     |
| R3.56 | Representar pedido pendente, confirmado e recusado                                                   | parcial  | estados `pendente`/`confirmado`/`recusado` na API; tela pendente            | `pnpm verify:mocks`                                     |
| R3.57 | Recuperar o pedido após refresh ou reconexão                                                         | parcial  | pagamento simulado retomado após refresh; recuperação na tela pendente      | `pnpm verify:mocks`                                     |
| R3.58 | Exibir a confirmação somente para pedido efetivamente confirmado na simulação                        | parcial  | só a simulação confirma pedidos; tela pendente                              | `pnpm verify:mocks`                                     |
| R3.59 | Preservar os itens em falhas                                                                         | parcial  | recusa não altera o carrinho                                                | `pnpm verify:mocks`                                     |
| R3.60 | Após confirmação, remover do carrinho apenas os itens e quantidades comprados                        | parcial  | `removePurchased` na confirmação                                            | `pnpm verify:mocks`                                     |
| R3.61 | Recibo reproduz o snapshot do pedido; alterações posteriores no catálogo não o modificam             | parcial  | pedido guarda snapshot da cotação                                           | `pnpm verify:mocks`                                     |
| R3.62 | Referências de transação e links de exploração simulados                                             | parcial  | hash de transação e link de explorador simulados                            | `pnpm verify:mocks`                                     |

### Conta e sessão

| ID    | Requisito                                                                                | Status   | Onde                                                                                | Teste               |
| ----- | ---------------------------------------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------- | ------------------- |
| R3.63 | Cadastro, login, logout e sessão integrados à API simulada                               | parcial  | `/api/auth/*`; telas pendentes                                                      | `pnpm verify:mocks` |
| R3.64 | Checkout, perfil, carteiras, favoritos e pedidos exigem autenticação                     | pendente |                                                                                     |                     |
| R3.65 | Sessão recuperável após refresh                                                          | pendente |                                                                                     |                     |
| R3.66 | Expiração tratada durante a navegação, preservando o contexto para retomada              | pendente |                                                                                     |                     |
| R3.67 | Expiração tratada durante o checkout, preservando o contexto para retomada               | pendente |                                                                                     |                     |
| R3.68 | Logout e troca de usuário limpam dados privados em cache                                 | pendente |                                                                                     |                     |
| R3.69 | Logout e troca de usuário encerram as subscriptions da sessão anterior                   | pendente |                                                                                     |                     |
| R3.70 | Validação dos formulários de cadastro, perfil, senha e carteiras, incluindo erros da API | parcial  | validação e erros por campo na API (`fieldErrors`); formulários pendentes           | `pnpm verify:mocks` |
| R3.71 | Alterações confirmadas permanecem após refresh                                           | parcial  | alterações persistidas no banco simulado; telas pendentes                           | `pnpm verify:mocks` |
| R3.72 | Credenciais fictícias; senhas não armazenadas em claro                                   | feito    | senhas só em hash PBKDF2 (fixtures e banco); credenciais fictícias em `docs/API.md` | `pnpm verify:mocks` |

## §4 Integração e estado

| ID    | Requisito                                                                       | Status   | Onde                                                                                    | Teste                           |
| ----- | ------------------------------------------------------------------------------- | -------- | --------------------------------------------------------------------------------------- | ------------------------------- |
| R4.1  | TanStack Router nas rotas, parâmetros de busca e proteção dos fluxos privados   | parcial  | `src/routes/` (rotas criadas; search params e proteção pendentes)                       |                                 |
| R4.2  | TanStack Query nas consultas, mutations e sincronização do cache                | parcial  | `src/app/query-client.ts` (só a consulta de diagnóstico)                                |                                 |
| R4.3  | Chamadas REST via Axios                                                         | parcial  | `src/api/` (todas as rotas via Axios); uso nas telas pendente                           |                                 |
| R4.4  | Contratos tipados entre transporte, estado e interface                          | parcial  | `src/contracts/` validados em `src/api/` e nos mocks; estado e interface pendentes      | typecheck + `pnpm verify:mocks` |
| R4.5  | Estados de carregamento, vazio, erro, sucesso e atualização em segundo plano    | pendente |                                                                                         |                                 |
| R4.6  | Invalidação coerente após mutations e eventos                                   | pendente |                                                                                         |                                 |
| R4.7  | Cancelamento ou descarte de respostas obsoletas                                 | pendente |                                                                                         |                                 |
| R4.8  | Isolamento dos dados por usuário e pelos parâmetros da consulta                 | pendente |                                                                                         |                                 |
| R4.9  | Recuperação de falhas sem duplicar operações                                    | parcial  | idempotência de pedidos e retry só para falhas transitórias (`src/app/query-client.ts`) | `pnpm verify:mocks`             |
| R4.10 | Tratamento de rotas inexistentes e acesso direto a qualquer tela prevista       | pendente | 404 e rotas provisórias existem; telas reais pendentes                                  | smoke de rotas                  |
| R4.11 | Atualização otimista em pelo menos uma interação, com rollback em caso de falha | pendente |                                                                                         |                                 |
| R4.12 | Política de cache, retries e sincronização documentada                          | pendente |                                                                                         |                                 |

## §5 Contratos REST

| ID    | Requisito                                                                                                                   | Status | Onde                                                                   | Teste               |
| ----- | --------------------------------------------------------------------------------------------------------------------------- | ------ | ---------------------------------------------------------------------- | ------------------- |
| R5.1  | Contratos definidos e documentados                                                                                          | feito  | `src/contracts/`, `docs/API.md`                                        | `pnpm verify:mocks` |
| R5.2  | Sessão e conta: cadastro, login, consulta da sessão, logout e expiração                                                     | feito  | `src/mocks/handlers/auth.ts`                                           | `pnpm verify:mocks` |
| R5.3  | NFTs: listagem com busca/filtros/ordenação/paginação e detalhe por identificador                                            | feito  | `src/mocks/handlers/nfts.ts`, `domain/catalog.ts`                      | `pnpm verify:mocks` |
| R5.4  | Favoritos: consulta, inclusão e remoção                                                                                     | feito  | `src/mocks/handlers/favorites.ts`                                      | `pnpm verify:mocks` |
| R5.5  | Carrinho: consulta, inclusão, alteração e remoção de itens                                                                  | feito  | `src/mocks/handlers/cart.ts`, `domain/cart.ts`                         | `pnpm verify:mocks` |
| R5.6  | Cotação: validação de cupom, disponibilidade, descontos, taxas e total                                                      | feito  | `POST /api/quotes`, `domain/orders.ts`                                 | `pnpm verify:mocks` |
| R5.7  | Pedidos: criação idempotente e consulta do estado e recibo                                                                  | feito  | `POST/GET /api/orders`, `domain/orders.ts`                             | `pnpm verify:mocks` |
| R5.8  | Perfil: consulta, atualização de dados/avatar e alteração de senha                                                          | feito  | `src/mocks/handlers/profile.ts`                                        | `pnpm verify:mocks` |
| R5.9  | Carteiras: consulta, cadastro e atualização                                                                                 | feito  | `src/mocks/handlers/wallets.ts`                                        | `pnpm verify:mocks` |
| R5.10 | Erros: validação, sessão inválida, falta de permissão, recurso inexistente, conflito de disponibilidade e falha transitória | feito  | formato único de erro (`contracts/common.ts`); tabela em `docs/API.md` | `pnpm verify:mocks` |
| R5.11 | Mutations de pedido aceitam chave de idempotência; a mesma tentativa recupera o mesmo pedido                                | feito  | `Idempotency-Key` em `POST /api/orders`                                | `pnpm verify:mocks` |
| R5.12 | Reutilizar a chave com conteúdo diferente gera conflito                                                                     | feito  | `409 IDEMPOTENCY_CONFLICT` (hash canônico do corpo)                    | `pnpm verify:mocks` |

## §6 Mocking com MSW

| ID    | Requisito                                                                                      | Status   | Onde                                                                                 | Teste                                                       |
| ----- | ---------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| R6.1  | Mocks na camada de rede                                                                        | feito    | `src/mocks/` (REST e socket)                                                         | `pnpm verify:mocks`                                         |
| R6.2  | Contratos e cenários reutilizados entre desenvolvimento, demonstração e testes                 | parcial  | mesmos handlers em dev e demo; uso nos testes E2E pendente                           | `pnpm verify:mocks`                                         |
| R6.3  | Componentes, hooks e cliente Axios sem respostas fictícias ou caminhos alternativos de negócio | parcial  | regra seguida até aqui; verificação final pendente                                   | revisão de código                                           |
| R6.4  | Estado consistente entre catálogo, favoritos, carrinho, perfil, carteiras e pedidos            | feito    | estado único em `src/mocks/db/`; eventos publicados a cada alteração                 | `pnpm verify:mocks`                                         |
| R6.5  | Persistência local para sustentar refresh                                                      | feito    | `localStorage` (`kurio:mock:db`)                                                     | `pnpm verify:mocks`                                         |
| R6.6  | Reset restaura integralmente um cenário conhecido                                              | feito    | `?reset=1`, painel `/mocks`, `__kurioMock.reset()`                                   | `pnpm verify:mocks`                                         |
| R6.7  | Simulação de lentidão                                                                          | feito    | cenário `lento`                                                                      | `pnpm verify:mocks`                                         |
| R6.8  | Simulação de latência variável                                                                 | feito    | cenário `latencia-variavel` (PRNG com semente)                                       |                                                             |
| R6.9  | Simulação de timeouts                                                                          | feito    | cenários `timeout` e `timeout-pedido`                                                | `pnpm verify:mocks`                                         |
| R6.10 | Simulação de indisponibilidade de conexão                                                      | feito    | cenário `offline`                                                                    | `pnpm verify:mocks`                                         |
| R6.11 | Simulação de respostas HTTP de erro                                                            | feito    | cenários `erro-servidor`, `instavel`, `nao-encontrado`, `acesso-negado`              | `pnpm verify:mocks`                                         |
| R6.12 | Cenários configuráveis e reproduzíveis                                                         | feito    | `?cenario=<id>` ou painel `/mocks`; definições em `src/mocks/scenarios/`             | `pnpm verify:mocks`                                         |
| R6.13 | Fixtures com variedade para filtros e paginação; pelo menos dois usuários                      | feito    | 36 NFTs, 9 categorias, 3 redes, 2 usuários (`src/mocks/fixtures/`)                   | `pnpm verify:mocks`                                         |
| R6.14 | Cenário: sucesso e resultado vazio                                                             | feito    | `padrao` e `catalogo-vazio`                                                          | `pnpm verify:mocks`                                         |
| R6.15 | Cenário: latência variável e respostas fora de ordem                                           | feito    | `latencia-variavel` e `fora-de-ordem`                                                | `pnpm verify:mocks`                                         |
| R6.16 | Cenário: falhas de conexão e respostas HTTP 4xx/5xx                                            | feito    | `offline`, `erro-servidor`, `instavel`                                               | `pnpm verify:mocks`                                         |
| R6.17 | Cenário: sessão expirada e acesso não autorizado                                               | feito    | `sessao-expirada`, `acesso-negado`, `__kurioMock.session.expireAll()`                | `pnpm verify:mocks`                                         |
| R6.18 | Cenário: conflito de cadastro ou de validação de formulário                                    | feito    | e-mail/usuário existente (409) e usuário reservado (422)                             | `pnpm verify:mocks`                                         |
| R6.19 | Cenário: cupom inválido ou expirado                                                            | feito    | `GENESIS10` (expirado) e códigos inválidos                                           | `pnpm verify:mocks`                                         |
| R6.20 | Cenário: preço alterado ou edição esgotada durante a compra                                    | feito    | `preco-alterado` e `edicao-esgotada`                                                 | `pnpm verify:mocks`                                         |
| R6.21 | Cenário: timeout após criação do pedido, com recuperação por idempotência                      | feito    | `timeout-pedido`                                                                     | `pnpm verify:mocks`                                         |
| R6.22 | Cenário: pagamento confirmado e pagamento recusado                                             | feito    | `padrao` (confirmado) e `pagamento-recusado`                                         | `pnpm verify:mocks`                                         |
| R6.23 | Eventos simulados com MSW e integração compatível com Socket.IO (@mswjs/socket.io-binding)     | feito    | `src/mocks/socket/server.ts`                                                         | smoke de produção (ping/pong, queda e reconexão, heartbeat) |
| R6.24 | Transporte e limitações documentados                                                           | feito    | ARCHITECTURE.md › Limitações do transporte                                           |                                                             |
| R6.25 | Cenários exercitam o socket.io-client (sem setters, callbacks ou cache direto)                 | pendente |                                                                                      |                                                             |
| R6.26 | Camada de mocks ativada por configuração e disponível no build de demonstração                 | feito    | `VITE_ENABLE_MOCKS` (padrão `true`); cenários e reset disponíveis no build publicado | smoke de produção, `pnpm verify:mocks`                      |
| R6.27 | Mudanças nos dados simulados refletidas nas respostas REST e nos eventos                       | feito    | `domain/events.ts`: toda alteração de NFT ou pedido publica o evento                 | `pnpm verify:mocks`                                         |

## §7 Tempo real com Socket.IO

| ID    | Requisito                                                                                                                                  | Status   | Onde                                                                                                       | Teste               |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------- | ---------------------------------------------------------------------------------------------------------- | ------------------- |
| R7.1  | Evento `nft.updated`: preço e disponibilidade no catálogo, detalhe e carrinho                                                              | parcial  | servidor publica `nft.updated`; consumo no cliente pendente                                                | `pnpm verify:mocks` |
| R7.2  | Evento `order.updated`: estado do pedido, com confirmação ou recusa                                                                        | parcial  | servidor publica `order.updated`; consumo no cliente pendente                                              | `pnpm verify:mocks` |
| R7.3  | Eventos com identidade estável, recurso afetado e versão                                                                                   | feito    | envelope `eventId`, `resource`, `version` (`contracts/realtime.ts`)                                        | `pnpm verify:mocks` |
| R7.4  | Tolerar duplicatas e eventos antigos sem regredir estado nem reaplicar efeitos                                                             | pendente |                                                                                                            |                     |
| R7.5  | Reconciliação dos recursos ativos com a API REST após reconexão                                                                            | parcial  | reconexão automática verificada; reconciliação pendente                                                    | smoke de produção   |
| R7.6  | Eventos de uma sessão anterior não atualizam dados de outro usuário                                                                        | parcial  | `order.updated` só para conexões do dono (token resolvido no envio); socket por sessão no cliente pendente |                     |
| R7.7  | Listeners e subscriptions liberados ao fim do ciclo de vida                                                                                | pendente | padrão aplicado no painel de mocks                                                                         |                     |
| R7.8  | Cenário: NFT no carrinho tem preço/disponibilidade alterados durante a navegação                                                           | pendente |                                                                                                            |                     |
| R7.9  | A interface informa a alteração e atualiza o resumo                                                                                        | pendente |                                                                                                            |                     |
| R7.10 | O checkout impede a confirmação com cotação desatualizada                                                                                  | pendente |                                                                                                            |                     |
| R7.11 | Interrupção de conexão com pedido pendente: estado recuperado ao reconectar/recarregar, sem nova compra; confirmado/recusado são terminais | parcial  | pedido pendente sobrevive a refresh na API; tela pendente                                                  | `pnpm verify:mocks` |

## §8 Interface, responsividade e acessibilidade

| ID    | Requisito                                                                                        | Status   | Onde                                                             | Teste           |
| ----- | ------------------------------------------------------------------------------------------------ | -------- | ---------------------------------------------------------------- | --------------- |
| R8.1  | Preservar tipografia, cores, espaçamentos, hierarquia, imagens, proporções e composição do Figma | parcial  | tokens e shell                                                   | `pnpm screens`  |
| R8.2  | Componentes shadcn/ui adaptados à identidade visual                                              | feito    | `src/components/ui/`                                             | `pnpm screens`  |
| R8.3  | Todas as telas em desktop, tablet e mobile; mínimo 390, 768 e 1440px                             | parcial  | shell verificado nas três larguras                               | `pnpm screens`  |
| R8.4  | Skeletons com shimmer em catálogo, detalhe e resumo do carrinho                                  | parcial  | componente `Skeleton`; uso pendente                              |                 |
| R8.5  | Skeletons preservam as dimensões (sem deslocamento de layout)                                    | pendente |                                                                  |                 |
| R8.6  | Respeitar preferência por movimento reduzido                                                     | feito    | `src/styles/index.css`, `Skeleton`                               |                 |
| R8.7  | Navegação por teclado e foco visível                                                             | parcial  | foco global, link "Pular para o conteúdo"                        | smoke (teclado) |
| R8.8  | Controle de foco em diálogos e drawers                                                           | parcial  | Radix Dialog/Sheet; uso pendente                                 |                 |
| R8.9  | Semântica adequada, labels e mensagens de erro associadas aos campos                             | parcial  | newsletter; demais formulários pendentes                         |                 |
| R8.10 | Alternativas textuais para imagens relevantes                                                    | pendente |                                                                  |                 |
| R8.11 | Contraste legível                                                                                | pendente | auditoria pendente                                               |                 |
| R8.12 | Estados não dependentes apenas de cor                                                            | pendente |                                                                  |                 |
| R8.13 | Feedback acessível para mutations                                                                | pendente |                                                                  |                 |
| R8.14 | Feedback acessível para alterações em tempo real                                                 | pendente |                                                                  |                 |
| R8.15 | Sem overflow horizontal indevido nem perda de conteúdo com zoom                                  | parcial  | sem overflow no shell                                            | `pnpm screens`  |
| R8.16 | Usar os assets do arquivo; imagens e fontes acessíveis à execução local                          | parcial  | ícones e imagens do Figma em `public/assets/`; fonte self-hosted |                 |
| R8.17 | Documentar substituições de assets e ajustes de acessibilidade em relação ao layout              | parcial  | ARCHITECTURE.md (ícones)                                         |                 |

## §9 Testes com Playwright

| ID    | Requisito                                                                                             | Status   | Onde                         | Teste |
| ----- | ----------------------------------------------------------------------------------------------------- | -------- | ---------------------------- | ----- |
| R9.1  | Busca, filtros combinados, ordenação, paginação e restauração pelo histórico                          | pendente |                              |       |
| R9.2  | Acesso direto ao detalhe e tratamento de recurso inexistente                                          | pendente |                              |       |
| R9.3  | Cadastro, login, expiração de sessão, logout e troca de usuário                                       | pendente |                              |       |
| R9.4  | Favoritos, incluindo falha de mutation e recuperação do estado                                        | pendente |                              |       |
| R9.5  | Carrinho, quantidades, remoção, cupom e persistência após refresh/login                               | pendente |                              |       |
| R9.6  | Compra completa, do catálogo ao recibo confirmado                                                     | pendente |                              |       |
| R9.7  | Falha de pagamento, clique repetido e timeout com recuperação do mesmo pedido                         | pendente |                              |       |
| R9.8  | Edição de perfil, avatar, senha e carteiras, com erros de validação                                   | pendente |                              |       |
| R9.9  | Alteração de preço/disponibilidade via Socket.IO durante o checkout                                   | pendente |                              |       |
| R9.10 | Eventos duplicados ou antigos, desconexão e retomada de pedido pendente                               | pendente |                              |       |
| R9.11 | Navegação por teclado, foco de diálogos e validação de formulários                                    | pendente |                              |       |
| R9.12 | Skeletons durante carregamento lento, feedback de falha e recuperação após nova tentativa             | pendente |                              |       |
| R9.13 | Fluxos principais em Chromium, nos viewports desktop e mobile                                         | pendente | `@playwright/test` instalado |       |
| R9.14 | Regressão visual de início, detalhe, carrinho e pagamento, com baselines versionadas e dados estáveis | pendente |                              |       |
| R9.15 | Cada teste parte de um estado isolado                                                                 | pendente |                              |       |
| R9.16 | Controle de relógio, latência e disparo de eventos nos cenários sensíveis a tempo                     | pendente |                              |       |
| R9.17 | Relatório HTML e traces das falhas                                                                    | pendente |                              |       |
| R9.18 | Verificações observam a interface e os resultados das operações                                       | pendente |                              |       |
| R9.19 | Tempo real passa pelo cliente Socket.IO; REST pelos handlers MSW                                      | pendente |                              |       |

## §10 Performance e Lighthouse

| ID    | Requisito                                                                                           | Status   | Onde | Teste |
| ----- | --------------------------------------------------------------------------------------------------- | -------- | ---- | ----- |
| R10.1 | Auditar início e detalhe em perfis mobile e desktop, com build otimizado e cenário padrão dos mocks | pendente |      |       |
| R10.2 | Performance ≥ 90                                                                                    | pendente |      |       |
| R10.3 | Accessibility ≥ 95                                                                                  | pendente |      |       |
| R10.4 | Best Practices ≥ 95                                                                                 | pendente |      |       |
| R10.5 | SEO ≥ 90                                                                                            | pendente |      |       |
| R10.6 | Três medições por página e perfil, mediana de cada categoria                                        | pendente |      |       |
| R10.7 | Configuração versionada; relatórios HTML/JSON; versões das ferramentas, ambiente e condições        | pendente |      |       |
| R10.8 | Registrar LCP, CLS e TBT; justificar resultados abaixo das metas                                    | pendente |      |       |
| R10.9 | Auditoria com imagens, fontes e funcionalidades reais, sem simplificações para pontuar              | pendente |      |       |

## §11 Critérios eliminatórios

| ID    | Requisito                                           | Status   | Onde                                                                      | Teste               |
| ----- | --------------------------------------------------- | -------- | ------------------------------------------------------------------------- | ------------------- |
| R11.1 | Uso efetivo de toda a stack obrigatória             | parcial  | todas instaladas e configuradas; uso efetivo nos fluxos pendente          |                     |
| R11.2 | Nenhum fluxo principal apenas visual                | pendente |                                                                           |                     |
| R11.3 | Compra confirmada somente com resposta da simulação | parcial  | pedido só é confirmado pela simulação (`domain/orders.ts`); tela pendente | `pnpm verify:mocks` |
| R11.4 | Nenhuma exposição de dados entre usuários           | parcial  | pedidos e eventos isolados por usuário na API; cache por usuário pendente | `pnpm verify:mocks` |
| R11.5 | Eventos nunca simulados diretamente na UI           | parcial  | eventos só saem do servidor simulado (`src/mocks/socket`)                 | smoke de produção   |
| R11.6 | Testes E2E executáveis                              | pendente |                                                                           |                     |

## §12 Entrega

| ID     | Requisito                                                                                                                  | Status   | Onde                                                                                    | Teste           |
| ------ | -------------------------------------------------------------------------------------------------------------------------- | -------- | --------------------------------------------------------------------------------------- | --------------- |
| R12.1  | Código-fonte, lockfile, assets, mocks, fixtures, testes e configurações de auditoria                                       | parcial  | código, lockfile, assets, mocks e fixtures versionados; testes e auditoria pendentes    |                 |
| R12.2  | Deploy público (Vercel)                                                                                                    | feito    | https://kurio-nft-marketplace-iota.vercel.app                                           | smoke na Vercel |
| R12.3  | Versão publicada corresponde ao código, com mocks e tempo real funcionando                                                 | parcial  | deploy por push na `main`                                                               | smoke na Vercel |
| R12.4  | Acesso direto e refresh das rotas no ambiente publicado                                                                    | feito    | `vercel.json`                                                                           | smoke na Vercel |
| R12.5  | README: setup, variáveis de ambiente, credenciais fictícias, seleção e reset de cenários, comandos e reprodução das falhas | pendente |                                                                                         |                 |
| R12.6  | Documentar contratos REST e eventos                                                                                        | feito    | `docs/API.md`                                                                           |                 |
| R12.7  | Documentar política de sessão                                                                                              | parcial  | ARCHITECTURE.md › Sessão                                                                |                 |
| R12.8  | Documentar estado do carrinho, estratégia de cache e reconciliação REST + Socket.IO                                        | pendente |                                                                                         |                 |
| R12.9  | ARCHITECTURE.md com limitações, decisões de UX e desvios do Figma                                                          | parcial  | ARCHITECTURE.md                                                                         |                 |
| R12.10 | Comandos: dev com mocks, build, preview, typecheck, lint, testes Playwright e Lighthouse                                   | parcial  | dev, build, preview, typecheck, lint, `verify:mocks`; Playwright e Lighthouse pendentes |                 |
| R12.11 | Execução a partir de um checkout limpo, sem serviços privados nem backend de produção                                      | pendente | verificado na Fase 1; reverificar no fim                                                |                 |
