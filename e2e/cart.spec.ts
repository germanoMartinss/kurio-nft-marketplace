import { expect, test, type Page } from '@playwright/test'

import {
  addToCart,
  cartItem,
  cartNotices,
  cartTotal,
  emptyCart,
  catalogCards,
  loginAs,
  logout,
  openApp,
  updateNft,
  USERS,
} from './support'

const EMERALD = 'Emerald Ape #042' // 1.19 ETH, edição 1/50 (50 disponíveis)
const SAGE = 'Sage Nomad #009' // 1.69 ETH, edição 1/10 (4 disponíveis)

test.describe('Carrinho', () => {
  test('visitante vê o carrinho vazio com caminho para o mercado', async ({ page }) => {
    await openApp(page, '/carrinho')
    await expect(emptyCart(page)).toBeVisible()
    await page.getByRole('link', { name: 'Explorar o mercado' }).click()
    await expect(catalogCards(page).first()).toBeVisible()
  })

  test('altera a quantidade e o resumo vem da API', async ({ page }) => {
    await addToCart(page, 'emerald-ape-042')
    const item = cartItem(page, EMERALD)
    await expect(item).toBeVisible()
    await expect(cartTotal(page)).toHaveText('1.206 ETH') // 1.19 + taxa de rede 0.016

    const updated = page.waitForResponse(
      (res) => res.url().includes('/api/cart/items/') && res.request().method() === 'PATCH',
    )
    await item.getByRole('button', { name: `Aumentar quantidade de ${EMERALD}` }).click()
    const cart = await (await updated).json()

    // Valores em ETH são strings decimais; a tela mostra exatamente o que a API calculou.
    expect(cart.summary.subtotal).toBe('2.38')
    expect(cart.summary.total).toBe('2.396')
    await expect(item.getByRole('status', { name: `Quantidade de ${EMERALD}` })).toHaveText('2')
    await expect(cartTotal(page)).toHaveText('2.396 ETH')
    await expect(page.getByText('Subtotal').filter({ visible: true })).toBeVisible()

    await item.getByRole('button', { name: `Diminuir quantidade de ${EMERALD}` }).click()
    await expect(cartTotal(page)).toHaveText('1.206 ETH')
  })

  test('respeita a disponibilidade por NFT e edição', async ({ page }) => {
    // Sage Nomad #009, edição 1/10: 4 disponíveis. A API recusa o que passa do limite.
    await addToCart(page, 'sage-nomad-009', { quantity: 4, edition: '1/10' })
    const item = cartItem(page, SAGE)
    await expect(item.getByRole('status', { name: `Quantidade de ${SAGE}` })).toHaveText('4')
    await expect(
      item.getByRole('button', { name: `Aumentar quantidade de ${SAGE}` }),
    ).toBeDisabled()
    await expect(page.getByText('Limite de 4 unidades atingido').first()).toBeAttached()

    // Adicionar mais pelo detalhe também é recusado pela API, com mensagem.
    await page.goto('/nft/sage-nomad-009')
    await page.getByRole('radio', { name: /^1\/10/ }).check({ force: true })
    await page.getByRole('button', { name: /^(COMPRAR|Comprar NFT)$/ }).click()
    await expect(page.getByText(/no máximo 4 unidade/).filter({ visible: true })).toBeVisible()
  })

  test('remove o item e mantém o carrinho após refresh', async ({ page }) => {
    await addToCart(page, 'emerald-ape-042')
    await addToCart(page, 'sage-nomad-009')
    await page.reload()
    await expect(cartItem(page, EMERALD)).toBeVisible()
    await expect(cartItem(page, SAGE)).toBeVisible()
    await expect(cartTotal(page)).toHaveText('2.896 ETH') // 1.19 + 1.69 + 0.016

    await cartItem(page, EMERALD)
      .getByRole('button', { name: `Remover ${EMERALD} do carrinho` })
      .click()
    await expect(cartItem(page, EMERALD)).toHaveCount(0)
    await expect(cartTotal(page)).toHaveText('1.706 ETH')

    await page.reload()
    await expect(cartItem(page, SAGE)).toBeVisible()
    await expect(cartItem(page, EMERALD)).toHaveCount(0)

    await cartItem(page, SAGE)
      .getByRole('button', { name: `Remover ${SAGE} do carrinho` })
      .click()
    await expect(emptyCart(page)).toBeVisible()
  })

  test('itens do visitante são preservados ao entrar na conta', async ({ page }) => {
    await addToCart(page, 'emerald-ape-042', { quantity: 2 })
    await expect(cartItem(page, EMERALD)).toBeVisible()

    await loginAs(page, USERS.ana)
    await openApp(page, '/carrinho')
    await expect(cartItem(page, EMERALD)).toBeVisible()
    await expect(
      cartItem(page, EMERALD).getByRole('status', { name: `Quantidade de ${EMERALD}` }),
    ).toHaveText('2')
    // O contador do carrinho (cabeçalho no desktop, barra de abas no mobile) soma as quantidades.
    await openApp(page, '/')
    await expect(page.getByRole('link', { name: 'Carrinho, 2 itens' })).toBeVisible()
    await openApp(page, '/carrinho')

    // O carrinho agora pertence à conta: sobrevive ao refresh.
    await page.reload()
    await expect(cartItem(page, EMERALD)).toBeVisible()
  })
})

