import { expect, test } from '@playwright/test'

import { catalogCards, openApp } from './support'

/** §9: acesso direto ao detalhe e recurso inexistente; §3: edição indisponível e limite de quantidade. */
test.describe('Detalhe do NFT', () => {
  test('navegação do catálogo para o detalhe', async ({ page }) => {
    await openApp(page)
    await catalogCards(page).first().getByRole('link').first().click()
    await expect(page).toHaveURL(/\/nft\/[a-z0-9-]+$/)
    await expect(page.getByRole('heading', { level: 1 }).filter({ visible: true })).toBeVisible()
  })

  test('acesso direto com edição indisponível', async ({ page }) => {
    await openApp(page, '/nft/emerald-ape-042')
    await expect(
      page.getByRole('heading', { name: 'Emerald Ape #042' }).filter({ visible: true }),
    ).toBeVisible()
    await expect(page.getByText('1.19 ETH').filter({ visible: true }).first()).toBeVisible()
    // A edição 1/1 está esgotada: desabilitada e anunciada como tal, não só pela cor.
    await expect(page.getByRole('radio', { name: /^1\/1\s*, esgotada/ })).toBeDisabled()
    await expect(page.getByRole('radio', { name: /^1\/50/ })).toBeChecked()
  })

  test('limite de quantidade pela disponibilidade da edição', async ({ page }) => {
    // Sage Nomad #009, edição 1/10: 4 unidades disponíveis.
    await openApp(page, '/nft/sage-nomad-009')
    await page.getByRole('radio', { name: /^1\/10\s*, 4 disponíveis/ }).check({ force: true })
    const increase = page.getByRole('button', { name: 'Aumentar quantidade' })
    for (let click = 0; click < 3; click++) await increase.click()
    await expect(page.getByRole('status', { name: 'Quantidade' })).toHaveText('4')
    await expect(increase).toBeDisabled()
    await expect(
      page.getByText('Limite de 4 unidades atingido').filter({ visible: true }),
    ).toBeAttached()
  })

  test('NFT inexistente', async ({ page }) => {
    await openApp(page, '/nft/nao-existe')
    await expect(
      page.getByRole('heading', { name: 'Este NFT não existe ou foi removido' }),
    ).toBeVisible()
    await page.getByRole('link', { name: 'Explorar o mercado' }).click()
    await expect(catalogCards(page).first()).toBeVisible()
  })

  test('rota inexistente mostra 404', async ({ page }) => {
    await openApp(page, '/rota/que/nao/existe')
    await expect(page.getByRole('heading', { name: 'Página não encontrada' })).toBeVisible()
  })
})
