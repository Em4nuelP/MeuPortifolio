
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // A propriedade base é fundamental para deploy no GitHub Pages
  // './' garante que os arquivos (js, css, imagens) sejam carregados relativos à pasta atual
  base: './',
})
