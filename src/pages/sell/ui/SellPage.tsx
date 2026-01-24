import { CaretDownMdIcon, PictureIcon } from '@shared/assets/icons';
import { Header } from '@shared/ui/Header';
import { RadioButton } from '@shared/ui/RadioButton/RadioButton';
import { PriceField, TextAreaField, TextField } from '@shared/ui/TextField';
import { useEffect, useRef, useState } from 'react';
export default function SellPage() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [manufacturer, setManufacturer] = useState<string | null>(null);
  const [productCondition, setProductCondition] = useState<'new' | 'used'>('new');
  const [scratchCondition, setScratchCondition] = useState<'scratch' | 'clean'>('scratch');
  const [screenCondition, setScreenCondition] = useState<'broken' | 'clean'>('broken');
  const [batteryCondition, setBatteryCondition] = useState<'80plus' | '80minus' | '50minus'>('80plus');
  const [priceValue, setPriceValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const manufacturerOptions = ['삼성', '애플'];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    setPreviewUrl(URL.createObjectURL(file));
  };

  // 메모리 누수 방지
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
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="w-full bg-white">
      <div className="mx-auto w-[1440px] bg-white">
        <Header isLoggedIn className="mb-[55px] px-[120px] py-6" />

        <main className="flex flex-col">
          {/* 상단 배너 */}
          <section className="mx-[120px] flex h-[266px] items-center justify-center bg-[linear-gradient(180deg,var(--color-brand-primary)_0%,var(--color-white)_100%)] py-[67px]">
            <div className="flex max-w-[1200px] flex-col items-center gap-[var(--spacing-xxs)] text-center">
              <h1 className="typo-title-1 text-[color:var(--color-gray-900)]">
                나의 전자 기기 판매하기
              </h1>
              <p className="typo-body-1 text-[color:var(--color-gray-900)]">subtitle</p>
            </div>
          </section>

          <div className="mx-[120px] mt-[74px] flex w-[1200px] flex-col items-center gap-[74px]">
            {/* 사진 업로드 */}
            <section className="w-full">
              <div className="flex w-full flex-col items-start gap-[70px]">
                <div className="flex items-start gap-[113px]">
                  <div className="flex flex-col items-start gap-[10px]">
                    <h2 className="typo-title-2 text-[color:var(--color-gray-900)]">사진 올리기</h2>
                    <p className="typo-body-2 text-[color:var(--color-gray-900)]">(최대 1장)</p>
                  </div>

                  <label
                    htmlFor="sell-photo"
                    className="flex h-[212px] w-[204px] cursor-pointer items-center justify-center overflow-hidden rounded-[var(--radius-s)] bg-[var(--color-gray-100)]"
                  >
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="업로드된 이미지"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex w-[90px] flex-col items-center gap-[var(--padding-ss)]">
                        <PictureIcon className="h-[90px] w-[90px] text-[color:var(--color-gray-500)]" />
                        <span className="typo-body-2 text-center text-[color:var(--color-gray-500)]">
                          0/1
                        </span>
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
              </div>
            </section>

        <section className="w-full">
  <div className="flex items-start gap-[139px] py-[var(--padding-m)]">
    <h2 className="typo-title-2 w-[120px] text-[var(--Text-text-5)]">
      기본 정보
    </h2>

    <div className="flex w-[978px] flex-col gap-[39px]">
      {/* 제목 */}
      <div className="flex flex-col gap-[16px]">
        <span className="typo-body-2 text-[var(--Text-text-5)]">제목</span>
        <TextField
          aria-label="제목"
          placeholder="제목을 입력해 주세요"
          className="w-full"
          showCharacterCount={false}
        />
      </div>

      {/* 제조사 (드롭다운) */}
      <div className="relative flex flex-col gap-[16px]" ref={dropdownRef}>
        <span className="typo-body-2 text-[var(--Text-text-5)]">제조사</span>

        <div className="relative" onClick={() => setIsOpen((prev) => !prev)}>
          <TextField
            readOnly
            value={manufacturer ?? ''}
            placeholder="제조사를 선택해 주세요"
            className="w-full cursor-pointer [&_input]:h-[48px] [&_input]:pr-[40px] [&_input]:text-[16px] [&_input]:leading-[24px] [&_input]:text-[var(--color-gray-700)] [&_input]:placeholder:text-[var(--color-gray-400)]"
            showCharacterCount={false}
          />
          <CaretDownMdIcon className="pointer-events-none absolute right-[16px] top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--color-gray-400)]" />
        </div>

        {isOpen && (
          <div className="absolute top-full z-10 mt-[8px] flex w-full flex-col overflow-hidden rounded-[12px] border border-[var(--color-gray-200)] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
            {manufacturerOptions.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setManufacturer(item);
                  setIsOpen(false);
                }}
                className="typo-body-1 flex h-[44px] items-center px-[16px] text-left text-[var(--color-gray-700)] hover:bg-[var(--color-gray-50)]"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 모델명 */}
      <div className="flex flex-col gap-[16px]">
        <span className="typo-body-2 text-[var(--Text-text-5)]">모델명</span>
        <TextField
          aria-label="모델명"
          placeholder="모델명을 입력해 주세요"
          className="w-full"
          showCharacterCount={false}
        />
      </div>

      {/* 색상 */}
      <div className="flex flex-col gap-[16px]">
        <span className="typo-body-2 text-[var(--Text-text-5)]">색상</span>
        <TextField
          aria-label="색상"
          placeholder="색상을 입력해 주세요"
          className="w-full"
          showCharacterCount={false}
        />
      </div>

      {/* 저장 용량 */}
      <div className="flex flex-col gap-[16px]">
        <span className="typo-body-2 text-[var(--Text-text-5)]">저장 용량</span>
        <TextField
          aria-label="저장 용량"
          placeholder="128GB"
          className="w-full"
          showCharacterCount={false}
        />
      </div>

      {/* 가격 */}
      <div className="flex flex-col gap-[var(--padding-m)]">
        <span className="typo-body-2 text-[var(--Text-text-5)]">가격</span>
        <PriceField
          aria-label="가격"
          placeholder="0"
          value={priceValue}
          onChange={(event) => setPriceValue(event.target.value)}
          className={`w-full [&_input]:placeholder:text-[var(--color-gray-500)] ${
            priceValue ? '[&_span]:text-[var(--color-gray-900)]' : '[&_span]:text-[var(--color-gray-500)]'
          }`}
          showCharacterCount={false}
        />
      </div>

    </div>
  </div>
