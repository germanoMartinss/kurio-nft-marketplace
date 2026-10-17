import { Link } from '@tanstack/react-router'

import { ArrowRight } from '@/components/icons'
import { NftImage } from '@/components/nft/nft-image'
import type { NftImage as NftImageName } from '@/contracts/nft'

import type { CatalogSearch } from './search-params'

const PROMOS: { title: string; text: string; image: NftImageName; search: CatalogSearch }[] = [
  {
    title: 'Lançamentos gênesis de edição limitada',
    text: 'Colecione edições escassas diretamente dos criadores antes da revelação pública.',
    image: 'ape-oculos',
    search: { aba: 'novos' },
  },
  {
    title: 'Arte digital selecionada e muito mais',
    text: 'Explore novos artistas, coleções verificadas e obras digitais que definem a cultura.',
    image: 'ape-gola-alta',
    search: { colecoes: 'arte-digital' },
  },
]

/** Cards promocionais do Figma; "Explorar" leva ao catálogo já filtrado. */
export function Promos() {
  return (
    <section aria-label="Coleções em destaque" className="container-page grid gap-7 lg:grid-cols-2">
      {PROMOS.map((promo) => (
        <article key={promo.title} className="flex h-[250px] overflow-hidden rounded-lg bg-card">
          <NftImage
            image={promo.image}
            alt=""
            sizes="(min-width: 1024px) 230px, 40vw"
            className="w-2/5 shrink-0"
          />
          <div className="flex flex-1 flex-col items-end justify-center gap-3 p-4 text-right lg:p-6">
            <h3 className="text-16 leading-6 font-bold lg:text-18">{promo.title}</h3>
            <p className="text-13 leading-6 text-subtle lg:text-14">{promo.text}</p>
            <Link
              to="/"
              search={promo.search}
              hash="catalogo"
              className="flex h-9 items-center gap-2 rounded-md bg-primary px-4 text-14 font-bold text-primary-foreground hover:brightness-110"
            >
              Explorar <ArrowRight className="size-4" />
              <span className="sr-only">: {promo.title}</span>
            </Link>
          </div>
        </article>
      ))}
    </section>
  )
}