test.describe('Carrinho: união no login, persistência e isolamento', () => {
  const quantityOf = (page: Page, name: string) =>
    cartItem(page, name).getByRole('status', { name: `Quantidade de ${name}` })

  test('união: soma o mesmo item respeitando o limite e acrescenta o que é novo', async ({
    page,
  }, testInfo) => {
    const SAGE_10 = 'Sage Nomad #009'
    const GOLDEN = 'Golden Beat #207'
    // A conta já tem itens: Emerald 1/50 × 2 e Sage Nomad 1/10 × 3 (só 4 disponíveis).
    await loginAs(page, USERS.ana)
    await addToCart(page, 'emerald-ape-042', { quantity: 2 })
    await addToCart(page, 'sage-nomad-009', { quantity: 3, edition: '1/10' })
    await logout(page, testInfo, 'Ana Lima')

    // Como visitante: mais 3 do mesmo Emerald, mais 3 do mesmo Sage (excede o limite) e um NFT novo.
    await addToCart(page, 'emerald-ape-042', { quantity: 3 })
    await addToCart(page, 'sage-nomad-009', { quantity: 3, edition: '1/10' })
    await addToCart(page, 'golden-beat-207')
    await expect(cartItem(page, GOLDEN)).toBeVisible()

    await loginAs(page, USERS.ana)
    await openApp(page, '/carrinho')
    await expect(quantityOf(page, EMERALD)).toHaveText('5') // 2 + 3
    await expect(quantityOf(page, SAGE_10)).toHaveText('4') // 3 + 3, limitado à disponibilidade
    await expect(quantityOf(page, GOLDEN)).toHaveText('1') // só existia no visitante

    // O carrinho do visitante foi consumido pela união.
    const guestLines = await page.evaluate(async () => {
      const guestId = JSON.parse(localStorage.getItem('kurio:app:guest-id')!)
      const res = await fetch('/api/cart', { headers: { 'X-Guest-Id': guestId } })
      return (await res.json()).items.length
    })
    expect(guestLines).toBe(0)
  })

  test('persiste após reload (visitante e conta) e não vaza entre sessões', async ({
    page,
  }, testInfo) => {
    // Visitante: sobrevive ao reload.
    await addToCart(page, 'golden-beat-207', { quantity: 2 })
    await page.reload()
    await expect(quantityOf(page, 'Golden Beat #207')).toHaveText('2')

    // Ana: o carrinho da conta sobrevive ao reload.
    await loginAs(page, USERS.ana)
    await addToCart(page, 'emerald-ape-042', { quantity: 2 })
    await page.reload()
    await expect(quantityOf(page, EMERALD)).toHaveText('2')
    await expect(cartItem(page, 'Golden Beat #207')).toBeVisible() // veio da união no login

    // Logout de A: nem o visitante nem B veem o carrinho de A, sem recarregar a página.
    await logout(page, testInfo, 'Ana Lima')
    if (!page.url().endsWith('/carrinho'))
      await page
        .getByRole('link', { name: /^Carrinho/ })
        .first()
        .click()
    await expect(emptyCart(page)).toBeVisible()
    await expect(cartItem(page, EMERALD)).toHaveCount(0)
    await page.reload()
    await expect(emptyCart(page)).toBeVisible()

    await loginAs(page, USERS.bruno)
    await openApp(page, '/carrinho')
    await expect(emptyCart(page)).toBeVisible()
    await expect(cartItem(page, EMERALD)).toHaveCount(0)
    await expect(cartItem(page, 'Golden Beat #207')).toHaveCount(0)
  })
})

