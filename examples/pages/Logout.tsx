import { history } from '@@/router';

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
