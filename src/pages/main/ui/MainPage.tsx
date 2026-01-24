import { GearIcon, SellIcon, ShoppingIcon } from '@shared/assets/icons';
import { ROUTES } from '@shared/constants';
import { BannerCard } from '@shared/ui/BannerCard';
import { ChatbotFloatingButton } from '@shared/ui/ChatbotFloatingButton';
import { useNavigate } from 'react-router';

export default function MainPage() {
  const navigate = useNavigate();

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
