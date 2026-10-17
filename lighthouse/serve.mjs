/**
 * Servidor estático de `dist/` para a auditoria, com o comportamento da hospedagem de produção
 * (Vercel, ver vercel.json): HTTP/2 com TLS, compressão Brotli/gzip, cache imutável em /static/ e
 * fallback de SPA. `vite preview` fala HTTP/1.1 sem compressão, o que inflaria os pedidos e os bytes
 * em relação ao deploy real. O certificado é autoassinado, gerado na hora (openssl), só para a auditoria.
 */
import { createReadStream, existsSync, statSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync } from 'node:fs'
import { createSecureServer } from 'node:http2'
import { tmpdir } from 'node:os'
import { extname, join, normalize } from 'node:path'
import { createBrotliCompress, createGzip, constants } from 'node:zlib'
import { fileURLToPath } from 'node:url'

const dist = join(fileURLToPath(new URL('..', import.meta.url)), 'dist')
const port = Number(process.argv[2] ?? 4180)
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.woff2': 'font/woff2',
  '.avif': 'image/avif',
  '.webp': 'image/webp',
  '.png': 'image/png',
}
const COMPRESSIBLE = new Set(['.html', '.js', '.css', '.svg', '.json'])

const certDir = mkdtempSync(join(tmpdir(), 'kurio-lh-'))
execFileSync(
  'openssl',
  [
    'req',
    '-x509',
    '-newkey',
    'rsa:2048',
    '-nodes',
    '-days',
    '1',
    '-subj',
    '/CN=localhost',
    '-addext',
    'subjectAltName=DNS:localhost',
    '-keyout',
    join(certDir, 'key.pem'),
    '-out',
    join(certDir, 'cert.pem'),
  ],
  { stdio: 'ignore' },
)

createSecureServer(
  {
    key: readFileSync(join(certDir, 'key.pem')),
    cert: readFileSync(join(certDir, 'cert.pem')),
    allowHTTP1: true,
  },
  (request, response) => {
    const pathname = decodeURIComponent(new URL(request.url ?? '/', 'http://x').pathname)
    let file = normalize(join(dist, pathname))
    const isAsset = pathname.startsWith('/static/') || pathname.startsWith('/assets/')
    if (!file.startsWith(dist) || !existsSync(file) || !statSync(file).isFile()) {
      if (isAsset) {
        response.writeHead(404).end()
        return
      }
      file = join(dist, 'index.html') // rewrite de SPA
    }
    const extension = extname(file)
    const headers = { 'Content-Type': TYPES[extension] ?? 'application/octet-stream' }
    if (pathname.startsWith('/static/'))
      headers['Cache-Control'] = 'public, max-age=31536000, immutable'
    else if (pathname === '/mockServiceWorker.js')
      headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    else if (pathname.startsWith('/assets/')) headers['Cache-Control'] = 'public, max-age=86400'
    else headers['Cache-Control'] = 'public, max-age=0, must-revalidate'

    const accepted = String(request.headers['accept-encoding'] ?? '')
    const stream = createReadStream(file)
    if (COMPRESSIBLE.has(extension) && /\bbr\b/.test(accepted)) {
      response.writeHead(200, { ...headers, 'Content-Encoding': 'br', Vary: 'Accept-Encoding' })
      stream
        .pipe(createBrotliCompress({ params: { [constants.BROTLI_PARAM_QUALITY]: 5 } }))
        .pipe(response)
    } else if (COMPRESSIBLE.has(extension) && /\bgzip\b/.test(accepted)) {
      response.writeHead(200, { ...headers, 'Content-Encoding': 'gzip', Vary: 'Accept-Encoding' })
      stream.pipe(createGzip()).pipe(response)
    } else {
      response.writeHead(200, headers)
      stream.pipe(response)
    }
  },
).listen(port, () => console.log(`dist/ em https://localhost:${port}`))
