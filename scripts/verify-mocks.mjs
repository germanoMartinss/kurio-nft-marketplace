/**
 * Verificação da API simulada pelo navegador: cada chamada passa pelo service worker do MSW, o mesmo
 * caminho do Axios da aplicação. Cobre contratos, regras de negócio e os cenários do §6.
 * Não substitui os testes E2E (que observam a interface); valida a camada de mocks isoladamente.
 *
 * Uso: pnpm build && pnpm preview (em outro terminal) e então pnpm verify:mocks [baseUrl]
 */
import { chromium } from '@playwright/test'

const base = process.argv[2] ?? 'http://localhost:4173'
const browser = await chromium.launch()
const page = await browser.newPage()
const results = []
const check = async (name, fn) => {
  try {
    await fn()
    results.push(`OK   ${name}`)
  } catch (e) {
    results.push(`FAIL ${name}: ${String(e.message).split('\n')[0]}`)
  }
}
const assert = (cond, msg) => {
  if (!cond) throw new Error(msg)
}

// Chamada pela página: passa pelo service worker do MSW, como o Axios da aplicação.
// Como o app, `POST /orders` conecta antes a carteira do pedido (`connect: false` desliga isso).
const api = async (method, path, options = {}) => {
  const { body, token, connect = true } = options
  if (method === 'POST' && path === '/orders' && connect && token && body?.walletId)
    await rawApi('POST', `/wallets/${body.walletId}/connect`, { token })
  return rawApi(method, path, options)
}
const rawApi = (method, path, { body, token, guest = 'guest-verify-0001', headers = {} } = {}) =>
  page.evaluate(
    async ({ method, path, body, token, guest, headers }) => {
      try {
        const res = await fetch('/api' + path, {
          method,
          headers: {
            'content-type': 'application/json',
            'x-guest-id': guest,
            ...(token ? { authorization: 'Bearer ' + token } : {}),
            ...headers,
          },
          body: body ? JSON.stringify(body) : undefined,
        })
        const text = await res.text()
        return { status: res.status, body: text ? JSON.parse(text) : null }
      } catch (e) {
        return { status: 0, error: String(e) }
      }
    },
    { method, path, body, token, guest, headers },
  )

const control = (expr, arg) =>
  page.evaluate(new Function('arg', `return (${expr})(window.__kurioMock, arg)`), arg)
const loadScenario = async (id) => {
  await page.goto(`${base}/mocks?reset=1&cenario=${id}`)
  await page.waitForFunction(() => window.__kurioMock)
}

await loadScenario('padrao')

