import { ChatBubble } from './ChatBubble';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Shared/UI/ChatBubble',
  component: ChatBubble,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['receiver', 'sender'],
      description: 'Bubble variant',
    },
    message: {
      control: 'text',
      description: 'Message content',
    },
    meta: {
      control: 'text',
      description: 'Meta information (e.g., time)',
    },
    metaDateTime: {
      control: 'text',
      description: 'DateTime attribute for accessibility',
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[600px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ChatBubble>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Receiver: Story = {
  args: {
    variant: 'receiver',
    message: '안녕하세요! 무엇을 도와드릴까요?',
    meta: '오후 2:30',
    metaDateTime: '2024-01-15T14:30:00',
  },
};

export const Sender: Story = {
  args: {
    variant: 'sender',
    message: '아이폰 15 Pro 판매하고 싶어요',
    meta: '오후 2:31',
    metaDateTime: '2024-01-15T14:31:00',
  },
};

export const LongMessage: Story = {
  args: {
    variant: 'receiver',
    message:
      '네, 아이폰 15 Pro 판매를 도와드리겠습니다. 기기의 상태를 확인하기 위해 몇 가지 질문을 드릴게요. 먼저, 기기의 저장 용량이 어떻게 되나요?',
    meta: '오후 2:32',
  },
};

export const WithoutMeta: Story = {
  args: {
    variant: 'receiver',
    message: '메타 정보 없는 메시지입니다',
  },
};

export const Conversation: Story = {
  args: {
    message: '대화',
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <ChatBubble variant="receiver" message="안녕하세요! 무엇을 도와드릴까요?" meta="오후 2:30" />
      <ChatBubble variant="sender" message="아이폰 15 Pro 판매하고 싶어요" meta="오후 2:31" />
      <ChatBubble
        variant="receiver"
        message="네, 아이폰 15 Pro 판매를 도와드리겠습니다. 기기의 저장 용량이 어떻게 되나요?"
        meta="오후 2:32"
      />
      <ChatBubble variant="sender" message="256GB입니다" meta="오후 2:33" />
    </div>
  ),
};
