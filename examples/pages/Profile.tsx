// import { history, usePathname } from '@/index';
import { history, usePathname } from '../../dist-lib/react-router-toolset';
import Logout from './Logout';

const Profile = () => {
  const pathname = usePathname();
  function onClick() {
    const url = pathname('/:tenantId/home');
    history.push(url);
  }
  return (
    <div>
      <div>Profile</div>
      <button onClick={onClick}>To home</button>
      <Logout />
    </div>
  );
};

export default Profile;
