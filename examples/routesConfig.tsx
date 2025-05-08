import { RouteConfig } from '@@/router';

export const routesConfig: RouteConfig[] = [
  {
    path: '/login',
    component: () => import('@@/pages/Login'),
    name: '登录',
    hidden: true,
  },
  {
    path: '/:tenantId',
    redirect: '/app/home',
    // path: '/',
    // redirect: '/home',
  },
  {
    path: '/:tenantId',
    // path: '/',
    component: () => import('@@/pages/Layout'),
    flatten: true,
    children: [
      {
        path: 'home',
        name: '首页',
        permission: 'home',
        children: [
          {
            path: '',
            redirect: 'index',
          },
          {
            path: 'index',
            component: () => import('@@/pages/Home'),
            name: '首页',
          },
          {
            path: 'profile',
            component: () => import('@@/pages/Profile'),
            name: '个人中心',
            permission: 'profile',
          },
        ],
      },
    ],
  },
];

