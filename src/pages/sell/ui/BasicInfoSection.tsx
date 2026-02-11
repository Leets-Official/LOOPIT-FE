import { MANUFACTURER_OPTIONS, TEXT_FIELDS } from '@pages/sell/model/options';
import { FormTextField } from '@pages/sell/ui/FormTextField';
import { DropDown, PriceField, TextField } from '@shared/ui';
import { cn } from '@shared/utils/cn';
import { Controller, type Control, type FieldErrors } from 'react-hook-form';
import type { SellFormData } from '@shared/utils/schemas';
import type { RefObject } from 'react';

export type BasicInfoSectionProps = {
  control: Control<SellFormData>;
  errors: FieldErrors<SellFormData>;
  manufacturerValue: string | undefined;
  priceValue: string | undefined;
  isDropdownOpen: boolean;
  dropdownRef: RefObject<HTMLDivElement | null>;
  onToggleDropdown: () => void;
  onSelectManufacturer: (value: string) => void;
  modelSuggestions: string[];
  isModelAutocompleteOpen: boolean;
  onSetModelAutocompleteOpen: (open: boolean) => void;
  onSelectModelName: (value: string) => void;
};

export const BasicInfoSection = ({
  control,
  errors,
  manufacturerValue,
  priceValue,
  isDropdownOpen,
  dropdownRef,
  onToggleDropdown,
  onSelectManufacturer,
  modelSuggestions,
  isModelAutocompleteOpen,
  onSetModelAutocompleteOpen,
  onSelectModelName,
}: BasicInfoSectionProps) => {
  const showModelSuggestions = isModelAutocompleteOpen && modelSuggestions.length > 0;

  return (
    <section className="w-full">
      <div className="gap-xl flex w-full flex-col items-start md:flex-row md:gap-[139px]">
        <h2 className="typo-title-2 w-full text-gray-900 md:w-[120px]">기본 정보</h2>

        <div className="flex w-full max-w-[978px] flex-col gap-[39px]">
          {TEXT_FIELDS.slice(0, 1).map(({ name, label, placeholder }) => (
            <FormTextField
              key={name}
              name={name}
              label={label}
              placeholder={placeholder}
              control={control}
              errors={errors}
            />
          ))}

          <div data-field="manufacturer">
            <DropDown
              label="제조사"
              value={manufacturerValue ?? ''}
              options={MANUFACTURER_OPTIONS}
              isOpen={isDropdownOpen}
              dropdownRef={dropdownRef}
              error={Boolean(errors.manufacturer)}
              helperText={errors.manufacturer?.message}
              onToggle={onToggleDropdown}
              onSelect={onSelectManufacturer}
            />
          </div>

          <div className="gap-m relative flex flex-col" data-field="modelName">
            <span className="typo-body-2 text-gray-900">모델명</span>
            <Controller
              name="modelName"
              control={control}
              render={({ field }) => (
                <TextField
                  aria-label="모델명"
                  value={field.value ?? ''}
                  onChange={(value) => {
                    field.onChange(value);
                    onSetModelAutocompleteOpen(true);
                  }}
                  onFocus={() => onSetModelAutocompleteOpen(true)}
                  onBlur={() => onSetModelAutocompleteOpen(false)}
                  placeholder="모델명을 입력해 주세요"
                  className="w-full"
                  showCharacterCount={false}
                  error={Boolean(errors.modelName)}
                  helperText={errors.modelName?.message}
                />
              )}
            />
            {showModelSuggestions && (
              <div className="rounded-m absolute top-[calc(100%+8px)] right-0 left-0 z-10 border border-gray-100 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                <ul className="max-h-[240px] overflow-auto py-2">
                  {modelSuggestions.map((item) => (
                    <li key={item}>
                      <button
                        type="button"
                        className={cn(
                          'typo-body-2 flex w-full items-center px-4 py-2 text-left text-gray-900 hover:bg-gray-50'
                        )}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => onSelectModelName(item)}
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {TEXT_FIELDS.slice(2).map(({ name, label, placeholder }) => (
            <FormTextField
              key={name}
              name={name}
              label={label}
              placeholder={placeholder}
              control={control}
              errors={errors}
            />
          ))}

          <div className="gap-m flex flex-col" data-field="price">
            <span className="typo-body-2 text-gray-900">가격</span>
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <PriceField
                  aria-label="가격"
                  placeholder="0"
                  value={field.value ?? ''}
                  onChange={field.onChange}
                  className={`w-full **:placeholder:text-gray-500 ${
                    priceValue ? '**:data-suffix:text-gray-900' : '**:data-suffix:text-gray-500'
                  }`}
                  showCharacterCount={false}
                  error={Boolean(errors.price)}
                  helperText={errors.price?.message}
                />
              )}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
