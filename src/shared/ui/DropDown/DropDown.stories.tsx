import { useRef, useState } from 'react';
import { DropDown } from './DropDown';
import type { Meta, StoryObj } from '@storybook/react-vite';

const MANUFACTURERS = ['Apple', 'Samsung', 'LG', 'Xiaomi', 'Google'] as const;

const meta = {
  title: 'Shared/UI/DropDown',
  component: DropDown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Dropdown label',
    },
    value: {
      control: 'text',
      description: 'Selected value',
    },
    isOpen: {
      control: 'boolean',
      description: 'Dropdown open state',
    },
    error: {
      control: 'boolean',
      description: 'Error state',
    },
    helperText: {
      control: 'text',
      description: 'Helper text below dropdown',
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[300px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DropDown>;

export default meta;
type Story = StoryObj<typeof meta>;

const DropDownWithState = ({
  label = '제조사',
  error = false,
  helperText,
}: {
  label?: string;
  error?: boolean;
  helperText?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  return (
    <DropDown
      label={label}
      value={value}
      options={MANUFACTURERS}
      isOpen={isOpen}
      dropdownRef={dropdownRef}
      error={error}
      helperText={helperText}
      onToggle={() => setIsOpen((prev) => !prev)}
      onSelect={(selected) => {
        setValue(selected);
        setIsOpen(false);
      }}
    />
  );
};

export const Default: Story = {
  args: {
    label: '제조사',
    value: '',
    options: MANUFACTURERS,
    isOpen: false,
    dropdownRef: { current: null },
    onToggle: () => {},
    onSelect: () => {},
  },
  render: () => <DropDownWithState />,
};

export const WithSelection: Story = {
  args: {
    label: '제조사',
    value: 'Apple',
    options: MANUFACTURERS,
    isOpen: false,
    dropdownRef: { current: null },
    onToggle: () => {},
    onSelect: () => {},
  },
  render: () => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    return (
      <DropDown
        label="제조사"
        value="Apple"
        options={MANUFACTURERS}
        isOpen={false}
        dropdownRef={dropdownRef}
        onToggle={() => {}}
        onSelect={() => {}}
      />
    );
  },
};

export const Open: Story = {
  args: {
    label: '제조사',
    value: '',
    options: MANUFACTURERS,
    isOpen: true,
    dropdownRef: { current: null },
    onToggle: () => {},
    onSelect: () => {},
  },
  render: () => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    return (
      <DropDown
        label="제조사"
        value=""
        options={MANUFACTURERS}
        isOpen={true}
        dropdownRef={dropdownRef}
        onToggle={() => {}}
        onSelect={() => {}}
      />
    );
  },
};

export const WithError: Story = {
  args: {
    label: '제조사',
    value: '',
    options: MANUFACTURERS,
    isOpen: false,
    dropdownRef: { current: null },
    error: true,
    helperText: '제조사를 선택해 주세요',
    onToggle: () => {},
    onSelect: () => {},
  },
  render: () => <DropDownWithState error helperText="제조사를 선택해 주세요" />,
};

export const Interactive: Story = {
  args: {
    label: '제조사',
    value: '',
    options: MANUFACTURERS,
    isOpen: false,
    dropdownRef: { current: null },
    onToggle: () => {},
    onSelect: () => {},
  },
  render: () => <DropDownWithState />,
};
