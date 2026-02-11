import { ChatBubble } from '@shared/ui/ChatBubble';
import { useEffect, useRef } from 'react';
import { useTypingEffect } from '../model/useTypingEffect';

type TypingBotMessageProps = {
  content: string;
  onComplete: () => void;
};

export const TypingBotMessage = ({ content, onComplete }: TypingBotMessageProps) => {
  const { displayText, isTyping } = useTypingEffect(content, true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isTyping && displayText === content) {
      onComplete();
    }
  }, [isTyping, displayText, content, onComplete]);

  useEffect(() => {
    containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [displayText]);

  return (
    <div ref={containerRef}>
      <ChatBubble message={displayText} variant="chatbotNotice" />
    </div>
  );
};
