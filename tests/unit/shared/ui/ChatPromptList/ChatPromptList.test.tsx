import { ChatPromptList } from '@shared/ui/ChatPromptList/ChatPromptList';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const PROMPTS = ['아이폰 판매하기', '갤럭시 매입가 조회', '수리점 찾기'];

describe('ChatPromptList', () => {
  describe('Rendering', () => {
    it('모든 프롬프트 렌더링', () => {
      render(<ChatPromptList prompts={PROMPTS} />);

      PROMPTS.forEach((prompt) => {
        expect(screen.getByText(prompt)).toBeInTheDocument();
      });
    });

    it('빈 배열이면 아무것도 렌더링하지 않음', () => {
      render(<ChatPromptList prompts={[]} />);
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('list role 적용', () => {
      render(<ChatPromptList prompts={PROMPTS} />);
      expect(screen.getByRole('list')).toBeInTheDocument();
    });
  });

  describe('Interaction', () => {
    it('프롬프트 클릭 시 onPromptClick 호출', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<ChatPromptList prompts={PROMPTS} onPromptClick={handleClick} />);

      await user.click(screen.getByText('아이폰 판매하기'));

      expect(handleClick).toHaveBeenCalledWith('아이폰 판매하기', 0);
    });

    it('두 번째 프롬프트 클릭 시 올바른 index 전달', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<ChatPromptList prompts={PROMPTS} onPromptClick={handleClick} />);

      await user.click(screen.getByText('갤럭시 매입가 조회'));

      expect(handleClick).toHaveBeenCalledWith('갤럭시 매입가 조회', 1);
    });

    it('onPromptClick 없어도 에러 없음', async () => {
      const user = userEvent.setup();
      render(<ChatPromptList prompts={PROMPTS} />);

      await expect(user.click(screen.getByText('아이폰 판매하기'))).resolves.not.toThrow();
    });
  });

  describe('Accessibility', () => {
    it('프롬프트가 버튼으로 렌더링', () => {
      render(<ChatPromptList prompts={PROMPTS} />);
      expect(screen.getAllByRole('button')).toHaveLength(PROMPTS.length);
    });

    it('키보드로 프롬프트 클릭', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<ChatPromptList prompts={PROMPTS} onPromptClick={handleClick} />);

      await user.tab();
      await user.keyboard('{Enter}');

      expect(handleClick).toHaveBeenCalledWith('아이폰 판매하기', 0);
    });

    it('Tab으로 프롬프트 간 이동', async () => {
      const user = userEvent.setup();
      render(<ChatPromptList prompts={PROMPTS} />);

      await user.tab();
      expect(screen.getByText('아이폰 판매하기').closest('button')).toHaveFocus();

      await user.tab();
      expect(screen.getByText('갤럭시 매입가 조회').closest('button')).toHaveFocus();
    });
  });

  describe('Additional Props', () => {
    it('className prop 적용', () => {
      render(<ChatPromptList prompts={PROMPTS} className="custom-class" />);
      expect(screen.getByRole('list').parentElement).toHaveClass('custom-class');
    });
  });
});
