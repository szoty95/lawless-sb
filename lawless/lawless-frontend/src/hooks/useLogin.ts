import { ILoginReq, ILoginResp } from "../swagger";
import { useClientContext } from "./useClientContext";
import useRequest from "./useRequest";

export const useLogin = () => {
  const { client } = useClientContext();

  return useRequest<ILoginReq, ILoginResp>({ request: client?.register });
};