test.describe('Cupom', () => {
  test('aplica, remove e rejeita códigos inválidos ou expirados', async ({ page }) => {
    await addToCart(page, 'emerald-ape-042', { quantity: 2 })
    const form = page.getByRole('form', { name: 'Código promocional' }).filter({ visible: true })
    const field = form.getByLabel('Código promocional')

    await form.getByRole('button', { name: 'Aplicar' }).click()
    await expect(form.getByRole('alert')).toContainText('Informe o código promocional')

    await field.fill('NAOEXISTE')
    await form.getByRole('button', { name: 'Aplicar' }).click()
    await expect(form.getByRole('alert')).toContainText('inválido')
    await expect(field).toHaveAttribute('aria-invalid', 'true')

    await field.fill('GENESIS10')
    await form.getByRole('button', { name: 'Aplicar' }).click()
    await expect(form.getByRole('alert')).toContainText('expirou')
    await expect(cartTotal(page)).toHaveText('2.396 ETH')

    await field.fill('kurio10')
    const applied = page.waitForResponse(
      (res) => res.url().endsWith('/api/cart/coupon') && res.request().method() === 'PUT',
    )
    await form.getByRole('button', { name: 'Aplicar' }).click()
    const cart = await (await applied).json()
    expect(cart.summary.discount).toBe('0.238') // 10% de 2.38
    expect(cart.summary.total).toBe('2.158')
    await expect(cartTotal(page)).toHaveText('2.158 ETH')
    await expect(page.getByText('(-) 0.238').filter({ visible: true })).toBeVisible()

    // O cupom é do carrinho (API): persiste após refresh e pode ser removido.
    await page.reload()
    await expect(cartTotal(page)).toHaveText('2.158 ETH')
    await page
      .getByRole('button', { name: /^Remover cupom KURIO10/ })
      .filter({ visible: true })
      .click()
    await expect(cartTotal(page)).toHaveText('2.396 ETH')
  })
})

test.describe('Alterações em tempo real (nft.updated)', () => {
  test('preço alterado com o carrinho aberto: aviso acessível e resumo atualizado', async ({
    page,
  }) => {
    await addToCart(page, 'emerald-ape-042', { quantity: 2 })
    await expect(cartTotal(page)).toHaveText('2.396 ETH')
    await expect(cartNotices(page)).toBeEmpty()

    await updateNft(page, 'emerald-ape-042', { price: '1.50' })

    // A mudança chega pelo socket e é anunciada na região viva do carrinho.
    await expect(cartNotices(page)).toContainText(
      `${EMERALD} (edição 1/50): o preço mudou de 1.19 ETH para 1.50 ETH.`,
    )
    await expect(cartNotices(page)).toHaveAttribute('aria-live', 'polite')
    await expect(cartTotal(page)).toHaveText('3.016 ETH') // 2 × 1.50 + 0.016
    await expect(cartItem(page, EMERALD)).toContainText('1.19 ETH') // preço anterior, riscado

    await cartNotices(page).getByRole('button', { name: 'Entendi' }).click()
    await expect(cartNotices(page)).toBeEmpty()
    await expect(cartTotal(page)).toHaveText('3.016 ETH')
  })

  test('edição esgotada: item marcado e finalização bloqueada', async ({ page }) => {
    await addToCart(page, 'emerald-ape-042')
    const checkout = page.getByRole('button', { name: 'Conectar e finalizar' }).filter({
      visible: true,
    })
    await expect(checkout).toBeEnabled()

    await updateNft(page, 'emerald-ape-042', { editions: { '1-50': 0 } })

    await expect(cartNotices(page)).toContainText('está esgotado')
    await expect(cartItem(page, EMERALD)).toContainText('Esgotado')
    await expect(cartTotal(page)).toHaveText('0.00 ETH')
    await expect(checkout).toBeDisabled()

    await cartItem(page, EMERALD)
      .getByRole('button', { name: `Remover ${EMERALD} do carrinho` })
      .click()
    await expect(emptyCart(page)).toBeVisible()
  })

  test('disponibilidade abaixo da quantidade: ajusta e avisa', async ({ page }) => {
    await addToCart(page, 'sage-nomad-009', { quantity: 4, edition: '1/10' })
    await updateNft(page, 'sage-nomad-009', { editions: { '1-10': 2 } })
    await expect(cartNotices(page)).toContainText('a quantidade foi ajustada para 2')
    await expect(
      cartItem(page, SAGE).getByRole('status', { name: `Quantidade de ${SAGE}` }),
    ).toHaveText('2')
    await expect(cartTotal(page)).toHaveText('3.396 ETH') // 2 × 1.69 + 0.016
  })

  test('cenário do §7: preço muda sozinho durante a navegação', async ({ page }) => {
    await addToCart(page, 'emerald-ape-042')
    // A mudança agenda-se 4s depois de o carrinho ser consultado com itens.
    await openApp(page, '/carrinho', 'preco-alterado')
    await expect(cartNotices(page)).toContainText('o preço mudou de 1.19 ETH', { timeout: 12_000 })
  })

  test('duplicatas e eventos antigos não regridem nem reaplicam', async ({ page }) => {
    await addToCart(page, 'emerald-ape-042')
    await updateNft(page, 'emerald-ape-042', { price: '1.40' })
    await expect(cartTotal(page)).toHaveText('1.416 ETH')
    await updateNft(page, 'emerald-ape-042', { price: '1.60' })
    await expect(cartTotal(page)).toHaveText('1.616 ETH')

    const cartRequests: string[] = []
    page.on('request', (req) => {
      if (req.url().endsWith('/api/cart') || req.url().includes('/api/cart?'))
        cartRequests.push(req.url())
    })

    // Duplicata: o mesmo evento (mesmo eventId e versão) chega de novo.
    await page.evaluate(() => window.__kurioMock!.realtime.replay())
    // Evento antigo: outro eventId, mas a versão é menor que a já aplicada.
    await page.evaluate(() => {
      const history = window.__kurioMock!.realtime.history()
      const latest = history.at(-1)!
      window.__kurioMock!.realtime.emit({
        eventId: 'evt_atrasado',
        type: 'nft.updated',
        occurredAt: new Date(0).toISOString(),
        resource: { type: 'nft', id: latest.resource.id },
        version: latest.version - 1,
        payload: { price: '9.99', previousPrice: null, available: 1, editions: [] },
      })
    })
    await page.waitForTimeout(800)
    await expect(cartTotal(page)).toHaveText('1.616 ETH')
    await expect(page.getByText('9.99')).toHaveCount(0)
    expect(cartRequests).toHaveLength(0)
  })

  test('reconcilia com a REST após reconexão', async ({ page }) => {
    await addToCart(page, 'emerald-ape-042')
    await expect(cartTotal(page)).toHaveText('1.206 ETH')

    // Conexão cai e o preço muda enquanto o cliente está desconectado: nenhum evento chega.
    await page.evaluate(() => {
      window.__kurioMock!.realtime.disconnectAll()
      window.__kurioMock!.nft.update('emerald-ape-042', { price: '2.00' })
    })
    // Ao reconectar, o cliente rebusca os recursos ativos na API.
    await expect(cartTotal(page)).toHaveText('2.016 ETH', { timeout: 15_000 })
    await expect(cartNotices(page)).toContainText('o preço mudou de 1.19 ETH para 2.00 ETH')
  })
})

