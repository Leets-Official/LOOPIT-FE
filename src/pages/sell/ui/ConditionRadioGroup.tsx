import { RadioButton } from '@shared/ui';

type ConditionOption<T extends string> = {
  readonly label: string;
  readonly value: T;
};

type ConditionRadioGroupProps<T extends string> = {
  name: string;
  options: ReadonlyArray<ConditionOption<T>>;
  selectedValue: T | undefined;
  onChange: (value: T) => void;
};

export const ConditionRadioGroup = <T extends string>({
  name,
  options,
  selectedValue,
  onChange,
}: ConditionRadioGroupProps<T>) => {
  return (
    <div className="flex items-center gap-[22px]">
      {options.map((option) => (
        <RadioButton
          key={option.value}
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
