import { type STATUS_OPTIONS } from '@shared/mocks/data/chat';
import { ChatBubble } from '@shared/ui/ChatBubble';
import { ChatInput } from '@shared/ui/ChatInput';
import { type RefObject } from 'react';
import { ChatConversationHeader } from './ChatConversationHeader';
import { ChatStatusDropdown } from './ChatStatusDropdown';
import type { ThreadContent } from '@shared/types/chat';

type ChatConversationProps = {
  activeThread: ThreadContent | null;
  hasSelection: boolean;
  message: string;
  messageListRef: RefObject<HTMLDivElement | null>;
  onSend: (message: string) => void;
  onMessageChange: (value: string) => void;
  onScroll: () => void;
  activeStatus: (typeof STATUS_OPTIONS)[number];
  onStatusChange: (value: (typeof STATUS_OPTIONS)[number]) => void;
};

export const ChatConversation = ({
  activeThread,
  hasSelection,
  message,
  messageListRef,
  onSend,
  onMessageChange,
  onScroll,
  activeStatus,
  onStatusChange,
}: ChatConversationProps) => {
  return (
    <section className="flex w-full flex-1 flex-col rounded-[24px] bg-gray-50 px-[22px] py-[22px] xl:h-[932px] xl:w-[690px] xl:max-w-[690px] xl:shrink-0">
      {!hasSelection ? (
        <div className="flex flex-1 items-center justify-center text-gray-400">대화방을 선택해 주세요.</div>
      ) : !activeThread ? (
        <div className="flex flex-1 items-center justify-center text-gray-400">아직 대화 기록이 없습니다.</div>
      ) : (
        <>
          <ChatConversationHeader
            thread={activeThread}
            statusDropdown={<ChatStatusDropdown activeStatus={activeStatus} onStatusChange={onStatusChange} />}
          />

          <div
            className="mt-[28px] flex min-h-0 flex-1 flex-col gap-[24px] overflow-y-auto pr-2"
            ref={messageListRef}
            onScroll={onScroll}
          >
            {activeThread.timeline.map((item) => {
              if (item.type === 'date') {
                return (
                  <div key={item.id} className="flex justify-center">
                    <span className="typo-caption-2 rounded-full bg-white px-4 py-2 text-gray-400">{item.label}</span>
                  </div>
                );
              }

              const isSender = item.role === 'sender';
              return (
                <ChatBubble
                  key={item.id}
                  variant={isSender ? 'sender' : 'receiver'}
                  message={item.message}
                  meta={item.meta}
                  metaDateTime={item.metaDateTime}
                />
              );
            })}
          </div>

          <div className="mt-[24px] w-full max-w-[647px]">
            <ChatInput placeholder="메시지를 입력하세요." value={message} onChange={onMessageChange} onSend={onSend} />
          </div>
        </>
      )}
    </section>
  );
};
