import { EmptyState, TradeItem, TradeItemSkeleton, type TradeItemProps } from '@shared/ui';

export type TradeListItem = TradeItemProps & { id: string };

export type TradeItemListProps = {
  items: TradeListItem[];
  emptyMessage: string;
  isLoading?: boolean;
};

export const TradeItemList = ({ items, emptyMessage, isLoading }: TradeItemListProps) => {
  if (isLoading) {
    return (
      <div className="mt-8 flex flex-col items-center gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <TradeItemSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return <EmptyState message={emptyMessage} className="mt-8" />;
  }

  return (
    <div className="mt-8 flex flex-col items-center gap-6">
      {items.map((item) => (
        <TradeItem key={item.id} {...item} />
      ))}
    </div>
  );
};
