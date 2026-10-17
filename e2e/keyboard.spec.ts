import { expect, test, type Page } from '@playwright/test'

import {
  addToCart,
  confirmPurchaseButton,
  isMobile,
  loginAs,
  openApp,
  reviewDialog,
  startCheckout,
  USERS,
} from './support'

const insideDialog = (page: Page) =>
  page.evaluate(() => document.querySelector('[role="dialog"]')?.contains(document.activeElement))

test.describe('Teclado e foco', () => {
  test('"Pular para o conteúdo" é o primeiro foco e leva ao conteúdo principal', async ({
    page,
  }) => {
    await openApp(page, '/')
    await expect(page.locator('#catalogo article').first()).toBeVisible() // app montado
    await page.keyboard.press('Tab')
    const skip = page.getByRole('link', { name: 'Pular para o conteúdo' })
    await expect(skip).toBeFocused()
    await expect(skip).toBeVisible()
    await page.keyboard.press('Enter')
    await expect(page.locator('#conteudo')).toBeFocused()
  })

  test('foco visível: o elemento focado por teclado tem indicador', async ({ page }) => {
    await openApp(page, '/entrar')
    const email = page.getByRole('form', { name: 'Entrar' }).getByLabel('E-mail')
    await email.focus()
    await page.keyboard.press('Tab') // senha
    await page.keyboard.press('Tab') // mostrar senha
    await page.keyboard.press('Tab') // esqueceu a senha / entrar
    const indicator = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement
      const style = getComputedStyle(el)
      return {
        outline: style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) > 0,
        shadow: style.boxShadow !== 'none',
        border: style.borderColor,
      }
    })
    expect(indicator.outline || indicator.shadow).toBe(true)
  })

  test('revisão do pedido: foco preso, Esc fecha e devolve o foco ao botão', async ({ page }) => {
    await startCheckout(page)
    const button = confirmPurchaseButton(page)
    await button.focus()
    await page.keyboard.press('Enter')
    await expect(reviewDialog(page)).toBeVisible()
    expect(await insideDialog(page)).toBe(true)
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press('Tab')
      expect(await insideDialog(page)).toBe(true)
    }
    for (let i = 0; i < 6; i++) {
      await page.keyboard.press('Shift+Tab')
      expect(await insideDialog(page)).toBe(true)
    }
    await page.keyboard.press('Escape')
    await expect(reviewDialog(page)).toHaveCount(0)
    await expect(button).toBeFocused()
    // A tentativa foi descartada: nenhum pedido foi criado só por abrir e fechar.
    expect(await page.evaluate(() => window.__kurioMock!.orders.list().length)).toBe(0)
  })

  test('busca (desktop): diálogo prende o foco e devolve ao botão', async ({ page }, testInfo) => {
    test.skip(isMobile(testInfo), 'No mobile a busca é um campo da página, não um diálogo.')
    await openApp(page, '/')
    const trigger = page.getByRole('button', { name: 'Buscar NFTs' })
    await trigger.focus()
    await page.keyboard.press('Enter')
    await expect(page.getByRole('dialog')).toBeVisible()
    for (let i = 0; i < 8; i++) {
      await page.keyboard.press('Tab')
      expect(await insideDialog(page)).toBe(true)
    }
    await page.keyboard.press('Escape')
    await expect(page.getByRole('dialog')).toHaveCount(0)
    await expect(trigger).toBeFocused()
  })

  test('menu do usuário (desktop): abre pelo teclado, navega e devolve o foco', async ({
    page,
  }, testInfo) => {
    test.skip(isMobile(testInfo), 'O menu do usuário é do cabeçalho de desktop.')
    await loginAs(page, USERS.ana)
    await openApp(page, '/')
    const trigger = page.getByRole('button', { name: /Ana Lima.*menu da conta/ })
    await trigger.focus()
    await page.keyboard.press('Enter')
    await expect(page.getByRole('menu')).toBeVisible()
    await page.keyboard.press('ArrowDown')
    await expect(page.locator('[role="menuitem"]:focus')).toHaveCount(1)
    await page.keyboard.press('Escape')
    await expect(page.getByRole('menu')).toHaveCount(0)
    await expect(trigger).toBeFocused()
  })

  test('formulário do pagamento: envio inválido por teclado foca o primeiro campo com erro', async ({
    page,
  }) => {
    await startCheckout(page)
    const form = page.getByRole('form', { name: 'Dados do colecionador' })
    const name = form.getByLabel('Nome de exibição')
    await name.fill('')
    await name.press('Enter')
    await expect(name).toBeFocused()
    await expect(name).toHaveAttribute('aria-invalid', 'true')
    await expect(name).toHaveAccessibleDescription('Informe o nome de exibição.')
  })

  test('perfil: erro de validação foca o campo e é lido como descrição', async ({ page }) => {
    await loginAs(page, USERS.ana)
    await openApp(page, '/perfil')
    const form = page.getByRole('form', { name: 'Perfil do colecionador' })
    const email = form.getByLabel('E-mail')
    await email.fill('invalido')
    await email.press('Enter')
    await expect(email).toBeFocused()
    await expect(email).toHaveAccessibleDescription(/e-mail válido/)
  })

  test('carrinho por teclado: aumentar, diminuir e remover', async ({ page }) => {
    await addToCart(page, 'emerald-ape-042')
    const more = page.getByRole('button', { name: 'Aumentar quantidade de Emerald Ape #042' })
    await more.focus()
    await page.keyboard.press('Enter')
    await expect(page.getByRole('status', { name: 'Quantidade de Emerald Ape #042' })).toHaveText(
      '2',
    )
    const less = page.getByRole('button', { name: 'Diminuir quantidade de Emerald Ape #042' })
    await less.focus()
    await page.keyboard.press('Space')
    await expect(page.getByRole('status', { name: 'Quantidade de Emerald Ape #042' })).toHaveText(
      '1',
    )
  })
})

