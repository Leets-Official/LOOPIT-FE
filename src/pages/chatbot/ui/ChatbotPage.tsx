import { Logo4 } from '@shared/assets/logo';
import { ChatBubble } from '@shared/ui/ChatBubble';
import { ChatInput } from '@shared/ui/ChatInput';
import { useState } from 'react';

export default function ChatbotPage() {
  const [message, setMessage] = useState('');
  const [userMessage, setUserMessage] = useState('');

  return (
    <div className="w-full bg-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col bg-white xl:min-h-[1024px]">
        <main className="flex flex-1 flex-col px-[var(--margin-l)] xl:px-[120px]">
          <section className="mt-[120px] flex w-full max-w-[1200px] flex-col items-start gap-[19px] self-stretch xl:mt-[187px]">
            <div className="flex items-center gap-[36px]">
              <div className="flex h-[80px] w-[80px] flex-shrink-0 flex-col items-center justify-center gap-[10px] rounded-full bg-black pt-[31px] pr-[13px] pb-[33px] pl-[17px]">
                <Logo4 className="h-[80px] w-[80px] flex-shrink-0" aria-hidden="true" />
              </div>
              <h1 className="typo-title-2 text-black">루핏봇</h1>
            </div>
            <div className="flex w-full flex-col items-end gap-[64px]">
              <div className="flex w-full justify-start">
                <ChatBubble
                  message={`루핏이 예상 수리비를 빠르게 계산해드릴게요. 아래 3가지만 알려주세요. 
(견적은 추정치이며 실제 비용은 수리점/부품/상태에 따라 달라질 수 있어요.)

기종: 예) 아이폰 15, 갤럭시 S23

어디가 고장났는지: 예) 액정/배터리/카메라/후면/충전/침수

보험/케어 가입 여부: 예) 애플케어 O/X, 통신사 보험 O/X

가능하면\u00A0원하는\u00A0방향도\u00A0한\u00A0줄로\u00A0적어주세요:\u00A0“정품\u00A0우선”\u00A0/\u00A0“최대한\u00A0저렴하\u2060게”\u00A0/\u00A0“빨리”

예시) “아이폰 15, 액정 깨짐, 애플케어 X, 최대한 저렴하게”`}
                  variant="chatbotNotice"
                />
              </div>
              {userMessage && (
                <div className="flex w-full items-end justify-end">
                  <ChatBubble message={userMessage} variant="sender" className="w-auto" />
                </div>
              )}
            </div>
          </section>
          <div className="mt-auto flex w-full justify-center pb-[16px]">
            <ChatInput
              placeholder="메시지를 입력하세요"
              value={message}
              onChange={setMessage}
              onSend={(value) => {
                setUserMessage(value);
                setMessage('');
              }}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