await check('catálogo: 36 NFTs, 9 por página, 4 páginas, facetas', async () => {
  const r = await api('GET', '/nfts')
  assert(
    r.status === 200 && r.body.total === 36 && r.body.items.length === 9 && r.body.totalPages === 4,
    JSON.stringify([r.status, r.body.total, r.body.totalPages]),
  )
  assert(r.body.facets.categories.length === 9 && r.body.facets.networks.length === 3, 'facetas')
  assert(
    r.body.facets.priceRange.min === '0.02' && r.body.facets.priceRange.max === '12.3',
    JSON.stringify(r.body.facets.priceRange),
  )
})
await check('filtros combinados (música + solana) e faceta ignora o próprio filtro', async () => {
  const r = await api('GET', '/nfts?categories=musica&networks=solana')
  assert(
    r.body.items.some((n) => n.id === 'golden-signal-160'),
    'golden signal ausente',
  )
  assert(
    r.body.items.every((n) => n.category === 'musica' && n.network === 'solana'),
    'filtro',
  )
  const musica = r.body.facets.categories.find((c) => c.id === 'musica').count
  const fotografia = r.body.facets.categories.find((c) => c.id === 'fotografia').count
  assert(musica === r.body.total && fotografia >= 0, 'contagem')
})
await check('busca + ordenação por menor preço + página fora do intervalo', async () => {
  const r = await api('GET', '/nfts?q=ape&sort=menor-preco')
  const prices = r.body.items.map((n) => Number(n.price))
  assert(
    r.body.items.every((n) => /ape/i.test(n.name) || /apes/i.test(n.collection)),
    'busca',
  )
  assert(
    prices.every((p, i) => i === 0 || prices[i - 1] <= p),
    'ordem ' + prices,
  )
  const last = await api('GET', '/nfts?page=99')
  assert(last.body.page === 4, 'página ' + last.body.page)
})
await check('detalhe, highlights e NFT inexistente (404 no contrato)', async () => {
  const d = await api('GET', '/nfts/emerald-ape-042')
  assert(
    d.status === 200 &&
      d.body.price === '1.19' &&
      d.body.editions.find((e) => e.id === '1-1').available === 0,
    'detalhe',
  )
  const h = await api('GET', '/nfts/highlights')
  assert(
    h.status === 200 && h.body.hero.length === 3 && h.body.featured.id === 'sage-nomad-009',
    'highlights',
  )
  const nf = await api('GET', '/nfts/nao-existe')
  assert(nf.status === 404 && nf.body.error.code === 'NOT_FOUND', JSON.stringify(nf))
})
await check('rota privada sem sessão → 401 UNAUTHENTICATED', async () => {
  const r = await api('GET', '/favorites')
  assert(r.status === 401 && r.body.error.code === 'UNAUTHENTICATED', JSON.stringify(r))
})
await check('login: senha errada 401; validação 422 com fieldErrors', async () => {
  const bad = await api('POST', '/auth/login', {
    body: { email: 'ana@kurio.dev', password: 'errada123' },
  })
  assert(bad.status === 401 && bad.body.error.code === 'INVALID_CREDENTIALS', 'senha errada')
  const invalid = await api('POST', '/auth/login', { body: { email: 'x', password: '' } })
  assert(
    invalid.status === 422 &&
      invalid.body.error.fieldErrors.email &&
      invalid.body.error.fieldErrors.password,
    JSON.stringify(invalid.body),
  )
})

let ana, bruno
await check('login ana e bruno (hash PBKDF2) e GET /auth/session', async () => {
  const a = await api('POST', '/auth/login', {
    body: { email: 'ana@kurio.dev', password: 'Kurio@2026' },
  })
  const b = await api('POST', '/auth/login', {
    body: { email: 'bruno@kurio.dev', password: 'Colecao#77' },
  })
  assert(a.status === 200 && b.status === 200, `${a.status} ${b.status}`)
  ana = a.body.token
  bruno = b.body.token
  const s = await api('GET', '/auth/session', { token: ana })
  assert(s.status === 200 && s.body.user.username === 'analima', 'sessão')
})
await check('senha nunca armazenada em claro', async () => {
  const raw = await page.evaluate(() => localStorage.getItem('kurio:mock:db'))
  assert(!raw.includes('Kurio@2026') && !raw.includes('Colecao#77'), 'senha em claro no storage')
})
await check(
  'cadastro com e-mail existente → 409 EMAIL_TAKEN; usuário reservado → 422',
  async () => {
    const dup = await api('POST', '/auth/register', {
      body: { username: 'novaconta', email: 'ana@kurio.dev', password: 'Senha1234' },
    })
    assert(
      dup.status === 409 &&
        dup.body.error.code === 'EMAIL_TAKEN' &&
        dup.body.error.fieldErrors.email,
      JSON.stringify(dup.body),
    )
    const res = await api('POST', '/auth/register', {
      body: { username: 'admin', email: 'novo@kurio.dev', password: 'Senha1234' },
    })
    assert(res.status === 422 && res.body.error.fieldErrors.username, JSON.stringify(res.body))
  },
)
await check(
  'carrinho de visitante: adicionar, limite de disponibilidade (409), edição esgotada',
  async () => {
    const add = await api('POST', '/cart/items', {
      body: { nftId: 'emerald-ape-042', editionId: '1-50', quantity: 2 },
    })
    assert(
      add.status === 201 && add.body.itemCount === 2 && add.body.summary.subtotal === '2.38',
      JSON.stringify(add.body.summary),
    )
    const over = await api('POST', '/cart/items', {
      body: { nftId: 'emerald-ape-042', editionId: '1-50', quantity: 9 },
    })
    assert(
      over.status === 409 &&
        over.body.error.code === 'AVAILABILITY_CONFLICT' &&
        over.body.error.details.maxQuantity === 10,
      JSON.stringify(over.body),
    )
    const soldOut = await api('POST', '/cart/items', {
      body: { nftId: 'emerald-ape-042', editionId: '1-1', quantity: 1 },
    })
    assert(soldOut.status === 409, 'esgotada')
  },
)
await check('cupom inválido (422), expirado (422) e válido (desconto 10% exato)', async () => {
  const inv = await api('PUT', '/cart/coupon', { body: { code: 'NADA' } })
  assert(inv.status === 422 && inv.body.error.code === 'COUPON_INVALID', 'inválido')
  const exp = await api('PUT', '/cart/coupon', { body: { code: 'GENESIS10' } })
  assert(exp.status === 422 && exp.body.error.code === 'COUPON_EXPIRED', 'expirado')
  const ok = await api('PUT', '/cart/coupon', { body: { code: 'kurio10' } })
  const s = ok.body.summary
  assert(
    s.subtotal === '2.38' &&
      s.discount === '0.238' &&
      s.networkFee === '0.016' &&
      s.total === '2.158',
    JSON.stringify(s),
  )
})
await check('valores decimais exatos no exemplo do Figma (26.83 + 0.016 = 26.846)', async () => {
  const g = 'guest-verify-figma'
  await api('POST', '/cart/items', {
    guest: g,
    body: { nftId: 'emerald-ape-042', editionId: '1-50', quantity: 2 },
  })
  await api('POST', '/cart/items', {
    guest: g,
    body: { nftId: 'violet-nomad-314', editionId: '1-50', quantity: 6 },
  })
  const r = await api('POST', '/cart/items', {
    guest: g,
    body: { nftId: 'ivory-baron-088', editionId: '1-50', quantity: 9 },
  })
  const s = r.body.summary
  assert(
    s.subtotal === '26.83' && s.total === '26.846' && r.body.items[1].lineTotal === '8.34',
    JSON.stringify(s),
  )
})
await check('junção do carrinho de visitante ao logar', async () => {
  const m = await api('POST', '/cart/merge', { token: ana, body: { guestId: 'guest-verify-0001' } })
  assert(
    m.status === 200 &&
      m.body.cart.itemCount === 2 &&
      m.body.cart.summary.coupon?.code === 'KURIO10',
    JSON.stringify(m.body.cart.summary),
  )
  const guestAfter = await api('GET', '/cart')
  assert(guestAfter.body.itemCount === 0, 'carrinho de visitante não foi descartado')
})

