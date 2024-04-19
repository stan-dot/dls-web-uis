/// <reference types="vitest" />
import { config } from '@repo/vite-config'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({ ...config, 
  // NOTE - here you can override the shared config
  // plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
  base: './',
  define: {
    global: 'window', // this fixes global is not defined
  },
})

