import { ChatInput } from '@shared/ui/ChatInput/ChatInput';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('ChatInput', () => {
  describe('Rendering', () => {
    it('textarea 렌더링', () => {
      render(<ChatInput onSend={() => {}} />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('placeholder 렌더링', () => {
      render(<ChatInput placeholder="메시지를 입력하세요" onSend={() => {}} />);
      expect(screen.getByPlaceholderText('메시지를 입력하세요')).toBeInTheDocument();
    });

    it('전송 버튼 렌더링', () => {
      render(<ChatInput onSend={() => {}} />);
      expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
    });
  });

  describe('Uncontrolled Mode', () => {
    it('입력값 변경', async () => {
      const user = userEvent.setup();
      render(<ChatInput onSend={() => {}} />);

      const textarea = screen.getByRole('textbox');
      await user.type(textarea, '안녕하세요');

      expect(textarea).toHaveValue('안녕하세요');
    });

    it('전송 후 입력값 초기화', async () => {
      const user = userEvent.setup();
      render(<ChatInput onSend={() => {}} />);

      const textarea = screen.getByRole('textbox');
      await user.type(textarea, '안녕하세요');
      await user.click(screen.getByRole('button', { name: 'Send' }));

      expect(textarea).toHaveValue('');
    });
  });

  describe('Controlled Mode', () => {
    it('value prop 적용', () => {
      render(<ChatInput value="제어된 값" onSend={() => {}} />);
      expect(screen.getByRole('textbox')).toHaveValue('제어된 값');
    });

    it('onChange 호출', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<ChatInput value="" onChange={handleChange} onSend={() => {}} />);

      await user.type(screen.getByRole('textbox'), 'a');

      expect(handleChange).toHaveBeenCalledWith('a');
    });
  });

  describe('Send Functionality', () => {
    it('버튼 클릭으로 전송', async () => {
      const user = userEvent.setup();
      const handleSend = vi.fn();
      render(<ChatInput onSend={handleSend} />);

      await user.type(screen.getByRole('textbox'), '테스트 메시지');
      await user.click(screen.getByRole('button', { name: 'Send' }));

      expect(handleSend).toHaveBeenCalledWith('테스트 메시지');
    });

    it('Enter 키로 전송', async () => {
      const user = userEvent.setup();
      const handleSend = vi.fn();
      render(<ChatInput onSend={handleSend} />);

      const textarea = screen.getByRole('textbox');
      await user.type(textarea, '테스트 메시지');
      await user.keyboard('{Enter}');

      expect(handleSend).toHaveBeenCalledWith('테스트 메시지');
    });

    it('Shift+Enter는 전송하지 않음 (줄바꿈)', async () => {
      const user = userEvent.setup();
      const handleSend = vi.fn();
      render(<ChatInput onSend={handleSend} />);

      const textarea = screen.getByRole('textbox');
      await user.type(textarea, '첫째 줄');
      await user.keyboard('{Shift>}{Enter}{/Shift}');

      expect(handleSend).not.toHaveBeenCalled();
    });

    it('빈 메시지는 전송하지 않음', async () => {
      const user = userEvent.setup();
      const handleSend = vi.fn();
      render(<ChatInput onSend={handleSend} />);

      await user.click(screen.getByRole('button', { name: 'Send' }));

      expect(handleSend).not.toHaveBeenCalled();
    });

    it('공백만 있는 메시지는 전송하지 않음', async () => {
      const user = userEvent.setup();
      const handleSend = vi.fn();
      render(<ChatInput onSend={handleSend} />);

      await user.type(screen.getByRole('textbox'), '   ');
      await user.click(screen.getByRole('button', { name: 'Send' }));

      expect(handleSend).not.toHaveBeenCalled();
    });

    it('전송 시 앞뒤 공백 제거', async () => {
      const user = userEvent.setup();
      const handleSend = vi.fn();
      render(<ChatInput onSend={handleSend} />);

      await user.type(screen.getByRole('textbox'), '  메시지  ');
      await user.click(screen.getByRole('button', { name: 'Send' }));

      expect(handleSend).toHaveBeenCalledWith('메시지');
    });
  });

  describe('Button State', () => {
    it('입력값 없으면 버튼 비활성화', () => {
      render(<ChatInput onSend={() => {}} />);
      expect(screen.getByRole('button', { name: 'Send' })).toBeDisabled();
    });

    it('입력값 있으면 버튼 활성화', async () => {
      const user = userEvent.setup();
      render(<ChatInput onSend={() => {}} />);

      await user.type(screen.getByRole('textbox'), '메시지');

      expect(screen.getByRole('button', { name: 'Send' })).not.toBeDisabled();
    });
  });

  describe('Accessibility', () => {
    it('textarea에 aria-label 적용', () => {
      render(<ChatInput placeholder="메시지 입력" onSend={() => {}} />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-label', '메시지 입력');
    });

    it('placeholder 없으면 기본 aria-label', () => {
      render(<ChatInput onSend={() => {}} />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-label', 'Chat input');
    });
  });
});
