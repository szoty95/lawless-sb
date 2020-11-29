import React, { createContext } from 'react';

import { Client, createClient } from '../client/client';

export type ClientContextType = {
  client: Client;
};

export const ClientContext = createContext<ClientContextType>({
  client: createClient(),
});

type ClientContextProviderProps = {
  baseUrl?: string;
};

export const ClientContextProvider: React.FC<ClientContextProviderProps> = ({ children, baseUrl = '' }) => {
  return (
    <ClientContext.Provider
      value={{
        client: createClient(baseUrl),
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};
