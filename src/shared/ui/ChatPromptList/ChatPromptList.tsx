import { chatPromptListVariants } from './ChatPromptList.variants';
import type { ComponentPropsWithoutRef } from 'react';
import type { VariantProps } from 'tailwind-variants';

export type ChatPromptListProps = ComponentPropsWithoutRef<'div'> &
  VariantProps<typeof chatPromptListVariants> & {
    prompts: string[];
    onPromptClick?: (prompt: string, index: number) => void;
  };

export const ChatPromptList = ({ prompts, onPromptClick, className, size, tone, ...props }: ChatPromptListProps) => {
  const styles = chatPromptListVariants({ tone, size });

  return (
    <div className={styles.root({ className })} {...props}>
      <ul className={styles.list()} role="list">
        {prompts.map((prompt, index) => (
          <li key={`${prompt}-${index}`}>
            <button
              type="button"
              className={styles.item({ tone, size })}
              onClick={() => onPromptClick?.(prompt, index)}
            >
              <span className={styles.text()}>{prompt}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
