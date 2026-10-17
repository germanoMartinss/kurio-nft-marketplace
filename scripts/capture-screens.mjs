/**
 * Captura as telas em 390, 768 e 1440px e monta comparações lado a lado com os PNGs do Figma
 * (design/). Também verifica overflow horizontal e erros de console. Saída em screenshots/
 * (não versionada).
 *
 * Uso: pnpm screens [--base http://localhost:4173] [--only inicio,carrinho]
 * Requer a aplicação rodando (pnpm preview ou pnpm dev).
 */
import { mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'

import { chromium } from '@playwright/test'
import sharp from 'sharp'

/** Itens do Figma, adicionados pela API simulada antes da captura. */
const CART_LINES = [
  ['emerald-ape-042', '1-50', 2],
  ['violet-nomad-314', '1-1', 1],
  ['ivory-baron-088', '1-10', 2],
]

/** Tela → rota e PNGs do Figma correspondentes (quando existem). */
const SCREENS = {
  inicio: { path: '/', desktop: 'desktop-inicio', mobile: 'mobile-inicio' },
  detalhe: {
    path: '/nft/emerald-ape-042',
    desktop: 'desktop-detalhes-do-nft',
    mobile: 'mobile-detalhes-do-nft',
  },
  carrinho: {
    path: '/carrinho',
    // Itens do Figma (visitante), adicionados pela API simulada antes da captura.
    cart: CART_LINES,
    desktop: 'desktop-carrinho-de-nfts',
    mobile: 'mobile-carrinho-de-nfts',
  },
  pagamento: {
    path: '/pagamento',
    login: true,
    cart: CART_LINES,
    desktop: 'desktop-pagamento',
    mobile: 'mobile-pagamento',
  },
  confirmacao: {
    path: '/pedido/ord_0001',
    login: true,
    cart: CART_LINES,
    order: true,
    desktop: 'desktop-confirmacao-de-pedido',
  },
  entrar: { path: '/entrar', desktop: 'desktop-login', mobile: 'mobile-login' },
  cadastro: { path: '/cadastro', desktop: 'desktop-cadastro', mobile: 'mobile-cadastro' },
  perfil: { path: '/perfil', desktop: 'desktop-perfil-do-colecionador' },
  carteiras: { path: '/perfil/carteiras', desktop: 'desktop-carteiras' },
  404: { path: '/rota-inexistente' },
}
const VIEWPORTS = [
  { name: '390', width: 390, height: 844, design: 'mobile' },
  { name: '768', width: 768, height: 1024, design: 'mobile' },
  { name: '1440', width: 1440, height: 900, design: 'desktop' },
]

const { values } = parseArgs({
  options: { base: { type: 'string', default: 'http://localhost:4173' }, only: { type: 'string' } },
})
const root = fileURLToPath(new URL('..', import.meta.url))
const outDir = join(root, 'screenshots')
await mkdir(outDir, { recursive: true })

const selected = values.only ? values.only.split(',') : Object.keys(SCREENS)
const browser = await chromium.launch()
let problems = 0

for (const key of selected) {
  const screen = SCREENS[key]
  if (!screen) throw new Error(`Tela desconhecida: ${key}`)
  for (const viewport of VIEWPORTS) {
    const page = await browser.newPage({
      viewport: { width: viewport.width, height: viewport.height },
    })
    const errors = []
    page.on('pageerror', (error) => errors.push(String(error)))
    page.on('console', (message) => message.type() === 'error' && errors.push(message.text()))
    let target = screen.path
    if (screen.cart) {
      await page.goto(values.base + '/', { waitUntil: 'networkidle' })
      const orderId = await page.evaluate(
        async ({ lines, login, order }) => {
          const guest = 'capture-guest-0001'
          localStorage.setItem('kurio:app:guest-id', JSON.stringify(guest))
          const call = async (method, path, body, token) => {
            const res = await fetch('/api' + path, {
              method,
              headers: {
                'Content-Type': 'application/json',
                'X-Guest-Id': guest,
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                ...(order && path === '/orders' ? { 'Idempotency-Key': 'idem-capture-0001' } : {}),
              },
              body: body ? JSON.stringify(body) : undefined,
            })
            return res.json()
          }
          let token
          if (login) {
            const session = await call('POST', '/auth/login', {
              email: 'ana@kurio.dev',
              password: 'Kurio@2026',
            })
            token = session.token
            localStorage.setItem('kurio:app:session', JSON.stringify(session))
          }
          for (const [nftId, editionId, quantity] of lines)
            await call('POST', '/cart/items', { nftId, editionId, quantity }, token)
          if (order) {
            const quote = await call('POST', '/quotes', { network: 'ethereum' }, token)
            const created = await call(
              'POST',
              '/orders',
              {
                quoteId: quote.id,
                walletId: 'wal_ana_principal',
                provider: 'metamask',
                buyer: {
                  displayName: 'Ana Lima',
                  username: 'analima',
                  profileName: 'analima',
                  email: 'ana@kurio.dev',
                  ensName: 'ana',
                  referralCode: 'KURIO2026',
                  note: '',
                },
              },
              token,
            )
            await new Promise((resolve) => setTimeout(resolve, 3200)) // pagamento simulado termina
            return created.id
          }
        },
        { lines: screen.cart, login: screen.login, order: screen.order },
      )
      if (orderId) target = `/pedido/${orderId}`
    }
    await page.goto(values.base + target, { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)
    await page.waitForTimeout(300)
    const file = join(outDir, `${key}-${viewport.name}.png`)
    await page.screenshot({ path: file, fullPage: true })
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    )
    await page.close()

    const design = screen[viewport.design]
    if (design && existsSync(join(root, 'design', `${design}.png`))) {
      await sideBySide(
        file,
        join(root, 'design', `${design}.png`),
        join(outDir, `${key}-${viewport.name}-vs-figma.png`),
      )
    }
    const status = overflow > 0 || errors.length ? 'ATENÇÃO' : 'ok'
    if (status !== 'ok') problems++
    console.log(
      `${status.padEnd(7)} ${key}@${viewport.name} overflow-x=${overflow}px erros=${errors.length}`,
    )
    for (const error of errors) console.log(`        ${error}`)
  }
}
await browser.close()
process.exitCode = problems ? 1 : 0

/** Implementação à esquerda, Figma à direita, ambos na mesma largura. */
async function sideBySide(actualPath, designPath, outPath) {
  const width = 720
  const [actual, design] = await Promise.all(
    [actualPath, designPath].map((path) =>
      sharp(path)
        .resize({ width, withoutEnlargement: false })
        .png()
        .toBuffer({ resolveWithObject: true }),
    ),
  )
  const height = Math.max(actual.info.height, design.info.height)
  await sharp({ create: { width: width * 2 + 16, height, channels: 3, background: '#ffffff' } })
    .composite([
      { input: actual.data, left: 0, top: 0 },
      { input: design.data, left: width + 16, top: 0 },
    ])
    .png()
    .toFile(outPath)
}
