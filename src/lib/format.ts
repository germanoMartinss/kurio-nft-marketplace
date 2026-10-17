import { NETWORK_LABELS, type Network } from '@/contracts/common'

/** "0xA91F3c…E82C" → "0xA91F…E82C", como nos frames. */
export const shortAddress = (value: string) =>
  value.length > 12 ? `${value.slice(0, 6)}…${value.slice(-4)}` : value

export const shortHash = shortAddress

const dateFormat = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  timeZone: 'America/Sao_Paulo',
})

/** "29 Jul, 2026": o Figma separa o mês do ano com vírgula e usa a abreviação capitalizada. */
export function formatDate(iso: string) {
  const parts = dateFormat.formatToParts(new Date(iso))
  const part = (type: string) => parts.find((item) => item.type === type)?.value ?? ''
  const month = part('month').replace('.', '')
  return `${part('day')} ${month.charAt(0).toUpperCase()}${month.slice(1)}, ${part('year')}`
}

export const networkLabel = (network: Network) => NETWORK_LABELS[network]
