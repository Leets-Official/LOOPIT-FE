import { Checkbox } from '@shared/ui/Checkbox/Checkbox';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Shared/UI/Checkbox',
  component: Checkbox,
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Checkbox',
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    label: 'Checkbox',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Checkbox',
  },
};
