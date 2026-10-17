import { expect, test } from '@playwright/test'

import {
  apiCart,
  cartItem,
  apiOrders,
  confirmPurchaseButton,
  openReview,
  receipt,
  reviewDialog,
  startCheckout,
} from './support'

test.describe('Compra completa', () => {
  test('do catálogo ao recibo confirmado pela simulação', async ({ page }) => {
    await startCheckout(page)
    await expect(page.getByTestId('checkout-total').filter({ visible: true })).toHaveText(
      '1.206 ETH',
    )
    const dialog = await openReview(page)
    await expect(dialog.getByTestId('review-total')).toHaveText('1.206 ETH')

    const created = page.waitForRequest(
      (req) => req.url().endsWith('/api/orders') && req.method() === 'POST',
    )
    await dialog.getByRole('button', { name: 'Enviar pedido' }).click()
    const request = await created
    expect(request.headers()['idempotency-key']).toMatch(/^idem-/)

    // Pendente: ainda não há recibo nem confirmação.
    await expect(page).toHaveURL(/\/pedido\/ord_/)
    await expect(page.getByRole('heading', { name: 'Pagamento em processamento' })).toBeVisible()
    await expect(receipt(page)).toHaveCount(0)

    // Confirmado pela simulação (order.updated pelo socket + REST).
    await expect(receipt(page)).toBeVisible({ timeout: 10_000 })
    await expect(receipt(page).getByTestId('receipt-total')).toHaveText('1.206 ETH')
    await expect(receipt(page)).toContainText('Emerald Ape #042')
    await expect(receipt(page)).toContainText('Taxa de rede')
    await expect(receipt(page).getByRole('link', { name: /Ver no Etherscan/ })).toHaveAttribute(
      'href',
      /^https:\/\/etherscan\.io\/tx\/0x[0-9a-f]{64}$/,
    )
    const orders = await apiOrders(page)
    expect(orders).toHaveLength(1)
    expect(orders[0]!.status).toBe('confirmado')
    // A confirmação baixou os itens comprados do carrinho.
    expect((await apiCart(page)).itemCount).toBe(0)
  })
})

test.describe('Formulário e revisão', () => {
  test('valida os campos do layout antes de pedir a cotação', async ({ page }) => {
    await startCheckout(page)
    const quotes: string[] = []
    page.on('request', (req) => req.url().endsWith('/api/quotes') && quotes.push(req.url()))

    const form = page.getByRole('form', { name: 'Dados do colecionador' })
    await form.getByLabel('Nome de exibição').fill('')
    await form.getByLabel('Código de indicação').fill('abc')
    await form.getByLabel('E-mail').fill('invalido')
    await confirmPurchaseButton(page).click()

    await expect(form.getByLabel('Nome de exibição')).toHaveAttribute('aria-invalid', 'true')
    await expect(form.getByText('Informe o nome de exibição.')).toBeVisible()
    await expect(form.getByLabel('Código de indicação')).toHaveAttribute('aria-invalid', 'true')
    await expect(form.getByLabel('E-mail')).toHaveAttribute('aria-invalid', 'true')
    await expect(reviewDialog(page)).toHaveCount(0)
    expect(quotes).toHaveLength(0)

    // Corrigido, o formulário segue para a revisão.
    await form.getByLabel('Nome de exibição').fill('Ana Lima')
    await form.getByLabel('Código de indicação').fill('KURIO2026')
    await form.getByLabel('E-mail').fill('ana@kurio.dev')
    await openReview(page)
  })

  test('revisão não cria pedido: voltar e editar descarta a tentativa', async ({ page }) => {
    await startCheckout(page)
    const dialog = await openReview(page)
    await expect(dialog).toContainText('Emerald Ape #042')
    await expect(dialog).toContainText('Válida por')
    await dialog.getByRole('button', { name: 'Voltar e editar' }).click()
    await expect(reviewDialog(page)).toHaveCount(0)
    expect(await apiOrders(page)).toHaveLength(0)
    expect((await apiCart(page)).itemCount).toBe(1)
  })

  test('o formulário preenchido sobrevive a um refresh (rascunho do usuário)', async ({ page }) => {
    await startCheckout(page)
    const form = page.getByRole('form', { name: 'Dados do colecionador' })
    await form.getByLabel('Observação do colecionador (opcional)').fill('Entregar na carteira cold')
    await page.reload()
    await expect(
      page
        .getByRole('form', { name: 'Dados do colecionador' })
        .getByLabel('Observação do colecionador (opcional)'),
    ).toHaveValue('Entregar na carteira cold')
  })
})

