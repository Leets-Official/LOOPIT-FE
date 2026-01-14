import { textFieldVariants } from '@shared/ui/TextField/TextField.variants';
import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { TextFieldProps } from '@shared/ui/TextField/TextField.types';

const formatNumberWithComma = (digits: string) => {
  if (!digits) {
    return '';
  }
  // 앞의 0 처리 "0001" -> "1"
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
  const digitsValue = isPrice ? rawValue.replace(/\D/g, '') : rawValue;

  // Price: 콤마 포맷 표시
  const displayValue = useMemo(() => {
    if (!isPrice) {
      return digitsValue;
    }
    return formatNumberWithComma(digitsValue);
  }, [isPrice, digitsValue]);

  const currentLength = digitsValue.length;

  const showCounterInHeader = showCharacterCount && maxLen !== undefined && (isChar || isTextarea);

  const filled = digitsValue.length > 0 && !disabled && !error;

  const styles = textFieldVariants({
    error,
    disabled,
    filled,
    price: isPrice,
  });

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // TextArea autosize (최대 10줄, 이후 스크롤)
  useLayoutEffect(() => {
    if (!isTextarea) {
      return;
    }
    const el = textareaRef.current;
    if (!el) {
      return;
    }

    el.style.height = 'auto';

    const lineHeight = 24; // leading-[24px]
    const maxLines = 10;
    const maxHeight = lineHeight * maxLines;

    const nextHeight = Math.min(el.scrollHeight, maxHeight);
    el.style.height = `${nextHeight}px`;
    el.style.overflowY = el.scrollHeight > maxHeight ? 'auto' : 'hidden';
  }, [digitsValue, isTextarea]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let next = e.target.value;

    if (isPrice) {
      // 표시값(1,000) -> 숫자만(1000)
      next = next.replace(/\D/g, '');
      // consumer가 e.target.value 읽는 경우를 위해 숫자로 맞춰줌
      (e.target as HTMLInputElement).value = next;
    }

    if (!isControlled) {
      setUncontrolledValue(next);
    }
    onChange?.(e as React.ChangeEvent<HTMLInputElement>);
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
            value={digitsValue}
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
              value={displayValue}
              disabled={disabled}
              maxLength={maxLen}
              className={styles.input()}
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
