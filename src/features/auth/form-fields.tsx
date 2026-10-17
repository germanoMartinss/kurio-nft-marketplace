import { useId, useState, type ComponentProps, type ReactNode, type Ref } from 'react'

import { Eye, EyeOff, WarningCircle } from '@/components/icons'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

/** Estilo dos campos: desktop segue o diálogo (raio 3px, 40px); mobile, o frame (raio 12px, 48px). */
export type AuthVariant = 'dialog' | 'page'

const fieldClass = (variant: AuthVariant) =>
  variant === 'page' ? 'h-[50px] rounded-[12px] border-border px-4 text-14' : ''

/** Mensagem de erro de campo: ícone + texto (não depende só de cor), ligada ao campo por id. */
export function FieldError({ id, children }: { id: string; children?: ReactNode }) {
  if (!children) return null
  return (
    <p id={id} role="alert" className="mt-1.5 flex items-start gap-1.5 text-13 text-coral">
      <WarningCircle className="mt-px size-3.5 shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </p>
  )
}

interface TextFieldProps extends Omit<ComponentProps<'input'>, 'ref'> {
  label: string
  error?: string
  variant: AuthVariant
  inputRef?: Ref<HTMLInputElement>
}

/**
 * Campo do Figma (só placeholder visível) com rótulo acessível: o `label` fica oculto
 * visualmente mas é a alternativa textual do campo, já que o placeholder some ao digitar.
 */
export function TextField({
  label,
  error,
  variant,
  className,
  inputRef,
  ...props
}: TextFieldProps) {
  const id = useId()
  const errorId = `${id}-erro`
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <Input
        id={id}
        ref={inputRef}
        placeholder={label}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(fieldClass(variant), className)}
        {...props}
      />
      <FieldError id={errorId}>{error}</FieldError>
    </div>
  )
}

/** Campo de senha com botão de mostrar/ocultar (`aria-pressed`). */
export function PasswordField({
  label,
  error,
  variant,
  className,
  inputRef,
  ...props
}: TextFieldProps) {
  const id = useId()
  const errorId = `${id}-erro`
  const [visible, setVisible] = useState(false)
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="relative">
        <Input
          id={id}
          ref={inputRef}
          type={visible ? 'text' : 'password'}
          placeholder={label}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(fieldClass(variant), 'pr-11', className)}
          {...props}
        />
        <button
          type="button"
          aria-label={visible ? 'Ocultar senha' : 'Mostrar senha'}
          aria-pressed={visible}
          onClick={() => setVisible((value) => !value)}
          className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-subtle hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
        >
          {visible ? <Eye className="size-[18px]" /> : <EyeOff className="size-[18px]" />}
        </button>
      </div>
      <FieldError id={errorId}>{error}</FieldError>
    </div>
  )
}
