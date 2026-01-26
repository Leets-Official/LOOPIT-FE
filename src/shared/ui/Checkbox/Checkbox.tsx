import { DoneIcon } from '@shared/assets/icons';
import { checkboxVariants } from '@shared/ui/Checkbox/Checkbox.variants';
import { useState } from 'react';
import type { CheckboxProps } from '@shared/ui/Checkbox/Checkbox.types';

export const Checkbox = ({
  label,
  checked: controlledChecked,
  defaultChecked = false,
  disabled,
  focus: controlledFocus,
  className,
  onChange,
  onFocus,
  onBlur,
  ...props
}: CheckboxProps) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultChecked);
  const [internalFocus, setInternalFocus] = useState(false);

  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : uncontrolledValue;
  const focus = controlledFocus ?? internalFocus;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setUncontrolledValue(e.target.checked);
    }
    onChange?.(e);
  };

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

  const styles = checkboxVariants({ checked, disabled, focus });

  return (
    <label className={styles.root({ className })}>
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...(label && { 'aria-label': label })}
        {...props}
      />
      <span className={styles.box()}>
        <DoneIcon className={styles.icon()} />
      </span>
      {label && <span className={styles.label()}>{label}</span>}
    </label>
  );
};
