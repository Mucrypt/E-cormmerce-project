import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      // Specify which polyfills you need
      globals: {
        global: true,
        process: true,
      },
    }),
  ],
  esbuild: {
    loader: 'jsx', // Treat .js files as JSX
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Backend server URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
