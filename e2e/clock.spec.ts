import { expect, test } from '@playwright/test'

import {
  favoriteButton,
  loginAs,
  openReview,
  receipt,
  reviewDialog,
  startCheckout,
  USERS,
} from './support'

/**
 * §9: relógio controlado (`page.clock`) nos cenários sensíveis a tempo. O relógio é instalado antes
 * de a página carregar, então o MSW (que roda na página) e a aplicação enxergam o mesmo tempo
 * adiantado: não há espera real por cotações de 5 minutos, sessões de 2 horas ou pagamentos lentos.
 */
test.describe('Relógio controlado', () => {
  test('cotação de 5 minutos expira ao adiantar o relógio', async ({ page }) => {
    await page.clock.install()
    await startCheckout(page)
    const dialog = await openReview(page)
    await expect(dialog.getByText(/Válida por/)).toBeVisible()
    await expect(dialog.getByRole('button', { name: 'Enviar pedido' })).toBeVisible()

    await page.clock.fastForward('05:01')

    await expect(dialog.getByText('Expirada')).toBeVisible()
    await expect(dialog.getByRole('alert')).toContainText('A cotação expirou')
    await expect(dialog.getByRole('button', { name: 'Enviar pedido' })).toHaveCount(0)

    // Cotação nova, relógio novo: o pedido segue.
    await dialog.getByRole('button', { name: 'Atualizar cotação' }).click()
    await expect(dialog.getByText(/Válida por/)).toBeVisible()
    await dialog.getByRole('button', { name: 'Enviar pedido' }).click()
    await expect(page).toHaveURL(/\/pedido\/ord_/)
  })

  test('a API recusa a cotação vencida mesmo sem o cliente perceber (QUOTE_EXPIRED)', async ({
    page,
  }) => {
    await page.clock.install()
    await startCheckout(page)
    const dialog = await openReview(page)
    // Relógio pausado (a contagem regressiva do diálogo para) e adiantado 6 minutos: a interface
    // ainda oferece "Enviar pedido" quando o clique acontece. Depois do clique o relógio volta a
    // andar (a latência do MSW também usa os timers da página) e quem detecta o vencimento é a API.
    const now = await page.evaluate(() => Date.now())
    await page.clock.pauseAt(now + 1_000)
    await page.clock.setSystemTime(now + 6 * 60_000)
    const created = page.waitForResponse(
      (res) => res.url().endsWith('/api/orders') && res.request().method() === 'POST',
    )
    await dialog.getByRole('button', { name: 'Enviar pedido' }).click()
    await page.clock.resume()
    const response = await created
    expect(response.status()).toBe(409)
    expect((await response.json()).error.code).toBe('QUOTE_EXPIRED')
    await expect(dialog.getByRole('alert')).toContainText('A cotação expirou')
    await expect(reviewDialog(page)).toBeVisible()
  })

  test('sessão de 2 horas expira ao adiantar o relógio', async ({ page }) => {
    await page.clock.install()
    await loginAs(page, USERS.ana)
    const loaded = Promise.all([
      page.waitForResponse((res) => res.url().endsWith('/api/auth/session')),
      page.waitForResponse((res) => res.url().endsWith('/api/favorites')),
    ])
    await page.goto('/nft/emerald-ape-042')
    await loaded
    await page.clock.fastForward('02:05:00')

    // A chamada privada seguinte recebe SESSION_EXPIRED e a sessão é encerrada com aviso.
    await favoriteButton(page).click()
    await expect(page.getByText('Sua sessão expirou').first()).toBeVisible()
    expect(await page.evaluate(() => localStorage.getItem('kurio:app:session'))).toBeNull()
  })

  test('pagamento lento de 12s termina ao adiantar o relógio, pelo order.updated', async ({
    page,
  }) => {
    await page.clock.install()
    await startCheckout(page, { scenario: 'pagamento-lento' })
    await (await openReview(page)).getByRole('button', { name: 'Enviar pedido' }).click()
    await expect(page.getByRole('heading', { name: 'Pagamento em processamento' })).toBeVisible()
    await expect(receipt(page)).toHaveCount(0)

    await page.clock.fastForward(12_500)

    await expect(receipt(page)).toBeVisible()
    const events = await page.evaluate(() => window.__kurioMock!.realtime.history())
    expect(events.length).toBeGreaterThan(0)
  })
})
