import { FavoriteButton } from '@shared/ui/FavoriteButton/FavoriteButton';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Shared/UI/FavoriteButton',
  component: FavoriteButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'inverse'],
      description: '버튼 스타일 변형',
    },
    defaultActive: {
      control: 'boolean',
      description: '초기 활성화 상태',
    },
    ariaLabel: {
      control: 'text',
      description: '접근성 라벨',
    },
    onToggle: {
      description: '토글 시 호출되는 콜백',
    },
  },
} satisfies Meta<typeof FavoriteButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
  },
};

export const Active: Story = {
  args: {
    variant: 'default',
    defaultActive: true,
  },
};

export const Inverse: Story = {
  args: {
    variant: 'inverse',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const InverseActive: Story = {
  args: {
    variant: 'inverse',
    defaultActive: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="typo-caption-1">Default Variant</span>
        <div className="flex gap-4">
          <FavoriteButton variant="default" />
          <FavoriteButton variant="default" defaultActive />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="typo-caption-1">Inverse Variant</span>
        <div className="flex gap-4 rounded bg-gray-800 p-4">
          <FavoriteButton variant="inverse" />
          <FavoriteButton variant="inverse" defaultActive />
        </div>
      </div>
      <p className="typo-caption-2 max-w-md text-gray-600">클릭하여 토글, Focus 상태 확인: Tab 키 이동</p>
    </div>
  ),
};
