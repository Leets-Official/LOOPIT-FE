import { ProductItem } from '@shared/ui/ProductItem';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('ProductItem', () => {
  const defaultProps = {
    imageUrl: '/iphone11.png',
    modelName: 'iPhone 11 Pro 256GB',
    price: '850,000원',
    date: '2026.01.22',
  };

  describe('Rendering', () => {
    it('기본 렌더링', () => {
      render(<ProductItem {...defaultProps} />);

      expect(screen.getByText('iPhone 11 Pro 256GB')).toBeInTheDocument();
      expect(screen.getByText('850,000원')).toBeInTheDocument();
      expect(screen.getByText('2026.01.22')).toBeInTheDocument();
    });

    it('기본 상태는 구매중', () => {
      render(<ProductItem {...defaultProps} />);

      expect(screen.getByText('구매중')).toBeInTheDocument();
    });

    it('상태별 텍스트 렌더링', () => {
      const { rerender } = render(<ProductItem {...defaultProps} status="reserved" />);
      expect(screen.getByText('예약중')).toBeInTheDocument();

      rerender(<ProductItem {...defaultProps} status="completed" />);
      expect(screen.getByText('구매완료')).toBeInTheDocument();
    });

    it('이미지 URL이 있을 때 backgroundImage 적용', () => {
      const { container } = render(<ProductItem {...defaultProps} />);
      const image = container.querySelector('div[style]') as HTMLElement;

      expect(image).toBeInTheDocument();
      expect(image.style.backgroundImage).toContain('/iphone11.png');
    });
  });

  describe('Favorite Status', () => {
    it('favorite 상태에서 버튼 표시', () => {
      render(<ProductItem {...defaultProps} status="favorite" />);

      expect(screen.getByRole('button', { name: '찜' })).toBeInTheDocument();
      expect(screen.queryByText('구매중')).not.toBeInTheDocument();
      expect(screen.queryByText('예약중')).not.toBeInTheDocument();
      expect(screen.queryByText('구매완료')).not.toBeInTheDocument();
    });

    it('favorite 버튼 클릭 시 onToggleFavorite 호출', async () => {
      const user = userEvent.setup();
      const handleToggle = vi.fn();
      render(
        <ProductItem {...defaultProps} status="favorite" favoriteActive={false} onToggleFavorite={handleToggle} />
      );

      await user.click(screen.getByRole('button', { name: '찜' }));
      expect(handleToggle).toHaveBeenCalledTimes(1);
    });
  });
});
