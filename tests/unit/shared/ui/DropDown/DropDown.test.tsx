import { DropDown } from '@shared/ui/DropDown/DropDown';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';

const OPTIONS = ['Apple', 'Samsung', 'LG'] as const;

describe('DropDown', () => {
  const defaultProps = {
    label: '제조사',
    value: '',
    options: OPTIONS,
    isOpen: false,
    dropdownRef: createRef<HTMLDivElement>(),
    onToggle: vi.fn(),
    onSelect: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('label 렌더링', () => {
      render(<DropDown {...defaultProps} />);
      expect(screen.getByText('제조사')).toBeInTheDocument();
    });

    it('선택된 값 표시', () => {
      render(<DropDown {...defaultProps} value="Apple" />);
      expect(screen.getByDisplayValue('Apple')).toBeInTheDocument();
    });

    it('placeholder 표시', () => {
      render(<DropDown {...defaultProps} />);
      expect(screen.getByPlaceholderText('제조사를 선택해 주세요')).toBeInTheDocument();
    });

    it('닫힌 상태에서 옵션 목록 숨김', () => {
      render(<DropDown {...defaultProps} isOpen={false} />);
      expect(screen.queryByRole('button', { name: 'Apple' })).not.toBeInTheDocument();
    });

    it('열린 상태에서 옵션 목록 표시', () => {
      render(<DropDown {...defaultProps} isOpen={true} />);
      OPTIONS.forEach((option) => {
        expect(screen.getByRole('button', { name: option })).toBeInTheDocument();
      });
    });
  });

  describe('Interaction', () => {
    it('클릭 시 onToggle 호출', async () => {
      const user = userEvent.setup();
      const handleToggle = vi.fn();
      render(<DropDown {...defaultProps} onToggle={handleToggle} />);

      const trigger = screen.getByRole('button');
      await user.click(trigger);

      expect(handleToggle).toHaveBeenCalledTimes(1);
    });

    it('옵션 클릭 시 onSelect 호출', async () => {
      const user = userEvent.setup();
      const handleSelect = vi.fn();
      render(<DropDown {...defaultProps} isOpen={true} onSelect={handleSelect} />);

      await user.click(screen.getByRole('button', { name: 'Samsung' }));

      expect(handleSelect).toHaveBeenCalledWith('Samsung');
    });

    it('Enter 키로 토글', async () => {
      const user = userEvent.setup();
      const handleToggle = vi.fn();
      render(<DropDown {...defaultProps} onToggle={handleToggle} />);

      const trigger = screen.getByRole('button');
      trigger.focus();
      await user.keyboard('{Enter}');

      expect(handleToggle).toHaveBeenCalled();
    });

    it('Space 키로 토글', async () => {
      const user = userEvent.setup();
      const handleToggle = vi.fn();
      render(<DropDown {...defaultProps} onToggle={handleToggle} />);

      const trigger = screen.getByRole('button');
      trigger.focus();
      await user.keyboard(' ');

      expect(handleToggle).toHaveBeenCalled();
    });
  });

  describe('Error State', () => {
    it('error prop 적용', () => {
      render(<DropDown {...defaultProps} error helperText="필수 항목입니다" />);
      expect(screen.getByText('필수 항목입니다')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('trigger에 tabIndex 존재', () => {
      render(<DropDown {...defaultProps} />);
      const trigger = screen.getByRole('button');
      expect(trigger).toHaveAttribute('tabIndex', '0');
    });

    it('input은 readOnly', () => {
      render(<DropDown {...defaultProps} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('readOnly');
    });
  });
});
