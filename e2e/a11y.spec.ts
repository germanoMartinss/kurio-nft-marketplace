import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

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
 * §8: auditoria automatizada (axe-core, WCAG 2.0/2.1 A e AA) em todas as telas, nos dois
 * viewports, incluindo contraste de cor. Falhas listam regra, impacto e elementos.
 */
async function audit(page: Page, label: string) {
  await page.evaluate(() => document.fonts.ready)
  const { violations } = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
    .analyze()
  const summary = violations.map(
    (violation) =>
      `${violation.id} (${violation.impact}): ${violation.help}\n` +
      violation.nodes
        .slice(0, 4)
        .map(
          (node) => `    ${node.target.join(' ')} — ${node.failureSummary?.split('\n')[1] ?? ''}`,
        )
        .join('\n'),
  )
  expect(summary, `${label}: violações de acessibilidade`).toEqual([])
}

test.describe('Auditoria de acessibilidade (axe)', () => {
  test('início', async ({ page }) => {
    await openApp(page, '/')
    await expect(page.locator('#catalogo article').first()).toBeVisible()
    await audit(page, 'início')
  })

  test('detalhe do NFT e NFT inexistente', async ({ page }) => {
    await openApp(page, '/nft/emerald-ape-042')
    await expect(
      page.getByRole('heading', { name: 'Emerald Ape #042' }).filter({ visible: true }),
    ).toBeVisible()
    await audit(page, 'detalhe')
    await openApp(page, '/nft/nao-existe')
    await expect(page.getByRole('heading', { name: /não existe/ })).toBeVisible()
    await audit(page, 'detalhe inexistente')
  })

  test('carrinho vazio, com itens e com aviso de alteração', async ({ page }) => {
    await openApp(page, '/carrinho')
    await expect(page.getByText('Seu carrinho está vazio')).toBeVisible()
    await audit(page, 'carrinho vazio')
    await addToCart(page, 'emerald-ape-042', { quantity: 2 })
    await expect(page.getByTestId('cart-total').filter({ visible: true })).toBeVisible()
    await audit(page, 'carrinho')
    await page.evaluate(() => window.__kurioMock!.nft.update('emerald-ape-042', { price: '1.50' }))
    await expect(page.getByTestId('cart-notices')).toContainText('o preço mudou')
    await audit(page, 'carrinho com aviso')
  })

  test('login, cadastro e 404', async ({ page }) => {
    await openApp(page, '/entrar')
    await expect(page.getByRole('form', { name: 'Entrar' })).toBeVisible()
    await audit(page, 'entrar')
    await openApp(page, '/cadastro')
    await expect(page.getByRole('form', { name: 'Criar conta' })).toBeVisible()
    await audit(page, 'cadastro')
    await openApp(page, '/rota/inexistente')
    await expect(page.getByRole('heading', { name: 'Página não encontrada' })).toBeVisible()
    await audit(page, '404')
  })

  test('pagamento, revisão, pedido pendente e recibo', async ({ page }) => {
    await startCheckout(page, { scenario: 'pagamento-lento' })
    await audit(page, 'pagamento')
    const dialog = await openReview(page)
    await audit(page, 'revisão')
    await dialog.getByRole('button', { name: 'Enviar pedido' }).click()
    await expect(page.getByRole('heading', { name: 'Pagamento em processamento' })).toBeVisible()
    await audit(page, 'pedido pendente')
    const [order] = await apiOrders(page)
    await page.evaluate((id) => window.__kurioMock!.orders.settleNow(id), order!.id)
    await expect(receipt(page)).toBeVisible()
    await audit(page, 'recibo')
  })

  test('pedido recusado', async ({ page }) => {
    await startCheckout(page, { scenario: 'pagamento-recusado' })
    await (await openReview(page)).getByRole('button', { name: 'Enviar pedido' }).click()
    await expect(page.getByRole('heading', { name: 'Pagamento recusado' })).toBeVisible({
      timeout: 10_000,
    })
    await audit(page, 'pedido recusado')
  })

  test('perfil e carteiras', async ({ page }) => {
    await loginAs(page, USERS.ana)
    await openApp(page, '/perfil')
    await expect(page.getByRole('form', { name: 'Perfil do colecionador' })).toBeVisible()
    await audit(page, 'perfil')
    await openApp(page, '/perfil/carteiras')
    await expect(page.getByRole('form', { name: 'Carteira principal' })).toBeVisible()
    await audit(page, 'carteiras')
  })
})