let quote, order
const buyer = {
  displayName: 'Ana Lima',
  username: 'analima',
  profileName: 'analima',
  email: 'ana@kurio.dev',
  ensName: 'ana',
  referralCode: 'KURIO2026',
  note: '',
}
await check('cotação congela valores', async () => {
  const q = await api('POST', '/quotes', { token: ana, body: { network: 'ethereum' } })
  assert(
    q.status === 201 && q.body.total === '2.158' && q.body.lines[0].nftVersion === 1,
    JSON.stringify(q.body),
  )
  quote = q.body
})
await check('pedido sem Idempotency-Key → 422', async () => {
  const r = await api('POST', '/orders', {
    token: ana,
    body: { quoteId: quote.id, walletId: 'wal_ana_principal', provider: 'metamask', buyer },
  })
  assert(r.status === 422, String(r.status))
})
await check('idempotência: mesma chave+corpo → mesmo pedido; corpo diferente → 409', async () => {
  const body = { quoteId: quote.id, walletId: 'wal_ana_principal', provider: 'metamask', buyer }
  const headers = { 'idempotency-key': 'idem-verify-0001' }
  const first = await api('POST', '/orders', { token: ana, body, headers })
  const again = await api('POST', '/orders', { token: ana, body, headers })
  assert(first.status === 201 && first.body.status === 'pendente', JSON.stringify(first.body))
  assert(again.status === 200 && again.body.id === first.body.id, 'replay')
  const other = await api('POST', '/orders', {
    token: ana,
    body: { ...body, buyer: { ...buyer, note: 'outro' } },
    headers,
  })
  assert(
    other.status === 409 && other.body.error.code === 'IDEMPOTENCY_CONFLICT',
    JSON.stringify(other.body),
  )
  order = first.body
})
await check(
  'carteira: pedido exige conexão (409 WALLET_DISCONNECTED), rede incompatível (409 NETWORK_MISMATCH) e disconnect alheio (404)',
  async () => {
    const q = await api('POST', '/quotes', { token: ana, body: { network: 'ethereum' } })
    await api('POST', '/wallets/wal_ana_principal/disconnect', { token: ana })
    const disconnected = await api('POST', '/orders', {
      token: ana,
      connect: false,
      headers: { 'idempotency-key': 'idem-verify-desconectada' },
      body: { quoteId: q.body.id, walletId: 'wal_ana_principal', provider: 'metamask', buyer },
    })
    assert(
      disconnected.status === 409 && disconnected.body.error.code === 'WALLET_DISCONNECTED',
      JSON.stringify(disconnected.body),
    )
    const wallets = await api('GET', '/wallets', { token: ana })
    const polygon = wallets.body.items.find((wallet) => wallet.network === 'polygon')
    assert(
      wallets.body.items.every((wallet) => typeof wallet.connected === 'boolean'),
      'connected',
    )
    const mismatch = await api('POST', '/orders', {
      token: ana,
      headers: { 'idempotency-key': 'idem-verify-rede' },
      body: { quoteId: q.body.id, walletId: polygon.id, provider: 'metamask', buyer },
    })
    assert(
      mismatch.status === 409 && mismatch.body.error.code === 'NETWORK_MISMATCH',
      JSON.stringify(mismatch.body),
    )
    const foreign = await api('POST', '/wallets/wal_ana_principal/disconnect', { token: bruno })
    assert(foreign.status === 404, String(foreign.status))
  },
)
await check('isolamento: outro usuário não vê o pedido (404)', async () => {
  const r = await api('GET', `/orders/${order.id}`, { token: bruno })
  assert(r.status === 404, String(r.status))
})
await check('pagamento simulado confirma, publica eventos e remove só o comprado', async () => {
  await page.waitForTimeout(3200)
  const o = await api('GET', `/orders/${order.id}`, { token: ana })
  assert(
    o.body.status === 'confirmado' &&
      o.body.transaction?.hash.length === 66 &&
      o.body.version === 2,
    JSON.stringify(o.body),
  )
  const cart = await api('GET', '/cart', { token: ana })
  assert(cart.body.itemCount === 0, 'carrinho após compra: ' + cart.body.itemCount)
  const nft = await api('GET', '/nfts/emerald-ape-042')
  assert(
    nft.body.editions.find((e) => e.id === '1-50').available === 48 && nft.body.version === 2,
    JSON.stringify(nft.body.editions),
  )
  const types = await control('(m) => m.realtime.history().map((e) => e.type)')
  assert(types.includes('nft.updated') && types.includes('order.updated'), types.join(','))
})
await check('recibo é snapshot: mudar o preço depois não altera o pedido', async () => {
  await control("(m) => m.nft.update('emerald-ape-042', { price: '9.99' })")
  const o = await api('GET', `/orders/${order.id}`, { token: ana })
  assert(
    o.body.lines[0].unitPrice === '1.19' && o.body.total === '2.158',
    JSON.stringify(o.body.lines[0]),
  )
})
await check('cotação desatualizada → 409 QUOTE_STALE com o que mudou', async () => {
  await api('POST', '/cart/items', {
    token: bruno,
    body: { nftId: 'golden-beat-207', editionId: '1-10', quantity: 1 },
  })
  const q = await api('POST', '/quotes', { token: bruno, body: { network: 'polygon' } })
  await api('POST', '/wallets', {
    token: bruno,
    body: {
      kind: 'principal',
      displayName: 'Bruno',
      nickname: 'Principal',
      profileName: 'bruno',
      network: 'polygon',
      address: '0x1111111111111111111111111111111111111111',
      secondaryAddress: '',
      provider: 'metamask',
      referralCode: 'BRUNO1',
      email: 'bruno@kurio.dev',
      ensName: '',
    },
  })
  const wallets = await api('GET', '/wallets', { token: bruno })
  await control("(m) => m.nft.update('golden-beat-207', { price: '1.5' })")
  const r = await api('POST', '/orders', {
    token: bruno,
    headers: { 'idempotency-key': 'idem-verify-0002' },
    body: {
      quoteId: q.body.id,
      walletId: wallets.body.items[0].id,
      provider: 'metamask',
      buyer: { ...buyer, username: 'brunosato' },
    },
  })
  assert(
    r.status === 409 &&
      r.body.error.code === 'QUOTE_STALE' &&
      r.body.error.details.changes[0].kind === 'preco',
    JSON.stringify(r.body),
  )
})
await check('aviso de preço alterado no carrinho e reconhecimento', async () => {
  const c = await api('GET', '/cart', { token: bruno })
  assert(
    c.body.items[0].notices.includes('preco-alterado') &&
      c.body.items[0].previousUnitPrice === '0.99',
    JSON.stringify(c.body.items[0]),
  )
  const ack = await api('POST', '/cart/notices/ack', { token: bruno })
  assert(ack.body.items[0].notices.length === 0, 'ack')
})
await check('carteira: validação 422 por campo', async () => {
  const r = await api('POST', '/wallets', {
    token: bruno,
    body: {
      kind: 'secundaria',
      displayName: '',
      nickname: 'x',
      profileName: 'x',
      network: 'ethereum',
      address: '0x123',
      secondaryAddress: '',
      provider: 'metamask',
      referralCode: 'ab',
      email: 'x',
      ensName: '',
    },
  })
  const f = r.body.error.fieldErrors
  assert(
    r.status === 422 && f.displayName && f.address && f.referralCode && f.email,
    JSON.stringify(f),
  )
})
await check(
  'perfil: conflito de usuário 409; troca de senha com senha atual errada 422',
  async () => {
    const p = await api('PATCH', '/profile', {
      token: bruno,
      body: {
        displayName: 'Bruno',
        username: 'analima',
        email: 'bruno@kurio.dev',
        ensName: '',
        walletNickname: 'B',
      },
    })
    assert(p.status === 409 && p.body.error.fieldErrors.username, JSON.stringify(p.body))
    const pw = await api('POST', '/profile/password', {
      token: bruno,
      body: { currentPassword: 'errada000', newPassword: 'Nova12345' },
    })
    assert(pw.status === 422 && pw.body.error.fieldErrors.currentPassword, JSON.stringify(pw.body))
  },
)
await check('newsletter: inscrição idempotente', async () => {
  const a = await api('POST', '/newsletter', { body: { email: 'x@kurio.dev' } })
  const b = await api('POST', '/newsletter', { body: { email: 'x@kurio.dev' } })
  assert(
    a.status === 201 && b.status === 200 && b.body.alreadySubscribed,
    `${a.status} ${b.status}`,
  )
})
await check('persistência: estado sobrevive a refresh', async () => {
  await page.reload()
  await page.waitForFunction(() => window.__kurioMock)
  const c = await api('GET', '/cart', { token: bruno })
  assert(c.status === 200 && c.body.itemCount === 1, String(c.body?.itemCount))
})
await check('sessão expirada → 401 SESSION_EXPIRED', async () => {
  await control('(m) => m.session.expireAll()')
  const r = await api('GET', '/favorites', { token: ana })
  assert(r.status === 401 && r.body.error.code === 'SESSION_EXPIRED', JSON.stringify(r.body))
})
await check('reset restaura o seed', async () => {
  await loadScenario('padrao')
  const nft = await api('GET', '/nfts/golden-beat-207')
  assert(nft.body.price === '0.99' && nft.body.version === 1, nft.body.price)
})

