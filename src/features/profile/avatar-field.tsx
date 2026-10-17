import { useRef, useState } from 'react'
import { toast } from 'sonner'

import { ApiRequestError } from '@/api/errors'
import { ImagePlaceholder } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { AVATAR_MAX_BYTES, AVATAR_TYPES, type Profile } from '@/contracts/profile'
import { FieldError } from '@/features/auth/form-fields'

import { useProfileMutations } from './queries'

const readAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })

/** Avatar: escolher imagem (PNG, JPEG ou WebP até 1 MB) envia à API; "Remover" volta ao ícone. */
export function AvatarField({ profile }: { profile: Profile }) {
  const { avatar, removeAvatar } = useProfileMutations()
  const input = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)
  const busy = avatar.isPending || removeAvatar.isPending

  const onFile = async (file: File | undefined) => {
    if (!file) return
    setError(null)
    if (!(AVATAR_TYPES as readonly string[]).includes(file.type)) {
      setError('Envie uma imagem PNG, JPEG ou WebP.')
      return
    }
    if (file.size > AVATAR_MAX_BYTES) {
      setError('A imagem deve ter no máximo 1 MB.')
      return
    }
    try {
      const dataUrl = await readAsDataUrl(file)
      await avatar.mutateAsync({ dataUrl })
      toast.success('Avatar atualizado')
    } catch (failure) {
      setError(
        failure instanceof ApiRequestError
          ? (failure.fieldErrors.dataUrl ?? failure.message)
          : 'Não foi possível enviar a imagem. Tente novamente.',
      )
    } finally {
      if (input.current) input.current.value = ''
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-15 leading-5" id="avatar-rotulo">
        Avatar
      </p>
      <div className="flex items-center gap-5" role="group" aria-labelledby="avatar-rotulo">
        <span className="flex size-[50px] shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-card text-primary">
          {profile.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt={`Avatar de ${profile.displayName}`}
              className="size-full object-cover"
            />
          ) : (
            <span role="img" aria-label="Sem avatar" className="flex">
              <ImagePlaceholder className="size-6" aria-hidden="true" />
            </span>
          )}
        </span>
        <input
          ref={input}
          type="file"
          accept={AVATAR_TYPES.join(',')}
          className="sr-only"
          aria-label="Escolher imagem do avatar"
          tabIndex={-1}
          onChange={(event) => void onFile(event.target.files?.[0])}
        />
        <Button
          type="button"
          size="sm"
          className="h-10 px-6"
          disabled={busy}
          onClick={() => input.current?.click()}
        >
          {avatar.isPending ? 'Enviando…' : 'Alterar'}
        </Button>
        <button
          type="button"
          disabled={busy || !profile.avatarUrl}
          onClick={() =>
            removeAvatar.mutate(undefined, { onSuccess: () => toast.success('Avatar removido') })
          }
          className="text-15 hover:text-accent-text disabled:opacity-50"
        >
          Remover
          <span className="sr-only"> avatar</span>
        </button>
      </div>
      <FieldError id="avatar-erro">{error ?? undefined}</FieldError>
    </div>
  )
}
