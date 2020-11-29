import { useContext } from 'react';
import type { UserContextType } from '../contexts';
import { UserContext } from '../contexts';

function useUserContext(): UserContextType {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error('You must use `UserContextProvider` to access the `UserContext`.');
  }
  return userContext;
}

export default useUserContext;