test.describe('Rede do pedido', () => {
  test('a rede escolhida seleciona a carteira compatível e define a taxa', async ({ page }) => {
    await startCheckout(page)
    const form = page.getByRole('form', { name: 'Dados do colecionador' })
    const network = form.getByLabel('Rede')
    await expect(network).toHaveValue('ethereum')
    await expect(page.getByTestId('checkout-total').filter({ visible: true })).toHaveText(
      '1.206 ETH',
    )

    // Polygon: a carteira "Reserva" (Polygon) passa a ser a do pedido e a taxa é a da rede.
    await network.selectOption('polygon')
    await expect(page.getByRole('radio', { name: /^Reserva/ })).toBeChecked()
    await expect(page.getByTestId('checkout-total').filter({ visible: true })).toHaveText(
      '1.192 ETH',
    )
    const dialog = await openReview(page)
    await expect(dialog).toContainText('Polygon')
    await expect(dialog.getByTestId('review-total')).toHaveText('1.192 ETH')
  })

  test('rede sem carteira cadastrada: erro no campo e compra bloqueada', async ({ page }) => {
    await startCheckout(page)
    const network = page.getByRole('form', { name: 'Dados do colecionador' }).getByLabel('Rede')
    await network.selectOption('solana')
    await expect(network).toHaveAttribute('aria-invalid', 'true')
    await expect(network).toHaveAccessibleDescription(/é da rede Ethereum.*rede Solana/)
    await expect(confirmPurchaseButton(page)).toBeDisabled()
  })

  test('a API recusa pedido com carteira de outra rede (409 NETWORK_MISMATCH)', async ({
    page,
  }) => {
    await startCheckout(page)
    await openReview(page) // cotação na rede Ethereum
    const result = await page.evaluate(async () => {
      const session = JSON.parse(localStorage.getItem('kurio:app:session')!)
      const draft = JSON.parse(localStorage.getItem(`kurio:app:checkout:${session.user.id}`)!)
      const headers = { authorization: `Bearer ${session.token}` }
      const wallets = (await (await fetch('/api/wallets', { headers })).json()).items as {
        id: string
        network: string
      }[]
      const polygon = wallets.find((wallet) => wallet.network === 'polygon')!
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          ...headers,
          'content-type': 'application/json',
          'idempotency-key': 'idem-teste-rede-incompativel',
        },
        body: JSON.stringify({ ...draft.attempt.body, walletId: polygon.id }),
      })
      return { status: res.status, body: await res.json() }
    })
    expect(result.status).toBe(409)
    expect(result.body.error.code).toBe('NETWORK_MISMATCH')
    expect(await apiOrders(page)).toHaveLength(0)
  })
})

