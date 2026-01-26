import { ChatCircleCloseIcon, GearIcon, SellIcon, ShoppingIcon } from '@shared/assets/icons';
import { ROUTES } from '@shared/constants';
import { useToast } from '@shared/hooks';
import { BannerCard } from '@shared/ui/BannerCard';
import { Carousel3D } from '@shared/ui/Carousel3D';
import { ChatbotFloatingButton } from '@shared/ui/ChatbotFloatingButton';
import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router';

type MainLocationState = {
  deleted?: boolean;
};
import { ClientOnly } from '@shared/ui/ClientOnly';
import { useNavigate } from 'react-router';
import { BANNER_CARDS } from './BannerCards';
import { CAROUSEL_SLIDES } from './CarouselSlides';

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
      <section className="h-79.25 w-full max-w-300" aria-label="메인 슬로건 영역">
        <ClientOnly>
          <Carousel3D slides={CAROUSEL_SLIDES} />
        </ClientOnly>
      </section>

      <section className="grid w-full max-w-300 grid-cols-1 gap-6 xl:grid-cols-3" aria-label="서비스 배너 영역">
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
}
