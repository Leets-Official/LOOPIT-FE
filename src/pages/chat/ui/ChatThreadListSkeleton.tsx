const ChatThreadItemSkeleton = () => {
  return (
    <div className="gap-xxs rounded-m px-l py-l flex h-[130px] w-full items-center">
      <div className="h-[52px] w-[52px] shrink-0 animate-pulse rounded-full bg-gray-200" />

      <div className="gap-xxxs flex flex-1 flex-col">
        <div className="h-5 w-20 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
        <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
      </div>

      <div className="h-[80px] w-[80px] shrink-0 animate-pulse rounded-(--radius-s) bg-gray-200" />
    </div>
  );
};

export const ChatThreadListSkeleton = () => {
  return (
    <aside className="xl:px-xxs flex w-full flex-col gap-4 lg:gap-6 xl:h-[932px] xl:w-[510px] xl:max-w-[510px] xl:shrink-0">
      <div className="h-7 w-24 animate-pulse rounded bg-gray-200" />
      <div className="gap-xs flex min-h-0 flex-1 flex-col overflow-y-auto pr-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <ChatThreadItemSkeleton key={index} />
        ))}
      </div>
    </aside>
  );
};
