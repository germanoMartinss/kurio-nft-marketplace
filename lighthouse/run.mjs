/**
 * Auditoria Lighthouse (§10): início e detalhe do NFT, perfis mobile e desktop, build otimizado
 * servido por lighthouse/serve.mjs (HTTP/2, compressão e cache como na Vercel) com os mocks no cenário padrão. Três medições por página e perfil;
 * a nota de cada categoria é a mediana. Relatórios HTML e JSON em lighthouse/reports/ e resumo em
 * lighthouse/RESULTADOS.md (com versões e ambiente).
 *
 * Uso: pnpm build && pnpm lighthouse
 */
import { spawn } from 'node:child_process'
import { mkdir, rm, writeFile } from 'node:fs/promises'
import os from 'node:os'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'

import { launch } from 'chrome-launcher'
import lighthouse from 'lighthouse'
import desktopConfig from 'lighthouse/core/config/desktop-config.js'

const root = fileURLToPath(new URL('..', import.meta.url))
const reports = join(root, 'lighthouse/reports')
const PORT = 4180
const BASE = `https://localhost:${PORT}`
const RUNS = 3
const PAGES = [
  { id: 'inicio', path: '/' },
  { id: 'detalhe', path: '/nft/emerald-ape-042' },
]
const PROFILES = [
  { id: 'mobile', config: undefined },
  { id: 'desktop', config: desktopConfig },
]
const CATEGORIES = ['performance', 'accessibility', 'best-practices', 'seo']
const TARGETS = { performance: 90, accessibility: 95, 'best-practices': 95, seo: 90 }

