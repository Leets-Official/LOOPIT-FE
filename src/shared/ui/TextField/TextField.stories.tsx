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
    label: {
      control: 'text',
      description: 'Label text for the text field',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    error: {
      control: 'boolean',
      description: 'Error state',
    },
    helperText: {
      control: 'text',
      description: 'Helper text below the input',
    },
    value: {
      control: 'text',
      description: 'Controlled value',
    },
    defaultValue: {
      control: 'text',
      description: 'Default value for uncontrolled input',
    },
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CharField: Story = {
  args: {
    type: 'char',
    label: 'Username',
    placeholder: 'Enter your username',
    helperText: 'This is a char field',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    value: 'user@example.com',
    helperText: 'Email address',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    helperText: 'Password must be at least 8 characters',
  },
};

export const Error: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    error: true,
    helperText: 'Invalid email address',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Field',
    placeholder: 'This field is disabled',
    disabled: true,
    helperText: 'This field is disabled',
  },
};

export const Textarea: Story = {
  args: {
    type: 'textarea',
    label: 'Description',
    placeholder: 'Enter a description',
    helperText: 'This is a textarea field',
  },
};

export const PriceField: Story = {
  args: {
    type: 'price',
    label: 'Price',
    placeholder: 'Enter price',
    value: '$100.00',
    helperText: 'Price in USD',
  },
};
