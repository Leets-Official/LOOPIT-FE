import { useDeletePostMutation } from '@shared/apis/post';
import { ROUTES } from '@shared/constants';
import { useModal, useToast } from '@shared/hooks';
import { type BuyItem } from '@shared/types/post';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router';

export const useManageActions = (item: BuyItem | undefined) => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const deleteModal = useModal();
  const deleteMutation = useDeletePostMutation(item?.id ?? '');

  const handleEdit = () => {
    if (!item) {
      return;
    }
    navigate(ROUTES.SELL, {
      state: {
        postId: item.id,
        title: item.title,
        price: String(item.priceValue),
        imageUrls: item.imageUrls,
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
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.message) {
        showToast(error.response.data.message, 'error');
      } else {
        showToast('삭제에 실패했습니다. 다시 시도해 주세요.', 'error');
      }
    }
  };

  return {
    deleteModal,
    isDeleting: deleteMutation.isPending,
    handleEdit,
    handleDelete,
  };
};
