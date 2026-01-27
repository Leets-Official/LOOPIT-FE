import { TradeItem, type TradeItemProps } from '@shared/ui/TradeItem/TradeItem';

export type TradeListItem = TradeItemProps & { id: string };

export type TradeItemListProps = {
  items: TradeListItem[];
  emptyMessage: string;
};

export const TradeItemList = ({ items, emptyMessage }: TradeItemListProps) => {
  if (items.length === 0) {
    return <p className="typo-title-3 mt-34.5 w-full text-center text-gray-400">{emptyMessage}</p>;
  }

  return (
    <div className="mt-8 flex flex-col items-center gap-6">
      {items.map((item) => (
        <TradeItem key={item.id} {...item} />
      ))}
    </div>
  );
};
