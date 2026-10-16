import type { Category, Edition, NftImage } from '@/contracts/nft'
import type { Network } from '@/contracts/common'

import type { NftRecord } from '../db/types'

/**
 * Catálogo determinístico: 36 NFTs (4 páginas de 9, como a paginação do Figma), sobre as quatro
 * ilustrações do layout. Os nove NFTs visíveis no Figma mantêm nome, número, imagem e preço.
 */
interface Seed {
  name: string
  image: NftImage
  price: string
  previousPrice?: string
  category: Category
  network: Network
  rarity?: 'raro'
  trending?: boolean
}

const FIGMA: Seed[] = [
  {
    name: 'Emerald Ape #042',
    image: 'ape-oculos',
    price: '1.19',
    category: 'arte-digital',
    network: 'ethereum',
    trending: true,
  },
  {
    name: 'Sage Nomad #009',
    image: 'gorila-chapeu',
    price: '1.69',
    category: 'arte-digital',
    network: 'ethereum',
    trending: true,
  },
  {
    name: 'Neon Vessel #552',
    image: 'ape-gola-alta',
    price: '1.99',
    previousPrice: '2.29',
    category: 'colecionaveis',
    network: 'polygon',
    rarity: 'raro',
    trending: true,
  },
  {
    name: 'Cosmic Bloom #118',
    image: 'gorila-chapeu',
    price: '1.29',
    category: 'generativa',
    network: 'solana',
  },
  {
    name: 'Violet Nomad #314',
    image: 'gorila-chapeu',
    price: '1.39',
    category: 'fotografia',
    network: 'ethereum',
    trending: true,
  },
  {
    name: 'Ivory Baron #088',
    image: 'ape-gola-alta',
    price: '1.79',
    category: 'arte-3d',
    network: 'ethereum',
    rarity: 'raro',
  },
  {
    name: 'Golden Beat #207',
    image: 'macaco-fone',
    price: '0.99',
    category: 'musica',
    network: 'polygon',
    trending: true,
  },
  {
    name: 'Golden Signal #160',
    image: 'macaco-fone',
    price: '0.39',
    category: 'musica',
    network: 'solana',
  },
  {
    name: 'Golden Frequency #071',
    image: 'macaco-fone',
    price: '0.59',
    category: 'musica',
    network: 'ethereum',
  },
]

const STEMS: Record<NftImage, string[]> = {
  'ape-oculos': [
    'Jade Ape',
    'Amber Ape',
    'Onyx Ape',
    'Ruby Ape',
    'Cobalt Ape',
    'Opal Ape',
    'Topaz Ape',
  ],
  'gorila-chapeu': [
    'Moss Wanderer',
    'Lilac Drifter',
    'Fern Nomad',
    'Dusk Bloom',
    'Iris Rover',
    'Willow Nomad',
  ],
  'ape-gola-alta': [
    'Velvet Baron',
    'Slate Vessel',
    'Pearl Baron',
    'Midnight Count',
    'Ash Vessel',
    'Silver Duke',
    'Granite Baron',
  ],
  'macaco-fone': [
    'Copper Rhythm',
    'Brass Echo',
    'Honey Tempo',
    'Saffron Wave',
    'Amber Tune',
    'Citrus Loop',
    'Cedar Groove',
  ],
}

const CATEGORIES: Category[] = [
  'arte-digital',
  'fotografia',
  'musica',
  'arte-3d',
  'colecionaveis',
  'generativa',
  'jogos',
  'assinaturas',
  'utilidade',
]
const NETWORKS: Network[] = ['ethereum', 'polygon', 'ethereum', 'solana']
/** Faixa de preços do filtro do Figma: 0,02 a 12,30 ETH. */
const PRICES = [
  '0.02',
  '0.45',
  '2.15',
  '3.4',
  '0.79',
  '5.25',
  '0.12',
  '7.9',
  '1.05',
  '12.3',
  '0.33',
  '2.75',
  '4.6',
  '0.69',
  '9.1',
  '1.55',
  '6.4',
  '0.25',
  '3.05',
  '0.89',
  '8.35',
  '1.95',
  '0.15',
  '5.8',
  '2.45',
  '10.75',
  '0.55',
]

