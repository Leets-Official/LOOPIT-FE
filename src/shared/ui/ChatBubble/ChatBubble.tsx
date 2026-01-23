import { chatBubbleVariants } from './ChatBubble.variants';
import type { ComponentPropsWithoutRef } from 'react';
import type { VariantProps } from 'tailwind-variants';

export type ChatBubbleProps = ComponentPropsWithoutRef<'div'> &
  VariantProps<typeof chatBubbleVariants> & {
    message: string;
    meta?: string;
  };

export const ChatBubble = ({ message, meta, variant, className, ...props }: ChatBubbleProps) => {
  const styles = chatBubbleVariants({ variant });

  return (
    <div className={styles.root({ className })} role="listitem" {...props}>
      <div className={styles.bubble()}>
        <span className={styles.text()}>{message}</span>
      </div>
      {meta && <span className={styles.meta()}>{meta}</span>}
    </div>
  );
};
