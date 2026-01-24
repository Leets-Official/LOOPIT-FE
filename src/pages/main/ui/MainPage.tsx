<<<<<<< HEAD
import { ChatCircleCloseIcon } from '@shared/assets/icons';
import { useToast } from '@shared/contexts/ToastContext';
import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router';

type MainLocationState = {
  deleted?: boolean;
};

export default function MainPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const didShowDeleteToast = useRef(false);

  useEffect(() => {
    const state = location.state as MainLocationState | null;
    if (state?.deleted && !didShowDeleteToast.current) {
      didShowDeleteToast.current = true;
      showToast('삭제되었습니다!', {
        tone: 'info',
        icon: (
          <ChatCircleCloseIcon className="h-6 w-6 text-[var(--color-gray-900)] [&_*]:stroke-[var(--color-gray-900)] [&_*]:stroke-[2]" />
        ),
      });
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.pathname, location.state, navigate, showToast]);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <h1 className="typo-title-1 text-gray-900">LOOPIT</h1>
      <p className="typo-body-1 mt-4 text-gray-500">중고거래 플랫폼</p>
=======
import { GearIcon, SellIcon, ShoppingIcon } from '@shared/assets/icons';
import { ROUTES } from '@shared/constants';
import { BannerCard } from '@shared/ui/BannerCard';
import { useNavigate } from 'react-router';

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <main className="flex w-full flex-col items-center gap-14 px-4 pt-8 pb-24">
      <section className="h-[317px] w-full max-w-[1200px]" aria-label="메인 슬로건 영역" />

      <section className="grid w-full max-w-300 grid-cols-1 gap-6 xl:grid-cols-3">
        <BannerCard
          title={
            <>
              중고 전자기기
              <br />
              구매하기
            </>
          }
          description="합리적인 매물을 찾아보세요."
          imageSrc={ShoppingIcon}
          onClick={() => navigate(ROUTES.BUY, { viewTransition: true })}
        />
        <BannerCard
          title={
            <>
              중고 전자기기
              <br />
              판매하기
            </>
          }
          description="사용하지 않는 기기를 판매해보세요."
          imageSrc={SellIcon}
          onClick={() => navigate(ROUTES.SELL, { viewTransition: true })}
        />
        <BannerCard
          title={
            <>
              근처
              <br />
              수리점 찾기
            </>
          }
          description="가까운 수리점을 찾아드려요."
          imageSrc={GearIcon}
          onClick={() => navigate(ROUTES.REPAIR, { viewTransition: true })}
        />
      </section>
>>>>>>> f95981d (feat: 메인페이지 카드 섹션 및 캐러셀 자리 레이아웃 구성)
    </main>
  );
}
