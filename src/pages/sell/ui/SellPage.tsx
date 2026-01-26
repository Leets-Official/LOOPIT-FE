import { PictureIcon } from '@shared/assets/icons';
import { useToast } from '@shared/contexts/ToastContext';
import { Button } from '@shared/ui/Button/Button';
import { RadioButton } from '@shared/ui/RadioButton/RadioButton';
import { PriceField, TextAreaField, TextField } from '@shared/ui/TextField';
import { MAX_IMAGE_BYTES, sellSchema, type SellFormData } from '@shared/utils/schemas';
import type { SellState } from '@shared/types/sell';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';
import { DropDown } from '@shared/ui/DropDown';

type SellDraftState = SellState;

export default function SellPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();
  const {
    control,
    handleSubmit,
    reset,
    resetField,
    setError,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SellFormData>({
    resolver: zodResolver(sellSchema),
    defaultValues: {
      title: '',
      price: '',
      manufacturer: '',
      modelName: '',
      colorName: '',
      storageSize: '',
      description: '',
      productCondition: 'new',
      scratchCondition: 'scratch',
      screenCondition: 'broken',
      batteryCondition: '80plus',
    },
  });

  const hasInitialized = useRef(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const manufacturerOptions = ['삼성', '애플'];
  const scratchOptions = [
    { label: '스크래치 있음', value: 'scratch' },
    { label: '스크래치 없음', value: 'clean' },
  ] as const;
  const screenOptions = [
    { label: '화면 깨짐', value: 'broken' },
    { label: '화면 깨짐 없음', value: 'clean' },
  ] as const;
  const batteryOptions = [
    { label: '배터리 성능 80% 이상', value: '80plus' },
    { label: '배터리 성능 80% 미만', value: '80minus' },
    { label: '배터리 성능 50% 미만', value: '50minus' },
  ] as const;
  const manufacturerValue = watch('manufacturer');
  const priceValue = watch('price');
  const productCondition = watch('productCondition');
  const scratchCondition = watch('scratchCondition');
  const screenCondition = watch('screenCondition');
  const batteryCondition = watch('batteryCondition');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      showToast('이미지 파일만 업로드해 주세요.', 'warning');
      setPreviewUrl(null);
      resetField('imageFile');
      setError('imageFile', {
        type: 'validate',
        message: '이미지 파일만 업로드해 주세요.',
      });
      return;
    }

    if (file.size > MAX_IMAGE_BYTES) {
      showToast('이미지는 5MB 이하로 업로드해 주세요.', 'warning');
      setPreviewUrl(null);
      resetField('imageFile');
      setError('imageFile', {
        type: 'validate',
        message: '이미지는 5MB 이하로 업로드해 주세요.',
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
    setValue('imageFile', file, { shouldValidate: true });
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (hasInitialized.current) {
      return;
    }
    const state = (location.state ?? {}) as SellDraftState;
    if (Object.keys(state).length === 0) {
      return;
    }
    reset({
      title: state.title ?? '',
      price: state.price ?? '',
      manufacturer: state.manufacturer ?? '',
      modelName: state.modelName ?? '',
      colorName: state.colorName ?? '',
      storageSize: state.storageSize ?? '',
      description: state.description ?? '',
      productCondition: state.productCondition ?? 'new',
      scratchCondition: state.scratchCondition ?? 'scratch',
      screenCondition: state.screenCondition ?? 'broken',
      batteryCondition: state.batteryCondition ?? '80plus',
    });
    if (state.imageFile) {
      setValue('imageFile', state.imageFile, { shouldValidate: true });
    } else {
      resetField('imageFile');
    }
    setPreviewUrl(state.imageUrl ?? null);
    hasInitialized.current = true;
  }, [location.state, reset, resetField, setValue]);

  return (
    <div className="w-full bg-white">
      <div className="mx-auto min-h-screen w-full max-w-[1440px] bg-white px-4 pb-[112px] md:px-[120px]">
        <main className="mt-[55px] flex flex-col">
          {/* 상단 배너 */}
          <section className="flex h-[266px] items-center justify-center bg-[linear-gradient(180deg,var(--color-brand-primary)_0%,var(--color-white)_100%)] py-[67px]">
            <div className="flex w-full max-w-[1200px] flex-col items-center gap-[var(--spacing-xxs)] text-center">
              <h1 className="typo-title-1 text-[color:var(--color-gray-900)]">나의 전자 기기 판매하기</h1>
              <p className="typo-body-1 text-[color:var(--color-gray-900)]">subtitle</p>
            </div>
          </section>

          <div className="mt-[74px] flex w-full max-w-[1200px] flex-col items-center gap-[74px]">
            {/* 사진 업로드 */}
            <section className="w-full">
              <div className="flex w-full flex-col items-start gap-[70px]">
                <div className="flex w-full flex-col items-start gap-[24px] md:flex-row md:gap-[113px]">
                  <div className="flex flex-col items-start gap-[var(--spacing-xxs)]">
                    <h2 className="typo-title-2 text-[color:var(--color-gray-900)]">사진 올리기</h2>
                    <p className="typo-body-2 text-[color:var(--color-gray-900)]">(최대 1장)</p>
                  </div>

                  <label
                    htmlFor="sell-photo"
                    className="flex h-[212px] w-[204px] cursor-pointer items-center justify-center overflow-hidden rounded-[var(--radius-s)] bg-[var(--color-gray-100)]"
                  >
                    {previewUrl ? (
                      <img src={previewUrl} alt="업로드된 이미지" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex w-[90px] flex-col items-center gap-[var(--padding-ss)]">
                        <PictureIcon className="h-[90px] w-[90px] text-[color:var(--color-gray-500)]" />
                        <span className="typo-body-2 text-center text-[color:var(--color-gray-500)]">0/1</span>
                      </div>
                    )}

                    <input
                      id="sell-photo"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
                {errors.imageFile?.message && (
                  <span className="text-[12px] font-normal leading-[16px] text-[var(--color-red-500)]">
                    {errors.imageFile.message}
                  </span>
                )}
              </div>
            </section>

            <section className="w-full">
              <div className="flex items-start gap-[139px] py-[var(--padding-m)]">
                <h2 className="typo-title-2 w-[120px] text-[var(--color-gray-900)] md:w-[120px]">기본 정보</h2>

                <div className="flex w-full max-w-[978px] flex-col gap-[39px]">
                  {/* 제목 */}
                  <div className="flex flex-col gap-[var(--spacing-m)]">
                    <span className="typo-body-2 text-[var(--color-gray-900)]">제목</span>
                    <Controller
                      name="title"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          aria-label="제목"
                          value={field.value ?? ''}
                          onChange={field.onChange}
                          placeholder="제목을 입력해 주세요"
                          className="w-full"
                          showCharacterCount={false}
                          error={Boolean(errors.title)}
                          helperText={errors.title?.message}
                        />
                      )}
                    />
                  </div>

                  {/* 제조사 (드롭다운) */}
                  <DropDown
                    label="제조사"
                    value={manufacturerValue ?? ''}
                    options={manufacturerOptions}
                    isOpen={isOpen}
                    dropdownRef={dropdownRef}
                    error={Boolean(errors.manufacturer)}
                    helperText={errors.manufacturer?.message}
                    onToggle={() => setIsOpen((prev) => !prev)}
                    onSelect={(item) => {
                      setValue('manufacturer', item, { shouldValidate: true });
                      setIsOpen(false);
                    }}
                  />

                  {/* 모델명 */}
                  <div className="flex flex-col gap-[var(--spacing-m)]">
                    <span className="typo-body-2 text-[var(--color-gray-900)]">모델명</span>
                    <Controller
                      name="modelName"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          aria-label="모델명"
                          value={field.value ?? ''}
                          onChange={field.onChange}
                          placeholder="모델명을 입력해 주세요"
                          className="w-full"
                          showCharacterCount={false}
                          error={Boolean(errors.modelName)}
                          helperText={errors.modelName?.message}
                        />
                      )}
                    />
                  </div>

                  {/* 색상 */}
                  <div className="flex flex-col gap-[var(--spacing-m)]">
                    <span className="typo-body-2 text-[var(--color-gray-900)]">색상</span>
                    <Controller
                      name="colorName"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          aria-label="색상"
                          value={field.value ?? ''}
                          onChange={field.onChange}
                          placeholder="색상을 입력해 주세요"
                          className="w-full"
                          showCharacterCount={false}
                          error={Boolean(errors.colorName)}
                          helperText={errors.colorName?.message}
                        />
                      )}
                    />
                  </div>

                  {/* 저장 용량 */}
                  <div className="flex flex-col gap-[var(--spacing-m)]">
                    <span className="typo-body-2 text-[var(--color-gray-900)]">저장 용량</span>
                    <Controller
                      name="storageSize"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          aria-label="저장 용량"
                          value={field.value ?? ''}
                          onChange={field.onChange}
                          placeholder="128GB"
                          className="w-full"
                          showCharacterCount={false}
                          error={Boolean(errors.storageSize)}
                          helperText={errors.storageSize?.message}
                        />
                      )}
                    />
                  </div>

                  {/* 가격 */}
                  <div className="flex flex-col gap-[var(--padding-m)]">
                    <span className="typo-body-2 text-[var(--color-gray-900)]">가격</span>
                    <Controller
                      name="price"
                      control={control}
                      render={({ field }) => (
                        <PriceField
                          aria-label="가격"
                          placeholder="0"
                          value={field.value ?? ''}
                          onChange={field.onChange}
                          className={`w-full [&_input]:placeholder:text-[var(--color-gray-500)] ${
                            priceValue
                              ? '[&_[data-suffix]]:text-[var(--color-gray-900)]'
                              : '[&_[data-suffix]]:text-[var(--color-gray-500)]'
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
            {/* 상품 상태 */}
            <section className="mt-[70px] w-full max-w-[1306px]">
              <div className="flex w-full flex-col items-start gap-[24px] md:h-[199px] md:flex-row md:gap-[130px]">
                <h2 className="typo-title-2 w-full text-[var(--color-gray-900)] md:w-[120px]">상품 상태</h2>
                <div className="flex w-full flex-col items-start gap-[22px] md:h-[199px]">
                  <div className="flex items-center gap-[22px]">
                    <RadioButton
                      name="product-condition"
                      label="미개봉-새상품"
                      checked={productCondition === 'new'}
                      onChange={() => setValue('productCondition', 'new', { shouldValidate: true })}
                      className="[&_span:last-child]:whitespace-nowrap"
                    />
                    <RadioButton
                      name="product-condition"
                      label="개봉-중고"
                      checked={productCondition === 'used'}
                      onChange={() => setValue('productCondition', 'used', { shouldValidate: true })}
                      className="[&_span:last-child]:whitespace-nowrap"
                    />
                  </div>
                  <div className="flex items-center gap-[22px]">
                    {scratchOptions.map((option) => (
                      <RadioButton
                        key={option.value}
                        name="scratch-condition"
                        label={option.label}
                        checked={scratchCondition === option.value}
                        onChange={() => setValue('scratchCondition', option.value, { shouldValidate: true })}
                        className="[&_span:last-child]:whitespace-nowrap"
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-[22px]">
                    {screenOptions.map((option) => (
                      <RadioButton
                        key={option.value}
                        name="screen-condition"
                        label={option.label}
                        checked={screenCondition === option.value}
                        onChange={() => setValue('screenCondition', option.value, { shouldValidate: true })}
                        className="[&_span:last-child]:whitespace-nowrap"
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-[22px]">
                    {batteryOptions.map((option) => (
                      <RadioButton
                        key={option.value}
                        name="battery-condition"
                        label={option.label}
                        checked={batteryCondition === option.value}
                        onChange={() => setValue('batteryCondition', option.value, { shouldValidate: true })}
                        className="[&_span:last-child]:whitespace-nowrap"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>
            {/* 상세 설명 */}
            <section className="mt-[70px] w-full max-w-[1306px]">
              <div className="flex w-full flex-col items-start gap-[24px] md:flex-row md:gap-[130px]">
                <h2 className="typo-title-2 w-full text-[var(--color-gray-900)] md:w-[120px]">상세 설명</h2>
                <div className="flex w-full max-w-[981px] flex-col items-start gap-[var(--padding-m)]">
                  <span className="typo-body-2 text-[var(--color-gray-900)]">설명</span>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <TextAreaField
                        aria-label="상세 설명"
                        value={field.value ?? ''}
                        onChange={field.onChange}
                        placeholder="상품에 대한 자세한 설명과 거래 방식 등 자세히 작성해 주세요"
                        className="w-full [&_textarea]:[display:-webkit-box] [&_textarea]:overflow-hidden [&_textarea]:text-ellipsis [&_textarea]:[-webkit-box-orient:vertical] [&_textarea]:[-webkit-line-clamp:10] [&_textarea]:placeholder:text-[var(--color-gray-500)]"
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
              <div className="flex w-full items-center justify-end px-[var(--padding-s)] pb-[11px] pl-[979px]">
                <Button
                  variant="fill"
                  size="auto"
                  className="h-[44px] w-[213px] px-[var(--padding-xl)] py-[var(--padding-m)]"
                  onClick={handleSubmit((data) => {
                    navigate('/sell/confirm', {
                      state: {
                        ...data,
                        imageUrl: previewUrl,
                      },
                    });
                  })}
                >
                  저장
                </Button>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
