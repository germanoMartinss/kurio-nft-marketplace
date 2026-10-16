/**
 * Recalcula a tabela "Resumo" de docs/REQUIREMENTS.md a partir das linhas de cada seção.
 * Uso: pnpm requirements
 */
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const file = fileURLToPath(new URL('../docs/REQUIREMENTS.md', import.meta.url))
const STATUSES = ['feito', 'parcial', 'pendente']

const source = await readFile(file, 'utf8')
const sections = source.split(/\n## (?=§)/).slice(1)
const totals = { itens: 0, feito: 0, parcial: 0, pendente: 0 }
const rows = sections.map((section) => {
  const title = section.slice(0, section.indexOf('\n')).trim()
  const statuses = [
    ...section.matchAll(/^\|\s*R\d+\.\d+\s*\|[^|]*\|\s*(feito|parcial|pendente)\s*\|/gm),
  ].map((m) => m[1])
  const count = Object.fromEntries(
    STATUSES.map((status) => [status, statuses.filter((s) => s === status).length]),
  )
  totals.itens += statuses.length
  for (const status of STATUSES) totals[status] += count[status]
  return `| ${title} | ${statuses.length} | ${count.feito} | ${count.parcial} | ${count.pendente} |`
})

const table = [
  '| Seção | Itens | feito | parcial | pendente |',
  '| --- | --- | --- | --- | --- |',
  ...rows,
  `| **Total** | **${totals.itens}** | **${totals.feito}** | **${totals.parcial}** | **${totals.pendente}** |`,
].join('\n')

await writeFile(file, source.replace(/\| Seção\s+\| Itens[\s\S]*?\n\n/, `${table}\n\n`))
console.log(table)
