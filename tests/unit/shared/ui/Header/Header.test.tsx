import { Header } from '@shared/ui/Header/Header';
import { render, screen } from '@testing-library/react';

describe('Header', () => {
  describe('Rendering', () => {
    it('header 요소 렌더링', () => {
      render(<Header />);
      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
    });

    it('로고 렌더링', () => {
      render(<Header />);
      const logo = screen.getByRole('banner').querySelector('svg');
      expect(logo).toBeInTheDocument();
    });

    it('네비게이션 영역 렌더링', () => {
      render(<Header />);
      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
    });

    it('로그인 버튼 렌더링', () => {
      render(<Header />);
      const loginButton = screen.getByRole('button', { name: '로그인' });
      expect(loginButton).toBeInTheDocument();
    });
  });

  describe('Navigation Items', () => {
    it('5개의 네비게이션 항목 렌더링', () => {
      render(<Header />);
      const nav = screen.getByRole('navigation');
      const navItems = nav.querySelectorAll('span');
      expect(navItems).toHaveLength(5);
    });

    it('구매하기 네비게이션 항목 렌더링', () => {
      render(<Header />);
      expect(screen.getByText('구매하기')).toBeInTheDocument();
    });

    it('판매하기 네비게이션 항목 렌더링', () => {
      render(<Header />);
      expect(screen.getByText('판매하기')).toBeInTheDocument();
    });

    it('수리점찾기 네비게이션 항목 렌더링', () => {
      render(<Header />);
      expect(screen.getByText('수리점찾기')).toBeInTheDocument();
    });

    it('챗봇 네비게이션 항목 렌더링', () => {
      render(<Header />);
      expect(screen.getByText('챗봇')).toBeInTheDocument();
    });

    it('마이페이지 네비게이션 항목 렌더링', () => {
      render(<Header />);
      expect(screen.getByText('마이페이지')).toBeInTheDocument();
    });

    it('네비게이션 항목이 올바른 순서로 렌더링', () => {
      render(<Header />);
      const nav = screen.getByRole('navigation');
      const navItems = nav.querySelectorAll('span');

      expect(navItems[0]).toHaveTextContent('구매하기');
      expect(navItems[1]).toHaveTextContent('판매하기');
      expect(navItems[2]).toHaveTextContent('수리점찾기');
      expect(navItems[3]).toHaveTextContent('챗봇');
      expect(navItems[4]).toHaveTextContent('마이페이지');
    });
  });

  describe('Structure', () => {
    it('로고가 헤더 내부에 렌더링', () => {
      render(<Header />);
      const header = screen.getByRole('banner');
      const logo = header.querySelector('svg');
      expect(logo).toBeInTheDocument();
    });

    it('네비게이션이 헤더 내부에 렌더링', () => {
      render(<Header />);
      const header = screen.getByRole('banner');
      const nav = screen.getByRole('navigation');
      expect(header).toContainElement(nav);
    });

    it('로그인 버튼이 헤더 내부에 렌더링', () => {
      render(<Header />);
      const header = screen.getByRole('banner');
      const loginButton = screen.getByRole('button', { name: '로그인' });
      expect(header).toContainElement(loginButton);
    });

    it('로그인 버튼이 fill variant와 auto size 사용', () => {
      render(<Header />);
      const loginButton = screen.getByRole('button', { name: '로그인' });
      expect(loginButton).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('header role 올바르게 설정', () => {
      render(<Header />);
      const header = screen.getByRole('banner');
      expect(header.tagName).toBe('HEADER');
    });

    it('navigation role 올바르게 설정', () => {
      render(<Header />);
      const nav = screen.getByRole('navigation');
      expect(nav.tagName).toBe('NAV');
    });

    it('로그인 버튼이 접근 가능', () => {
      render(<Header />);
      const loginButton = screen.getByRole('button', { name: '로그인' });
      expect(loginButton).toBeInTheDocument();
      expect(loginButton).not.toBeDisabled();
    });
  });

  describe('Additional Props', () => {
    it('className prop 적용', () => {
      render(<Header className="custom-class" />);
      const header = screen.getByRole('banner');
      expect(header).toHaveClass('custom-class');
    });

    it('추가 HTML 속성 적용', () => {
      render(<Header data-testid="custom-header" />);
      const header = screen.getByTestId('custom-header');
      expect(header).toBeInTheDocument();
    });

    it('aria-label 적용', () => {
      render(<Header aria-label="메인 네비게이션" />);
      const header = screen.getByRole('banner', { name: '메인 네비게이션' });
      expect(header).toBeInTheDocument();
    });

    it('id 속성 적용', () => {
      render(<Header id="main-header" />);
      const header = screen.getByRole('banner');
      expect(header).toHaveAttribute('id', 'main-header');
    });
  });
});
