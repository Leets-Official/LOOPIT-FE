import { GearIcon, SellIcon, ShoppingIcon } from '@shared/assets/icons';
import { ROUTES } from '@shared/constants';

export const BANNER_CARDS = [
  {
    id: 'buy',
    title: (
      <>
        중고 전자기기
        <br />
        구매하기
      </>
    ),
    description: '합리적인 매물을 찾아보세요.',
    imageSrc: ShoppingIcon,
    route: ROUTES.BUY,
  },
  {
    id: 'sell',
    title: (
      <>
        중고 전자기기
        <br />
        판매하기
      </>
    ),
    description: '사용하지 않는 기기를 판매해보세요.',
    imageSrc: SellIcon,
    route: ROUTES.SELL,
  },
  {
    id: 'repair',
    title: (
      <>
        근처
        <br />
        수리점 찾기
      </>
    ),
    description: '가까운 수리점을 찾아드려요.',
    imageSrc: GearIcon,
    route: ROUTES.REPAIR,
  },
];
