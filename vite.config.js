import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://24x7.medicalglobalacademy.com',
        changeOrigin: true,
        secure: true,
      },
      '/wp-json': {
        target: 'https://medicalglobalacademy.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})