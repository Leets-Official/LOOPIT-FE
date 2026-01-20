import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  route('auth/login', 'routes/auth.login.tsx'),
  route('auth/signup', 'routes/auth.signup.tsx'),
  index('routes/_index.tsx'),
  route('playground', 'routes/playground.tsx'),
] satisfies RouteConfig;
