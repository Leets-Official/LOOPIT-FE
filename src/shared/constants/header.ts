import { ROUTES } from './routes';

export const NAV_ITEMS = [
  { id: 'buy', label: '구매하기', path: ROUTES.BUY },
  { id: 'sell', label: '판매하기', path: ROUTES.SELL },
  { id: 'repair', label: '수리점찾기', path: ROUTES.REPAIR },
  { id: 'chat', label: '루핏톡', path: ROUTES.CHAT },
  { id: 'chatbot', label: '챗봇', path: ROUTES.CHATBOT },
] as const;

export const PROTECTED_PATHS: string[] = [ROUTES.SELL, ROUTES.CHATBOT, ROUTES.MYPAGE, ROUTES.CHAT];
