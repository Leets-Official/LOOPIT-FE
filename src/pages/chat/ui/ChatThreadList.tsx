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
    <aside className="xl:px-xxs flex w-full flex-col gap-4 lg:gap-6 xl:h-[932px] xl:w-[510px] xl:max-w-[510px] xl:shrink-0">
      <h1 className="typo-title-2 text-gray-900">대화목록</h1>
      <div className="gap-xs flex min-h-0 flex-1 flex-col overflow-y-auto pr-2">
        {threads.map((thread) => {
          const isActive = thread.id === selectedThreadId;
          const isUnread = unreadByThread[thread.id] ?? false;
          return (
            <button
              key={thread.id}
              type="button"
              onClick={() => onSelect(thread.id)}
              className={cn(
                'gap-xxs rounded-m px-l py-l flex h-[130px] w-full items-center text-left transition-colors',
                isActive ? 'bg-gray-50' : 'hover:bg-gray-50'
              )}
              aria-pressed={isActive}
            >
              <Profile size="chat" image={thread.avatar} alt={`${thread.name} 프로필`} />
              <div className="gap-xxxs flex flex-1 flex-col">
                <span className={cn('typo-title-3 text-gray-900', isUnread && 'font-bold text-black')}>
                  {thread.name}
                </span>
                <span
                  className={cn(
                    'typo-body-2 flex items-center gap-2 font-semibold',
                    isUnread ? 'text-gray-900' : 'text-gray-500'
                  )}
                >
                  {isUnread && <span className="bg-brand-primary h-xxxs w-xxxs rounded-full" aria-hidden="true" />}
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
