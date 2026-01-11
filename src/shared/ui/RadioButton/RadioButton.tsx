import { radioButtonVariants } from '@shared/ui/RadioButton/RadioButton.variants';
import type { ComponentPropsWithoutRef } from 'react';
import type { VariantProps } from 'tailwind-variants';

export type RadioButtonProps =
  ComponentPropsWithoutRef<'input'> &
  VariantProps<typeof radioButtonVariants> & {
    label?: string;
  };

export const RadioButton = ({
  label,
  checked,
  disabled,
  className,
  ...props
}: RadioButtonProps) => {
  const { root, circle, dot, label: labelStyle } =
    radioButtonVariants({ checked, disabled });

  return (
    <label className={root({ className })}>
      <input
        type="radio"
        className="sr-only"
        checked={checked}
        disabled={disabled}
        {...props}
      />

      <span className={circle()}>
        <span className={dot()} />
      </span>

      {label && <span className={labelStyle()}>{label}</span>}
    </label>
  );
};
