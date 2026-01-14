import type { textFieldVariants } from '@shared/ui/TextField/TextField.variants';
import type { ChangeEventHandler, ComponentPropsWithoutRef } from 'react';
import type { VariantProps } from 'tailwind-variants';

/** TextField 타입 */
export type TextFieldType = 'text' | 'char' | 'textarea' | 'price';

/** Controlled / Uncontrolled */
type ControlledTextFieldProps = {
  value: string;
  defaultValue?: never;
};

type UncontrolledTextFieldProps = {
  value?: never;
  defaultValue?: string;
};

/** 공통 Props */
type BaseProps = {
  type?: TextFieldType;
  label?: string;
  error?: boolean;
  helperText?: string;
  maxLength?: number;
  showCharacterCount?: boolean;
  className?: string;
};

/** input / textarea 공통 이벤트 */
type CommonChangeHandler = ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

export type TextFieldProps = BaseProps &
  VariantProps<typeof textFieldVariants> &
  (ControlledTextFieldProps | UncontrolledTextFieldProps) &
  Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'value' | 'defaultValue' | 'onChange'> &
  Omit<ComponentPropsWithoutRef<'textarea'>, 'value' | 'defaultValue' | 'onChange'> & {
    onChange?: CommonChangeHandler;
  };
