import path from 'path';
import { fileURLToPath } from 'url';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [tailwindcss(), svgr()],
  resolve: {
    alias: {
      '@app': path.resolve(dirname, '../src/app'),
      '@pages': path.resolve(dirname, '../src/pages'),
      '@shared': path.resolve(dirname, '../src/shared'),
      '@assets': path.resolve(dirname, '../src/shared/assets'),
    },
  },
});
