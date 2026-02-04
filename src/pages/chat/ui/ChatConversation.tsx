import { CaretDownMdIcon } from '@shared/assets/icons';
import { useClickOutside, useModal } from '@shared/hooks';
import { STATUS_OPTIONS } from '@shared/mocks/data/chat';
import { ChatBubble } from '@shared/ui/ChatBubble';
import { ChatInput } from '@shared/ui/ChatInput';
import { cn } from '@shared/utils/cn';
import { useRef, type RefObject } from 'react';
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
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { isOpen, toggle, close } = useModal();

  useClickOutside(dropdownRef, isOpen, close);

  const statusClassName = activeStatus === '판매완료' ? 'text-gray-400' : 'text-brand-primary';

  return (
    <section className="flex w-full flex-1 flex-col rounded-[24px] bg-gray-50 px-[22px] py-[22px] xl:h-[932px] xl:w-[690px] xl:max-w-[690px] xl:shrink-0">
      {!hasSelection ? (
        <div className="flex flex-1 items-center justify-center text-gray-400">대화방을 선택해 주세요.</div>
      ) : !activeThread ? (
        <div className="flex flex-1 items-center justify-center text-gray-400">아직 대화 기록이 없습니다.</div>
      ) : (
        <>
          <div className="h-[167px] rounded-(--radius-l) bg-gray-900 px-[42px] py-[44px]">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {activeThread.product.image ? (
                  <img
                    src={activeThread.product.image}
                    alt={activeThread.product.title}
                    className="h-[80px] w-[80px] rounded-(--radius-m) object-cover"
                  />
                ) : (
                  <div className="h-[80px] w-[80px] rounded-(--radius-m) bg-gray-200" />
                )}
                <div className="flex flex-col gap-[6px]">
                  <span className="typo-body-1 text-white">{activeThread.product.title}</span>
                  <span className="typo-body-2 text-white">{activeThread.product.price}</span>
                  <span className="typo-caption-2 text-white">{activeThread.product.date}</span>
                </div>
              </div>

              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  className={cn(
                    'inline-flex h-[24px] items-center gap-[6px] text-[20px] leading-[24px] font-semibold',
                    statusClassName
                  )}
                  onClick={toggle}
                >
                  {activeStatus}
                  <CaretDownMdIcon className={cn('h-[14px] w-[14px]', statusClassName)} />
                </button>
                {isOpen && (
                  <div className="absolute top-full right-0 mt-2 flex h-[95px] w-[96px] flex-col items-center justify-center gap-[21px] rounded-(--radius-s) bg-gradient-to-b from-[#48484A]/80 to-[#636366]/80 shadow-lg">
                    {STATUS_OPTIONS.filter((option) => option !== activeStatus).map((option) => (
                      <button
                        key={option}
                        type="button"
                        className={cn(
                          'text-brand-primary flex h-[24px] w-[70px] items-center justify-center text-[20px] leading-[24px] font-semibold opacity-100'
                        )}
                        onClick={() => {
                          onStatusChange(option);
                          close();
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

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
