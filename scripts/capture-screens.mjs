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
    desktop: 'desktop-carrinho-de-nfts',
    mobile: 'mobile-carrinho-de-nfts',
  },
  pagamento: { path: '/pagamento', desktop: 'desktop-pagamento', mobile: 'mobile-pagamento' },
  confirmacao: { path: '/pedido/exemplo', desktop: 'desktop-confirmacao-de-pedido' },
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
    await page.goto(values.base + screen.path, { waitUntil: 'networkidle' })
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
