import { Profile } from '@shared/ui/Profile';
import { cn } from '@shared/utils/cn';
import type { ChatThread } from '@shared/types/chat';

type ChatThreadListProps = {
  threads: ChatThread[];
  selectedThreadId: string | null;
  unreadByThread: Record<string, boolean>;
  onSelect: (threadId: string) => void;
};

export const ChatThreadList = ({ threads, selectedThreadId, unreadByThread, onSelect }: ChatThreadListProps) => {
  return (
    <aside className="flex w-full flex-col gap-4 lg:gap-6 xl:h-[932px] xl:w-[510px] xl:max-w-[510px] xl:shrink-0 xl:px-[10px]">
      <h1 className="typo-title-2 text-gray-900">대화목록</h1>
      <div className="flex min-h-0 flex-1 flex-col gap-xs overflow-y-auto pr-2">
        {threads.map((thread) => {
          const isActive = thread.id === selectedThreadId;
          const isUnread = unreadByThread[thread.id] ?? false;
          return (
            <button
              key={thread.id}
              type="button"
              onClick={() => onSelect(thread.id)}
              className={cn(
                'flex h-[130px] w-full items-center gap-xxs rounded-[16px] px-[16px] py-[16px] text-left transition-colors',
                isActive ? 'bg-gray-50' : 'hover:bg-gray-50'
              )}
              aria-pressed={isActive}
            >
              <Profile size="sm" image={thread.avatar} alt={`${thread.name} 프로필`} className="h-[80px] w-[80px]" />
              <div className="flex flex-1 flex-col gap-xxxs">
                <span className={cn('typo-title-3 text-gray-900', isUnread && 'font-bold text-black')}>
                  {thread.name}
                </span>
                <span
                  className={cn(
                    'typo-body-2 flex items-center gap-2 font-semibold',
                    isUnread ? 'text-gray-900' : 'text-gray-500'
                  )}
                >
                  {isUnread && <span className="bg-brand-primary h-[8px] w-[8px] rounded-full" aria-hidden="true" />}
                  {thread.preview}
                </span>
                <span className="typo-caption-1 text-gray-400">{thread.dateLabel}</span>
              </div>
              <div className="h-[80px] w-[80px] shrink-0 overflow-hidden rounded-(--radius-s) bg-gray-100">
                {thread.productThumbnail ? (
                  <img
                    src={thread.productThumbnail}
                    alt={`${thread.name} 상품 이미지`}
                    className="h-full w-full rounded-(--radius-s) object-cover"
                  />
                ) : (
                  <div className="h-full w-full rounded-(--radius-s) bg-gray-100" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
};
