import { BuyDetailPage } from '@pages/buy-detail';
import { getPostByIdServer, postKeys } from '@shared/apis/post';
import { dehydrate, HydrationBoundary, QueryClient, type DehydratedState } from '@tanstack/react-query';
import { type LoaderFunctionArgs, useLoaderData } from 'react-router';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: postKeys.detail(params.id),
      queryFn: () => getPostByIdServer(params.id!),
    });
  } catch {
    // 클라이언트에서 재시도
  }

  return { dehydratedState: dehydrate(queryClient) };
};

const BuyDetailRoute = () => {
  const { dehydratedState } = useLoaderData<{ dehydratedState: DehydratedState }>();

  return (
    <HydrationBoundary state={dehydratedState}>
      <BuyDetailPage />
    </HydrationBoundary>
  );
};

export default BuyDetailRoute;