</section>

          <section className="mt-[70px] ml-[120px] mr-[14px] w-[1306px]">
            <div className="flex h-[199px] w-full items-start gap-[130px]">
              <h2 className="typo-title-2 w-[120px] text-[var(--Text-text-5)]">상품 상태</h2>
              <div className="flex h-[199px] w-full flex-col items-start gap-[22px]">
                <div className="flex items-center gap-[22px]">
                  <RadioButton
                    name="product-condition"
                    label="미개봉-새상품"
                    checked={productCondition === 'new'}
                    onChange={() => setProductCondition('new')}
                    className="[&_span:last-child]:whitespace-nowrap"
                  />
                  <RadioButton
                    name="product-condition"
                    label="개봉-중고"
                    checked={productCondition === 'used'}
                    onChange={() => setProductCondition('used')}
                    className="[&_span:last-child]:whitespace-nowrap"
                  />
                </div>
                <div className="flex items-center gap-[22px]">
                  <RadioButton
                    name="scratch-condition"
                    label="스크래치 있음"
                    checked={scratchCondition === 'scratch'}
                    onChange={() => setScratchCondition('scratch')}
                    className="[&_span:last-child]:whitespace-nowrap"
                  />
                  <RadioButton
                    name="scratch-condition"
                    label="스크래치 없음"
                    checked={scratchCondition === 'clean'}
                    onChange={() => setScratchCondition('clean')}
                    className="[&_span:last-child]:whitespace-nowrap"
                  />
                </div>
                <div className="flex items-center gap-[22px]">
                  <RadioButton
                    name="screen-condition"
                    label="화면 깨짐"
                    checked={screenCondition === 'broken'}
                    onChange={() => setScreenCondition('broken')}
                    className="[&_span:last-child]:whitespace-nowrap"
                  />
                  <RadioButton
                    name="screen-condition"
                    label="화면 깨짐 없음"
                    checked={screenCondition === 'clean'}
                    onChange={() => setScreenCondition('clean')}
                    className="[&_span:last-child]:whitespace-nowrap"
                  />
                </div>
                <div className="flex items-center gap-[22px]">
                  <RadioButton
                    name="battery-condition"
                    label="배터리 성능 80% 이상"
                    checked={batteryCondition === '80plus'}
                    onChange={() => setBatteryCondition('80plus')}
                    className="[&_span:last-child]:whitespace-nowrap"
                  />
                  <RadioButton
                    name="battery-condition"
                    label="배터리 성능 80% 미만"
                    checked={batteryCondition === '80minus'}
                    onChange={() => setBatteryCondition('80minus')}
                    className="[&_span:last-child]:whitespace-nowrap"
                  />
                  <RadioButton
                    name="battery-condition"
                    label="배터리 성능 50% 미만"
                    checked={batteryCondition === '50minus'}
                    onChange={() => setBatteryCondition('50minus')}
                    className="[&_span:last-child]:whitespace-nowrap"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="mt-[70px] ml-[120px] mr-[14px] w-[1306px]">
            <div className="flex w-full items-start gap-[130px]">
              <h2 className="typo-title-2 w-[120px] text-[var(--Text-text-5)]">상세 설명</h2>
              <div className="flex w-[981px] flex-col items-start gap-[var(--padding-m)]">
                <span className="typo-body-2 text-[var(--Text-text-5)]">설명</span>
                <TextAreaField
                  aria-label="상세 설명"
                  placeholder="상품의 상태와 구성품 정보를 작성해 주세요"
                  className="w-full [&_textarea]:[display:-webkit-box] [&_textarea]:[-webkit-box-orient:vertical] [&_textarea]:[-webkit-line-clamp:10] [&_textarea]:overflow-hidden [&_textarea]:text-ellipsis [&_textarea]:placeholder:text-[var(--color-gray-500)]"
                  showCharacterCount={false}
                />
              </div>
            </div>
          </section>

          </div>
        </main>
      </div>
    </div>
  );
}
