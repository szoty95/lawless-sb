import { EmptyReq } from '../client/types';
import { IDetailsAllCaffResp } from '../swagger';
import useClientContext from './useClientContext';
import useRequest from './useRequest';

const useAnimationsList = () => {
  const { client } = useClientContext();

  return useRequest<EmptyReq, IDetailsAllCaffResp>({
    request: client.caff.animationsList,
  });
};

export default useAnimationsList;
