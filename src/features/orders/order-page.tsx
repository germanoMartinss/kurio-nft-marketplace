import { Link, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

import { ApiRequestError } from '@/api/errors'
import { ErrorState } from '@/components/common/query-states'
import { Close, ThankYou } from '@/components/icons'
import { NftImage } from '@/components/nft/nft-image'
import { Button, buttonVariants } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { NETWORK_LABELS } from '@/contracts/common'
import type { Order } from '@/contracts/order'
import { WALLET_PROVIDER_LABELS } from '@/contracts/wallet'
import { useSessionUser } from '@/features/auth/session-store'
import { clearAttempt } from '@/features/checkout/draft'
import { formatDate, shortAddress } from '@/lib/format'
import { formatEth } from '@/lib/money'
import { cn } from '@/lib/utils'

import { useOrder } from './queries'

const EXPLORER_NAME = { ethereum: 'Etherscan', polygon: 'Polygonscan', solana: 'Solscan' } as const

export function OrderPage({ orderId }: { orderId: string }) {
  const user = useSessionUser()
  const query = useOrder(orderId)
  const order = query.data

  // Estado terminal encerra a tentativa de pedido (a chave de idempotência não é mais necessária).
  const terminal = order?.status === 'confirmado' || order?.status === 'recusado'
  useEffect(() => {
    if (terminal && user) clearAttempt(user.id)
  }, [terminal, user])

  let content
  if (query.isPending) content = <OrderSkeleton />
  else if (query.isError && !order) {
    content =
      query.error instanceof ApiRequestError && query.error.code === 'NOT_FOUND' ? (
        <Message
          title="Pedido não encontrado"
          text="Este pedido não existe ou não pertence à sua conta."
          actions={
            <Link to="/" className={buttonVariants()}>
              Voltar ao início
            </Link>
          }
        />
      ) : (
        <ErrorState
          title="Não foi possível carregar o pedido"
          message="Seu pedido não foi perdido: tente novamente para ver o estado atual."
          onRetry={() => void query.refetch()}
          retrying={query.isFetching}
        />
      )
  } else if (order) {
    content =
      order.status === 'confirmado' && order.transaction ? (
        <Receipt order={order} />
      ) : order.status === 'recusado' ? (
        <Refused order={order} userId={user?.id ?? ''} />
      ) : (
        <Pending order={order} />
      )
  }

  return (
    <div className="container-page flex min-h-dvh items-start justify-center py-6 max-lg:px-4 lg:pt-[120px] lg:pb-16">
      <div className="w-full max-w-[578px]" data-testid="order-view">
        {content}
      </div>
    </div>
  )
}

function OrderSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="Carregando pedido"
      role="status"
      className="flex flex-col gap-4"
    >
      {/* Altura do recibo de um pedido de 1 item (a tela mais comum ao reabrir um pedido). */}
      <Skeleton className="h-[854px] w-full sm:h-[656px]" />
    </div>
  )
}

function Message({
  title,
  text,
  actions,
  tone = 'default',
}: {
  title: string
  text: string
  actions: React.ReactNode
  tone?: 'default' | 'error'
}) {
  return (
    <div className="flex flex-col items-center gap-5 bg-card px-6 py-12 text-center">
      <h1 className={cn('text-22 font-bold', tone === 'error' && 'text-coral')}>{title}</h1>
      <p className="max-w-md text-14 leading-6 text-muted-foreground">{text}</p>
      <div className="flex flex-wrap justify-center gap-3">{actions}</div>
    </div>
  )
}

/** Pedido enviado e ainda não decidido pela simulação: nunca é apresentado como confirmado. */
function Pending({ order }: { order: Order }) {
  const confirming = order.status === 'confirmado'
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="bg-card px-6 py-12 text-center"
    >
      <div
        aria-hidden="true"
        className="mx-auto mb-5 size-10 animate-spin rounded-full border-2 border-border-soft border-t-primary motion-reduce:animate-none"
      />
      <h1 className="text-22 font-bold">
        {confirming ? 'Registrando a transação…' : 'Pagamento em processamento'}
      </h1>
      <p className="mx-auto mt-3 max-w-md text-14 leading-6 text-muted-foreground">
        Pedido {order.id} enviado para a rede {NETWORK_LABELS[order.network]}. Aguardando a
        confirmação do pagamento. Você pode recarregar a página: o pedido continua e nenhuma nova
        compra é criada.
      </p>
      <p className="mt-4 text-14 font-bold text-accent-text">Total: {formatEth(order.total)}</p>
    </div>
  )
}

function Refused({ order, userId }: { order: Order; userId: string }) {
  const navigate = useNavigate()
  return (
    <div role="alert" className="bg-card">
      <Message
        tone="error"
        title="Pagamento recusado"
        text={`${order.failureReason ?? 'O pagamento não foi concluído.'} Nada foi cobrado e seus itens continuam no carrinho.`}
        actions={
          <>
            <Button
              onClick={() => {
                clearAttempt(userId)
                void navigate({ to: '/pagamento' })
              }}
            >
              Tentar novamente
            </Button>
            <Link to="/carrinho" className={buttonVariants({ variant: 'neutral' })}>
              Voltar ao carrinho
            </Link>
          </>
        }
      />
    </div>
  )
}

