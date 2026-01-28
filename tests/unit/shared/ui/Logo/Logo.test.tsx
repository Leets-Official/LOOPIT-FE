import { Logo } from '@shared/ui/Logo/Logo';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

describe('Logo', () => {
  describe('Rendering', () => {
    it('로고 SVG 렌더링', () => {
      renderWithRouter(<Logo />);
      expect(screen.getByRole('button', { name: 'LOOPIT 홈으로 이동' })).toBeInTheDocument();
    });

    it('className prop 적용', () => {
      renderWithRouter(<Logo className="custom-class" />);
      expect(screen.getByRole('button')).toHaveClass('custom-class');
    });
  });

  describe('Interaction', () => {
    it('클릭 가능', async () => {
      const user = userEvent.setup();
      renderWithRouter(<Logo />);

      const logo = screen.getByRole('button');
      await expect(user.click(logo)).resolves.not.toThrow();
    });

    it('Enter 키로 활성화 가능', async () => {
      const user = userEvent.setup();
      renderWithRouter(<Logo />);

      const logo = screen.getByRole('button');
      logo.focus();
      await expect(user.keyboard('{Enter}')).resolves.not.toThrow();
    });
  });

  describe('Accessibility', () => {
    it('button role 적용', () => {
      renderWithRouter(<Logo />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('aria-label 적용', () => {
      renderWithRouter(<Logo />);
      expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'LOOPIT 홈으로 이동');
    });

    it('tabIndex 적용', () => {
      renderWithRouter(<Logo />);
      expect(screen.getByRole('button')).toHaveAttribute('tabindex', '0');
    });

    it('포커스 가능', async () => {
      const user = userEvent.setup();
      renderWithRouter(<Logo />);

      await user.tab();
      expect(screen.getByRole('button')).toHaveFocus();
    });
  });
});
