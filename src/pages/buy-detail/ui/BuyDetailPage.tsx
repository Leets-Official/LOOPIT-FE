import { buildDetailInfo } from '@pages/buy-detail/model/buildDetailInfo';
import { useBuyItemQuery } from '@shared/apis/buy';
import { ROUTES } from '@shared/constants';
import { Button } from '@shared/ui/Button';
import { Card } from '@shared/ui/Card';
import { EmptyState } from '@shared/ui/EmptyState';
import { FavoriteButton } from '@shared/ui/FavoriteButton';
import { LoadingFallback } from '@shared/ui/LoadingFallback';
import { NotFoundFallback } from '@shared/ui/NotFoundFallback';
import { Profile } from '@shared/ui/Profile';
import { Link, useNavigate, useParams } from 'react-router';

const SPEC_ITEMS = [
  { label: '제조사', key: 'manufacturer' },
  { label: '모델명', key: 'model' },
  { label: '색상', key: 'color' },
  { label: '저장용량', key: 'storage' },
] as const;

const BuyDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: item, isLoading } = useBuyItemQuery(id);

  if (isLoading) {
    return <LoadingFallback message="상품 정보를 불러오는 중이에요." />;
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
        <div className="flex w-full shrink-0 flex-col items-start gap-[30px] lg:w-[590px]">
          <div className="aspect-square w-full overflow-hidden rounded-(--radius-s) bg-gray-50 lg:h-[568px] lg:w-[590px]">
            <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
          </div>
          <div className="flex items-center gap-[23px]">
            <Profile
              size="chat"
              image={item.seller.profileImage}
              alt={`${item.seller.nickname} 프로필`}
              className="shrink-0"
            />
            <span className="typo-title-3 text-gray-900">{item.seller.nickname}</span>
          </div>
        </div>

        <div className="flex w-full shrink-0 flex-col items-start gap-10 lg:w-[590px] lg:gap-[108px]">
          <div className="flex flex-col items-start gap-[27px] self-stretch">
            <div className="flex flex-col items-start gap-[21px] self-stretch">
              <div className="flex flex-col items-start gap-[38px] self-stretch">
                <h1 className="typo-title-2 line-clamp-2 self-stretch text-gray-900">{item.title}</h1>
                <p className="typo-title-1 self-stretch text-gray-900">{item.priceLabel}</p>
              </div>

              <div className="h-px w-full bg-gray-100 lg:w-[584px]" />

              <div className="gap-xxs flex flex-col items-start self-stretch">
                <div className="flex flex-col items-start gap-[6px] self-stretch">
                  {SPEC_ITEMS.map(({ label, key }) => (
                    <div key={key} className="flex items-center gap-[11px]">
                      <span className="typo-caption-1 text-gray-500">{label}</span>
                      <span className="typo-body-1 text-gray-900">{item.specs[key]}</span>
                    </div>
                  ))}
                </div>
                <p className="typo-caption-2 text-gray-400">{detailInfo}</p>
              </div>
            </div>
            <div className="h-px w-full bg-gray-100 lg:w-[584px]" />
            <p className="typo-body-2 line-clamp-6 min-h-[80px] self-stretch overflow-hidden whitespace-pre-line text-gray-900">
              {item.description.join('\n')}
            </p>
          </div>

          <div className="flex w-full items-center gap-[18px]">
            <Button className="flex h-[44px] w-full items-center justify-center gap-2 px-6 py-3 lg:w-[488px]">
              판매자와 연락하기
            </Button>
            <FavoriteButton ariaLabel="찜하기" />
          </div>
        </div>
      </div>

      <section className="flex flex-col items-start gap-[36px] self-stretch">
        <h2 className="typo-title-3 text-gray-900">위 제품과 비슷한 상품</h2>
        {similarItems.length > 0 ? (
          <div className="flex items-center gap-[22px] self-stretch overflow-x-auto lg:h-[412px]">
            {similarItems.map((entry) => (
              <Link
                key={entry.id}
                to={`${ROUTES.BUY}/${entry.id}`}
                className="block shrink-0 focus-visible:outline-none"
              >
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
    </main>
  );
};

export default BuyDetailPage;
