import { Modal } from '@shared/ui/Modal/Modal';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Shared/UI/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '모달 제목',
    },
    subtitle: {
      control: 'text',
      description: '모달 부제목 (선택)',
    },
    cancelText: {
      control: 'text',
      description: '취소 버튼 텍스트',
    },
    confirmText: {
      control: 'text',
      description: '확인 버튼 텍스트',
    },
    onCancel: {
      description: '취소 버튼 클릭 또는 ESC 키 입력 시 호출',
    },
    onConfirm: {
      description: '확인 버튼 클릭 시 호출',
    },
  },
  args: {
    onCancel: () => {},
    onConfirm: () => {},
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 모달
export const Default: Story = {
  args: {
    title: '해당 게시물을 삭제하시겠어요?',
    subtitle: '삭제된 게시물은 복구할 수 없습니다',
  },
};

// 부제목 없는 모달
export const WithoutSubtitle: Story = {
  args: {
    title: '정말 삭제하시겠어요?',
  },
};

// 커스텀 버튼 텍스트
export const CustomButtonText: Story = {
  args: {
    title: '로그아웃 하시겠어요?',
    subtitle: '다시 로그인해야 합니다',
    cancelText: '아니요',
    confirmText: '로그아웃',
  },
};

// 긴 제목
export const LongTitle: Story = {
  args: {
    title: '이 게시물을 정말로 삭제하시겠어요? 삭제 후에는 복구가 불가능합니다.',
    subtitle: '신중하게 결정해주세요',
  },
};
