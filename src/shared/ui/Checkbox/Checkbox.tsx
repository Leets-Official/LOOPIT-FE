import { checkboxVariants } from '@shared/ui/Checkbox/Checkbox.variants';
import type { ComponentPropsWithoutRef } from 'react';
import type { VariantProps } from 'tailwind-variants';

export type CheckboxProps =
  ComponentPropsWithoutRef<'input'> &
  VariantProps<typeof checkboxVariants> & {
    label?: string;
  };

export const Checkbox = ({
  label,
  checked,
  disabled,
  focus,
  className,
  ...props
}: CheckboxProps) => {
  const { root, box, icon, label: labelStyle } = checkboxVariants({
    checked,
    disabled,
    focus,
  });

  return (
    <label className={root({ className })}>
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        disabled={disabled}
        {...props}
      />

      <span className={box()}>
        {checked && (
          <svg
            className={icon()}
            width="11"
            height="8"
            viewBox="0 0 11 8"
            fill="none"
          >
            <path
              d="M10.0833 0.75L3.66667 7.16667L0.75 4.25"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>

      {label && <span className={labelStyle()}>{label}</span>}
    </label>
  );
};
