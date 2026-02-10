import { useCheckShopWishlistQuery } from '@shared/apis/wishlist';
import { useState } from 'react';
import { useRepairMap } from './useRepairMap';
import type { KakaoAddressResult, KakaoMaps, KakaoPagination, KakaoPlace, RepairShop } from './types';

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
  '스마트폰 수리',
  '휴대폰 사설 수리',
];

const SEARCH_RADIUS_METERS = 2500;

export const useRepairSearch = () => {
  const { mapRef, isMapReady, setCenter, setMarkers, clearMarkers, openOverlayForShop } = useRepairMap();
  const [shops, setShops] = useState<RepairShop[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSearch = (query: string) => {
    const kakao = (window as Window & { kakao?: { maps?: KakaoMaps } }).kakao;
    const maps = kakao?.maps;
    const services = maps?.services;

    if (!maps || !services || !isMapReady) {
      return;
    }
    if (!query.trim()) {
      return;
    }

    setIsSearching(true);
    setHasSearched(true);
    setErrorMessage(null);

    const geocoder = new services.Geocoder();

    geocoder.addressSearch(query, (result: unknown[], status: string) => {
      const [firstResult] = result as KakaoAddressResult[];
      if (status !== services.Status.OK || !firstResult) {
        clearMarkers();
        setShops([]);
        setIsSearching(false);
        setErrorMessage('검색에 실패했습니다.');
        return;
      }

      const { x, y } = firstResult;
      setCenter(Number(y), Number(x));

      const searchByKeyword = (keyword: string) =>
        new Promise<RepairShop[]>((resolve) => {
          const collected: RepairShop[] = [];
          const places = new services.Places();
          const center = new maps.LatLng(Number(y), Number(x));

          const handleResult = (data: unknown[], placesStatus: string, pagination: KakaoPagination) => {
            const placeResults = data as KakaoPlace[];
            if (placesStatus === services.Status.OK && data?.length) {
              placeResults.forEach((place) => {
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

          places.keywordSearch(keyword, handleResult, { location: center, radius: SEARCH_RADIUS_METERS });
        });

      Promise.all(SEARCH_KEYWORDS.map((keyword) => searchByKeyword(keyword)))
        .then((results) => {
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

          setMarkers(nextShops);

          nextShops.sort((a, b) => (a.distance ?? Number.MAX_VALUE) - (b.distance ?? Number.MAX_VALUE));
          setShops(nextShops);
          setIsSearching(false);
        })
        .catch(() => {
          clearMarkers();
          setShops([]);
          setIsSearching(false);
          setErrorMessage('검색에 실패했습니다.');
        });
    });
  };

  const shopNames = shops.map((shop) => shop.name);
  const { data: wishlistData, isLoading: isWishlistLoading } = useCheckShopWishlistQuery(shopNames);

  const favoriteMap = new Map<string, boolean>();
  if (wishlistData) {
    wishlistData.forEach((item) => {
      favoriteMap.set(item.shopName, item.shopInWishList);
    });
  }

  return {
    mapRef,
    shops,
    favoriteMap,
    isLoading: isSearching || (shops.length > 0 && isWishlistLoading),
    hasSearched,
    errorMessage,
    handleSearch,
    openOverlayForShop,
  };
};
