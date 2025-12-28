/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module '@tailwindcss/vite' {
  import type { Plugin } from 'vite';
  export default function tailwindcss(): Plugin;
}
