import { radioButtonVariants } from '@shared/ui/RadioButton/RadioButton.variants';
import { useState, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import type { VariantProps } from 'tailwind-variants';

export type RadioButtonProps = Omit<ComponentPropsWithoutRef<'input'>, 'type'> &
  Omit<VariantProps<typeof radioButtonVariants>, 'checked'> & {
    label?: ReactNode;
    checked?: boolean;
  };

export const RadioButton = ({
  label,
  checked,
  disabled,
  focus: controlledFocus,
  className,
  onFocus,
  onBlur,
  ...props
}: RadioButtonProps) => {
  const [internalFocus, setInternalFocus] = useState(false);

  const focus = controlledFocus ?? internalFocus;

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (controlledFocus === undefined) {
      setInternalFocus(true);
    }
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (controlledFocus === undefined) {
      setInternalFocus(false);
    }
    onBlur?.(e);
  };

  const styles = radioButtonVariants({
    checked,
    disabled,
    focus,
  });

  return (
    <label className={styles.root({ className })}>
      <input
        type="radio"
        className="sr-only"
        checked={checked}
        disabled={disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...(typeof label === 'string' && { 'aria-label': label })}
        {...props}
      />

      <span className={styles.circle()}>
        <span className={styles.dot()} />
      </span>

      {label && <span className={styles.label()}>{label}</span>}
    </label>
  );
};
