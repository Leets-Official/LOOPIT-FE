import { ShopCard } from '@shared/ui/ShopCard/ShopCard';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('ShopCard', () => {
  const defaultProps = {
    name: '애플 서비스센터 강남점',
    address: '서울시 강남구 테헤란로 123',
  };

  describe('Rendering', () => {
    it('이름과 주소 렌더링', () => {
      render(<ShopCard {...defaultProps} />);

      expect(screen.getByText('애플 서비스센터 강남점')).toBeInTheDocument();
      expect(screen.getByText('서울시 강남구 테헤란로 123')).toBeInTheDocument();
    });

    it('전화번호가 있으면 링크로 렌더링', () => {
      render(<ShopCard {...defaultProps} phone="02-1234-5678" />);

      const phoneLink = screen.getByRole('link', { name: '02-1234-5678' });
      expect(phoneLink).toHaveAttribute('href', 'tel:02-1234-5678');
    });

    it('전화번호가 없으면 빈 공간 렌더링', () => {
      render(<ShopCard {...defaultProps} />);

      expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });

    it('길 찾기 버튼 렌더링', () => {
      render(<ShopCard {...defaultProps} />);

      expect(screen.getByRole('button', { name: '길 찾기' })).toBeInTheDocument();
    });

    it('찜 버튼 렌더링', () => {
      render(<ShopCard {...defaultProps} />);

      expect(screen.getByRole('button', { name: /찜/ })).toBeInTheDocument();
    });
  });

  describe('Interaction', () => {
    it('카드 클릭 시 onSelect 호출', async () => {
      const user = userEvent.setup();
      const handleSelect = vi.fn();
      render(<ShopCard {...defaultProps} onSelect={handleSelect} />);

      const card = screen.getByRole('button', { name: /애플 서비스센터 강남점/ });
      await user.click(card);

      expect(handleSelect).toHaveBeenCalledTimes(1);
    });

    it('Enter 키로 onSelect 호출', async () => {
      const user = userEvent.setup();
      const handleSelect = vi.fn();
      render(<ShopCard {...defaultProps} onSelect={handleSelect} />);

      const card = screen.getByRole('button', { name: /애플 서비스센터 강남점/ });
      card.focus();
      await user.keyboard('{Enter}');

      expect(handleSelect).toHaveBeenCalledTimes(1);
    });

    it('Space 키로 onSelect 호출', async () => {
      const user = userEvent.setup();
      const handleSelect = vi.fn();
      render(<ShopCard {...defaultProps} onSelect={handleSelect} />);

      const card = screen.getByRole('button', { name: /애플 서비스센터 강남점/ });
      card.focus();
      await user.keyboard(' ');

      expect(handleSelect).toHaveBeenCalledTimes(1);
    });

    it('찜 버튼 클릭 시 onFavoriteToggle 호출 (카드 클릭은 안 됨)', async () => {
      const user = userEvent.setup();
      const handleSelect = vi.fn();
      const handleFavoriteToggle = vi.fn();
      render(<ShopCard {...defaultProps} onSelect={handleSelect} onFavoriteToggle={handleFavoriteToggle} />);

      const favoriteButton = screen.getByRole('button', { name: /찜/ });
      await user.click(favoriteButton);

      expect(handleFavoriteToggle).toHaveBeenCalledTimes(1);
      expect(handleSelect).not.toHaveBeenCalled();
    });

    it('길 찾기 버튼 클릭 시 onFindRoute 호출 (카드 클릭은 안 됨)', async () => {
      const user = userEvent.setup();
      const handleSelect = vi.fn();
      const handleFindRoute = vi.fn();
      render(<ShopCard {...defaultProps} onSelect={handleSelect} onFindRoute={handleFindRoute} />);

      const findRouteButton = screen.getByRole('button', { name: '길 찾기' });
      await user.click(findRouteButton);

      expect(handleFindRoute).toHaveBeenCalledTimes(1);
      expect(handleSelect).not.toHaveBeenCalled();
    });

    it('전화번호 클릭 시 카드 클릭은 안 됨', async () => {
      const user = userEvent.setup();
      const handleSelect = vi.fn();
      render(<ShopCard {...defaultProps} phone="02-1234-5678" onSelect={handleSelect} />);

      const phoneLink = screen.getByRole('link', { name: '02-1234-5678' });
      await user.click(phoneLink);

      expect(handleSelect).not.toHaveBeenCalled();
    });
  });

  describe('길 찾기 기능', () => {
    it('onFindRoute가 없고 lat/lng가 있으면 카카오맵 URL로 이동', async () => {
      const user = userEvent.setup();
      const windowOpenSpy = vi.spyOn(window, 'open').mockImplementation(() => null);

      render(<ShopCard {...defaultProps} lat={37.5665} lng={126.978} />);

      const findRouteButton = screen.getByRole('button', { name: '길 찾기' });
      await user.click(findRouteButton);

      expect(windowOpenSpy).toHaveBeenCalledWith(
        expect.stringContaining('map.kakao.com/link/to'),
        '_blank',
        'noopener,noreferrer'
      );

      windowOpenSpy.mockRestore();
    });

    it('onFindRoute가 없고 placeUrl이 있으면 placeUrl로 이동', async () => {
      const user = userEvent.setup();
      const windowOpenSpy = vi.spyOn(window, 'open').mockImplementation(() => null);

      render(<ShopCard {...defaultProps} placeUrl="https://place.map.kakao.com/12345" />);

      const findRouteButton = screen.getByRole('button', { name: '길 찾기' });
      await user.click(findRouteButton);

      expect(windowOpenSpy).toHaveBeenCalledWith('https://place.map.kakao.com/12345', '_blank', 'noopener,noreferrer');

      windowOpenSpy.mockRestore();
    });

    it('lat/lng와 placeUrl 둘 다 있으면 lat/lng 우선', async () => {
      const user = userEvent.setup();
      const windowOpenSpy = vi.spyOn(window, 'open').mockImplementation(() => null);

      render(<ShopCard {...defaultProps} lat={37.5665} lng={126.978} placeUrl="https://place.map.kakao.com/12345" />);

      const findRouteButton = screen.getByRole('button', { name: '길 찾기' });
      await user.click(findRouteButton);

      expect(windowOpenSpy).toHaveBeenCalledWith(
        expect.stringContaining('map.kakao.com/link/to'),
        '_blank',
        'noopener,noreferrer'
      );

      windowOpenSpy.mockRestore();
    });
  });

  describe('Accessibility', () => {
    it('카드가 button role을 가짐', () => {
      render(<ShopCard {...defaultProps} />);

      const card = screen.getByRole('button', { name: /애플 서비스센터 강남점/ });
      expect(card).toBeInTheDocument();
    });

    it('카드가 tabIndex 0을 가짐', () => {
      render(<ShopCard {...defaultProps} />);

      const card = screen.getByRole('button', { name: /애플 서비스센터 강남점/ });
      expect(card).toHaveAttribute('tabIndex', '0');
    });
  });
});
