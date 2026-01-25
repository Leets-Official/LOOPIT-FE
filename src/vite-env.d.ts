/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module '@tailwindcss/vite' {
  import type { Plugin } from 'vite';
  export default function tailwindcss(): Plugin;
}

declare module 'swiper/css' {
  const content: string;
  export default content;
}

declare module 'swiper/css/effect-coverflow' {
  const content: string;
  export default content;
}

declare module 'swiper/css/pagination' {
  const content: string;
  export default content;
}