// Cenários de rede
await check('cenário offline: erro de rede', async () => {
  await loadScenario('offline')
  const r = await api('GET', '/nfts')
  assert(r.status === 0, JSON.stringify(r))
})
await check('cenário erro-servidor: 500 no catálogo, detalhe funciona', async () => {
  await loadScenario('erro-servidor')
  const r = await api('GET', '/nfts')
  const d = await api('GET', '/nfts/emerald-ape-042')
  assert(
    r.status === 500 && r.body.error.code === 'TRANSIENT' && d.status === 200,
    `${r.status} ${d.status}`,
  )
})
await check('cenário instável: 503 duas vezes, depois 200', async () => {
  await loadScenario('instavel')
  const s = [
    (await api('GET', '/nfts')).status,
    (await api('GET', '/nfts')).status,
    (await api('GET', '/nfts')).status,
  ]
  assert(s.join() === '503,503,200', s.join())
})
await check('cenário catálogo vazio', async () => {
  await loadScenario('catalogo-vazio')
  const r = await api('GET', '/nfts')
  assert(r.body.total === 0 && r.body.items.length === 0, String(r.body.total))
})
await check('cenário fora de ordem: 1ª consulta chega depois da 2ª', async () => {
  await loadScenario('fora-de-ordem')
  const order = await page.evaluate(async () => {
    const arrived = []
    await Promise.all(
      ['?q=a', '?q=b'].map((q) =>
        fetch('/api/nfts' + q, { headers: { 'x-guest-id': 'guest-verify-0001' } }).then(() =>
          arrived.push(q),
        ),
      ),
    )
    return arrived
  })
  assert(order.join() === '?q=b,?q=a', order.join())
})
await check('cenário acesso negado: 403 em rota privada', async () => {
  await loadScenario('acesso-negado')
  const a = await api('POST', '/auth/login', {
    body: { email: 'ana@kurio.dev', password: 'Kurio@2026' },
  })
  const r = await api('GET', '/favorites', { token: a.body.token })
  assert(r.status === 403 && r.body.error.code === 'FORBIDDEN', JSON.stringify(r.body))
})
await check(
  'cenário pagamento recusado: pedido termina recusado e carrinho preservado',
  async () => {
    await loadScenario('pagamento-recusado')
    const a = (
      await api('POST', '/auth/login', { body: { email: 'ana@kurio.dev', password: 'Kurio@2026' } })
    ).body.token
    await api('POST', '/cart/items', {
      token: a,
      body: { nftId: 'sage-nomad-009', editionId: '1-10', quantity: 1 },
    })
    const q = (await api('POST', '/quotes', { token: a, body: { network: 'ethereum' } })).body
    const o = (
      await api('POST', '/orders', {
        token: a,
        headers: { 'idempotency-key': 'idem-verify-0003' },
        body: { quoteId: q.id, walletId: 'wal_ana_principal', provider: 'coinbase', buyer },
      })
    ).body
    await page.waitForTimeout(3000)
    const after = await api('GET', `/orders/${o.id}`, { token: a })
    const cart = await api('GET', '/cart', { token: a })
    assert(
      after.body.status === 'recusado' && after.body.failureReason && cart.body.itemCount === 1,
      JSON.stringify([after.body.status, cart.body.itemCount]),
    )
  },
)
await check('cenário carteira recusada: 409 WALLET_REJECTED', async () => {
  await loadScenario('carteira-recusada')
  const a = (
    await api('POST', '/auth/login', { body: { email: 'ana@kurio.dev', password: 'Kurio@2026' } })
  ).body.token
  const r = await api('POST', '/wallets/wal_ana_principal/connect', { token: a })
  assert(r.status === 409 && r.body.error.code === 'WALLET_REJECTED', JSON.stringify(r.body))
})
await check('pedido pendente sobrevive a refresh e é liquidado depois', async () => {
  await loadScenario('pagamento-lento')
  const a = (
    await api('POST', '/auth/login', { body: { email: 'ana@kurio.dev', password: 'Kurio@2026' } })
  ).body.token
  await api('POST', '/cart/items', {
    token: a,
    body: { nftId: 'sage-nomad-009', editionId: '1-10', quantity: 1 },
  })
  const q = (await api('POST', '/quotes', { token: a, body: { network: 'ethereum' } })).body
  const o = (
    await api('POST', '/orders', {
      token: a,
      headers: { 'idempotency-key': 'idem-verify-0004' },
      body: { quoteId: q.id, walletId: 'wal_ana_principal', provider: 'metamask', buyer },
    })
  ).body
  await page.reload()
  await page.waitForFunction(() => window.__kurioMock)
  const pending = await api('GET', '/orders?status=pendente', { token: a })
  assert(
    pending.body.items.some((x) => x.id === o.id),
    'pendente após refresh',
  )
  await page.waitForTimeout(12500)
  const done = await api('GET', `/orders/${o.id}`, { token: a })
  assert(done.body.status === 'confirmado', done.body.status)
})

