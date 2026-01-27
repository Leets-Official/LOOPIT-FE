import { ChatPromptList } from './ChatPromptList';
import type { Meta, StoryObj } from '@storybook/react-vite';

const SAMPLE_PROMPTS = ['아이폰 판매하기', '갤럭시 매입가 조회', '수리점 찾기', '중고폰 시세 확인'];

const meta = {
  title: 'Shared/UI/ChatPromptList',
  component: ChatPromptList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['fixed', 'auto'],
      description: 'Prompt item size',
    },
    tone: {
      control: 'select',
      options: ['default'],
      description: 'Prompt tone style',
    },
    onPromptClick: {
      action: 'clicked',
      description: 'Prompt click handler',
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[600px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ChatPromptList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    prompts: SAMPLE_PROMPTS,
    size: 'fixed',
  },
};

export const AutoSize: Story = {
  args: {
    prompts: SAMPLE_PROMPTS,
    size: 'auto',
  },
};

export const SinglePrompt: Story = {
  args: {
    prompts: ['아이폰 판매하기'],
    size: 'fixed',
  },
};

export const LongPrompts: Story = {
  args: {
    prompts: [
      '아이폰 15 Pro Max 256GB 판매하고 싶어요',
      '갤럭시 S24 울트라 예상 매입가가 궁금해요',
      '강남역 근처 공식 수리점을 찾고 있어요',
    ],
    size: 'fixed',
  },
};

export const Interactive: Story = {
  args: {
    prompts: SAMPLE_PROMPTS,
    size: 'fixed',
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <p className="typo-caption-2 text-gray-600">프롬프트를 클릭해보세요 (콘솔에서 확인)</p>
      <ChatPromptList
        {...args}
        onPromptClick={(prompt, index) => console.log(`Clicked: ${prompt} (index: ${index})`)}
      />
    </div>
  ),
};
