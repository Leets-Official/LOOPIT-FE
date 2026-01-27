import { RepairList } from './RepairList';
import type { Meta, StoryObj } from '@storybook/react-vite';

const SAMPLE_ITEMS = [
  { id: '1', name: '애플 공식 서비스센터 강남', address: '서울 강남구 테헤란로 123', favoriteActive: true },
  { id: '2', name: '삼성 디지털프라자 역삼점', address: '서울 강남구 역삼로 456', favoriteActive: false },
  { id: '3', name: '프리미엄 수리센터', address: '서울 서초구 서초대로 789', favoriteActive: false },
];

const meta = {
  title: 'Shared/UI/RepairList',
  component: RepairList,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    emptyMessage: {
      control: 'text',
      description: 'Message when list is empty',
    },
    onContact: {
      action: 'contacted',
      description: 'Contact button click handler',
    },
    onFindRoute: {
      action: 'findRoute',
      description: 'Find route button click handler',
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[700px] p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RepairList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: SAMPLE_ITEMS,
    emptyMessage: '검색 결과가 없습니다',
  },
};

export const SingleItem: Story = {
  args: {
    items: [SAMPLE_ITEMS[0]],
    emptyMessage: '검색 결과가 없습니다',
  },
};

export const Empty: Story = {
  args: {
    items: [],
    emptyMessage: '주변에 수리점이 없습니다',
  },
};

export const WithFavorites: Story = {
  args: {
    items: SAMPLE_ITEMS.map((item, i) => ({ ...item, favoriteActive: i === 0 })),
    emptyMessage: '검색 결과가 없습니다',
  },
};

export const Interactive: Story = {
  args: {
    items: SAMPLE_ITEMS,
    emptyMessage: '검색 결과가 없습니다',
  },
  render: (args) => (
    <RepairList
      {...args}
      onContact={(item) => console.log('연락하기:', item.name)}
      onFindRoute={(item) => console.log('길 찾기:', item.name)}
    />
  ),
};
