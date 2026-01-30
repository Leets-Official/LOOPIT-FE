import { SearchBar } from '@shared/ui/SearchBar';
import { useEffect, useRef, useState } from 'react';
import { RepairShopCard } from './RepairShopCard';

type RepairShop = {
  id: string;
  name: string;
  address: string;
  phone?: string;
  distance?: number;
};

export default function RepairPage() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [shops, setShops] = useState<RepairShop[]>([]);

  useEffect(() => {
    const kakao = (window as any).kakao;

    if (!mapRef.current) return;

    const initMap = () => {
      if (!kakao?.maps || !mapRef.current) return;

      const center = new kakao.maps.LatLng(37.5665, 126.978);
      const options = { center, level: 4 };

      mapInstanceRef.current = new kakao.maps.Map(mapRef.current, options);
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

    if (!kakao?.maps?.services || !map) {return;}
    if (!query.trim()) {return;}

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

      const places = new kakao.maps.services.Places();

      places.keywordSearch(
        '수리점',
        (data: any[], placesStatus: string) => {
          clearMarkers();

          if (placesStatus !== kakao.maps.services.Status.OK || !data?.length) {
            setShops([]);
            return;
          }

          const bounds = new kakao.maps.LatLngBounds();
          const nextShops: RepairShop[] = data.map((place) => {
            const position = new kakao.maps.LatLng(place.y, place.x);
            const marker = new kakao.maps.Marker({ map, position });
            markersRef.current.push(marker);
            bounds.extend(position);

            return {
              id: place.id,
              name: place.place_name,
              address: place.road_address_name || place.address_name,
              phone: place.phone,
              distance: place.distance ? Number(place.distance) : undefined,
            };
          });

          map.setBounds(bounds);

          nextShops.sort((a, b) => (a.distance ?? Number.MAX_VALUE) - (b.distance ?? Number.MAX_VALUE));
          setShops(nextShops);
        },
        { location: center, radius: 3000 }
      );
    });
  };

  return (
    <main className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-[47px] px-4 pb-16 pt-[47px]">
      <section
        className="relative flex h-[395px] w-full flex-col items-start gap-[10px] self-stretch rounded-[var(--Radius-radius-L,24px)] border-2 border-solid border-[var(--Container-container-surface-default,#00B39B)] bg-[lightgray] px-[201px] pb-[18px] pt-[47px]"
        aria-label="수리점 카카오 맵 지도 영역"
      >
        <div
          ref={mapRef}
          className="absolute inset-0 z-0 rounded-[var(--Radius-radius-L,24px)]"
          aria-hidden="true"
        />
        <div className="absolute left-1/2 top-[28px] z-10 w-[790px] -translate-x-1/2">
          <SearchBar
            className="w-full max-w-none"
            placeholder="현재 위치하고 계신 곳의 주소를 적어주세요."
            onSearch={handleSearch}
          />
        </div>
      </section>
      <section className="flex flex-1 flex-col items-start gap-[45px] self-stretch" aria-label="수리점 목록 헤더">
        <div className="flex w-full items-center justify-between">
          <span className="font-pretendard text-[24px] font-semibold leading-[28px] text-black">
            총 {shops.length}개
          </span>
          <button type="button" className="typo-body-1 text-[var(--Text-text-3,#C7C7CC)]">
            거리순
          </button>
        </div>
      </section>
      <section className="flex w-full flex-col gap-6" aria-label="수리점 목록">
        {shops.map((shop) => (
          <RepairShopCard
            key={shop.id}
            name={shop.name}
            address={shop.address}
          />
        ))}
      </section>
    </main>
  );
}
