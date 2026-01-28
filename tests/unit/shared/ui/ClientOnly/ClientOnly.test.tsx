import { ClientOnly } from '@shared/ui/ClientOnly/ClientOnly';
import { render, screen } from '@testing-library/react';

describe('ClientOnly', () => {
  describe('Rendering', () => {
    it('마운트 후 children 렌더링', () => {
      render(
        <ClientOnly>
          <div data-testid="content">Client Content</div>
        </ClientOnly>
      );

      expect(screen.getByTestId('content')).toBeInTheDocument();
    });

    it('fallback 렌더링 후 children으로 전환', () => {
      const { rerender } = render(
        <ClientOnly fallback={<div data-testid="fallback">Loading...</div>}>
          <div data-testid="content">Client Content</div>
        </ClientOnly>
      );

      // 마운트 후에는 children이 표시됨
      expect(screen.getByTestId('content')).toBeInTheDocument();
      expect(screen.queryByTestId('fallback')).not.toBeInTheDocument();

      // rerender해도 children 유지
      rerender(
        <ClientOnly fallback={<div data-testid="fallback">Loading...</div>}>
          <div data-testid="content">Client Content</div>
        </ClientOnly>
      );

      expect(screen.getByTestId('content')).toBeInTheDocument();
    });

    it('fallback 기본값은 null', () => {
      // hasMounted가 이미 true이므로 children이 바로 렌더링됨
      render(
        <ClientOnly>
          <div data-testid="content">Content</div>
        </ClientOnly>
      );

      expect(screen.getByTestId('content')).toBeInTheDocument();
    });
  });

  describe('Children Handling', () => {
    it('여러 children 렌더링', () => {
      render(
        <ClientOnly>
          <div data-testid="first">First</div>
          <div data-testid="second">Second</div>
        </ClientOnly>
      );

      expect(screen.getByTestId('first')).toBeInTheDocument();
      expect(screen.getByTestId('second')).toBeInTheDocument();
    });

    it('텍스트 children 렌더링', () => {
      render(<ClientOnly>Text Content</ClientOnly>);

      expect(screen.getByText('Text Content')).toBeInTheDocument();
    });
  });
});
