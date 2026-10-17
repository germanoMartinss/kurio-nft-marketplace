# Resultados do Lighthouse

Gerado por `pnpm lighthouse` (lighthouse/run.mjs). Mediana de 3 execuções por página e perfil.

## Ambiente

- Lighthouse 13.5.0; Chrome 155.0.0.0; Node v22.17.0
- Linux 5.15.0-198-generic, 16× AMD Ryzen 7 5700X 8-Core Processor, 31 GB
- Build de produção (`vite build`) servido por `lighthouse/serve.mjs` (HTTP/2 com certificado autoassinado, Brotli/gzip, cache imutável em `/static/` e fallback de SPA, como a Vercel); mocks (MSW) ativos no cenário `padrao`.
- Perfil mobile: emulação padrão do Lighthouse (Moto G Power, 4G lento simulado, CPU 4×); perfil desktop: preset `desktop`.

## Notas (mediana)

| Página  | Perfil  | Performance | Accessibility | Best Practices | SEO | LCP (s) |   CLS | TBT (ms) | Metas     |
| ------- | ------- | ----------: | ------------: | -------------: | --: | ------: | ----: | -------: | --------- |
| inicio  | mobile  |          96 |           100 |            100 | 100 |    2.42 | 0.000 |        0 | atingidas |
| inicio  | desktop |         100 |           100 |            100 | 100 |    0.50 | 0.000 |        0 | atingidas |
| detalhe | mobile  |          97 |           100 |            100 | 100 |    2.25 | 0.000 |       14 | atingidas |
| detalhe | desktop |         100 |           100 |            100 | 100 |    0.50 | 0.000 |        0 | atingidas |

Metas: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 90.

## Execuções individuais

**inicio / mobile**: #1 P97 A100 BP100 S100 · #2 P96 A100 BP100 S100 · #3 P96 A100 BP100 S100

**inicio / desktop**: #1 P100 A100 BP100 S100 · #2 P100 A100 BP100 S100 · #3 P100 A100 BP100 S100

**detalhe / mobile**: #1 P97 A100 BP100 S100 · #2 P97 A100 BP100 S100 · #3 P97 A100 BP100 S100

**detalhe / desktop**: #1 P100 A100 BP100 S100 · #2 P100 A100 BP100 S100 · #3 P100 A100 BP100 S100

## Observações

- **Servidor da auditoria.** `vite preview` fala HTTP/1.1 sem compressão; nele o mobile ficava em 85–89 de Performance (LCP ~3,5 s), porque o limite de conexões por origem e os bytes sem compressão dominam sob 4G simulado. A hospedagem real (Vercel) usa HTTP/2 e Brotli; `lighthouse/serve.mjs` reproduz isso, e é esse o cenário medido acima. Nada foi removido da aplicação para a auditoria.
- **Otimizações reais (aplicadas ao app, não só à auditoria).** Chunk dos mocks de 473 KB para ~181 KB (o armazenamento de cookies do MSW, `tough-cookie`/`tldts`, é trocado por um stub porque a aplicação usa token Bearer); núcleo comum agrupado em poucos chunks (`vendor-react`, `vendor-app`, `app-core`) em vez de dezenas de arquivos; `modulepreload` dos chunks dos mocks e da tela inicial (caminho crítico); código da tela de entrada baixado em paralelo com o início do MSW; socket.io-client só depois do primeiro render (ocioso); casca de carregamento no `index.html`; skeletons com as dimensões do conteúdo (CLS 0).
- **O que resta no mobile.** LCP de ~2,3–2,4 s: o caminho crítico é HTML → JavaScript (~225 KB gzip) → MSW (service worker) → API simulada → imagem do NFT. O MSW é requisito do enunciado (mocks no build de demonstração) e precisa estar pronto antes da primeira requisição; por isso o LCP não chega a ~1 s como no desktop.

Relatórios completos em `lighthouse/reports/` (HTML e JSON de cada execução).
