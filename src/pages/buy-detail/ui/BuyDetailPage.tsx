import { buildDetailInfo } from '@pages/buy-detail/model/buildDetailInfo';
import { useManageActions } from '@pages/buy-detail/model/useManageActions';
import { useBuyItemQuery, useTogglePostWishlistMutation } from '@shared/apis/buy';
import { useCreateRoomMutation } from '@shared/apis/chat';
import { ROUTES } from '@shared/constants';
import { NotFoundFallback } from '@shared/ui/NotFoundFallback';
import { useNavigate, useParams } from 'react-router';
import { BuyDetailSkeleton } from './BuyDetailSkeleton';
import { ContactActions } from './ContactActions';
import { ManageActions } from './ManageActions';
import { ProductImageSection } from './ProductImageSection';
import { ProductInfoSection } from './ProductInfoSection';
import { SimilarItemsSection } from './SimilarItemsSection';

const BuyDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: item, isLoading } = useBuyItemQuery(id);
  const { deleteModal, isDeleting, handleEdit, handleDelete } = useManageActions(item);
  const createRoomMutation = useCreateRoomMutation();
  const toggleWishlistMutation = useTogglePostWishlistMutation();

  const handleContact = () => {
    if (!item) {
      return;
    }
    createRoomMutation.mutate(Number(item.id), {
      onSuccess: (room) => {
        navigate(`${ROUTES.CHAT}?roomId=${room.roomId}`);
      },
    });
  };

  if (isLoading) {
    return <BuyDetailSkeleton />;
  }

  if (!item) {
    return (
      <NotFoundFallback
        message="상품을 찾을 수 없어요."
        buttonText="구매 목록으로 돌아가기"
        onButtonClick={() => navigate(ROUTES.BUY, { viewTransition: true })}
      />
    );
  }

  const detailInfo = buildDetailInfo(item);
  const similarItems = (item.similarItems ?? []).slice(0, 4);

  return (
    <main className="md:px-xxxl mx-auto flex w-full max-w-[1200px] flex-col items-start gap-5 px-(--margin-l) lg:gap-[157px] lg:px-0">
      <div className="flex w-full flex-col items-start gap-5 lg:flex-row">
        <ProductImageSection
          postId={item.id}
          images={item.imageUrls.length > 0 ? item.imageUrls : [item.image]}
          title={item.title}
          seller={item.seller}
        />

        <div className="flex w-full shrink-0 flex-col items-start gap-10 lg:w-[590px] lg:gap-[108px]">
          <ProductInfoSection
            title={item.title}
            priceLabel={item.priceLabel}
            specs={item.specs}
            detailInfo={detailInfo}
            description={item.description}
          />

          {item.owner ? (
            <ManageActions
              isDeleting={isDeleting}
              isDeleteModalOpen={deleteModal.isOpen}
              onEdit={handleEdit}
              onDeleteClick={deleteModal.open}
              onDeleteCancel={deleteModal.close}
              onDeleteConfirm={handleDelete}
            />
          ) : (
            <ContactActions
              liked={item.liked}
              onContact={handleContact}
              onToggleFavorite={() => toggleWishlistMutation.mutate(item.id)}
            />
          )}
        </div>
      </div>

      {!item.owner && <SimilarItemsSection items={similarItems} />}
    </main>
  );
};

export default BuyDetailPage;
