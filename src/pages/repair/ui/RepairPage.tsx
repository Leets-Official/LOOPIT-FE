import { SearchBar } from '@shared/ui/SearchBar';
import { useEffect, useRef, useState } from 'react';
import { RepairShopCard } from './RepairShopCard';

type RepairShop = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  phone?: string;
  distance?: number;
  placeUrl?: string;
};

const SEARCH_KEYWORDS = [
  '아이폰 수리',
  '갤럭시 수리',
  '삼성폰 수리',
  '애플 서비스센터',
  '애플 수리',
  '삼성전자 서비스센터',
  '휴대폰 수리',
  '핸드폰 수리',
  '액정',
];

export default function RepairPage() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const overlayRef = useRef<any>(null);
  const [shops, setShops] = useState<RepairShop[]>([]);

  useEffect(() => {
    const kakao = (window as any).kakao;

    if (!mapRef.current) {
      return;
    }

    const initMap = () => {
      if (!kakao?.maps || !mapRef.current) {
        return;
      }

      const center = new kakao.maps.LatLng(37.5665, 126.978);
      const options = { center, level: 4 };

      mapInstanceRef.current = new kakao.maps.Map(mapRef.current, options);
      overlayRef.current = new kakao.maps.CustomOverlay({ yAnchor: 1, zIndex: 10 });
    };

    if (kakao?.maps?.load) {
      kakao.maps.load(initMap);
      return;
    }

    const timer = window.setInterval(() => {
      if (kakao?.maps?.load) {
        window.clearInterval(timer);
        kakao.maps.load(initMap);
      }
    }, 50);

    return () => window.clearInterval(timer);
  }, []);

  const clearMarkers = () => {
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
  };

  const handleSearch = (query: string) => {
    const kakao = (window as any).kakao;
    const map = mapInstanceRef.current;

    if (!kakao?.maps?.services || !map) {
      return;
    }
    if (!query.trim()) {
      return;
    }

    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(query, (result: any[], status: string) => {
      if (status !== kakao.maps.services.Status.OK || !result?.[0]) {
        clearMarkers();
        setShops([]);
        return;
      }

      const { x, y } = result[0];
      const center = new kakao.maps.LatLng(y, x);
      map.setCenter(center);

      const searchByKeyword = (keyword: string) =>
        new Promise<RepairShop[]>((resolve) => {
          const collected: RepairShop[] = [];
          const places = new kakao.maps.services.Places();

          const handleResult = (data: any[], placesStatus: string, pagination: any) => {
            if (placesStatus === kakao.maps.services.Status.OK && data?.length) {
              data.forEach((place) => {
                collected.push({
                  id: place.id,
                  name: place.place_name,
                  address: place.road_address_name || place.address_name,
                  lat: Number(place.y),
                  lng: Number(place.x),
                  phone: place.phone,
                  distance: place.distance ? Number(place.distance) : undefined,
                  placeUrl: place.place_url,
                });
              });
            }

            if (pagination?.hasNextPage) {
              pagination.nextPage();
              return;
            }

            resolve(collected);
          };

          places.keywordSearch(keyword, handleResult, { location: center, radius: 5000 });
        });

      Promise.all(SEARCH_KEYWORDS.map((keyword) => searchByKeyword(keyword))).then((results) => {
        clearMarkers();

        const uniqueMap = new Map<string, RepairShop>();
        results.flat().forEach((shop) => {
          if (!uniqueMap.has(shop.id)) {
            uniqueMap.set(shop.id, shop);
          }
        });

        const nextShops = Array.from(uniqueMap.values());

        if (nextShops.length === 0) {
          setShops([]);
          return;
        }

        const bounds = new kakao.maps.LatLngBounds();
        nextShops.forEach((shop) => {
          const position = new kakao.maps.LatLng(shop.lat, shop.lng);
          const marker = new kakao.maps.Marker({ map, position });
          const overlay = overlayRef.current;

          kakao.maps.event.addListener(marker, 'click', () => {
            if (!overlay) return;
            const phoneLink = shop.phone ? `<a href="tel:${shop.phone}">전화</a>` : '';
            const routeLink = `https://map.kakao.com/link/to/${encodeURIComponent(shop.name)},${shop.lat},${shop.lng}`;
            const detailLink = shop.placeUrl ? `<a href="${shop.placeUrl}" target="_blank" rel="noreferrer">상세</a>` : '';
            const actions = [phoneLink, detailLink, `<a href="${routeLink}" target="_blank" rel="noreferrer">길찾기</a>`]
              .filter(Boolean)
              .join(' · ');

            const content = `
              <div style="position:relative; transform:translateY(-8px);">
                <div style="padding:10px 12px; font-size:12px; line-height:1.4; width:260px; background:#fff; border-radius:12px; box-shadow:0 6px 18px rgba(0,0,0,0.12);">
                  <div style="font-weight:700; margin-bottom:4px; word-break:break-word; color:#111;">${shop.name}</div>
                  <div style="color:#666; margin-bottom:6px; word-break:break-word;">${shop.address}</div>
                  <div style="color:#111; word-break:keep-all;">${actions}</div>
                </div>
                <div style="position:absolute; left:50%; bottom:-8px; transform:translateX(-50%); width:0; height:0; border-left:8px solid transparent; border-right:8px solid transparent; border-top:8px solid #fff;"></div>
              </div>
            `;

            overlay.setContent(content);
            overlay.setPosition(position);
            overlay.setMap(map);
          });

          markersRef.current.push(marker);
          bounds.extend(position);
        });

        map.setBounds(bounds);

        nextShops.sort((a, b) => (a.distance ?? Number.MAX_VALUE) - (b.distance ?? Number.MAX_VALUE));
        setShops(nextShops);
      });
    });
  };

  return (
    <main className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-[47px] px-4 pt-[47px] pb-16">
      <section
        className="relative flex h-[395px] w-full flex-col items-start gap-[10px] self-stretch rounded-[var(--Radius-radius-L,24px)] border-2 border-solid border-[var(--Container-container-surface-default,#00B39B)] bg-[lightgray] px-[201px] pt-[47px] pb-[18px]"
        aria-label="수리점 카카오 맵 지도 영역"
      >
        <div ref={mapRef} className="absolute inset-0 z-0 rounded-[var(--Radius-radius-L,24px)]" aria-hidden="true" />
        <div className="absolute top-[28px] left-1/2 z-10 w-[790px] -translate-x-1/2">
          <SearchBar
            className="w-full max-w-none"
            placeholder="현재 위치하고 계신 곳의 주소를 적어주세요."
            onSearch={handleSearch}
          />
        </div>
      </section>
      <section className="flex flex-1 flex-col items-start gap-[45px] self-stretch" aria-label="수리점 목록 헤더">
        <div className="flex w-full items-center justify-between">
          <span className="font-pretendard text-[24px] leading-[28px] font-semibold text-black">
            총 {shops.length}개
          </span>
          <button type="button" className="typo-body-1 text-[var(--Text-text-3,#C7C7CC)]">
            거리순
          </button>
        </div>
      </section>
      <section className="flex w-full flex-col gap-6" aria-label="수리점 목록">
        {shops.map((shop) => (
          <RepairShopCard key={shop.id} name={shop.name} address={shop.address} />
        ))}
      </section>
    </main>
  );
}
