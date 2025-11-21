
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // A propriedade base DEVE corresponder ao nome do seu repositório no GitHub entre barras.
  // Exemplo: se o repo é 'MeuPortfolio', use '/MeuPortfolio/'
  base: '/MeuPortfolio/',
})
