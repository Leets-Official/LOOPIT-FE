import { buildDetailInfo } from '@pages/buy-detail/model/buildDetailInfo';
import { useBuyItemQuery, useBuyItemsQuery } from '@shared/apis/buy';
import { ROUTES } from '@shared/constants';
import { Button } from '@shared/ui/Button';
import { Card } from '@shared/ui/Card';
import { FavoriteButton } from '@shared/ui/FavoriteButton';
import { LoadingFallback } from '@shared/ui/LoadingFallback';
import { NotFoundFallback } from '@shared/ui/NotFoundFallback';
import { Profile } from '@shared/ui/Profile';
import { Link, useNavigate, useParams } from 'react-router';

const SPEC_ITEMS = [
  { label: '제조사', key: 'manufacturer' },
  { label: '모델명', key: 'model' },
  { label: '색상', key: 'color' },
  { label: '저장', key: 'storage' },
  { label: '배터리', key: 'battery' },
] as const;

const BuyDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: item, isLoading } = useBuyItemQuery(id);
  const { data } = useBuyItemsQuery();
  const items = data?.content ?? [];

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
  const similarItems = items.filter((entry) => entry.id !== item.id && entry.model === item.model).slice(0, 4);

  return (
    <main className="md:px-xxxl mx-auto flex w-full max-w-[1200px] flex-col items-start gap-10 px-(--margin-l) pt-10 lg:gap-[157px] lg:px-0">
      <div className="flex flex-col items-start justify-center gap-[30px] self-stretch">
        <div className="grid gap-6 lg:grid-cols-[590px_590px]">
          <div className="h-[568px] w-[590px] overflow-hidden rounded-(--radius-l) bg-gray-50">
            <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
          </div>
          <div className="flex h-[568px] w-[590px] flex-col gap-[103px]">
            <div className="flex flex-col gap-[27px]">
              <div>
                <h1 className="typo-title-2 text-gray-900">{item.title}</h1>
                <p className="typo-title-1 mt-2 text-gray-900">{item.priceLabel}</p>
              </div>

              <div className="border-y border-gray-100 py-4">
                <div className="flex flex-col gap-2">
                  {SPEC_ITEMS.map(({ label, key }) => (
                    <div key={key} className="flex gap-4">
                      <span className="typo-caption-1 w-16 text-gray-500">{label}</span>
                      <span className="typo-body-1 text-gray-900">{item.specs[key]}</span>
                    </div>
                  ))}
                </div>
                <p className="typo-caption-2 mt-3 text-gray-400">{detailInfo}</p>
              </div>

              <ul className="typo-body-2 line-clamp-6 space-y-1 text-gray-900">
                {item.description.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-[18px]">
              <Button size="full">판매자와 연락하기</Button>
              <FavoriteButton ariaLabel="찜하기" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Profile size="sm" image={item.seller.profileImage} alt={`${item.seller.nickname} 프로필`} />
          <span className="typo-body-2 text-gray-900">{item.seller.nickname}</span>
        </div>
      </div>

      <section className="flex flex-col items-start gap-[36px] self-stretch">
        <h2 className="typo-title-3 text-gray-900">위 제품과 비슷한 상품</h2>
        <div className="flex h-[412px] items-center gap-[22px] self-stretch">
          {similarItems.map((entry) => (
            <Link key={entry.id} to={`${ROUTES.BUY}/${entry.id}`} className="block focus-visible:outline-none">
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
      </section>
    </main>
  );
};

export default BuyDetailPage;
