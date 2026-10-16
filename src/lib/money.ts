import Big from 'big.js'

import type { EthAmount } from '@/contracts/common'

/**
 * Aritmética de valores em ETH com precisão decimal (big.js). Valores entram e saem como strings
 * decimais; `number` nunca é usado para dinheiro, porque 0.1 + 0.2 !== 0.3 em ponto flutuante.
 */
const ETH_DECIMALS = 18

export const eth = (value: EthAmount | Big.BigSource) => new Big(value)

/** Serializa para o formato do contrato: sem notação exponencial e sem zeros à direita. */
export function toEthAmount(value: Big): EthAmount {
  return value.round(ETH_DECIMALS, Big.roundHalfUp).toFixed()
}

export function sumEth(values: (EthAmount | Big)[]): Big {
  return values.reduce<Big>((total, value) => total.plus(value), new Big(0))
}

export function multiplyEth(value: EthAmount, quantity: number): Big {
  if (!Number.isInteger(quantity)) throw new Error('Quantidade deve ser inteira')
  return eth(value).times(quantity)
}

/** Percentual de um valor, ex.: percentOf("26.83", 10) = 2.683. */
export function percentOf(value: EthAmount | Big, percent: number): Big {
  return eth(value).times(percent).div(100)
}

export function compareEth(a: EthAmount, b: EthAmount): -1 | 0 | 1 {
  return eth(a).cmp(b) as -1 | 0 | 1
}

/**
 * Formata para exibição como no Figma ("1.19 ETH", "26.846 ETH", "0.016 ETH"): mantém todas as
 * casas significativas, com no mínimo duas. Não arredonda: o valor exibido é o valor da API.
 */
export function formatEth(value: EthAmount | Big, { unit = true }: { unit?: boolean } = {}) {
  const big = eth(value)
  const decimals = Math.max(2, decimalPlaces(big))
  const text = big.toFixed(decimals)
  return unit ? `${text} ETH` : text
}

function decimalPlaces(value: Big) {
  const [, fraction = ''] = value.toFixed().split('.')
  return fraction.length
}
