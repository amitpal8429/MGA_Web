import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'vendor',
              test: /node_modules/,
            },
          ],
        },
      },
    },
  },
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