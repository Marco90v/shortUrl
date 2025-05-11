// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import compression from 'vite-plugin-compression'
import inspect from 'vite-plugin-inspect'
import { resolve } from 'path'

const isProd = process.env.NODE_ENV === 'production'

export default defineConfig({
  plugins: [
    react({
      tsDecorators: true,
      jsxImportSource: '@emotion/react',
    }),
    isProd &&
      compression({
        algorithm: 'gzip',
        ext: '.gz',
        deleteOriginFile: false,
      }),
    isProd &&
      compression({
        algorithm: 'brotliCompress',
        ext: '.br',
        deleteOriginFile: false,
      }),
    !isProd && inspect(),
  ].filter(Boolean),
  cacheDir: 'node_modules/.vite_cache',
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext',
      supported: { 'dynamic-import': true },
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
    sourcemap: false,
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    reportCompressedSize: true,
    manifest: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
      },
    },
  },
  define: {
    'process.env': {}, // Prevents accidental leaks from system env vars
  },
})