/** Recibo: reproduz o snapshot do pedido (linhas, taxas e total congelados na cotação). */
function Receipt({ order }: { order: Order }) {
  const transaction = order.transaction!
  const explorer = EXPLORER_NAME[order.network]
  return (
    <article aria-labelledby="recibo-titulo" className="relative bg-card" data-testid="receipt">
      <Link
        to="/"
        className="absolute top-4 right-4 text-primary hover:text-accent-text"
        aria-label="Fechar recibo e voltar ao início"
      >
        <Close className="size-5" aria-hidden="true" />
      </Link>
      <header className="flex flex-col items-center gap-3 px-6 pt-6 pb-4 text-center">
        <ThankYou className="h-20 w-[68px] text-primary" aria-hidden="true" />
        <h1 id="recibo-titulo" className="text-17 font-bold text-muted-foreground">
          Seus NFTs agora estão na sua carteira
        </h1>
      </header>

      <dl className="grid grid-cols-2 gap-y-3 border-y border-primary/70 px-6 py-3 text-13 sm:grid-cols-4 sm:gap-y-0 sm:px-0 sm:[&>div]:px-3">
        <Info label="ID da transação" bold>
          <span title={transaction.hash}>{shortAddress(transaction.hash)}</span>
        </Info>
        <Info label="Data">{formatDate(transaction.confirmedAt)}</Info>
        <Info label="Total">{formatEth(order.total)}</Info>
        <Info label="Carteira" bold>
          {WALLET_PROVIDER_LABELS[order.wallet.provider]}
        </Info>
      </dl>

      <section aria-labelledby="detalhes-transacao" className="px-6 py-5 sm:px-11">
        <h2 id="detalhes-transacao" className="text-15 font-bold">
          Detalhes da transação
        </h2>
        <table className="mt-3 w-full border-separate border-spacing-y-2 text-left">
          <caption className="sr-only">Itens do pedido {order.id}</caption>
          <thead>
            <tr className="text-15">
              <th scope="col" className="border-b border-border pb-2 font-bold">
                NFTs
              </th>
              <th scope="col" className="border-b border-border pb-2 text-center font-bold">
                Edições
              </th>
              <th scope="col" className="border-b border-border pb-2 text-right font-bold">
                Subtotal
              </th>
            </tr>
          </thead>
          <tbody>
            {order.lines.map((line) => (
              <tr key={`${line.nftId}:${line.editionId}`}>
                <td>
                  <div className="flex items-center gap-3">
                    <NftImage
                      image={line.image}
                      alt=""
                      sizes="70px"
                      className="shrink-0 overflow-hidden rounded-xs"
                      imgClassName="size-14 sm:size-[70px]"
                    />
                    <div className="min-w-0">
                      <p className="text-15 leading-5 font-bold">{line.name}</p>
                      <p className="text-13 leading-4 text-subtle">
                        ID do token: {line.tokenId} · Edição {line.editionLabel}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-2 text-center text-14 text-muted-foreground">
                  <span className="sr-only">Quantidade: </span>(x {line.quantity})
                </td>
                <td className="text-right text-16 font-bold text-accent-text">
                  {formatEth(line.lineTotal)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <dl className="mt-3 flex flex-col gap-1.5 border-b border-border pb-3 text-15">
          {order.coupon ? (
            <div className="flex justify-between gap-4">
              <dt>Desconto ({order.coupon.code})</dt>
              <dd>(-) {formatEth(order.discount, { unit: false })}</dd>
            </div>
          ) : null}
          <div className="flex justify-between gap-4">
            <dt>Taxa de rede</dt>
            <dd>{formatEth(order.networkFee)}</dd>
          </div>
          <div className="flex justify-between gap-4 font-bold">
            <dt>Total</dt>
            <dd className="text-accent-text" data-testid="receipt-total">
              {formatEth(order.total)}
            </dd>
          </div>
        </dl>
        <p className="mx-auto mt-4 max-w-[460px] text-center text-14 leading-[22px] text-muted-foreground">
          Transação confirmada na {NETWORK_LABELS[order.network]}. A propriedade foi transferida
          para sua carteira conectada e registrada na rede. Referências simuladas nesta
          demonstração.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <a
            href={transaction.explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: 'primary', size: 'lg' })}
          >
            Ver no {explorer}
            <span className="sr-only"> (transação simulada, abre em nova aba)</span>
          </a>
          <Link to="/" className={buttonVariants({ variant: 'neutral', size: 'lg' })}>
            Continuar explorando
          </Link>
        </div>
      </section>
      <div aria-hidden="true" className="h-2.5 bg-primary" />
    </article>
  )
}

function Info({
  label,
  bold,
  children,
}: {
  label: string
  bold?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex min-w-0 flex-col gap-0.5 px-6 sm:border-l sm:border-primary/70 sm:px-5 sm:first:border-l-0">
      <dt
        className={cn('whitespace-nowrap text-subtle', bold && 'font-bold text-muted-foreground')}
      >
        {label}
      </dt>
      <dd className="truncate text-muted-foreground">{children}</dd>
    </div>
  )
}