test.describe('Cotação', () => {
  test('cotação expirada bloqueia o envio e permite recotar com nova chave', async ({ page }) => {
    await startCheckout(page, { scenario: 'cotacao-expirada' })
    const dialog = await openReview(page)
    const firstKey = await page.evaluate(
      () =>
        JSON.parse(
          localStorage.getItem(Object.keys(localStorage).find((k) => k.includes('checkout'))!)!,
        ).attempt.key,
    )

    // A cotação vale 4s neste cenário.
    await expect(dialog.getByText('Expirada')).toBeVisible({ timeout: 10_000 })
    await expect(dialog.getByRole('alert')).toContainText('A cotação expirou')
    await expect(dialog.getByRole('button', { name: 'Enviar pedido' })).toHaveCount(0)

    await dialog.getByRole('button', { name: 'Atualizar cotação' }).click()
    await expect(dialog.getByText('Válida por')).toBeVisible()
    const secondKey = await page.evaluate(
      () =>
        JSON.parse(
          localStorage.getItem(Object.keys(localStorage).find((k) => k.includes('checkout'))!)!,
        ).attempt.key,
    )
    expect(secondKey).not.toBe(firstKey) // outra cotação, outra Idempotency-Key
    expect(await apiOrders(page)).toHaveLength(0)

    await dialog.getByRole('button', { name: 'Enviar pedido' }).click()
    await expect(page).toHaveURL(/\/pedido\/ord_/)
  })

  test('preço alterado via Socket.IO durante o checkout exige nova confirmação', async ({
    page,
  }) => {
    await startCheckout(page)
    const dialog = await openReview(page)
    await expect(dialog.getByTestId('review-total')).toHaveText('1.206 ETH')

    await page.evaluate(() => window.__kurioMock!.nft.update('emerald-ape-042', { price: '1.50' }))

    await expect(dialog.getByRole('alert')).toContainText(
      'Emerald Ape #042: o preço mudou de 1.19 ETH para 1.50 ETH.',
    )
    // O envio fica bloqueado: só é possível recotar.
    await expect(dialog.getByRole('button', { name: 'Enviar pedido' })).toHaveCount(0)
    expect(await apiOrders(page)).toHaveLength(0)

    await dialog.getByRole('button', { name: 'Atualizar cotação' }).click()
    await expect(dialog.getByTestId('review-total')).toHaveText('1.516 ETH')
    await expect(dialog.getByRole('alert')).toHaveCount(0)
    // Nova confirmação do usuário: só então o pedido é enviado, com o valor novo.
    await dialog.getByRole('button', { name: 'Enviar pedido' }).click()
    await expect(page).toHaveURL(/\/pedido\/ord_/)
    await expect(receipt(page).getByTestId('receipt-total')).toHaveText('1.516 ETH', {
      timeout: 10_000,
    })
  })

  test('disponibilidade alterada: a edição esgotada impede nova cotação', async ({ page }) => {
    await startCheckout(page)
    const dialog = await openReview(page)
    await page.evaluate(() =>
      window.__kurioMock!.nft.update('emerald-ape-042', { editions: { '1-50': 0 } }),
    )
    await expect(dialog.getByRole('alert')).toContainText('deixou de estar disponível')
    await expect(dialog.getByRole('button', { name: 'Enviar pedido' })).toHaveCount(0)
    await dialog.getByRole('button', { name: 'Atualizar cotação' }).click()
    await expect(dialog.getByRole('alert')).toContainText('esgotados')
    expect(await apiOrders(page)).toHaveLength(0)
  })

  test('a API recusa cotação desatualizada mesmo sem o evento (409 QUOTE_STALE)', async ({
    page,
  }) => {
    await startCheckout(page)
    const dialog = await openReview(page)
    // Altera o catálogo sem o cliente receber o evento: derruba o socket no mesmo instante.
    await page.evaluate(() => {
      window.__kurioMock!.realtime.disconnectAll()
      window.__kurioMock!.nft.update('emerald-ape-042', { price: '1.80' })
    })
    // Sem evento, o clique chega à API, que rejeita e informa o que mudou.
    const stale = page.waitForResponse(
      (res) => res.url().endsWith('/api/orders') && res.request().method() === 'POST',
    )
    await dialog.getByRole('button', { name: 'Enviar pedido' }).click()
    const response = await stale
    expect(response.status()).toBe(409)
    expect((await response.json()).error.code).toBe('QUOTE_STALE')
    await expect(dialog.getByRole('alert')).toContainText('o preço mudou de 1.19 ETH para 1.80 ETH')
    expect(await apiOrders(page)).toHaveLength(0)
  })
})

