import {
  profileSchema,
  type AvatarUpdate,
  type PasswordChange,
  type ProfileUpdate,
} from '@/contracts/profile'

import { http } from './http'
import { parseResponse } from './parse'

export async function getProfile(signal?: AbortSignal) {
  const { data } = await http.get<unknown>('/profile', { signal })
  return parseResponse(profileSchema, data)
}

export async function updateProfile(body: ProfileUpdate) {
  const { data } = await http.patch<unknown>('/profile', body)
  return parseResponse(profileSchema, data)
}

export async function updateAvatar(body: AvatarUpdate) {
  const { data } = await http.put<unknown>('/profile/avatar', body)
  return parseResponse(profileSchema, data)
}

export async function removeAvatar() {
  const { data } = await http.delete<unknown>('/profile/avatar')
  return parseResponse(profileSchema, data)
}

export async function changePassword(body: PasswordChange) {
  await http.post('/profile/password', body)
}
