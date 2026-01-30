import { Carousel1Image, Carousel2Image, Carousel3Image, Carousel4Image, Carousel5Image } from '@shared/assets/images';
import { CarouselImageSlide } from '@shared/ui/Carousel3D';

export const CAROUSEL_SLIDES = [
  {
    id: 1,
    content: (
      <CarouselImageSlide imageSrc={Carousel1Image} title="버리기 전, 루핏" subtitle="Before you throw out, LOOPIT" />
    ),
  },
  {
    id: 2,
    content: <CarouselImageSlide imageSrc={Carousel2Image} title="중고폰 구매" subtitle="합리적인 가격, 검증된 상품" />,
  },
  {
    id: 3,
    content: (
      <CarouselImageSlide
        imageSrc={Carousel3Image}
        title="나의 폰 판매"
        subtitle="나는 쓰지 않는 폰, 다른 사람은 쓰기 좋은 폰"
      />
    ),
  },
  {
    id: 4,
    content: (
      <CarouselImageSlide imageSrc={Carousel4Image} title="수리점 찾기" subtitle="내 집 근처 수리점 어디에 있을까?" />
    ),
  },
  {
    id: 5,
    content: <CarouselImageSlide imageSrc={Carousel5Image} title="전자폐기물을 줄이기" subtitle="고쳐쓰고, 다시쓰자" />,
  },
];
