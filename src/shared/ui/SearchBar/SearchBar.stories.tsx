import { SearchBar } from '@shared/ui/SearchBar';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Shared/UI/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
    },
    onSearch: {
      description: 'Enter 키 입력 시 호출되는 검색 콜백',
    },
    value: {
      control: 'text',
      description: '외부에서 제어할 검색어 값 (controlled mode)',
    },
    onChange: {
      description: '검색어 변경 시 호출되는 콜백 (controlled mode)',
    },
  },
  args: {
    onSearch: () => {},
  },
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 상태 (Uncontrolled)
export const Default: Story = {
  args: {
    placeholder: '어떤 제품을 찾으시나요?',
  },
};

// Controlled 모드
export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <div className="flex flex-col gap-4">
        <SearchBar {...args} value={value} onChange={setValue} onSearch={(query) => alert(`검색: ${query}`)} />
        <p className="typo-caption-2 text-gray-600">현재 값: {value || '(비어있음)'}</p>
      </div>
    );
  },
  args: {
    placeholder: '검색어를 입력하세요',
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="typo-caption-1 font-semibold">Default</span>
        <SearchBar placeholder="어떤 제품을 찾으시나요?" onSearch={() => {}} />
      </div>
      <p className="typo-caption-2 max-w-md text-gray-600">
        Focus 상태: 클릭하거나 Tab 키로 포커스 이동
        <br />
        Filled 상태: 텍스트 입력 시 배경색 변경
        <br />
        검색: Enter 키 입력 시 onSearch 콜백 호출
      </p>
    </div>
  ),
};
