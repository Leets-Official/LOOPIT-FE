import { ChatBubble } from '@shared/ui/ChatBubble/ChatBubble';
import { render, screen } from '@testing-library/react';

describe('ChatBubble', () => {
  describe('Rendering', () => {
    it('메시지 텍스트 렌더링', () => {
      render(<ChatBubble message="안녕하세요" />);
      expect(screen.getByText('안녕하세요')).toBeInTheDocument();
    });

    it('기본 variant는 receiver', () => {
      render(<ChatBubble message="테스트" />);
      expect(screen.getByRole('listitem')).toBeInTheDocument();
    });

    it('sender variant 렌더링', () => {
      render(<ChatBubble message="테스트" variant="sender" />);
      expect(screen.getByRole('listitem')).toBeInTheDocument();
    });
  });

  describe('Meta Information', () => {
    it('meta 텍스트 렌더링', () => {
      render(<ChatBubble message="테스트" meta="오후 2:30" />);
      expect(screen.getByText('오후 2:30')).toBeInTheDocument();
    });

    it('meta 없으면 time 요소 없음', () => {
      render(<ChatBubble message="테스트" />);
      expect(screen.queryByRole('time')).not.toBeInTheDocument();
    });

    it('metaDateTime 속성 적용', () => {
      render(<ChatBubble message="테스트" meta="오후 2:30" metaDateTime="2024-01-15T14:30:00" />);
      const timeElement = screen.getByText('오후 2:30');
      expect(timeElement).toHaveAttribute('dateTime', '2024-01-15T14:30:00');
    });
  });

  describe('Accessibility', () => {
    it('listitem role 적용', () => {
      render(<ChatBubble message="테스트" />);
      expect(screen.getByRole('listitem')).toBeInTheDocument();
    });

    it('time 요소에 dateTime 속성', () => {
      render(<ChatBubble message="테스트" meta="오후 2:30" metaDateTime="2024-01-15T14:30:00" />);
      expect(screen.getByText('오후 2:30').tagName).toBe('TIME');
    });
  });

  describe('Additional Props', () => {
    it('className prop 적용', () => {
      render(<ChatBubble message="테스트" className="custom-class" />);
      expect(screen.getByRole('listitem')).toHaveClass('custom-class');
    });

    it('data-testid prop 적용', () => {
      render(<ChatBubble message="테스트" data-testid="chat-bubble" />);
      expect(screen.getByTestId('chat-bubble')).toBeInTheDocument();
    });
  });
});
