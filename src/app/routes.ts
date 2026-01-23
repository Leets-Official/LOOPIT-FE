import { index, layout, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  route('login', 'routes/login.tsx'),
  route('signup', 'routes/signup.tsx'),
  layout('layout/MainLayout.tsx', [index('routes/(main)/_index.tsx')]),
  route('playground', 'routes/playground.tsx'),
] satisfies RouteConfig;
