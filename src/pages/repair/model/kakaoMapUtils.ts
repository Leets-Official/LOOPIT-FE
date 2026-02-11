import type { KakaoMaps } from './types';

const KAKAO_ROUTE_BASE = 'https://map.kakao.com/link/to';
const KAKAO_SDK_URL_BASE = 'https://dapi.kakao.com/v2/maps/sdk.js';

let sdkLoadPromise: Promise<void> | null = null;

export const getKakaoMaps = () => (window as Window & { kakao?: { maps?: KakaoMaps } }).kakao?.maps;

export const loadKakaoMapsSdk = (): Promise<void> => {
  if (sdkLoadPromise) {
    return sdkLoadPromise;
  }

  const existingMaps = getKakaoMaps();
  if (existingMaps) {
    return Promise.resolve();
  }

  const kakaoMapKey = import.meta.env.VITE_KAKAO_JS_KEY;
  if (!kakaoMapKey) {
    return Promise.reject(new Error('VITE_KAKAO_JS_KEY is not defined'));
  }

  sdkLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `${KAKAO_SDK_URL_BASE}?appkey=${kakaoMapKey}&libraries=services&autoload=false`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Kakao Maps SDK'));
    document.head.appendChild(script);
  });

  return sdkLoadPromise;
};

export const buildKakaoRouteUrl = (name: string, lat: number, lng: number) =>
  `${KAKAO_ROUTE_BASE}/${encodeURIComponent(name)},${lat},${lng}`;
