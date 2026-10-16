import { fileURLToPath, URL } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    // O plugin do router precisa vir antes do plugin do React.
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    react(),
    tailwindcss(),
  ],
  build: {
    // Bundles com hash ficam em /static/ (cache imutável na Vercel); /assets/ é reservado às
    // imagens do Figma em public/assets/, que não têm hash no nome.
    assetsDir: 'static',
  },
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
})
