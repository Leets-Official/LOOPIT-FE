import { buttonVariants } from '@shared/ui/Button/Button.variants';
import type { ComponentPropsWithoutRef } from 'react';
import type { VariantProps } from 'tailwind-variants';

export type ButtonProps = ComponentPropsWithoutRef<'button'> & VariantProps<typeof buttonVariants>;

export const Button = ({ children, variant, className, ...props }: ButtonProps) => {
  return (
    <button className={buttonVariants({ variant, className })} {...props}>
      {children}
    </button>
  );
};
