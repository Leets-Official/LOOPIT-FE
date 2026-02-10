import { Button } from '@shared/ui/Button/Button';
import { FavoriteButton } from '@shared/ui/FavoriteButton/FavoriteButton';
import { cn } from '@shared/utils/cn';

export type RepairListItem = {
  id: string;
  name: string;
  address: string;
  favoriteActive?: boolean;
};

export type RepairListProps = {
  items: RepairListItem[];
  emptyMessage: string;
  onContact?: (item: RepairListItem) => void;
  onFindRoute?: (item: RepairListItem) => void;
};

export const RepairList = ({ items, emptyMessage, onContact, onFindRoute }: RepairListProps) => {
  if (items.length === 0) {
    return <p className="typo-title-3 mt-34.5 w-full text-center text-gray-400">{emptyMessage}</p>;
  }

  return (
    <div className="mt-8 flex flex-col items-center gap-6">
      {items.map((item) => (
        <div
          key={item.id}
          className={cn(
            'flex w-full max-w-300 items-center justify-between rounded-(--radius-l)',
            'bg-gray-900 px-10.5 py-11'
          )}
        >
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <span className="typo-title-3 text-white">{item.name}</span>
            <span className="typo-body-2 text-green-500">{item.address}</span>
          </div>

          <div className="flex shrink-0 items-center gap-6">
            <FavoriteButton defaultActive={item.favoriteActive} variant="inverse" />
            <div className="flex flex-col gap-3">
              <Button
                variant="fill"
                size="auto"
                onClick={() => onContact?.(item)}
                className="w-40 bg-white text-gray-900 hover:bg-gray-100"
              >
                연락하기
              </Button>
              <Button
                variant="outline"
                size="auto"
                onClick={() => onFindRoute?.(item)}
                className="w-40 border-white text-white hover:border-gray-200 hover:text-gray-200"
              >
                길 찾기
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
