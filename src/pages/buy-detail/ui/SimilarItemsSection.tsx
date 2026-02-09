import { ROUTES } from '@shared/constants';
import { Card } from '@shared/ui/Card';
import { EmptyState } from '@shared/ui/EmptyState';
import { Link } from 'react-router';
import type { SimilarItem } from '@shared/types/buy';

type SimilarItemsSectionProps = {
  items: SimilarItem[];
};

export const SimilarItemsSection = ({ items }: SimilarItemsSectionProps) => {
  return (
    <section className="flex flex-col items-start gap-[36px] self-stretch">
      <h2 className="typo-title-3 text-gray-900">위 제품과 비슷한 상품</h2>
      {items.length > 0 ? (
        <div className="flex items-center gap-[22px] self-stretch overflow-x-auto lg:h-[412px]">
          {items.map((entry) => (
            <Link key={entry.id} to={`${ROUTES.BUY}/${entry.id}`} className="block shrink-0 focus-visible:outline-none">
              <Card
                image={entry.image}
                title={entry.title}
                price={entry.priceLabel}
                date={entry.dateLabel}
                variant="seller"
              />
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState message="비슷한 상품이 없어요. 다른 상품을 찾아보세요!" />
      )}
    </section>
  );
};