await check(
  'cenário preço alterado: preço sobe 15% após abrir o carrinho e publica nft.updated',
  async () => {
    await loadScenario('preco-alterado')
    const g = 'guest-verify-price'
    await api('POST', '/cart/items', {
      guest: g,
      body: { nftId: 'golden-beat-207', editionId: '1-10', quantity: 1 },
    })
    await api('GET', '/cart', { guest: g })
    await page.waitForTimeout(4300)
    const c = await api('GET', '/cart', { guest: g })
    const item = c.body.items[0]
    const events = await control(
      '(m) => m.realtime.history().filter((e) => e.type === "nft.updated").length',
    )
    assert(
      item.unitPrice === '1.14' && item.notices.includes('preco-alterado') && events === 1,
      JSON.stringify([item.unitPrice, item.notices, events]),
    )
  },
)
await check('cenário edição esgotada: item fica indisponível e sai dos totais', async () => {
  await loadScenario('edicao-esgotada')
  const g = 'guest-verify-soldout'
  await api('POST', '/cart/items', {
    guest: g,
    body: { nftId: 'golden-beat-207', editionId: '1-10', quantity: 2 },
  })
  await api('GET', '/cart', { guest: g })
  await page.waitForTimeout(4300)
  const c = await api('GET', '/cart', { guest: g })
  assert(
    c.body.items[0].notices.includes('indisponivel') && c.body.summary.subtotal === '0',
    JSON.stringify(c.body.summary),
  )
})
await check(
  'cenário timeout ao criar pedido: 1ª resposta atrasa 12s; reenvio recupera o mesmo pedido',
  async () => {
    await loadScenario('timeout-pedido')
    const a = (
      await api('POST', '/auth/login', { body: { email: 'ana@kurio.dev', password: 'Kurio@2026' } })
    ).body.token
    await api('POST', '/cart/items', {
      token: a,
      body: { nftId: 'sage-nomad-009', editionId: '1-10', quantity: 1 },
    })
    const q = (await api('POST', '/quotes', { token: a, body: { network: 'ethereum' } })).body
    const body = { quoteId: q.id, walletId: 'wal_ana_principal', provider: 'metamask', buyer }
    const headers = { 'idempotency-key': 'idem-verify-timeout' }
    await api('POST', '/wallets/wal_ana_principal/connect', { token: a })
    // Simula o cliente desistindo da 1ª tentativa (o pedido já foi criado no servidor) e reenviando.
    const first = page.evaluate(
      ({ body, token, headers }) => {
        const controller = new AbortController()
        setTimeout(() => controller.abort(), 1000)
        return fetch('/api/orders', {
          method: 'POST',
          signal: controller.signal,
          headers: {
            'content-type': 'application/json',
            authorization: 'Bearer ' + token,
            ...headers,
          },
          body: JSON.stringify(body),
        }).then(
          () => 'respondeu',
          () => 'timeout',
        )
      },
      { body, token: a, headers },
    )
    assert((await first) === 'timeout', 'a 1ª tentativa deveria estourar o tempo')
    const t0 = Date.now()
    const retry = await api('POST', '/orders', { token: a, body, headers })
    const pending = await api('GET', '/orders?status=pendente', { token: a })
    assert(
      retry.status === 200 &&
        Date.now() - t0 < 3000 &&
        pending.body.items.length === 1 &&
        pending.body.items[0].id === retry.body.id,
      JSON.stringify([retry.status, pending.body.items.length]),
    )
  },
)

