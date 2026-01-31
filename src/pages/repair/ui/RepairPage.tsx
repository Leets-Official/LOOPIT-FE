import { SearchBar } from '@shared/ui/SearchBar';
import { RepairShopCard } from './RepairShopCard';
import { useRepairSearch } from '../model/useRepairSearch';

const MessageText = ({ children }: { children: string }) => (
  <p className="font-pretendard w-full py-12 text-center text-[20px] leading-[24px] font-semibold text-[var(--color-gray-300)]">
    {children}
  </p>
);

const RepairPage = () => {
  const { mapRef, shops, isSearching, hasSearched, errorMessage, handleSearch, openOverlayForShop } = useRepairSearch();

  return (
    <main className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-[47px] px-4 pt-8 pb-16 md:pt-[47px]">
      <section
        className="relative mx-auto flex h-[320px] w-full max-w-[1200px] flex-col items-start gap-[var(--spacing-xxs)] self-stretch rounded-[var(--radius-l)] border-2 border-solid border-[var(--color-green-700)] bg-[lightgray] px-4 pt-8 pb-4 md:h-[360px] md:px-12 md:pt-[47px] md:pb-[18px] xl:h-[395px] xl:px-[201px]"
        aria-label="수리점 카카오 맵 지도 영역"
      >
        <div ref={mapRef} className="absolute inset-0 z-0 rounded-[var(--radius-l)]" aria-hidden="true" />
        <div className="absolute top-[var(--spacing-xxl)] left-1/2 z-10 w-[calc(100%-32px)] max-w-[790px] -translate-x-1/2 md:w-[calc(100%-96px)] xl:w-[790px]">
          <SearchBar
            className="w-full max-w-none"
            placeholder="현재 위치하고 계신 곳의 주소를 적어주세요."
            onSearch={handleSearch}
          />
        </div>
      </section>
      <section className="flex flex-1 flex-col items-start gap-[45px] self-stretch" aria-label="수리점 목록 헤더">
        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between">
          <span className="font-pretendard text-[24px] leading-[28px] font-semibold text-[var(--color-black)]">
            총 {shops.length}개
          </span>
          <button type="button" className="typo-body-1 text-[var(--color-gray-300)]">
            거리순
          </button>
        </div>
      </section>
      <section className="mx-auto flex w-full max-w-[1200px] flex-col gap-6" aria-label="수리점 목록">
        {isSearching && <MessageText>검색 중...</MessageText>}
        {!isSearching && errorMessage && <MessageText>{errorMessage}</MessageText>}
        {!isSearching && !errorMessage && hasSearched && shops.length === 0 && (
          <MessageText>주변에 수리점이 없습니다.</MessageText>
        )}
        {!isSearching && !errorMessage && !hasSearched && (
          <MessageText>주소를 입력하면 주변 수리점을 보여드려요.</MessageText>
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
};

export default RepairPage;
