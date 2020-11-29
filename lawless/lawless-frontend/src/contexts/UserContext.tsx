import React, { useState, createContext } from 'react';

import { IUserPersonalData } from '../swagger';

type User = IUserPersonalData & { roles: Array<string | undefined> };

export type UserContextType = {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
};

export const UserContext = createContext<UserContextType | undefined>({
  user: undefined,
  setUser: () => {},
});

export const UserContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | undefined>();
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
