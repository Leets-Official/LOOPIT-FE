import { Profile } from '@shared/ui/Profile/Profile';
import { render, screen } from '@testing-library/react';

describe('Profile', () => {
  describe('Rendering', () => {
    it('기본 렌더링 (placeholder)', () => {
      const { container } = render(<Profile />);
      const root = container.firstChild;
      expect(root).toBeInTheDocument();
    });

    it('이미지와 함께 렌더링', () => {
      render(<Profile image="/test.jpg" />);
      const image = screen.getByRole('img');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', '/test.jpg');
    });

    it('이미지 없을 때 img 태그 미렌더링', () => {
      render(<Profile />);
      const image = screen.queryByRole('img');
      expect(image).not.toBeInTheDocument();
    });
  });

  describe('Size Variants', () => {
    it('기본 size는 sm', () => {
      const { container } = render(<Profile />);
      const root = container.firstChild as HTMLElement;
      expect(root).toHaveClass('w-[44px]', 'h-[44px]');
    });

    it('size="sm" 적용', () => {
      const { container } = render(<Profile size="sm" />);
      const root = container.firstChild as HTMLElement;
      expect(root).toHaveClass('w-[44px]', 'h-[44px]');
    });

    it('size="lg" 적용 (반응형)', () => {
      const { container } = render(<Profile size="lg" />);
      const root = container.firstChild as HTMLElement;
      expect(root).toHaveClass('w-[100px]', 'h-[100px]', 'md:w-[180px]', 'md:h-[180px]');
    });
  });

  describe('Accessibility', () => {
    it('기본 alt 텍스트 적용', () => {
      render(<Profile image="/test.jpg" />);
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('alt', '프로필 이미지');
    });

    it('커스텀 alt 텍스트 적용', () => {
      render(<Profile image="/test.jpg" alt="홍길동 프로필" />);
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('alt', '홍길동 프로필');
    });
  });

  describe('Additional Props', () => {
    it('className prop 적용', () => {
      const { container } = render(<Profile className="custom-class" />);
      const root = container.firstChild;
      expect(root).toHaveClass('custom-class');
    });

    it('추가 HTML 속성 적용', () => {
      render(<Profile data-testid="custom-profile" />);
      expect(screen.getByTestId('custom-profile')).toBeInTheDocument();
    });
  });
});
