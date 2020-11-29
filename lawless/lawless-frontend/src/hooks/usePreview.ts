import { Image } from '../client/types';
import useClientContext from './useClientContext';
import useRequest from './useRequest';

const usePreview = () => {
  const { client } = useClientContext();

  return useRequest<{ id: number }, Image>({
    request: client.caff.getPreview,
  });
};

export default usePreview;
