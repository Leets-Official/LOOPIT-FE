import { CaretDownMdIcon } from '@shared/assets/icons';
import { useClickOutside, useModal } from '@shared/hooks';
import { FavoriteButton } from '@shared/ui/FavoriteButton/FavoriteButton';
import { cn } from '@shared/utils/cn';
import { useId, useRef } from 'react';

export type TradeStatus = 'buying' | 'completed' | 'favorite';
type NonFavoriteStatus = Exclude<TradeStatus, 'favorite'>;
type StatusOption = { value: NonFavoriteStatus; label: string };

export interface TradeItemProps {
  imageUrl?: string;
  modelName: string;
  price: string;
  date: string;
  status?: TradeStatus;
  statusLabel?: string;
  statusEditable?: boolean;
  statusOptions?: StatusOption[];
  onStatusChange?: (status: NonFavoriteStatus) => void;
  favoriteActive?: boolean;
  onToggleFavorite?: (active: boolean) => void;
}

const statusConfigByStatus: Record<NonFavoriteStatus, { text: string; className: string }> = {
  buying: {
    text: '구매중',
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
  statusEditable = false,
  statusOptions,
  onStatusChange,
  favoriteActive = false,
  onToggleFavorite,
}: TradeItemProps) => {
  const dropdownId = useId();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { isOpen, toggle, close } = useModal();
  useClickOutside(dropdownRef, isOpen, close);
  const statusConfig = status === 'favorite' ? null : statusConfigByStatus[status];
  const resolvedStatusLabel = statusLabel ?? statusConfig?.text;
  const options = statusOptions ?? [
    { value: 'buying', label: '구매중' },
    { value: 'completed', label: '구매완료' },
  ];
  const statusToneClass = status === 'completed' ? 'text-gray-400' : 'text-brand-primary';

  return (
    <div className="gap-xxs flex w-full max-w-[1200px] flex-col rounded-(--radius-l) bg-gray-900 px-4 py-6 md:px-[42px] md:py-[44px]">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-4 md:gap-[36px]">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={modelName}
              className="rounded-m h-16 w-16 shrink-0 object-cover md:h-[79px] md:w-[79px]"
            />
          ) : (
            <div
              role="img"
              aria-label={`${modelName} 이미지 없음`}
              className="rounded-m h-16 w-16 shrink-0 bg-gray-200 md:h-[79px] md:w-[79px]"
            />
          )}

          <div className="gap-xxxxs flex flex-col">
            <span className="typo-body-1 text-white">{modelName}</span>
            <span className="typo-body-2 text-white">{price}</span>
            <span className="typo-caption-2 text-white">{date}</span>
          </div>
        </div>

        {status === 'favorite' ? (
          <FavoriteButton defaultActive={favoriteActive} onToggle={onToggleFavorite} variant="inverse" />
        ) : statusEditable ? (
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              className={cn('typo-title-3 inline-flex items-center gap-[6px] font-semibold', statusToneClass)}
              onClick={toggle}
              aria-haspopup="listbox"
              aria-expanded={isOpen}
              aria-controls={dropdownId}
            >
              {resolvedStatusLabel}
              <CaretDownMdIcon className={cn('h-s w-s', statusToneClass)} />
            </button>
            {isOpen ? (
              <div
                id={dropdownId}
                role="listbox"
                aria-label="판매 상태 변경"
                className="absolute top-full right-0 mt-2 flex h-[50px] w-[96px] flex-col items-center justify-center gap-[6px] rounded-(--radius-s) bg-linear-to-b from-gray-700/80 to-gray-600/80 py-1 shadow-lg"
              >
                {options
                  .filter((option) => option.label !== resolvedStatusLabel)
                  .map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      role="option"
                      aria-selected={false}
                      className="typo-title-3 text-brand-primary flex w-[70px] items-center justify-center font-semibold opacity-100"
                      onClick={() => {
                        onStatusChange?.(option.value);
                        close();
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
              </div>
            ) : null}
          </div>
        ) : (
          <span className={`${statusConfig?.className} whitespace-nowrap`}>{resolvedStatusLabel}</span>
        )}
      </div>
    </div>
  );
};
