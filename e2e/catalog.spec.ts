import { expect, test } from '@playwright/test'

import {
  cardNames,
  cardPrices,
  catalogCards,
  closeFilters,
  isMobile,
  openApp,
  openFilters,
  searchFor,
} from './support'

/**
 * §9: busca, filtros combinados, ordenação, paginação e restauração pelo histórico.
 * As verificações observam a interface e os parâmetros que de fato chegam à API (via MSW).
 */
test.describe('Catálogo', () => {
  test('busca reflete na URL, na requisição à API e nos resultados', async ({ page }, testInfo) => {
    await openApp(page)
    await expect(catalogCards(page)).toHaveCount(9)

    const request = page.waitForRequest(
      (req) => req.url().includes('/api/nfts?') && req.url().includes('q=emerald'),
    )
    await searchFor(page, testInfo, 'emerald')
    await request

    await expect(page).toHaveURL(/busca=emerald/)
    await expect(catalogCards(page)).toHaveCount(1)
    expect(await cardNames(page)).toEqual(['Emerald Ape #042'])
  })

  test('filtros combinados, reinício da paginação e restauração pelo histórico', async ({
    page,
  }, testInfo) => {
    await openApp(page, '/?pagina=2')
    await expect(page.getByRole('link', { name: 'Página 2' })).toHaveAttribute(
      'aria-current',
      'page',
    )

    const filters = await openFilters(page, testInfo)
    await filters.locator('label', { hasText: 'Música' }).click()
    await expect(page).toHaveURL(/colecoes=musica/)
    const request = page.waitForRequest(
      (req) => /categories=musica/.test(req.url()) && /networks=solana/.test(req.url()),
    )
    await filters.locator('label', { hasText: 'Solana' }).click()
    await request
    await closeFilters(page, testInfo)

    // Mudança de filtro reinicia a paginação; os filtros se combinam.
    await expect(page).toHaveURL(/redes=solana/)
    await expect(page).not.toHaveURL(/pagina=/)
    await expect.poll(() => cardNames(page)).toContain('Golden Signal #160')

    // Voltar no histórico desfaz o último filtro (fica só "Música") e a interface acompanha.
    await page.goBack()
    await expect(page).not.toHaveURL(/redes=solana/)
    await expect(page).toHaveURL(/colecoes=musica/)
    const afterBack = await openFilters(page, testInfo)
    await expect(afterBack.getByRole('checkbox', { name: /Solana/ })).not.toBeChecked()
    await expect(afterBack.getByRole('checkbox', { name: /Música/ })).toBeChecked()
    await closeFilters(page, testInfo)

    // Refresh mantém o estado da URL.
    await page.reload()
    await expect(page).toHaveURL(/colecoes=musica/)
    await expect(catalogCards(page).first()).toBeVisible()
  })

  test('ordenação por menor e maior preço', async ({ page }, testInfo) => {
    await openApp(page)
    await expect(catalogCards(page)).toHaveCount(9)

    if (isMobile(testInfo)) await openFilters(page, testInfo)
    const request = page.waitForRequest((req) => req.url().includes('sort=menor-preco'))
    await page.getByRole('combobox', { name: 'Ordenar por:' }).click()
    await page.getByRole('option', { name: 'Menor preço' }).click()
    await request
    await closeFilters(page, testInfo)

    await expect(page).toHaveURL(/ordem=menor-preco/)
    const isAscending = (prices: number[]) =>
      prices.every((price, index) => index === 0 || prices[index - 1]! <= price)
    await expect.poll(async () => isAscending(await cardPrices(page))).toBe(true)
    await expect.poll(async () => (await cardPrices(page))[0]).toBe(0.02)

    await page.goto('/?ordem=maior-preco')
    await expect.poll(async () => (await cardPrices(page))[0]).toBe(12.3)
  })

  test('paginação com links, histórico e refresh', async ({ page }) => {
    await openApp(page)
    await expect(catalogCards(page)).toHaveCount(9)
    const firstPage = await cardNames(page)

    await page.getByRole('link', { name: 'Página 2' }).click()
    await expect(page).toHaveURL(/pagina=2/)
    await expect(page.getByRole('link', { name: 'Página 2' })).toHaveAttribute(
      'aria-current',
      'page',
    )
    await expect.poll(() => cardNames(page)).not.toEqual(firstPage)
    const secondPage = await cardNames(page)

    await page.goBack()
    await expect.poll(() => cardNames(page)).toEqual(firstPage)
    await page.goForward()
    await expect.poll(() => cardNames(page)).toEqual(secondPage)

    await page.reload()
    await expect.poll(() => cardNames(page)).toEqual(secondPage)
  })

  test('resultado vazio com opção de limpar filtros', async ({ page }, testInfo) => {
    await openApp(page)
    await expect(catalogCards(page)).toHaveCount(9)
    await searchFor(page, testInfo, 'nada-corresponde')
    await expect(
      page.getByText('Nenhum NFT encontrado', { exact: true }).filter({ visible: true }),
    ).toBeVisible()
    await page.getByRole('button', { name: 'Limpar filtros' }).click()
    await expect(catalogCards(page)).toHaveCount(9)
    await expect(page).not.toHaveURL(/busca=/)
  })

  test('catálogo vazio no cenário sem NFTs', async ({ page }) => {
    await openApp(page, '/', 'catalogo-vazio')
    await expect(
      page.getByText('Nenhum NFT encontrado', { exact: true }).filter({ visible: true }),
    ).toBeVisible()
  })

  test('respostas fora de ordem não sobrescrevem a consulta atual', async ({ page }, testInfo) => {
    // Cenário "fora-de-ordem": a 1ª consulta do catálogo da página leva 1,5s e a 2ª, 150ms.
    // Registra o desfecho de cada consulta: resposta recebida ou requisição cancelada.
    const outcomes: string[] = []
    const queryOf = (url: string) =>
      url.includes('/api/nfts?') ? new URL(url).searchParams.get('q') : null
    page.on('response', (response) => {
      const query = queryOf(response.url())
      if (query) outcomes.push(`${query}:resposta`)
    })
    page.on('requestfailed', (request) => {
      const query = queryOf(request.url())
      if (query) outcomes.push(`${query}:cancelada`)
    })
    await openApp(page, '/?busca=ape', 'fora-de-ordem')
    await searchFor(page, testInfo, 'emerald')

    await expect(catalogCards(page)).toHaveCount(1)
    // A consulta antiga ("ape") não terminou antes da nova: ou foi cancelada pelo cliente (o
    // TanStack Query aborta a requisição obsoleta via AbortSignal) ou chegou depois e foi ignorada.
    await expect.poll(() => outcomes.find((outcome) => outcome.startsWith('ape:'))).toBeDefined()
    const ape = outcomes.findIndex((outcome) => outcome.startsWith('ape:'))
    const emerald = outcomes.indexOf('emerald:resposta')
    expect(emerald).toBeGreaterThanOrEqual(0)
    expect(outcomes[ape] === 'ape:cancelada' || ape > emerald).toBe(true)
    // Depois do tempo da resposta lenta, a tela continua mostrando a consulta atual.
    await page.waitForTimeout(1_600)
    await expect(page).toHaveURL(/busca=emerald/)
    expect(await cardNames(page)).toEqual(['Emerald Ape #042'])
  })

  test('filtros no mobile: drawer com foco preso e devolvido ao botão', async ({
    page,
  }, testInfo) => {
    test.skip(!isMobile(testInfo), 'O drawer de filtros só existe no mobile')
    await openApp(page)
    const trigger = page.getByRole('button', { name: /^Filtros/ })
    await trigger.click()
    const dialog = page.getByRole('dialog', { name: 'Filtros' })
    await expect(dialog).toBeVisible()
    await expect
      .poll(() => page.evaluate(() => document.activeElement?.closest('[role="dialog"]') !== null))
      .toBe(true)
    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
    await expect(trigger).toBeFocused()
  })
})
