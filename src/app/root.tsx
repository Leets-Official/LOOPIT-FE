import { AppProviders } from '@app/providers';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import '@app/styles/index.css';

export const meta = () => [
  { title: 'LOOPIT - 중고폰 거래 플랫폼' },
  {
    name: 'description',
    content:
      '믿을 수 있는 중고폰 거래, LOOPIT에서 시작하세요. 아이폰, 갤럭시 등 스마트폰을 안전하게 거래할 수 있습니다.',
  },
  { name: 'keywords', content: '중고폰, 중고 스마트폰, 중고거래, 아이폰, 갤럭시, 중고폰 거래' },

  // Open Graph
  { property: 'og:type', content: 'website' },
  { property: 'og:site_name', content: 'LOOPIT' },
  { property: 'og:title', content: 'LOOPIT - 중고폰 거래 플랫폼' },
  { property: 'og:description', content: '믿을 수 있는 중고폰 거래, LOOPIT에서 시작하세요.' },
  { property: 'og:image', content: 'https://www.loopit.kro.kr/og-image.png' },
  { property: 'og:url', content: 'https://www.loopit.kro.kr' },
  { property: 'og:locale', content: 'ko_KR' },

  // Twitter Card
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: 'LOOPIT - 중고폰 거래 플랫폼' },
  { name: 'twitter:description', content: '믿을 수 있는 중고폰 거래, LOOPIT에서 시작하세요.' },
  { name: 'twitter:image', content: 'https://www.loopit.kro.kr/og-image.png' },
];

export const links = () => [
  // Favicon
  { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
  { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
  { rel: 'shortcut icon', href: '/favicon.ico' },
  { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
  { rel: 'manifest', href: '/site.webmanifest' },
];

const Root = () => {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="apple-mobile-web-app-title" content="LOOPIT" />
        <Meta />
        <Links />
      </head>
      <body className="w-full overflow-x-hidden">
        <AppProviders>
          <Outlet />
        </AppProviders>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};

export default Root;
