import { index, layout, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  // (auth) - 레이아웃 없는 인증 페이지
  route('login', 'routes/(auth)/login.tsx'),
  route('signup', 'routes/(auth)/signup.tsx'),

  // (main) - MainLayout 적용 페이지
  layout('layout/MainLayout.tsx', [
    index('routes/(main)/_index.tsx'),

    // buy
    route('buy', 'routes/(main)/buy/index.tsx'),
    route('buy/:id', 'routes/(main)/buy/detail.tsx'),

    // sell
    route('sell', 'routes/(main)/sell/index.tsx'),
    route('sell/confirm', 'routes/(main)/sell/confirm.tsx'),

    // repair
    route('repair', 'routes/(main)/repair/index.tsx'),

    // mypage
    route('mypage', 'routes/(main)/mypage/index.tsx'),
    route('mypage/settings', 'routes/(main)/mypage/settings.tsx'),
    route('mypage/profile', 'routes/(main)/mypage/profile.tsx'),

    // seller
    route('seller/:userId', 'routes/(main)/seller/index.tsx'),

    // chatbot
    route('chatbot', 'routes/(main)/chatbot/index.tsx'),
  ]),
] satisfies RouteConfig;
