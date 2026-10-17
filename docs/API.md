# Contratos da API (REST e Socket.IO)

A fonte da verdade são os schemas Zod em [`src/contracts/`](../src/contracts), usados pelo cliente
(`src/api/`, que valida toda resposta) e pela API simulada (`src/mocks/`, que valida todo corpo
recebido). Este documento resume os contratos; os tipos exatos estão nos arquivos indicados.

## Convenções

- Base: `/api` (`VITE_API_BASE_URL`). JSON em requisições e respostas.
- **Valores em ETH são strings decimais** (`"1.19"`, `"26.846"`), nunca `number`. Quantidades são inteiras.
- Sessão: `Authorization: Bearer <token>` (token opaco devolvido por login e cadastro).
- Visitante: `X-Guest-Id: <uuid>` identifica o carrinho sem login (gerado e guardado pelo cliente).
- Pedidos: `Idempotency-Key: <chave>` obrigatório em `POST /api/orders`.
- Datas em ISO 8601 (UTC).

### Erros

Formato único ([`common.ts`](../src/contracts/common.ts)):

```json
{
  "error": {
    "code": "VALIDATION",
    "message": "Revise os campos destacados.",
    "fieldErrors": { "email": "Informe um e-mail válido." },
    "details": {}
  }
}
```

| HTTP | `code`                                                      | Quando                                                                       |
| ---- | ----------------------------------------------------------- | ---------------------------------------------------------------------------- |
| 422  | `VALIDATION`, `COUPON_INVALID`, `COUPON_EXPIRED`            | Corpo inválido (com `fieldErrors` por campo), cupom inválido ou expirado     |
| 401  | `UNAUTHENTICATED`, `SESSION_EXPIRED`, `INVALID_CREDENTIALS` | Sem sessão ou sessão inválida, sessão expirada, login incorreto              |
| 403  | `FORBIDDEN`                                                 | Sem permissão (cenário `acesso-negado`)                                      |
| 404  | `NOT_FOUND`                                                 | Recurso inexistente (pedido de outro usuário também responde 404)            |
| 409  | `EMAIL_TAKEN`, `USERNAME_TAKEN`                             | Conflito de cadastro ou de perfil (com `fieldErrors`)                        |
| 409  | `AVAILABILITY_CONFLICT`                                     | Quantidade acima da disponibilidade (`details.maxQuantity`) ou item esgotado |
| 409  | `QUOTE_EXPIRED`, `QUOTE_STALE`                              | Cotação vencida ou desatualizada (`details.changes`: o que mudou)            |
| 409  | `IDEMPOTENCY_CONFLICT`                                      | Chave de idempotência reutilizada com outro corpo                            |
| 409  | `WALLET_REJECTED`                                           | Conexão de carteira recusada                                                 |
| 409  | `NETWORK_MISMATCH`                                          | Carteira do pedido é de outra rede que a cotação                             |
| 409  | `WALLET_DISCONNECTED`                                       | Pedido com carteira não conectada                                            |
| 5xx  | `TRANSIENT`                                                 | Falha transitória (pode ser repetida)                                        |

No cliente, toda falha vira `ApiRequestError` (`src/api/errors.ts`), incluindo `NETWORK` (sem
conexão) e `TIMEOUT` (10s).

## Endpoints

