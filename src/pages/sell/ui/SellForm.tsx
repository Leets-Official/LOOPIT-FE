import { BATTERY_OPTIONS, PRODUCT_CONDITION_OPTIONS, SCRATCH_OPTIONS, SCREEN_OPTIONS } from '@pages/sell/model/options';
import { useSellForm } from '@pages/sell/model/useSellForm';
import { BasicInfoSection } from '@pages/sell/ui/BasicInfoSection';
import { ConditionRadioGroup } from '@pages/sell/ui/ConditionRadioGroup';
import { ImageUploadSection } from '@pages/sell/ui/ImageUploadSection';
import { Button, TextAreaField } from '@shared/ui';
import { Controller } from 'react-hook-form';

const RESPONSIVE_BATTERY_OPTIONS = BATTERY_OPTIONS.map((option) => ({
  ...option,
  label: (
    <>
      배터리 <span className="hidden md:inline">성능 </span>
      {option.label.replace('배터리 성능 ', '')}
    </>
  ),
}));

export const SellForm = () => {
  const {
    control,
    errors,
    images,
    canAddMore,
    isDropdownOpen,
    dropdownRef,
    manufacturerValue,
    priceValue,
    descriptionValue,
    modelSuggestions,
    isModelAutocompleteOpen,
    setIsModelAutocompleteOpen,
    selectModelName,
    productCondition,
    scratchCondition,
    screenCondition,
    batteryCondition,
    handleImageChange,
    removeImage,
    toggleDropdown,
    selectManufacturer,
    setConditionValue,
    onSubmit,
    isSubmitting,
    isEditMode,
  } = useSellForm();

  return (
    <div className="mt-[74px] flex w-full max-w-[1200px] flex-col items-center gap-[74px]">
      <ImageUploadSection
        images={images}
        canAddMore={canAddMore}
        onImageChange={handleImageChange}
        onRemoveImage={removeImage}
        errors={errors}
      />

      <BasicInfoSection
        control={control}
        errors={errors}
        manufacturerValue={manufacturerValue}
        priceValue={priceValue}
        isDropdownOpen={isDropdownOpen}
        dropdownRef={dropdownRef}
        onToggleDropdown={toggleDropdown}
        onSelectManufacturer={selectManufacturer}
        modelSuggestions={modelSuggestions}
        isModelAutocompleteOpen={isModelAutocompleteOpen}
        onSetModelAutocompleteOpen={setIsModelAutocompleteOpen}
        onSelectModelName={selectModelName}
      />

      <section className="w-full max-w-[1306px]">
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
              options={RESPONSIVE_BATTERY_OPTIONS}
              selectedValue={batteryCondition}
              onChange={(value) => setConditionValue('batteryCondition', value)}
            />
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1306px]">
        <div className="gap-xl flex w-full flex-col items-start md:flex-row md:gap-[130px]">
          <h2 className="typo-title-2 w-full text-gray-900 md:w-[120px]">상세 설명</h2>
          <div className="gap-m flex w-full max-w-[981px] flex-col items-start" data-field="description">
            <div className="flex w-full items-center justify-between">
              <span className="typo-body-2 text-gray-900">설명</span>
              <span className="typo-body-1 text-gray-500">{(descriptionValue ?? '').length}/5000</span>
            </div>
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

      <section className="mt-[58px] mb-[112px] flex w-full flex-col items-center">
        <div className="px-s flex w-full items-center justify-end">
          <Button
            variant="fill"
            size="auto"
            className="px-xl py-m h-[44px] w-[213px]"
            onClick={onSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (isEditMode ? '수정 중...' : '등록 중...') : isEditMode ? '수정' : '저장'}
          </Button>
        </div>
      </section>
    </div>
  );
};
