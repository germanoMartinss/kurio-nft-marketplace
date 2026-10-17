import { expect, test } from '@playwright/test'

import { catalogCards, loginAs, openApp, USERS } from './support'

/** §9: skeletons durante carregamento lento, feedback de falha e recuperação após nova tentativa. */
test.describe('Carregamento e falhas', () => {
  test('skeletons com shimmer enquanto a rede está lenta', async ({ page }) => {
    await openApp(page, '/', 'lento')
    await expect(page.getByRole('status').filter({ hasText: 'Carregando NFTs' })).toBeAttached()
    const skeleton = page
      .locator('#catalogo [data-slot="skeleton"]')
      .filter({ visible: true })
      .first()
    await expect(skeleton).toBeVisible()
    expect(await skeleton.evaluate((el) => getComputedStyle(el).animationName)).toBe('shimmer')
    await expect(catalogCards(page)).toHaveCount(9, { timeout: 10_000 })
  })

  test('skeleton respeita a preferência por movimento reduzido', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await openApp(page, '/', 'lento')
    const skeleton = page
      .locator('#catalogo [data-slot="skeleton"]')
      .filter({ visible: true })
      .first()
    await expect(skeleton).toBeVisible()
    expect(await skeleton.evaluate((el) => getComputedStyle(el).animationName)).toBe('none')
  })

  test('falha do catálogo com nova tentativa e recuperação', async ({ page }) => {
    await openApp(page, '/', 'erro-servidor')
    const alert = page
      .getByRole('alert')
      .filter({ hasText: 'Não foi possível carregar o catálogo' })
    await expect(alert).toBeVisible({ timeout: 15_000 })

    // O servidor volta a responder; a nova tentativa recupera a tela.
    await page.evaluate(() => window.__kurioMock?.scenarios.set('padrao'))
    await alert.getByRole('button', { name: 'Tentar novamente' }).click()
    await expect(catalogCards(page)).toHaveCount(9)
    await expect(alert).toBeHidden()
  })

  test('falha transitória é recuperada automaticamente (retry)', async ({ page }) => {
    // As duas primeiras leituras respondem 503; o retry da consulta recupera sem ação do usuário.
    await openApp(page, '/', 'instavel')
    await expect(catalogCards(page)).toHaveCount(9, { timeout: 15_000 })
  })

  test('acesso negado (403) mostra a causa, sem sugerir problema de conexão, e a nova tentativa recupera', async ({
    page,
  }) => {
    await loginAs(page, USERS.ana)
    await page.evaluate(() => window.__kurioMock!.scenarios.set('acesso-negado'))
    await openApp(page, '/perfil', 'acesso-negado')
    const alert = page.getByRole('alert').filter({ hasText: 'Não foi possível carregar o perfil' })
    await expect(alert).toContainText('Você não tem permissão para acessar este recurso.')
    await expect(alert).not.toContainText('Verifique sua conexão')
    await page.evaluate(() => window.__kurioMock!.scenarios.set('padrao'))
    await alert.getByRole('button', { name: 'Tentar novamente' }).click()
    await expect(page.getByRole('form', { name: 'Perfil do colecionador' })).toBeVisible()
  })
})
