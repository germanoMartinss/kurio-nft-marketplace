import { queryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  changePassword,
  getProfile,
  removeAvatar,
  updateAvatar,
  updateProfile,
} from '@/api/profile'
import { createWallet, updateWallet } from '@/api/wallets'
import type { Profile } from '@/contracts/profile'
import { sessionStore, useSessionUser } from '@/features/auth/session-store'
import { walletKeys } from '@/features/wallets/queries'

export const profileKeys = {
  detail: (userId: string) => ['user', userId, 'profile'] as const,
}

export function useProfile() {
  const user = useSessionUser()
  return useQuery({
    ...queryOptions({
      queryKey: profileKeys.detail(user?.id ?? ''),
      queryFn: ({ signal }) => getProfile(signal),
    }),
    enabled: Boolean(user),
  })
}

/** Grava o perfil devolvido pela API no cache e na sessão (nome e avatar aparecem no header). */
function useSaveProfileResult() {
  const queryClient = useQueryClient()
  const user = useSessionUser()
  return (profile: Profile) => {
    if (!user) return
    queryClient.setQueryData(profileKeys.detail(user.id), profile)
    sessionStore.setUser({
      ...user,
      displayName: profile.displayName,
      username: profile.username,
      email: profile.email,
      avatarUrl: profile.avatarUrl,
    })
  }
}

export function useProfileMutations() {
  const save = useSaveProfileResult()
  return {
    update: useMutation({ mutationFn: updateProfile, onSuccess: save }),
    avatar: useMutation({ mutationFn: updateAvatar, onSuccess: save }),
    removeAvatar: useMutation({ mutationFn: removeAvatar, onSuccess: save }),
    password: useMutation({ mutationFn: changePassword }),
  }
}

export function useWalletMutations() {
  const queryClient = useQueryClient()
  const user = useSessionUser()
  const refresh = () => {
    if (user) void queryClient.invalidateQueries({ queryKey: walletKeys.list(user.id) })
  }
  return {
    create: useMutation({ mutationFn: createWallet, onSuccess: refresh }),
    update: useMutation({
      mutationFn: ({ id, ...input }: { id: string } & Parameters<typeof updateWallet>[1]) =>
        updateWallet(id, input),
      onSuccess: refresh,
    }),
  }
}
