import { useId, useRef, useState, type FormEvent } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'

const emailSchema = z.email('Informe um e-mail válido, como nome@exemplo.com.')

export function NewsletterForm() {
  const inputId = useId()
  const errorId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const email = new FormData(event.currentTarget).get('email')
    const result = emailSchema.safeParse(typeof email === 'string' ? email.trim() : '')
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? 'E-mail inválido.')
      inputRef.current?.focus()
      return
    }
    setError(null)
    // A inscrição passa a ser enviada à API simulada na Fase 3 (camada de mocks).
    toast.info('Inscrição indisponível', {
      description: 'A newsletter ainda não está ativa nesta demonstração.',
    })
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-2">
      <label htmlFor={inputId} className="sr-only">
        E-mail para receber novidades
      </label>
      <div className="flex">
        <input
          ref={inputRef}
          id={inputId}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="digite seu e-mail..."
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className="h-10 min-w-0 flex-1 rounded-l-xs border border-transparent bg-surface-dark px-3 text-15 outline-none placeholder:text-subtle focus-visible:border-primary focus-visible:outline-none aria-invalid:border-coral"
        />
        <button
          type="submit"
          className="h-10 rounded-r-xs bg-primary px-4 text-18 font-bold text-primary-foreground hover:brightness-110"
        >
          Enviar
        </button>
      </div>
      {error ? (
        <p id={errorId} role="alert" className="text-13 text-coral">
          {error}
        </p>
      ) : null}
      <p className="text-13 leading-[22px] text-subtle">
        Receba lançamentos selecionados, histórias de criadores e novidades do mercado.
      </p>
    </form>
  )
}
