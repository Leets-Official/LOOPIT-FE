import { Modal } from '@shared/ui/Modal/Modal';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Modal', () => {
  const setup = (props?: Partial<React.ComponentProps<typeof Modal>>) => {
    const onCancel = vi.fn();
    const onConfirm = vi.fn();

    render(
      <Modal
        title="해당 게시물을 삭제하시겠어요?"
        subtitle="subtitle 1줄"
        onCancel={onCancel}
        onConfirm={onConfirm}
        {...props}
      />
    );

    return { onCancel, onConfirm };
  };

  describe('Rendering', () => {
    it('title 렌더링', () => {
      setup();
      expect(screen.getByText('해당 게시물을 삭제하시겠어요?')).toBeInTheDocument();
    });

    it('subtitle 렌더링', () => {
      setup();
      expect(screen.getByText('subtitle 1줄')).toBeInTheDocument();
    });

    it('subtitle이 없을 경우 렌더링되지 않음', () => {
      render(<Modal title="제목만 있는 모달" onCancel={vi.fn()} onConfirm={vi.fn()} />);

      expect(screen.queryByText('삭제 후에는 복구할 수 없습니다.')).not.toBeInTheDocument();
    });

    it('취소 / 삭제 버튼 렌더링', () => {
      setup();
      expect(screen.getByRole('button', { name: '취소' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '삭제' })).toBeInTheDocument();
    });
  });

  describe('Interaction', () => {
    it('취소 버튼 클릭 시 onCancel 호출', async () => {
      const user = userEvent.setup();
      const { onCancel } = setup();

      await user.click(screen.getByRole('button', { name: '취소' }));
      expect(onCancel).toHaveBeenCalledTimes(1);
    });

    it('삭제 버튼 클릭 시 onConfirm 호출', async () => {
      const user = userEvent.setup();
      const { onConfirm } = setup();

      await user.click(screen.getByRole('button', { name: '삭제' }));
      expect(onConfirm).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('버튼은 접근 가능한 role을 가잠', () => {
      setup();
      expect(screen.getAllByRole('button')).toHaveLength(2);
    });

    it('Tab 키로 버튼 포커스 이동 가능', async () => {
      const user = userEvent.setup();
      setup();

      await user.tab();
      expect(screen.getByRole('button', { name: '취소' })).toHaveFocus();

      await user.tab();
      expect(screen.getByRole('button', { name: '삭제' })).toHaveFocus();
    });
  });
});
