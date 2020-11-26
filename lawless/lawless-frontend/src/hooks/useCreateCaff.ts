import { CreateCaffReq, CreateCaffResp } from "../swagger";
import { useClientContext } from "./useClientContext";
import useRequest from "./useRequest";

export const useCreateCaff = () => {
  const { client } = useClientContext();

  return useRequest<CreateCaffReq, CreateCaffResp>({
    request: client.caff.create,
  });
};
