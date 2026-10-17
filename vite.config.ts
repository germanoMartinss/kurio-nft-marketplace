import { fileURLToPath, URL } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

/**
 * Preload dos chunks do caminho crítico que o Vite só descobre em `import()` dinâmico: o backend
 * simulado (MSW, necessário antes da primeira requisição) e a tela inicial. Sem a dica, o
 * navegador só os pediria depois de executar o bundle de entrada, uma ida e volta a mais.
 */
function preloadCriticalChunks(): Plugin {
  const critical = ['/src/mocks/browser.ts', '/src/features/catalog/home-page.tsx']
  return {
    name: 'kurio:preload-critical-chunks',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(_html, ctx) {
        const chunks = Object.values(ctx.bundle ?? {}).filter(
          (item) =>
            item.type === 'chunk' &&
            item.facadeModuleId &&
            critical.some((path) => item.facadeModuleId!.endsWith(path)),
        )
        return chunks.map((chunk) => ({
          tag: 'link',
          attrs: { rel: 'modulepreload', crossorigin: '', href: `/${chunk.fileName}` },
          injectTo: 'head',
        }))
      },
    },
  }
}

/**
 * Troca o armazenamento de cookies do MSW por um stub vazio (a aplicação não usa cookies): tira
 * `tough-cookie` e `tldts` do chunk dos mocks (~250 KB de JavaScript).
 */
function stubMswCookieStore(): Plugin {
  const stub = fileURLToPath(new URL('./src/mocks/shims/msw-cookie-store.ts', import.meta.url))
  return {
    name: 'kurio:stub-msw-cookie-store',
    apply: 'build',
    enforce: 'pre',
    resolveId(source, importer) {
      if (source.endsWith('cookieStore.mjs') && importer?.includes('/node_modules/msw/'))
        return stub
      return null
    },
  }
}

export default defineConfig({
  plugins: [
    // O plugin do router precisa vir antes do plugin do React.
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    react(),
    tailwindcss(),
    preloadCriticalChunks(),
    stubMswCookieStore(),
  ],
  build: {
    // Bundles com hash ficam em /static/ (cache imutável na Vercel); /assets/ é reservado às
    // imagens do Figma em public/assets/, que não têm hash no nome.
    assetsDir: 'static',
    rolldownOptions: {
      output: {
        // O núcleo comum a todas as telas vai em poucos chunks estáveis, em vez de dezenas de
        // arquivos minúsculos que o carregamento inicial teria de pedir um a um (cada pedido
        // custa uma ida e volta em rede móvel). Bibliotecas de uma tela só (select, slider) e o
        // MSW continuam fora, em chunks próprios carregados sob demanda.
        advancedChunks: {
          groups: [
            {
              name: 'vendor-react',
              test: /node_modules\/(\.pnpm\/[^/]+\/node_modules\/)?(react|react-dom|scheduler)\//,
            },
            {
              name: 'vendor-app',
              test: /node_modules\/(\.pnpm\/[^/]+\/node_modules\/)?(@tanstack|axios|zod|big\.js|tailwind-merge|clsx|class-variance-authority|use-sync-external-store|tiny-invariant|tiny-warning|sonner)\//,
            },
            { name: 'app-core', test: /\/src\/(api|contracts|lib)\// },
          ],
        },
      },
    },
  },
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
})