| Recurso        | Método e caminho                                                        | Corpo → resposta                                                                                                                                                                                                                                            | Contrato       |
| -------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| Sistema        | `GET /health`                                                           | → `{ status, serverTime, scenario }`                                                                                                                                                                                                                        | `system.ts`    |
|                | `POST /newsletter`                                                      | `{ email }` → `{ email, alreadySubscribed }` (201/200, idempotente)                                                                                                                                                                                         | `system.ts`    |
| Sessão e conta | `POST /auth/register`                                                   | `{ username, email, password }` → `AuthSession` (201)                                                                                                                                                                                                       | `auth.ts`      |
|                | `POST /auth/login`                                                      | `{ email, password }` → `AuthSession`                                                                                                                                                                                                                       | `auth.ts`      |
|                | `GET /auth/session`                                                     | → `{ expiresAt, user }` ou 401                                                                                                                                                                                                                              | `auth.ts`      |
|                | `POST /auth/logout`                                                     | → 204 (idempotente)                                                                                                                                                                                                                                         |                |
| NFTs           | `GET /nfts`                                                             | query: `q`, `categories`, `networks` (listas com vírgula), `minPrice`, `maxPrice`, `tab` (`todos`/`novos`/`em-alta`), `sort` (`recentes`/`menor-preco`/`maior-preco`/`nome`), `collection`, `page`, `pageSize` → `CatalogPage` (itens, paginação e facetas) | `nft.ts`       |
|                | `GET /nfts/highlights`                                                  | → `{ hero, featured }`                                                                                                                                                                                                                                      | `nft.ts`       |
|                | `GET /nfts/:id`                                                         | → `NftDetail` (com edições e disponibilidade)                                                                                                                                                                                                               | `nft.ts`       |
| Favoritos      | `GET /favorites` · `PUT /favorites/:nftId` · `DELETE /favorites/:nftId` | → `{ nftIds }` (PUT e DELETE idempotentes)                                                                                                                                                                                                                  | `favorites.ts` |
| Carrinho       | `GET /cart?network=`                                                    | → `Cart` (itens, avisos e resumo de valores)                                                                                                                                                                                                                | `cart.ts`      |
|                | `POST /cart/items`                                                      | `{ nftId, editionId, quantity }` → `Cart` (soma à quantidade existente)                                                                                                                                                                                     | `cart.ts`      |
|                | `PATCH /cart/items/:itemId` · `DELETE /cart/items/:itemId`              | `{ quantity }` → `Cart` (`itemId` = `nftId:editionId`)                                                                                                                                                                                                      | `cart.ts`      |
|                | `PUT /cart/coupon` · `DELETE /cart/coupon`                              | `{ code }` → `Cart`                                                                                                                                                                                                                                         | `cart.ts`      |
|                | `POST /cart/notices/ack`                                                | → `Cart` (avisos reconhecidos; preço atual vira referência)                                                                                                                                                                                                 | `cart.ts`      |
|                | `POST /cart/merge`                                                      | `{ guestId }` → `{ cart, adjusted }` (privado)                                                                                                                                                                                                              | `cart.ts`      |
| Cotação        | `POST /quotes`                                                          | `{ network }` → `Quote` (congela preços, cupom e taxa; vale 5 min)                                                                                                                                                                                          | `order.ts`     |
| Pedidos        | `POST /orders`                                                          | `Idempotency-Key` + `{ quoteId, walletId, provider, buyer }` → `Order` (201; 200 em reenvio)                                                                                                                                                                | `order.ts`     |
|                | `GET /orders?status=` · `GET /orders/:id`                               | → `{ items }` · `Order` (snapshot imutável)                                                                                                                                                                                                                 | `order.ts`     |
| Perfil         | `GET /profile` · `PATCH /profile`                                       | `ProfileUpdate` → `Profile`                                                                                                                                                                                                                                 | `profile.ts`   |
|                | `PUT /profile/avatar` · `DELETE /profile/avatar`                        | `{ dataUrl }` (PNG/JPEG/WebP, até 1 MB) → `Profile`                                                                                                                                                                                                         | `profile.ts`   |
|                | `POST /profile/password`                                                | `{ currentPassword, newPassword }` → 204 (encerra as outras sessões)                                                                                                                                                                                        | `profile.ts`   |
| Carteiras      | `GET /wallets` · `POST /wallets` · `PUT /wallets/:id`                   | `WalletInput` (+ `kind` no POST) → `Wallet`; a listagem inclui `connected`                                                                                                                                                                                  | `wallet.ts`    |
|                | `POST /wallets/:id/connect` · `POST /wallets/:id/disconnect`            | → `{ walletId, status }` (simulação da extensão; estado guardado na API; 404 para carteira de outro usuário)                                                                                                                                                | `wallet.ts`    |

