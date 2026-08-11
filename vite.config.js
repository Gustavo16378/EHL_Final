import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // `__dirname` não existe em módulos ESM — resolvemos a partir da URL do
      // próprio arquivo, que funciona igual no Windows e no Linux.
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
