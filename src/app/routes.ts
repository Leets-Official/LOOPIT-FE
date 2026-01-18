import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [index('routes/_index.tsx'), route('playground', 'routes/playground.tsx')] satisfies RouteConfig;
