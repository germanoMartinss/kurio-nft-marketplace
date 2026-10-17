import { Button } from '@/components/ui/button'
import { WarningCircle } from '@/components/icons'
import type { Cart } from '@/contracts/cart'
import { noticeMessages } from './notice-messages'

/**
 * Avisos de alteração dos itens (preço, disponibilidade). A região viva existe sempre, mesmo
 * vazia, para que leitores de tela anunciem o conteúdo quando um evento em tempo real o preencher.
 */
export function CartNotices({
  cart,
  onAcknowledge,
  acknowledging,
}: {
  cart: Cart | undefined
  onAcknowledge: () => void
  acknowledging: boolean
}) {
  const messages = cart?.items.flatMap(noticeMessages) ?? []
  return (
    <div role="status" aria-live="polite" data-testid="cart-notices">
      {messages.length > 0 ? (
        <div className="flex flex-col gap-3 rounded-lg border border-coral/60 bg-card p-4 text-14 leading-5">
          <p className="flex items-center gap-2 font-bold text-coral">
            <WarningCircle className="size-4 shrink-0" aria-hidden="true" />
            Seu carrinho mudou
          </p>
          <ul className="flex list-disc flex-col gap-1.5 pl-5 text-muted-foreground">
            {messages.map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
          <Button
            variant="outline"
            size="sm"
            className="self-start"
            onClick={onAcknowledge}
            disabled={acknowledging}
          >
            Entendi
          </Button>
        </div>
      ) : null}
    </div>
  )
}
