import type { KakaoMaps } from './types';

const KAKAO_ROUTE_BASE = 'https://map.kakao.com/link/to';

export const getKakaoMaps = () => (window as Window & { kakao?: { maps?: KakaoMaps } }).kakao?.maps;

export const buildKakaoRouteUrl = (name: string, lat: number, lng: number) =>
  `${KAKAO_ROUTE_BASE}/${encodeURIComponent(name)},${lat},${lng}`;
