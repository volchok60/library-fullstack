import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import reactSWC from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react(), reactSWC()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
})