import { useClientContext } from "./useClientContext";

export const useLogin = () => {
  const { client } = useClientContext();

  return client?.login;
};
