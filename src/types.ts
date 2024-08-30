export type RouteConfig = {
  /** 路径，同react-router */
  path: string;
  /** 对应react-router的pathname，所有非父路由将会有该值 */
  pathname?: string;
  /** ['', '/layout', '/layout/layout-children1', '/layout/layout-children1/permission'] */
  collecttedPathname?: string[];
  /** ['', 'layout', 'layout-children1', 'permission'] */
  collecttedPath?: string[];
  /** 组件的文件地址 */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component?: () => Promise<any>;
  /** 隐藏在菜单 */
  hidden?: boolean;
  /** 菜单名称 */
  name?: string;
  /** 菜单icon */
  icon?: React.ReactNode;
  /** 页面标题，不传则用name */
  helmet?: string;
  /** 菜单权限 */
  permission?: string;
  /** 重定向path */
  redirect?: string;
  /** 进度条 */
  progress?: boolean;
  /** 将子路由的菜单层级提升到本级 */
  flatten?: boolean;
  /** 子路由，同react-router */
  children?: RouteConfig[];
  /** 同react-router */
  caseSensitive?: boolean;
  /** 是否是外链 */
  external?: boolean;
  /** 父路由 */
  parent?: RouteConfig;
}

