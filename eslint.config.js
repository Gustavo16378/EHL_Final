import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'cms/**', 'node_modules']),

  // App: React em .js/.jsx/.ts/.tsx, rodando no navegador.
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['*.config.js', 'vite.config.js'],
    extends: [
      js.configs.recommended,
      // Sem isto os ~74 arquivos .ts/.tsx do projeto passavam sem nenhuma regra.
      ...tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: '^_' },
      ],
    },
  },

  // src/components/ui é código gerado pelo shadcn/ui, mantido o mais próximo
  // possível do original para poder ser regerado. Regras de estilo do projeto
  // não se aplicam; correção (hooks, no-undef, etc.) continua valendo.
  {
    files: ['src/components/ui/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      'react-refresh/only-export-components': 'off',
    },
  },

  // Arquivos de configuração: rodam no Node, não no navegador.
  {
    files: ['*.config.js', 'vite.config.js', 'eslint.config.js'],
    extends: [js.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.node,
      parserOptions: { sourceType: 'module' },
    },
  },
])
