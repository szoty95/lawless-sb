import { RegisterReq, RegisterResp } from '../swagger';
import useClientContext from './useClientContext';
import useRequest from './useRequest';

const useRegister = () => {
  const { client } = useClientContext();

  return useRequest<RegisterReq, RegisterResp>({
    request: client.auth.register,
  });
};

export default useRegister;
