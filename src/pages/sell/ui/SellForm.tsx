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
import { CloseIcon, PictureIcon } from '@shared/assets/icons';
import { Button, DropDown, PriceField, TextAreaField, TextField } from '@shared/ui';
import { cn } from '@shared/utils/cn';
import { MAX_IMAGE_COUNT } from '@shared/utils/schemas';
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

  const showModelSuggestions = isModelAutocompleteOpen && modelSuggestions.length > 0;

  return (
    <div className="mt-[74px] flex w-full max-w-[1200px] flex-col items-center gap-[74px]">
      <section className="w-full">
        <div className="flex w-full flex-col items-start gap-[70px]">
          <div className="gap-xl flex w-full flex-col items-start md:flex-row md:gap-[113px]">
            <div className="gap-xxs flex flex-col items-start">
              <h2 className="typo-title-2 text-gray-900">사진 올리기</h2>
              <p className="typo-body-2 text-gray-900">(최대 {MAX_IMAGE_COUNT}장)</p>
            </div>

            <div className="gap-xxs flex flex-col items-start" data-field="imageFiles">
              <div className="flex flex-wrap gap-3">
                {images.map((image) => (
                  <div key={image.id} className="relative h-[212px] w-[204px]">
                    <img
                      src={image.previewUrl}
                      alt="업로드된 이미지"
                      className="h-full w-full rounded-(--radius-s) object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(image.id)}
                      className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 text-white hover:bg-gray-900"
                    >
                      <CloseIcon className="h-4 w-4" />
                    </button>
                  </div>
                ))}

                {canAddMore && (
                  <label
                    htmlFor="sell-photo"
                    className="flex h-[212px] w-[204px] cursor-pointer items-center justify-center overflow-hidden rounded-(--radius-s) bg-green-50"
                  >
                    <div className="gap-ss flex w-[90px] flex-col items-center">
                      <PictureIcon className="h-[90px] w-[90px] text-gray-500" />
                      <span className="typo-body-2 text-center text-gray-500">
                        {images.length}/{MAX_IMAGE_COUNT}
                      </span>
                    </div>
                  </label>
                )}

                <input
                  id="sell-photo"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
              {errors.imageFiles?.message && (
                <span className="typo-caption-2 text-red-500">{errors.imageFiles.message}</span>
              )}
            </div>
          </div>
        </div>
      </section>

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
                onToggle={toggleDropdown}
                onSelect={selectManufacturer}
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
                      setIsModelAutocompleteOpen(true);
                    }}
                    onFocus={() => setIsModelAutocompleteOpen(true)}
                    onBlur={() => setIsModelAutocompleteOpen(false)}
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
                          onClick={() => selectModelName(item)}
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
