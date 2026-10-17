import { expect, type Page, type TestInfo } from '@playwright/test'

/** Subconjunto do controle de mocks (`window.__kurioMock`) usado pelos testes. */
interface MockControl {
  scenarios: { set: (id: string) => void; active: () => string }
  session: { expireAll: () => void }
  realtime: {
    connections: () => { id: string; auth: { token?: string } | null }[]
    disconnectAll: () => void
    replay: (eventId?: string) => unknown
    emit: (event: unknown) => void
    history: () => { eventId: string; version: number; resource: { id: string } }[]
  }
  nft: { update: (id: string, change: Record<string, unknown>) => unknown }
  orders: {
    list: () => { id: string; status: string; version: number }[]
    settleNow: (id: string) => void
  }
}
declare global {
  interface Window {
    __kurioMock?: MockControl
  }
}

/** Abre uma rota da aplicação já com um cenário de mocks selecionado (padrão: "padrao"). */
export async function openApp(page: Page, path = '/', scenario = 'padrao') {
  const url = new URL(path, 'http://app')
  url.searchParams.set('cenario', scenario)
  await page.goto(`${url.pathname}${url.search}${url.hash}`)
  await page.waitForFunction(() => window.__kurioMock !== undefined)
}

export const isMobile = (testInfo: TestInfo) => testInfo.project.name === 'mobile'

/** Cards do catálogo (na grade principal). */
export const catalogCards = (page: Page) => page.locator('#catalogo article')

export async function cardNames(page: Page) {
  return catalogCards(page).locator('h3').allInnerTexts()
}

/** Preço atual de cada card, como número (para comparar ordenação). */
export async function cardPrices(page: Page) {
  return catalogCards(page).evaluateAll((cards) =>
    cards.map((card) => Number.parseFloat(card.querySelector('p span')?.textContent ?? 'NaN')),
  )
}

/** Abre os filtros: sidebar no desktop (já visível) ou drawer no mobile. */
export async function openFilters(page: Page, testInfo: TestInfo) {
  if (isMobile(testInfo)) {
    await page.getByRole('button', { name: /^Filtros/ }).click()
    await expect(page.getByRole('dialog', { name: 'Filtros' })).toBeVisible()
    return page.getByRole('dialog', { name: 'Filtros' })
  }
  return page.getByRole('complementary', { name: 'Filtros' })
}

export async function closeFilters(page: Page, testInfo: TestInfo) {
  if (isMobile(testInfo))
    await page
      .getByRole('dialog', { name: 'Filtros' })
      .getByRole('button', { name: /^Ver/ })
      .click()
}

/** Busca: diálogo do header no desktop; campo do topo no mobile. */
export async function searchFor(page: Page, testInfo: TestInfo, term: string) {
  if (isMobile(testInfo)) {
    await page.getByRole('searchbox', { name: 'Buscar NFTs' }).fill(term)
  } else {
    await page.getByRole('button', { name: 'Buscar NFTs' }).click()
    await page.getByRole('searchbox', { name: 'Termo de busca' }).fill(term)
    await page.getByRole('button', { name: 'Buscar', exact: true }).click()
  }
}

export const USERS = {
  ana: { email: 'ana@kurio.dev', password: 'Kurio@2026', name: 'Ana Lima' },
  bruno: { email: 'bruno@kurio.dev', password: 'Colecao#77', name: 'Bruno Sato' },
}

/** Preenche e envia o formulário de login (desktop: diálogo; mobile: página). */
export async function submitLogin(page: Page, user: { email: string; password: string }) {
  const form = page.getByRole('form', { name: 'Entrar' })
  await form.getByLabel('E-mail').fill(user.email)
  await form.getByLabel('Senha', { exact: true }).fill(user.password)
  await form.getByRole('button', { name: 'Entrar', exact: true }).click()
}

/** Entra pela interface e espera sair da tela de login. */
export async function loginAs(
  page: Page,
  user: { email: string; password: string },
  scenario = 'padrao',
) {
  await openApp(page, '/entrar', scenario)
  await submitLogin(page, user)
  await expect(page).not.toHaveURL(/\/entrar/)
}

/** Botão de favoritar visível (detalhe do NFT; layout desktop ou mobile). */
export const favoriteButton = (page: Page) =>
  page
    .getByRole('button', {
      name: /^(Favoritar|Favoritado|Adicionar .* à lista de interesse|Remover .* da lista de interesse)$/,
    })
    .filter({ visible: true })
    .first()

/** Tokens das conexões Socket.IO abertas no servidor simulado (vazio = visitante). */
export const socketTokens = (page: Page) =>
  page.evaluate(() => window.__kurioMock!.realtime.connections().map((c) => c.auth?.token ?? ''))

/**
 * Adiciona um NFT ao carrinho pela interface do detalhe (edição padrão) e espera a resposta da API.
 * Termina no carrinho (o botão de compra leva até lá).
 */
