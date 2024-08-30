import { useEffect } from 'react';
import { useLocation, useRoutes } from 'react-router-dom';
import { router } from './router';

const App = () => {
  const location = useLocation();

  useEffect(() => {
    const routePath = router.getRoutePath(location.pathname);
    console.log(routePath);
  }, [location.pathname]);
  
  
  const element = useRoutes(router.reactRoutes);
  return element;
};

export default App;
