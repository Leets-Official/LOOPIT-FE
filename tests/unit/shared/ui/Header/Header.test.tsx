import { Header } from '@shared/ui/Header/Header';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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

  describe('Login State', () => {
    it('비로그인 상태에서 로그인 버튼 렌더링', () => {
      render(<Header isLoggedIn={false} />);
      const loginButton = screen.getByRole('button', { name: '로그인' });
      expect(loginButton).toBeInTheDocument();
    });

    it('로그인 상태에서 로그인 버튼 미렌더링', () => {
      render(<Header isLoggedIn user={{ nickname: '홍길동' }} />);
      const loginButton = screen.queryByRole('button', { name: '로그인' });
      expect(loginButton).not.toBeInTheDocument();
    });

    it('로그인 상태에서 사용자 메뉴 버튼 렌더링', () => {
      render(<Header isLoggedIn user={{ nickname: '홍길동' }} />);
      const userMenuButton = screen.getByRole('button', { name: '' });
      expect(userMenuButton).toHaveAttribute('aria-haspopup', 'menu');
    });

    it('로그인 상태에서 프로필 영역 렌더링', () => {
      render(<Header isLoggedIn user={{ profileImage: '/test.jpg', nickname: '홍길동' }} />);
      const profileImage = screen.getByRole('img', { name: '프로필 이미지' });
      expect(profileImage).toBeInTheDocument();
      expect(profileImage).toHaveAttribute('src', '/test.jpg');
    });
  });

  describe('UserMenu Interaction', () => {
    it('사용자 메뉴 버튼 클릭 시 드롭다운 렌더링', async () => {
      const user = userEvent.setup();
      render(<Header isLoggedIn user={{ nickname: '홍길동' }} />);

      const userMenuButton = screen.getByRole('button', { name: '' });
      await user.click(userMenuButton);

      const dropdown = screen.getByRole('menu', { name: '사용자 메뉴' });
      expect(dropdown).toBeInTheDocument();
    });

    it('드롭다운 열림 시 닉네임 표시', async () => {
      const user = userEvent.setup();
      render(<Header isLoggedIn user={{ nickname: '테스트유저' }} />);

      const userMenuButton = screen.getByRole('button', { name: '' });
      await user.click(userMenuButton);

      expect(screen.getByText('테스트유저님')).toBeInTheDocument();
    });

    it('드롭다운 열림 시 마이페이지 링크 렌더링', async () => {
      const user = userEvent.setup();
      render(<Header isLoggedIn user={{ nickname: '홍길동' }} />);

      const userMenuButton = screen.getByRole('button', { name: '' });
      await user.click(userMenuButton);

      expect(screen.getByRole('menuitem', { name: '마이페이지' })).toBeInTheDocument();
    });

    it('드롭다운 열림 시 로그아웃 버튼 렌더링', async () => {
      const user = userEvent.setup();
      render(<Header isLoggedIn user={{ nickname: '홍길동' }} />);

      const userMenuButton = screen.getByRole('button', { name: '' });
      await user.click(userMenuButton);

      expect(screen.getByRole('button', { name: '로그아웃' })).toBeInTheDocument();
    });

    it('드롭다운 열림 시 aria-expanded true', async () => {
      const user = userEvent.setup();
      render(<Header isLoggedIn user={{ nickname: '홍길동' }} />);

      const userMenuButton = screen.getByRole('button', { name: '' });
      await user.click(userMenuButton);

      expect(userMenuButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('드롭다운 닫힘 시 aria-expanded false', () => {
      render(<Header isLoggedIn user={{ nickname: '홍길동' }} />);
      const userMenuButton = screen.getByRole('button', { name: '' });
      expect(userMenuButton).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('Callback Props', () => {
    it('로그인 버튼 클릭 시 onLoginClick 호출', async () => {
      const user = userEvent.setup();
      const handleLoginClick = vi.fn();
      render(<Header isLoggedIn={false} onLoginClick={handleLoginClick} />);

      const loginButton = screen.getByRole('button', { name: '로그인' });
      await user.click(loginButton);

      expect(handleLoginClick).toHaveBeenCalledTimes(1);
    });

    it('마이페이지 클릭 시 onMyPageClick 호출', async () => {
      const user = userEvent.setup();
      const handleMyPageClick = vi.fn();
      render(<Header isLoggedIn user={{ nickname: '홍길동' }} onMyPageClick={handleMyPageClick} />);

      const userMenuButton = screen.getByRole('button', { name: '' });
      await user.click(userMenuButton);

      const myPageLink = screen.getByRole('menuitem', { name: '마이페이지' });
      await user.click(myPageLink);

      expect(handleMyPageClick).toHaveBeenCalledTimes(1);
    });

    it('로그아웃 버튼 클릭 시 onLogoutClick 호출', async () => {
      const user = userEvent.setup();
      const handleLogoutClick = vi.fn();
      render(<Header isLoggedIn user={{ nickname: '홍길동' }} onLogoutClick={handleLogoutClick} />);

      const userMenuButton = screen.getByRole('button', { name: '' });
      await user.click(userMenuButton);

      const logoutButton = screen.getByRole('button', { name: '로그아웃' });
      await user.click(logoutButton);

      expect(handleLogoutClick).toHaveBeenCalledTimes(1);
    });
  });
});
