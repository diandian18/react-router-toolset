import { router, useRouter } from '@@/router';
import Logout from './Logout';

/**
 * 获取随机字符串
 */
export function getRandomString(options?: {
  prefix?: string;
  timestamp?: boolean;
  length?: number;
}) {
  const { prefix, timestamp, length = 6 } = options ?? {};
  const prefixChar = prefix ? `${prefix}_` : '';
  const timestampChar = timestamp ? `${new Date().getTime()}_` : '';
  const stringChar = Math.random().toString(36).slice(-length);
  return `${prefixChar}${timestampChar}${stringChar}`;
}

function genNewRoute() {
  const newPath = getRandomString();
  const newRoute = {
    path: newPath,
    component: () => import('@@/pages/tempRoute'),
    name: `临时路由-${newPath}`,
  };
  return newRoute;
}

const Home = () => {
  const { flattenRoutes } = useRouter(router);

  function onClick() {
    const url = router.getPathname('/:tenantId/home/profile');
    router.push(url);
  }

  function onClickAddTail() {
    router.setSiblings((routesConfig) => {
      const newRoute = genNewRoute();
      routesConfig.push(newRoute);
    });
  }

  return (
    <div>
      <div>Home</div>
      <button onClick={onClick}>To profile</button>
      <Logout />
      <button onClick={onClickAddTail}>Add tail</button>
      <div>
        {Array.from(flattenRoutes).map(([key]) => {
          return <p key={key}>{key}</p>;
        })}
      </div>
      <button onClick={() => {
        const nweRoutes = Array.from(flattenRoutes);
        const url = router.getPathname(nweRoutes[nweRoutes.length - 1][0]);
        router.push(url);
      }}>Jump to &quot;{ Array.from(flattenRoutes)[Array.from(flattenRoutes).length - 1][0] }&quot;</button>
      <button onClick={() => {
        router.setSiblings('/home/index', (routesConfig) => {
          const newRoute = genNewRoute();
          routesConfig.push(newRoute);
        });
      }}>router.setSiblings</button>
    </div>
  );
};

export default Home;
