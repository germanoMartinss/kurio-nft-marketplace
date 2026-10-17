import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'

import { ApiRequestError } from '@/api/errors'
import { Breadcrumb } from '@/components/common/breadcrumb'
import { errorMessage } from '@/components/common/error-message'
import { ErrorState } from '@/components/common/query-states'
import { CartFilled } from '@/components/icons'
import { MobileTopBar } from '@/components/layout/mobile-top-bar'
import { Price } from '@/components/nft/price'
import { Button, buttonVariants } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import type { NftDetail } from '@/contracts/nft'
import { nftQueryOptions } from '@/features/catalog/queries'
import { FavoriteButton } from '@/features/favorites/favorite-button'
import { formatEth } from '@/lib/money'

import { EditionPicker } from './edition-picker'
import { Gallery } from './gallery'
import { NftDetailsTabs } from './nft-details-tabs'
import { usePurchase, type Purchase } from './purchase'
import { QuantityStepper } from './quantity-stepper'
import { Rating } from './rating'
import { RelatedNfts } from './related-nfts'
import { ShareLinks } from './share-links'

export function NftDetailPage({ nftId }: { nftId: string }) {
  const query = useQuery(nftQueryOptions(nftId))

  if (query.isPending) return <NftDetailSkeleton />
  if (query.isError) {
    if (query.error instanceof ApiRequestError && query.error.code === 'NOT_FOUND')
      return <NftNotFound />
    return (
      <div className="container-page py-16">
        <ErrorState
          title="Não foi possível carregar o NFT"
          message={errorMessage(query.error)}
          onRetry={() => void query.refetch()}
          retrying={query.isFetching}
        />
      </div>
    )
  }
  // `key` reinicia edição e quantidade ao navegar de um NFT para outro.
  return <NftDetailContent key={query.data.id} nft={query.data} />
}

function NftDetailContent({ nft }: { nft: NftDetail }) {
  const purchase = usePurchase(nft)
  return (
    <div data-testid="detail-view" className="flex flex-col gap-12 pb-40 lg:gap-24 lg:pb-10">
      {/* Desktop */}
      <div className="container-page hidden flex-col gap-3 pt-8 lg:flex">
        <Breadcrumb />
        <div className="flex gap-8">
          <div className="w-[573px] shrink-0">
            <Gallery nft={nft} />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-5">
            <div className="flex flex-col gap-3 border-b border-border pb-3">
              <h1 className="text-28 font-bold">{nft.name}</h1>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Price value={nft.price} previous={nft.previousPrice} className="text-22" />
                <Rating average={nft.rating.average} count={nft.rating.count} />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="text-15 leading-4 font-bold">Sobre este NFT:</h2>
              <p className="text-14 leading-[22px] text-muted-foreground">{nft.description}</p>
            </div>
            <EditionPicker
              editions={nft.editions}
              value={purchase.editionId}
              onChange={purchase.setEditionId}
            />
            <div className="flex flex-wrap items-center justify-between gap-4">
              <QuantityStepper
                value={purchase.quantity}
                max={purchase.max}
                onChange={purchase.setQuantity}
              />
              <div className="flex gap-2">
                <Button
                  className="h-10 w-[130px] text-14"
                  disabled={purchase.max === 0 || purchase.pending}
                  onClick={() => purchase.add('carrinho')}
                >
                  {purchase.soldOut ? 'ESGOTADO' : purchase.pending ? 'ADICIONANDO…' : 'COMPRAR'}
                </Button>
                <FavoriteButton
                  nftId={nft.id}
                  name={nft.name}
                  variant="labeled"
                  className="h-10 w-[130px] text-14"
                />
              </div>
            </div>
            <PurchaseFeedback purchase={purchase} />
            <NftFacts nft={nft} />
            <ShareLinks name={nft.name} />
          </div>
        </div>
      </div>

      {/* Mobile (no tablet, centralizado em até 600px para a arte não ficar desproporcional) */}
      <div className="mx-auto w-full max-w-[600px] lg:hidden">
        <MobileTopBar
          className="px-7"
          action={
            <FavoriteButton
              nftId={nft.id}
              name={nft.name}
              className="size-9 rounded-full border border-border-soft bg-surface-raised"
            />
          }
        />
        <div className="px-7">
          <Gallery nft={nft} />
        </div>
        <section
          aria-label="Informações do NFT"
          className="relative -mt-8 flex flex-col gap-4 rounded-t-[32px] bg-card px-6 pt-8 pb-6"
        >
          <div className="flex items-start justify-between gap-3">
            <h1 className="text-22 font-bold">{nft.name}</h1>
            <Rating average={nft.rating.average} count={nft.rating.count} compact />
          </div>
          <p className="text-14 leading-[22px] text-muted-foreground">{nft.description}</p>
          <EditionPicker
            editions={nft.editions}
            value={purchase.editionId}
            onChange={purchase.setEditionId}
          />
          <PurchaseFeedback purchase={purchase} />
          <NftFacts nft={nft} />
        </section>
        <MobilePurchaseBar nft={nft} purchase={purchase} />
      </div>

      <NftDetailsTabs nft={nft} />
      <RelatedNfts nft={nft} />
    </div>
  )
}

