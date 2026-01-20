import { textFieldVariants } from '@shared/ui/TextField/TextField.variants';
import clsx from 'clsx';
import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { TextFieldProps } from '@shared/ui/TextField/TextField.types';

const TEXTAREA_LINE_HEIGHT = 24;
const TEXTAREA_MAX_LINES = 10;
const CHAR_MAX_LENGTH = 100;
const TEXTAREA_MAX_LENGTH = 5000;
const DATE_MAX_LENGTH = 8;

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

const formatDateWithSuffix = (digits: string) => {
  if (!digits) {
    return '';
  }

  const year = digits.slice(0, 4);
  const month = digits.slice(4, 6);
  const day = digits.slice(6, 8);

  let result = '';

  if (year) {
    result += year;
    if (year.length === 4) {
      result += '년';
      if (month) {
        result += ' ';
      }
    }
  }

  if (month) {
    result += month;
    if (month.length === 2) {
      result += '월';
      if (day) {
        result += ' ';
      }
    }
  }

  if (day) {
    result += day;
    if (day.length === 2) {
      result += '일';
    }
  }

  return result;
};

const getMaxLength = ({
  isChar,
  isTextarea,
  isDate,
  maxLength,
}: {
  isChar: boolean;
  isTextarea: boolean;
  isDate: boolean;
  maxLength?: number;
}) => {
  if (isChar) {
    return CHAR_MAX_LENGTH;
  }
  if (isDate) {
    return DATE_MAX_LENGTH;
  }
  if (maxLength !== undefined) {
    return maxLength;
  }
  return isTextarea ? TEXTAREA_MAX_LENGTH : undefined;
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
  const isDate = type === 'date';

  const maxLen = getMaxLength({ isChar, isTextarea, isDate, maxLength });
  const normalizedValue = isPrice || isDate ? rawValue.replace(/\D/g, '') : rawValue;

  const displayValue = useMemo(() => {
    if (!isPrice) {
      if (isDate) {
        return formatDateWithSuffix(normalizedValue);
      }
      return normalizedValue;
    }
    return formatNumberWithComma(normalizedValue);
  }, [isDate, isPrice, normalizedValue]);

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

    if (isPrice || isDate) {
      let nextDigits = next.replace(/\D/g, '');

      if (
        isDate &&
        nextDigits.length === normalizedValue.length &&
        next.length < displayValue.length &&
        normalizedValue.length > 0
      ) {
        nextDigits = normalizedValue.slice(0, -1);
      }

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
              maxLength={isPrice || isDate ? undefined : maxLen}
              className={clsx(styles.fieldBase(), styles.input())}
              onChange={handleChange}
              inputMode={isPrice || isDate ? 'numeric' : undefined}
              pattern={isPrice || isDate ? '[0-9]*' : undefined}
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
