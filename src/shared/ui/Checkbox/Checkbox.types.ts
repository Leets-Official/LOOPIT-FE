import type { checkboxVariants } from '@shared/ui/Checkbox/Checkbox.variants';
import type { ComponentPropsWithoutRef } from 'react';
import type { VariantProps } from 'tailwind-variants';

type ControlledCheckboxProps = {
  checked: boolean;
  defaultChecked?: never;
};

type UncontrolledCheckboxProps = {
  checked?: never;
  defaultChecked?: boolean;
};

export type CheckboxProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  'type' | 'checked' | 'defaultChecked' | 'onChange'
> &
  Omit<VariantProps<typeof checkboxVariants>, 'checked'> & {
    label?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  } & (ControlledCheckboxProps | UncontrolledCheckboxProps);
