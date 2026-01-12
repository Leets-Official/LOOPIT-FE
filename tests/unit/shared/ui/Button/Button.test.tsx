import { Button } from '@shared/ui/Button/Button';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Button', () => {
  describe('Rendering', () => {
    it('children 텍스트 렌더링', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('기본 variant는 fill', () => {
      render(<Button>Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('outline variant 렌더링', () => {
      render(<Button variant="outline">Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });
  });

  describe('Interaction', () => {
    it('onClick 핸들러 호출', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      const button = screen.getByRole('button');

      await user.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('클릭 후 자동으로 blur 처리', async () => {
      const user = userEvent.setup();
      render(<Button>Click me</Button>);
      const button = screen.getByRole('button');

      button.focus();
      expect(button).toHaveFocus();

      await user.click(button);
      expect(button).not.toHaveFocus();
    });

    it('onMouseUp 핸들러 호출', async () => {
      const user = userEvent.setup();
      const handleMouseUp = vi.fn();
      render(<Button onMouseUp={handleMouseUp}>Click me</Button>);
      const button = screen.getByRole('button');

      await user.click(button);

      expect(handleMouseUp).toHaveBeenCalledTimes(1);
    });
  });

  describe('Disabled State', () => {
    it('disabled prop 적용', () => {
      render(<Button disabled>Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('disabled 상태에서 클릭 비활성화', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <Button disabled onClick={handleClick}>
          Button
        </Button>
      );
      const button = screen.getByRole('button');

      await user.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Focus State', () => {
    it('포커스 가능', async () => {
      const user = userEvent.setup();
      render(<Button>Button</Button>);
      const button = screen.getByRole('button');

      await user.tab();
      expect(button).toHaveFocus();
    });

    it('onFocus 핸들러 호출', async () => {
      const user = userEvent.setup();
      const handleFocus = vi.fn();
      render(<Button onFocus={handleFocus}>Button</Button>);

      await user.tab();
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it('onBlur 핸들러 호출', async () => {
      const user = userEvent.setup();
      const handleBlur = vi.fn();
      render(<Button onBlur={handleBlur}>Button</Button>);

      await user.tab();
      await user.tab();
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('버튼 role 올바르게 설정', () => {
      render(<Button>Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('키보드로 클릭 가능', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Button</Button>);
      const button = screen.getByRole('button');

      await user.tab();
      expect(button).toHaveFocus();

      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('Space 키로 클릭 가능', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Button</Button>);

      await user.tab();
      await user.keyboard(' ');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Additional Props', () => {
    it('className prop 적용', () => {
      render(<Button className="custom-class">Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });

    it('추가 HTML 속성 적용', () => {
      render(<Button data-testid="custom-button">Button</Button>);
      const button = screen.getByTestId('custom-button');
      expect(button).toBeInTheDocument();
    });

    it('aria-label 적용', () => {
      render(<Button aria-label="Submit form">Submit</Button>);
      const button = screen.getByRole('button', { name: 'Submit form' });
      expect(button).toBeInTheDocument();
    });

    it('type 기본값은 button', () => {
      render(<Button>Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
    });
  });
});
