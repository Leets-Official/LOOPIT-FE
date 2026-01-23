import { ChatbotIcon } from '@shared/assets/icons';
import type { ComponentPropsWithoutRef } from 'react';
import { chatbotFloatingButtonVariants } from './ChatbotFloatingButton.variants';

export type ChatbotFloatingButtonProps = ComponentPropsWithoutRef<'button'> & {
  label?: string;
};

export const ChatbotFloatingButton = ({
  label = '챗봇상담',
  className,
  type = 'button',
  ...props
}: ChatbotFloatingButtonProps) => {
  const styles = chatbotFloatingButtonVariants();

  return (
    <button
      type={type}
      className={styles.root({ className })}
      aria-label={label}
      {...props}
    >
      <span className={styles.content()}>
        <ChatbotIcon className={styles.icon()} aria-hidden="true" />
        <span className={styles.label()}>{label}</span>
      </span>
    </button>
  );
};
