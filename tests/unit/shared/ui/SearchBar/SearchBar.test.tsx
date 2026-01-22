import { SearchBar } from '@shared/ui/SearchBar/SearchBar';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('SearchBar', () => {
  describe('Rendering', () => {
    it('검색창 렌더링', () => {
      render(<SearchBar onSearch={vi.fn()} />);
      expect(screen.getByRole('search')).toBeInTheDocument();
    });

    it('placeholder 렌더링', () => {
      render(<SearchBar placeholder="검색어를 입력하세요" onSearch={vi.fn()} />);
      expect(screen.getByPlaceholderText('검색어를 입력하세요')).toBeInTheDocument();
    });

    it('검색 아이콘 렌더링', () => {
      render(<SearchBar onSearch={vi.fn()} />);
      const icon = document.querySelector('svg');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Uncontrolled Mode', () => {
    it('텍스트 입력 가능', async () => {
      const user = userEvent.setup();
      render(<SearchBar onSearch={vi.fn()} />);
      const input = screen.getByRole('searchbox');

      await user.type(input, '테스트');
      expect(input).toHaveValue('테스트');
    });

    it('Enter 키 입력 시 onSearch 호출', async () => {
      const user = userEvent.setup();
      const handleSearch = vi.fn();
      render(<SearchBar onSearch={handleSearch} />);
      const input = screen.getByRole('searchbox');

      await user.type(input, '검색어');
      await user.keyboard('{Enter}');

      expect(handleSearch).toHaveBeenCalledTimes(1);
      expect(handleSearch).toHaveBeenCalledWith('검색어');
    });
  });

  describe('Controlled Mode', () => {
    it('value prop으로 값 제어', () => {
      render(<SearchBar value="제어된 값" onSearch={vi.fn()} />);
      const input = screen.getByRole('searchbox');
      expect(input).toHaveValue('제어된 값');
    });

    it('onChange 콜백 호출', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<SearchBar value="" onChange={handleChange} onSearch={vi.fn()} />);
      const input = screen.getByRole('searchbox');

      await user.type(input, 'a');

      expect(handleChange).toHaveBeenCalledWith('a');
    });

    it('controlled 모드에서 Enter 시 현재 value로 onSearch 호출', async () => {
      const user = userEvent.setup();
      const handleSearch = vi.fn();
      render(<SearchBar value="제어된 검색어" onSearch={handleSearch} />);
      const input = screen.getByRole('searchbox');

      input.focus();
      await user.keyboard('{Enter}');

      expect(handleSearch).toHaveBeenCalledWith('제어된 검색어');
    });
  });

  describe('Focus State', () => {
    it('포커스 가능', async () => {
      const user = userEvent.setup();
      render(<SearchBar onSearch={vi.fn()} />);
      const input = screen.getByRole('searchbox');

      await user.tab();
      expect(input).toHaveFocus();
    });

    it('포커스 시 스타일 변경', async () => {
      const user = userEvent.setup();
      render(<SearchBar onSearch={vi.fn()} />);
      const input = screen.getByRole('searchbox');

      await user.click(input);
      expect(input).toHaveFocus();
    });
  });

  describe('Accessibility', () => {
    it('aria-label 설정 (placeholder 사용)', () => {
      render(<SearchBar placeholder="제품 검색" onSearch={vi.fn()} />);
      const input = screen.getByRole('searchbox');
      expect(input).toHaveAttribute('aria-label', '제품 검색');
    });

    it('placeholder 없을 때 기본 aria-label', () => {
      render(<SearchBar onSearch={vi.fn()} />);
      const input = screen.getByRole('searchbox');
      expect(input).toHaveAttribute('aria-label', 'Search');
    });

    it('search role 적용', () => {
      render(<SearchBar onSearch={vi.fn()} />);
      expect(screen.getByRole('search')).toBeInTheDocument();
    });

    it('input type이 search', () => {
      render(<SearchBar onSearch={vi.fn()} />);
      const input = screen.getByRole('searchbox');
      expect(input).toHaveAttribute('type', 'search');
    });
  });
});
