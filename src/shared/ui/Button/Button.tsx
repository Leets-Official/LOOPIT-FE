import { buttonVariants } from '@shared/ui/Button/Button.variants';
import type { ComponentPropsWithoutRef } from 'react';
import type { VariantProps } from 'tailwind-variants';

export type ButtonProps = Omit<ComponentPropsWithoutRef<'button'>, 'type'> &
  VariantProps<typeof buttonVariants>;

export const Button = ({ children, variant, className, ...props }: ButtonProps) => {
  return (
    <button type="button" className={buttonVariants({ variant, className })} {...props}>
      {children}
    </button>
  );
};
