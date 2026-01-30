import { GearIcon, SellIcon, ShoppingIcon } from '@shared/assets/icons';
import { Carousel1Image, Carousel2Image, Carousel3Image, Carousel4Image } from '@shared/assets/images';
import { Carousel3D } from './Carousel3D.client';
import { CarouselImageSlide } from './CarouselImageSlide';
import { CarouselSlide } from './CarouselSlide';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Shared/UI/Carousel3D',
  component: Carousel3D,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    autoplayDelay: {
      control: { type: 'number', min: 1000, max: 10000, step: 500 },
      description: 'Autoplay delay (ms)',
    },
    loop: {
      control: 'boolean',
      description: 'Infinite loop',
    },
  },
  decorators: [
    (Story) => (
      <div className="h-[400px] w-[800px] bg-black">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Carousel3D>;

export default meta;
type Story = StoryObj<typeof meta>;

const iconSlides = [
  {
    id: 1,
    content: (
      <CarouselSlide
        iconSrc={ShoppingIcon}
        title="믿을 수 있는 중고거래"
        description="검증된 판매자와 안전한 거래를 경험하세요"
      />
    ),
  },
  {
    id: 2,
    content: <CarouselSlide iconSrc={GearIcon} title="AI 챗봇 상담" description="궁금한 점은 AI에게 물어보세요" />,
  },
  {
    id: 3,
    content: (
      <CarouselSlide iconSrc={SellIcon} title="간편한 판매" description="사용하지 않는 기기를 쉽게 판매하세요" />
    ),
  },
];

const imageSlides = [
  {
    id: 1,
    content: (
      <CarouselImageSlide imageSrc={Carousel1Image} title="중고폰 구매" subtitle="검증된 중고폰을 합리적인 가격에" />
    ),
  },
  {
    id: 2,
    content: (
      <CarouselImageSlide imageSrc={Carousel2Image} title="내 폰 판매" subtitle="안 쓰는 폰, 현금으로 바꾸세요" />
    ),
  },
  {
    id: 3,
    content: <CarouselImageSlide imageSrc={Carousel3Image} title="수리점 찾기" subtitle="가까운 수리점을 찾아드려요" />,
  },
  {
    id: 4,
    content: <CarouselImageSlide imageSrc={Carousel4Image} title="친환경 순환" subtitle="버려지는 폰에 새 생명을" />,
  },
];

export const Default: Story = {
  args: {
    slides: iconSlides,
    autoplayDelay: 4000,
    loop: true,
  },
};

export const ImageSlides: Story = {
  args: {
    slides: imageSlides,
    autoplayDelay: 4000,
    loop: true,
  },
};

export const FastAutoplay: Story = {
  args: {
    slides: imageSlides,
    autoplayDelay: 2000,
    loop: true,
  },
};

export const NoLoop: Story = {
  args: {
    slides: imageSlides,
    autoplayDelay: 4000,
    loop: false,
  },
};
