import { useRef } from 'react';
import { router } from '@@/router';

const Login = () => {
  const ref = useRef<HTMLInputElement>(null);
  function onClickBtn() {
    const tenantId = ref.current?.value ?? 'app';
    router.push(`/${tenantId}/home`);
  }
  return <div>
    动态路由参数<strong>/:tenantId</strong>: <input type="text" ref={ref} />
    <button onClick={onClickBtn}>Login</button>
  </div>;
};

export default Login;
