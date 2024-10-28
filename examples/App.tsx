import { useEffect } from 'react';
import { useLocation, useRoutes } from 'react-router-dom';
import { router, useRouter } from '@@/router';

const App = () => {
  const location = useLocation();
  const { reactRoutes } = useRouter(router);

  useEffect(() => {
    const routePath = router.getRoutePath(location.pathname);
    console.log(routePath);
  }, [location.pathname]);

  const element = useRoutes(reactRoutes);
  return element;
};

export default App;
