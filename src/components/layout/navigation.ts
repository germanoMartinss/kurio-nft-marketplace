/** Telas do fluxo de compra: o Figma marca "Mercado" como ativo e remove a divisória do header. */
const MARKET_PATHS = ['/nft/', '/carrinho', '/pagamento', '/pedido/']

export function isMarketPath(pathname: string) {
  return MARKET_PATHS.some((path) => pathname.startsWith(path))
}
