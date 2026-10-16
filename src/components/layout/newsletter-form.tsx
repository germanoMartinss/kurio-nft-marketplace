import { useMutation } from '@tanstack/react-query'
import { useId, useRef, useState, type FormEvent } from 'react'
import { toast } from 'sonner'

import { ApiRequestError } from '@/api/errors'
import { subscribeNewsletter } from '@/api/system'
import { newsletterRequestSchema } from '@/contracts/system'

export function NewsletterForm() {
  const inputId = useId()
  const errorId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)

  const subscription = useMutation({
    mutationFn: subscribeNewsletter,
    onSuccess: (result) => {
      setError(null)
      inputRef.current?.form?.reset()
      toast.success(result.alreadySubscribed ? 'Você já está inscrito' : 'Inscrição confirmada', {
        description: `Enviaremos os próximos lançamentos para ${result.email}.`,
      })
    },
    onError: (failure) => {
      const message =
        failure instanceof ApiRequestError
          ? (failure.fieldErrors.email ?? failure.message)
          : 'Não foi possível concluir a inscrição.'
      setError(message)
      inputRef.current?.focus()
    },
  })

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const email = new FormData(event.currentTarget).get('email')
    const result = newsletterRequestSchema.safeParse({
      email: typeof email === 'string' ? email : '',
    })
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? 'E-mail inválido.')
      inputRef.current?.focus()
      return
    }
    subscription.mutate(result.data)
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
          disabled={subscription.isPending}
          className="h-10 rounded-r-xs bg-primary px-4 text-18 font-bold text-primary-foreground hover:brightness-110 disabled:opacity-60"
        >
          {subscription.isPending ? 'Enviando…' : 'Enviar'}
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
