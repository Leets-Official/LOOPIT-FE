import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { carousel3DVariants } from './Carousel3D.variants';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const { container, wrapper, pagination } = carousel3DVariants();

export interface CarouselSlideItem {
  id: string | number;
  content: ReactNode;
}

export interface Carousel3DProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  slides: CarouselSlideItem[];
  autoplayDelay?: number;
  loop?: boolean;
}

export const Carousel3D = ({ slides, autoplayDelay = 4000, loop = true, className, ...props }: Carousel3DProps) => {
  return (
    <div className={container({ className })} {...props}>
      <div className={wrapper()}>
        <Swiper
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView="auto"
          loop={loop}
          autoplay={{
            delay: autoplayDelay,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          coverflowEffect={{
            rotate: -30,
            stretch: 0,
            depth: 300,
            modifier: 1.5,
            scale: 0.8,
            slideShadows: true,
          }}
          pagination={{
            clickable: true,
          }}
          speed={800}
          modules={[EffectCoverflow, Autoplay, Pagination]}
          className={pagination()}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id} className="w-[80%]! max-w-[840px]">
              {slide.content}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
