import { MemoryRouter } from 'react-router';
import { Logo } from './Logo';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Shared/UI/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithCustomClass: Story = {
  args: {
    className: 'w-[200px]',
  },
};

export const AllStates: Story = {
  args: {},
  render: () => (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <span className="typo-caption-1">Default</span>
        <Logo />
      </div>
      <p className="typo-caption-2 max-w-md text-center text-gray-600">
        클릭하거나 Enter 키를 누르면 메인 페이지로 이동합니다
      </p>
    </div>
  ),
};
