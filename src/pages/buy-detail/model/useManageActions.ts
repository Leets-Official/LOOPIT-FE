import { useDeleteSellPostMutation } from '@shared/apis/sell';
import { ROUTES } from '@shared/constants';
import { useModal, useToast } from '@shared/hooks';
import { type BuyItem } from '@shared/types/buy';
import { useNavigate } from 'react-router';

export const useManageActions = (item: BuyItem | undefined) => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const deleteModal = useModal();
  const deleteMutation = useDeleteSellPostMutation(item?.id ?? '');

  const handleEdit = () => {
    if (!item) {
      return;
    }
    navigate(ROUTES.SELL, {
      state: {
        postId: item.id,
        title: item.title,
        price: String(item.priceValue),
        imageUrl: item.image,
        manufacturer: item.specs.manufacturer,
        modelName: item.specs.model,
        colorName: item.specs.color,
        storageSize: item.specs.storage,
        description: item.description.join('\n'),
        productCondition: item.used,
        scratchCondition: item.hasScratch,
        screenCondition: item.screenCracked,
        batteryCondition: item.batteryStatus,
      },
    });
  };

  const handleDelete = async () => {
    deleteModal.close();
    try {
      await deleteMutation.mutateAsync();
      showToast('삭제되었습니다', 'error');
      navigate(ROUTES.MAIN);
    } catch {
      showToast('삭제에 실패했습니다. 다시 시도해 주세요.', 'error');
    }
  };

  return {
    deleteModal,
    isDeleting: deleteMutation.isPending,
    handleEdit,
    handleDelete,
  };
};
