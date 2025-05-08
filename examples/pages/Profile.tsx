import { router, usePathname } from '@@/router';
import Logout from './Logout';

const Profile = () => {
  const pathname = usePathname();
  function onClick() {
    const url = pathname('/:tenantId/home');
    router.push(url);
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
