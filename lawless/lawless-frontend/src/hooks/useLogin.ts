import { LoginReq, LoginResp } from "../swagger";
import { useClientContext } from "./useClientContext";
import useRequest from "./useRequest";

export const useLogin = () => {
  const { client } = useClientContext();

  return useRequest<LoginReq, LoginResp>({ request: client.auth.login });
};
