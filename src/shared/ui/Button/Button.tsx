import { buttonVariants } from '@shared/ui/Button/Button.variants';
import type { ComponentPropsWithoutRef } from 'react';
import type { VariantProps } from 'tailwind-variants';

export type ButtonProps = ComponentPropsWithoutRef<'button'> & VariantProps<typeof buttonVariants>;

export const Button = ({
  children,
  variant,
  size,
  className,
  onMouseUp,
  type = 'button',
  ...props
}: ButtonProps) => {
  const handleMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    onMouseUp?.(e);
    e.currentTarget.blur();
  };

  return (
    <button
      type={type}
      className={buttonVariants({ variant, size, className })}
      onMouseUp={handleMouseUp}
      {...props}
    >
      {children}
    </button>
  );
};
