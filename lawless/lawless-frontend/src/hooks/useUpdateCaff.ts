import { IUpdateCaffReq, UpdateCaffResp } from '../swagger';
import useClientContext from './useClientContext';
import useRequest from './useRequest';

const useUpdateCaff = () => {
  const { client } = useClientContext();

  return useRequest<IUpdateCaffReq, UpdateCaffResp>({
    request: client.caff.update,
  });
};

export default useUpdateCaff;
