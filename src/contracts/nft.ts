import * as z from 'zod/mini'

import { ethAmountSchema, isoDateTimeSchema, networkSchema, pageSchema } from './common'

export const categorySchema = z.enum([
  'arte-digital',
  'fotografia',
  'musica',
  'arte-3d',
  'colecionaveis',
  'generativa',
  'jogos',
  'assinaturas',
  'utilidade',
])
export type Category = z.infer<typeof categorySchema>

export const CATEGORY_LABELS: Record<Category, string> = {
  'arte-digital': 'Arte digital',
  fotografia: 'Fotografia',
  musica: 'Música',
  'arte-3d': 'Arte 3D',
  colecionaveis: 'Colecionáveis',
  generativa: 'Generativa',
  jogos: 'Jogos',
  assinaturas: 'Assinaturas',
  utilidade: 'Utilidade',
}

/** Uma das quatro ilustrações do Figma; o cliente monta as URLs das variantes otimizadas. */
export const nftImageSchema = z.enum([
  'ape-oculos',
  'gorila-chapeu',
  'ape-gola-alta',
  'macaco-fone',
])
export type NftImage = z.infer<typeof nftImageSchema>

export const editionSchema = z.object({
  /** "1-1", "1-10", "1-50" ou "aberta". */
  id: z.string(),
  label: z.string(),
  /** Tiragem total; `null` para edição aberta. */
  supply: z.nullable(z.int()),
  /** Unidades ainda disponíveis para compra. 0 = esgotada. */
  available: z.int().check(z.nonnegative()),
})
export type Edition = z.infer<typeof editionSchema>

export const nftSummarySchema = z.object({
  id: z.string(),
  name: z.string(),
  tokenId: z.string(),
  image: nftImageSchema,
  category: categorySchema,
  collection: z.string(),
  network: networkSchema,
  price: ethAmountSchema,
  /** Preço anterior, exibido riscado quando o NFT está em oferta. */
  previousPrice: z.nullable(ethAmountSchema),
  rarity: z.enum(['comum', 'raro']),
  /** Soma das unidades disponíveis em todas as edições. */
  available: z.int().check(z.nonnegative()),
  /** Incrementada a cada alteração de preço ou disponibilidade; ordena os eventos. */
  version: z.int(),
})
export type NftSummary = z.infer<typeof nftSummarySchema>

export const nftDetailSchema = z.extend(nftSummarySchema, {
  description: z.string(),
  story: z.array(z.string()),
  attributes: z.array(z.string()),
  editions: z.array(editionSchema),
  /** Limite por compra, além da disponibilidade da edição. */
  maxPerOrder: z.int(),
  creator: z.string(),
  contract: z.string(),
  royaltyPercent: z.number(),
  rating: z.object({ average: z.number(), count: z.int() }),
  createdAt: isoDateTimeSchema,
})
export type NftDetail = z.infer<typeof nftDetailSchema>

export const catalogTabSchema = z.enum(['todos', 'novos', 'em-alta'])
export type CatalogTab = z.infer<typeof catalogTabSchema>

export const catalogSortSchema = z.enum(['recentes', 'menor-preco', 'maior-preco', 'nome'])
export type CatalogSort = z.infer<typeof catalogSortSchema>

/** Parâmetros de GET /api/nfts (todos opcionais; listas separadas por vírgula na query string). */
export interface CatalogQuery {
  q?: string
  categories?: Category[]
  networks?: ('ethereum' | 'polygon' | 'solana')[]
  minPrice?: string
  maxPrice?: string
  tab?: CatalogTab
  sort?: CatalogSort
  collection?: string
  page?: number
  pageSize?: number
}

const facetSchema = z.object({ id: z.string(), label: z.string(), count: z.int() })

export const catalogPageSchema = z.extend(pageSchema(nftSummarySchema), {
  facets: z.object({
    categories: z.array(facetSchema),
    networks: z.array(facetSchema),
    priceRange: z.object({ min: ethAmountSchema, max: ethAmountSchema }),
  }),
})
export type CatalogPage = z.infer<typeof catalogPageSchema>

export const highlightsSchema = z.object({
  hero: z.array(nftSummarySchema),
  featured: nftSummarySchema,
})
export type Highlights = z.infer<typeof highlightsSchema>
