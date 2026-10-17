import { useEffect, useState } from 'react'

import { WarningCircle } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { Cart } from '@/contracts/cart'
import { WALLET_PROVIDER_LABELS, type Wallet } from '@/contracts/wallet'
import { describeChange, quoteDivergences } from '@/features/cart/quote'
import { networkLabel, shortAddress } from '@/lib/format'

import type { OrderAttempt } from './draft'
import { OrderLines } from './order-lines'
import { Totals } from './totals'
import type { Checkout } from './use-checkout'

/** Segundos restantes até `expiresAt` (atualiza a cada segundo; 0 quando expirou). */
function useSecondsLeft(expiresAt: string) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(timer)
  }, [expiresAt])
  return Math.max(0, Math.ceil((Date.parse(expiresAt) - now) / 1000))
}

const clock = (seconds: number) =>
  `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`

/**
 * Revisão antes do envio. A cotação (congelada pela API) é a referência do pedido: se expirar, ou
 * se preço, disponibilidade ou total do carrinho mudarem (inclusive por `nft.updated`), o envio é
 * bloqueado, a diferença é mostrada e o usuário precisa recotar e confirmar de novo.
 */
export function ReviewDialog({
  checkout,
  attempt,
  cart,
  wallet,
}: {
  checkout: Checkout
  attempt: OrderAttempt
  cart: Cart | undefined
  wallet: Wallet | undefined
}) {
  const { quote, body } = attempt
  const secondsLeft = useSecondsLeft(quote.expiresAt)
  // Depois de um envio sem resposta, a API decide pela chave: nada disso bloqueia o reenvio.
  const expired = secondsLeft === 0 && !attempt.sent
  const divergences =
    cart && !checkout.submitting && !attempt.sent ? quoteDivergences(quote, cart) : []
  const { problem } = checkout
  const staleChanges =
    problem?.kind === 'stale'
      ? problem.changes.map((change) => describeChange(change))
      : divergences.map((change) => describeChange(change))
  const outdated =
    expired || staleChanges.length > 0 || problem?.kind === 'expired' || problem?.kind === 'stale'
  const warnings = [
    ...(expired || problem?.kind === 'expired'
      ? ['A cotação expirou. Atualize para ver os valores atuais e confirmar de novo.']
      : []),
    ...staleChanges,
  ]

  return (
    <Dialog open onOpenChange={(open) => (open ? undefined : checkout.closeReview())}>
      <DialogContent
        // O botão que abriu a revisão fica desabilitado enquanto a cotação é feita e perde o foco:
        // devolve-se o foco ao "Confirmar compra" visível.
        onCloseAutoFocus={(event) => {
          event.preventDefault()
          const buttons = document.querySelectorAll<HTMLButtonElement>(
            'button[form="form-pagamento"]',
          )
          ;[...buttons].find((button) => button.offsetParent !== null)?.focus()
        }}
        className="max-h-[calc(100dvh-2rem)] max-w-[560px] gap-5 overflow-y-auto p-6 sm:max-w-[560px]"
      >
        <DialogHeader>
          <DialogTitle className="text-20 font-bold">Revise seu pedido</DialogTitle>
          <DialogDescription className="text-14 leading-6 text-muted-foreground">
            Confira os dados e valores. O pedido só é criado depois de “Enviar pedido”.
          </DialogDescription>
        </DialogHeader>

        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-14">
          <dt className="text-muted-foreground">Colecionador</dt>
          <dd>
            {body.buyer.displayName} · {body.buyer.email}
          </dd>
          <dt className="text-muted-foreground">Carteira</dt>
          <dd>
            {wallet?.nickname ?? 'Carteira'} ({shortAddress(wallet?.address ?? '')}) ·{' '}
            {WALLET_PROVIDER_LABELS[body.provider]}
          </dd>
          <dt className="text-muted-foreground">Rede</dt>
          <dd>{networkLabel(quote.network)}</dd>
          <dt className="text-muted-foreground">Cotação</dt>
          <dd>
            {attempt.sent ? (
              <span>Enviada, aguardando resposta</span>
            ) : expired ? (
              <span className="font-bold text-coral">Expirada</span>
            ) : (
              <>
                <span aria-hidden="true">Válida por {clock(secondsLeft)}</span>
                <span className="sr-only">Cotação válida</span>
              </>
            )}
          </dd>
        </dl>

        <OrderLines
          imageSize={56}
          lines={quote.lines.map((line) => ({ ...line, key: `${line.nftId}:${line.editionId}` }))}
        />
        <Totals
          subtotal={quote.subtotal}
          discount={quote.discount}
          networkFee={quote.networkFee}
          total={quote.total}
          testId="review-total"
        />

        <div aria-live="assertive" role="alert" className="empty:hidden">
          {warnings.length > 0 ? (
            <div className="flex flex-col gap-2 rounded-lg border border-coral/60 p-3 text-14">
              <p className="flex items-center gap-2 font-bold text-coral">
                <WarningCircle className="size-4 shrink-0" aria-hidden="true" />A cotação mudou
              </p>
              <ul className="list-disc pl-5 text-muted-foreground">
                {warnings.map((warning) => (
                  <li key={warning}>{warning}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {problem && problem.kind !== 'stale' && problem.kind !== 'expired' ? (
            <p className="flex items-start gap-2 text-14 text-coral">
              <WarningCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>{problem.message}</span>
            </p>
          ) : null}
        </div>

        <DialogFooter className="gap-2 sm:justify-between">
          <Button variant="neutral" onClick={checkout.closeReview} disabled={checkout.submitting}>
            Voltar e editar
          </Button>
          {outdated ? (
            <Button onClick={checkout.requote} disabled={checkout.quotePending}>
              {checkout.quotePending ? 'Atualizando…' : 'Atualizar cotação'}
            </Button>
          ) : (
            <Button onClick={() => void checkout.submit()} disabled={checkout.submitting}>
              {checkout.submitting
                ? 'Enviando…'
                : problem?.kind === 'retry'
                  ? 'Tentar novamente'
                  : problem?.kind === 'wallet'
                    ? 'Conectar e enviar'
                    : 'Enviar pedido'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
