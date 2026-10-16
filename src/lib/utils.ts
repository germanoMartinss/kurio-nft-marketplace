import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * O tailwind-merge precisa conhecer a escala tipográfica do Kurio (`text-15`, `text-16`...,
 * definida em src/styles/index.css). Sem isso, ele trata `text-15` como cor e, em
 * `cn('text-15 text-foreground')`, descarta o tamanho da fonte.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ['9', '10', '12', '13', '14', '15', '16', '17', '18', '20', '22', '24', '28', '43'],
    },
  },
})

/** Junta classes condicionais e resolve conflitos de utilitários do Tailwind. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
