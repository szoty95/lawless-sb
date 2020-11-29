import { LoginReq, LoginResp } from '../swagger';
import useClientContext from './useClientContext';
import useRequest from './useRequest';

const useLogin = () => {
  const { client } = useClientContext();

  return useRequest<LoginReq, LoginResp>({ request: client.auth.login });
};

export default useLogin;
