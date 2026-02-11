import { Logo4 } from '@shared/assets/logo';
import { ChatInput } from '@shared/ui/ChatInput';
import { LoadingFallback } from '@shared/ui/LoadingFallback';
import { useEffect, useRef } from 'react';
import { ChatMessageList } from './ChatMessageList';
import { useChatMessages } from '../model/useChatMessages';

const ChatbotPage = () => {
  const { displayMessages, isHistoryLoading, errorMessage, handleSend, handleTypingComplete } = useChatMessages();
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [displayMessages.length]);

  if (isHistoryLoading) {
    return <LoadingFallback message="대화를 불러오는 중" />;
  }

  return (
    <div className="w-full bg-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col bg-white xl:min-h-[1024px]">
        <main className="md:px-xxxl flex flex-1 flex-col px-(--margin-l) xl:px-0">
          <section className="mx-auto flex w-full max-w-full flex-1 flex-col items-start gap-[36px] self-stretch xl:max-w-[1200px]">
            <div className="gap-m md:gap-xl flex items-center xl:gap-[36px]">
              <div className="gap-xxs pt-xl pr-xxs pb-xl flex h-[64px] w-[64px] shrink-0 flex-col items-center justify-center rounded-full bg-black pl-[14px] md:h-[72px] md:w-[72px] md:pt-[26px] md:pr-[11px] md:pb-[28px] md:pl-[15px] xl:h-[80px] xl:w-[80px] xl:pt-[31px] xl:pr-[13px] xl:pb-[33px] xl:pl-[17px]">
                <Logo4 className="h-[80px] w-[80px] shrink-0" aria-hidden="true" />
              </div>
              <h1 className="typo-title-2 text-black">루핏봇</h1>
            </div>
            <ChatMessageList messages={displayMessages} onTypingComplete={handleTypingComplete} />
            {errorMessage && <div className="w-full text-center text-red-500">{errorMessage}</div>}
            <div ref={endOfMessagesRef} className="scroll-mb-[96px]" />
          </section>
          <div className="md:px-xxxl sticky bottom-0 z-50 bg-white px-(--margin-l) pt-1 pb-4 xl:px-[120px]">
            <div className="mx-auto w-full max-w-full xl:max-w-[1200px]">
              <ChatInput placeholder="무슨 견적을 원하시나요?" onSend={handleSend} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChatbotPage;
