import type { checkboxVariants } from '@shared/ui/Checkbox/Checkbox.variants';
import type { ComponentPropsWithoutRef } from 'react';
import type { VariantProps } from 'tailwind-variants';

type ControlledProps = {
  checked: boolean;
  defaultChecked?: never;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type UncontrolledProps = {
  checked?: never;
  defaultChecked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type CheckboxProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  'type' | 'checked' | 'defaultChecked' | 'onChange'
> &
  VariantProps<typeof checkboxVariants> & {
    label?: string;
  } & (ControlledProps | UncontrolledProps);
