import { TradeItem } from '@shared/ui/TradeItem';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('TradeItem', () => {
  const defaultProps = {
    imageUrl: '/iphone11.png',
    modelName: 'iPhone 11 Pro 256GB',
    price: '850,000원',
    date: '2026.01.22',
  };

  describe('Rendering', () => {
    it('기본 렌더링', () => {
      render(<TradeItem {...defaultProps} />);

      expect(screen.getByText('iPhone 11 Pro 256GB')).toBeInTheDocument();
      expect(screen.getByText('850,000원')).toBeInTheDocument();
      expect(screen.getByText('2026.01.22')).toBeInTheDocument();
    });

    it('기본 상태는 판매중 (active)', () => {
      render(<TradeItem {...defaultProps} />);

      expect(screen.getByText('판매중')).toBeInTheDocument();
    });

    it('상태별 텍스트 렌더링', () => {
      const { rerender } = render(<TradeItem {...defaultProps} status="active" />);
      expect(screen.getByText('판매중')).toBeInTheDocument();

      rerender(<TradeItem {...defaultProps} status="reserved" />);
      expect(screen.getByText('예약중')).toBeInTheDocument();

      rerender(<TradeItem {...defaultProps} status="completed" />);
      expect(screen.getByText('판매완료')).toBeInTheDocument();
    });

    it('statusLabel로 커스텀 라벨 표시', () => {
      render(<TradeItem {...defaultProps} status="active" statusLabel="구매중" />);

      expect(screen.getByText('구매중')).toBeInTheDocument();
    });

    it('이미지 URL이 있을 때 img 렌더링', () => {
      render(<TradeItem {...defaultProps} />);
      const image = screen.getByRole('img', { name: 'iPhone 11 Pro 256GB' });

      expect(image).toHaveAttribute('src', '/iphone11.png');
    });

    it('이미지 URL이 없을 때 플레이스홀더 렌더링', () => {
      render(<TradeItem {...defaultProps} imageUrl={undefined} />);
      expect(screen.getByRole('img', { name: 'iPhone 11 Pro 256GB 이미지 없음' })).toBeInTheDocument();
    });
  });

  describe('Favorite Status', () => {
    it('favorite 상태에서 버튼 표시', () => {
      render(<TradeItem {...defaultProps} status="favorite" />);

      expect(screen.getByRole('button', { name: '찜' })).toBeInTheDocument();
      expect(screen.queryByText('구매중')).not.toBeInTheDocument();
      expect(screen.queryByText('예약중')).not.toBeInTheDocument();
      expect(screen.queryByText('구매완료')).not.toBeInTheDocument();
    });

    it('favorite 버튼 클릭 시 onToggleFavorite 호출', async () => {
      const user = userEvent.setup();
      const handleToggle = vi.fn();
      render(<TradeItem {...defaultProps} status="favorite" favoriteActive={false} onToggleFavorite={handleToggle} />);

      await user.click(screen.getByRole('button', { name: '찜' }));
      expect(handleToggle).toHaveBeenCalledTimes(1);
    });
  });
});
