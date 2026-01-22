import { Checkbox } from '@shared/ui/Checkbox/Checkbox';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Shared/UI/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
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

export const CheckedDisabled: Story = {
  args: {
    checked: true,
    disabled: true,
    label: 'Checkbox',
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="typo-caption-1">Default State</span>
        <div className="flex gap-4">
          <Checkbox label="Unchecked" />
          <Checkbox label="Checked" checked />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="typo-caption-1">Disabled State</span>
        <div className="flex gap-4">
          <Checkbox label="Unchecked Disabled" disabled />
          <Checkbox label="Checked Disabled" checked disabled />
        </div>
      </div>
      <p className="typo-caption-2 max-w-md text-gray-600">Hover, Focus 상태 확인: 마우스 오버 또는 Tab 키 이동</p>
    </div>
  ),
};
