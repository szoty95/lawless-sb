import { IDetailsCaffResp } from '../swagger';
import useClientContext from './useClientContext';
import useRequest from './useRequest';

const useGetCaff = () => {
  const { client } = useClientContext();

  return useRequest<number, IDetailsCaffResp>({
    request: client.caff.details,
  });
};

export default useGetCaff;
