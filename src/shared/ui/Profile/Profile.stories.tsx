import { Profile } from '@shared/ui/Profile/Profile';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Shared/UI/Profile',
  component: Profile,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'lg'] },
    image: { control: 'text' },
    alt: { control: 'text' },
  },
} satisfies Meta<typeof Profile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SmallWithImage: Story = {
  args: {
    size: 'sm',
    image: '/profile-sample.jpg',
  },
};

export const LargeWithImage: Story = {
  args: {
    size: 'lg',
    image: '/profile-sample.jpg',
  },
};

export const SmallPlaceholder: Story = {
  args: {
    size: 'sm',
  },
};

export const LargePlaceholder: Story = {
  args: {
    size: 'lg',
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="typo-caption-1">이미지 있음</span>
        <div className="flex items-center gap-4">
          <Profile size="sm" image="/profile-sample.jpg" />
          <Profile size="lg" image="/profile-sample.jpg" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="typo-caption-1">Placeholder (이미지 없음)</span>
        <div className="flex items-center gap-4">
          <Profile size="sm" />
          <Profile size="lg" />
        </div>
      </div>
      <p className="typo-caption-2 max-w-md text-gray-600">size: sm (44px), lg (152px)</p>
    </div>
  ),
};
