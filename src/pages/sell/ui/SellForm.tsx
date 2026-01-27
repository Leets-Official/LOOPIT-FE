import {
  BATTERY_OPTIONS,
  MANUFACTURER_OPTIONS,
  PRODUCT_CONDITION_OPTIONS,
  SCRATCH_OPTIONS,
  SCREEN_OPTIONS,
  TEXT_FIELDS,
} from '@pages/sell/model/options';
import { useSellForm } from '@pages/sell/model/useSellForm';
import { ConditionRadioGroup } from '@pages/sell/ui/ConditionRadioGroup';
import { FormTextField } from '@pages/sell/ui/FormTextField';
import { PictureIcon } from '@shared/assets/icons';
import { Button } from '@shared/ui/Button/Button';
import { DropDown } from '@shared/ui/DropDown';
import { PriceField, TextAreaField } from '@shared/ui/TextField';
import { Controller } from 'react-hook-form';

export const SellForm = () => {
  const {
    control,
    errors,
    previewUrl,
    isDropdownOpen,
    dropdownRef,
    manufacturerValue,
    priceValue,
    productCondition,
    scratchCondition,
    screenCondition,
    batteryCondition,
    handleImageChange,
    toggleDropdown,
    selectManufacturer,
    setConditionValue,
    onSubmit,
  } = useSellForm();

  return (
    <div className="mt-[74px] flex w-full max-w-[1200px] flex-col items-center gap-[74px]">
      <section className="w-full">
        <div className="flex w-full flex-col items-start gap-[70px]">
          <div className="gap-xl flex w-full flex-col items-start md:flex-row md:gap-[113px]">
            <div className="gap-xxs flex flex-col items-start">
              <h2 className="typo-title-2 text-gray-900">사진 올리기</h2>
              <p className="typo-body-2 text-gray-900">(최대 1장)</p>
            </div>

            <div className="gap-xxs flex flex-col items-center">
              <label
                htmlFor="sell-photo"
                className="flex h-[212px] w-[204px] cursor-pointer items-center justify-center overflow-hidden rounded-(--radius-s) bg-gray-100"
              >
                {previewUrl ? (
                  <img src={previewUrl} alt="업로드된 이미지" className="h-full w-full object-cover" />
                ) : (
                  <div className="gap-ss flex w-[90px] flex-col items-center">
                    <PictureIcon className="h-[90px] w-[90px] text-gray-500" />
                    <span className="typo-body-2 text-center text-gray-500">0/1</span>
                  </div>
                )}

                <input id="sell-photo" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
              {errors.imageFile?.message && (
                <span className="typo-caption-2 text-red-500">{errors.imageFile.message}</span>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full">
        <div className="py-m flex items-start gap-[139px]">
          <h2 className="typo-title-2 w-[120px] text-gray-900 md:w-[120px]">기본 정보</h2>

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

            <DropDown
              label="제조사"
              value={manufacturerValue ?? ''}
              options={MANUFACTURER_OPTIONS}
              isOpen={isDropdownOpen}
              dropdownRef={dropdownRef}
              error={Boolean(errors.manufacturer)}
              helperText={errors.manufacturer?.message}
              onToggle={toggleDropdown}
              onSelect={selectManufacturer}
            />

            {TEXT_FIELDS.slice(1).map(({ name, label, placeholder }) => (
              <FormTextField
                key={name}
                name={name}
                label={label}
                placeholder={placeholder}
                control={control}
                errors={errors}
              />
            ))}

            <div className="gap-m flex flex-col">
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

      <section className="mt-[70px] w-full max-w-[1306px]">
        <div className="gap-xl flex w-full flex-col items-start md:h-[199px] md:flex-row md:gap-[130px]">
          <h2 className="typo-title-2 w-full text-gray-900 md:w-[120px]">상품 상태</h2>
          <div className="flex w-full flex-col items-start gap-[22px] md:h-[199px]">
            <ConditionRadioGroup
              name="product-condition"
              options={PRODUCT_CONDITION_OPTIONS}
              selectedValue={productCondition}
              onChange={(value) => setConditionValue('productCondition', value)}
            />
            <ConditionRadioGroup
              name="scratch-condition"
              options={SCRATCH_OPTIONS}
              selectedValue={scratchCondition}
              onChange={(value) => setConditionValue('scratchCondition', value)}
            />
            <ConditionRadioGroup
              name="screen-condition"
              options={SCREEN_OPTIONS}
              selectedValue={screenCondition}
              onChange={(value) => setConditionValue('screenCondition', value)}
            />
            <ConditionRadioGroup
              name="battery-condition"
              options={BATTERY_OPTIONS}
              selectedValue={batteryCondition}
              onChange={(value) => setConditionValue('batteryCondition', value)}
            />
          </div>
        </div>
      </section>

      <section className="mt-[70px] w-full max-w-[1306px]">
        <div className="gap-xl flex w-full flex-col items-start md:flex-row md:gap-[130px]">
          <h2 className="typo-title-2 w-full text-gray-900 md:w-[120px]">상세 설명</h2>
          <div className="gap-m flex w-full max-w-[981px] flex-col items-start">
            <span className="typo-body-2 text-gray-900">설명</span>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextAreaField
                  aria-label="상세 설명"
                  value={field.value ?? ''}
                  onChange={field.onChange}
                  placeholder="상품에 대한 자세한 설명과 거래 방식 등 자세히 작성해 주세요"
                  className="w-full **:[display:-webkit-box] **:overflow-hidden **:text-ellipsis **:[-webkit-box-orient:vertical] **:[-webkit-line-clamp:10] **:placeholder:text-gray-500"
                  showCharacterCount={false}
                  error={Boolean(errors.description)}
                  helperText={errors.description?.message}
                />
              )}
            />
          </div>
        </div>
      </section>

      <section className="mt-[132px] mb-[112px] flex w-full flex-col items-center gap-[132px]">
        <div className="px-s flex w-full items-center justify-end pb-[11px]">
          <Button variant="fill" size="auto" className="px-xl py-m h-[44px] w-[213px]" onClick={onSubmit}>
            저장
          </Button>
        </div>
      </section>
    </div>
  );
};
