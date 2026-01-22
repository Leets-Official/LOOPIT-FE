import { TextField } from '@shared/ui/TextField/TextField';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Shared/UI/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'char', 'textarea', 'price', 'date'],
      description: 'TextField 타입',
    },
    label: {
      control: 'text',
      description: '상단 라벨',
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    error: {
      control: 'boolean',
      description: '에러 상태',
    },
    helperText: {
      control: 'text',
      description: '하단 도움말 텍스트',
    },
    showCharacterCount: {
      control: 'boolean',
      description: '글자 수 카운터 표시 여부',
    },
    maxLength: {
      control: 'number',
      description: '최대 글자 수 (char: 100, textarea: 5000)',
    },
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 text 타입
export const Text: Story = {
  args: {
    type: 'text',
    label: 'Text Field',
    placeholder: 'Enter text',
  },
};

// 기본 char 타입
export const Char: Story = {
  args: {
    type: 'char',
    label: 'Char Field',
    placeholder: 'Enter your username',
    showCharacterCount: true,
  },
};

// char 에러 상태
export const CharError: Story = {
  args: {
    type: 'char',
    label: 'Char Field',
    placeholder: 'Enter your username',
    showCharacterCount: true,
    error: true,
    helperText: '유효하지 않은 값입니다',
  },
};

// char 비활성화 상태
export const CharDisabled: Story = {
  args: {
    type: 'char',
    label: 'Char Field',
    placeholder: 'Enter your username',
    showCharacterCount: true,
    disabled: true,
  },
};

// 기본 textarea 타입
export const Textarea: Story = {
  args: {
    type: 'textarea',
    label: 'TextArea Field',
    placeholder: 'Enter a description',
    showCharacterCount: true,
  },
};

// textarea 에러 상태
export const TextareaError: Story = {
  args: {
    type: 'textarea',
    label: 'TextArea Field',
    placeholder: 'Enter a description',
    showCharacterCount: true,
    error: true,
    helperText: '필수 입력 항목입니다',
  },
};

// textarea 비활성화 상태
export const TextareaDisabled: Story = {
  args: {
    type: 'textarea',
    label: 'TextArea Field',
    placeholder: 'Enter a description',
    showCharacterCount: true,
    disabled: true,
  },
};

// 기본 price 타입
export const Price: Story = {
  args: {
    type: 'price',
    label: 'Price Field',
    placeholder: 'Enter price',
    defaultValue: '10000',
  },
};

// price 에러 상태
export const PriceError: Story = {
  args: {
    type: 'price',
    label: 'Price Field',
    placeholder: 'Enter price',
    defaultValue: '10000',
    error: true,
    helperText: '가격을 입력해주세요',
  },
};

// price 비활성화 상태
export const PriceDisabled: Story = {
  args: {
    type: 'price',
    label: 'Price Field',
    placeholder: 'Enter price',
    defaultValue: '10000',
    disabled: true,
  },
};

// 기본 date 타입
export const Date: Story = {
  args: {
    type: 'date',
    label: 'Date Field',
    placeholder: '2026년 00월 00일',
  },
};

// date 에러 상태
export const DateError: Story = {
  args: {
    type: 'date',
    label: 'Date Field',
    placeholder: '2026년 00월 00일',
    error: true,
    helperText: '유효하지 않은 날짜입니다',
  },
};

// date 비활성화 상태
export const DateDisabled: Story = {
  args: {
    type: 'date',
    label: 'Date Field',
    placeholder: '2026년 00월 00일',
    disabled: true,
  },
};

// 모든 타입과 상태 한눈에 보기
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-wrap gap-10">
      {/* Char Field */}
      <div className="flex flex-col gap-4">
        <span className="typo-caption-1 font-semibold">Char Field</span>
        <div className="w-80">
          <TextField type="char" label="Default" placeholder="Enter your username" showCharacterCount />
        </div>
        <div className="w-80">
          <TextField
            type="char"
            label="Error"
            placeholder="Enter your username"
            showCharacterCount
            error
            helperText="유효하지 않은 값입니다"
          />
        </div>
        <div className="w-80">
          <TextField type="char" label="Disabled" placeholder="Enter your username" showCharacterCount disabled />
        </div>
      </div>

      {/* TextArea Field */}
      <div className="flex flex-col gap-4">
        <span className="typo-caption-1 font-semibold">TextArea Field</span>
        <div className="w-80">
          <TextField type="textarea" label="Default" placeholder="Enter a description" showCharacterCount />
        </div>
        <div className="w-80">
          <TextField
            type="textarea"
            label="Error"
            placeholder="Enter a description"
            showCharacterCount
            error
            helperText="필수 입력 항목입니다"
          />
        </div>
        <div className="w-80">
          <TextField type="textarea" label="Disabled" placeholder="Enter a description" showCharacterCount disabled />
        </div>
      </div>

      {/* Price Field */}
      <div className="flex flex-col gap-4">
        <span className="typo-caption-1 font-semibold">Price Field</span>
        <div className="w-80">
          <TextField type="price" label="Default" placeholder="Enter price" defaultValue="10000" />
        </div>
        <div className="w-80">
          <TextField
            type="price"
            label="Error"
            placeholder="Enter price"
            defaultValue="10000"
            error
            helperText="가격을 입력해주세요"
          />
        </div>
        <div className="w-80">
          <TextField type="price" label="Disabled" placeholder="Enter price" defaultValue="10000" disabled />
        </div>
      </div>

      {/* Date Field */}
      <div className="flex flex-col gap-4">
        <span className="typo-caption-1 font-semibold">Date Field</span>
        <div className="w-80">
          <TextField type="date" label="Default" placeholder="2026년 00월 00일" />
        </div>
        <div className="w-80">
          <TextField
            type="date"
            label="Error"
            placeholder="2026년 00월 00일"
            error
            helperText="유효하지 않은 날짜입니다"
          />
        </div>
        <div className="w-80">
          <TextField type="date" label="Disabled" placeholder="2026년 00월 00일" disabled />
        </div>
      </div>
    </div>
  ),
};
