import { textFieldVariants } from '@shared/ui/TextField/TextField.variants';
import clsx from 'clsx';
import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { TextFieldProps } from '@shared/ui/TextField/TextField.types';

const TEXTAREA_LINE_HEIGHT = 24;
const TEXTAREA_MAX_LINES = 10;

const formatNumberWithComma = (digits: string) => {
  if (!digits) {
    return '';
  }
  const normalized = digits.replace(/^0+(?=\d)/, '');
  const n = Number(normalized);
  if (Number.isNaN(n)) {
    return '';
  }
  return new Intl.NumberFormat('ko-KR').format(n);
};

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
  const rawValue = isControlled ? controlledValue : uncontrolledValue;

  const isTextarea = type === 'textarea';
  const isChar = type === 'char';
  const isPrice = type === 'price';

  const maxLen = isChar ? 100 : (maxLength ?? (isTextarea ? 5000 : undefined));
  const normalizedValue = isPrice ? rawValue.replace(/\D/g, '') : rawValue;

  const displayValue = useMemo(() => {
    if (!isPrice) {
      return normalizedValue;
    }
    return formatNumberWithComma(normalizedValue);
  }, [isPrice, normalizedValue]);

  const currentLength = normalizedValue.length;

  const showCounterInHeader = showCharacterCount && maxLen !== undefined && (isChar || isTextarea);

  const filled = normalizedValue.length > 0 && !disabled && !error;

  const styles = textFieldVariants({
    error,
    disabled,
    filled,
    price: isPrice,
  });

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useLayoutEffect(() => {
    if (!isTextarea) {
      return;
    }
    const el = textareaRef.current;
    if (!el) {
      return;
    }

    el.style.height = 'auto';

    const maxHeight = TEXTAREA_LINE_HEIGHT * TEXTAREA_MAX_LINES;
    const nextHeight = Math.min(el.scrollHeight, maxHeight);
    el.style.height = `${nextHeight}px`;
    el.style.overflowY = el.scrollHeight > maxHeight ? 'auto' : 'hidden';
  }, [normalizedValue, isTextarea]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let next = e.target.value;

    if (isPrice) {
      next = next.replace(/\D/g, '');
      (e.target as HTMLInputElement).value = next;
    }

    if (!isControlled) {
      setUncontrolledValue(next);
    }
    onChange?.(e);
  };

  return (
    <div className={styles.root({ className })}>
      {(label || showCounterInHeader) && (
        <div className={styles.labelRow()}>
          {label && <label className={styles.label()}>{label}</label>}
          {showCounterInHeader && (
            <span className={styles.counter()}>
              {currentLength}/{maxLen}
            </span>
          )}
        </div>
      )}

      <div className={styles.fieldWrapper()}>
        {isTextarea ? (
          <textarea
            ref={textareaRef}
            value={normalizedValue}
            disabled={disabled}
            maxLength={maxLen}
            className={clsx(styles.fieldBase(), styles.textarea())}
            onChange={handleChange}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <>
            <input
              type="text"
              value={displayValue}
              disabled={disabled}
              maxLength={maxLen}
              className={clsx(styles.fieldBase(), styles.input())}
              onChange={handleChange}
              inputMode={isPrice ? 'numeric' : undefined}
              pattern={isPrice ? '[0-9]*' : undefined}
              {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
            />
            {isPrice && <span className={styles.suffix()}>원</span>}
          </>
        )}
      </div>

      {helperText && <span className={styles.helperText()}>{helperText}</span>}
    </div>
  );
};
