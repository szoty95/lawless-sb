import { useClientContext } from "./useClientContext";

export const useRegister = () => {
  const { client } = useClientContext();

  return client?.register;
};
