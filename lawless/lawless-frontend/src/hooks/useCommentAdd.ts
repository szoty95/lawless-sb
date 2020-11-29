import { ICommentAddCaffReq } from '../swagger';
import useClientContext from './useClientContext';
import useRequest from './useRequest';

const useAddComment = () => {
  const { client } = useClientContext();

  return useRequest<ICommentAddCaffReq, { status: string }>({
    request: client.caff.addComment,
  });
};

export default useAddComment;
