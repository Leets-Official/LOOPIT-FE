export const TradeItemSkeleton = () => {
  return (
    <div className="gap-xxs flex w-full max-w-[1200px] flex-col rounded-(--radius-l) bg-gray-900 px-4 py-6 md:px-[42px] md:py-[44px]">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-4 md:gap-[36px]">
          <div className="rounded-m h-16 w-16 shrink-0 animate-pulse bg-gray-700 md:h-[79px] md:w-[79px]" />
          <div className="gap-xxxxs flex flex-col">
            <div className="h-5 w-32 animate-pulse rounded bg-gray-700" />
            <div className="h-4 w-24 animate-pulse rounded bg-gray-700" />
            <div className="h-3 w-20 animate-pulse rounded bg-gray-700" />
          </div>
        </div>
        <div className="h-5 w-16 animate-pulse rounded bg-gray-700" />
      </div>
    </div>
  );
};
