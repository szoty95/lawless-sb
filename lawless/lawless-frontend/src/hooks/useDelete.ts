import { IDeleteCaffReq, IDeleteCaffResp } from "../swagger";
import { useClientContext } from "./useClientContext";
import useRequest from "./useRequest";

export const useDeleteCaff = () => {
  const { client } = useClientContext();

  return useRequest<IDeleteCaffReq, IDeleteCaffResp>({
    request: client.caff.deleteCaff,
  });
};
