import checkerImg from '@shared/assets/icons/common/checker.png';
import { Button } from '@shared/ui/Button/Button';
import { Modal } from '@shared/ui/Modal/Modal';
import type { SellState } from '@shared/types/sell';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

type SellConfirmState = SellState;

export default function SellConfirmPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const state = (location.state ?? {}) as SellConfirmState;

  const displayTitle = state.title ?? '아이폰 14 맥스';
  const displayPrice = state.price
    ? `${new Intl.NumberFormat('ko-KR').format(Number(state.price || 0))}원`
    : '580,000원';
  const displayManufacturer = state.manufacturer ?? '애플';
  const displayModelName = state.modelName ?? '아이폰 14 MAX';
  const displayColor = state.colorName ?? '실버';
  const displayDescription =
    state.description ??
    `쓴지는 1년정도 되었습니다.
잔기스는 살짝 있습니다.
택배거래 희망합니다.
케이스랑 충전기 줄 드립니다!`;
  const displayImageUrl = state.imageUrl ?? null;
  const showImage = Boolean(displayImageUrl) && !imageError;
  const productCondition = state.productCondition ?? 'used';
  const scratchCondition = state.scratchCondition ?? 'scratch';
  const screenCondition = state.screenCondition ?? 'clean';
  const batteryCondition = state.batteryCondition ?? '80plus';
  const displayProductCondition = productCondition === 'used' ? '개봉-중고' : '미개봉-새상품';
  const displayScratchCondition = scratchCondition === 'clean' ? '스크래치 없음' : '스크래치 있음';
  const displayScreenCondition = screenCondition === 'clean' ? '화면 깨짐 없음' : '화면 깨짐';
  const displayBatteryCondition =
    batteryCondition === '80minus'
      ? '배터리 성능 80% 미만'
      : batteryCondition === '50minus'
        ? '배터리 성능 50% 미만'
        : '배터리 성능 80% 이상';

  useEffect(() => {
    setImageError(false);
  }, [displayImageUrl]);

  return (
    <div className="w-full bg-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col items-center bg-white px-4">
        <main className="mt-[90px] flex items-start gap-[var(--spacing-l)]">
          {showImage ? (
            <img
              src={displayImageUrl ?? ''}
              alt="업로드된 이미지"
              className="h-[568px] w-[590px] rounded-[var(--radius-s)] object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div
              className="h-[568px] w-[590px] rounded-[var(--radius-s)] bg-[var(--color-gray-100)] bg-cover bg-center"
              style={{ backgroundImage: `url(${checkerImg})` }}
              aria-label="확인 이미지"
            />
          )}
          <div className="flex h-[568px] w-[590px] flex-col items-start justify-between">
            <div className="flex w-full flex-col items-start gap-[21px]">
              <h1 className="typo-title-2 line-clamp-2 w-full text-[var(--color-gray-900)]">{displayTitle}</h1>
              <p className="typo-title-1 text-[var(--color-gray-900)]">{displayPrice}</p>

              <div className="h-px w-[584px] bg-[var(--color-gray-200)]" />

              <div className="flex w-full flex-col items-start gap-[var(--spacing-xxs)]">
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

              <div className="flex w-full items-center gap-[3px] text-center">
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

              <div className="h-px w-[584px] bg-[var(--color-gray-200)]" />

              <p className="typo-body-2 line-clamp-6 w-full text-ellipsis whitespace-pre-line text-[var(--color-gray-900)]">
                {displayDescription}
              </p>
            </div>

            <div className="flex h-[44px] w-full items-center gap-[34px]">
              <Button
                variant="outline"
                size="full"
                className="h-[44px] px-[var(--padding-xl)] py-[var(--padding-m)] text-[var(--color-gray-900)]"
                onClick={() => navigate('/sell', { state })}
              >
                수정
              </Button>
              <Button
                variant="fill"
                size="full"
                className="h-[44px] px-[var(--padding-xl)] py-[var(--padding-m)]"
                onClick={() => setIsDeleteModalOpen(true)}
              >
                삭제
              </Button>
            </div>
          </div>
        </main>
        {isDeleteModalOpen && (
          <Modal
            title="삭제하시겠어요?"
            subtitle="삭제하면 복구할 수 없어요."
            onCancel={() => setIsDeleteModalOpen(false)}
            onConfirm={() => {
              setIsDeleteModalOpen(false);
              navigate('/', { state: { deleted: true } });
            }}
            cancelText="취소"
            confirmText="삭제"
          />
        )}
      </div>
    </div>
  );
}
