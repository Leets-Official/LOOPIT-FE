import { Logo4 } from '@shared/assets/logo';
import { ChatInput } from '@shared/ui/ChatInput';
import { useEffect, useRef, useState } from 'react';
import { ChatMessageList, type ChatMessage } from './ChatMessageList';

export default function ChatbotPage() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'bot-initial',
      role: 'bot' as const,
      content: `루핏이 예상 수리비를 빠르게 계산해드릴게요. 아래 3가지만 알려주세요. 
(견적은 추정치이며 실제 비용은 수리점/부품/상태에 따라 달라질 수 있어요.)

기종: 예) 아이폰 15, 갤럭시 S23

어디가 고장났는지: 예) 액정/배터리/카메라/후면/충전/침수

보험/케어 가입 여부: 예) 애플케어 O/X, 통신사 보험 O/X

가능하면\u00A0원하는\u00A0방향도\u00A0한\u00A0줄로\u00A0적어주세요:\u00A0“정품\u00A0우선”\u00A0/\u00A0“최대한\u00A0저렴하\u2060게”\u00A0/\u00A0“빨리”

예시) “아이폰 15, 액정 깨짐, 애플케어 X, 최대한 저렴하게”

`,
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

  return (
    <div className="w-full bg-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col bg-white xl:min-h-[1024px]">
        <main className="flex flex-1 flex-col px-[var(--margin-l)] md:px-[40px] xl:px-[120px]">
          <section className="flex w-full max-w-full flex-col items-start gap-[19px] self-stretch pb-[140px] xl:max-w-[1200px]">
            <div className="flex items-center gap-[16px] md:gap-[24px] xl:gap-[36px]">
              <div className="flex h-[64px] w-[64px] flex-shrink-0 flex-col items-center justify-center gap-[10px] rounded-full bg-black pt-[24px] pr-[10px] pb-[24px] pl-[14px] md:h-[72px] md:w-[72px] md:pt-[26px] md:pr-[11px] md:pb-[28px] md:pl-[15px] xl:h-[80px] xl:w-[80px] xl:pt-[31px] xl:pr-[13px] xl:pb-[33px] xl:pl-[17px]">
                <Logo4 className="h-[32px] w-[32px] flex-shrink-0 md:h-[36px] md:w-[36px] xl:h-[38.862px] xl:w-[38.998px]" aria-hidden="true" />
              </div>
              <h1 className="typo-title-2 text-black">루핏봇</h1>
            </div>
            <ChatMessageList messages={messages} />
            <div ref={endOfMessagesRef} className="scroll-mb-[96px]" />
          </section>
          <div className="fixed inset-x-0 bottom-[16px] z-50 px-[var(--margin-l)] md:px-[40px] xl:px-[120px]">
            <div className="mx-auto w-full max-w-full xl:max-w-[1200px]">
              <ChatInput
                placeholder="메시지를 입력하세요"
                value={message}
                onChange={setMessage}
                onSend={(value) => {
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
                              content:
                                '입력하신 내용으로 예상 수리비를 준비할게요.\n필요하면 기종/증상 상세를 더 알려주세요!',
                            }
                          : item,
                      ),
                    );
                  }, 800);
                }}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
