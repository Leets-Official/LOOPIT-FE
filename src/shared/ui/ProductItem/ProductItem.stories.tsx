import { ProductItem } from '@shared/ui/ProductItem';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Shared/UI/ProductItem',
  component: ProductItem,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    imageUrl: { control: 'text' },
    modelName: { control: 'text' },
    price: { control: 'text' },
    date: { control: 'text' },
    status: {
      control: 'select',
      options: ['buying', 'reserved', 'completed', 'favorite'],
    },
    favoriteActive: { control: 'boolean' },
  },
} satisfies Meta<typeof ProductItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    imageUrl: '/iphone11.png',
    modelName: 'iPhone 11 Pro 256GB',
    price: '850,000원',
    date: '2026.01.22',
    status: 'buying',
  },
};

export const Favorite: Story = {
  args: {
    imageUrl: '/iphone11.png',
    modelName: 'iPhone 11 Pro 256GB',
    price: '850,000원',
    date: '2026.01.22',
    status: 'favorite',
    favoriteActive: true,
  },
};

export const AllStates = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="typo-caption-1">상태별</span>
        <div className="flex flex-col gap-3">
          <ProductItem
            imageUrl="/iphone11.png"
            modelName="iPhone 11 Pro 256GB"
            price="850,000원"
            date="2026.01.22"
            status="buying"
          />
          <ProductItem
            imageUrl="/iphone11.png"
            modelName="iPhone 11 Pro 256GB"
            price="850,000원"
            date="2026.01.22"
            status="reserved"
          />
          <ProductItem
            imageUrl="/iphone11.png"
            modelName="iPhone 11 Pro 256GB"
            price="850,000원"
            date="2026.01.22"
            status="completed"
          />
          <ProductItem
            imageUrl="/iphone11.png"
            modelName="iPhone 11 Pro 256GB"
            price="850,000원"
            date="2026.01.22"
            status="favorite"
            favoriteActive
          />
        </div>
      </div>
      <p className="typo-caption-2 max-w-md text-gray-600">Favorite 상태: 하트 버튼 표시, 상태 텍스트는 숨김</p>
    </div>
  ),
};
