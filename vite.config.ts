import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import topLevelAwait from 'vite-plugin-top-level-await';

export default defineConfig(async () => {
  return {
    build: {
      target: 'chrome110',
    },
    plugins: [
      react(),
      topLevelAwait(),
      ViteEjsPlugin({
        module: '/src/client/index.tsx',
        title: '買えるオーガニック',
      }),
      viteCompression(),
      viteCompression({ algorithm: 'brotliCompress', ext: '.br' }),
    ],
  };
});
