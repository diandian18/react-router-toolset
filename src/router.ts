import { matchPath, matchRoutes, RouteObject, useLocation } from 'react-router-dom';
import { RouteConfig } from './types';
import { findroutesConfigItem, formatRoutes, generateReactRoutes, getPathnameByRoutePathAndParams } from './utils';
import { useEffect, useMemo, useState } from 'react';
import Events from '@zhangsai/events';
import { produce } from 'immer';
import type { AgnosticRouteMatch } from '@remix-run/router';

export class Router extends Events {
  static EVENT_NAME__onChangeRoutesConfig: 'EVENT_NAME__onChangeRoutesConfig';
  routesConfig: RouteConfig[] = [];
  reactRoutes: RouteObject[] = [];
  routes: RouteConfig[] = [];
  flattenRoutes: Map<string, RouteConfig> = new Map();
  constructor(routesConfig: RouteConfig[]) {
    super();
    this.routesConfig = routesConfig;
    this.reactRoutes = generateReactRoutes(routesConfig);
    const { routes, flattenRoutes } = formatRoutes(routesConfig);
    this.routes = routes;
    this.flattenRoutes = flattenRoutes;

    this._onChangeRoutesConfig();
  }
  /**
   * 监听this.routesConfigs变化，并更新reactRoutes/routes/flattenRoutes
   */
  private _onChangeRoutesConfig = () => {
    const sub = this.on(Router.EVENT_NAME__onChangeRoutesConfig, (routesConfig) => {
      const reactRoutes = generateReactRoutes(routesConfig);
      const { routes, flattenRoutes } = formatRoutes(routesConfig);
      this.reactRoutes = reactRoutes;
      this.routes = routes;
      this.flattenRoutes = flattenRoutes;
      console.log('route changed: ', { routesConfig, reactRoutes, routes, flattenRoutes });
    });
    return () => {
      this.remove(Router.EVENT_NAME__onChangeRoutesConfig, sub);
    };
  };
  /**
   * 设置路由项
   * @param pathname 指定路由
   * @param cb 参数为pathname对应的路由
   */
  setItem = (pathname: string | ((routesConfigItem: RouteConfig) => void), cb?: (routesConfigItem: RouteConfig) => void) => {
    const _pathname = typeof pathname === 'string' ? pathname : location.pathname;
    const routePath = this.getRoutePath(_pathname);
    const newRoutesConfigs = produce(this.routesConfig, draft => {
      const routesConfigItem = findroutesConfigItem(draft, routePath);
      if (routesConfigItem) {
        typeof pathname === 'string' ? cb?.(routesConfigItem) : pathname(routesConfigItem);
      }
    });
    this.routesConfig = newRoutesConfigs;
    this.emit(Router.EVENT_NAME__onChangeRoutesConfig, newRoutesConfigs);
  };
  /**
   * 设置pathname的兄弟路由
   * @param pathname 指定路由
   * @param cb 参数routesConfigs为pathname的兄弟路由
   * @param cb 参数parentRoute为pathname的父路由
   */
  setSiblings(
    pathname: string | ((routesConfig: RouteConfig[], parentRoute: RouteConfig) => void),
    cb?: (routesConfig: RouteConfig[], parentRoute: RouteConfig) => void,
  ) {
    const _pathname = typeof pathname === 'string' ? pathname : location.pathname;
    const routePath = this.getRoutePath(_pathname);
    const parentRoute = this.flattenRoutes.get(routePath)?.parent;
    if (parentRoute?.pathname) {
      this.setItem(parentRoute?.pathname, (routesConfig) => {
        if (routesConfig.children) {
          typeof pathname === 'string' ? cb?.(routesConfig.children, routesConfig) : pathname(routesConfig.children, routesConfig);
        }
      });
    }
  }
  /**
   * 根据pathname获取router的path
   * router的path里可能有:id
   * @example '/123/home' -> '/:id/home'
   */
  getRoutePath(pathname: string) {
    const matchedRoutes = matchRoutes(this.reactRoutes, pathname);
    const routePath = _getRoutePathBymatchedRoutes(matchedRoutes);
    return routePath;
  }
  /**
   * 根据当前路由 params
   * 替换掉目标routePath中的动态路由参数如":id"
   * @example '/:id/home' -> '/123/home'
   */
  getPathname(routePath: string) {
    const curRoutePath = this.getRoutePath(location.pathname);
    const { params } = matchPath({ path: curRoutePath }, location.pathname) ?? {};
    const pathname = getPathnameByRoutePathAndParams(routePath, params);
    return pathname;
  }
}

function _getRoutePathBymatchedRoutes(matchedRoutes: AgnosticRouteMatch<string, RouteObject>[] | null) {
  return matchedRoutes?.map(item => {
    const reactRoutePath = item.route.path === '/' ? '' : item.route.path;
    return reactRoutePath;
  }).join('/').replace(/\/$/, '') ?? '';
}

/**
 * 在react组件中获取最新的reactRoutes/routes/flattenRoutes/curRoute
 */
export function useRouter(router: Router) {
  const [reactRoutes, setReactRoutes] = useState<RouteObject[]>(router.reactRoutes);
  const [routes, setRoutes] = useState<RouteConfig[]>(router.routes);
  const [flattenRoutes, setFlattenRoutes] = useState<Map<string, RouteConfig>>(router.flattenRoutes);
  const location = useLocation();

  const curRoute = useMemo(() => {
    const routePath = router.getRoutePath(location.pathname);
    return flattenRoutes.get(routePath);
  }, [flattenRoutes, location.pathname, router]);

  useEffect(() => {
    const sub = router.on(Router.EVENT_NAME__onChangeRoutesConfig, (newRoutesConfigs: RouteConfig[]) => {
      const reactRoutes = generateReactRoutes(newRoutesConfigs);
      const { routes, flattenRoutes } = formatRoutes(newRoutesConfigs);
      setReactRoutes(reactRoutes);
      setRoutes(routes);
      setFlattenRoutes(flattenRoutes);
    });
    return () => {
      router.remove(Router.EVENT_NAME__onChangeRoutesConfig, sub);
    };
  }, [router]);

  return {
    reactRoutes,
    routes,
    flattenRoutes,
    curRoute,
  };
}
