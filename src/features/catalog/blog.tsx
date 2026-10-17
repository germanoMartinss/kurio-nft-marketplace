import { UnavailableAction } from '@/components/common/unavailable-action'
import { NftImage } from '@/components/nft/nft-image'
import type { NftImage as NftImageName } from '@/contracts/nft'

const POSTS: { date: string; read: string; title: string; text: string; image: NftImageName }[] = [
  {
    date: '12 de setembro',
    read: '6 min',
    title: 'Como funciona a propriedade de NFTs',
    text: 'Aprenda a colecionar, negociar e verificar ativos digitais.',
    image: 'ape-gola-alta',
  },
  {
    date: '13 de setembro',
    read: '2 min',
    title: '10 artistas digitais para acompanhar',
    text: 'Conheça criadores que moldam a cultura digital.',
    image: 'ape-oculos',
  },
  {
    date: '15 de setembro',
    read: '3 min',
    title: 'Raridade, atributos e procedência',
    text: 'Entenda raridade, procedência, direitos autorais e utilidade.',
    image: 'gorila-chapeu',
  },
  {
    date: '15 de setembro',
    read: '2 min',
    title: 'Como proteger sua carteira',
    text: 'Proteja sua carteira, seus ativos e sua identidade.',
    image: 'macaco-fone',
  },
]

/** "Diário da Cunhagem": conteúdo editorial fora do escopo; "Ler mais" é anunciado como indisponível. */
export function Blog() {
  return (
    <section aria-labelledby="diario-titulo" className="container-page flex flex-col gap-10">
      <header className="flex flex-col gap-3 text-center">
        <h2 id="diario-titulo" className="text-24 font-bold lg:text-28">
          Diário da Cunhagem
        </h2>
        <p className="text-14 text-subtle">
          Histórias, guias e insights para colecionadores sobre o universo da propriedade digital.
        </p>
      </header>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-[repeat(4,268px)] lg:gap-6">
        {POSTS.map((post) => (
          <article key={post.title} className="flex flex-col overflow-hidden rounded-lg bg-card">
            <NftImage
              image={post.image}
              alt=""
              sizes="(min-width: 1024px) 268px, 45vw"
              className="h-[120px] lg:h-[195px]"
              imgClassName="object-[50%_25%]"
            />
            <div className="flex flex-1 flex-col gap-2 px-4 pt-3 pb-4">
              <p className="text-12 leading-4 text-subtle">
                {post.date} | Leitura de {post.read}
              </p>
              <h3 className="text-14 leading-5 font-bold lg:text-16 lg:leading-[21px]">
                {post.title}
              </h3>
              <p className="text-12 leading-4 text-subtle">{post.text}</p>
              <UnavailableAction
                feature="Diário da Cunhagem"
                className="mt-auto text-12 leading-4 font-bold text-accent-text"
              >
                Ler mais →
              </UnavailableAction>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
