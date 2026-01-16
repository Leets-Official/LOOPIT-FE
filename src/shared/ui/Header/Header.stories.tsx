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

export const Default: Story = {
  args: {},
};

export const WithCustomClassName: Story = {
  args: {
    className: 'shadow-md',
  },
};

export const FullPage: Story = {
  render: () => (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="flex items-center justify-center p-8">
        <div className="max-w-2xl">
          <h1 className="typo-title-1 mb-4">페이지 제목</h1>
          <p className="typo-body-1 text-gray-600">
            이 스토리는 전체 페이지 레이아웃에서 Header가 어떻게 보이는지 확인할 수 있습니다.
          </p>
        </div>
      </main>
    </div>
  ),
};

export const Responsive: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <span className="typo-caption-1">Desktop (1440px+)</span>
        <div className="w-full border border-gray-200">
          <Header />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="typo-caption-1">Tablet (1024px)</span>
        <div className="w-[1024px] border border-gray-200">
          <Header />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="typo-caption-1">Small Desktop (768px)</span>
        <div className="w-[768px] border border-gray-200">
          <Header />
        </div>
      </div>

      <p className="typo-caption-2 max-w-md text-gray-600">
        브라우저 창 크기를 조절하거나 Storybook의 viewport 도구를 사용하여 반응형 동작을 확인하세요.
      </p>
    </div>
  ),
};

export const NavigationShowcase: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <Header />
      <div className="mx-auto max-w-4xl p-8">
        <h2 className="typo-title-2 mb-4">네비게이션 항목</h2>
        <ul className="typo-body-1 space-y-2 text-gray-700">
          <li>• 구매하기 - 중고 제품 구매 페이지</li>
          <li>• 판매하기 - 내 제품 판매 등록</li>
          <li>• 수리점찾기 - 근처 수리점 검색</li>
          <li>• 챗봇 - 고객 지원 챗봇</li>
          <li>• 마이페이지 - 사용자 정보 및 설정</li>
        </ul>
      </div>
    </div>
  ),
};
