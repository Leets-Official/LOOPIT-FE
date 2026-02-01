import { AppProviders } from '@app/providers';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import '@app/styles/index.css';

export const links = () => [
  // Favicon
  { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
  { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
  { rel: 'shortcut icon', href: '/favicon.ico' },
  { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
  { rel: 'manifest', href: '/site.webmanifest' },
];

const KAKAO_SDK_URL_BASE = 'https://dapi.kakao.com/v2/maps/sdk.js';
const kakaoMapKey = import.meta.env.VITE_KAKAO_JS_KEY;
const kakaoMapSrc = kakaoMapKey
  ? `${KAKAO_SDK_URL_BASE}?appkey=${kakaoMapKey}&libraries=services&autoload=false`
  : null;

export default function Root() {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="apple-mobile-web-app-title" content="LOOPIT" />
        <Meta />
        <Links />
        {kakaoMapSrc && <script src={kakaoMapSrc} defer />}
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
}
