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
})
