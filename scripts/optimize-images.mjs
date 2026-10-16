/**
 * Gera versões otimizadas (AVIF e WebP, em várias larguras) das imagens dos NFTs exportadas do
 * Figma (public/assets/nfts/*.png) em public/assets/nfts/optimized/.
 *
 * As originais têm 500×500, então a maior variante é 500px: ampliar não traria nitidez, só peso.
 * As saídas são versionadas para que o build não dependa de processamento de imagem.
 *
 * Uso: pnpm images:optimize
 */
import { mkdir, readdir } from 'node:fs/promises'
import { basename, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import sharp from 'sharp'

export const IMAGE_WIDTHS = [160, 240, 320, 500]

const root = fileURLToPath(new URL('..', import.meta.url))
const sourceDir = join(root, 'public/assets/nfts')
const outputDir = join(sourceDir, 'optimized')

await mkdir(outputDir, { recursive: true })
const files = (await readdir(sourceDir)).filter((file) => file.endsWith('.png')).sort()

for (const file of files) {
  const name = basename(file, '.png')
  for (const width of IMAGE_WIDTHS) {
    const image = sharp(join(sourceDir, file)).resize({ width, withoutEnlargement: true })
    await image
      .clone()
      .avif({ quality: 55, effort: 6 })
      .toFile(join(outputDir, `${name}-${width}.avif`))
    await image
      .clone()
      .webp({ quality: 78, effort: 6 })
      .toFile(join(outputDir, `${name}-${width}.webp`))
  }
  console.log(`${name}: ${IMAGE_WIDTHS.length * 2} variantes`)
}
