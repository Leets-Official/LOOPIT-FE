import {
  PhoneRecycleImage,
  PhoneRepairImage,
  PhoneSellImage,
  SloganImage,
  SmartphoneImage,
} from '@shared/assets/images';
import { CarouselImageSlide } from '@shared/ui/Carousel3D';

export const CAROUSEL_SLIDES = [
  {
    id: 1,
    content: (
      <CarouselImageSlide imageSrc={SloganImage} title="버리기 전, 루핏" subtitle="Before you throw out, LOOPIT" />
    ),
  },
  {
    id: 2,
    content: (
      <CarouselImageSlide imageSrc={SmartphoneImage} title="중고폰 구매" subtitle="검증된 중고폰을 합리적인 가격에" />
    ),
  },
  {
    id: 3,
    content: (
      <CarouselImageSlide imageSrc={PhoneSellImage} title="내 폰 판매" subtitle="안 쓰는 폰, 현금으로 바꾸세요" />
    ),
  },
  {
    id: 4,
    content: (
      <CarouselImageSlide imageSrc={PhoneRepairImage} title="수리점 찾기" subtitle="가까운 수리점을 찾아드려요" />
    ),
  },
  {
    id: 5,
    content: <CarouselImageSlide imageSrc={PhoneRecycleImage} title="친환경 순환" subtitle="버려지는 폰에 새 생명을" />,
  },
];
