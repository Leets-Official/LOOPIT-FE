import { textFieldVariants } from '@shared/ui/TextField/TextField.variants';
import clsx from 'clsx';
import { forwardRef, useState } from 'react';
import type { DateFieldProps } from '@shared/ui/TextField/TextField.types';

const formatDateValue = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  const chars = digits.split('');
  let result = '';

  for (let i = 0; i < chars.length && i < 8; i++) {
    if (i === 4 || i === 6) {
      result += '-';
    }
    result += chars[i];
  }

  return result;
};

export const DateField = forwardRef<HTMLInputElement, DateFieldProps>(
  ({ error, disabled, helperText, className, onChange, defaultValue = '', value: controlledValue, ...props }, ref) => {
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;

    const filled = value.length > 0 && !disabled && !error;

    const styles = textFieldVariants({
      error,
      disabled: Boolean(disabled),
      filled,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatDateValue(e.target.value);
      e.target.value = formatted;

      if (!isControlled) {
        setUncontrolledValue(formatted);
      }
      onChange?.(e);
    };

    return (
      <div className={styles.root({ className })}>
        <div className={styles.fieldWrapper()}>
          <input
            ref={ref}
            type="text"
            inputMode="numeric"
            placeholder="YYYY-MM-DD"
            maxLength={10}
            value={value}
            disabled={disabled}
            className={clsx(styles.fieldBase(), styles.input())}
            onChange={handleChange}
            {...props}
          />
        </div>
        {helperText && <span className={styles.helperText()}>{helperText}</span>}
      </div>
    );
  }
);

DateField.displayName = 'DateField';
