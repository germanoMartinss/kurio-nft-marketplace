import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { ApiRequestError } from '@/api/errors'
import { EnsInput, Field, NativeSelect, TextInput } from '@/components/common/form-fields'
import { Button } from '@/components/ui/button'
import { NETWORK_LABELS, networkSchema } from '@/contracts/common'
import {
  walletInputSchema,
  WALLET_PROVIDER_LABELS,
  walletProviderSchema,
  type Wallet,
  type WalletInput,
  type WalletKind,
} from '@/contracts/wallet'

import { useWalletMutations } from './queries'

const EMPTY_WALLET: WalletInput = {
  displayName: '',
  nickname: '',
  profileName: '',
  network: '' as WalletInput['network'],
  address: '',
  secondaryAddress: '',
  provider: '' as WalletInput['provider'],
  referralCode: '',
  email: '',
  ensName: '',
}

const toInput = (wallet: Wallet): WalletInput => {
  const { id: _id, kind: _kind, ...input } = wallet
  return input
}

/**
 * Formulário de carteira (principal ou secundária): cria quando não existe, edita quando existe.
 * Erros de validação do cliente e da API (`fieldErrors`) ficam associados aos campos.
 */
export function WalletForm({
  kind,
  wallet,
  defaults,
  submitLabel,
}: {
  kind: WalletKind
  wallet?: Wallet
  defaults?: Partial<WalletInput>
  submitLabel: string
}) {
  const { create, update } = useWalletMutations()
  const label = kind === 'principal' ? 'principal' : 'secundária'
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<WalletInput>({
    resolver: standardSchemaResolver(walletInputSchema),
    defaultValues: wallet ? toInput(wallet) : { ...EMPTY_WALLET, ...defaults },
  })

  const submit = handleSubmit(async (values) => {
    try {
      if (wallet) await update.mutateAsync({ id: wallet.id, ...values })
      else await create.mutateAsync({ ...values, kind })
      toast.success(wallet ? `Carteira ${label} atualizada` : `Carteira ${label} cadastrada`)
    } catch (error) {
      if (error instanceof ApiRequestError) {
        for (const [field, message] of Object.entries(error.fieldErrors))
          if (field in values) setError(field as keyof WalletInput, { message })
        if (Object.keys(error.fieldErrors).length === 0) toast.error(error.message)
      } else toast.error('Não foi possível salvar a carteira. Tente novamente.')
    }
  })

  const pending = create.isPending || update.isPending
  return (
    <form
      onSubmit={submit}
      noValidate
      aria-label={`Carteira ${label}`}
      className="grid grid-cols-[minmax(0,1fr)] gap-x-7 gap-y-5 lg:grid-cols-2"
    >
      <TextInput
        label="Nome de exibição"
        required
        error={errors.displayName}
        registration={register('displayName')}
      />
      <TextInput
        label="Apelido da carteira"
        required
        error={errors.nickname}
        registration={register('nickname')}
      />
      <Field label="Rede" required error={errors.network}>
        {(aria) => (
          <NativeSelect {...aria} {...register('network')}>
            <option value="" disabled>
              Selecione uma rede
            </option>
            {networkSchema.options.map((network) => (
              <option key={network} value={network}>
                {NETWORK_LABELS[network]}
              </option>
            ))}
          </NativeSelect>
        )}
      </Field>
      <TextInput
        label="Nome do perfil"
        required
        error={errors.profileName}
        registration={register('profileName')}
      />
      <TextInput
        label="Endereço da carteira"
        required
        placeholder="Endereço 0x da carteira"
        autoComplete="off"
        error={errors.address}
        registration={register('address')}
      />
      <TextInput
        label="ENS ou carteira secundária (opcional)"
        placeholder="ENS ou carteira secundária (opcional)"
        error={errors.secondaryAddress}
        registration={register('secondaryAddress')}
      />
      <Field label="Tipo de carteira" required error={errors.provider}>
        {(aria) => (
          <NativeSelect {...aria} {...register('provider')}>
            <option value="" disabled>
              Selecione uma carteira
            </option>
            {walletProviderSchema.options.map((provider) => (
              <option key={provider} value={provider}>
                {WALLET_PROVIDER_LABELS[provider]}
              </option>
            ))}
          </NativeSelect>
        )}
      </Field>
      <TextInput
        label="Código de indicação"
        required
        error={errors.referralCode}
        registration={register('referralCode')}
      />
      <TextInput
        label="E-mail"
        type="email"
        required
        autoComplete="email"
        error={errors.email}
        registration={register('email')}
      />
      <EnsInput required error={errors.ensName} registration={register('ensName')} />
      <div className="lg:col-span-2">
        <Button type="submit" className="h-10 px-6 max-lg:w-full" disabled={pending}>
          {pending ? 'Salvando…' : submitLabel}
        </Button>
      </div>
    </form>
  )
}
