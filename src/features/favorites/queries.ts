import { queryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useLocation, useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

import { addFavorite, getFavorites, removeFavorite } from '@/api/favorites'
import type { Favorites } from '@/contracts/favorites'
import { useSessionUser } from '@/features/auth/session-store'

/** Favoritos são privados: a chave fica sob o usuário, e nunca é compartilhada entre sessões. */
export const favoriteKeys = {
  list: (userId: string) => ['user', userId, 'favorites'] as const,
}

export const favoritesQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: favoriteKeys.list(userId),
    queryFn: ({ signal }) => getFavorites(signal),
  })

export function useFavorites() {
  const user = useSessionUser()
  const query = useQuery({ ...favoritesQueryOptions(user?.id ?? ''), enabled: Boolean(user) })
  return { user, ids: new Set(query.data?.nftIds ?? []), query }
}

/**
 * Alternar favorito com atualização otimista: o coração muda na hora; se a API falhar, o estado
 * anterior é restaurado e o usuário é avisado. Sem sessão, leva ao login e volta para cá.
 */
export function useToggleFavorite() {
  const queryClient = useQueryClient()
  const user = useSessionUser()
  const navigate = useNavigate()
  const location = useLocation()

  const mutation = useMutation({
    mutationFn: ({ nftId, favorite }: { nftId: string; favorite: boolean; name: string }) =>
      favorite ? addFavorite(nftId) : removeFavorite(nftId),
    onMutate: async ({ nftId, favorite }) => {
      const key = favoriteKeys.list(user!.id)
      await queryClient.cancelQueries({ queryKey: key })
      const previous = queryClient.getQueryData<Favorites>(key)
      queryClient.setQueryData<Favorites>(key, (data) => {
        const ids = new Set(data?.nftIds ?? [])
        if (favorite) ids.add(nftId)
        else ids.delete(nftId)
        return { nftIds: [...ids] }
      })
      return { previous, key }
    },
    onError: (_error, { favorite, name }, context) => {
      if (context) queryClient.setQueryData(context.key, context.previous)
      toast.error(
        favorite ? 'Não foi possível favoritar' : 'Não foi possível remover dos favoritos',
        {
          description: `${name} voltou ao estado anterior. Tente novamente.`,
        },
      )
    },
    onSuccess: (_data, { favorite, name }) => {
      toast.success(
        favorite
          ? `${name} adicionado à lista de interesse`
          : `${name} removido da lista de interesse`,
      )
    },
    onSettled: (_data, _error, _variables, context) => {
      if (context) void queryClient.invalidateQueries({ queryKey: context.key })
    },
  })

  return (nftId: string, name: string, favorite: boolean) => {
    if (!user) {
      void navigate({ to: '/entrar', search: { redirect: location.href } })
      return
    }
    mutation.mutate({ nftId, favorite, name })
  }
}