const loginAna = async () =>
  (await api('POST', '/auth/login', { body: { email: 'ana@kurio.dev', password: 'Kurio@2026' } }))
    .body.token
const quoteSage = async (token) => {
  await api('POST', '/cart/items', {
    token,
    body: { nftId: 'sage-nomad-009', editionId: '1-10', quantity: 1 },
  })
  return (await api('POST', '/quotes', { token, body: { network: 'ethereum' } })).body
}
const orderBody = (quote) => ({
  quoteId: quote.id,
  walletId: 'wal_ana_principal',
  provider: 'metamask',
  buyer,
})

await check(
  'cenário cotação expirada: a cotação vale 4s e o pedido vencido é recusado',
  async () => {
    await loadScenario('cotacao-expirada')
    const a = await loginAna()
    const q = await quoteSage(a)
    const ttl = Date.parse(q.expiresAt) - Date.parse(q.createdAt)
    assert(ttl === 4000, 'ttl ' + ttl)
    await page.waitForTimeout(4300)
    const r = await api('POST', '/orders', {
      token: a,
      headers: { 'idempotency-key': 'idem-verify-exp-1' },
      body: orderBody(q),
    })
    assert(r.status === 409 && r.body.error.code === 'QUOTE_EXPIRED', JSON.stringify(r.body))
    const orders = await api('GET', '/orders', { token: a })
    assert(orders.body.items.length === 0, 'nenhum pedido criado')
  },
)
await check(
  'cenário requisição duplicada: duas requisições simultâneas, um único pedido',
  async () => {
    await loadScenario('requisicao-duplicada')
    const a = await loginAna()
    const q = await quoteSage(a)
    const send = () =>
      api('POST', '/orders', {
        token: a,
        headers: { 'idempotency-key': 'idem-verify-dup-1' },
        body: orderBody(q),
      })
    const [one, two] = await Promise.all([send(), send()])
    assert(
      [one.status, two.status].sort().join() === '200,201' && one.body.id === two.body.id,
      JSON.stringify([one.status, two.status, one.body?.id, two.body?.id]),
    )
    const orders = await api('GET', '/orders', { token: a })
    assert(orders.body.items.length === 1, 'pedidos ' + orders.body.items.length)
  },
)
for (const [scenario, expected] of [
  ['pendente-confirma', 'confirmado'],
  ['pendente-recusa', 'recusado'],
]) {
  await check(
    `cenário ${scenario}: pendente por 3s e termina ${expected} com order.updated`,
    async () => {
      await loadScenario(scenario)
      const a = await loginAna()
      const q = await quoteSage(a)
      const o = (
        await api('POST', '/orders', {
          token: a,
          headers: { 'idempotency-key': `idem-verify-${scenario}` },
          body: orderBody(q),
        })
      ).body
      assert(o.status === 'pendente', 'nasce pendente: ' + o.status)
      await page.waitForTimeout(3400)
      const done = await api('GET', `/orders/${o.id}`, { token: a })
      assert(
        done.body.status === expected && done.body.version === 2,
        JSON.stringify(done.body.status),
      )
      const events = await control(
        '(m) => m.realtime.history().filter((e) => e.type === "order.updated")',
      )
      assert(
        events.length === 1 && events[0].payload.status === expected && events[0].version === 2,
        JSON.stringify(events),
      )
    },
  )
}
await check('controle de testes: settleNow termina o pedido pendente e é terminal', async () => {
  await loadScenario('pagamento-lento')
  const a = await loginAna()
  const q = await quoteSage(a)
  const o = (
    await api('POST', '/orders', {
      token: a,
      headers: { 'idempotency-key': 'idem-verify-settle' },
      body: orderBody(q),
    })
  ).body
  await control('(m, id) => m.orders.settleNow(id)', o.id)
  await control('(m, id) => m.orders.settleNow(id)', o.id)
  const done = await api('GET', `/orders/${o.id}`, { token: a })
  assert(
    done.body.status === 'confirmado' && done.body.version === 2 && done.body.transaction,
    JSON.stringify(done.body),
  )
  const cart = await api('GET', '/cart', { token: a })
  assert(cart.body.itemCount === 0, 'carrinho limpo só após a confirmação')
})
await check(
  'recibo é snapshot: preço novo no catálogo não altera o pedido confirmado',
  async () => {
    const a = await loginAna()
    const [order] = (await api('GET', '/orders', { token: a })).body.items
    await control('(m) => m.nft.update("sage-nomad-009", { price: "9.99" })')
    const after = await api('GET', `/orders/${order.id}`, { token: a })
    assert(
      after.body.total === order.total &&
        after.body.lines[0].unitPrice === order.lines[0].unitPrice,
      'recibo mudou',
    )
  },
)

console.log(results.join('\n'))
console.log(
  `\n${results.filter((r) => r.startsWith('OK')).length}/${results.length} verificações OK`,
)
await browser.close()
process.exit(results.some((r) => r.startsWith('FAIL')) ? 1 : 0)