Todas as rotas de favoritos, cotação, pedidos, perfil, carteiras e `POST /cart/merge` exigem sessão.
O carrinho funciona com sessão (carrinho do usuário) ou com `X-Guest-Id` (carrinho do visitante).

### Regras de negócio relevantes

- **Disponibilidade**: por NFT e edição. Máximo por item = menor entre o disponível e 10 por pedido.
  Se a disponibilidade cair, a API reduz a quantidade e marca o item com `quantidade-ajustada`;
  edição esgotada fica com `indisponivel` e sai dos totais.
- **Preço**: o carrinho guarda o preço que o usuário viu. Se mudar, o item traz `preco-alterado` e
  `previousUnitPrice` até `POST /cart/notices/ack`.
- **Totais**: `subtotal` (itens disponíveis) − `discount` (cupom) + `networkFee` (taxa da rede:
  Ethereum 0.016, Polygon 0.002, Solana 0.001) = `total`. Calculados com big.js na API.
- **Cupons**: `KURIO10` (10%) válido; `GENESIS10` expirado; outros, inválidos.
- **Pedido**: só é criado a partir de uma cotação válida. Se preço, disponibilidade ou cupom mudaram
  desde a cotação, a resposta é `409 QUOTE_STALE` com as mudanças, e a interface pede nova confirmação.
- **Idempotência**: mesma `Idempotency-Key` + mesmo corpo → o mesmo pedido (200, header
  `Idempotent-Replayed`); mesma chave com outro corpo → `409 IDEMPOTENCY_CONFLICT`.
- **Pagamento simulado**: o pedido nasce `pendente` e termina `confirmado` ou `recusado` (estados
  terminais). Na confirmação, a disponibilidade é baixada (com `nft.updated`) e só os itens e as
  quantidades comprados saem do carrinho. Na recusa, o carrinho fica intacto.

## Eventos Socket.IO

Conexão em `path: '/realtime/'`, `transports: ['websocket']`, com o token no handshake
(`auth: { token }`). Contratos em [`realtime.ts`](../src/contracts/realtime.ts).

Envelope comum: `{ eventId, type, occurredAt, resource: { type, id }, version, payload }`.

| Evento          | Destinatários                                                    | `payload`                                                            |
| --------------- | ---------------------------------------------------------------- | -------------------------------------------------------------------- |
| `nft.updated`   | Todas as conexões                                                | `{ price, previousPrice, available, editions: [{ id, available }] }` |
| `order.updated` | Só as conexões cuja sessão pertence ao dono do pedido (`userId`) | `{ status, failureReason }`                                          |

`eventId` é estável (um reenvio do mesmo evento tem o mesmo id) e `version` acompanha a versão do
recurso no REST (`NftSummary.version`, `Order.version`). O cliente descarta eventos já vistos e
eventos com versão menor ou igual à conhecida.

## Cenários da API simulada

Selecionados por `?cenario=<id>` (em qualquer URL da aplicação) ou no painel `/mocks`;
`?reset=1` restaura os dados iniciais. Definições em
[`src/mocks/scenarios/definitions.ts`](../src/mocks/scenarios/definitions.ts).

