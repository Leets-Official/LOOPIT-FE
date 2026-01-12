import { Button } from '@shared/ui/Button/Button';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Shared/UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['fill', 'outline'],
      description: 'Button variant style',
    },
    children: {
      control: 'text',
      description: 'Button text content',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Fill: Story = {
  args: {
    variant: 'fill',
    children: 'Button',
  },
};

export const FillDisabled: Story = {
  args: {
    variant: 'fill',
    children: 'Button',
    disabled: true,
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Button',
  },
};

export const OutlineDisabled: Story = {
  args: {
    variant: 'outline',
    children: 'Button',
    disabled: true,
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="typo-caption-1">Fill Variant</span>
        <div className="flex gap-4">
          <Button variant="fill">Default</Button>
          <Button variant="fill" disabled>
            Disabled
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="typo-caption-1">Outline Variant</span>
        <div className="flex gap-4">
          <Button variant="outline">Default</Button>
          <Button variant="outline" disabled>
            Disabled
          </Button>
        </div>
      </div>
      <p className="typo-caption-2 max-w-md text-gray-600">
        Hover와 Focus 상태를 확인하려면 마우스를 올리거나 Tab 키로 포커스를 이동하세요.
      </p>
    </div>
  ),
};
