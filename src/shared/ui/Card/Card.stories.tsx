import { Card } from '@shared/ui/Card/Card';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Shared/UI/Card',
  component: Card,
  argTypes: {
    image: { control: 'text' },
    title: { control: 'text' },
    price: { control: 'text' },
    date: { control: 'text' },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    image: '/iphone11.png',
    title: '상품 제목',
    price: '10,000원',
    date: '1일 전',
  },
};

export const LongTitle: Story = {
  args: {
    image: '/iphone11.png',
    title: 'Title 인데 제목이 정말 길 경우에는 두줄 까지만 보이고, 뒤엔 점 처리',
    price: '99,000원',
    date: '3일 전',
  },
};

export const AllStates: Story = {
  args: {
    image: '/iphone11.png',
    title: '상품 제목',
    price: '10,000원',
    date: '1일 전',
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="typo-caption-1">기본 카드</span>
        <div className="flex gap-4">
          <Card image="/iphone11.png" title="짧은 제목" price="10,000원" date="1일 전" />
          <Card
            image="/iphone11.png"
            title="Title 인데 제목이 정말 길 경우에는 두줄 까지만 보이고, 뒤엔 점 처리"
            price="99,000원"
            date="3일 전"
          />
        </div>
      </div>
      <p className="typo-caption-2 max-w-md text-gray-600">
        Hover 상태 확인: 마우스 오버 시 오버레이 효과
      </p>
    </div>
  ),
};
