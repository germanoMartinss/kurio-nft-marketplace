/** Telas que exigem autenticação (§3): checkout, perfil, carteiras, favoritos e pedidos. */
const PRIVATE_PATHS = ['/pagamento', '/perfil', '/pedido/']

export function isPrivatePath(pathname: string) {
  return PRIVATE_PATHS.some((path) => pathname.startsWith(path))
}
