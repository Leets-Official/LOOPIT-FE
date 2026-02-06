import { ChatBubble } from '@shared/ui/ChatBubble';
import { ChatInput } from '@shared/ui/ChatInput';
import { type RefObject } from 'react';
import { ChatConversationHeader } from './ChatConversationHeader';
import { ChatStatusDropdown } from './ChatStatusDropdown';
import type { ChatMessageItem, ChatRoomData } from '@shared/apis/chat';

type PostStatus = '판매중' | '예약중' | '판매완료';

type ChatConversationProps = {
  room: ChatRoomData | null;
  messages: ChatMessageItem[];
  currentUserId: number;
  hasSelection: boolean;
  messageListRef: RefObject<HTMLDivElement | null>;
  onSend: (message: string) => void;
  onScroll: () => void;
  activeStatus: PostStatus;
  onStatusChange: (value: PostStatus) => void;
};

const formatMeta = (sendTime: string, isRead: boolean, isSender: boolean) => {
  const date = new Date(sendTime);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const meridiem = hours >= 12 ? '오후' : '오전';
  const hourLabel = `${hours % 12 === 0 ? 12 : hours % 12}`.padStart(2, '0');
  const minuteLabel = `${minutes}`.padStart(2, '0');
  const timeStr = `${meridiem} ${hourLabel}:${minuteLabel}`;
  return isSender && isRead ? `읽음 · ${timeStr}` : timeStr;
};

export const ChatConversation = ({
  room,
  messages,
  currentUserId,
  hasSelection,
  messageListRef,
  onSend,
  onScroll,
  activeStatus,
  onStatusChange,
}: ChatConversationProps) => {
  return (
    <section className="flex w-full flex-1 flex-col rounded-[24px] bg-gray-50 px-[22px] py-[22px] xl:h-[932px] xl:w-[690px] xl:max-w-[690px] xl:shrink-0">
      {!hasSelection ? (
        <div className="flex flex-1 items-center justify-center text-gray-400">대화방을 선택해 주세요.</div>
      ) : !room ? (
        <div className="flex flex-1 items-center justify-center text-gray-400">채팅방 정보를 불러오는 중...</div>
      ) : (
        <>
          <ChatConversationHeader
            room={room}
            statusDropdown={<ChatStatusDropdown activeStatus={activeStatus} onStatusChange={onStatusChange} />}
          />

          <div
            className="mt-xxl gap-xl flex min-h-0 flex-1 flex-col overflow-y-auto pr-2"
            ref={messageListRef}
            onScroll={onScroll}
          >
            {messages.map((msg) => {
              const isSender = msg.senderId === currentUserId;
              return (
                <ChatBubble
                  key={msg.messageId}
                  variant={isSender ? 'sender' : 'receiver'}
                  message={msg.content}
                  meta={formatMeta(msg.sendTime, msg.read, isSender)}
                  metaDateTime={msg.sendTime}
                />
              );
            })}
          </div>

          <div className="mt-xl w-full max-w-[647px]">
            <ChatInput placeholder="메시지를 입력하세요." onSend={onSend} />
          </div>
        </>
      )}
    </section>
  );
};
