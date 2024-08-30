// import { history } from '@/index';
import { history } from '../../dist-lib/react-router-toolset';

const Logout = () => {
  function onClick() {
    history.push('/login');
  }
  
  return (
    <div>
      <button onClick={onClick}>Logout</button>
    </div>
  );
};

export default Logout;
