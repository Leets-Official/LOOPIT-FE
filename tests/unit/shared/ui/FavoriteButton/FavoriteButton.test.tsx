import { FavoriteButton } from '@shared/ui/FavoriteButton/FavoriteButton';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('FavoriteButton', () => {
  describe('Rendering', () => {
    it('버튼 렌더링', () => {
      render(<FavoriteButton />);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('하트 아이콘 렌더링', () => {
      render(<FavoriteButton />);
      const icon = document.querySelector('svg');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Toggle State', () => {
    it('기본값 비활성화 상태', () => {
      render(<FavoriteButton />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-pressed', 'false');
    });

    it('defaultActive=true 시 활성화 상태', () => {
      render(<FavoriteButton defaultActive />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-pressed', 'true');
    });

    it('클릭 시 토글', async () => {
      const user = userEvent.setup();
      render(<FavoriteButton />);
      const button = screen.getByRole('button');

      expect(button).toHaveAttribute('aria-pressed', 'false');

      await user.click(button);
      expect(button).toHaveAttribute('aria-pressed', 'true');

      await user.click(button);
      expect(button).toHaveAttribute('aria-pressed', 'false');
    });

    it('onToggle 콜백 호출', async () => {
      const user = userEvent.setup();
      const handleToggle = vi.fn();
      render(<FavoriteButton onToggle={handleToggle} />);
      const button = screen.getByRole('button');

      await user.click(button);
      expect(handleToggle).toHaveBeenCalledWith(true);

      await user.click(button);
      expect(handleToggle).toHaveBeenCalledWith(false);
    });
  });

  describe('Variant', () => {
    it('기본 variant는 default', () => {
      render(<FavoriteButton />);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('inverse variant 렌더링', () => {
      render(<FavoriteButton variant="inverse" />);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('기본 aria-label 설정', () => {
      render(<FavoriteButton />);
      const button = screen.getByRole('button', { name: '찜' });
      expect(button).toBeInTheDocument();
    });

    it('커스텀 aria-label 설정', () => {
      render(<FavoriteButton ariaLabel="즐겨찾기" />);
      const button = screen.getByRole('button', { name: '즐겨찾기' });
      expect(button).toBeInTheDocument();
    });

    it('키보드로 토글 가능 (Enter)', async () => {
      const user = userEvent.setup();
      const handleToggle = vi.fn();
      render(<FavoriteButton onToggle={handleToggle} />);

      await user.tab();
      await user.keyboard('{Enter}');

      expect(handleToggle).toHaveBeenCalledWith(true);
    });

    it('키보드로 토글 가능 (Space)', async () => {
      const user = userEvent.setup();
      const handleToggle = vi.fn();
      render(<FavoriteButton onToggle={handleToggle} />);

      await user.tab();
      await user.keyboard(' ');

      expect(handleToggle).toHaveBeenCalledWith(true);
    });

    it('포커스 가능', async () => {
      const user = userEvent.setup();
      render(<FavoriteButton />);
      const button = screen.getByRole('button');

      await user.tab();
      expect(button).toHaveFocus();
    });
  });
});
