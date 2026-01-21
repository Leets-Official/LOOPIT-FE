import { textFieldVariants } from '@shared/ui/TextField/TextField.variants';
import clsx from 'clsx';
import { forwardRef, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { TextFieldProps } from '@shared/ui/TextField/TextField.types';

const TEXTAREA_LINE_HEIGHT = 24;
const TEXTAREA_MAX_LINES = 10;
const CHAR_MAX_LENGTH = 100;
const TEXTAREA_MAX_LENGTH = 5000;

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

const getMaxLength = ({
  isChar,
  isTextarea,
  maxLength,
}: {
  isChar: boolean;
  isTextarea: boolean;
  maxLength?: number;
}) => {
  if (isChar) {
    return CHAR_MAX_LENGTH;
  }
  if (maxLength !== undefined) {
    return maxLength;
  }
  return isTextarea ? TEXTAREA_MAX_LENGTH : undefined;
};

const assignRef = <T,>(target: React.ForwardedRef<T>, value: T | null) => {
  if (typeof target === 'function') {
    target(value);
  } else if (target) {
    target.current = value;
  }
};

export const TextField = forwardRef<HTMLInputElement | HTMLTextAreaElement, TextFieldProps>(
  (
    {
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
    },
    ref,
  ) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

  const isControlled = controlledValue !== undefined;
  const rawValue = isControlled ? controlledValue : uncontrolledValue;

  const isTextarea = type === 'textarea';
  const isChar = type === 'char';
  const isPrice = type === 'price';
  const isDate = type === 'date';

  const maxLen = getMaxLength({ isChar, isTextarea, maxLength });
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
    disabled: Boolean(disabled),
    filled,
    price: isPrice,
    date: isDate,
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
      let nextDigits = next.replace(/\D/g, '');

      if (maxLen !== undefined) {
        nextDigits = nextDigits.slice(0, maxLen);
      }
      next = nextDigits;
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
            ref={(node) => {
              textareaRef.current = node;
              assignRef(ref, node);
            }}
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
              type={isDate ? 'date' : 'text'}
              value={displayValue}
              disabled={disabled}
              maxLength={isPrice ? undefined : maxLen}
              className={clsx(styles.fieldBase(), styles.input())}
              onChange={handleChange}
              inputMode={isPrice ? 'numeric' : undefined}
              pattern={isPrice ? '[0-9]*' : undefined}
              ref={(node) => {
                assignRef(ref, node);
              }}
              {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
            />
            {isPrice && <span className={styles.suffix()}>원</span>}
          </>
        )}
      </div>

      {helperText && <span className={styles.helperText()}>{helperText}</span>}
    </div>
    );
  },
);

TextField.displayName = 'TextField';
