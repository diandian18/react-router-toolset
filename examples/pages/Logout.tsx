import { router } from '@@/router';

const Logout = () => {
  function onClick() {
    router.push('/login');
  }
  
  return (
    <div>
      <button onClick={onClick}>Logout</button>
    </div>
  );
};

export default Logout;
