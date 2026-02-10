export const BuyDetailSkeleton = () => {
  return (
    <main className="md:px-xxxl mx-auto flex w-full max-w-[1200px] flex-col items-start gap-5 px-(--margin-l) lg:gap-[157px] lg:px-0">
      <div className="flex w-full flex-col items-start gap-5 lg:flex-row">
        {/* 이미지 섹션 */}
        <div className="flex w-full shrink-0 flex-col items-start gap-[30px] lg:w-[590px]">
          <div className="aspect-square w-full animate-pulse rounded-(--radius-s) bg-gray-200 lg:h-[568px] lg:w-[590px]" />
          <div className="flex items-center gap-[23px]">
            <div className="h-[52px] w-[52px] animate-pulse rounded-full bg-gray-200" />
            <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />
          </div>
        </div>

        {/* 정보 섹션 */}
        <div className="flex w-full shrink-0 flex-col items-start gap-10 lg:w-[590px] lg:gap-[108px]">
          <div className="flex flex-col items-start gap-[27px] self-stretch">
            <div className="flex flex-col items-start gap-[21px] self-stretch">
              <div className="flex flex-col items-start gap-[38px] self-stretch">
                <div className="h-8 w-3/4 animate-pulse rounded bg-gray-200" />
                <div className="h-10 w-32 animate-pulse rounded bg-gray-200" />
              </div>

              <div className="h-px w-full bg-gray-100 lg:w-[584px]" />

              <div className="gap-xxs flex flex-col items-start self-stretch">
                <div className="flex flex-col items-start gap-[6px] self-stretch">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="flex items-center gap-[11px]">
                      <div className="h-4 w-12 animate-pulse rounded bg-gray-200" />
                      <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />
                    </div>
                  ))}
                </div>
                <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />
              </div>
            </div>

            <div className="h-px w-full bg-gray-100 lg:w-[584px]" />

            <div className="flex min-h-[80px] flex-col gap-2 self-stretch">
              <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-4/6 animate-pulse rounded bg-gray-200" />
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="flex w-full gap-4">
            <div className="h-12 w-12 animate-pulse rounded-(--radius-l) bg-gray-200" />
            <div className="h-12 flex-1 animate-pulse rounded-(--radius-l) bg-gray-200" />
          </div>
        </div>
      </div>
    </main>
  );
};
