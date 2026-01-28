import { Toast } from './Toast';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Shared/UI/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    tone: {
      control: 'select',
      options: ['default', 'success'],
      description: 'Toast tone style',
    },
    message: {
      control: 'text',
      description: 'Toast message content',
    },
    dismissible: {
      control: 'boolean',
      description: 'Show dismiss button',
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: '오류가 발생했습니다',
    tone: 'default',
    dismissible: true,
    onDismiss: () => {},
  },
};

export const Success: Story = {
  args: {
    message: '성공적으로 저장되었습니다',
    tone: 'success',
    dismissible: true,
    onDismiss: () => {},
  },
};

export const NonDismissible: Story = {
  args: {
    message: '자동으로 사라지는 토스트',
    tone: 'default',
    dismissible: false,
  },
};

export const AllStates: Story = {
  args: {
    message: '전체 상태',
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <span className="typo-caption-1">Default Tone</span>
        <Toast message="오류가 발생했습니다" tone="default" onDismiss={() => {}} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="typo-caption-1">Success Tone</span>
        <Toast message="성공적으로 저장되었습니다" tone="success" onDismiss={() => {}} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="typo-caption-1">Non-dismissible</span>
        <Toast message="닫기 버튼 없음" dismissible={false} />
      </div>
    </div>
  ),
};
