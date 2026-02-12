import { formatDate, formatPrice } from '@shared/utils';
import type { ChatRoomData } from '@shared/apis/chat';
import type { ReactNode } from 'react';

type ChatConversationHeaderProps = {
  room: ChatRoomData;
  statusDropdown: ReactNode;
};

export const ChatConversationHeader = ({ room, statusDropdown }: ChatConversationHeaderProps) => {
  return (
    <div className="rounded-(--radius-l) bg-gray-900 px-4 py-4 xl:h-[167px] xl:px-[42px] xl:py-[44px]">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {room.thumbnail ? (
            <img
              src={room.thumbnail}
              alt={room.postTitle}
              loading="lazy"
              className="rounded-m h-[80px] w-[80px] object-cover"
            />
          ) : (
            <div className="rounded-m h-[80px] w-[80px] bg-gray-200" />
          )}
          <div className="flex flex-col gap-[6px]">
            <span className="typo-body-1 text-white">{room.postTitle}</span>
            <span className="typo-body-2 text-white">{formatPrice(room.postPrice)}</span>
            <span className="typo-caption-2 text-white">{formatDate(room.postCreatedAt)}</span>
          </div>
        </div>

        {statusDropdown}
      </div>
    </div>
  );
};
