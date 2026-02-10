export const ShopCardSkeleton = () => {
  return (
    <div className="flex w-full animate-pulse flex-col items-start justify-between gap-6 rounded-(--radius-l) bg-gray-900 px-6 py-8 md:flex-row md:items-center md:gap-[31px] md:px-[42px] md:py-[44px]">
      <div className="flex flex-1 flex-col items-start gap-[5px]">
        <div className="h-6 w-48 rounded bg-gray-700" />
        <div className="h-5 w-64 rounded bg-gray-700" />
        <div className="h-5 w-32 rounded bg-gray-700" />
      </div>

      <div className="flex w-full items-center justify-between gap-4 md:w-auto md:gap-[31px]">
        <div className="size-10 rounded-full bg-gray-700" />
        <div className="flex w-full flex-1 flex-col items-start gap-[15px] md:w-[159px] md:flex-none">
          <div className="h-[44px] w-full rounded-(--radius-l) bg-gray-700" />
        </div>
      </div>
    </div>
  );
};
