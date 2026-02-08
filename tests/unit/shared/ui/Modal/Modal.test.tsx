import { Modal } from '@shared/ui/Modal/Modal';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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
      expect(screen.queryByText('subtitle 1줄')).not.toBeInTheDocument();
    });

    it('취소 / 확인 버튼 렌더링', () => {
      setup();
      expect(screen.getByRole('button', { name: '취소' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '확인' })).toBeInTheDocument();
    });
  });

  describe('Interaction', () => {
    it('취소 버튼 클릭 시 onCancel 호출', async () => {
      const user = userEvent.setup();
      const { onCancel } = setup();

      await user.click(screen.getByRole('button', { name: '취소' }));

      await waitFor(() => {
        expect(onCancel).toHaveBeenCalledTimes(1);
      });
    });

    it('확인 버튼 클릭 시 onConfirm 호출', async () => {
      const user = userEvent.setup();
      const { onConfirm } = setup();

      await user.click(screen.getByRole('button', { name: '확인' }));

      await waitFor(() => {
        expect(onConfirm).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Accessibility', () => {
    it('버튼은 접근 가능한 role을 가짐', () => {
      setup();
      expect(screen.getByRole('button', { name: '취소' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '확인' })).toBeInTheDocument();
    });

    it('Tab 키로 버튼 포커스 이동 가능', async () => {
      const user = userEvent.setup();
      setup();

      const cancelButton = screen.getByRole('button', { name: '취소' });
      const confirmButton = screen.getByRole('button', { name: '확인' });

      cancelButton.focus();
      expect(cancelButton).toHaveFocus();

      await user.tab();
      expect(confirmButton).toHaveFocus();
    });

    it('ESC 키 입력 시 onCancel 호출', async () => {
      const user = userEvent.setup();
      const { onCancel } = setup();

      await user.keyboard('{Escape}');

      await waitFor(() => {
        expect(onCancel).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Custom Button Text', () => {
    it('커스텀 취소 버튼 텍스트 렌더링', () => {
      setup({ cancelText: '아니요' });
      expect(screen.getByRole('button', { name: '아니요' })).toBeInTheDocument();
    });

    it('커스텀 확인 버튼 텍스트 렌더링', () => {
      setup({ confirmText: '삭제' });
      expect(screen.getByRole('button', { name: '삭제' })).toBeInTheDocument();
    });
  });

  describe('Overlay Interaction', () => {
    it('오버레이 클릭 시 onCancel 호출', async () => {
      const onCancel = vi.fn();
      const onConfirm = vi.fn();

      render(<Modal title="테스트" onCancel={onCancel} onConfirm={onConfirm} />);

      const dialog = screen.getByRole('dialog');
      const overlay = dialog.parentElement!;
      fireEvent.mouseDown(overlay);

      await waitFor(() => {
        expect(onCancel).toHaveBeenCalledTimes(1);
      });
    });

    it('모달 내부 클릭 시 닫히지 않음', async () => {
      const user = userEvent.setup();
      const onCancel = vi.fn();
      const onConfirm = vi.fn();

      render(<Modal title="테스트" onCancel={onCancel} onConfirm={onConfirm} />);

      const title = screen.getByText('테스트');
      await user.click(title);

      expect(onCancel).not.toHaveBeenCalled();
    });
  });
});
