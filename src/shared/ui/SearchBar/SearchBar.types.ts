import type { ComponentPropsWithoutRef } from 'react';

type ControlledProps = {
  value: string;
  defaultValue?: never;
};

type UncontrolledProps = {
  value?: never;
  defaultValue?: string;
};

export type SearchBarState = 'default' | 'filled';

export type SearchBarProps = Omit<ComponentPropsWithoutRef<'input'>, 'value' | 'defaultValue'> &
  (ControlledProps | UncontrolledProps) & {
    autoFilled?: boolean;
    state?: SearchBarState;
    className?: string;
  };