test.describe('Catálogo e detalhe em tempo real', () => {
  test('preço e disponibilidade atualizam no detalhe', async ({ page }) => {
    await openApp(page, '/nft/sage-nomad-009')
    await expect(page.getByText('1.69 ETH').filter({ visible: true }).first()).toBeVisible()
    const edition = page.getByRole('radio', { name: /^1\/10\s*, 4 disponíveis/ })
    await expect(edition).toBeVisible()

    await updateNft(page, 'sage-nomad-009', { price: '1.75', editions: { '1-10': 0 } })

    await expect(page.getByText('1.75 ETH').filter({ visible: true }).first()).toBeVisible()
    await expect(page.getByRole('radio', { name: /^1\/10\s*, esgotada/ })).toBeDisabled()
  })

  test('preço atualiza no catálogo', async ({ page }) => {
    await openApp(page, '/?busca=Emerald')
    const card = catalogCards(page).filter({ hasText: 'Emerald Ape #042' })
    await expect(card).toContainText('1.19 ETH')
    await updateNft(page, 'emerald-ape-042', { price: '1.33' })
    await expect(card).toContainText('1.33 ETH')
  })
})

test.describe('Carregamento do carrinho', () => {
  test('skeleton com shimmer no resumo, com as mesmas dimensões do conteúdo', async ({ page }) => {
    await addToCart(page, 'emerald-ape-042')
    await openApp(page, '/carrinho', 'lento')
    const summary = page.getByTestId('cart-summary').filter({ visible: true })
    const skeleton = summary.locator('[data-slot="skeleton"]').first()
    await expect(skeleton).toBeVisible()
    expect(await skeleton.evaluate((el) => getComputedStyle(el).animationName)).toBe('shimmer')
    const loading = await summary.boundingBox()

    await expect(cartTotal(page)).toBeVisible({ timeout: 10_000 })
    const loaded = await summary.boundingBox()
    expect(Math.abs(loaded!.height - loading!.height)).toBeLessThanOrEqual(2)
    expect(Math.abs(loaded!.width - loading!.width)).toBeLessThanOrEqual(1)
    expect(Math.abs(loaded!.y - loading!.y)).toBeLessThanOrEqual(1)
  })

  test('skeleton respeita a preferência por movimento reduzido', async ({ page }) => {
    await addToCart(page, 'emerald-ape-042')
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await openApp(page, '/carrinho', 'lento')
    const skeleton = page.locator('[data-slot="skeleton"]').filter({ visible: true }).first()
    await expect(skeleton).toBeVisible()
    expect(await skeleton.evaluate((el) => getComputedStyle(el).animationName)).toBe('none')
  })
})
