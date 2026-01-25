import checkerImg from '@shared/assets/icons/common/checker.png';
import { Button } from '@shared/ui/Button/Button';
import { Header } from '@shared/ui/Header';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

type SellConfirmState = {
  title?: string;
  price?: string;
  manufacturer?: string | null;
  modelName?: string;
  colorName?: string;
  storageSize?: string;
  description?: string;
  imageUrl?: string | null;
  productCondition?: 'new' | 'used';
  scratchCondition?: 'scratch' | 'clean';
  screenCondition?: 'broken' | 'clean';
  batteryCondition?: '80plus' | '80minus' | '50minus';
};

export default function SellConfirmPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const state = (location.state ?? {}) as SellConfirmState;

  const displayTitle = state.title ?? '판매 상품 제목이 들어갑니다';
  const displayPrice = state.price
    ? `${new Intl.NumberFormat('ko-KR').format(Number(state.price || 0))}원`
    : '128,000원';
  const displayManufacturer = state.manufacturer ?? '삼성';
  const displayModelName = state.modelName ?? '갤럭시 S23';
  const displayColor = state.colorName ?? '팬텀 블랙';
  const displayDescription = state.description ?? '';
  const displayImageUrl = state.imageUrl ?? null;
  const showImage = Boolean(displayImageUrl) && !imageError;
  const displayProductCondition = state.productCondition === 'used' ? '개봉-중고' : '미개봉-새상품';
  const displayScratchCondition = state.scratchCondition === 'clean' ? '스크래치 없음' : '스크래치 있음';
  const displayScreenCondition = state.screenCondition === 'clean' ? '화면 깨짐 없음' : '화면 깨짐';
  const displayBatteryCondition =
    state.batteryCondition === '80minus'
      ? '배터리 성능 80% 미만'
      : state.batteryCondition === '50minus'
        ? '배터리 성능 50% 미만'
        : '배터리 성능 80% 이상';

  useEffect(() => {
    setImageError(false);
  }, [displayImageUrl]);

  return (
    <div className="w-full bg-white">
      <div className="mx-auto flex h-[1024px] w-[1440px] flex-col items-center gap-[90px] bg-white">
        <Header isLoggedIn className="px-[120px] py-6" />
        <main className="flex items-start gap-[20px]">
          {showImage ? (
            <img
              src={displayImageUrl ?? ''}
              alt="업로드된 이미지"
              className="h-[568px] w-[590px] rounded-[var(--radius-s)] object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div
              className="h-[568px] w-[590px] rounded-[var(--radius-s)] bg-[lightgray] bg-cover bg-center"
              style={{ backgroundImage: `url(${checkerImg})` }}
              aria-label="확인 이미지"
            />
          )}
          <div className="flex h-[568px] w-[590px] flex-col items-start gap-[92px]">
            <div className="flex w-full flex-col items-start">
              <h1 className="typo-title-2 line-clamp-2 w-full text-[var(--color-gray-900)]">
                {displayTitle}
              </h1>
              <p className="mt-[40px] typo-title-1 text-[var(--color-gray-900)]">{displayPrice}</p>

              <div className="mt-[21px] h-px w-[584px] bg-[var(--color-gray-200)]" />

              <div className="mt-[21px] flex w-full flex-col items-start gap-[10px]">
                <div className="flex items-center gap-[11px]">
                  <span className="typo-caption-1 text-[var(--color-gray-500)]">제조사</span>
                  <span className="typo-body-1 text-[var(--color-gray-900)]">{displayManufacturer}</span>
                </div>
                <div className="flex items-center gap-[11px]">
                  <span className="typo-caption-1 text-[var(--color-gray-500)]">모델명</span>
                  <span className="typo-body-1 text-[var(--color-gray-900)]">{displayModelName}</span>
                </div>
                <div className="flex items-center gap-[11px]">
                  <span className="typo-caption-1 text-[var(--color-gray-500)]">색상</span>
                  <span className="typo-body-1 text-[var(--color-gray-900)]">{displayColor}</span>
                </div>
              </div>

              <div className="mt-[10px] flex w-full items-center gap-[3px] text-center">
                <span className="typo-caption-1 whitespace-nowrap text-[var(--color-gray-300)]">
                  {displayProductCondition}
                </span>
                <span className="typo-caption-1 text-[var(--color-gray-300)]">•</span>
                <span className="typo-caption-1 whitespace-nowrap text-[var(--color-gray-300)]">
                  {displayScratchCondition}
                </span>
                <span className="typo-caption-1 text-[var(--color-gray-300)]">•</span>
                <span className="typo-caption-1 whitespace-nowrap text-[var(--color-gray-300)]">
                  {displayScreenCondition}
                </span>
                <span className="typo-caption-1 text-[var(--color-gray-300)]">•</span>
                <span className="typo-caption-1 whitespace-nowrap text-[var(--color-gray-300)]">
                  {displayBatteryCondition}
                </span>
              </div>

              <div className="mt-[27px] flex w-full flex-col items-start gap-[27px]">
                <div className="h-px w-[584px] bg-[var(--color-gray-200)]" />
              </div>

              <p className="mt-[27px] line-clamp-6 w-full text-[var(--color-gray-900)] text-ellipsis typo-body-2">
                {displayDescription}
              </p>
            </div>

            <div className="flex h-[64px] w-full items-start gap-[34px] py-[10px]">
              <Button
                variant="outline"
                size="full"
                className="h-[44px] px-[24px] py-[12px] text-[var(--color-gray-900)]"
                onClick={() => navigate('/sell', { state })}
              >
                수정
              </Button>
              <Button variant="fill" size="full" className="h-[44px] px-[24px] py-[12px]">
                삭제
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
