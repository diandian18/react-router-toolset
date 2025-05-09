# React router toolset

Toolset for react-router

## Features

- Can automatically generate `react-router` routes and tree/flat data structure route data based on a routing configuration
- Supports dynamic modification of routes
- Provides some route calculation methods
- Offers the `<HistoryRouter />` component to serve as `<Provider />` for `react-router`
- Provides `history` and `router` methods for routing outside React components
- Supports global route prefixes for dynamic route parameters (useful for multi-tenant customization scenarios)
- Supports sub-route deployment under a base path (`basename`)

[📒Documentation](https://doc.react-antd-console.site/development/route.html)

## Install

```shell
npm i -S react-router-toolset
```

## Usage

```tsx
import { Router, RouteConfig } from 'react-router-toolset';

// Config
const routesConfig: RouteConfig[] = [
  {
    path: '/login',
    component: () => import('@/pages/login'),
    name: 'login',
    hidden: true,
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/',
    component: () => import('@/layouts'),
    flatten: true,
    children: [
      {
        path: 'home',
        name: 'home',
        permission: 'home',
        icon: <SvgIcon name="home" />,
        children: [
          {
            path: '',
            redirect: 'index',
          },
          {
            path: 'index',
            component: () => import('@/pages/home'),
            name: 'home',
            permission: 'homeIndex',
            icon: <SvgIcon name="home" />,
          },
        ],
      },
      {
        external: true,
        path: 'https://github.com/diandian18/react-router-toolset',
        name: 'external',
        icon: <SvgIcon name="external_link" />,
        permission: 'external',
      },
    ],
  },
  {
    path: '/no-access',
    component: () => import('@/pages/noAccess'),
    name: 'noAccess',
    hidden: true,
  },
  {
    path: '/not-found',
    component: () => import('@/pages/notFound'),
    name: 'notFound',
    hidden: true,
  },
  {
    path: '*',
    component: () => import('@/pages/notFound'),
    name: 'notFound',
    hidden: true,
  },
];

const basename = '/subpath';

// router contains reactRoutes、routes、flattenRoutes
const router = new Router(routesConfig, basename);
```

## Who are using?

| Name                          |              Description              |                    Link                    | Github                                             |
| ----------------------------- | :-----------------------------------: | :----------------------------------------: | :------------------------------------------------- |
| diandian18/react-antd-console | Frontend solution for admin dashboard | <https://template.react-antd-console.site> | <https://github.com/diandian18/react-antd-console> |
| Rascal-Coder/xpress           |                   -                   |        <https://xpress.ras-cal.cc>         | <https://github.com/Rascal-Coder/xpress>           |
