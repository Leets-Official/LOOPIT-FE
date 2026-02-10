import { ChevronLeftMdIcon } from '@shared/assets/icons';
import { ChatBubble } from '@shared/ui/ChatBubble';
import { ChatInput } from '@shared/ui/ChatInput';
import { formatChatTime } from '@shared/utils';
import { cn } from '@shared/utils/cn';
import { type RefObject } from 'react';
import { ChatConversationHeader } from './ChatConversationHeader';
import { ChatStatusDropdown } from './ChatStatusDropdown';
import type { ChatMessageItem, ChatRoomData, PostStatus } from '@shared/apis/chat';

type ChatConversationProps = {
  room: ChatRoomData | null;
  messages: ChatMessageItem[];
  currentUserId: number;
  hasSelection: boolean;
  isSeller: boolean;
  isLoading: boolean;
  messageListRef: RefObject<HTMLDivElement | null>;
  onSend: (message: string) => void;
  onScroll: () => void;
  activeStatus: PostStatus;
  onStatusChange: (value: PostStatus) => void;
  onBack: () => void;
};

export const ChatConversation = ({
  room,
  messages,
  currentUserId,
  hasSelection,
  isSeller,
  isLoading,
  messageListRef,
  onSend,
  onScroll,
  activeStatus,
  onStatusChange,
  onBack,
}: ChatConversationProps) => {
  return (
    <section
      className={cn(
        'h-[calc(100dvh-120px)] w-full flex-col rounded-[24px] bg-gray-50 px-[22px] py-[22px]',
        'xl:h-[932px] xl:w-[690px] xl:max-w-[690px] xl:flex-none xl:shrink-0',
        hasSelection ? 'flex' : 'hidden xl:flex'
      )}
    >
      {!hasSelection ? (
        <div className="flex flex-1 items-center justify-center text-gray-400">대화방을 선택해 주세요.</div>
      ) : isLoading || !room ? (
        <div className="flex flex-1 items-center justify-center text-gray-400">채팅방 정보를 불러오는 중...</div>
      ) : (
        <>
          <button
            type="button"
            onClick={onBack}
            className="mb-3 flex items-center gap-1 text-gray-600 xl:hidden"
            aria-label="뒤로 가기"
          >
            <ChevronLeftMdIcon className="h-5 w-5" />
            <span className="typo-body-2">목록</span>
          </button>
          <ChatConversationHeader
            room={room}
            statusDropdown={
              isSeller ? (
                <ChatStatusDropdown activeStatus={activeStatus} onStatusChange={onStatusChange} />
              ) : (
                <span
                  className={`text-l leading-m font-semibold ${activeStatus === '판매완료' ? 'text-gray-400' : 'text-brand-primary'}`}
                >
                  {activeStatus}
                </span>
              )
            }
          />

          <div
            className="mt-m gap-xl xl:mt-xxl flex min-h-0 flex-1 flex-col overflow-y-auto pr-2"
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
                  meta={formatChatTime(msg.sendTime, msg.read, isSender)}
                  metaDateTime={msg.sendTime}
                />
              );
            })}
          </div>

          <div className="mt-xs xl:mt-xl w-full max-w-[647px] xl:sticky xl:bottom-4">
            <ChatInput placeholder="메시지를 입력하세요." onSend={onSend} />
          </div>
        </>
      )}
    </section>
  );
};
