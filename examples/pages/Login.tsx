import { useRef } from 'react';
// import { history } from '@/index';
import { history } from '../../dist-lib/react-router-toolset';

const Login = () => {
  const ref = useRef<HTMLInputElement>(null);
  function onClickBtn() {
    const tenantId = ref.current?.value ?? 'app';
    history.push(`/${tenantId}/home`);
  }
  return <div>
    动态路由参数<strong>/:tenantId</strong>: <input type="text" ref={ref} />
    <button onClick={onClickBtn}>Login</button>
  </div>;
};

export default Login;
