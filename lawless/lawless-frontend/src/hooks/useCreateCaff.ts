import { CreateCaffResp } from '../swagger';
import useClientContext from './useClientContext';
import useRequest from './useRequest';

const useCreateCaff = () => {
  const { client } = useClientContext();

  return useRequest<FormData, CreateCaffResp>({
    request: client.caff.create,
  });
};

export default useCreateCaff;
