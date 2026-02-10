import { useEffect, useRef, useState } from 'react';
import { buildKakaoRouteUrl, getKakaoMaps, loadKakaoMapsSdk } from './kakaoMapUtils';
import type { KakaoMapInstance, KakaoMarker, KakaoOverlay, RepairShop } from './types';

const buildOverlayContent = (shop: RepairShop) => {
  const phoneDisplay = shop.phone
    ? `<a href="tel:${shop.phone}" style="color:var(--color-green-800); text-decoration:none;">${shop.phone}</a>`
    : '';
  const routeLink = buildKakaoRouteUrl(shop.name, shop.lat, shop.lng);
  const detailLink = shop.placeUrl ? `<a href="${shop.placeUrl}" target="_blank" rel="noreferrer">상세</a>` : '';
  const actions = [detailLink, `<a href="${routeLink}" target="_blank" rel="noreferrer">길찾기</a>`]
    .filter(Boolean)
    .join(' · ');

  return `
    <div style="position:relative; transform:translateY(-8px);">
      <div style="padding:var(--padding-m) var(--spacing-s); font-size:12px; line-height:1.4; width:260px; background:var(--color-green-100); border-radius:var(--radius-m); border:2px solid var(--color-green-700); box-shadow:0 8px 20px rgba(17,203,176,0.18);">
        <div style="font-weight:700; margin-bottom:var(--spacing-xxxxs); word-break:break-word; color:var(--color-green-900);">${shop.name}</div>
        <div style="color:var(--color-green-800); margin-bottom:4px; word-break:break-word;">${shop.address}</div>
        ${phoneDisplay ? `<div style="color:var(--color-green-800); margin-bottom:6px; word-break:break-word;">${phoneDisplay}</div>` : '<div style="margin-bottom:6px;"></div>'}
        <div style="color:var(--color-green-900); font-weight:600; word-break:keep-all;">${actions}</div>
      </div>
      <div style="position:absolute; left:50%; bottom:-8px; transform:translateX(-50%); width:0; height:0; border-left:8px solid transparent; border-right:8px solid transparent; border-top:8px solid var(--color-green-100);"></div>
      <div style="position:absolute; left:50%; bottom:-10px; transform:translateX(-50%); width:0; height:0; border-left:9px solid transparent; border-right:9px solid transparent; border-top:9px solid var(--color-green-700);"></div>
    </div>
  `;
};

export const useRepairMap = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<KakaoMapInstance | null>(null);
  const markersRef = useRef<KakaoMarker[]>([]);
  const overlayRef = useRef<KakaoOverlay | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    let cancelled = false;

    const initMap = () => {
      const maps = getKakaoMaps();
      if (!maps || !mapRef.current || cancelled) {
        return;
      }

      const center = new maps.LatLng(37.5665, 126.978);
      const options = { center, level: 4 };

      const map = new maps.Map(mapRef.current, options);
      mapInstanceRef.current = map;
      overlayRef.current = new maps.CustomOverlay({ yAnchor: 1, zIndex: 10, clickable: true });
      maps.event.addListener(map, 'click', () => {
        overlayRef.current?.setMap(null);
      });
      setIsMapReady(true);
    };

    loadKakaoMapsSdk()
      .then(() => {
        const maps = getKakaoMaps();
        if (maps?.load) {
          maps.load(initMap);
        }
      })
      .catch((error) => {
        console.error('Kakao Maps SDK load failed:', error);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const clearMarkers = () => {
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
  };

  const setCenter = (lat: number, lng: number) => {
    const maps = getKakaoMaps();
    const map = mapInstanceRef.current;
    if (!maps || !map) {
      return;
    }
    map.setCenter(new maps.LatLng(lat, lng));
  };

  const openOverlayForShop = (shop: RepairShop) => {
    const maps = getKakaoMaps();
    const map = mapInstanceRef.current;
    if (!maps || !map) {
      return;
    }

    const position = new maps.LatLng(shop.lat, shop.lng);
    map.panTo(position);
    overlayRef.current?.setMap(null);

    const overlay = new maps.CustomOverlay({
      content: buildOverlayContent(shop),
      position,
      yAnchor: 1,
      zIndex: 10,
      clickable: true,
    });

    overlay.setMap(map);
    overlayRef.current = overlay;
  };

  const setMarkers = (shops: RepairShop[]) => {
    const maps = getKakaoMaps();
    const map = mapInstanceRef.current;
    if (!maps || !map) {
      return;
    }

    clearMarkers();
    if (shops.length === 0) {
      return;
    }

    const markerImage = new maps.MarkerImage('/repair-marker.svg', new maps.Size(36, 48), {
      offset: new maps.Point(18, 48),
    });

    const bounds = new maps.LatLngBounds();
    shops.forEach((shop) => {
      const position = new maps.LatLng(shop.lat, shop.lng);
      const marker = new maps.Marker({ map, position, image: markerImage });
      maps.event.addListener(marker, 'click', () => {
        openOverlayForShop(shop);
      });

      markersRef.current.push(marker);
      bounds.extend(position);
    });

    map.setBounds(bounds);
  };

  return {
    mapRef,
    isMapReady,
    setCenter,
    setMarkers,
    clearMarkers,
    openOverlayForShop,
  };
};
