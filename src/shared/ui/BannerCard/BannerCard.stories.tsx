import { GearIcon, SellIcon, ShoppingIcon } from '@shared/assets/icons';
import { BannerCard } from '@shared/ui/BannerCard';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Shared/UI/BannerCard',
  component: BannerCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: '배너 제목 (ReactNode)',
    },
    description: {
      control: 'text',
      description: '배너 설명 (최대 2줄)',
    },
    imageSrc: {
      description: '배너 이미지 경로',
    },
    buttonText: {
      control: 'text',
      description: '버튼 텍스트',
    },
    onClick: {
      description: '클릭 시 호출되는 콜백',
    },
  },
  args: {
    onClick: () => {},
  },
} satisfies Meta<typeof BannerCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 (중고 전자기기 구매하기)
export const Default: Story = {};

// 중고 전자기기 판매하기
export const Sell: Story = {
  args: {
    title: (
      <>
        중고 전자기기
        <br />
        판매하기
      </>
    ),
    description: '간편하게 중고 기기를 판매하세요',
    imageSrc: SellIcon,
  },
};

// 근처 수리점 찾기
export const Repair: Story = {
  args: {
    title: (
      <>
        근처
        <br />
        수리점 찾기
      </>
    ),
    description: '가까운 수리점을 찾아보세요',
    imageSrc: GearIcon,
  },
};

// 쇼핑 배너
export const Shopping: Story = {
  args: {
    title: (
      <>
        중고 전자기기
        <br />
        구매하기
      </>
    ),
    description: '다양한 중고 기기를 만나보세요',
    imageSrc: ShoppingIcon,
  },
};

// 모든 배너 한눈에 보기
export const AllBanners: Story = {
  render: () => (
    <div className="flex gap-6">
      <BannerCard
        title={
          <>
            중고 전자기기
            <br />
            구매하기
          </>
        }
        description="설명 최대 길이 2줄"
        imageSrc={ShoppingIcon}
      />
      <BannerCard
        title={
          <>
            중고 전자기기
            <br />
            판매하기
          </>
        }
        description="설명 최대 길이 2줄"
        imageSrc={SellIcon}
      />
      <BannerCard
        title={
          <>
            근처
            <br />
            수리점 찾기
          </>
        }
        description="설명 최대 길이 2줄"
        imageSrc={GearIcon}
      />
    </div>
  ),
};
