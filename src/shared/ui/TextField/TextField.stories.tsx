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
      description: 'TextField type',
    },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    helperText: { control: 'text' },
    showCharacterCount: { control: 'boolean' },
    value: { control: 'text' },
    defaultValue: { control: 'text' },
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Showcase: Story = {
  name: 'Playground Showcase (9)',
  render: () => (
    <div className="flex flex-wrap gap-10">
      {/* Char Field */}
      <div className="flex flex-col gap-4">
        <h3 className="typo-caption-1 font-semibold">Char Field</h3>

        <div className="w-127.25">
          <TextField
            type="char"
            label="Char Field"
            placeholder="Enter your username"
            showCharacterCount
            helperText="Default"
          />
        </div>

        <div className="w-127.25">
          <TextField
            type="char"
            label="Char Field"
            placeholder="Enter your username"
            showCharacterCount
            error
            helperText="Error"
          />
        </div>

        <div className="w-127.25">
          <TextField
            type="char"
            label="Char Field"
            placeholder="Enter your username"
            showCharacterCount
            disabled
            helperText="Disabled"
          />
        </div>
      </div>

      {/* TextArea Field */}
      <div className="flex flex-col gap-4">
        <h3 className="typo-caption-1 font-semibold">TextArea Field</h3>

        <div className="w-127.25">
          <TextField
            type="textarea"
            label="TextArea Field"
            placeholder="Enter a description"
            showCharacterCount
            helperText="Default"
          />
        </div>

        <div className="w-127.25">
          <TextField
            type="textarea"
            label="TextArea Field"
            placeholder="Enter a description"
            showCharacterCount
            error
            helperText="Error"
          />
        </div>

        <div className="w-127.25">
          <TextField
            type="textarea"
            label="TextArea Field"
            placeholder="Enter a description"
            showCharacterCount
            disabled
            helperText="Disabled"
          />
        </div>
      </div>

      {/* Price Field */}
      <div className="flex flex-col gap-4">
        <h3 className="typo-caption-1 font-semibold">Price Field</h3>

        <div className="w-127.25">
          <TextField
            type="price"
            label="Price Field"
            placeholder="Enter price"
            defaultValue="10000"
            helperText="Default"
          />
        </div>

        <div className="w-127.25">
          <TextField
            type="price"
            label="Price Field"
            placeholder="Enter price"
            defaultValue="10000"
            error
            helperText="Error"
          />
        </div>

        <div className="w-127.25">
          <TextField
            type="price"
            label="Price Field"
            placeholder="Enter price"
            defaultValue="10000"
            disabled
            helperText="Disabled"
          />
        </div>
      </div>

      {/* Date Field */}
      <div className="flex flex-col gap-4">
        <h3 className="typo-caption-1 font-semibold">Date Field</h3>

        <div className="w-127.25">
          <TextField
            type="date"
            label="Date Field"
            placeholder="2026년 00월 00일"
            helperText="Default"
          />
        </div>

        <div className="w-127.25">
          <TextField
            type="date"
            label="Date Field"
            placeholder="2026년 00월 00일"
            error
            helperText="Error"
          />
        </div>

        <div className="w-127.25">
          <TextField
            type="date"
            label="Date Field"
            placeholder="2026년 00월 00일"
            disabled
            helperText="Disabled"
          />
        </div>
      </div>
    </div>
  ),
};

/**
 * (옵션) 단일 스토리들도 기본적인 확인용으로 남겨두고 싶으면 최소만 유지
 */
export const CharDefault: Story = {
  args: {
    type: 'char',
    label: 'Char Field',
    placeholder: 'Enter your username',
    showCharacterCount: true,
    helperText: 'Default',
  },
};

export const TextareaDefault: Story = {
  args: {
    type: 'textarea',
    label: 'TextArea Field',
    placeholder: 'Enter a description',
    showCharacterCount: true,
    helperText: 'Default',
  },
};

export const PriceDefault: Story = {
  args: {
    type: 'price',
    label: 'Price Field',
    placeholder: 'Enter price',
    defaultValue: '10000',
    helperText: 'Default',
  },
};

export const DateDefault: Story = {
  args: {
    type: 'date',
    label: 'Date Field',
    placeholder: '2026년 00월 00일',
    helperText: 'Default',
  },
};
