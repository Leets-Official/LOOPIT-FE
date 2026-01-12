import { Checkbox } from '@shared/ui/Checkbox/Checkbox';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Checkbox', () => {
  describe('Rendering', () => {
    it('라벨 없이 렌더링', () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
    });

    it('라벨과 함께 렌더링', () => {
      render(<Checkbox label="동의합니다" />);
      const checkbox = screen.getByRole('checkbox', { name: '동의합니다' });
      expect(checkbox).toBeInTheDocument();
      expect(screen.getByText('동의합니다')).toBeInTheDocument();
    });
  });

  describe('Uncontrolled Mode', () => {
    it('기본값 체크되지 않음', () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();
    });

    it('defaultChecked로 초기값 설정', () => {
      render(<Checkbox defaultChecked />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeChecked();
    });

    it('클릭 시 체크 상태 토글', async () => {
      const user = userEvent.setup();
      render(<Checkbox label="동의" />);
      const checkbox = screen.getByRole('checkbox');

      expect(checkbox).not.toBeChecked();

      await user.click(checkbox);
      expect(checkbox).toBeChecked();

      await user.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });

    it('onChange 핸들러 호출', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Checkbox onChange={handleChange} />);
      const checkbox = screen.getByRole('checkbox');

      await user.click(checkbox);

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({
            checked: true,
          }),
        })
      );
    });
  });

  describe('Controlled Mode', () => {
    it('checked prop으로 체크 상태 제어', () => {
      const { rerender } = render(<Checkbox checked={false} onChange={() => {}} />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();

      rerender(<Checkbox checked={true} onChange={() => {}} />);
      expect(checkbox).toBeChecked();
    });

    it('checked prop 제공 시 비제어 모드 비활성화', async () => {
      const user = userEvent.setup();
      render(<Checkbox checked={false} onChange={() => {}} />);
      const checkbox = screen.getByRole('checkbox');

      await user.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });

    it('onChange와 함께 정상 동작', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      const { rerender } = render(<Checkbox checked={false} onChange={handleChange} />);
      const checkbox = screen.getByRole('checkbox');

      await user.click(checkbox);
      expect(handleChange).toHaveBeenCalledTimes(1);

      rerender(<Checkbox checked={true} onChange={handleChange} />);
      expect(checkbox).toBeChecked();
    });
  });

  describe('Disabled State', () => {
    it('disabled prop 적용', () => {
      render(<Checkbox disabled />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeDisabled();
    });

    it('disabled 상태에서 클릭 비활성화', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Checkbox disabled onChange={handleChange} />);
      const checkbox = screen.getByRole('checkbox');

      await user.click(checkbox);

      expect(handleChange).not.toHaveBeenCalled();
      expect(checkbox).not.toBeChecked();
    });
  });

  describe('Focus State', () => {
    it('포커스 가능', async () => {
      const user = userEvent.setup();
      render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox');

      await user.tab();
      expect(checkbox).toHaveFocus();
    });

    it('onFocus 핸들러 호출', async () => {
      const user = userEvent.setup();
      const handleFocus = vi.fn();
      render(<Checkbox onFocus={handleFocus} />);

      await user.tab();
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it('onBlur 핸들러 호출', async () => {
      const user = userEvent.setup();
      const handleBlur = vi.fn();
      render(<Checkbox onBlur={handleBlur} />);

      await user.tab();
      await user.tab();
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('aria-label 올바르게 설정', () => {
      render(<Checkbox label="이용약관 동의" />);
      const checkbox = screen.getByRole('checkbox', { name: '이용약관 동의' });
      expect(checkbox).toBeInTheDocument();
    });

    it('키보드로 체크/해제 가능', async () => {
      const user = userEvent.setup();
      render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox');

      await user.tab();
      expect(checkbox).toHaveFocus();

      await user.keyboard(' ');
      expect(checkbox).toBeChecked();

      await user.keyboard(' ');
      expect(checkbox).not.toBeChecked();
    });
  });

  describe('Additional Props', () => {
    it('className prop 적용', () => {
      render(<Checkbox className="custom-class" />);
      const label = screen.getByRole('checkbox').closest('label');
      expect(label).toHaveClass('custom-class');
    });

    it('추가 HTML 속성 적용', () => {
      render(<Checkbox data-testid="custom-checkbox" />);
      const checkbox = screen.getByTestId('custom-checkbox');
      expect(checkbox).toBeInTheDocument();
    });
  });
});
