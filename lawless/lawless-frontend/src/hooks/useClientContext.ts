import { useContext } from 'react';
import type { ClientContextType } from '../contexts';
import { ClientContext } from '../contexts';

function useClientContext(): ClientContextType {
  const clientContext = useContext(ClientContext);
  if (!clientContext) {
    throw new Error('You must use `ClientContextProvider` to access the `ClientContext`.');
  }
  return clientContext;
}

export default useClientContext;
