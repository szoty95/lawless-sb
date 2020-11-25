import React from "react";
import { createContext } from "react";
import { AuthClient, CaffClient } from "../swagger/api";

export type ClientContextType = {
  client: {
    auth: AuthClient;
    caff: CaffClient;
  };
};

export const ClientContext = createContext<ClientContextType>({
  client: {
    auth: new AuthClient("http://localhost:8080"),
    caff: new CaffClient("http://localhost:8080"),
  },
});

type ClientContextProviderProps = {
  baseUrl?: string;
};

export const ClientContextProvider: React.FC<ClientContextProviderProps> = ({
  children,
  baseUrl = "http://localhost:8080",
}) => {
  return (
    <ClientContext.Provider
      value={{
        client: {
          auth: new AuthClient("http://localhost:8080"),
          caff: new CaffClient("http://localhost:8080"),
        },
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};
