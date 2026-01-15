import { Header } from '@shared/ui/Header/Header';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Shared/UI/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {
  args: {
    isLoggedIn: false,
  },
};

export const LoggedIn: Story = {
  args: {
    isLoggedIn: true,
    user: {
      profileImage: '/profile-sample.jpg',
      nickname: '홍길동',
    },
  },
};

export const LoggedInWithoutProfileImage: Story = {
  args: {
    isLoggedIn: true,
    user: {
      nickname: '김철수',
    },
  },
};

export const LoginStates: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <span className="typo-caption-1 text-gray-500">비로그인 상태</span>
        <Header isLoggedIn={false} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="typo-caption-1 text-gray-500">로그인 상태 (프로필 이미지 있음)</span>
        <Header isLoggedIn user={{ profileImage: '/profile-sample.jpg', nickname: '홍길동' }} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="typo-caption-1 text-gray-500">로그인 상태 (프로필 이미지 없음)</span>
        <Header isLoggedIn user={{ nickname: '김철수' }} />
      </div>
    </div>
  ),
};
