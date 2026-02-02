import { Logo4 } from '@shared/assets/logo';
import { ChatInput } from '@shared/ui/ChatInput';
import { useEffect, useRef, useState } from 'react';
import { ChatMessageList } from './ChatMessageList';
import type { ChatMessage } from '../model/types';

const INITIAL_BOT_MESSAGE = `루핏이 예상 수리비를 빠르게 계산해드릴게요. 아래 3가지만 알려주세요. 
(견적은 추정치이며 실제 비용은 수리점/부품/상태에 따라 달라질 수 있어요.)

기종: 예) 아이폰 15, 갤럭시 S23

어디가 고장났는지: 예) 액정/배터리/카메라/후면/충전/침수

보험/케어 가입 여부: 예) 애플케어 O/X, 통신사 보험 O/X

가능하면 원하는 방향도 한 줄로 적어주세요: "정품 우선" / "최대한 저렴하게" / "빨리"

예시) “아이폰 15, 액정 깨짐, 애플케어 X, 최대한 저렴하게”

`;

const ChatbotPage = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'bot-initial',
      role: 'bot' as const,
      content: INITIAL_BOT_MESSAGE,
      status: 'done',
    },
  ]);
  const replyTimeoutRef = useRef<number | null>(null);
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    return () => {
      if (replyTimeoutRef.current) {
        window.clearTimeout(replyTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages]);

  const handleSend = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) {
      return;
    }

    const userId = `user-${Date.now()}`;
    const botId = `bot-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      { id: userId, role: 'user', content: trimmed, status: 'done' },
      { id: botId, role: 'bot', content: '답변을 준비 중이에요...', status: 'loading' },
    ]);
    setMessage('');

    if (replyTimeoutRef.current) {
      window.clearTimeout(replyTimeoutRef.current);
    }
    replyTimeoutRef.current = window.setTimeout(() => {
      setMessages((prev) =>
        prev.map((item) =>
          item.id === botId
            ? {
                ...item,
                status: 'done',
                content: '입력하신 내용으로 예상 수리비를 준비할게요.\n필요하면 기종/증상 상세를 더 알려주세요!',
              }
            : item
        )
      );
    }, 800);
  };

  return (
    <div className="w-full bg-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col bg-white xl:min-h-[1024px]">
        <main className="md:px-xxxl flex flex-1 flex-col px-(--margin-l) xl:px-0">
          <section className="mx-auto flex w-full max-w-full flex-col items-start gap-[19px] self-stretch pb-[140px] xl:max-w-[1200px]">
            <div className="gap-m md:gap-xl flex items-center xl:gap-[36px]">
              <div className="gap-xxs pt-xl pr-xxs pb-xl flex h-[64px] w-[64px] shrink-0 flex-col items-center justify-center rounded-full bg-black pl-[14px] md:h-[72px] md:w-[72px] md:pt-[26px] md:pr-[11px] md:pb-[28px] md:pl-[15px] xl:h-[80px] xl:w-[80px] xl:pt-[31px] xl:pr-[13px] xl:pb-[33px] xl:pl-[17px]">
                <Logo4 className="h-[80px] w-[80px] shrink-0" aria-hidden="true" />
              </div>
              <h1 className="typo-title-2 text-black">루핏봇</h1>
            </div>
            <ChatMessageList messages={messages} />
            <div ref={endOfMessagesRef} className="scroll-mb-[96px]" />
          </section>
          <div className="md:px-xxxl fixed inset-x-0 bottom-0 z-50 bg-white px-(--margin-l) pt-4 pb-(--margin-s) xl:px-[120px]">
            <div className="mx-auto w-full max-w-full xl:max-w-[1200px]">
              <ChatInput
                placeholder="무슨 견적을 원하시나요?"
                value={message}
                onChange={setMessage}
                onSend={handleSend}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChatbotPage;
