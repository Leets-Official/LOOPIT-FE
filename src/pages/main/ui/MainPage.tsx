import { ROUTES } from '@shared/constants';
import { useAuthStore } from '@shared/stores';
import { BannerCard } from '@shared/ui/BannerCard';
import { Carousel3D } from '@shared/ui/Carousel3D';
import { ChatbotFloatingButton } from '@shared/ui/ChatbotFloatingButton';
import { ClientOnly } from '@shared/ui/ClientOnly';
import { Modal } from '@shared/ui/Modal';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { BANNER_CARDS } from './BannerCards';
import { CAROUSEL_SLIDES } from './CarouselSlides';

const MainPage = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuthStore();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleChatbotClick = () => {
    if (!accessToken) {
      setShowLoginModal(true);
      return;
    }
    navigate(ROUTES.CHATBOT, { viewTransition: true });
  };

  return (
    <main className="md:px-xxxl flex w-full flex-col items-center gap-6 px-(--margin-l) md:gap-10 lg:gap-[68px] lg:px-0">
      <section className="h-[317px] w-full max-w-[1200px]" aria-label="메인 슬로건 영역">
        <ClientOnly>
          <Carousel3D slides={CAROUSEL_SLIDES} />
        </ClientOnly>
      </section>

      <section className="grid w-full max-w-[1200px] grid-cols-1 gap-6 xl:grid-cols-3" aria-label="서비스 배너 영역">
        {BANNER_CARDS.map((card) => (
          <BannerCard
            key={card.id}
            title={card.title}
            description={card.description}
            imageSrc={card.imageSrc}
            onClick={() => navigate(card.route, { viewTransition: true })}
          />
        ))}
      </section>

      <ChatbotFloatingButton
        className="fixed right-[calc(1rem+var(--scrollbar-width))] bottom-4"
        onClick={handleChatbotClick}
      />

      {showLoginModal && (
        <Modal
          title="로그인이 필요합니다"
          subtitle="로그인 페이지로 이동하시겠습니까?"
          cancelText="취소"
          confirmText="로그인"
          onCancel={() => setShowLoginModal(false)}
          onConfirm={() => {
            setShowLoginModal(false);
            navigate(ROUTES.LOGIN, { viewTransition: true });
          }}
        />
      )}
    </main>
  );
};

export default MainPage;
