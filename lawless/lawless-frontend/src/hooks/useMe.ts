import { EmptyReq } from '../client/types';
import { UserResp } from '../swagger';
import useClientContext from './useClientContext';
import useRequest from './useRequest';

const useMe = () => {
  const { client } = useClientContext();

  return useRequest<EmptyReq, UserResp>({
    request: client.auth.me,
  });
};

export default useMe;
