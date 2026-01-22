import { FavoriteButton } from '@shared/ui/FavoriteButton/FavoriteButton';

export type ProductStatus = 'buying' | 'reserved' | 'completed' | 'favorite';
type NonFavoriteStatus = Exclude<ProductStatus, 'favorite'>;

export interface ProductItemProps {
  imageUrl?: string;
  modelName: string;
  price: string;
  date: string;
  status?: ProductStatus;
  favoriteActive?: boolean;
  onToggleFavorite?: (active: boolean) => void;
}

const statusTextByStatus: Record<NonFavoriteStatus, string> = {
  buying: '구매중',
  reserved: '예약중',
  completed: '구매완료',
};

const statusClassByStatus: Record<NonFavoriteStatus, string> = {
  buying: 'typo-title-3 text-[var(--color-green-500)]',
  reserved: 'typo-title-3 text-[var(--color-green-500)]',
  completed: 'typo-title-3 text-[var(--color-gray-400)]',
};

export const ProductItem = ({
  imageUrl,
  modelName,
  price,
  date,
  status = 'buying',
  favoriteActive = false,
  onToggleFavorite,
}: ProductItemProps) => {
  return (
    <div className="flex w-[1200px] flex-col gap-[var(--spacing-xxs)] rounded-[var(--radius-l)] bg-[var(--color-gray-900)] px-[42px] py-[44px]">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-[36px]">
          <div
            className="h-[79px] w-[79px] shrink-0 rounded-[var(--radius-m)] bg-[var(--color-gray-200)] bg-cover bg-center"
            style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined}
          />

          <div className="flex flex-col gap-[4px]">
            <span className="typo-body-1 text-[var(--color-white)]">{modelName}</span>
            <span className="typo-body-2 text-[var(--color-white)]">{price}</span>
            <span className="typo-caption-2 text-[var(--color-white)]">{date}</span>
          </div>
        </div>

        {status === 'favorite' ? (
          <FavoriteButton defaultActive={favoriteActive} onToggle={onToggleFavorite} variant="inverse" />
        ) : (
          <span className={statusClassByStatus[status]}>{statusTextByStatus[status]}</span>
        )}
      </div>
    </div>
  );
};
