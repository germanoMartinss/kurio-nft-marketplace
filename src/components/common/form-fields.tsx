import { useId, useState, type ComponentProps, type ReactNode } from 'react'
import type { FieldError as RhfError, UseFormRegisterReturn } from 'react-hook-form'

import { Eye, EyeOff } from '@/components/icons'
import { FieldError } from '@/features/auth/form-fields'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

/** Campo com rótulo visível; o asterisco (coral) é decorativo, `required` é anunciado pelo atributo. */
export function Field({
  label,
  required,
  error,
  className,
  children,
}: {
  label: string
  required?: boolean
  error?: RhfError
  className?: string
  children: (props: {
    id: string
    'aria-invalid'?: true
    'aria-describedby'?: string
    'aria-required'?: true
  }) => ReactNode
}) {
  const id = useId()
  const errorId = `${id}-erro`
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="text-15 leading-5">
        {label}
        {required ? (
          <span aria-hidden="true" className="ml-1 text-coral">
            *
          </span>
        ) : null}
      </label>
      {children({
        id,
        'aria-invalid': error ? true : undefined,
        'aria-describedby': error ? errorId : undefined,
        'aria-required': required ? true : undefined,
      })}
      <FieldError id={errorId}>{error?.message}</FieldError>
    </div>
  )
}

export function TextInput({
  label,
  required,
  error,
  registration,
  className,
  ...props
}: {
  label: string
  required?: boolean
  error?: RhfError
  registration?: UseFormRegisterReturn
  className?: string
} & Omit<ComponentProps<'input'>, 'ref'>) {
  return (
    <Field label={label} required={required} error={error} className={className}>
      {(aria) => <Input {...aria} {...registration} {...props} />}
    </Field>
  )
}

export function NoteField({
  registration,
  error,
}: {
  registration: UseFormRegisterReturn
  error?: RhfError
}) {
  return (
    <Field label="Observação do colecionador (opcional)" error={error}>
      {(aria) => <Textarea {...aria} {...registration} maxLength={280} className="max-w-[350px]" />}
    </Field>
  )
}

/** `<select>` nativo com o visual dos campos (acessível por teclado e leitores de tela). */
export function NativeSelect({ className, children, ...props }: ComponentProps<'select'>) {
  return (
    <select
      {...props}
      className={cn(
        'h-10 w-full rounded-xs border border-input bg-background px-3 text-15 text-foreground outline-none focus-visible:border-primary disabled:opacity-50 aria-invalid:border-coral',
        className,
      )}
    >
      {children}
    </select>
  )
}

/** Senha com botão de mostrar/ocultar (`aria-pressed`) e rótulo visível. */
export function PasswordInput({
  label,
  error,
  registration,
  autoComplete,
}: {
  label: string
  error?: RhfError
  registration: UseFormRegisterReturn
  autoComplete: string
}) {
  const [visible, setVisible] = useState(false)
  return (
    <Field label={label} error={error}>
      {(aria) => (
        <div className="relative">
          <Input
            {...aria}
            {...registration}
            type={visible ? 'text' : 'password'}
            autoComplete={autoComplete}
            className="pr-11"
          />
          <button
            type="button"
            aria-label={`${visible ? 'Ocultar' : 'Mostrar'} ${label.toLowerCase()}`}
            aria-pressed={visible}
            onClick={() => setVisible((value) => !value)}
            className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-subtle hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
          >
            {visible ? <Eye className="size-[18px]" /> : <EyeOff className="size-[18px]" />}
          </button>
        </div>
      )}
    </Field>
  )
}

/** Campo "Nome ENS": sufixo ".eth" fixo à esquerda, como no Figma. */
export function EnsInput({
  label = 'Nome ENS',
  required,
  error,
  registration,
}: {
  label?: string
  required?: boolean
  error?: RhfError
  registration: UseFormRegisterReturn
}) {
  return (
    <Field label={label} required={required} error={error}>
      {(aria) => (
        <div className="flex gap-2">
          <span
            aria-hidden="true"
            className="flex h-10 shrink-0 items-center rounded-xs border border-input px-3 text-15 text-muted-foreground"
          >
            .eth
          </span>
          <Input {...aria} {...registration} autoCapitalize="none" />
        </div>
      )}
    </Field>
  )
}