| Id                     | Efeito                                                                                          |
| ---------------------- | ----------------------------------------------------------------------------------------------- |
| `padrao`               | Tudo funciona, latência de 60ms.                                                                |
| `catalogo-vazio`       | Catálogo sem NFTs.                                                                              |
| `lento`                | Respostas em 2,5s.                                                                              |
| `latencia-variavel`    | 200ms a 1,8s, sequência reproduzível (PRNG com semente).                                        |
| `fora-de-ordem`        | Consultas ímpares do catálogo levam 1,5s; pares, 150ms.                                         |
| `offline`              | Erro de rede em todo o REST; socket recusado.                                                   |
| `timeout`              | Primeira requisição de cada rota passa do timeout do cliente.                                   |
| `erro-servidor`        | `GET /nfts` sempre 500.                                                                         |
| `instavel`             | Duas primeiras leituras de `/nfts*` respondem 503.                                              |
| `nao-encontrado`       | Detalhe de NFT sempre 404.                                                                      |
| `sessao-expirada`      | Sessões expiram 20s após o login.                                                               |
| `acesso-negado`        | Rotas privadas respondem 403.                                                                   |
| `preco-alterado`       | 4s após abrir o carrinho com itens, o preço do primeiro item sobe 15% (`nft.updated`).          |
| `edicao-esgotada`      | 4s após abrir o carrinho com itens, a edição do primeiro item esgota (`nft.updated`).           |
| `favoritos-falham`     | A primeira inclusão de favorito responde 503 (a interface reverte); a segunda funciona.         |
| `timeout-pedido`       | O pedido é criado, mas a primeira resposta passa do timeout; o reenvio recupera o mesmo pedido. |
| `pagamento-recusado`   | Pedidos terminam recusados.                                                                     |
| `pagamento-lento`      | Pagamento leva 12s (queda de conexão com pedido pendente).                                      |
| `carteira-recusada`    | Conexão de carteira recusada.                                                                   |
| `cotacao-expirada`     | Cotações valem 4s; o pedido vencido responde `QUOTE_EXPIRED`.                                   |
| `requisicao-duplicada` | `POST /orders` leva 2s: janela para requisições repetidas com a mesma chave.                    |
| `pendente-confirma`    | Pedido pendente por 3s e confirmado (`order.updated`).                                          |
| `pendente-recusa`      | Pedido pendente por 3s e recusado (`order.updated`).                                            |

### Controle para testes (`window.__kurioMock`)

Disponível com os mocks ativos. Age sobre o **backend simulado** (banco e servidor de socket),
nunca sobre a interface:

| Chamada                                                         | Efeito                                                                   |
| --------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `scenarios.list()` · `scenarios.active()` · `scenarios.set(id)` | Consulta e troca o cenário                                               |
| `reset()`                                                       | Restaura o seed e limpa o estado do cliente (`kurio:app:*`)              |
| `nft.update(id, { price?, editions? })`                         | Altera o catálogo, incrementa a versão e publica `nft.updated`           |
| `session.expireAll()`                                           | Expira as sessões: a próxima requisição privada recebe `SESSION_EXPIRED` |
| `realtime.disconnectAll()`                                      | Derruba os sockets pelo servidor (o cliente reconecta)                   |
| `realtime.holdConnections(true/false)`                          | Recusa novas conexões de socket até liberar (persiste no reload da aba)  |
| `realtime.replay(eventId?)`                                     | Reenvia um evento já publicado (duplicata/evento antigo)                 |
| `realtime.emit(evento)`                                         | Publica um evento arbitrário (versão antiga, outro usuário)              |
| `orders.settleNow(id)` · `orders.get(id)` · `orders.list()`     | Termina o pagamento pendente agora (com `order.updated`); inspeção       |
| `realtime.history()` · `realtime.connections()`                 | Inspeção                                                                 |

## Dados de demonstração

| Usuário           | Senha        | Particularidades                                                   |
| ----------------- | ------------ | ------------------------------------------------------------------ |
| `ana@kurio.dev`   | `Kurio@2026` | Carteiras principal (Ethereum) e secundária (Polygon); 2 favoritos |
| `bruno@kurio.dev` | `Colecao#77` | Sem carteiras; 1 favorito                                          |

Catálogo com 36 NFTs (4 páginas de 9), 9 categorias, 3 redes e preços de 0.02 a 12.3 ETH. As senhas
são guardadas só como hash PBKDF2-SHA256.
