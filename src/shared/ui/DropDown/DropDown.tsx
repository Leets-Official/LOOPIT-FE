import { CaretDownMdIcon } from '@shared/assets/icons';
import { TextField } from '@shared/ui/TextField';
import type { RefObject } from 'react';

type DropDownProps = {
  label: string;
  value: string;
  options: string[];
  isOpen: boolean;
  dropdownRef: RefObject<HTMLDivElement | null>;
  error?: boolean;
  helperText?: string;
  onToggle: () => void;
  onSelect: (value: string) => void;
};

export const DropDown = ({
  label,
  value,
  options,
  isOpen,
  dropdownRef,
  error,
  helperText,
  onToggle,
  onSelect,
}: DropDownProps) => (
  <div className="relative flex flex-col gap-[var(--spacing-m)]" ref={dropdownRef}>
    <span className="typo-body-2 text-[var(--color-gray-900)]">{label}</span>

    <div
      className="relative"
      role="button"
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          onToggle();
        }
      }}
    >
      <TextField
        readOnly
        value={value}
        placeholder={`${label}를 선택해 주세요`}
        className="w-full cursor-pointer [&_input]:h-[48px] [&_input]:pr-[40px] [&_input]:text-[16px] [&_input]:leading-[24px] [&_input]:text-[var(--color-gray-700)] [&_input]:placeholder:text-[var(--color-gray-400)]"
        showCharacterCount={false}
        error={error}
        helperText={helperText}
      />
      <CaretDownMdIcon className="pointer-events-none absolute top-1/2 right-[16px] h-5 w-5 -translate-y-1/2 text-[var(--color-gray-400)]" />
    </div>

    {isOpen && (
      <div className="absolute top-full z-10 mt-[8px] flex w-full flex-col overflow-hidden rounded-[12px] border border-[var(--color-gray-200)] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
        {options.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onSelect(item)}
            className="typo-body-1 flex h-[44px] items-center px-[16px] text-left text-[var(--color-gray-700)] hover:bg-[var(--color-gray-50)]"
          >
            {item}
          </button>
        ))}
      </div>
    )}
  </div>
);
