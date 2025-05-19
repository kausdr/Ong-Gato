import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 8080,
    // apenas para testes locais, adicionar um endpoint para o viacep no backend posteriormente
    proxy: {
      '/viacep': {
        target: 'https://viacep.com.br',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/viacep/, ''),
      },
    },
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})
