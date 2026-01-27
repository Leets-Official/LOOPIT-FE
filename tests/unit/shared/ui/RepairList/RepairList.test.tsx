import { RepairList } from '@shared/ui/RepairList/RepairList';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const ITEMS = [
  { id: '1', name: '애플 서비스센터', address: '서울 강남구', favoriteActive: true },
  { id: '2', name: '삼성 서비스센터', address: '서울 서초구', favoriteActive: false },
];

describe('RepairList', () => {
  describe('Rendering', () => {
    it('모든 아이템 렌더링', () => {
      render(<RepairList items={ITEMS} emptyMessage="없음" />);

      expect(screen.getByText('애플 서비스센터')).toBeInTheDocument();
      expect(screen.getByText('삼성 서비스센터')).toBeInTheDocument();
    });

    it('주소 렌더링', () => {
      render(<RepairList items={ITEMS} emptyMessage="없음" />);

      expect(screen.getByText('서울 강남구')).toBeInTheDocument();
      expect(screen.getByText('서울 서초구')).toBeInTheDocument();
    });

    it('연락하기, 길 찾기 버튼 렌더링', () => {
      render(<RepairList items={ITEMS} emptyMessage="없음" />);

      expect(screen.getAllByRole('button', { name: '연락하기' })).toHaveLength(2);
      expect(screen.getAllByRole('button', { name: '길 찾기' })).toHaveLength(2);
    });

    it('찜 버튼 렌더링', () => {
      render(<RepairList items={ITEMS} emptyMessage="없음" />);

      // FavoriteButton이 2개 렌더링됨
      const favoriteButtons = screen.getAllByRole('button', { name: /찜/ });
      expect(favoriteButtons.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Empty State', () => {
    it('빈 배열이면 emptyMessage 표시', () => {
      render(<RepairList items={[]} emptyMessage="검색 결과가 없습니다" />);

      expect(screen.getByText('검색 결과가 없습니다')).toBeInTheDocument();
    });

    it('빈 배열이면 버튼 없음', () => {
      render(<RepairList items={[]} emptyMessage="없음" />);

      expect(screen.queryByRole('button', { name: '연락하기' })).not.toBeInTheDocument();
    });
  });

  describe('Interaction', () => {
    it('연락하기 버튼 클릭 시 onContact 호출', async () => {
      const user = userEvent.setup();
      const handleContact = vi.fn();
      render(<RepairList items={ITEMS} emptyMessage="없음" onContact={handleContact} />);

      const contactButtons = screen.getAllByRole('button', { name: '연락하기' });
      await user.click(contactButtons[0]);

      expect(handleContact).toHaveBeenCalledWith(ITEMS[0]);
    });

    it('길 찾기 버튼 클릭 시 onFindRoute 호출', async () => {
      const user = userEvent.setup();
      const handleFindRoute = vi.fn();
      render(<RepairList items={ITEMS} emptyMessage="없음" onFindRoute={handleFindRoute} />);

      const findRouteButtons = screen.getAllByRole('button', { name: '길 찾기' });
      await user.click(findRouteButtons[1]);

      expect(handleFindRoute).toHaveBeenCalledWith(ITEMS[1]);
    });

    it('onContact 없어도 에러 없음', async () => {
      const user = userEvent.setup();
      render(<RepairList items={ITEMS} emptyMessage="없음" />);

      const contactButtons = screen.getAllByRole('button', { name: '연락하기' });
      await expect(user.click(contactButtons[0])).resolves.not.toThrow();
    });
  });
});
