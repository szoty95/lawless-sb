import React from "react";
import { createContext } from "react";
import { User } from "../types";

export type UserContextType = {
  user: User | undefined;
};

export const UserContext = createContext<UserContextType | undefined>({
  user: undefined,
});

export const UserContextProvider: React.FC = ({ children }) => {
  // GET user from the API or something
  return (
    <UserContext.Provider value={{ user: undefined }}>
      {children}
    </UserContext.Provider>
  );
};
