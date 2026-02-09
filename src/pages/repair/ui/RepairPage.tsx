import { EmptyState } from '@shared/ui/EmptyState';
import { SearchBar } from '@shared/ui/SearchBar';
import { cn } from '@shared/utils/cn';
import { RepairShopCard } from './RepairShopCard';
import { useRepairSearch } from '../model/useRepairSearch';

const containerClass = 'mx-auto w-full max-w-[1200px]';

const RepairPage = () => {
  const { mapRef, shops, isSearching, hasSearched, errorMessage, handleSearch, openOverlayForShop } = useRepairSearch();

  const renderShopList = () => {
    if (errorMessage) {
      return <EmptyState message={errorMessage} />;
    }

    if (!hasSearched) {
      return <EmptyState message="주소를 입력하면 주변 수리점을 보여드려요." />;
    }

    if (isSearching) {
      return <div className="min-h-[240px] w-full" />;
    }

    if (shops.length === 0) {
      return <EmptyState message="주변에 수리점이 없습니다." />;
    }

    return shops.map((shop) => (
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
    ));
  };

  return (
    <main className="md:px-xxxl mx-auto flex w-full max-w-[1440px] flex-col items-center gap-6 px-(--margin-l) md:gap-8 lg:gap-[45px] lg:px-0">
      <section
        className={cn(
          containerClass,
          'gap-xxs relative flex h-[320px] flex-col items-start rounded-(--radius-l) border-2 border-solid border-green-700 bg-gray-100 px-4 pt-8 pb-4 md:h-[360px] md:px-12 md:pt-[47px] md:pb-[18px] xl:h-[395px] xl:px-[201px]'
        )}
        aria-label="수리점 카카오 맵 지도 영역"
      >
        <div ref={mapRef} className="absolute inset-0 z-0 rounded-(--radius-l)" aria-hidden="true" />
        <div className="top-xxl absolute left-1/2 z-10 w-[calc(100%-32px)] max-w-[790px] -translate-x-1/2 md:w-[calc(100%-96px)] xl:w-[790px]">
          <SearchBar
            className="w-full max-w-none"
            placeholder="현재 위치하고 계신 곳의 주소를 적어주세요."
            onSearch={handleSearch}
          />
        </div>
      </section>

      <section className={cn(containerClass, 'flex flex-col gap-4')} aria-label="수리점 목록">
        <div className="flex items-center justify-between">
          <span className="typo-title-2 text-black">총 {shops.length}개</span>
          <button type="button" className="typo-body-1 text-gray-300">
            거리순
          </button>
        </div>
        <div className="flex flex-col items-start gap-5">{renderShopList()}</div>
      </section>
    </main>
  );
};

export default RepairPage;