test.describe('Pedido idempotente', () => {
  test('clique repetido envia uma única requisição e cria um único pedido', async ({ page }) => {
    await startCheckout(page, { scenario: 'requisicao-duplicada' })
    const dialog = await openReview(page)
    const posts: { key: string | undefined }[] = []
    page.on('request', (req) => {
      if (req.url().endsWith('/api/orders') && req.method() === 'POST')
        posts.push({ key: req.headers()['idempotency-key'] })
    })
    const send = dialog.getByRole('button', { name: 'Enviar pedido' })
    await send.dblclick()
    await send.click({ force: true, timeout: 500 }).catch(() => undefined)
    await expect(page).toHaveURL(/\/pedido\/ord_/, { timeout: 10_000 })
    expect(posts).toHaveLength(1)
    expect(await apiOrders(page)).toHaveLength(1)
  })

  test('a API devolve o mesmo pedido para a mesma chave e rejeita corpo diferente', async ({
    page,
  }) => {
    await startCheckout(page)
    await openReview(page)
    const result = await page.evaluate(async () => {
      const session = JSON.parse(localStorage.getItem('kurio:app:session')!)
      const draft = JSON.parse(localStorage.getItem(`kurio:app:checkout:${session.user.id}`)!)
      const send = async (body: unknown) => {
        const res = await fetch('/api/orders', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${session.token}`,
            'idempotency-key': draft.attempt.key,
          },
          body: JSON.stringify(body),
        })
        return { status: res.status, body: await res.json() }
      }
      const [a, b] = await Promise.all([send(draft.attempt.body), send(draft.attempt.body)])
      const other = await send({ ...draft.attempt.body, provider: 'walletconnect' })
      return { a, b, other }
    })
    expect([result.a.status, result.b.status].sort()).toEqual([200, 201])
    expect(result.a.body.id).toBe(result.b.body.id)
    expect(result.other.status).toBe(409)
    expect(result.other.body.error.code).toBe('IDEMPOTENCY_CONFLICT')
    expect(await apiOrders(page)).toHaveLength(1)
  })

  test('timeout ao criar o pedido: o reenvio recupera o mesmo pedido, sem duplicar', async ({
    page,
  }) => {
    test.setTimeout(60_000)
    await startCheckout(page, { scenario: 'timeout-pedido' })
    const dialog = await openReview(page)
    const keys: (string | undefined)[] = []
    page.on('request', (req) => {
      if (req.url().endsWith('/api/orders') && req.method() === 'POST')
        keys.push(req.headers()['idempotency-key'])
    })
    await dialog.getByRole('button', { name: 'Enviar pedido' }).click()

    // A resposta passa do timeout do cliente (10s): erro com recuperação, sem navegar.
    await expect(dialog.getByRole('alert')).toContainText('Não recebemos a resposta', {
      timeout: 20_000,
    })
    await expect(page).toHaveURL(/\/pagamento$/)
    await dialog.getByRole('button', { name: 'Tentar novamente' }).click()

    await expect(page).toHaveURL(/\/pedido\/ord_/)
    expect(keys).toHaveLength(2)
    expect(keys[1]).toBe(keys[0]) // mesma Idempotency-Key
    const orders = await apiOrders(page)
    expect(orders).toHaveLength(1)
    await expect(page).toHaveURL(new RegExp(`/pedido/${orders[0]!.id}$`))
  })
})

test.describe('Estados do pedido', () => {
  test('pendente que confirma pelo socket: recibo só depois do order.updated', async ({ page }) => {
    await startCheckout(page, { scenario: 'pendente-confirma' })
    await (await openReview(page)).getByRole('button', { name: 'Enviar pedido' }).click()
    const status = page.getByRole('heading', { name: 'Pagamento em processamento' })
    await expect(status).toBeVisible()
    await expect(receipt(page)).toHaveCount(0)
    await expect(receipt(page)).toBeVisible({ timeout: 10_000 })
    const events = await page.evaluate(() =>
      window.__kurioMock!.realtime.history().map((event) => event.eventId),
    )
    expect(events.length).toBeGreaterThan(0)
  })

  test('pendente que é recusado pelo socket: itens preservados e recuperação', async ({ page }) => {
    await startCheckout(page, { scenario: 'pendente-recusa' })
    await (await openReview(page)).getByRole('button', { name: 'Enviar pedido' }).click()
    await expect(page.getByRole('heading', { name: 'Pagamento recusado' })).toBeVisible({
      timeout: 10_000,
    })
    await expect(receipt(page)).toHaveCount(0)
    expect((await apiCart(page)).itemCount).toBe(1)

    await page.getByRole('button', { name: 'Tentar novamente' }).click()
    await expect(page).toHaveURL(/\/pagamento$/)
    await expect(confirmPurchaseButton(page)).toBeEnabled()
    // Nova tentativa: cotação e chave novas (a anterior chegou a um estado terminal).
    await (await openReview(page)).getByRole('button', { name: 'Voltar e editar' }).click()

    await page.goto('/carrinho')
    await expect(cartItem(page, 'Emerald Ape #042')).toBeVisible()
  })

  test('pagamento recusado: voltar ao carrinho mantém os itens', async ({ page }) => {
    await startCheckout(page, { scenario: 'pagamento-recusado' })
    await (await openReview(page)).getByRole('button', { name: 'Enviar pedido' }).click()
    await expect(page.getByRole('heading', { name: 'Pagamento recusado' })).toBeVisible({
      timeout: 10_000,
    })
    await expect(page.getByRole('alert')).toContainText('Pagamento recusado pela carteira')
    await page.getByRole('link', { name: 'Voltar ao carrinho' }).click()
    await expect(page).toHaveURL(/\/carrinho$/)
    await expect(cartItem(page, 'Emerald Ape #042')).toBeVisible()
    expect((await apiOrders(page))[0]!.status).toBe('recusado')
  })

  test('refresh durante o pendente retoma o mesmo pedido, sem nova compra', async ({ page }) => {
    await startCheckout(page, { scenario: 'pagamento-lento' })
    await (await openReview(page)).getByRole('button', { name: 'Enviar pedido' }).click()
    await expect(page).toHaveURL(/\/pedido\/ord_/)
    const [order] = await apiOrders(page)

    await page.reload()
    await expect(page.getByRole('heading', { name: 'Pagamento em processamento' })).toBeVisible()
    // Voltar ao checkout durante o pendente leva ao pedido em andamento, não a outra compra.
    await page.goto('/pagamento')
    await expect(page).toHaveURL(new RegExp(`/pedido/${order!.id}$`))
    expect(await apiOrders(page)).toHaveLength(1)

    await page.evaluate((id) => window.__kurioMock!.orders.settleNow(id), order!.id)
    await expect(receipt(page)).toBeVisible()
  })

  test('pagamento termina antes de o socket conectar: a primeira conexão reconcilia pelo REST', async ({
    page,
  }) => {
    await startCheckout(page, { scenario: 'pagamento-lento' })
    await (await openReview(page)).getByRole('button', { name: 'Enviar pedido' }).click()
    await expect(page).toHaveURL(/\/pedido\/ord_/)
    const [order] = await apiOrders(page)

    // Recarrega com o servidor de socket recusando conexões: o pedido pendente vem do REST e o
    // pagamento termina antes da primeira conexão, sem ninguém para receber o order.updated.
    await page.evaluate(() => window.__kurioMock!.realtime.holdConnections(true))
    await page.reload()
    await expect(page.getByRole('heading', { name: 'Pagamento em processamento' })).toBeVisible()
    const settledBeforeConnect = await page.evaluate((id) => {
      if (window.__kurioMock!.realtime.connections().length > 0) return false
      window.__kurioMock!.orders.settleNow(id)
      return true
    }, order!.id)
    expect(settledBeforeConnect).toBe(true)

    // O servidor volta; na primeira conexão o cliente reconcilia o pedido pelo REST.
    await page.evaluate(() => window.__kurioMock!.realtime.holdConnections(false))
    await expect(receipt(page)).toBeVisible({ timeout: 15_000 })
    expect(await apiOrders(page)).toHaveLength(1)
  })

  test('conexão cai com o pedido pendente: reconecta e reconcilia pelo REST', async ({ page }) => {
    await startCheckout(page, { scenario: 'pagamento-lento' })
    await (await openReview(page)).getByRole('button', { name: 'Enviar pedido' }).click()
    await expect(page.getByRole('heading', { name: 'Pagamento em processamento' })).toBeVisible()
    const [order] = await apiOrders(page)

    // O pagamento termina enquanto o cliente está desconectado: o evento se perde.
    await page.evaluate((id) => {
      window.__kurioMock!.realtime.disconnectAll()
      window.__kurioMock!.orders.settleNow(id)
    }, order!.id)

    await expect(receipt(page)).toBeVisible({ timeout: 15_000 })
    expect(await apiOrders(page)).toHaveLength(1)
  })

  test('eventos duplicados, antigos e de outro usuário não mudam o pedido', async ({ page }) => {
    await startCheckout(page, { scenario: 'pagamento-lento' })
    await (await openReview(page)).getByRole('button', { name: 'Enviar pedido' }).click()
    await expect(page).toHaveURL(/\/pedido\/ord_/)
    const [order] = await apiOrders(page)

    // Evento de outro usuário: descartado, mesmo entregue ao socket desta sessão.
    await page.evaluate((id) => {
      window.__kurioMock!.realtime.emit({
        eventId: 'evt_alheio',
        type: 'order.updated',
        occurredAt: new Date().toISOString(),
        resource: { type: 'order', id },
        version: 50,
        userId: 'usr_bruno',
        payload: { status: 'confirmado', failureReason: null },
      })
    }, order!.id)
    await page.waitForTimeout(500)
    await expect(page.getByRole('heading', { name: 'Pagamento em processamento' })).toBeVisible()

    await page.evaluate((id) => window.__kurioMock!.orders.settleNow(id), order!.id)
    await expect(receipt(page)).toBeVisible()

    // Duplicata e evento antigo (versão 1, "pendente") depois do terminal: nada muda e nada é rebuscado.
    const requests: string[] = []
    page.on('request', (req) => req.url().includes('/api/orders') && requests.push(req.url()))
    await page.evaluate((id) => {
      window.__kurioMock!.realtime.replay()
      window.__kurioMock!.realtime.emit({
        eventId: 'evt_atrasado',
        type: 'order.updated',
        occurredAt: new Date(0).toISOString(),
        resource: { type: 'order', id },
        version: 1,
        userId: 'usr_ana',
        payload: { status: 'pendente', failureReason: null },
      })
    }, order!.id)
    await page.waitForTimeout(800)
    await expect(receipt(page)).toBeVisible()
    expect(requests).toHaveLength(0)
  })
})

test.describe('Recibo, carrinho e isolamento', () => {
  test('o recibo é um snapshot: preço novo no catálogo não o altera', async ({ page }) => {
    await startCheckout(page, { scenario: 'pendente-confirma' })
    await (await openReview(page)).getByRole('button', { name: 'Enviar pedido' }).click()
    await expect(receipt(page)).toBeVisible({ timeout: 10_000 })
    await expect(receipt(page).getByTestId('receipt-total')).toHaveText('1.206 ETH')

    await page.evaluate(() => window.__kurioMock!.nft.update('emerald-ape-042', { price: '9.99' }))
    await page.waitForTimeout(600) // o evento nft.updated chega à página
    await expect(receipt(page).getByTestId('receipt-total')).toHaveText('1.206 ETH')
    await expect(receipt(page)).not.toContainText('9.99')
    await page.reload()
    await expect(receipt(page).getByTestId('receipt-total')).toHaveText('1.206 ETH')
    await expect(receipt(page)).not.toContainText('9.99')
  })

  test('após confirmar, remove só os itens e quantidades comprados', async ({ page }) => {
    await startCheckout(page, {
      scenario: 'pagamento-lento',
      items: [
        ['emerald-ape-042', 2],
        ['golden-beat-207', 1],
      ],
    })
    await (await openReview(page)).getByRole('button', { name: 'Enviar pedido' }).click()
    await expect(page).toHaveURL(/\/pedido\/ord_/)
    const [order] = await apiOrders(page)

    // Enquanto o pedido está pendente, o carrinho segue intacto e ganha mais 1 unidade.
    expect((await apiCart(page)).itemCount).toBe(3)
    await page.evaluate(async () => {
      const session = JSON.parse(localStorage.getItem('kurio:app:session')!)
      await fetch('/api/cart/items', {
        method: 'POST',
        headers: { 'content-type': 'application/json', authorization: `Bearer ${session.token}` },
        body: JSON.stringify({ nftId: 'emerald-ape-042', editionId: '1-50', quantity: 1 }),
      })
    })
    await page.evaluate((id) => window.__kurioMock!.orders.settleNow(id), order!.id)
    await expect(receipt(page)).toBeVisible()
    const cart = await apiCart(page)
    expect(cart.items).toEqual([
      expect.objectContaining({ id: 'emerald-ape-042:1-50', quantity: 1 }),
    ])
  })

  test('pedido de outra conta não é acessível', async ({ page }) => {
    await startCheckout(page, { scenario: 'pendente-confirma' })
    await (await openReview(page)).getByRole('button', { name: 'Enviar pedido' }).click()
    await expect(receipt(page)).toBeVisible({ timeout: 10_000 })
    const [order] = await apiOrders(page)

    // Bruno (outra conta) recebe 404 para o pedido da Ana.
    const status = await page.evaluate(async (id) => {
      const login = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: 'bruno@kurio.dev', password: 'Colecao#77' }),
      })
      const { token } = await login.json()
      const res = await fetch(`/api/orders/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      return res.status
    }, order!.id)
    expect(status).toBe(404)
  })
})

test.describe('Carteira', () => {
  test('conexão recusada não cria pedido e a nova tentativa funciona', async ({ page }) => {
    await startCheckout(page, { scenario: 'carteira-recusada' })
    const dialog = await openReview(page)
    await dialog.getByRole('button', { name: 'Enviar pedido' }).click()
    await expect(dialog.getByRole('alert')).toContainText('A conexão com a carteira foi recusada')
    expect(await apiOrders(page)).toHaveLength(0)

    await page.evaluate(() => window.__kurioMock!.scenarios.set('padrao'))
    await dialog.getByRole('button', { name: 'Conectar e enviar' }).click()
    await expect(page).toHaveURL(/\/pedido\/ord_/)
    expect(await apiOrders(page)).toHaveLength(1)
  })

  test('conectar e desconectar a carteira cadastrada', async ({ page }) => {
    await startCheckout(page)
    const principal = page.getByRole('radiogroup', { name: 'Carteira conectada' })
    await expect(principal).toContainText('Desconectada')
    await principal.getByRole('button', { name: 'Ações da carteira Principal' }).click()
    await page.getByRole('menuitem', { name: 'Conectar carteira' }).click()
    await expect(principal).toContainText('Conectada')
    await principal.getByRole('button', { name: 'Ações da carteira Principal' }).click()
    await page.getByRole('menuitem', { name: 'Desconectar carteira' }).click()
    await expect(principal).toContainText('Desconectada')
  })
})
