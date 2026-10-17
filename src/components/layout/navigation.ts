/** Telas do fluxo de compra: o Figma marca "Mercado" como ativo e remove a divisória do header. */
const MARKET_PATHS = ['/nft/', '/carrinho', '/pagamento', '/pedido/']

export function isMarketPath(pathname: string) {
  return MARKET_PATHS.some((path) => pathname.startsWith(path))
}

/**
 * Telas cujo frame mobile não tem a barra de abas: cada uma tem a própria barra de ação inferior
 * (detalhe, carrinho, pagamento) ou é uma tela cheia (entrar, cadastro).
 */
const NO_TAB_BAR_PATHS = ['/nft/', '/carrinho', '/pagamento', '/entrar', '/cadastro']

export function showsMobileTabBar(pathname: string) {
  return !NO_TAB_BAR_PATHS.some((path) => pathname.startsWith(path))
}