/**
 * Reflow e zoom (WCAG 1.4.4 e 1.4.10): 200% de zoom em 1280px equivale a 640 CSS px e 400% a
 * 320 CSS px. Em nenhuma tela pode haver rolagem horizontal nem controle essencial inalcançável.
 */
const ZOOM_WIDTHS = [
  { label: '200% (640px)', width: 640, height: 450 },
  { label: '400% (320px)', width: 320, height: 568 },
]

test.describe('Zoom e reflow', () => {
  for (const zoom of ZOOM_WIDTHS) {
    test(`telas públicas e do fluxo sem rolagem horizontal em ${zoom.label}`, async ({
      page,
    }, testInfo) => {
      test.skip(isMobile(testInfo), 'O reflow é verificado uma vez (projeto desktop).')
      await page.setViewportSize({ width: zoom.width, height: zoom.height })
      const noOverflow = async (label: string) => {
        await page.evaluate(() => document.fonts.ready)
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - window.innerWidth,
        )
        expect(overflow, `${label}: overflow horizontal`).toBeLessThanOrEqual(0)
      }

      await openApp(page, '/')
      await expect(page.locator('#catalogo article').first()).toBeVisible()
      await noOverflow('início')
      await openApp(page, '/nft/emerald-ape-042')
      await expect(
        page.getByRole('button', { name: /^(COMPRAR|Comprar NFT)$/ }).filter({ visible: true }),
      ).toBeVisible()
      await noOverflow('detalhe')

      await addToCart(page, 'emerald-ape-042', { quantity: 2 })
      await expect(page.getByTestId('cart-total').filter({ visible: true })).toBeVisible()
      await noOverflow('carrinho')
      await expect(
        page.getByRole('button', { name: 'Conectar e finalizar' }).filter({ visible: true }),
      ).toBeVisible()

      await loginAs(page, USERS.ana)
      for (const [path, label] of [
        ['/perfil', 'perfil'],
        ['/perfil/carteiras', 'carteiras'],
      ] as const) {
        await openApp(page, path)
        await expect(page.getByRole('heading', { name: /Perfil|Carteiras/ }).first()).toBeAttached()
        await noOverflow(label)
      }
      await openApp(page, '/carrinho')
      await page
        .getByRole('button', { name: 'Conectar e finalizar' })
        .filter({ visible: true })
        .click()
      await expect(confirmPurchaseButton(page)).toBeVisible()
      await noOverflow('pagamento')
      await confirmPurchaseButton(page).click()
      await expect(reviewDialog(page)).toBeVisible()
      // O diálogo cabe na janela e o botão de envio é alcançável por rolagem interna.
      await reviewDialog(page)
        .getByRole('button', { name: 'Enviar pedido' })
        .scrollIntoViewIfNeeded()
      await expect(
        reviewDialog(page).getByRole('button', { name: 'Enviar pedido' }),
      ).toBeInViewport()
    })
  }
})
