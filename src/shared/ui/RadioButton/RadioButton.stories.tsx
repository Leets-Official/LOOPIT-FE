import { RadioButton } from '@shared/ui/RadioButton/RadioButton';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Shared/UI/RadioButton',
  component: RadioButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
} satisfies Meta<typeof RadioButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Option',
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    label: 'Option',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Option',
  },
};

export const CheckedDisabled: Story = {
  args: {
    checked: true,
    disabled: true,
    label: 'Option',
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="typo-caption-1">Default State</span>
        <div className="flex gap-4">
          <RadioButton label="Unchecked" />
          <RadioButton label="Checked" checked />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="typo-caption-1">Disabled State</span>
        <div className="flex gap-4">
          <RadioButton label="Unchecked Disabled" disabled />
          <RadioButton label="Checked Disabled" checked disabled />
        </div>
      </div>
      <p className="typo-caption-2 max-w-md text-gray-600">Hover, Focus 상태 확인: 마우스 오버 또는 Tab 키 이동</p>
    </div>
  ),
};

const RadioGroupExample = () => {
  const [selected, setSelected] = useState('option1');

  return (
    <div className="flex flex-col gap-2">
      <RadioButton
        name="group"
        checked={selected === 'option1'}
        onChange={() => setSelected('option1')}
        label="Option 1"
      />
      <RadioButton
        name="group"
        checked={selected === 'option2'}
        onChange={() => setSelected('option2')}
        label="Option 2"
      />
      <RadioButton
        name="group"
        checked={selected === 'option3'}
        onChange={() => setSelected('option3')}
        label="Option 3"
      />
    </div>
  );
};

export const RadioGroup: Story = {
  render: () => <RadioGroupExample />,
};
