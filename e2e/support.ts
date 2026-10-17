import { expect, type Page, type TestInfo } from '@playwright/test'

/** Subconjunto do controle de mocks (`window.__kurioMock`) usado pelos testes. */
interface MockControl {
  scenarios: { set: (id: string) => void; active: () => string }
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
