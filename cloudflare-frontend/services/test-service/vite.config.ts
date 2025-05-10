import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'test_service',
      filename: 'remoteEntry.js',
      exposes: {
        './Test': './src/App.tsx'
      },
      shared: ['react', 'react-dom']
    })
  ],
  build: {
    target: 'esnext',
    cssCodeSplit: false,
    minify: false,
  },
  server: {
    port: 5001,
    cors: true
  }
})
