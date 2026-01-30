import { ROUTES } from '@shared/constants';
import { Button } from '@shared/ui/Button';
import { Card } from '@shared/ui/Card';
import { FavoriteButton } from '@shared/ui/FavoriteButton';
import { Profile } from '@shared/ui/Profile';
import { useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { buildDetailInfo } from '../model/buildDetailInfo';
import { getBuyItemById, getBuyItems } from '../model/buyRepository';

export default function BuyDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const item = useMemo(() => getBuyItemById(id), [id]);

  const detailInfo = useMemo(() => (item ? buildDetailInfo(item) : ''), [item]);

  const similarItems = useMemo(() => {
    if (!item) {
      return [];
    }
    // NOTE: API 연동 시 추천/유사 상품 서버 로직으로 대체
    return getBuyItems()
      .filter((entry) => entry.id !== item.id && entry.model === item.model)
      .slice(0, 4);
  }, [item]);

  if (!item) {
    return (
      <main className="min-h-screen bg-white pb-20">
        <div className="mx-auto w-full max-w-[1200px] px-4 pt-10">
          <section className="bg-white px-6 py-16 text-center text-gray-600">
            상품을 찾을 수 없어요.
            <div className="mt-6 flex justify-center">
              <Button size="auto" onClick={() => navigate(ROUTES.BUY, { viewTransition: true })}>
                구매 목록으로 돌아가기
              </Button>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white pb-20" style={{ zoom: 1.1111 }}>
      <div className="mx-auto w-full max-w-300 px-4 pt-10">
        <section className="bg-white pb-12">
          <div className="grid gap-6 lg:grid-cols-[1fr_590px]">
            <div className="h-142 overflow-hidden rounded-(--radius-l) bg-gray-50">
              <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <h1 className="typo-title-2 text-gray-900">{item.title}</h1>
                <p className="mt-2 text-[20px] font-semibold text-gray-900">{item.priceLabel}</p>
              </div>

              <div className="border-y border-gray-100 py-4 text-[14px] text-gray-600">
                <div className="flex flex-col gap-2">
                  <div className="flex gap-4">
                    <span className="w-16 text-gray-500">제조사</span>
                    <span className="text-gray-800">{item.specs.manufacturer}</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="w-16 text-gray-500">모델명</span>
                    <span className="text-gray-800">{item.specs.model}</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="w-16 text-gray-500">색상</span>
                    <span className="text-gray-800">{item.specs.color}</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="w-16 text-gray-500">저장</span>
                    <span className="text-gray-800">{item.specs.storage}</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="w-16 text-gray-500">배터리</span>
                    <span className="text-gray-800">{item.specs.battery}</span>
                  </div>
                </div>
                <p className="mt-3 text-[12px] text-gray-400">{detailInfo}</p>
              </div>

              <div className="text-[14px] text-gray-700">
                <ul className="space-y-1 text-gray-700">
                  {item.description.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <Button size="full">판매자와 연락하기</Button>
                <FavoriteButton ariaLabel="찜하기" />
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <Profile size="sm" image={item.seller.profileImage} alt={`${item.seller.nickname} 프로필`} />
            <span className="typo-body-2 text-gray-900">{item.seller.nickname}</span>
          </div>

          <section className="mt-[157px]">
            <h2 className="typo-title-3 text-gray-900">위 제품과 비슷한 상품</h2>
            <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-[22px]">
              {similarItems.map((entry) => (
                <Link key={entry.id} to={`${ROUTES.BUY}/${entry.id}`} className="block focus-visible:outline-none">
                  <Card
                    image={entry.image}
                    title={entry.title}
                    price={entry.priceLabel}
                    date={entry.dateLabel}
                    className="h-99.75 w-70.5"
                  />
                </Link>
              ))}
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
