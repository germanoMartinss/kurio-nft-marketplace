# Resultados do Lighthouse

Gerado por `pnpm lighthouse` e `pnpm lighthouse:vercel` (lighthouse/run.mjs). Mediana de 3 execuções por página e perfil. Metas: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 90.

Os JSON de todas as execuções ficam em `lighthouse/reports/<alvo>/`; o HTML completo é mantido só para a execução mediana de cada página e perfil.

## Condições de execução

- Perfil mobile: emulação padrão do Lighthouse (Moto G Power, 4G lento simulado, CPU 4×); perfil desktop: preset `desktop`.
- Cenário `padrao` dos mocks (MSW ativo), imagens, fontes e funcionalidades da entrega; nada foi simplificado para a auditoria.
- Chrome headless novo (`--headless=new`), sem extensões, um perfil limpo por execução.

## Servidor local (referência de entrega)

- Lighthouse 13.5.0; Chrome 155.0.0.0; Node v22.17.0
- Linux 5.15.0-198-generic, 16× AMD Ryzen 7 5700X 8-Core Processor, 31 GB
- Medido em 2026-10-17T11:40:26.882Z contra `https://localhost:4180`.
- Build de produção (`vite build`) servido por `lighthouse/serve.mjs` (HTTP/2 com certificado autoassinado, Brotli/gzip, cache imutável em `/static/` e fallback de SPA, como a Vercel).

| Página  | Perfil  | Performance | Accessibility | Best Practices | SEO | LCP (s) |   CLS | TBT (ms) | Metas     | HTML da mediana                                |
| ------- | ------- | ----------: | ------------: | -------------: | --: | ------: | ----: | -------: | --------- | ---------------------------------------------- |
| inicio  | mobile  |          96 |           100 |            100 | 100 |    2.42 | 0.000 |        0 | atingidas | `reports/local/inicio-mobile-mediana-1.html`   |
| inicio  | desktop |         100 |           100 |            100 | 100 |    0.50 | 0.000 |        0 | atingidas | `reports/local/inicio-desktop-mediana-3.html`  |
| detalhe | mobile  |          97 |           100 |            100 | 100 |    2.25 | 0.000 |       21 | atingidas | `reports/local/detalhe-mobile-mediana-1.html`  |
| detalhe | desktop |         100 |           100 |            100 | 100 |    0.50 | 0.000 |        0 | atingidas | `reports/local/detalhe-desktop-mediana-2.html` |

### Execuções individuais

**inicio / mobile**: #1 P96 A100 BP100 S100 (LCP 2.42 s) · #2 P96 A100 BP100 S100 (LCP 2.42 s) · #3 P96 A100 BP100 S100 (LCP 2.43 s)

**inicio / desktop**: #1 P100 A100 BP100 S100 (LCP 0.51 s) · #2 P100 A100 BP100 S100 (LCP 0.50 s) · #3 P100 A100 BP100 S100 (LCP 0.50 s)

**detalhe / mobile**: #1 P97 A100 BP100 S100 (LCP 2.25 s) · #2 P97 A100 BP100 S100 (LCP 2.25 s) · #3 P97 A100 BP100 S100 (LCP 2.26 s)

**detalhe / desktop**: #1 P100 A100 BP100 S100 (LCP 0.50 s) · #2 P100 A100 BP100 S100 (LCP 0.50 s) · #3 P100 A100 BP100 S100 (LCP 0.50 s)

## Produção (Vercel), medição de referência

- Lighthouse 13.5.0; Chrome 155.0.0.0; Node v22.17.0
- Linux 5.15.0-198-generic, 16× AMD Ryzen 7 5700X 8-Core Processor, 31 GB
- Medido em 2026-10-17T11:42:08.222Z contra `https://kurio-nft-marketplace-iota.vercel.app`.
- Medição pela internet, a partir da máquina de desenvolvimento: inclui a latência real até a CDN, então varia com a rede e a hora. Serve de referência, não de substituta da medição reprodutível acima.

