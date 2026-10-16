import * as z from 'zod/mini'

/** GET /api/favorites — ids dos NFTs favoritados pelo usuário autenticado. */
export const favoritesSchema = z.object({ nftIds: z.array(z.string()) })
export type Favorites = z.infer<typeof favoritesSchema>
