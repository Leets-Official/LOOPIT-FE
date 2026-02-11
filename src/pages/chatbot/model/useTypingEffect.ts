import { useEffect, useRef, useState } from 'react';

const TYPING_INTERVAL = 10;
const CHARS_PER_TICK = 3;

export const useTypingEffect = (text: string, enabled: boolean) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!enabled || !text) {
      setDisplayText(text);
      setIsTyping(false);
      return;
    }

    setIsTyping(true);
    indexRef.current = 0;
    setDisplayText('');

    const interval = setInterval(() => {
      indexRef.current += CHARS_PER_TICK;
      setDisplayText(text.slice(0, indexRef.current));

      if (indexRef.current >= text.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, TYPING_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, [text, enabled]);

  return { displayText, isTyping };
};
