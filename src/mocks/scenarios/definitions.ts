import type { ApiErrorCode } from '@/contracts/common'

/** Falha injetada nas primeiras `times` requisições que casam com método e caminho. */
export interface FailureRule {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | '*'
  /** Caminho relativo à base da API, com `*` como curinga. Ex.: "/nfts", "/orders*". */
  path: string
  status: number
  code: ApiErrorCode
  /** Quantas requisições falham antes de voltar ao normal; omitido = sempre. */
  times?: number
}

export interface Scenario {
  id: string
  label: string
  description: string
  /** Latência de cada resposta REST; mínimo = máximo para latência fixa. */
  latency: { minMs: number; maxMs: number }
  /** Requisições ímpares do catálogo lentas e pares rápidas: respostas chegam fora de ordem. */
  outOfOrderCatalog?: boolean
  /** Sem conexão: REST responde com erro de rede e o socket é recusado. */
  offline?: boolean
  failures?: FailureRule[]
  /** Primeira requisição de cada rota fica pendurada além do timeout do cliente (10s). */
  firstRequestTimeout?: boolean
  emptyCatalog?: boolean
  /** Validade das sessões criadas neste cenário. */
  sessionTtlMs: number
  /** Rotas privadas respondem 403. */
  forbiddenPrivate?: boolean
  /** Alteração no catálogo alguns segundos após o carrinho ser consultado com itens. */
  cartChange?: { kind: 'preco' | 'esgotar'; afterMs: number }
  orderOutcome: 'confirmado' | 'recusado'
  /** Tempo até o pagamento simulado terminar. */
  settleDelayMs: number
  /** A primeira tentativa de criar cada pedido responde depois do timeout do cliente. */
  orderResponseDelayMs?: number
  walletConnection: 'aceita' | 'recusada'
}

const TWO_HOURS = 2 * 60 * 60 * 1000

const BASE: Omit<Scenario, 'id' | 'label' | 'description'> = {
  latency: { minMs: 60, maxMs: 60 },
  sessionTtlMs: TWO_HOURS,
  orderOutcome: 'confirmado',
  settleDelayMs: 2500,
  walletConnection: 'aceita',
}

const define = (
  scenario: Partial<Scenario> & Pick<Scenario, 'id' | 'label' | 'description'>,
): Scenario => ({
  ...BASE,
  ...scenario,
})

/** Cenários determinísticos do §6 do enunciado. */
export const SCENARIOS: Scenario[] = [
  define({
    id: 'padrao',
    label: 'Padrão',
    description: 'Tudo funciona, com latência baixa e estável.',
  }),
  define({
    id: 'catalogo-vazio',
    label: 'Catálogo vazio',
    description: 'O catálogo não retorna nenhum NFT.',
    emptyCatalog: true,
  }),
  define({
    id: 'lento',
    label: 'Rede lenta',
    description: 'Todas as respostas levam 2,5s (skeletons visíveis).',
    latency: { minMs: 2500, maxMs: 2500 },
  }),
  define({
    id: 'latencia-variavel',
    label: 'Latência variável',
    description: 'Respostas entre 200ms e 1,8s, em sequência reproduzível.',
    latency: { minMs: 200, maxMs: 1800 },
  }),
  define({
    id: 'fora-de-ordem',
    label: 'Respostas fora de ordem',
    description:
      'Consultas ímpares do catálogo levam 1,5s e as pares 150ms: uma resposta antiga chega depois da nova.',
    outOfOrderCatalog: true,
  }),
  define({
    id: 'offline',
    label: 'Sem conexão',
    description: 'Toda requisição falha por erro de rede e o socket não conecta.',
    offline: true,
  }),
  define({
    id: 'timeout',
    label: 'Timeout',
    description:
      'A primeira requisição de cada rota não responde a tempo; a nova tentativa funciona.',
    firstRequestTimeout: true,
  }),
  define({
    id: 'erro-servidor',
    label: 'Erro 500 no catálogo',
    description: 'A listagem de NFTs sempre responde 500.',
    failures: [{ method: 'GET', path: '/nfts', status: 500, code: 'TRANSIENT' }],
  }),
  define({
    id: 'instavel',
    label: 'Falha transitória',
    description:
      'As duas primeiras requisições de leitura do catálogo e do detalhe respondem 503; depois funcionam.',
    failures: [{ method: 'GET', path: '/nfts*', status: 503, code: 'TRANSIENT', times: 2 }],
  }),
  define({
    id: 'nao-encontrado',
    label: 'Erro 404 no detalhe',
    description: 'O detalhe de qualquer NFT responde 404.',
    failures: [{ method: 'GET', path: '/nfts/*', status: 404, code: 'NOT_FOUND' }],
  }),
  define({
    id: 'sessao-expirada',
    label: 'Sessão expira em 20s',
    description: 'Sessões criadas neste cenário expiram 20 segundos após o login.',
    sessionTtlMs: 20_000,
  }),
  define({
    id: 'acesso-negado',
    label: 'Acesso negado',
    description: 'Rotas privadas respondem 403.',
    forbiddenPrivate: true,
  }),
  define({
    id: 'preco-alterado',
    label: 'Preço alterado na compra',
    description:
      'Quatro segundos após o carrinho ser aberto com itens, o preço do primeiro item sobe 15%.',
    cartChange: { kind: 'preco', afterMs: 4000 },
  }),
  define({
    id: 'edicao-esgotada',
    label: 'Edição esgotada na compra',
    description:
      'Quatro segundos após o carrinho ser aberto com itens, a edição do primeiro item esgota.',
    cartChange: { kind: 'esgotar', afterMs: 4000 },
  }),
  define({
    id: 'favoritos-falham',
    label: 'Falha ao favoritar',
    description:
      'A primeira inclusão de favorito responde 503 (a interface reverte); a segunda funciona.',
    failures: [{ method: 'PUT', path: '/favorites/*', status: 503, code: 'TRANSIENT', times: 1 }],
  }),
  define({
    id: 'timeout-pedido',
    label: 'Timeout ao criar pedido',
    description:
      'O pedido é criado, mas a primeira resposta chega após o timeout do cliente; o reenvio com a mesma chave recupera o mesmo pedido.',
    orderResponseDelayMs: 12_000,
  }),
  define({
    id: 'pagamento-recusado',
    label: 'Pagamento recusado',
    description: 'Todo pedido termina recusado.',
    orderOutcome: 'recusado',
  }),
  define({
    id: 'pagamento-lento',
    label: 'Pagamento lento',
    description:
      'O pagamento leva 12 segundos para terminar (para testar queda de conexão com pedido pendente).',
    settleDelayMs: 12_000,
  }),
  define({
    id: 'carteira-recusada',
    label: 'Conexão de carteira recusada',
    description: 'A conexão com a carteira é recusada pelo usuário.',
    walletConnection: 'recusada',
  }),
]

export const DEFAULT_SCENARIO_ID = 'padrao'

export function findScenario(id: string | null | undefined): Scenario | undefined {
  return SCENARIOS.find((scenario) => scenario.id === id)
}
