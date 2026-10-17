import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { Link } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import * as z from 'zod/mini'

import { ApiRequestError } from '@/api/errors'
import { Button } from '@/components/ui/button'
import { registerRequestSchema } from '@/contracts/auth'
import { cn } from '@/lib/utils'

import { FieldError, PasswordField, TextField, type AuthVariant } from './form-fields'
import { SocialButtons } from './social-buttons'
import { useRegister } from './use-auth'

/** Contrato da API + confirmação da senha, que só existe no formulário. */
const registerFormSchema = z
  .object({ ...registerRequestSchema.shape, confirmPassword: z.string() })
  .check(
    z.refine((values) => values.password === values.confirmPassword, {
      path: ['confirmPassword'],
      message: 'As senhas não coincidem.',
    }),
  )
type RegisterFormValues = z.infer<typeof registerFormSchema>

const FIELDS = ['username', 'email', 'password'] as const

export function RegisterForm({
  variant,
  redirect,
  onAuthenticated,
}: {
  variant: AuthVariant
  redirect?: string
  onAuthenticated: () => void
}) {
  const registration = useRegister()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: standardSchemaResolver(registerFormSchema),
    defaultValues: { username: '', email: '', password: '', confirmPassword: '' },
  })

  // Erros de campo da API (conflito de e-mail/usuário, validação) ficam junto do campo; os
  // demais (rede, 5xx) aparecem acima do botão.
  const formError =
    registration.error instanceof ApiRequestError
      ? Object.keys(registration.error.fieldErrors).some((field) =>
          (FIELDS as readonly string[]).includes(field),
        )
        ? undefined
        : registration.error.message
      : registration.error
        ? 'Não foi possível criar a conta. Tente novamente.'
        : undefined

  const submit = handleSubmit(({ username, email, password }) =>
    registration.mutate(
      { username, email, password },
      {
        onSuccess: onAuthenticated,
        onError: (error) => {
          if (!(error instanceof ApiRequestError)) return
          let first = true
          for (const [field, message] of Object.entries(error.fieldErrors)) {
            if ((FIELDS as readonly string[]).includes(field)) {
              setError(field as (typeof FIELDS)[number], { message }, { shouldFocus: first })
              first = false
            }
          }
        },
      },
    ),
  )

  const page = variant === 'page'
  return (
    <form onSubmit={submit} noValidate aria-label="Criar conta" className="flex flex-col">
      <div className="flex flex-col gap-3">
        <TextField
          label="Nome de usuário"
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          variant={variant}
          error={errors.username?.message}
          {...register('username')}
        />
        <TextField
          label="Digite seu e-mail"
          type="email"
          autoComplete="email"
          inputMode="email"
          variant={variant}
          error={errors.email?.message}
          {...register('email')}
        />
        <PasswordField
          label="Senha"
          autoComplete="new-password"
          variant={variant}
          error={errors.password?.message}
          {...register('password')}
        />
        <PasswordField
          label="Confirmar senha"
          autoComplete="new-password"
          variant={variant}
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />
      </div>

      <div aria-live="polite">
        {formError ? <FieldError id="cadastro-erro">{formError}</FieldError> : null}
      </div>

      <Button
        type="submit"
        disabled={registration.isPending}
        aria-busy={registration.isPending}
        className={cn('mt-8 w-full', page ? 'h-[58px] rounded-[12px]' : 'h-12 rounded-xs')}
      >
        {registration.isPending ? 'Criando…' : page ? 'Criar perfil' : 'Criar conta'}
      </Button>

      <SocialButtons variant={variant} />

      {page ? (
        <p className="mt-10 text-center text-16 text-muted-foreground">
          Já tem uma conta?{' '}
          <Link
            to="/entrar"
            search={{ redirect }}
            replace
            className="text-accent-text underline underline-offset-4"
          >
            Entre
          </Link>
        </p>
      ) : null}
    </form>
  )
}
