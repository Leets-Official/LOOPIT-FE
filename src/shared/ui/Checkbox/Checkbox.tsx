import { DoneIcon } from '@assets/icons';
import { checkboxVariants } from '@shared/ui/Checkbox/Checkbox.variants';
import { useState } from 'react';
import type { CheckboxProps } from '@shared/ui/Checkbox/Checkbox.types';

export const Checkbox = ({
  label,
  checked: controlledChecked,
  defaultChecked = false,
  disabled,
  focus,
  className,
  onChange,
  ...props
}: CheckboxProps) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultChecked);

  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : uncontrolledValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setUncontrolledValue(e.target.checked);
    }
    onChange?.(e);
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
        aria-label={label}
        {...props}
      />
      <span className={styles.box()}>
        <DoneIcon className={styles.icon()} />
      </span>
      {label && <span className={styles.label()}>{label}</span>}
    </label>
  );
};
