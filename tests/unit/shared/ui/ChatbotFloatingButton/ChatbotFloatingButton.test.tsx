import { ChatbotFloatingButton } from '@shared/ui/ChatbotFloatingButton/ChatbotFloatingButton';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('ChatbotFloatingButton', () => {
  describe('Rendering', () => {
    it('기본 라벨 렌더링', () => {
      render(<ChatbotFloatingButton />);
      expect(screen.getByText('챗봇상담')).toBeInTheDocument();
    });

    it('커스텀 라벨 렌더링', () => {
      render(<ChatbotFloatingButton label="문의하기" />);
      expect(screen.getByText('문의하기')).toBeInTheDocument();
    });

    it('버튼 role 렌더링', () => {
      render(<ChatbotFloatingButton />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('아이콘 이미지 렌더링', () => {
      const { container } = render(<ChatbotFloatingButton />);
      const img = container.querySelector('img');
      expect(img).toBeInTheDocument();
    });
  });

  describe('Interaction', () => {
    it('클릭 이벤트 호출', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<ChatbotFloatingButton onClick={handleClick} />);

      await user.click(screen.getByRole('button'));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('aria-label 적용', () => {
      render(<ChatbotFloatingButton label="챗봇상담" />);
      expect(screen.getByRole('button', { name: '챗봇상담' })).toBeInTheDocument();
    });

    it('아이콘에 aria-hidden 적용', () => {
      const { container } = render(<ChatbotFloatingButton />);
      const img = container.querySelector('img');
      expect(img).toHaveAttribute('aria-hidden', 'true');
    });

    it('키보드로 클릭 가능', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<ChatbotFloatingButton onClick={handleClick} />);

      await user.tab();
      await user.keyboard('{Enter}');

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Additional Props', () => {
    it('className prop 적용', () => {
      render(<ChatbotFloatingButton className="custom-class" />);
      expect(screen.getByRole('button')).toHaveClass('custom-class');
    });

    it('기본 type은 button', () => {
      render(<ChatbotFloatingButton />);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
    });
  });
});
