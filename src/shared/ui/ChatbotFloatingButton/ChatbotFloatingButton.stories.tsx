import { ChatbotFloatingButton } from './ChatbotFloatingButton';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Shared/UI/ChatbotFloatingButton',
  component: ChatbotFloatingButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Button label text',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler',
    },
  },
} satisfies Meta<typeof ChatbotFloatingButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: '챗봇상담',
  },
};

export const CustomLabel: Story = {
  args: {
    label: '문의하기',
  },
};

export const AllStates: Story = {
  args: {
    label: '챗봇상담',
  },
  render: () => (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <span className="typo-caption-1">Default</span>
        <ChatbotFloatingButton />
      </div>
      <p className="typo-caption-2 max-w-md text-center text-gray-600">
        Hover 또는 Focus 시 버튼이 확장되며 라벨이 표시됩니다
      </p>
    </div>
  ),
};