| Página  | Perfil  | Performance | Accessibility | Best Practices | SEO | LCP (s) |   CLS | TBT (ms) | Metas     | HTML da mediana                                 |
| ------- | ------- | ----------: | ------------: | -------------: | --: | ------: | ----: | -------: | --------- | ----------------------------------------------- |
| inicio  | mobile  |          94 |           100 |            100 | 100 |    2.72 | 0.000 |      119 | atingidas | `reports/vercel/inicio-mobile-mediana-1.html`   |
| inicio  | desktop |         100 |           100 |            100 | 100 |    0.58 | 0.000 |        0 | atingidas | `reports/vercel/inicio-desktop-mediana-2.html`  |
| detalhe | mobile  |          95 |           100 |            100 | 100 |    2.64 | 0.000 |       52 | atingidas | `reports/vercel/detalhe-mobile-mediana-1.html`  |
| detalhe | desktop |         100 |           100 |            100 | 100 |    0.59 | 0.000 |        0 | atingidas | `reports/vercel/detalhe-desktop-mediana-2.html` |

### Execuções individuais

**inicio / mobile**: #1 P94 A100 BP100 S100 (LCP 2.73 s) · #2 P95 A100 BP100 S100 (LCP 2.72 s) · #3 P94 A100 BP100 S100 (LCP 2.71 s)

**inicio / desktop**: #1 P100 A100 BP100 S100 (LCP 0.58 s) · #2 P100 A100 BP100 S100 (LCP 0.58 s) · #3 P100 A100 BP100 S100 (LCP 0.60 s)

**detalhe / mobile**: #1 P95 A100 BP100 S100 (LCP 2.51 s) · #2 P95 A100 BP100 S100 (LCP 2.64 s) · #3 P94 A100 BP100 S100 (LCP 2.66 s)

**detalhe / desktop**: #1 P100 A100 BP100 S100 (LCP 0.56 s) · #2 P100 A100 BP100 S100 (LCP 0.59 s) · #3 P100 A100 BP100 S100 (LCP 0.60 s)

## Observações

- **Servidor da auditoria.** `vite preview` fala HTTP/1.1 sem compressão; nele o mobile ficava em 85–89 de Performance (LCP ~3,5 s), porque o limite de conexões por origem e os bytes sem compressão dominam sob 4G simulado. A hospedagem real (Vercel) usa HTTP/2 e Brotli; `lighthouse/serve.mjs` reproduz isso, e é esse o cenário reprodutível. Nada foi removido da aplicação para a auditoria.
- **Otimizações reais (aplicadas ao app, não só à auditoria).** Chunk dos mocks de 473 KB para ~181 KB (o armazenamento de cookies do MSW, `tough-cookie`/`tldts`, é trocado por um stub porque a aplicação usa token Bearer); núcleo comum agrupado em poucos chunks (`vendor-react`, `vendor-app`, `app-core`) em vez de dezenas de arquivos; `modulepreload` dos chunks dos mocks e da tela inicial (caminho crítico); código da tela de entrada baixado em paralelo com o início do MSW; socket.io-client só depois do primeiro render (ocioso); casca de carregamento no `index.html`; skeletons com as dimensões do conteúdo (CLS 0).
- **Produção versus local.** Na Vercel o mobile mede a latência real até a CDN e o TTFB do deploy: o LCP fica algumas centenas de ms acima do servidor local e o TBT oscila entre execuções (outros processos da máquina e variação de rede); as metas continuam atingidas. O desktop é praticamente igual nos dois alvos.
- **O que resta no mobile.** LCP de ~2,3–2,4 s: o caminho crítico é HTML → JavaScript (~225 KB gzip) → MSW (service worker) → API simulada → imagem do NFT. O MSW é requisito do enunciado (mocks no build de demonstração) e precisa estar pronto antes da primeira requisição; por isso o LCP não chega a ~1 s como no desktop.
