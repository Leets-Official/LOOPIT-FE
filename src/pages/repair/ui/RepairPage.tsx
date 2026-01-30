import { SearchBar } from '@shared/ui/SearchBar';
import { RepairShopCard } from './RepairShopCard';

const SAMPLE_REPAIR_SHOPS = [
  { id: 'repair-1', name: '수리점 이름', address: 'ㅇㅇ시 ㅇㅇ구', favoriteActive: true },
  { id: 'repair-2', name: '수리점 이름', address: 'ㅇㅇ시 ㅇㅇ구', favoriteActive: false },
] as const;

export default function RepairPage() {
  return (
    <main className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-[47px] px-4 pb-16 pt-[47px]">
      <section
        className="relative flex h-[395px] w-full flex-col items-start gap-[10px] self-stretch rounded-[var(--Radius-radius-L,24px)] border-2 border-solid border-[var(--Container-container-surface-default,#00B39B)] bg-[lightgray] px-[201px] pb-[18px] pt-[47px]"
        aria-label="수리점 카카오 맵 지도 영역"
      >
        <div className="absolute left-1/2 top-[28px] w-[790px] -translate-x-1/2">
          <SearchBar
            className="w-full max-w-none"
            placeholder="현재 위치하고 계신 곳의 주소를 적어주세요."
            onSearch={() => {}}
          />
        </div>
      </section>
      <section className="flex flex-1 flex-col items-start gap-[45px] self-stretch" aria-label="수리점 목록 헤더">
        <div className="flex w-full items-center justify-between">
          <span className="font-pretendard text-[24px] font-semibold leading-[28px] text-black">
            총 {SAMPLE_REPAIR_SHOPS.length}개
          </span>
          <button type="button" className="typo-body-1 text-[var(--Text-text-3,#C7C7CC)]">
            거리순
          </button>
        </div>
      </section>
      <section className="flex w-full flex-col gap-6" aria-label="수리점 목록">
        {SAMPLE_REPAIR_SHOPS.map((shop) => (
          <RepairShopCard
            key={shop.id}
            name={shop.name}
            address={shop.address}
            favoriteActive={shop.favoriteActive}
          />
        ))}      </section>
    </main>
  );
}