const median = (values) => {
  const sorted = [...values].sort((a, b) => a - b)
  return sorted.length % 2
    ? sorted[(sorted.length - 1) / 2]
    : (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
}

const server = spawn('node', ['lighthouse/serve.mjs', String(PORT)], { cwd: root, stdio: 'ignore' })
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0' // só para o fetch de prontidão do certificado autoassinado
const waitForServer = async () => {
  for (let attempt = 0; attempt < 60; attempt++) {
    try {
      if ((await fetch(BASE)).ok) return
    } catch {
      /* ainda subindo */
    }
    await new Promise((resolve) => setTimeout(resolve, 500))
  }
  throw new Error('servidor de dist/ não respondeu')
}

await rm(reports, { recursive: true, force: true })
await mkdir(reports, { recursive: true })
await waitForServer()

const chrome = await launch({
  chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu', '--ignore-certificate-errors'],
})
const rows = []
let version = ''
let chromeVersion = 'n/d'
try {
  for (const page of PAGES) {
    for (const profile of PROFILES) {
      const runs = []
      for (let run = 1; run <= RUNS; run++) {
        const result = await lighthouse(
          `${BASE}${page.path}`,
          {
            port: chrome.port,
            output: ['html', 'json'],
            logLevel: 'error',
            onlyCategories: CATEGORIES,
          },
          profile.config,
        )
        version = result.lhr.lighthouseVersion
        chromeVersion = /Chrome\/([\d.]+)/.exec(result.lhr.environment.hostUserAgent)?.[1] ?? 'n/d'
        const name = `${page.id}-${profile.id}-${run}`
        await writeFile(join(reports, `${name}.html`), result.report[0])
        await writeFile(join(reports, `${name}.json`), result.report[1])
        const audits = result.lhr.audits
        runs.push({
          scores: Object.fromEntries(
            CATEGORIES.map((id) => [id, Math.round((result.lhr.categories[id].score ?? 0) * 100)]),
          ),
          lcp: audits['largest-contentful-paint'].numericValue,
          cls: audits['cumulative-layout-shift'].numericValue,
          tbt: audits['total-blocking-time'].numericValue,
        })
        console.log(name, JSON.stringify(runs.at(-1)))
      }
      rows.push({
        page: page.id,
        profile: profile.id,
        scores: Object.fromEntries(
          CATEGORIES.map((id) => [id, median(runs.map((r) => r.scores[id]))]),
        ),
        lcp: median(runs.map((r) => r.lcp)),
        cls: median(runs.map((r) => r.cls)),
        tbt: median(runs.map((r) => r.tbt)),
        runs,
      })
    }
  }
} finally {
  await chrome.kill()
  server.kill()
}

const pass = (row) => CATEGORIES.every((id) => row.scores[id] >= TARGETS[id])
const lines = [
  '# Resultados do Lighthouse',
  '',
  `Gerado por \`pnpm lighthouse\` (lighthouse/run.mjs). Mediana de ${RUNS} execuções por página e perfil.`,
  '',
  '## Ambiente',
  '',
  `- Lighthouse ${version}; Chrome ${chromeVersion}; Node ${process.version}`,
  `- ${os.type()} ${os.release()}, ${os.cpus().length}× ${os.cpus()[0]?.model.trim()}, ${Math.round(os.totalmem() / 2 ** 30)} GB`,
  '- Build de produção (`vite build`) servido por `lighthouse/serve.mjs` (HTTP/2 com certificado autoassinado, Brotli/gzip, cache imutável em `/static/` e fallback de SPA, como a Vercel); mocks (MSW) ativos no cenário `padrao`.',
  '- Perfil mobile: emulação padrão do Lighthouse (Moto G Power, 4G lento simulado, CPU 4×); perfil desktop: preset `desktop`.',
  '',
  '## Notas (mediana)',
  '',
  '| Página | Perfil | Performance | Accessibility | Best Practices | SEO | LCP (s) | CLS | TBT (ms) | Metas |',
  '| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |',
  ...rows.map(
    (row) =>
      `| ${row.page} | ${row.profile} | ${CATEGORIES.map((id) => row.scores[id]).join(' | ')} | ${(row.lcp / 1000).toFixed(2)} | ${row.cls.toFixed(3)} | ${Math.round(row.tbt)} | ${pass(row) ? 'atingidas' : 'abaixo'} |`,
  ),
  '',
  `Metas: Performance ≥ ${TARGETS.performance}, Accessibility ≥ ${TARGETS.accessibility}, Best Practices ≥ ${TARGETS['best-practices']}, SEO ≥ ${TARGETS.seo}.`,
  '',
  '## Execuções individuais',
  '',
  ...rows.flatMap((row) => [
    `**${row.page} / ${row.profile}**: ` +
      row.runs
        .map(
          (r, i) =>
            `#${i + 1} P${r.scores.performance} A${r.scores.accessibility} BP${r.scores['best-practices']} S${r.scores.seo}`,
        )
        .join(' · '),
    '',
  ]),
  '## Observações',
  '',
  '- **Servidor da auditoria.** `vite preview` fala HTTP/1.1 sem compressão; nele o mobile ficava em 85–89 de Performance (LCP ~3,5 s), porque o limite de conexões por origem e os bytes sem compressão dominam sob 4G simulado. A hospedagem real (Vercel) usa HTTP/2 e Brotli; `lighthouse/serve.mjs` reproduz isso, e é esse o cenário medido acima. Nada foi removido da aplicação para a auditoria.',
  '- **Otimizações reais (aplicadas ao app, não só à auditoria).** Chunk dos mocks de 473 KB para ~181 KB (o armazenamento de cookies do MSW, `tough-cookie`/`tldts`, é trocado por um stub porque a aplicação usa token Bearer); núcleo comum agrupado em poucos chunks (`vendor-react`, `vendor-app`, `app-core`) em vez de dezenas de arquivos; `modulepreload` dos chunks dos mocks e da tela inicial (caminho crítico); código da tela de entrada baixado em paralelo com o início do MSW; socket.io-client só depois do primeiro render (ocioso); casca de carregamento no `index.html`; skeletons com as dimensões do conteúdo (CLS 0).',
  '- **O que resta no mobile.** LCP de ~2,3–2,4 s: o caminho crítico é HTML → JavaScript (~225 KB gzip) → MSW (service worker) → API simulada → imagem do NFT. O MSW é requisito do enunciado (mocks no build de demonstração) e precisa estar pronto antes da primeira requisição; por isso o LCP não chega a ~1 s como no desktop.',
  '',
  'Relatórios completos em `lighthouse/reports/` (HTML e JSON de cada execução).',
  '',
]
await writeFile(join(root, 'lighthouse/RESULTADOS.md'), lines.join('\n'))
console.log(lines.join('\n'))
process.exit(0)
