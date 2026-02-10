import { useInfiniteSellerPostsQuery } from '@shared/apis/seller';
import { ROUTES } from '@shared/constants';
import { useInfiniteScroll } from '@shared/hooks';
import { Card, CardSkeleton } from '@shared/ui/Card';
import { EmptyState } from '@shared/ui/EmptyState';
import { Profile } from '@shared/ui/Profile';
import { formatPrice, formatRelativeTime } from '@shared/utils';
import { Link, useLocation } from 'react-router';

type LocationState = {
  nickname?: string;
  profileImage?: string;
};

type SellerProfilePageProps = {
  params: {
    postId: string;
  };
};

const SellerProfilePage = ({ params }: SellerProfilePageProps) => {
  const { postId } = params;
  const location = useLocation();
  const state = location.state as LocationState | null;

  const { data, isLoading, isError, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteSellerPostsQuery(
    postId ?? ''
  );

  const { observerRef } = useInfiniteScroll({
    hasNextPage: hasNextPage ?? false,
    isFetchingNextPage,
    fetchNextPage,
  });

  const items = data?.pages.flatMap((page) => page.sellPosts.content) ?? [];
  const nickname = data?.pages[0]?.sellerNickName ?? state?.nickname ?? '판매자';
  const profileImage = data?.pages[0]?.profileImg ?? state?.profileImage;

  const showEmpty = !isLoading && items.length === 0;

  if (isLoading) {
    return (
      <main className="md:px-xxxl mx-auto flex w-full max-w-[1200px] flex-col items-start gap-10 px-(--margin-l) lg:gap-[93px] lg:px-0">
        <section className="flex flex-col items-start justify-center gap-[30px] self-stretch">
          <div className="flex items-center gap-[23px]">
            <div className="h-[80px] w-[80px] animate-pulse rounded-full bg-gray-200" />
            <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />
          </div>
        </section>

        <section className="flex w-full flex-col items-start gap-[36px] self-stretch">
          <div className="h-[35px] w-48 animate-pulse rounded bg-gray-200" />
          <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 md:gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <CardSkeleton key={index} variant="seller" />
            ))}
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="md:px-xxxl mx-auto flex w-full max-w-[1200px] flex-col items-start gap-10 px-(--margin-l) lg:gap-[93px] lg:px-0">
      <section className="flex flex-col items-start justify-center gap-[30px] self-stretch">
        <div className="flex items-center gap-[23px]">
          <Profile size="chat" image={profileImage} alt={`${nickname} 프로필`} />
          <span className="typo-title-3 text-gray-900">{nickname}</span>
        </div>
      </section>

      <section className="flex w-full flex-col items-start gap-[36px] self-stretch">
        <h2 className="typo-title-1 self-stretch text-gray-900">{nickname}님의 판매목록</h2>

        {isError ? (
          <EmptyState message="상품 목록을 불러오지 못했어요." className="min-h-[400px] w-full" />
        ) : showEmpty ? (
          <EmptyState message="판매중인 상품이 없어요." className="min-h-[400px] w-full" />
        ) : (
          <>
            <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 md:gap-6">
              {items.map((item) => (
                <Link
                  key={item.postId}
                  to={`${ROUTES.BUY}/${item.postId}`}
                  className="block focus-visible:outline-none"
                >
                  <Card
                    variant="seller"
                    image={item.img}
                    title={item.title}
                    price={formatPrice(item.price)}
                    date={formatRelativeTime(item.createdAt)}
                  />
                </Link>
              ))}
            </div>
            <div ref={observerRef} className="h-10 w-full" />
          </>
        )}
      </section>
    </main>
  );
};

export default SellerProfilePage;
