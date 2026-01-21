import { SendIcon } from '@shared/assets/icons';
import { useLayoutEffect, useRef, useState, type ChangeEventHandler, type KeyboardEventHandler } from 'react';
import { chatInputVariants } from './ChatInput.variants';

const TEXTAREA_LINE_HEIGHT = 24;
const TEXTAREA_MAX_LINES = 4;

export interface ChatInputProps {
  placeholder?: string;
  onSend: (message: string) => void;
  value?: string;
  onChange?: (value: string) => void;
}

export const ChatInput = ({ placeholder, onSend, value, onChange }: ChatInputProps) => {
  const [internalMessage, setInternalMessage] = useState('');
  const [isFocused, setFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const isControlled = value !== undefined;
  const message = isControlled ? value : internalMessage;
  const trimmedMessage = message.trim();
  const isFilled = trimmedMessage.length > 0;

  const styles = chatInputVariants({
    state: isFocused ? (isFilled ? 'filled' : 'focused') : isFilled ? 'filled' : 'default',
    sendState: isFilled ? 'active' : 'inactive',
  });

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    const nextValue = event.target.value;
    if (isControlled) {
      onChange?.(nextValue);
    } else {
      setInternalMessage(nextValue);
    }
  };

  const handleSend = () => {
    if (!trimmedMessage) {
      return;
    }

    onSend(trimmedMessage);

    if (isControlled) {
      onChange?.('');
    } else {
      setInternalMessage('');
    }
  };

  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
    if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      handleSend();
    }
  };

  useLayoutEffect(() => {
    const element = textareaRef.current;
    if (!element) {
      return;
    }

    element.style.height = 'auto';
    const maxHeight = TEXTAREA_LINE_HEIGHT * TEXTAREA_MAX_LINES;
    const nextHeight = Math.min(element.scrollHeight, maxHeight);
    element.style.height = `${nextHeight}px`;
    element.style.overflowY = element.scrollHeight > maxHeight ? 'auto' : 'hidden';
  }, [message]);

  return (
    <div className={styles.root()}>
      <div className={styles.wrapper()}>
        <textarea
          ref={textareaRef}
          value={message}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={handleChange}
          className={styles.input()}
          placeholder={placeholder}
          aria-label={placeholder ?? 'Chat input'}
          onKeyDown={handleKeyDown}
          rows={1}
        />
        <button type="button" className={styles.button()} onClick={handleSend} disabled={!isFilled} aria-label="Send">
          <SendIcon className={styles.icon()} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
