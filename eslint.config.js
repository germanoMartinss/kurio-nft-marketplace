import js from '@eslint/js'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

const AXIOS = { name: 'axios', message: 'Todo HTTP passa por src/api (cliente Axios único).' }
const MOCKS = {
  group: ['@/mocks', '@/mocks/*', '**/mocks', '**/mocks/*', 'msw', 'msw/*', '@mswjs/*'],
  message: 'Dados simulados só existem na camada de rede (MSW); veja src/mocks.',
}

export default defineConfig([
  globalIgnores([
    'dist',
    'public/mockServiceWorker.js',
    'src/routeTree.gen.ts',
    'playwright-report',
    'test-results',
  ]),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.browser,
    },
    rules: {
      // Componentes shadcn exportam as variantes junto com o componente (ex.: buttonVariants).
      'react-refresh/only-export-components': ['error', { allowExportNames: ['buttonVariants'] }],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', ignoreRestSiblings: true },
      ],
    },
  },
  {
    // R6.3: respostas simuladas só existem na camada de rede. Fora de `src/mocks`, nada importa o
    // MSW nem os mocks (exceções: o início dos mocks em `main.tsx` e o painel `/mocks`), e só
    // `src/api` conhece o Axios.
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/mocks/**', 'src/api/**', 'src/main.tsx', 'src/routes/mocks.tsx'],
    rules: { 'no-restricted-imports': ['error', { paths: [AXIOS], patterns: [MOCKS] }] },
  },
  {
    files: ['src/api/**/*.{ts,tsx}'],
    rules: { 'no-restricted-imports': ['error', { patterns: [MOCKS] }] },
  },
  {
    files: ['src/main.tsx', 'src/routes/mocks.tsx'],
    rules: { 'no-restricted-imports': ['error', { paths: [AXIOS] }] },
  },
  {
    // Arquivos de rota exportam `Route` junto com componentes; o plugin do router cuida do HMR.
    files: ['src/routes/**/*.tsx'],
    rules: { 'react-refresh/only-export-components': 'off' },
  },
])
