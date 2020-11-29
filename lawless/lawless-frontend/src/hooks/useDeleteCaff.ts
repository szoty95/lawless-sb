import { IDeleteCaffResp } from '../swagger';
import useClientContext from './useClientContext';
import useRequest from './useRequest';

const useDeleteCaff = () => {
  const { client } = useClientContext();

  return useRequest<number, IDeleteCaffResp>({
    request: client.caff.deleteCaff,
  });
};

export default useDeleteCaff;
