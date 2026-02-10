import { EmptyState, TradeItem, type TradeItemProps } from '@shared/ui';

export type TradeListItem = TradeItemProps & { id: string };

export type TradeItemListProps = {
  items: TradeListItem[];
  emptyMessage: string;
};

export const TradeItemList = ({ items, emptyMessage }: TradeItemListProps) => {
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
