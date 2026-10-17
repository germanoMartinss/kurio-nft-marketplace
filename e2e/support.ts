import { expect, type Page, type TestInfo } from '@playwright/test'

/** Subconjunto do controle de mocks (`window.__kurioMock`) usado pelos testes. */
interface MockControl {
  scenarios: { set: (id: string) => void; active: () => string }
  session: { expireAll: () => void }
  realtime: { connections: () => { id: string; auth: { token?: string } | null }[] }
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
