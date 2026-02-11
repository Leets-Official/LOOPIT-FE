import { Profile } from '@shared/ui/Profile';
import { formatDateLabel } from '@shared/utils';
import { cn } from '@shared/utils/cn';
import type { ChatRoomListItem } from '@shared/apis/chat';

type ChatThreadListProps = {
  rooms: ChatRoomListItem[];
  selectedRoomId: number | null;
  onSelect: (roomId: number) => void;
};

export const ChatThreadList = ({ rooms, selectedRoomId, onSelect }: ChatThreadListProps) => {
  return (
    <aside className="xl:px-xxs flex w-full flex-col gap-4 lg:gap-6 xl:h-full xl:w-[510px] xl:max-w-[510px] xl:shrink-0">
      <h1 className="typo-title-2 text-gray-900">대화목록</h1>
      <div className="gap-xs flex min-h-0 flex-1 flex-col overflow-y-auto pr-2">
        {rooms.map((room) => {
          const isActive = room.roomId === selectedRoomId;
          const isUnread = room.hasUnreadMessages;
          return (
            <button
              key={room.roomId}
              type="button"
              onClick={() => onSelect(room.roomId)}
              className={cn(
                'gap-xxs rounded-m px-l py-l flex h-[130px] w-full cursor-pointer items-center text-left transition-colors',
                isActive ? 'bg-gray-50' : 'hover:bg-gray-50'
              )}
              aria-pressed={isActive}
            >
              <Profile size="chat" image={room.partnerProfileImage} alt={`${room.partnerNickname} 프로필`} />
              <div className="gap-xxxs flex flex-1 flex-col">
                <span className={cn('typo-title-3 text-gray-900', isUnread && 'font-bold text-black')}>
                  {room.partnerNickname}
                </span>
                <span
                  className={cn(
                    'typo-body-2 flex items-center gap-2 font-semibold',
                    isUnread ? 'text-gray-900' : 'text-gray-500'
                  )}
                >
                  {isUnread && <span className="bg-brand-primary h-xxxs w-xxxs rounded-full" aria-hidden="true" />}
                  {room.lastMessage}
                </span>
                <span className="typo-caption-1 text-gray-400">{formatDateLabel(room.lastMessageAt)}</span>
              </div>
              <div className="h-[80px] w-[80px] shrink-0 overflow-hidden rounded-(--radius-s) bg-gray-100">
                {room.thumbnail ? (
                  <img
                    src={room.thumbnail}
                    alt={`${room.partnerNickname} 상품 이미지`}
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
