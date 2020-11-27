import { CreateCaffResp } from "../swagger";
import { useClientContext } from "./useClientContext";
import useRequest from "./useRequest";

export const useCreateCaff = () => {
  const { client } = useClientContext();

  return useRequest<FormData, CreateCaffResp>({
    request: client.caff.create,
  });
};
