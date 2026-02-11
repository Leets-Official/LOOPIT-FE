import { ROUTES } from '@shared/constants';
import { useAuthStore, useUIStore } from '@shared/stores';
import { BannerCard } from '@shared/ui/BannerCard';
import { Carousel3D } from '@shared/ui/Carousel3D';
import { ClientOnly } from '@shared/ui/ClientOnly';
import { lazy, Suspense } from 'react';
import { useNavigate } from 'react-router';
import { BANNER_CARDS } from './BannerCards';
import { createCarouselSlides } from './CarouselSlides';

const ChatbotFloatingButton = lazy(() =>
  import('@shared/ui/ChatbotFloatingButton').then((m) => ({ default: m.ChatbotFloatingButton }))
);

const MainPage = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuthStore();
  const { openLoginModal } = useUIStore();

  const handleProtectedClick = () => {
    if (!accessToken) {
      openLoginModal();
      return false;
    }
    return true;
  };

  const carouselSlides = createCarouselSlides({ onProtectedClick: handleProtectedClick });

  const handleChatbotClick = () => {
    if (!accessToken) {
      openLoginModal();
      return;
    }
    navigate(ROUTES.CHATBOT, { viewTransition: true });
  };

  return (
    <main className="md:px-xxxl flex w-full flex-col items-center gap-6 px-(--margin-l) md:gap-10 lg:gap-[68px] lg:px-0">
      <section className="h-[317px] w-full max-w-[1200px]" aria-label="메인 슬로건 영역">
        <ClientOnly>
          <Carousel3D slides={carouselSlides} />
        </ClientOnly>
      </section>

      <section className="grid w-full max-w-[1200px] grid-cols-1 gap-6 md:grid-cols-3" aria-label="서비스 배너 영역">
        {BANNER_CARDS.map((card) => (
          <BannerCard
            key={card.id}
            title={card.title}
            description={card.description}
            imageSrc={card.imageSrc}
            onClick={() => {
              if (card.id === 'sell' && !handleProtectedClick()) {
                return;
              }
              navigate(card.route, { viewTransition: true });
            }}
          />
        ))}
      </section>

      <Suspense fallback={null}>
        <ChatbotFloatingButton
          className="fixed right-[calc(1rem+var(--scrollbar-width))] bottom-4"
          onClick={handleChatbotClick}
        />
      </Suspense>
    </main>
  );
};

export default MainPage;
