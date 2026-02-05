import type { ThreadContent } from '@shared/types/chat';
import type { ReactNode } from 'react';

type ChatConversationHeaderProps = {
  thread: ThreadContent;
  statusDropdown: ReactNode;
};

export const ChatConversationHeader = ({ thread, statusDropdown }: ChatConversationHeaderProps) => {
  return (
    <div className="h-[167px] rounded-(--radius-l) bg-gray-900 px-[42px] py-[44px]">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {thread.product.image ? (
            <img
              src={thread.product.image}
              alt={thread.product.title}
              className="h-[80px] w-[80px] rounded-(--radius-m) object-cover"
            />
          ) : (
            <div className="h-[80px] w-[80px] rounded-(--radius-m) bg-gray-200" />
          )}
          <div className="flex flex-col gap-[6px]">
            <span className="typo-body-1 text-white">{thread.product.title}</span>
            <span className="typo-body-2 text-white">{thread.product.price}</span>
            <span className="typo-caption-2 text-white">{thread.product.date}</span>
          </div>
        </div>

        {statusDropdown}
      </div>
    </div>
  );
};
