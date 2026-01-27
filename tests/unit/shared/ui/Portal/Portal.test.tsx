import { Portal } from '@shared/ui/Portal/Portal';
import { render, screen } from '@testing-library/react';

describe('Portal', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('Rendering', () => {
    it('children을 portal container에 렌더링', () => {
      render(
        <Portal>
          <div data-testid="portal-content">Content</div>
        </Portal>
      );

      expect(screen.getByTestId('portal-content')).toBeInTheDocument();
    });

    it('기본 containerId는 portal-root', () => {
      render(
        <Portal>
          <div>Content</div>
        </Portal>
      );

      expect(document.getElementById('portal-root')).toBeInTheDocument();
    });

    it('커스텀 containerId 적용', () => {
      render(
        <Portal containerId="custom-portal">
          <div>Content</div>
        </Portal>
      );

      expect(document.getElementById('custom-portal')).toBeInTheDocument();
    });
  });

  describe('Container Management', () => {
    it('container가 없으면 자동으로 생성', () => {
      expect(document.getElementById('portal-root')).not.toBeInTheDocument();

      render(
        <Portal>
          <div>Content</div>
        </Portal>
      );

      expect(document.getElementById('portal-root')).toBeInTheDocument();
    });

    it('기존 container가 있으면 재사용', () => {
      const existingContainer = document.createElement('div');
      existingContainer.id = 'portal-root';
      document.body.appendChild(existingContainer);

      render(
        <Portal>
          <div data-testid="content">Content</div>
        </Portal>
      );

      expect(document.querySelectorAll('#portal-root')).toHaveLength(1);
      expect(screen.getByTestId('content')).toBeInTheDocument();
    });

    it('여러 Portal이 같은 container 공유', () => {
      render(
        <>
          <Portal>
            <div data-testid="first">First</div>
          </Portal>
          <Portal>
            <div data-testid="second">Second</div>
          </Portal>
        </>
      );

      expect(document.querySelectorAll('#portal-root')).toHaveLength(1);
      expect(screen.getByTestId('first')).toBeInTheDocument();
      expect(screen.getByTestId('second')).toBeInTheDocument();
    });
  });
});
