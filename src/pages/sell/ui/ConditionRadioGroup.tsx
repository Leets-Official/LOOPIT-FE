import { RadioButton } from '@shared/ui';
import type { ReactNode } from 'react';

type ConditionOption<T extends string | boolean> = {
  readonly label: ReactNode;
  readonly value: T;
};

type ConditionRadioGroupProps<T extends string | boolean> = {
  name: string;
  options: ReadonlyArray<ConditionOption<T>>;
  selectedValue: T | undefined;
  onChange: (value: T) => void;
};

export const ConditionRadioGroup = <T extends string | boolean>({
  name,
  options,
  selectedValue,
  onChange,
}: ConditionRadioGroupProps<T>) => {
  return (
    <div className="flex flex-wrap items-center gap-x-[22px] gap-y-3">
      {options.map((option) => (
        <RadioButton
          key={String(option.value)}
          name={name}
          label={option.label}
          checked={selectedValue === option.value}
          onChange={() => onChange(option.value)}
          className="[&_span:last-child]:whitespace-nowrap"
        />
      ))}
    </div>
  );
};
