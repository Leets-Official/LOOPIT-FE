import { ROUTES } from '@shared/constants';
import { BannerCard } from '@shared/ui/BannerCard';
import { Carousel3D } from '@shared/ui/Carousel3D';
import { ChatbotFloatingButton } from '@shared/ui/ChatbotFloatingButton';
import { ClientOnly } from '@shared/ui/ClientOnly';
import { useNavigate } from 'react-router';
import { BANNER_CARDS } from './BannerCards';
import { CAROUSEL_SLIDES } from './CarouselSlides';

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <main className="flex w-full flex-col items-center gap-[68px] px-4 pb-24">
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
        className="fixed right-4 bottom-4"
        onClick={() => navigate(ROUTES.CHATBOT, { viewTransition: true })}
      />
    </main>
  );
};

export default MainPage;
