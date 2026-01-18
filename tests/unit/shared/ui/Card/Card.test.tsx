import { Card } from '@shared/ui/Card/Card';
import { render, screen } from '@testing-library/react';

describe('Card', () => {
  const defaultProps = {
    image: '/test-image.png',
    title: '테스트 상품',
    price: '10,000원',
    date: '1일 전',
  };

  describe('Rendering', () => {
    it('기본 렌더링', () => {
      render(<Card {...defaultProps} />);

      expect(screen.getByText('테스트 상품')).toBeInTheDocument();
      expect(screen.getByText('10,000원')).toBeInTheDocument();
      expect(screen.getByText('1일 전')).toBeInTheDocument();
    });

    it('이미지 렌더링', () => {
      render(<Card {...defaultProps} />);

      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', '/test-image.png');
    });

    it('이미지 alt 속성에 title 사용', () => {
      render(<Card {...defaultProps} />);

      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('alt', '테스트 상품');
    });
  });

  describe('Long Title', () => {
    it('긴 제목 렌더링', () => {
      const longTitle = 'Title 인데 제목이 정말 길 경우에는 두줄 까지만 보이고, 뒤엔 점 처리';
      render(<Card {...defaultProps} title={longTitle} />);

      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });
  });

  describe('Additional Props', () => {
    it('className prop 적용', () => {
      const { container } = render(<Card {...defaultProps} className="custom-class" />);

      const card = container.firstChild;
      expect(card).toHaveClass('custom-class');
    });

    it('추가 HTML 속성 적용', () => {
      render(<Card {...defaultProps} data-testid="custom-card" />);

      expect(screen.getByTestId('custom-card')).toBeInTheDocument();
    });

    it('onClick 핸들러 적용', async () => {
      const handleClick = vi.fn();
      render(<Card {...defaultProps} onClick={handleClick} />);

      const card = screen
        .getByText('테스트 상품')
        .closest('div[class*="cursor-pointer"]') as HTMLElement;
      card.click();

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});
