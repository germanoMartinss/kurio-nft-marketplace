import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { Link } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'

import { ApiRequestError } from '@/api/errors'
import { UnavailableAction } from '@/components/common/unavailable-action'
import { Button } from '@/components/ui/button'
import { loginRequestSchema, type LoginRequest } from '@/contracts/auth'
import { cn } from '@/lib/utils'

import { FieldError, PasswordField, TextField, type AuthVariant } from './form-fields'
import { SocialButtons } from './social-buttons'
import { useLogin } from './use-auth'

export function LoginForm({
  variant,
  redirect,
  onAuthenticated,
}: {
  variant: AuthVariant
  redirect?: string
  onAuthenticated: () => void
}) {
  const login = useLogin()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: standardSchemaResolver(loginRequestSchema),
    defaultValues: { email: '', password: '' },
  })

  const formError =
    login.error instanceof ApiRequestError
      ? login.error.message
      : login.error
        ? 'Não foi possível entrar. Tente novamente.'
        : undefined

  const submit = handleSubmit((values) =>
    login.mutate(values, {
      onSuccess: onAuthenticated,
      onError: (error) => {
        if (error instanceof ApiRequestError)
          for (const [field, message] of Object.entries(error.fieldErrors))
            if (field === 'email' || field === 'password') setError(field, { message })
      },
    }),
  )

  const page = variant === 'page'
  return (
    <form onSubmit={submit} noValidate aria-label="Entrar" className="flex flex-col">
      <div className="flex flex-col gap-3">
        <TextField
          label="E-mail"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="contato@email.com"
          variant={variant}
          error={errors.email?.message}
          {...register('email')}
        />
        <PasswordField
          label="Senha"
          autoComplete="current-password"
          variant={variant}
          error={errors.password?.message}
          {...register('password')}
        />
      </div>
      <UnavailableAction
        feature="Recuperação de senha"
        className="mt-3 self-end text-13 text-accent-text hover:text-primary"
      >
        Esqueceu a senha?
      </UnavailableAction>

      <div aria-live="polite">
        {formError ? <FieldError id="login-erro">{formError}</FieldError> : null}
      </div>

      <Button
        type="submit"
        disabled={login.isPending}
        aria-busy={login.isPending}
        className={cn('mt-6 w-full', page ? 'h-[58px] rounded-[12px]' : 'h-12 rounded-xs')}
      >
        {login.isPending ? 'Entrando…' : 'Entrar'}
      </Button>

      <SocialButtons variant={variant} />

      {page ? (
        <p className="mt-10 text-center text-14 text-muted-foreground">
          Novo na Kurio?{' '}
          <Link
            to="/cadastro"
            search={{ redirect }}
            replace
            className="text-accent-text underline underline-offset-4"
          >
            Crie uma conta
          </Link>
        </p>
      ) : null}
    </form>
  )
}
