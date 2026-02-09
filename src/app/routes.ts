import { index, layout, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  // (auth) - 비로그인만 접근 가능 (로그인 시 / 로 리다이렉트)
  layout('layout/PublicLayout.tsx', [
    route('login', 'routes/(auth)/login.tsx'),
    route('signup', 'routes/(auth)/signup.tsx'),
  ]),

  // 카카오 콜백 (인증 체크 불필요)
  route('login/kakao', 'routes/(auth)/login.kakao.tsx'),

  // (main) - MainLayout 적용 페이지
  layout('layout/MainLayout.tsx', [
    // 공개 페이지 (누구나 접근 가능)
    index('routes/(main)/_index.tsx'),

    // buy
    route('buy', 'routes/(main)/buy/index.tsx'),
    route('buy/:id', 'routes/(main)/buy/detail.tsx'),

    // repair
    route('repair', 'routes/(main)/repair/index.tsx'),

    // seller
    route('seller/:userId', 'routes/(main)/seller/index.tsx'),

    // 로그인 필요 페이지 (미로그인 시 /login 으로 리다이렉트)
    layout('layout/ProtectedLayout.tsx', [
      // sell
      route('sell', 'routes/(main)/sell/index.tsx'),

      // mypage
      route('mypage', 'routes/(main)/mypage/index.tsx'),
      route('mypage/settings', 'routes/(main)/mypage/settings.tsx'),
      route('mypage/profile', 'routes/(main)/mypage/profile.tsx'),

      // chat
      route('chat', 'routes/(main)/chat/index.tsx'),

      // chatbot
      route('chatbot', 'routes/(main)/chatbot/index.tsx'),
    ]),
  ]),
] satisfies RouteConfig;
