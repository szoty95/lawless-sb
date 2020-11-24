import React from "react";
import { createContext } from "react";
import { Client, IClient } from "../swagger/api";

export type ClientContextType = {
  client: IClient | undefined;
};

export const ClientContext = createContext<ClientContextType | undefined>({
  client: undefined,
});

export const ClientContextProvider: React.FC = ({ children }) => {
  return (
    <ClientContext.Provider
      value={{ client: new Client("http://localhost:8080") }}
    >
      {children}
    </ClientContext.Provider>
  );
};
