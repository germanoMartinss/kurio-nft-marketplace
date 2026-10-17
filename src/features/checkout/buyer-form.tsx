import { useId, type ComponentProps, type ReactNode } from 'react'
import type { FieldError as RhfError, UseFormRegisterReturn } from 'react-hook-form'

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
