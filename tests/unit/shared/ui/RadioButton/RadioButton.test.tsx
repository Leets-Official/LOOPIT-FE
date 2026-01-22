import { RadioButton } from '@shared/ui/RadioButton/RadioButton';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('RadioButton', () => {
  describe('Rendering', () => {
    it('라벨 없이 렌더링', () => {
      render(<RadioButton />);
      const radio = screen.getByRole('radio');
      expect(radio).toBeInTheDocument();
    });

    it('라벨과 함께 렌더링', () => {
      render(<RadioButton label="옵션 1" />);
      const radio = screen.getByRole('radio', { name: '옵션 1' });
      expect(radio).toBeInTheDocument();
      expect(screen.getByText('옵션 1')).toBeInTheDocument();
    });
  });

  describe('Checked State', () => {
    it('기본값 체크되지 않음', () => {
      render(<RadioButton />);
      const radio = screen.getByRole('radio');
      expect(radio).not.toBeChecked();
    });

    it('checked prop으로 체크 상태 제어', () => {
      const { rerender } = render(<RadioButton checked={false} />);
      const radio = screen.getByRole('radio');
      expect(radio).not.toBeChecked();

      rerender(<RadioButton checked={true} />);
      expect(radio).toBeChecked();
    });

    it('클릭 시 체크 상태 변경', async () => {
      const user = userEvent.setup();
      render(<RadioButton />);
      const radio = screen.getByRole('radio');

      expect(radio).not.toBeChecked();

      await user.click(radio);
      expect(radio).toBeChecked();
    });
  });

  describe('Radio Group', () => {
    it('같은 name을 가진 라디오 버튼 중 하나만 선택 가능', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <RadioButton name="option" label="옵션 1" value="1" />
          <RadioButton name="option" label="옵션 2" value="2" />
          <RadioButton name="option" label="옵션 3" value="3" />
        </div>
      );

      const radio1 = screen.getByRole('radio', { name: '옵션 1' });
      const radio2 = screen.getByRole('radio', { name: '옵션 2' });
      const radio3 = screen.getByRole('radio', { name: '옵션 3' });

      await user.click(radio1);
      expect(radio1).toBeChecked();
      expect(radio2).not.toBeChecked();
      expect(radio3).not.toBeChecked();

      await user.click(radio2);
      expect(radio1).not.toBeChecked();
      expect(radio2).toBeChecked();
      expect(radio3).not.toBeChecked();

      await user.click(radio3);
      expect(radio1).not.toBeChecked();
      expect(radio2).not.toBeChecked();
      expect(radio3).toBeChecked();
    });
  });

  describe('Disabled State', () => {
    it('disabled prop 적용', () => {
      render(<RadioButton disabled />);
      const radio = screen.getByRole('radio');
      expect(radio).toBeDisabled();
    });

    it('disabled 상태에서 클릭 비활성화', async () => {
      const user = userEvent.setup();
      render(<RadioButton disabled />);
      const radio = screen.getByRole('radio');

      await user.click(radio);
      expect(radio).not.toBeChecked();
    });
  });

  describe('Focus State', () => {
    it('포커스 가능', async () => {
      const user = userEvent.setup();
      render(<RadioButton />);
      const radio = screen.getByRole('radio');

      await user.tab();
      expect(radio).toHaveFocus();
    });

    it('onFocus 핸들러 호출', async () => {
      const user = userEvent.setup();
      const handleFocus = vi.fn();
      render(<RadioButton onFocus={handleFocus} />);

      await user.tab();
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it('onBlur 핸들러 호출', async () => {
      const user = userEvent.setup();
      const handleBlur = vi.fn();
      render(<RadioButton onBlur={handleBlur} />);

      await user.tab();
      await user.tab();
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('aria-label 올바르게 설정', () => {
      render(<RadioButton label="결제 방법 선택" />);
      const radio = screen.getByRole('radio', { name: '결제 방법 선택' });
      expect(radio).toBeInTheDocument();
    });

    it('키보드로 선택 가능', async () => {
      const user = userEvent.setup();
      render(<RadioButton />);
      const radio = screen.getByRole('radio');

      await user.tab();
      expect(radio).toHaveFocus();

      await user.keyboard(' ');
      expect(radio).toBeChecked();
    });

    it('키보드 화살표로 그룹 내 이동', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <RadioButton name="option" label="옵션 1" value="1" />
          <RadioButton name="option" label="옵션 2" value="2" />
          <RadioButton name="option" label="옵션 3" value="3" />
        </div>
      );

      const radio1 = screen.getByRole('radio', { name: '옵션 1' });
      const radio2 = screen.getByRole('radio', { name: '옵션 2' });
      const radio3 = screen.getByRole('radio', { name: '옵션 3' });

      await user.tab();
      expect(radio1).toHaveFocus();

      await user.keyboard('{ArrowDown}');
      expect(radio2).toHaveFocus();
      expect(radio2).toBeChecked();

      await user.keyboard('{ArrowDown}');
      expect(radio3).toHaveFocus();
      expect(radio3).toBeChecked();
    });
  });

  describe('Additional Props', () => {
    it('className prop 적용', () => {
      render(<RadioButton className="custom-class" />);
      const label = screen.getByRole('radio').closest('label');
      expect(label).toHaveClass('custom-class');
    });

    it('추가 HTML 속성 적용', () => {
      render(<RadioButton data-testid="custom-radio" />);
      const radio = screen.getByTestId('custom-radio');
      expect(radio).toBeInTheDocument();
    });

    it('value prop 적용', () => {
      render(<RadioButton value="option1" />);
      const radio = screen.getByRole('radio') as HTMLInputElement;
      expect(radio.value).toBe('option1');
    });
  });
});
