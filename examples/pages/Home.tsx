// import { history } from '@/index';
import { history } from '../../dist-lib/react-router-toolset';
import { router } from '../router';
import Logout from './Logout';

const Home = () => {
  // const pathname = usePathname();
  function onClick() {
    // const url = pathname('/:tenantId/home/profile');
    const url = router.getPathname('/:tenantId/home/profile');
    history.push(url);
  }
  return (
    <div>
      <div>Home</div>
      <button onClick={onClick}>To profile</button>
      <Logout />
    </div>
  );
};

export default Home;
