import { ChatCircleCloseIcon, GearIcon, SellIcon, ShoppingIcon } from '@shared/assets/icons';
import { ROUTES } from '@shared/constants';
import { useToast } from '@shared/contexts/ToastContext';
import { BannerCard } from '@shared/ui/BannerCard';
import { ChatbotFloatingButton } from '@shared/ui/ChatbotFloatingButton';
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
    <main className="flex w-full flex-col items-center gap-14 px-4 pt-8 pb-24">
      <section className="h-79.25 w-full max-w-300" aria-label="메인 슬로건 영역" />

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
      <ChatbotFloatingButton
        className="fixed right-4 bottom-4"
        onClick={() => navigate(ROUTES.CHATBOT, { viewTransition: true })}
      />
    </main>
  );
}
