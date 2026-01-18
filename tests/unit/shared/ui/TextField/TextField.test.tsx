import { TextField } from '@shared/ui/TextField/TextField';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('TextField', () => {
  describe('Rendering', () => {
    it('label 렌더링', () => {
      render(<TextField label="Username" />);
      expect(screen.getByText('Username')).toBeInTheDocument();
    });

    it('placeholder 렌더링', () => {
      render(<TextField placeholder="Enter text" />);
      const input = screen.getByPlaceholderText('Enter text');
      expect(input).toBeInTheDocument();
    });

    it('helperText 기본 렌더링', () => {
      render(<TextField helperText="Helper text" />);
      expect(screen.getByText('Helper text')).toBeInTheDocument();
    });

    it('helperText 없으면 렌더링되지 않음', () => {
      render(<TextField />);
      expect(screen.queryByText('Enter field description')).not.toBeInTheDocument();
    });

    it('char 타입 렌더링', () => {
      render(<TextField type="char" label="Test" />);
      expect(screen.getByText('Test')).toBeInTheDocument();
      expect(screen.getByText('0/100')).toBeInTheDocument();
    });

    it('error 상태 스타일 적용', () => {
      render(<TextField error />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border-[var(--color-red-500)]');
    });

    it('disabled 상태 적용', () => {
      render(<TextField disabled />);
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
    });
  });

  describe('Type Variations', () => {
    it('textarea 타입 렌더링', () => {
      render(<TextField type="textarea" />);
      const textarea = screen.getByRole('textbox'); // textarea도 textbox role
      expect(textarea.tagName).toBe('TEXTAREA');
    });

    it('price 타입 스타일 적용', () => {
      render(<TextField type="price" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('text-right');
    });

    it('기본 타입은 input', () => {
      render(<TextField />);
      const input = screen.getByRole('textbox');
      expect(input.tagName).toBe('INPUT');
    });
  });

  describe('Interaction', () => {
    it('onChange 핸들러 호출 (uncontrolled)', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<TextField onChange={handleChange} />);
      const input = screen.getByRole('textbox');

      await user.type(input, 'test');

      expect(handleChange).toHaveBeenCalledTimes(4); // 't', 'e', 's', 't'
    });

    it('controlled value 유지', () => {
      const { rerender } = render(<TextField value="initial" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('initial');

      rerender(<TextField value="updated" />);
      expect(input).toHaveValue('updated');
    });

    it('uncontrolled defaultValue 설정', () => {
      render(<TextField defaultValue="default" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('default');
    });
  });

  describe('Character Count', () => {
    it('char 타입 글자수 카운트 표시', () => {
      render(<TextField type="char" />);
      expect(screen.getByText('0/100')).toBeInTheDocument();
    });

    it('textarea 타입 글자수 카운트 표시', () => {
      render(<TextField type="textarea" />);
      expect(screen.getByText('0/5000')).toBeInTheDocument();
    });

    it('입력 시 글자수 카운트 증가', async () => {
      const user = userEvent.setup();
      render(<TextField type="char" />);
      const input = screen.getByRole('textbox');

      await user.type(input, 'hello');
      expect(screen.getByText('5/100')).toBeInTheDocument();
    });

    it('showCharacterCount=false 시 카운트 미표시', () => {
      render(<TextField type="char" showCharacterCount={false} />);
      expect(screen.queryByText('0/100')).not.toBeInTheDocument();
    });
  });

  describe('Price Type', () => {
    it('숫자만 입력 가능', async () => {
      const user = userEvent.setup();
      render(<TextField type="price" />);
      const input = screen.getByRole('textbox');

      await user.type(input, 'abc123def');
      expect(input).toHaveValue('123');
    });

    it('천 단위 콤마 포맷팅', async () => {
      const user = userEvent.setup();
      render(<TextField type="price" />);
      const input = screen.getByRole('textbox');

      await user.type(input, '1000000');
      expect(input).toHaveValue('1,000,000');
    });

    it('원 단위 suffix 표시', () => {
      render(<TextField type="price" />);
      expect(screen.getByText('원')).toBeInTheDocument();
    });
  });

  describe('MaxLength', () => {
    it('char 타입 maxLength 기본값 100', () => {
      render(<TextField type="char" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('maxLength', '100');
    });

    it('textarea 타입 maxLength 기본값 5000', () => {
      render(<TextField type="textarea" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('maxLength', '5000');
    });
  });
});
