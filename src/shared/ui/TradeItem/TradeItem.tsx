import { FavoriteButton } from '@shared/ui/FavoriteButton/FavoriteButton';

export type TradeStatus = 'buying' | 'reserved' | 'completed' | 'favorite';
type NonFavoriteStatus = Exclude<TradeStatus, 'favorite'>;

export interface TradeItemProps {
  imageUrl?: string;
  modelName: string;
  price: string;
  date: string;
  status?: TradeStatus;
  statusLabel?: string;
  favoriteActive?: boolean;
  onToggleFavorite?: (active: boolean) => void;
}

const statusConfigByStatus: Record<NonFavoriteStatus, { text: string; className: string }> = {
  buying: {
    text: '구매중',
    className: 'typo-title-3 text-green-500',
  },
  reserved: {
    text: '예약중',
    className: 'typo-title-3 text-green-500',
  },
  completed: {
    text: '구매완료',
    className: 'typo-title-3 text-gray-400',
  },
} as const;

export const TradeItem = ({
  imageUrl,
  modelName,
  price,
  date,
  status = 'buying',
  statusLabel,
  favoriteActive = false,
  onToggleFavorite,
}: TradeItemProps) => {
  const statusConfig = status === 'favorite' ? null : statusConfigByStatus[status];
  const resolvedStatusLabel = statusLabel ?? statusConfig?.text;

  return (
    <div className="gap-xxs flex w-full max-w-[1200px] flex-col rounded-(--radius-l) bg-gray-900 px-[42px] py-[44px]">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-[36px]">
          {imageUrl ? (
            <img src={imageUrl} alt={modelName} className="rounded-m h-[79px] w-[79px] shrink-0 object-cover" />
          ) : (
            <div
              role="img"
              aria-label={`${modelName} 이미지 없음`}
              className="rounded-m h-[79px] w-[79px] shrink-0 bg-gray-200"
            />
          )}

          <div className="flex flex-col gap-[4px]">
            <span className="typo-body-1 text-white">{modelName}</span>
            <span className="typo-body-2 text-white">{price}</span>
            <span className="typo-caption-2 text-white">{date}</span>
          </div>
        </div>

        {status === 'favorite' ? (
          <FavoriteButton defaultActive={favoriteActive} onToggle={onToggleFavorite} variant="inverse" />
        ) : (
          <span className={statusConfig?.className}>{resolvedStatusLabel}</span>
        )}
      </div>
    </div>
  );
};
