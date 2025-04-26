// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import inspect from 'vite-plugin-inspect'
import compression from 'vite-plugin-compression'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react({
      tsDecorators: true,
      jsxImportSource: "@emotion/react",
      // plugins: [["@swc/plugin-styled-components", {}]],
    }),
    inspect(),
    compression({ algorithm: 'gzip' }), // gzip
    compression({ algorithm: 'brotliCompress' }), // brotli
  ],
  cacheDir: 'node_modules/.vite_cache',
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext',
      supported: {
        'dynamic-import': true,
      },
    },
    exclude: ['lucide-react'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    watch: {
      usePolling: false,
      interval: 100,
    },
    hmr: {
      overlay: true,
      timeout: 30000,
    },
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
    target: 'esnext',
  },
  build: {
    target: 'esnext',
    cssTarget: 'chrome100',
    minify: 'esbuild',
    sourcemap: true,
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
  },
})
