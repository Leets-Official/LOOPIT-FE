import { DoneIcon } from '@assets/icons';
import { checkboxVariants } from '@shared/ui/Checkbox/Checkbox.variants';
import { useState } from 'react';
import type { CheckboxProps } from '@shared/ui/Checkbox/Checkbox.types';

export type { CheckboxProps };

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
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalChecked(e.target.checked);
    }
    onChange?.(e);
  };

  const {
    root,
    box,
    icon,
    label: labelStyle,
  } = checkboxVariants({
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
        onChange={handleChange}
        {...props}
      />
      <span className={box()}>{checked && <DoneIcon className={icon()} />}</span>
      {label && <span className={labelStyle()}>{label}</span>}
    </label>
  );
};