const COLLECTIONS: Record<NftImage, string> = {
  'ape-oculos': 'Kurio Apes',
  'gorila-chapeu': 'Nomad Society',
  'ape-gola-alta': 'Baron House',
  'macaco-fone': 'Golden Frequencies',
}

function generated(): Seed[] {
  const images = Object.keys(STEMS) as NftImage[]
  const seeds: Seed[] = []
  for (let i = 0; seeds.length < 27; i++) {
    const image = images[i % 4]!
    const stem = STEMS[image][Math.floor(i / 4)]
    if (!stem) continue
    const number = String(((i * 37 + 11) % 900) + 100).padStart(3, '0')
    seeds.push({
      name: `${stem} #${number}`,
      image,
      price: PRICES[seeds.length]!,
      category: CATEGORIES[(i + 2) % CATEGORIES.length]!,
      network: NETWORKS[i % NETWORKS.length]!,
      rarity: i % 7 === 3 ? 'raro' : undefined,
      trending: i % 5 === 0,
    })
  }
  return seeds
}

const slugify = (name: string) => name.toLowerCase().replace('#', '').trim().replace(/\s+/g, '-')

/** Disponibilidade por edição, variada de forma determinística. */
function editionsFor(index: number): Edition[] {
  return [
    { id: '1-1', label: '1/1', supply: 1, available: index % 3 === 0 ? 0 : 1 },
    { id: '1-10', label: '1/10', supply: 10, available: [10, 4, 7, 2, 9][index % 5]! },
    { id: '1-50', label: '1/50', supply: 50, available: [50, 32, 18, 41, 26][index % 5]! },
    { id: 'aberta', label: 'ABERTA', supply: null, available: 100 },
  ]
}

const BASE_DATE = Date.UTC(2026, 8, 30, 12, 0, 0)

export function createNftFixtures(): NftRecord[] {
  return [...FIGMA, ...generated()].map((seed, index) => {
    const [, number = '000'] = seed.name.split('#')
    const editions = editionsFor(index)
    const collection = COLLECTIONS[seed.image]
    return {
      id: slugify(seed.name),
      name: seed.name,
      tokenId: `#${number.padStart(4, '0')}`,
      image: seed.image,
      category: seed.category,
      collection,
      network: seed.network,
      price: seed.price,
      previousPrice: seed.previousPrice ?? null,
      rarity: seed.rarity ?? 'comum',
      available: editions.reduce((sum, edition) => sum + edition.available, 0),
      version: 1,
      description: `Um colecionável digital finalizado à mão da coleção ${collection}, verificado na ${seed.network === 'ethereum' ? 'Ethereum' : seed.network === 'polygon' ? 'Polygon' : 'Solana'}, com arte desbloqueável e acesso para colecionadores.`,
      story: [
        `${seed.name} é uma obra digital finalizada à mão da coleção ${collection}. Cada atributo fica armazenado nos metadados do token e verificado na rede. A obra explora identidade, movimento e luz em um mundo digital sem fronteiras.`,
        'A propriedade inclui a arte em alta resolução, lançamentos exclusivos para colecionadores e um registro permanente de procedência registrada na rede. Nova Sato recebe 5% de direitos autorais nas vendas secundárias, apoiando novos trabalhos e lançamentos da comunidade.',
      ],
      attributes:
        seed.rarity === 'raro' ? ['Óculos', 'Esmeralda', 'Raro'] : ['Óculos', 'Esmeralda'],
      editions,
      maxPerOrder: 10,
      creator: 'Nova Sato',
      contract: '0x7A42...19E8',
      royaltyPercent: 5,
      rating: { average: 4.8, count: 19 },
      createdAt: new Date(BASE_DATE - index * 36 * 3_600_000).toISOString(),
      trending: seed.trending ?? false,
    }
  })
}

/** NFTs do topo da página inicial (carrossel do hero) e do bloco "NFT em destaque". */
export const HIGHLIGHT_IDS = {
  hero: ['emerald-ape-042', 'ivory-baron-088', 'golden-beat-207'],
  featured: 'sage-nomad-009',
}
