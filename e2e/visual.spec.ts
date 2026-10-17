import { expect, test, type Page } from '@playwright/test'

import { addToCart, openApp, startCheckout } from './support'

/**
 * §9: regressão visual de início, detalhe, carrinho e pagamento (desktop e mobile), com dados
 * estáveis: cenário padrão do mock (seed determinístico), relógio fixo, animações desligadas e
 * esperas por fontes e imagens. As baselines ficam em `e2e/visual.spec.ts-snapshots/` (geradas em
 * Linux/Chromium; `pnpm test:e2e:update` as regenera).
 */
const FIXED_TIME = '2026-07-29T12:00:00.000Z'

async function settle(page: Page) {
  await page.evaluate(() => document.fonts.ready)
  await page.waitForFunction(() =>
    [...document.images].every(
      (image) =>
        // Imagens de layouts ocultos (display: none) nunca carregam: só as visíveis contam.
        image.getClientRects().length === 0 || (image.complete && image.naturalWidth > 0),
    ),
  )
  // Rola até o fim e volta: dispara imagens preguiçosas antes da captura de página inteira.
  await page.evaluate(async () => {
    window.scrollTo(0, document.body.scrollHeight)
    await new Promise((resolve) => setTimeout(resolve, 150))
    window.scrollTo(0, 0)
  })
  await page.waitForFunction(() =>
    [...document.images].every(
      (image) =>
        // Imagens de layouts ocultos (display: none) nunca carregam: só as visíveis contam.
        image.getClientRects().length === 0 || (image.complete && image.naturalWidth > 0),
    ),
  )
}

const shot = async (page: Page, name: string) => {
  await settle(page)
  await expect(page).toHaveScreenshot(`${name}.png`, {
    fullPage: true,
    animations: 'disabled',
    caret: 'hide',
    maxDiffPixelRatio: 0.005,
  })
}

test.describe('Regressão visual', () => {
  test.beforeEach(async ({ page }) => {
    await page.clock.setFixedTime(FIXED_TIME)
  })

  test('início', async ({ page }) => {
    await openApp(page, '/')
    await expect(page.locator('#catalogo article').first()).toBeVisible()
    await shot(page, 'inicio')
  })

  test('detalhe do NFT', async ({ page }) => {
    await openApp(page, '/nft/emerald-ape-042')
    await expect(
      page.getByRole('heading', { name: 'Emerald Ape #042' }).filter({ visible: true }),
    ).toBeVisible()
    await shot(page, 'detalhe')
  })

  test('carrinho', async ({ page }) => {
    await addToCart(page, 'emerald-ape-042', { quantity: 2 })
    await addToCart(page, 'ivory-baron-088')
    await expect(page.getByTestId('cart-total').filter({ visible: true })).toBeVisible()
    await shot(page, 'carrinho')
  })

  test('pagamento', async ({ page }) => {
    await startCheckout(page, {
      items: [
        ['emerald-ape-042', 2],
        ['ivory-baron-088', 1],
      ],
    })
    await expect(page.getByTestId('checkout-total').filter({ visible: true })).toBeVisible()
    await shot(page, 'pagamento')
  })
})
