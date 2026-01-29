import { ChatBubble } from '@shared/ui/ChatBubble';

export type ChatMessage = {
  id: string;
  role: 'bot' | 'user';
  content: string;
  status?: 'loading' | 'done';
};

type ChatMessageListProps = {
  messages: ChatMessage[];
};

export const ChatMessageList = ({ messages }: ChatMessageListProps) => {
  if (messages.length === 0) {
    return null;
  }

  return (
    <div className="flex w-full flex-col items-end gap-[64px]">
      {messages.map((message) => {
        const isBot = message.role === 'bot';
        if (isBot) {
          return (
            <div key={message.id} className="flex w-full justify-start">
              {message.status === 'loading' ? (
                <div className="inline-flex min-h-[60px] items-center justify-start gap-[8px] rounded-(--radius-l) bg-gray-100 px-[31px] py-[18px]">
                  <span className="h-[6px] w-[6px] animate-bounce rounded-full bg-gray-400 [animation-delay:-0.2s]" />
                  <span className="h-[6px] w-[6px] animate-bounce rounded-full bg-gray-400 [animation-delay:-0.1s]" />
                  <span className="h-[6px] w-[6px] animate-bounce rounded-full bg-gray-400" />
                </div>
              ) : (
                <ChatBubble message={message.content} variant="chatbotNotice" />
              )}
            </div>
          );
        }

        return (
          <div key={message.id} className="flex w-full items-end justify-end">
            <ChatBubble message={message.content} variant="sender" className="w-auto" />
          </div>
        );
      })}
    </div>
  );
};
