import { useState } from 'react';
import { ChatInput } from './ChatInput';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Shared/UI/ChatInput',
  component: ChatInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    value: {
      control: 'text',
      description: 'Controlled value',
    },
    onSend: {
      action: 'sent',
      description: 'Send handler',
    },
    onChange: {
      action: 'changed',
      description: 'Change handler (controlled mode)',
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ChatInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: '메시지를 입력하세요',
    onSend: (message) => console.log('Sent:', message),
  },
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: '질문을 입력해 주세요...',
    onSend: (message) => console.log('Sent:', message),
  },
};

const ControlledChatInput = () => {
  const [value, setValue] = useState('');

  return (
    <ChatInput
      placeholder="메시지를 입력하세요"
      value={value}
      onChange={setValue}
      onSend={(message) => {
        console.log('Sent:', message);
        setValue('');
      }}
    />
  );
};

export const Controlled: Story = {
  args: {
    placeholder: '메시지를 입력하세요',
    onSend: () => {},
  },
  render: () => <ControlledChatInput />,
};

export const Interactive: Story = {
  args: {
    placeholder: '메시지를 입력하세요',
    onSend: () => {},
  },
  render: () => {
    const [messages, setMessages] = useState<string[]>([]);

    return (
      <div className="flex flex-col gap-4">
        <div className="min-h-[100px] rounded-lg bg-gray-100 p-4">
          {messages.length === 0 ? (
            <p className="typo-caption-2 text-gray-400">메시지를 입력하고 Enter 또는 전송 버튼을 눌러보세요</p>
          ) : (
            messages.map((msg, i) => (
              <p key={i} className="typo-body-2">
                {msg}
              </p>
            ))
          )}
        </div>
        <ChatInput placeholder="메시지를 입력하세요" onSend={(message) => setMessages((prev) => [...prev, message])} />
      </div>
    );
  },
};
