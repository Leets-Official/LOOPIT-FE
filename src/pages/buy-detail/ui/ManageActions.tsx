import { Button } from '@shared/ui/Button';
import { Modal } from '@shared/ui/Modal';

type OwnerActionsProps = {
  isDeleting: boolean;
  isDeleteModalOpen: boolean;
  onEdit: () => void;
  onDeleteClick: () => void;
  onDeleteCancel: () => void;
  onDeleteConfirm: () => void;
};

export const ManageActions = ({
  isDeleting,
  isDeleteModalOpen,
  onEdit,
  onDeleteClick,
  onDeleteCancel,
  onDeleteConfirm,
}: OwnerActionsProps) => {
  return (
    <>
      <div className="flex w-full items-center gap-[34px]">
        <Button variant="outline" size="full" className="h-[44px]" onClick={onEdit}>
          수정
        </Button>
        <Button variant="fill" size="full" className="h-[44px]" onClick={onDeleteClick} disabled={isDeleting}>
          {isDeleting ? '삭제 중...' : '삭제'}
        </Button>
      </div>

      {isDeleteModalOpen && (
        <Modal
          title="삭제하시겠어요?"
          subtitle="삭제하면 복구할 수 없어요."
          onCancel={onDeleteCancel}
          onConfirm={onDeleteConfirm}
          cancelText="취소"
          confirmText="삭제"
        />
      )}
    </>
  );
};
