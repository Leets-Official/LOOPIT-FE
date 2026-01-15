import { BannerCard } from '@shared/ui/BannerCard';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

describe('BannerCard', () => {
  it('배너 카드 렌더링', () => {
    render(<BannerCard />);
    expect(screen.getByTestId('banner-card')).toBeInTheDocument();
  });

  it('타이틀 텍스트 렌더링', () => {
    render(<BannerCard />);
    expect(screen.getByText(/중고 전자기기/)).toBeInTheDocument();
    expect(screen.getByText(/구매하기/)).toBeInTheDocument();
  });

  it('버튼 렌더링', () => {
    render(<BannerCard />);
    expect(
      screen.getByRole('button', { name: '바로가기' })
    ).toBeInTheDocument();
  });

  it('버튼 클릭 시 onClick 호출', () => {
    const onClick = vi.fn();
    render(<BannerCard onClick={onClick} />);

    screen.getByRole('button', { name: '바로가기' }).click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('className 전달', () => {
    render(<BannerCard className="custom-class" />);
    expect(screen.getByTestId('banner-card')).toHaveClass('custom-class');
  });
});
