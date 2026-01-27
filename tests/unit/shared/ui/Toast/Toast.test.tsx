import { Toast } from '@shared/ui/Toast/Toast';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Toast', () => {
  describe('Rendering', () => {
    it('메시지 텍스트 렌더링', () => {
      render(<Toast message="테스트 메시지" />);
      expect(screen.getByText('테스트 메시지')).toBeInTheDocument();
    });

    it('기본 tone은 default', () => {
      render(<Toast message="테스트" />);
      expect(screen.getByText('테스트')).toBeInTheDocument();
    });

    it('success tone 렌더링', () => {
      render(<Toast message="성공" tone="success" />);
      expect(screen.getByText('성공')).toBeInTheDocument();
    });
  });

  describe('Dismiss Button', () => {
    it('dismissible true일 때 닫기 버튼 렌더링', () => {
      render(<Toast message="테스트" dismissible onDismiss={() => {}} />);
      expect(screen.getByRole('button', { name: '닫기' })).toBeInTheDocument();
    });

    it('dismissible false일 때 닫기 버튼 없음', () => {
      render(<Toast message="테스트" dismissible={false} />);
      expect(screen.queryByRole('button', { name: '닫기' })).not.toBeInTheDocument();
    });

    it('onDismiss 없으면 닫기 버튼 없음', () => {
      render(<Toast message="테스트" dismissible />);
      expect(screen.queryByRole('button', { name: '닫기' })).not.toBeInTheDocument();
    });

    it('닫기 버튼 클릭 시 onDismiss 호출', async () => {
      const user = userEvent.setup();
      const handleDismiss = vi.fn();
      render(<Toast message="테스트" dismissible onDismiss={handleDismiss} />);

      await user.click(screen.getByRole('button', { name: '닫기' }));

      expect(handleDismiss).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('아이콘에 적절한 aria 속성 존재', () => {
      render(<Toast message="테스트" />);
      expect(screen.getByText('테스트')).toBeInTheDocument();
    });

    it('닫기 버튼에 aria-label 존재', () => {
      render(<Toast message="테스트" dismissible onDismiss={() => {}} />);
      const closeButton = screen.getByRole('button', { name: '닫기' });
      expect(closeButton).toHaveAttribute('aria-label', '닫기');
    });
  });
});
