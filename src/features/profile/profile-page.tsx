import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod/mini'

import { ApiRequestError } from '@/api/errors'
import { EnsInput, PasswordInput, TextInput } from '@/components/common/form-fields'
import { ErrorState } from '@/components/common/query-states'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
  passwordChangeSchema,
  profileUpdateSchema,
  type Profile,
  type ProfileUpdate,
} from '@/contracts/profile'

import { AvatarField } from './avatar-field'
import { ProfileLayout } from './profile-layout'
import { useProfile, useProfileMutations } from './queries'

interface FormValues extends ProfileUpdate {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

const toValues = (profile: Profile): FormValues => ({
  displayName: profile.displayName,
  username: profile.username,
  email: profile.email,
  ensName: profile.ensName,
  walletNickname: profile.walletNickname,
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

export function ProfilePage() {
  const query = useProfile()
  return (
    <ProfileLayout title="Perfil do colecionador">
      {query.isPending ? (
        <ProfileSkeleton />
      ) : query.isError ? (
        <ErrorState
          title="Não foi possível carregar o perfil"
          message="Verifique sua conexão e tente novamente."
          onRetry={() => void query.refetch()}
          retrying={query.isFetching}
        />
      ) : (
        <ProfileForm profile={query.data} />
      )}
    </ProfileLayout>
  )
}

function ProfileSkeleton() {
  return (
    <div
      aria-busy="true"
      role="status"
      aria-label="Carregando perfil"
      className="grid gap-5 lg:grid-cols-2"
    >
      {Array.from({ length: 6 }, (_, index) => (
        <Skeleton key={index} className="h-[68px]" />
      ))}
    </div>
  )
}

function ProfileForm({ profile }: { profile: Profile }) {
  const { update, password } = useProfileMutations()
  const {
    register,
    handleSubmit,
    setError,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: standardSchemaResolver(
      z.extend(profileUpdateSchema, {
        currentPassword: z.string(),
        newPassword: z.string(),
        confirmPassword: z.string(),
      }),
    ),
    defaultValues: toValues(profile),
  })

  // O servidor é a fonte da verdade: depois de salvar (ou de um refetch), o formulário o acompanha.
  useEffect(() => {
    reset((current) => ({ ...toValues(profile), ...passwordFieldsOf(current) }))
  }, [profile, reset])

  const submit = handleSubmit(async (values) => {
    const wantsPassword = Boolean(
      values.currentPassword || values.newPassword || values.confirmPassword,
    )
    if (wantsPassword && !validatePassword(values, setError)) return

    try {
      await update.mutateAsync({
        displayName: values.displayName,
        username: values.username,
        email: values.email,
        ensName: values.ensName,
        walletNickname: values.walletNickname,
      })
    } catch (error) {
      if (error instanceof ApiRequestError) {
        for (const [field, message] of Object.entries(error.fieldErrors))
          if (field in values) setError(field as keyof FormValues, { message })
        if (Object.keys(error.fieldErrors).length === 0) toast.error(error.message)
      } else toast.error('Não foi possível salvar o perfil. Tente novamente.')
      return
    }
    if (wantsPassword) {
      try {
        await password.mutateAsync({
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        })
        reset({ ...getValues(), currentPassword: '', newPassword: '', confirmPassword: '' })
        toast.success('Perfil e senha atualizados', {
          description: 'As outras sessões da sua conta foram encerradas.',
        })
      } catch (error) {
        toast.warning('Dados salvos, mas a senha não foi alterada')
        if (error instanceof ApiRequestError)
          for (const [field, message] of Object.entries(error.fieldErrors))
            if (field === 'currentPassword' || field === 'newPassword') setError(field, { message })
      }
      return
    }
    toast.success('Perfil atualizado')
  })

  const saving = update.isPending || password.isPending
  return (
    <div className="flex flex-col gap-8">
      <form
        onSubmit={submit}
        noValidate
        aria-label="Perfil do colecionador"
        className="grid gap-x-7 gap-y-5 lg:grid-cols-2"
      >
        <TextInput
          label="Nome de exibição"
          required
          autoComplete="name"
          error={errors.displayName}
          registration={register('displayName')}
        />
        <TextInput
          label="Nome de usuário"
          required
          autoComplete="username"
          error={errors.username}
          registration={register('username')}
        />
        <TextInput
          label="E-mail"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          error={errors.email}
          registration={register('email')}
        />
        <EnsInput required error={errors.ensName} registration={register('ensName')} />
        <TextInput
          label="Apelido da carteira"
          required
          error={errors.walletNickname}
          registration={register('walletNickname')}
        />
        <div className="lg:col-start-2 lg:row-span-1 lg:row-start-3">
          <AvatarField profile={profile} />
        </div>

        <fieldset className="mt-3 flex flex-col gap-5 lg:col-start-1">
          <legend className="mb-5 text-18 font-bold">Alterar senha</legend>
          <PasswordInput
            label="Senha atual"
            autoComplete="current-password"
            error={errors.currentPassword}
            registration={register('currentPassword')}
          />
          <PasswordInput
            label="Nova senha"
            autoComplete="new-password"
            error={errors.newPassword}
            registration={register('newPassword')}
          />
          <PasswordInput
            label="Confirmar nova senha"
            autoComplete="new-password"
            error={errors.confirmPassword}
            registration={register('confirmPassword')}
          />
        </fieldset>

        <div className="lg:col-span-2">
          <Button type="submit" className="h-10 px-9 max-lg:w-full" disabled={saving}>
            {saving ? 'Salvando…' : 'Salvar'}
          </Button>
        </div>
      </form>
    </div>
  )
}

const passwordFieldsOf = ({ currentPassword, newPassword, confirmPassword }: FormValues) => ({
  currentPassword,
  newPassword,
  confirmPassword,
})

/** Regras da troca de senha no cliente (as da API se repetem lá); devolve se pode seguir. */
function validatePassword(
  values: FormValues,
  setError: (field: keyof FormValues, error: { message: string }) => void,
) {
  let valid = true
  const parsed = z.safeParse(passwordChangeSchema, {
    currentPassword: values.currentPassword,
    newPassword: values.newPassword,
  })
  if (!parsed.success) {
    const reported = new Set<string>()
    for (const issue of parsed.error.issues) {
      const field = issue.path[0]
      // Uma mensagem por campo: a primeira regra violada.
      if ((field === 'currentPassword' || field === 'newPassword') && !reported.has(field)) {
        reported.add(field)
        setError(field, { message: issue.message })
      }
    }
    valid = false
  }
  if (values.confirmPassword !== values.newPassword) {
    setError('confirmPassword', { message: 'A confirmação não confere com a nova senha.' })
    valid = false
  }
  return valid
}
