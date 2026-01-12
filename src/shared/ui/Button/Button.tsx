import { buttonVariants } from '@shared/ui/Button/Button.variants';
import type { ComponentPropsWithoutRef } from 'react';
import type { VariantProps } from 'tailwind-variants';

export type ButtonProps = Omit<ComponentPropsWithoutRef<'button'>, 'type'> &
  VariantProps<typeof buttonVariants>;

export const Button = ({ children, variant, className, onMouseUp, ...props }: ButtonProps) => {
  const handleMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    onMouseUp?.(e);
    e.currentTarget.blur();
  };

  return (
    <button
      type="button"
      className={buttonVariants({ variant, className })}
      onMouseUp={handleMouseUp}
      {...props}
    >
      {children}
    </button>
  );
};