function NftFacts({ nft }: { nft: NftDetail }) {
  return (
    <dl className="flex flex-col gap-3 text-15 leading-5 text-subtle lg:gap-3">
      <div className="flex gap-1">
        <dt>ID do token:</dt>
        <dd>{nft.tokenId}</dd>
      </div>
      <div className="flex gap-1">
        <dt>Coleção:</dt>
        <dd>{nft.collection}</dd>
      </div>
      <div className="flex gap-1">
        <dt>Atributos:</dt>
        <dd>{nft.attributes.join(', ')}</dd>
      </div>
    </dl>
  )
}

function PurchaseFeedback({ purchase }: { purchase: Purchase }) {
  return (
    <div className="flex flex-col gap-1 text-14">
      <p className="text-subtle">{purchase.availabilityText}</p>
      {purchase.error ? (
        <p role="alert" className="text-coral">
          {purchase.error}
        </p>
      ) : null}
    </div>
  )
}

/** Barra de compra fixa do frame mobile: quantidade, preço, "Comprar NFT" e adicionar ao carrinho. */
function MobilePurchaseBar({ nft, purchase }: { nft: NftDetail; purchase: Purchase }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex flex-col gap-4 rounded-t-[32px] bg-surface-raised px-6 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-modal">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-15 font-bold text-muted-foreground">Qtd.</span>
          <QuantityStepper
            value={purchase.quantity}
            max={purchase.max}
            onChange={purchase.setQuantity}
            size="sm"
          />
        </div>
        <p className="text-20 font-bold text-accent-text">
          <span className="sr-only">Preço unitário: </span>
          {formatEth(nft.price)}
        </p>
      </div>
      <div className="flex gap-3">
        <Button
          variant="pill"
          className="h-[60px] max-w-[196px] min-w-0 flex-1 rounded-[30px] text-16"
          disabled={purchase.max === 0 || purchase.pending}
          onClick={() => purchase.add('carrinho')}
        >
          {purchase.soldOut ? 'Esgotado' : 'Comprar NFT'}
        </Button>
        <button
          type="button"
          aria-label={`Adicionar ${nft.name} ao carrinho`}
          disabled={purchase.max === 0 || purchase.pending}
          onClick={() => purchase.add('ficar')}
          className="flex size-[60px] shrink-0 items-center justify-center rounded-full border border-border-soft bg-card text-muted-foreground hover:text-foreground disabled:opacity-50"
        >
          <CartFilled className="size-5" />
        </button>
      </div>
    </div>
  )
}

function NftNotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center gap-5 py-16 text-center">
      <p className="text-14 font-bold tracking-brand text-accent-text">NFT NÃO ENCONTRADO</p>
      <h1 className="text-24 font-bold">Este NFT não existe ou foi removido</h1>
      <p className="max-w-md text-14 leading-6 text-muted-foreground">
        Confira o endereço ou volte ao mercado para explorar outros colecionáveis.
      </p>
      <Link to="/" hash="catalogo" className={buttonVariants()}>
        Explorar o mercado
      </Link>
    </div>
  )
}

/** Mesma composição do detalhe, para o carregamento não deslocar o layout. */
/**
 * Mesma estrutura e alturas do conteúdo final (bloco principal, abas e "Mais desta coleção"):
 * sem isso o rodapé, que fica logo abaixo, seria empurrado quando os dados chegam. As alturas são
 * as de um NFT típico e estão conferidas em `e2e/skeletons.spec.ts`.
 */
function NftDetailSkeleton() {
  return (
    <div
      aria-busy="true"
      data-testid="detail-view"
      className="flex flex-col gap-12 pb-40 lg:gap-24 lg:pb-10"
    >
      <p className="sr-only" role="status">
        Carregando NFT
      </p>
      {/* Desktop */}
      <div className="container-page hidden h-[567px] flex-col gap-3 pt-8 lg:flex">
        <Skeleton className="h-4 w-40" />
        <div className="flex gap-8">
          <div className="flex w-[573px] shrink-0 gap-7">
            <div className="flex flex-col gap-4">
              {Array.from({ length: 4 }, (_, index) => (
                <Skeleton key={index} className="size-[100px] rounded-lg" />
              ))}
            </div>
            <Skeleton className="size-[444px] rounded-md" />
          </div>
          <div className="flex flex-1 flex-col gap-5">
            <Skeleton className="h-9 w-2/3" />
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-7 w-1/2" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-16 w-2/3" />
          </div>
        </div>
      </div>
      {/* Mobile */}
      <div className="mx-auto flex h-[763px] w-full max-w-[600px] flex-col gap-4 px-7 pt-4 lg:hidden">
        <Skeleton className="size-9 rounded-full" />
        <Skeleton className="aspect-square w-full rounded-3xl" />
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-24 w-full" />
      </div>
      <div className="container-page">
        <Skeleton className="h-[670px] w-full lg:h-[360px]" />
      </div>
      <div className="container-page">
        {/* "Mais desta coleção": cards e a linha dos indicadores do carrossel. */}
        <Skeleton className="h-[383px] w-full lg:h-[436px]" />
      </div>
    </div>
  )
}
