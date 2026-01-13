import { textFieldVariants } from '@shared/ui/TextField/TextField.variants';
import { useState } from 'react';
import type { TextFieldProps } from '@shared/ui/TextField/TextField.types';

export const TextField = ({
  label,
  value: controlledValue,
  defaultValue = '',
  disabled,
  error,
  helperText,
  maxLength,
  showCharacterCount = true,
  type = 'text',
  className,
  onChange,
  ...props
}: TextFieldProps) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!isControlled) {
      setUncontrolledValue(e.target.value);
    }
    onChange?.(e as React.ChangeEvent<HTMLInputElement>);
  };

  const styles = textFieldVariants({ error, disabled });

  const isTextarea = type === 'textarea';
  const isChar = type === 'char';
  const isPrice = type === 'price';

  const currentLength = value.length;
  const maxLen = maxLength ?? (isChar ? 100 : isTextarea ? 5000 : undefined);

  const showCounterInLabelRow = showCharacterCount && maxLen !== undefined && !isChar && isTextarea;
  const showCounterInField = showCharacterCount && maxLen !== undefined && isChar;

  return (
    <div className={styles.root({ className })}>
      {label && <label className={styles.label()}>{label}</label>}

      {showCounterInLabelRow && (
        <div className={styles.labelRow()}>
          {showCounterInLabelRow && (
            <span className={styles.counter()}>
              {currentLength}/{maxLen}
            </span>
          )}
        </div>
      )}

      <div className={styles.fieldWrapper()}>
        {isTextarea ? (
          <textarea
            value={value}
            disabled={disabled}
            maxLength={maxLen}
            className={styles.textarea()}
            onChange={handleChange}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <>
            <input
              type="text"
              value={value}
              disabled={disabled}
              maxLength={maxLen}
              className={styles.input()}
              onChange={handleChange}
              {...props}
            />
            {isPrice && <span className={styles.suffix()}>원</span>}
          </>
        )}
        {showCounterInField && (
          <span className={styles.counter({ char: isChar })}>
            {currentLength}/{maxLen}
          </span>
        )}
      </div>

      {helperText && <span className={styles.helperText()}>{helperText}</span>}
    </div>
  );
};
