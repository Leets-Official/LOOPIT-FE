import { BannerCard } from '@shared/ui/BannerCard';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('BannerCard', () => {
  describe('Rendering', () => {
    it('배너 카드 렌더링', () => {
      render(<BannerCard />);
      expect(screen.getByTestId('banner-card')).toBeInTheDocument();
    });

    it('기본 타이틀 렌더링', () => {
      render(<BannerCard />);
      expect(screen.getByText(/중고 전자기기/)).toBeInTheDocument();
      expect(screen.getByText(/구매하기/)).toBeInTheDocument();
    });

    it('커스텀 props 렌더링', () => {
      render(<BannerCard title="커스텀 타이틀" description="커스텀 설명" buttonText="커스텀 버튼" />);
      expect(screen.getByText('커스텀 타이틀')).toBeInTheDocument();
      expect(screen.getByText('커스텀 설명')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '커스텀 버튼' })).toBeInTheDocument();
    });
  });

  describe('Interaction', () => {
    it('카드 클릭 시 onClick 호출', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(<BannerCard onClick={onClick} />);

      await user.click(screen.getByTestId('banner-card'));
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('Enter 키로 onClick 호출', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(<BannerCard onClick={onClick} />);

      screen.getByTestId('banner-card').focus();
      await user.keyboard('{Enter}');
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('Space 키로 onClick 호출', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(<BannerCard onClick={onClick} />);

      screen.getByTestId('banner-card').focus();
      await user.keyboard(' ');
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Additional Props', () => {
    it('className prop 적용', () => {
      render(<BannerCard className="custom-class" />);
      expect(screen.getByTestId('banner-card')).toHaveClass('custom-class');
    });
  });
});
