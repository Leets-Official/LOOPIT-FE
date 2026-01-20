import { SendIcon } from '@shared/assets/icons';
import { useState, type ChangeEventHandler, type KeyboardEventHandler } from 'react';
import { chatInputVariants } from './ChatInput.variants';

export interface ChatInputProps {
  placeholder?: string;
  onSend: (message: string) => void;
  value?: string;
  onChange?: (value: string) => void;
}

export const ChatInput = ({ placeholder, onSend, value, onChange }: ChatInputProps) => {
  const [internalMessage, setInternalMessage] = useState('');
  const [isFocused, setFocused] = useState(false);

  const isControlled = value !== undefined;
  const message = isControlled ? value : internalMessage;
  const trimmedMessage = message.trim();
  const isFilled = trimmedMessage.length > 0;

  const styles = chatInputVariants({
    state: isFocused ? (isFilled ? 'filled' : 'focused') : isFilled ? 'filled' : 'default',
    sendState: isFilled ? 'active' : 'inactive',
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
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

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter' && !event.nativeEvent.isComposing) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={styles.root()}>
      <div className={styles.wrapper()}>
        <input
          type="text"
          value={message}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={handleChange}
          className={styles.input()}
          placeholder={placeholder}
          aria-label={placeholder ?? 'Chat input'}
          onKeyDown={handleKeyDown}
        />
        <button type="button" className={styles.button()} onClick={handleSend} disabled={!isFilled} aria-label="Send">
          <SendIcon className={styles.icon()} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
