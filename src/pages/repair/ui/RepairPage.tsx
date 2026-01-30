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
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
    setIsSearching(true);
    setHasSearched(true);
    setErrorMessage(null);

    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(query, (result: any[], status: string) => {
      if (status !== kakao.maps.services.Status.OK || !result?.[0]) {
        clearMarkers();
        setShops([]);
        setIsSearching(false);
        setErrorMessage('검색에 실패했습니다.');
        return;
      }

      const { x, y } = result[0];
      const center = new kakao.maps.LatLng(y, x);
      map.setCenter(center);

      const markerImage = new kakao.maps.MarkerImage(
        '/markers/repair-marker.svg',
        new kakao.maps.Size(36, 48),
        { offset: new kakao.maps.Point(18, 48) }
      );

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

          places.keywordSearch(keyword, handleResult, { location: center, radius: 3000 });
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
          setIsSearching(false);
          return;
        }

        const bounds = new kakao.maps.LatLngBounds();
        nextShops.forEach((shop) => {
          const position = new kakao.maps.LatLng(shop.lat, shop.lng);
          const marker = new kakao.maps.Marker({ map, position, image: markerImage });
          kakao.maps.event.addListener(marker, 'click', () => {
            openOverlayForShop(shop);
          });

          markersRef.current.push(marker);
          bounds.extend(position);
        });

        map.setBounds(bounds);

        nextShops.sort((a, b) => (a.distance ?? Number.MAX_VALUE) - (b.distance ?? Number.MAX_VALUE));
        setShops(nextShops);
        setIsSearching(false);
      });
    });
  };

  const openOverlayForShop = (shop: RepairShop) => {
    const kakao = (window as any).kakao;
    const map = mapInstanceRef.current;
    if (!kakao?.maps || !map) return;

    const position = new kakao.maps.LatLng(shop.lat, shop.lng);
    map.panTo(position);
    overlayRef.current?.setMap(null);

    const phoneLink = shop.phone ? `<a href="tel:${shop.phone}">전화</a>` : '';
    const routeLink = `https://map.kakao.com/link/to/${encodeURIComponent(shop.name)},${shop.lat},${shop.lng}`;
    const detailLink = shop.placeUrl ? `<a href="${shop.placeUrl}" target="_blank" rel="noreferrer">상세</a>` : '';
    const actions = [phoneLink, detailLink, `<a href="${routeLink}" target="_blank" rel="noreferrer">길찾기</a>`]
      .filter(Boolean)
      .join(' · ');

    const content = `
      <div style="position:relative; transform:translateY(-8px);">
        <div style="padding:var(--padding-m) var(--spacing-s); font-size:12px; line-height:1.4; width:260px; background:var(--color-green-100); border-radius:var(--radius-m); border:2px solid var(--color-green-700); box-shadow:0 8px 20px rgba(17,203,176,0.18);">
          <div style="font-weight:700; margin-bottom:var(--spacing-xxxxs); word-break:break-word; color:var(--color-green-900);">${shop.name}</div>
          <div style="color:var(--color-green-800); margin-bottom:6px; word-break:break-word;">${shop.address}</div>
          <div style="color:var(--color-green-900); font-weight:600; word-break:keep-all;">${actions}</div>
        </div>
        <div style="position:absolute; left:50%; bottom:-8px; transform:translateX(-50%); width:0; height:0; border-left:8px solid transparent; border-right:8px solid transparent; border-top:8px solid var(--color-green-100);"></div>
        <div style="position:absolute; left:50%; bottom:-10px; transform:translateX(-50%); width:0; height:0; border-left:9px solid transparent; border-right:9px solid transparent; border-top:9px solid var(--color-green-700);"></div>
      </div>
    `;

    const overlay = new kakao.maps.CustomOverlay({
      content,
      position,
      yAnchor: 1,
      zIndex: 10,
    });

    overlay.setMap(map);
    overlayRef.current = overlay;
  };

  return (
    <main className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-[47px] px-4 pt-[47px] pb-16">
      <section
        className="relative flex h-[395px] w-full flex-col items-start gap-[var(--spacing-xxs)] self-stretch rounded-[var(--radius-l)] border-2 border-solid border-[var(--color-green-700)] bg-[lightgray] px-[201px] pt-[47px] pb-[18px]"
        aria-label="수리점 카카오 맵 지도 영역"
      >
        <div ref={mapRef} className="absolute inset-0 z-0 rounded-[var(--radius-l)]" aria-hidden="true" />
        <div className="absolute top-[var(--spacing-xxl)] left-1/2 z-10 w-[790px] -translate-x-1/2">
          <SearchBar
            className="w-full max-w-none"
            placeholder="현재 위치하고 계신 곳의 주소를 적어주세요."
            onSearch={handleSearch}
          />
        </div>
      </section>
      <section className="flex flex-1 flex-col items-start gap-[45px] self-stretch" aria-label="수리점 목록 헤더">
        <div className="flex w-full items-center justify-between">
          <span className="font-pretendard text-[24px] leading-[28px] font-semibold text-[var(--color-black)]">
            총 {shops.length}개
          </span>
          <button type="button" className="typo-body-1 text-[var(--color-gray-300)]">
            거리순
          </button>
        </div>
      </section>
      <section className="flex w-full flex-col gap-6" aria-label="수리점 목록">
        {isSearching && (
          <p className="w-full py-12 text-center font-pretendard text-[20px] font-semibold leading-[24px] text-[var(--color-gray-300)]">
            검색 중...
          </p>
        )}
        {!isSearching && errorMessage && (
          <p className="w-full py-12 text-center font-pretendard text-[20px] font-semibold leading-[24px] text-[var(--color-gray-300)]">
            {errorMessage}
          </p>
        )}
        {!isSearching && !errorMessage && hasSearched && shops.length === 0 && (
          <p className="w-full py-12 text-center font-pretendard text-[20px] font-semibold leading-[24px] text-[var(--color-gray-300)]">
            주변에 수리점이 없습니다.
          </p>
        )}
        {!isSearching && !errorMessage && !hasSearched && (
          <p className="w-full py-12 text-center font-pretendard text-[20px] font-semibold leading-[24px] text-[var(--color-gray-300)]">
            주소를 입력하면 주변 수리점을 보여드려요.
          </p>
        )}
        {!isSearching &&
          !errorMessage &&
          shops.map((shop) => (
            <RepairShopCard
              key={shop.id}
              name={shop.name}
              address={shop.address}
              phone={shop.phone}
              lat={shop.lat}
              lng={shop.lng}
              placeUrl={shop.placeUrl}
              onSelect={() => openOverlayForShop(shop)}
            />
          ))}
      </section>
    </main>
  );
}
