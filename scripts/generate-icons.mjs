/**
 * Gera componentes React a partir dos SVGs exportados do Figma (public/assets/icons/*.svg).
 *
 * - A cor fixa de cada ícone (fill/stroke em hexadecimal) vira `currentColor`, para que o ícone
 *   herde a cor do texto no contexto em que é usado. Brancos de máscara são preservados.
 * - IDs internos (máscaras, clip-paths) recebem um sufixo de `useId()`, evitando IDs duplicados
 *   quando o mesmo ícone aparece várias vezes na página. O valor é saneado porque o formato do
 *   `useId()` inclui caracteres que não são seguros dentro de `url(#...)`.
 * - Atributos SVG são convertidos para a sintaxe JSX.
 *
 * Uso: pnpm icons:generate
 */
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { basename, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import prettier from 'prettier'

const root = fileURLToPath(new URL('..', import.meta.url))
const sourceDir = join(root, 'public/assets/icons')
const outputFile = join(root, 'src/components/figma-icons.generated.tsx')

const toPascalCase = (name) =>
  name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')

const toCamelCase = (attr) => attr.replace(/-([a-z])/g, (_, c) => c.toUpperCase())

function convert(svg, componentName) {
  const open = /<svg([^>]*)>/.exec(svg)
  if (!open) throw new Error(`SVG inválido: ${componentName}`)
  const attr = (name) => new RegExp(`${name}="([^"]+)"`).exec(open[1])?.[1]
  const width = attr('width')
  const height = attr('height')
  const viewBox = attr('viewBox')

  let body = svg.slice(open.index + open[0].length, svg.lastIndexOf('</svg>')).trim()
  const ids = [...body.matchAll(/id="([^"]+)"/g)].map((match) => match[1])

  body = body
    .replace(/(fill|stroke)="#(?!fff\b|ffffff\b)[0-9a-fA-F]{3,6}"/g, '$1="currentColor"')
    .replace(/style="mask-type:luminance"/g, "style={{ maskType: 'luminance' }}")
    .replace(/ ([a-z]+(?:-[a-z]+)+)=/g, (_, name) => ` ${toCamelCase(name)}=`)

  ids.forEach((id, index) => {
    const ref = `\`\${uid}-${index}\``
    body = body.replaceAll(`id="${id}"`, `id={${ref}}`)
    body = body.replaceAll(`"url(#${id})"`, `{\`url(#\${uid}-${index})\`}`)
  })

  const usesId = ids.length > 0
  return `export function ${componentName}(props: IconProps) {
  ${usesId ? "const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')" : ''}
  return (
    <svg width="${width}" height="${height}" viewBox="${viewBox}" fill="none" aria-hidden focusable="false" {...props}>
      ${body}
    </svg>
  )
}`
}

const files = (await readdir(sourceDir)).filter((file) => file.endsWith('.svg')).sort()
const components = await Promise.all(
  files.map(async (file) =>
    convert(
      await readFile(join(sourceDir, file), 'utf8'),
      `${toPascalCase(basename(file, '.svg').replace(/-icon$/, ''))}Icon`,
    ),
  ),
)

const source = `// Arquivo gerado por scripts/generate-icons.mjs a partir de public/assets/icons/. Não edite à mão.
import { useId, type SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

${components.join('\n\n')}
`

const config = await prettier.resolveConfig(outputFile)
await writeFile(outputFile, await prettier.format(source, { ...config, filepath: outputFile }))
console.log(`${files.length} ícones gerados em ${outputFile}`)
