import { useLocalStorage } from 'react-use';

const AUTH_TOKEN_KEY = 'authToken';

export const useAuthToken = () => {
  const [authToken, setAuthToken] = useLocalStorage(AUTH_TOKEN_KEY);
  const removeAuthToken = () => localStorage.removeItem(AUTH_TOKEN_KEY);

  return { authToken, setAuthToken, removeAuthToken };
};

export default useAuthToken;
