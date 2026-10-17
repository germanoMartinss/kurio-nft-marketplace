import { expect, test, type Locator } from '@playwright/test'

import {
  addToCart,
  apiOrders,
  loginAs,
  openApp,
  openReview,
  receipt,
  startCheckout,
  USERS,
} from './support'

/**
 * §8: o skeleton ocupa as mesmas dimensões do conteúdo final (sem deslocamento de layout).
 * Mede o contêiner antes e depois do carregamento (cenário `lento`) na situação típica da demonstração.
 */
// Medida em pixels de layout (getBoundingClientRect), sem a escala do viewport visual do mobile.
const box = (locator: Locator) =>
  locator.evaluate((element) => {
    const b = element.getBoundingClientRect()
    return {
      width: Math.round(b.width),
      height: Math.round(b.height),
      y: Math.round(b.y + scrollY),
    }
  })
const expectSame = (
  before: Awaited<ReturnType<typeof box>>,
  after: Awaited<ReturnType<typeof box>>,
) => {
  expect(Math.abs(after.height - before.height)).toBeLessThanOrEqual(2)
  expect(Math.abs(after.width - before.width)).toBeLessThanOrEqual(1)
  expect(Math.abs(after.y - before.y)).toBeLessThanOrEqual(1)
}

test.describe('Skeletons com as dimensões do conteúdo', () => {
  test('perfil', async ({ page }) => {
    await loginAs(page, USERS.ana)
    await openApp(page, '/perfil', 'lento')
    const section = page.getByTestId('profile-section')
    await expect(
      section.locator('[data-slot="skeleton"]').filter({ visible: true }).first(),
    ).toBeVisible()
    const before = await box(section)
    await expect(page.getByRole('form', { name: 'Perfil do colecionador' })).toBeVisible({
      timeout: 10_000,
    })
    expectSame(before, await box(section))
  })

  test('pagamento: carteiras e itens', async ({ page }) => {
    await loginAs(page, USERS.ana)
    await addToCart(page, 'emerald-ape-042')
    await openApp(page, '/pagamento', 'lento')
    const wallets = page.getByTestId('wallet-section')
    const items = page.getByTestId('items-section')
    await expect(wallets.and(page.locator('[data-slot="skeleton"]'))).toBeVisible()
    const walletsBefore = await box(wallets)
    const itemsBefore = await box(items)
    await expect(page.getByRole('radiogroup', { name: 'Carteira conectada' })).toBeVisible({
      timeout: 10_000,
    })
    await expect(page.getByTestId('checkout-total').filter({ visible: true })).toBeVisible({
      timeout: 10_000,
    })
    expectSame(walletsBefore, await box(wallets))
    expectSame(itemsBefore, await box(items))
  })

  test('pedido (recibo)', async ({ page }) => {
    await startCheckout(page, { scenario: 'pagamento-lento' })
    await (await openReview(page)).getByRole('button', { name: 'Enviar pedido' }).click()
    await expect(page.getByRole('heading', { name: 'Pagamento em processamento' })).toBeVisible()
    const [order] = await apiOrders(page)
    await page.evaluate((id) => window.__kurioMock!.orders.settleNow(id), order!.id)
    await expect(receipt(page)).toBeVisible()

    await openApp(page, `/pedido/${order!.id}`, 'lento')
    const view = page.getByTestId('order-view')
    await expect(view.locator('[data-slot="skeleton"]')).toBeVisible()
    const before = await box(view)
    await expect(receipt(page)).toBeVisible({ timeout: 10_000 })
    expectSame(before, await box(view))
  })
})

test.describe('Skeletons das páginas públicas (carregamento sem deslocar o rodapé)', () => {
  test('detalhe do NFT', async ({ page }) => {
    await openApp(page, '/nft/emerald-ape-042', 'lento')
    const view = page.getByTestId('detail-view')
    // O esqueleto da página inteira (aria-busy), não o do carrossel de uma página já carregada.
    await expect(view.and(page.locator('[aria-busy="true"]'))).toBeVisible()
    const before = await box(view)
    await expect(
      page.getByRole('heading', { name: 'Emerald Ape #042' }).filter({ visible: true }),
    ).toBeVisible({ timeout: 10_000 })
    // O carrossel "Mais desta coleção" também carrega por conta própria.
    await expect(page.getByRole('heading', { name: 'Mais desta coleção' })).toBeVisible()
    await expect(view.locator('[data-slot="skeleton"]')).toHaveCount(0, { timeout: 10_000 })
    expectSame(before, await box(view))
  })

  test('catálogo da página inicial', async ({ page }) => {
    await openApp(page, '/', 'lento')
    const section = page.locator('#catalogo')
    await expect(
      section.locator('[data-slot="skeleton"]').filter({ visible: true }).first(),
    ).toBeVisible()
    const before = await box(section)
    await expect(page.locator('#catalogo article').first()).toBeVisible({ timeout: 10_000 })
    expectSame(before, await box(section))
  })
})
