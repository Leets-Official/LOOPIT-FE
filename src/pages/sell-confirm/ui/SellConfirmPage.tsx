import checkerImg from '@shared/assets/icons/common/checker.png';
import { ROUTES } from '@shared/constants';
import { useModal, useToast } from '@shared/hooks';
import { MOCK_SELL_CONFIRM_DATA } from '@shared/mocks/data';
import { Button, Modal } from '@shared/ui';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import type { SellState } from '@shared/types/sell';

const CONDITION_LABELS = {
  productCondition: { used: '개봉-중고', unopened: '미개봉-새상품' },
  scratchCondition: { clean: '스크래치 없음', scratch: '스크래치 있음' },
  screenCondition: { clean: '화면 깨짐 없음', broken: '화면 깨짐' },
  batteryCondition: {
    '80plus': '배터리 성능 80% 이상',
    '80minus': '배터리 성능 80% 미만',
    '50minus': '배터리 성능 50% 미만',
  },
} as const;

type SellConfirmState = SellState;

const SellConfirmPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [imageError, setImageError] = useState(false);
  const deleteModal = useModal();
  const state = (location.state ?? MOCK_SELL_CONFIRM_DATA) as SellConfirmState;

  const displayPrice = `${new Intl.NumberFormat('ko-KR').format(Number(state.price))}원`;
  const showImage = Boolean(state.imageUrl) && !imageError;

  const productInfo = [
    { label: '제조사', value: state.manufacturer },
    { label: '모델명', value: state.modelName },
    { label: '색상', value: state.colorName },
  ];

  const conditionTags = [
    CONDITION_LABELS.productCondition[state.productCondition as keyof typeof CONDITION_LABELS.productCondition],
    CONDITION_LABELS.scratchCondition[state.scratchCondition as keyof typeof CONDITION_LABELS.scratchCondition],
    CONDITION_LABELS.screenCondition[state.screenCondition as keyof typeof CONDITION_LABELS.screenCondition],
    CONDITION_LABELS.batteryCondition[state.batteryCondition as keyof typeof CONDITION_LABELS.batteryCondition],
  ];

  const actionButtons = [
    { label: '수정', variant: 'outline' as const, onClick: () => navigate(ROUTES.SELL, { state }) },
    { label: '삭제', variant: 'fill' as const, onClick: deleteModal.open },
  ];

  useEffect(() => {
    setImageError(false);
  }, [state.imageUrl]);

  return (
    <div className="w-full bg-white">
      <div className="md:px-xxxl mx-auto flex min-h-screen w-full max-w-[1440px] flex-col items-center bg-white px-(--margin-l) lg:px-0">
        <main className="gap-l mt-[90px] flex items-start">
          {showImage ? (
            <img
              src={state.imageUrl ?? ''}
              alt="업로드된 이미지"
              className="h-[568px] w-[590px] rounded-s object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div
              className="h-[568px] w-[590px] rounded-s bg-gray-100 bg-cover bg-center"
              style={{ backgroundImage: `url(${checkerImg})` }}
              aria-label="확인 이미지"
            />
          )}
          <div className="flex h-[568px] w-[590px] flex-col items-start justify-between">
            <div className="flex w-full flex-col items-start gap-[21px]">
              <h1 className="typo-title-2 line-clamp-2 w-full text-gray-900">{state.title}</h1>
              <p className="typo-title-1 text-gray-900">{displayPrice}</p>

              <div className="h-px w-full bg-gray-200" />

              <div className="gap-xxs flex w-full flex-col items-start">
                {productInfo.map(({ label, value }) => (
                  <div key={label} className="flex items-center gap-[11px]">
                    <span className="typo-caption-1 text-gray-500">{label}</span>
                    <span className="typo-body-1 text-gray-900">{value}</span>
                  </div>
                ))}
              </div>

              <div className="flex w-full items-center gap-[3px] text-center">
                {conditionTags.map((tag, index) => (
                  <span key={tag} className="typo-caption-1 flex items-center gap-[3px] text-gray-300">
                    {index > 0 && '•'}
                    <span className="whitespace-nowrap">{tag}</span>
                  </span>
                ))}
              </div>

              <div className="h-px w-[584px] bg-gray-200" />

              <p className="typo-body-2 line-clamp-6 w-full text-ellipsis whitespace-pre-line text-gray-900">
                {state.description}
              </p>
            </div>

            <div className="flex h-[44px] w-full items-center gap-[34px]">
              {actionButtons.map(({ label, variant, onClick }) => (
                <Button key={label} variant={variant} size="full" className="px-xl py-m h-[44px]" onClick={onClick}>
                  {label}
                </Button>
              ))}
            </div>
          </div>
        </main>
        {deleteModal.isOpen && (
          <Modal
            title="삭제하시겠어요?"
            subtitle="삭제하면 복구할 수 없어요."
            onCancel={deleteModal.close}
            onConfirm={() => {
              deleteModal.close();
              showToast('삭제되었습니다', 'success');
              navigate(ROUTES.MAIN);
            }}
            cancelText="취소"
            confirmText="삭제"
          />
        )}
      </div>
    </div>
  );
};

export default SellConfirmPage;