export async function addToCart(
  page: Page,
  nftId: string,
  {
    quantity = 1,
    scenario = 'padrao',
    edition,
  }: { quantity?: number; scenario?: string; edition?: string } = {},
) {
  await openApp(page, `/nft/${nftId}`, scenario)
  const increase = page.getByRole('button', { name: 'Aumentar quantidade' })
  await expect(increase).toBeVisible()
  if (edition)
    await page.getByRole('radio', { name: new RegExp(`^${edition}\\b`) }).check({ force: true })
  for (let click = 1; click < quantity; click++) await increase.click()
  const added = page.waitForResponse(
    (res) => res.url().endsWith('/api/cart/items') && res.request().method() === 'POST',
  )
  await page.getByRole('button', { name: /^(COMPRAR|Comprar NFT)$/ }).click()
  expect((await added).ok()).toBe(true)
  await expect(page).toHaveURL(/\/carrinho$/)
}

/** Linha (desktop) ou cartão (mobile) de um item do carrinho. */
export const cartItem = (page: Page, name: string) =>
  page
    .getByRole('row')
    .or(page.getByRole('list', { name: 'Itens do carrinho' }).getByRole('listitem'))
    .filter({ hasText: name })

export const cartTotal = (page: Page) => page.getByTestId('cart-total').filter({ visible: true })

/** Região viva com os avisos de alteração do carrinho (um único elemento, vazio quando não há aviso). */
export const cartNotices = (page: Page) => page.getByTestId('cart-notices')

export const emptyCart = (page: Page) =>
  page.getByRole('status').filter({ hasText: 'Seu carrinho está vazio' })

/** Altera um NFT no backend simulado; o evento chega à página pelo Socket.IO. */
export async function updateNft(page: Page, id: string, change: Record<string, unknown>) {
  // O socket conecta quando o navegador fica ocioso (fora do caminho crítico de carga): um evento
  // publicado antes disso não teria destinatário.
  await expect
    .poll(() => page.evaluate(() => window.__kurioMock!.realtime.connections().length))
    .toBeGreaterThan(0)
  await page.evaluate(
    ([nftId, patch]) => window.__kurioMock!.nft.update(nftId as string, patch as never),
    [id, change] as const,
  )
}

/** Sai da conta pela interface: menu do usuário (desktop) ou tela de perfil (mobile). */
export async function logout(page: Page, testInfo: TestInfo, displayName: string) {
  if (isMobile(testInfo)) {
    // A barra de abas (com "Perfil") só existe em algumas telas; nas demais abre-se o perfil direto.
    const tab = page.getByRole('link', { name: 'Perfil' })
    if (await tab.isVisible()) await tab.click()
    else await page.goto('/perfil')
    await page.getByRole('button', { name: 'Sair da conta' }).click()
  } else {
    await page.getByRole('button', { name: new RegExp(`${displayName}.*menu da conta`) }).click()
    await page.getByRole('menuitem', { name: 'Sair' }).click()
  }
  await expect.poll(() => page.evaluate(() => localStorage.getItem('kurio:app:session'))).toBeNull()
}

/** Compra de ponta a ponta até a tela de pagamento: entra como Ana, adiciona itens e abre o checkout. */
export async function startCheckout(
  page: Page,
  { scenario = 'padrao', items = [['emerald-ape-042', 1]] as [string, number][] } = {},
) {
  await loginAs(page, USERS.ana, scenario)
  for (const [nftId, quantity] of items) await addToCart(page, nftId, { quantity, scenario })
  await page.getByRole('button', { name: 'Conectar e finalizar' }).filter({ visible: true }).click()
  await expect(page).toHaveURL(/\/pagamento$/)
  await selectWallet(page, 'Principal')
}

/** A carteira padrão é a "Reserva" (Polygon); os testes de valores usam a principal (Ethereum). */
export async function selectWallet(page: Page, nickname: string) {
  const radio = page.getByRole('radio', { name: new RegExp(`^${nickname}`) })
  await radio.click()
  await expect(radio).toBeChecked()
  await expect(confirmPurchaseButton(page)).toBeEnabled()
}

export const confirmPurchaseButton = (page: Page) =>
  page.getByRole('button', { name: 'Confirmar compra' }).filter({ visible: true })

export const reviewDialog = (page: Page) => page.getByRole('dialog', { name: 'Revise seu pedido' })

/** Abre a revisão (cotação feita pela API) e espera o diálogo. */
export async function openReview(page: Page) {
  await confirmPurchaseButton(page).click()
  await expect(reviewDialog(page)).toBeVisible()
  return reviewDialog(page)
}

/** Pedidos da conta atual, lidos pela API (resultado da operação, não da interface). */
export const apiOrders = (page: Page) =>
  page.evaluate(async () => {
    const session = JSON.parse(localStorage.getItem('kurio:app:session')!)
    const res = await fetch('/api/orders', {
      headers: { Authorization: `Bearer ${session.token}` },
    })
    return ((await res.json()).items as { id: string; status: string }[]) ?? []
  })

export const apiCart = (page: Page) =>
  page.evaluate(async () => {
    const session = JSON.parse(localStorage.getItem('kurio:app:session')!)
    const res = await fetch('/api/cart', { headers: { Authorization: `Bearer ${session.token}` } })
    return (await res.json()) as { itemCount: number; items: { id: string; quantity: number }[] }
  })

export const receipt = (page: Page) => page.getByTestId('receipt')
